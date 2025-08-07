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
                }
                a {
                    color: var(--color-primary);
                    text-decoration: none;
                    font-family: var(--font-family-base);
                    font-size: var(--font-size-md);
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
            <a href="${href}" target="${target}"><slot></slot></a>
        `;
    }
}

customElements.define('rxv-link', RxvLink);
