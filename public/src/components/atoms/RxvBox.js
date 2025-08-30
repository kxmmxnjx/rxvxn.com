class RxvBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.updateStyles();
    }

    static get observedAttributes() {
        return ['padding', 'margin', 'border', 'radius', 'bg', 'direction', 'align', 'justify', 'gap', 'wrap'];
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
                    display: var(--display, block);
                    flex-direction: var(--flex-direction, row);
                    align-items: var(--align-items, stretch);
                    justify-content: var(--justify-content, flex-start);
                    gap: var(--gap, 0);
                    flex-wrap: var(--flex-wrap, nowrap);
                    
                    background-color: var(--background-color, transparent);
                    border: var(--border, none);
                    border-radius: var(--border-radius, 0);
                    padding: var(--padding, 0);
                    margin: var(--margin, 0);
                    
                    box-sizing: border-box;
                    transition: all 0.2s ease;
                }
            </style>
            <slot></slot>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    updateStyles() {
        const style = this.style;

        // Layout
        const direction = this.getAttribute('direction');
        if (direction === 'column' || direction === 'row') {
            style.setProperty('--display', 'flex');
            style.setProperty('--flex-direction', direction);
        }

        // Alignment
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

        // Gap
        const gap = this.getAttribute('gap');
        if (gap) {
            style.setProperty('--gap', `var(--space-${gap}, ${gap})`);
        }

        // Wrap
        const wrap = this.getAttribute('wrap');
        if (wrap === 'true' || wrap === 'wrap') {
            style.setProperty('--flex-wrap', 'wrap');
        }

        // Spacing
        const padding = this.getAttribute('padding');
        if (padding) {
            style.setProperty('--padding', `var(--space-${padding}, ${padding})`);
        }

        const margin = this.getAttribute('margin');
        if (margin) {
            style.setProperty('--margin', `var(--space-${margin}, ${margin})`);
        }

        // Border
        const border = this.getAttribute('border');
        if (border === 'true') {
            style.setProperty('--border', 'var(--border-width) var(--border-style) var(--border-color)');
        } else if (border && border !== 'false') {
            style.setProperty('--border', border);
        }

        // Border radius
        const radius = this.getAttribute('radius');
        if (radius) {
            style.setProperty('--border-radius', `var(--radius-${radius}, ${radius})`);
        }

        // Background
        const bg = this.getAttribute('bg');
        if (bg) {
            style.setProperty('--background-color', `var(--color-${bg}, ${bg})`);
        }
    }
}

customElements.define('rxv-box', RxvBox);
