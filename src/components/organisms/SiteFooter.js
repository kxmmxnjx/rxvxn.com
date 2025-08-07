import '/src/components/atoms/RxvBox.js';
import '/src/components/atoms/RxvText.js';
import '/src/components/molecules/RxvCard.js';

class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    text-align: center;
                }
            </style>
            <rxv-card>
                <rxv-text>&copy; ${new Date().getFullYear()} rxvxn.com</rxv-text>
            </rxv-card>
        `;
    }
}

customElements.define('site-footer', SiteFooter);