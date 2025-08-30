class RxvStack extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.updateStyles();
    }

    static get observedAttributes() {
        return ['direction', 'gap', 'justify', 'align', 'wrap', 'divider', 'spacing'];
    }

    attributeChangedCallback() {
        if (this.shadowRoot) {
            this.updateStyles();
        }
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: var(--flex-direction, column);
                    gap: var(--gap, 0);
                    justify-content: var(--justify-content, flex-start);
                    align-items: var(--align-items, stretch);
                    flex-wrap: var(--flex-wrap, nowrap);
                }
                
                /* Divider styles */
                ::slotted(*:not(:last-child)) {
                    position: relative;
                }
                
                :host([divider]) ::slotted(*:not(:last-child))::after {
                    content: '';
                    position: absolute;
                    background-color: var(--divider-color, var(--color-secondary));
                    z-index: 1;
                }
                
                :host([direction="column"][divider]) ::slotted(*:not(:last-child))::after {
                    bottom: calc(var(--gap, 0) / -2 - 0.5px);
                    left: 0;
                    right: 0;
                    height: 1px;
                }
                
                :host([direction="row"][divider]) ::slotted(*:not(:last-child))::after {
                    right: calc(var(--gap, 0) / -2 - 0.5px);
                    top: 0;
                    bottom: 0;
                    width: 1px;
                }
                
                /* Responsive behavior */
                @media (max-width: 768px) {
                    :host([responsive]) {
                        flex-direction: column;
                    }
                }
            </style>
            <slot></slot>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    updateStyles() {
        const style = this.style;

        // Direction
        const direction = this.getAttribute('direction') || 'column';
        style.setProperty('--flex-direction', direction);

        // Gap
        const gap = this.getAttribute('gap') || this.getAttribute('spacing') || '0';
        if (gap) {
            style.setProperty('--gap', `var(--space-${gap}, ${gap})`);
        }

        // Justify content
        const justify = this.getAttribute('justify');
        if (justify) {
            const justifyMap = {
                'start': 'flex-start',
                'center': 'center',
                'end': 'flex-end',
                'between': 'space-between',
                'around': 'space-around',
                'evenly': 'space-evenly'
            };
            style.setProperty('--justify-content', justifyMap[justify] || justify);
        }

        // Align items
        const align = this.getAttribute('align');
        if (align) {
            const alignMap = {
                'start': 'flex-start',
                'center': 'center',
                'end': 'flex-end',
                'stretch': 'stretch',
                'baseline': 'baseline'
            };
            style.setProperty('--align-items', alignMap[align] || align);
        }

        // Wrap
        const wrap = this.getAttribute('wrap');
        if (wrap === 'true' || wrap === 'wrap') {
            style.setProperty('--flex-wrap', 'wrap');
        } else if (wrap === 'reverse') {
            style.setProperty('--flex-wrap', 'wrap-reverse');
        }

        // Divider color
        const dividerColor = this.getAttribute('divider-color');
        if (dividerColor) {
            style.setProperty('--divider-color', `var(--color-${dividerColor}, ${dividerColor})`);
        }
    }
}

customElements.define('rxv-stack', RxvStack);
