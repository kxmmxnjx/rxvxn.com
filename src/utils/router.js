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
    const route = routes[path] || routes['/'];
    const response = await fetch(route);
    const html = await response.text();
    document.getElementById('content').innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = navigate;

handleLocation();