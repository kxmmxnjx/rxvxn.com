class RxvLink extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const href = this.getAttribute('href') || '#';
        const target = this.getAttribute('target') || '_self';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline;
                    cursor: pointer;
                }
                a {
                    color: var(--color-primary);
                    text-decoration: none;
                    font-family: var(--font-family-base);
                    font-size: var(--font-size-md);
                    display: block;
                    height: 100%;
                    width: 100%;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
            <a href="${href}" target="${target}"><slot></slot></a>
        `;

        this.shadowRoot.querySelector('a').addEventListener('click', (event) => {
            // Handle client-side routing for all internal links
            if (href.startsWith('/') && target === '_self') {
                event.preventDefault();
                window.route(href);
            }
            // For external links or links with a different target, let the browser handle it.
        });
    }
}

customElements.define('rxv-link', RxvLink);
