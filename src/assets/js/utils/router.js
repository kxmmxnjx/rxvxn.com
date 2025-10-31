/**
 * Router Utility
 * Simple client-side routing without external libraries
 */

export class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
    }

    /**
     * Register a route
     * @param {string} path - Route path
     * @param {Function} handler - Route handler function
     */
    register(path, handler) {
        this.routes.set(path, handler);
    }

    /**
     * Navigate to a route
     * @param {string} path - Route path
     * @param {boolean} updateHistory - Whether to update browser history
     */
    navigate(path, updateHistory = true) {
        const handler = this.routes.get(path) || this.routes.get("*");

        if (handler) {
            this.currentRoute = path;
            handler(path);

            if (updateHistory) {
                window.history.pushState({ path }, "", path);
            }
        } else {
            console.warn(`No handler found for route: ${path}`);
        }
    }

    /**
     * Initialize router and listen for navigation events
     */
    init() {
        // Handle browser back/forward buttons
        window.addEventListener("popstate", (e) => {
            const path = e.state?.path || "/";
            this.navigate(path, false);
        });

        // Handle custom navigation events from components
        document.addEventListener("rx-navigate", (e) => {
            this.navigate(e.detail.route);
        });

        // Navigate to current path on init
        const currentPath = window.location.pathname;
        this.navigate(currentPath, false);
    }
}

// Export singleton instance
export const router = new Router();
