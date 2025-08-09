class RxvInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const type = this.getAttribute('type') || 'text';
        const placeholder = this.getAttribute('placeholder') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }
                input {
                    width: 100%;
                    padding: var(--space-sm);
                    border: var(--border-width) var(--border-style) var(--border-color);
                    border-radius: var(--border-radius);
                    font-family: var(--font-family-base);
                    font-size: var(--font-size-md);
                    color: var(--color-foreground);
                    background-color: var(--color-background);
                    box-sizing: border-box; /* Include padding and border in the element's total width and height */
                }
                input:focus {
                    outline: none;
                    border-color: var(--color-primary);
                }
            </style>
            <input type="${type}" placeholder="${placeholder}">
        `;
    }
}

customElements.define('rxv-input', RxvInput);
