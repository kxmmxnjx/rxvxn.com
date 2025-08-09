import '../atoms/RxvText.js';
import './RxvCard.js';

class ArtPiece extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Art Piece';

        this.shadowRoot.innerHTML = `
            <rxv-card>
                <rxv-text size="lg" weight="bold">${title}</rxv-text>
            </rxv-card>
        `;
    }
}

customElements.define('art-piece', ArtPiece);