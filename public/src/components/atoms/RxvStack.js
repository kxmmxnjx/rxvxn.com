class RxvStack extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const direction = this.getAttribute('direction') || 'column'; // 'row' or 'column'
        const gap = this.getAttribute('gap') || '0'; // spacing token like 'sm', 'md'
        const justify = this.getAttribute('justify') || 'flex-start';
        const align = this.getAttribute('align') || 'stretch';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: ${direction};
                    gap: var(--space-${gap}, ${gap});
                    justify-content: ${justify};
                    align-items: ${align};
                }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('rxv-stack', RxvStack);
