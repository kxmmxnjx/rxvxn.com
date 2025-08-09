class RxvGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const columns = this.getAttribute('columns') || '1fr'; // e.g., '1fr 1fr', 'repeat(auto-fit, minmax(200px, 1fr))'
        const gap = this.getAttribute('gap') || 'md'; // spacing token like 'sm', 'md'

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: ${columns};
                    gap: var(--space-${gap}, ${gap});
                }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('rxv-grid', RxvGrid);
