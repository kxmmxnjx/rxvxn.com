import '../atoms/RxvText.js';
import './RxvCard.js';

class ClientProject extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Client Project';

        this.shadowRoot.innerHTML = `
            <rxv-card>
                <rxv-text size="lg" weight="bold">${title}</rxv-text>
            </rxv-card>
        `;
    }
}

customElements.define('client-project', ClientProject);