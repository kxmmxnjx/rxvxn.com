import '../components/atoms/RxvBox.js';
import '../components/atoms/RxvText.js';
import '../components/atoms/RxvButton.js';
import '../components/atoms/RxvInput.js';
import '../components/atoms/RxvCheckbox.js';
import '../components/atoms/RxvLink.js';
import '../components/atoms/RxvStack.js';

import '../components/molecules/GameCard.js';
import '../components/molecules/ArtPiece.js';
import '../components/molecules/ClientProject.js';
import '../components/molecules/MarkdownRenderer.js';
import '../components/molecules/RxvCard.js';
import '../components/molecules/RxvGrid.js';
import '../components/molecules/DocsNav.js';
import '../components/molecules/DocsToc.js';

import '../components/templates/DocsLayout.js';

import '../components/organisms/SiteHeader.js';
import '../components/organisms/SiteFooter.js';

const routes = {
    '/': '/src/pages/home.html',
    '/games': '/src/pages/games.html',
    '/art': '/src/pages/art.html',
    '/clients': '/src/pages/clients.html',
    '/docs': '/src/pages/docs.html'
};

const navigate = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    handleLocation();
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const content = document.getElementById('content');

    // Special handling for all /docs routes
    if (path.startsWith('/docs')) {
        const isDocsPageAlreadyLoaded = content.querySelector('docs-layout');

        // Determine the correct markdown file path from the URL
        let docPath;
        const docsRouteMatch = path.match(/^\/docs\/(atoms|molecules|organisms)\/(.+)$/);
        if (docsRouteMatch) {
            const [_, category, component] = docsRouteMatch;
            docPath = `/src/assets/docs/${category}/${component}.md`;
        } else {
            docPath = '/src/assets/docs/README.md'; // Default for /docs
        }

        // If docs page is not loaded yet, load the whole layout first
        if (!isDocsPageAlreadyLoaded) {
            const response = await fetch('/src/pages/docs.html');
            content.innerHTML = await response.text();
        }

        // Now, wait for the markdown-renderer to be ready and set its source
        // This works for both initial load and subsequent navigations within docs
        await customElements.whenDefined('markdown-renderer');
        const markdownRenderer = content.querySelector('markdown-renderer');
        if (markdownRenderer) {
            markdownRenderer.setAttribute('src', docPath);
        }

    } else {
        // Standard page routing for non-docs pages
        const route = routes[path] || routes['/'];
        const response = await fetch(route);
        content.innerHTML = await response.text();
    }
};

window.onpopstate = handleLocation;
window.route = navigate;

handleLocation();