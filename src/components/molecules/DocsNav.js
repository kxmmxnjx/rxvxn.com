import '/src/components/atoms/RxvBox.js';
import '/src/components/atoms/RxvText.js';
import '/src/components/atoms/RxvLink.js';
import '/src/components/atoms/RxvStack.js';

class DocsNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .nav-item {
                    margin-bottom: var(--space-sm);
                }
            </style>
            <rxv-box>
                <rxv-text size="lg" weight="bold">Docs Navigation</rxv-text>
                <rxv-stack direction="column" gap="sm">
                    <rxv-link href="/docs" onclick="window.route('/docs'); event.preventDefault();">Introduction</rxv-link>
                    <rxv-text size="md" weight="bold">Atoms</rxv-text>
                    <rxv-link href="/docs/atoms/RxvBox" onclick="window.route('/docs/atoms/RxvBox'); event.preventDefault();">RxvBox</rxv-link>
                    <rxv-link href="/docs/atoms/RxvText" onclick="window.route('/docs/atoms/RxvText'); event.preventDefault();">RxvText</rxv-link>
                    <rxv-link href="/docs/atoms/RxvButton" onclick="window.route('/docs/atoms/RxvButton'); event.preventDefault();">RxvButton</rxv-link>
                    <rxv-link href="/docs/atoms/RxvInput" onclick="window.route('/docs/atoms/RxvInput'); event.preventDefault();">RxvInput</rxv-link>
                    <rxv-link href="/docs/atoms/RxvCheckbox" onclick="window.route('/docs/atoms/RxvCheckbox'); event.preventDefault();">RxvCheckbox</rxv-link>
                    <rxv-link href="/docs/atoms/RxvLink" onclick="window.route('/docs/atoms/RxvLink'); event.preventDefault();">RxvLink</rxv-link>
                    <rxv-link href="/docs/atoms/RxvStack" onclick="window.route('/docs/atoms/RxvStack'); event.preventDefault();">RxvStack</rxv-link>
                    <rxv-text size="md" weight="bold">Molecules</rxv-text>
                    <rxv-link href="/docs/molecules/RxvCard" onclick="window.route('/docs/molecules/RxvCard'); event.preventDefault();">RxvCard</rxv-link>
                    <rxv-link href="/docs/molecules/RxvGrid" onclick="window.route('/docs/molecules/RxvGrid'); event.preventDefault();">RxvGrid</rxv-link>
                    <rxv-link href="/docs/molecules/MarkdownRenderer" onclick="window.route('/docs/molecules/MarkdownRenderer'); event.preventDefault();">MarkdownRenderer</rxv-link>
                    <rxv-text size="md" weight="bold">Organisms</rxv-text>
                    <rxv-link href="/docs/organisms/SiteHeader" onclick="window.route('/docs/organisms/SiteHeader'); event.preventDefault();">SiteHeader</rxv-link>
                    <rxv-link href="/docs/organisms/SiteFooter" onclick="window.route('/docs/organisms/SiteFooter'); event.preventDefault();">SiteFooter</rxv-link>
                </rxv-stack>
            </rxv-box>
        `;
    }
}

customElements.define('docs-nav', DocsNav);
