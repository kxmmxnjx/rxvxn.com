/**
 * Data Fetcher Utility
 * Handle API/JSON data fetching with caching
 */

export class DataFetcher {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Fetch data with optional caching
     * @param {string} url - URL to fetch
     * @param {Object} options - Fetch options
     * @param {boolean} useCache - Whether to use cache
     * @returns {Promise<any>}
     */
    async fetch(url, options = {}, useCache = true) {
        // Check cache first
        if (useCache && this.cache.has(url)) {
            return this.cache.get(url);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Store in cache
            if (useCache) {
                this.cache.set(url, data);
            }

            return data;
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            throw error;
        }
    }

    /**
     * Clear cache for a specific URL or all cache
     * @param {string|null} url - URL to clear, or null to clear all
     */
    clearCache(url = null) {
        if (url) {
            this.cache.delete(url);
        } else {
            this.cache.clear();
        }
    }

    /**
     * Prefetch data in the background
     * @param {string[]} urls - URLs to prefetch
     */
    async prefetch(urls) {
        const promises = urls.map((url) =>
            this.fetch(url, {}, true).catch(() => null)
        );
        await Promise.all(promises);
    }
}

// Export singleton instance
export const dataFetcher = new DataFetcher();
