import '/src/components/atoms/RxvBox.js';
import '/src/components/atoms/RxvText.js';
import '/src/components/atoms/RxvButton.js';
import '/src/components/molecules/RxvCard.js';

class SiteHeader extends HTMLElement {
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
                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .nav-links rxv-button {
                    margin-left: var(--space-sm);
                }
                a {
                    text-decoration: none;
                    color: inherit;
                }
            </style>
            <rxv-card>
                <div class="header-content">
                    <rxv-text size="lg" weight="bold">
                        <a href="/" onclick="window.route('/'); event.preventDefault();">rxvxn.com</a>
                    </rxv-text>
                    <nav class="nav-links">
                        <rxv-button onclick="window.route('/games');">Games</rxv-button>
                        <rxv-button onclick="window.route('/art');">Art</rxv-button>
                        <rxv-button onclick="window.route('/clients');">Clients</rxv-button>
                        <rxv-button onclick="window.route('/docs');">Docs</rxv-button>
                    </nav>
                </div>
            </rxv-card>
        `;
    }
}

customElements.define('site-header', SiteHeader);