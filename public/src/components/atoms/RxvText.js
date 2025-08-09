class RxvText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: inline;
                    font-family: var(--font-family-base);
                    font-size: var(--font-size, var(--font-size-md));
                    font-weight: var(--font-weight, normal);
                    color: var(--color-foreground);
                    line-height: 1.5;
                }
            </style>
            <slot></slot>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.updateStyle();
    }

    updateStyle() {
        const style = this.style;
        const size = this.getAttribute('size');
        if (size) style.setProperty('--font-size', `var(--font-size-${size}, ${size})`);

        const weight = this.getAttribute('weight');
        if (weight) style.setProperty('--font-weight', weight);
    }
}

customElements.define('rxv-text', RxvText);
