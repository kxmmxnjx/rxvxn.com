/**
 * DOM Utilities
 * Helper functions for DOM manipulation
 */

/**
 * Query selector with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null}
 */
export function $(selector, context = document) {
    return context.querySelector(selector);
}

/**
 * Query selector all
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element[]}
 */
export function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

/**
 * Create element with attributes and children
 * @param {string} tag - Tag name
 * @param {Object} attrs - Attributes object
 * @param {Array|string} children - Child elements or text
 * @returns {Element}
 */
export function createElement(tag, attrs = {}, children = []) {
    const element = document.createElement(tag);

    // Set attributes
    Object.entries(attrs).forEach(([key, value]) => {
        if (key === "className") {
            element.className = value;
        } else if (key === "dataset") {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith("on")) {
            const eventName = key.slice(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    // Append children
    const childArray = Array.isArray(children) ? children : [children];
    childArray.forEach((child) => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Element) {
            element.appendChild(child);
        }
    });

    return element;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function}
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit time in ms
 * @returns {Function}
 */
export function throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Get responsive breakpoint
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
export function getBreakpoint() {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1120) return "tablet";
    return "desktop";
}

/**
 * Watch for breakpoint changes
 * @param {Function} callback - Callback function
 */
export function watchBreakpoint(callback) {
    let currentBreakpoint = getBreakpoint();

    const checkBreakpoint = throttle(() => {
        const newBreakpoint = getBreakpoint();
        if (newBreakpoint !== currentBreakpoint) {
            currentBreakpoint = newBreakpoint;
            callback(newBreakpoint);
        }
    }, 200);

    window.addEventListener("resize", checkBreakpoint);

    // Return cleanup function
    return () => window.removeEventListener("resize", checkBreakpoint);
}
