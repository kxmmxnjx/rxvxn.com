/**
 * Simple Node.js HTTP Server for rxvxn.com
 * Provides /api/previews endpoint for subdomain preview management
 * No external dependencies - uses only built-in Node.js modules
 */

const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const DATA_FILE = path.join(__dirname, "data", "previews.json");

/**
 * Load previews data from JSON file
 */
async function loadPreviews() {
    try {
        const data = await fs.readFile(DATA_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading previews:", error);
        return [];
    }
}

/**
 * Save previews data to JSON file
 */
async function savePreviews(previews) {
    try {
        await fs.writeFile(
            DATA_FILE,
            JSON.stringify(previews, null, 2),
            "utf8"
        );
        return true;
    } catch (error) {
        console.error("Error saving previews:", error);
        return false;
    }
}

/**
 * Parse JSON body from request
 */
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
        req.on("error", reject);
    });
}

/**
 * Send JSON response
 */
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end(JSON.stringify(data));
}

/**
 * Main request handler
 */
async function handleRequest(req, res) {
    const { method, url } = req;

    // CORS preflight
    if (method === "OPTIONS") {
        sendJSON(res, 204, {});
        return;
    }

    // Health check
    if (url === "/api/health") {
        sendJSON(res, 200, {
            status: "ok",
            timestamp: new Date().toISOString(),
        });
        return;
    }

    // GET /api/previews - List all previews
    if (method === "GET" && url === "/api/previews") {
        const previews = await loadPreviews();
        sendJSON(res, 200, { data: previews });
        return;
    }

    // GET /api/previews/:subdomain - Get specific preview
    if (method === "GET" && url.startsWith("/api/previews/")) {
        const subdomain = url.split("/")[3];
        const previews = await loadPreviews();
        const preview = previews.find((p) => p.subdomain === subdomain);

        if (preview) {
            sendJSON(res, 200, { data: preview });
        } else {
            sendJSON(res, 404, { error: "Preview not found" });
        }
        return;
    }

    // POST /api/previews - Create new preview
    if (method === "POST" && url === "/api/previews") {
        try {
            const body = await parseBody(req);
            const previews = await loadPreviews();

            // Validate required fields
            if (!body.subdomain || !body.name) {
                sendJSON(res, 400, {
                    error: "Missing required fields: subdomain, name",
                });
                return;
            }

            // Check if subdomain already exists
            if (previews.some((p) => p.subdomain === body.subdomain)) {
                sendJSON(res, 409, { error: "Subdomain already exists" });
                return;
            }

            const newPreview = {
                id: Date.now().toString(),
                subdomain: body.subdomain,
                name: body.name,
                description: body.description || "",
                url: body.url || "",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            previews.push(newPreview);
            await savePreviews(previews);

            sendJSON(res, 201, { data: newPreview });
        } catch (error) {
            sendJSON(res, 400, { error: "Invalid JSON body" });
        }
        return;
    }

    // PUT /api/previews/:subdomain - Update preview
    if (method === "PUT" && url.startsWith("/api/previews/")) {
        try {
            const subdomain = url.split("/")[3];
            const body = await parseBody(req);
            const previews = await loadPreviews();

            const index = previews.findIndex((p) => p.subdomain === subdomain);
            if (index === -1) {
                sendJSON(res, 404, { error: "Preview not found" });
                return;
            }

            previews[index] = {
                ...previews[index],
                ...body,
                subdomain: previews[index].subdomain, // Don't allow changing subdomain
                id: previews[index].id, // Don't allow changing id
                updatedAt: new Date().toISOString(),
            };

            await savePreviews(previews);
            sendJSON(res, 200, { data: previews[index] });
        } catch (error) {
            sendJSON(res, 400, { error: "Invalid JSON body" });
        }
        return;
    }

    // DELETE /api/previews/:subdomain - Delete preview
    if (method === "DELETE" && url.startsWith("/api/previews/")) {
        const subdomain = url.split("/")[3];
        const previews = await loadPreviews();

        const filteredPreviews = previews.filter(
            (p) => p.subdomain !== subdomain
        );
        if (filteredPreviews.length === previews.length) {
            sendJSON(res, 404, { error: "Preview not found" });
            return;
        }

        await savePreviews(filteredPreviews);
        sendJSON(res, 200, { message: "Preview deleted successfully" });
        return;
    }

    // 404 - Not found
    sendJSON(res, 404, { error: "Not found" });
}

/**
 * Create and start server
 */
const server = http.createServer(handleRequest);

server.listen(PORT, HOST, () => {
    console.log(`✅ Server running at http://${HOST}:${PORT}`);
    console.log(`📡 API endpoints:`);
    console.log(`   GET    /api/health`);
    console.log(`   GET    /api/previews`);
    console.log(`   GET    /api/previews/:subdomain`);
    console.log(`   POST   /api/previews`);
    console.log(`   PUT    /api/previews/:subdomain`);
    console.log(`   DELETE /api/previews/:subdomain`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("📴 SIGTERM received, shutting down gracefully...");
    server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    console.log("\n📴 SIGINT received, shutting down gracefully...");
    server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
    });
});
