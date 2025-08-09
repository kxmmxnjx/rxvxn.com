import '/src/components/atoms/RxvBox.js';
import '/src/components/atoms/RxvText.js';

class RxvCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
            </style>
            <rxv-box border="true" padding="md">
                ${title ? `<rxv-text size="lg" weight="bold">${title}</rxv-text>` : ''}
                <slot></slot>
            </rxv-box>
        `;
    }
}

customElements.define('rxv-card', RxvCard);
