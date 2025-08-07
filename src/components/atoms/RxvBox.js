class RxvBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: var(--border-width, 0) var(--border-style, none) var(--border-color, transparent);
                    padding: var(--padding, 0);
                    margin: var(--margin, 0);
                }
            </style>
            <slot></slot>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.updateStyle();
    }

    updateStyle() {
        const style = this.style;
        const padding = this.getAttribute('padding');
        if (padding) style.setProperty('--padding', `var(--space-${padding}, ${padding})`);

        const margin = this.getAttribute('margin');
        if (margin) style.setProperty('--margin', `var(--space-${margin}, ${margin})`);

        const border = this.getAttribute('border');
        if (border === 'true') {
            style.setProperty('--border-width', 'var(--border-width)');
            style.setProperty('--border-style', 'var(--border-style)');
            style.setProperty('--border-color', 'var(--border-color)');
        }
    }
}

customElements.define('rxv-box', RxvBox);
