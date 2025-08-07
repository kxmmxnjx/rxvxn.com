import '../atoms/RxvText.js';
import './RxvCard.js';

class GameCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Game Title';
        const url = this.getAttribute('url') || '#';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                a {
                    text-decoration: none;
                    color: inherit; /* 부모의 색상 상속 */
                }
            </style>
            <rxv-card>
                <a href="${url}">
                    <rxv-text size="lg" weight="bold">${title}</rxv-text>
                </a>
            </rxv-card>
        `;
    }
}

customElements.define('game-card', GameCard);