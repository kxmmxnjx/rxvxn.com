class RxvButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }
                button {
                    background-color: var(--color-primary);
                    color: var(--color-background);
                    border: var(--border-width) var(--border-style) var(--border-color);
                    border-radius: var(--border-radius);
                    padding: var(--space-sm) var(--space-md);
                    font-family: var(--font-family-base);
                    font-size: var(--font-size-md);
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: var(--color-foreground);
                    color: var(--color-background);
                }
            </style>
            <button><slot></slot></button>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('rxv-button', RxvButton);
