/**
 * Main Application Entry Point
 * Initializes router, components, and page logic
 */

import { router } from "./utils/router.js";
import { $, getBreakpoint, watchBreakpoint } from "./utils/dom.js";

class App {
    constructor() {
        this.contentArea = null;
        this.header = null;
        this.layout = null;
    }

    /**
     * Initialize application
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * Setup application after DOM is ready
     */
    setup() {
        // Cache DOM elements
        this.contentArea = $("#content-area");
        this.header = $("rx-header");
        this.layout = $(".layout");

        // Setup routes
        this.setupRoutes();

        // Initialize router
        router.init();

        // Setup responsive layout
        this.setupResponsiveLayout();

        // Log initialization
        console.log("rxvxn.com initialized");
    }

    /**
     * Setup application routes
     */
    setupRoutes() {
        // Home page
        router.register("/", () => {
            this.renderPage(
                "Home",
                "Welcome to rxvxn.com",
                `
        <div class="intro">
          <p style="margin-bottom: 2rem; line-height: 1.8;">
            This site showcases technical demos including WebSocket applications,
            WebAssembly experiments, web games, and computer-generated art.
          </p>
          <rx-button variant="primary" onclick="window.location.href='/projects'">
            View Projects
          </rx-button>
        </div>
      `
            );
            this.updateLayout(true, true);
        });

        // Projects page
        router.register("/projects", () => {
            this.renderPage(
                "Projects",
                "All Projects & Demos",
                `
        <rx-project-grid></rx-project-grid>
      `
            );
            this.updateLayout(true, true);
        });

        // Demos page
        router.register("/demos", () => {
            this.renderPage(
                "Demos",
                "Technical Demonstrations",
                `
        <rx-project-grid filter="demo"></rx-project-grid>
      `
            );
            this.updateLayout(true, true);
        });

        // Art page
        router.register("/art", () => {
            this.renderPage(
                "Art",
                "Computer Art Gallery",
                `
        <rx-project-grid filter="art"></rx-project-grid>
      `
            );
            this.updateLayout(true, true);
        });

        // About page
        router.register("/about", () => {
            this.renderPage(
                "About",
                "About This Site",
                `
        <div class="about-content" style="line-height: 1.8;">
          <h2 style="margin: 2rem 0 1rem;">Technology</h2>
          <p>Built with vanilla HTML, CSS, and JavaScript using Web Components and Atomic Design principles.</p>
          <ul style="margin: 1rem 0; padding-left: 1.5rem; list-style: square;">
            <li>No frameworks or build tools</li>
            <li>Responsive design (1120px / 768px / 480px)</li>
            <li>Cascadia Code monospace font</li>
            <li>Minimalist black & white design</li>
          </ul>

          <h2 style="margin: 2rem 0 1rem;">Features</h2>
          <p>This site includes several key features:</p>
          <h3 style="margin: 1.5rem 0 0.75rem;">Web Components</h3>
          <p>Built using custom Web Components following the Atomic Design methodology.</p>
          
          <h3 style="margin: 1.5rem 0 0.75rem;">Responsive Design</h3>
          <p>Fully responsive across desktop, tablet, and mobile devices.</p>

          <h2 style="margin: 2rem 0 1rem;">Contact</h2>
          <p>GitHub: <a href="https://github.com/kxmmxnjx" target="_blank">@kxmmxnjx</a></p>
        </div>
      `
            );
            this.updateLayout(true, true); // Show sidebar with TOC
        });

        // 404 page
        router.register("*", () => {
            this.renderPage(
                "404",
                "Page Not Found",
                `
        <div style="text-align: center; padding: 4rem 0;">
          <h2 style="font-size: 4rem; margin-bottom: 1rem;">404</h2>
          <p style="margin-bottom: 2rem;">The page you're looking for doesn't exist.</p>
          <rx-button onclick="window.location.href='/'">Go Home</rx-button>
        </div>
      `
            );
            this.updateLayout(true, false);
        });
    }

    /**
     * Render page content
     * @param {string} title - Page title
     * @param {string} subtitle - Page subtitle
     * @param {string} content - Page HTML content
     */
    renderPage(title, subtitle, content) {
        // Update document title
        document.title = `${title} - rxvxn.com`;

        // Update header
        if (this.header) {
            this.header.setAttribute("title", title);
            this.header.setAttribute("subtitle", subtitle);
        }

        // Update content area
        if (this.contentArea) {
            this.contentArea.innerHTML = content;
        }

        // Scroll to top
        window.scrollTo(0, 0);

        // Refresh sidebar TOC after content is loaded
        setTimeout(() => {
            const sidebar = document.querySelector("rx-sidebar");
            if (sidebar && typeof sidebar.refresh === "function") {
                sidebar.refresh();
            }
        }, 100);
    }

    /**
     * Update layout configuration
     * @param {boolean} hasNav - Show navigation
     * @param {boolean} hasAside - Show aside
     */
    updateLayout(hasNav = true, hasAside = true) {
        if (!this.layout) return;

        this.layout.classList.toggle("has-nav", hasNav);
        this.layout.classList.toggle("has-aside", hasAside);
    }

    /**
     * Setup responsive layout handling
     */
    setupResponsiveLayout() {
        const currentBreakpoint = getBreakpoint();
        console.log(`Initial breakpoint: ${currentBreakpoint}`);

        // Watch for breakpoint changes
        watchBreakpoint((breakpoint) => {
            console.log(`Breakpoint changed: ${breakpoint}`);

            // You can adjust layout based on breakpoint here
            if (breakpoint === "mobile") {
                // Mobile-specific adjustments
            }
        });
    }
}

// Initialize app
const app = new App();
app.init();

// Export for debugging
window.app = app;
window.router = router;
