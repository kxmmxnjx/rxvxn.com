class RxvButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.button = null;
    }

    connectedCallback() {
        this.render();
        this.updateStyles();
        this.attachEventListeners();
    }

    static get observedAttributes() {
        return ['variant', 'size', 'disabled', 'loading', 'type', 'full-width'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.shadowRoot) {
            if (name === 'disabled') {
                this.updateDisabledState();
            } else if (name === 'loading') {
                this.updateLoadingState();
            } else {
                this.updateStyles();
            }
        }
    }

    render() {
        const type = this.getAttribute('type') || 'button';
        const disabled = this.hasAttribute('disabled');
        const loading = this.hasAttribute('loading');

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: var(--display, inline-block);
                    width: var(--width, auto);
                }
                
                button {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--space-xs);
                    
                    width: 100%;
                    min-height: var(--min-height, 2.5rem);
                    padding: var(--padding, var(--space-sm) var(--space-md));
                    
                    background-color: var(--bg-color, var(--color-primary));
                    color: var(--text-color, var(--color-background));
                    border: var(--border, var(--border-width) var(--border-style) var(--border-color));
                    border-radius: var(--border-radius, 0);
                    
                    font-family: var(--font-family-base);
                    font-size: var(--font-size, var(--font-size-md));
                    font-weight: var(--font-weight, 500);
                    
                    cursor: var(--cursor, pointer);
                    user-select: none;
                    
                    transition: all 0.2s ease;
                    outline: none;
                }
                
                button:hover:not(:disabled) {
                    background-color: var(--bg-hover, var(--color-foreground));
                    color: var(--text-hover, var(--color-background));
                    border-color: var(--border-hover, var(--color-foreground));
                }
                
                button:focus:not(:disabled) {
                    box-shadow: 0 0 0 2px var(--color-primary);
                }
                
                button:active:not(:disabled) {
                    transform: translateY(1px);
                }
                
                button:disabled {
                    background-color: var(--color-secondary);
                    color: var(--color-foreground);
                    border-color: var(--color-secondary);
                    cursor: not-allowed;
                    opacity: 0.6;
                }
                
                .loading-spinner {
                    display: var(--spinner-display, none);
                    width: 1rem;
                    height: 1rem;
                    border: 2px solid transparent;
                    border-top: 2px solid currentColor;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                .button-content {
                    display: var(--content-display, flex);
                    align-items: center;
                    gap: var(--space-xs);
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                /* Variants */
                :host([variant="outline"]) button {
                    --bg-color: transparent;
                    --text-color: var(--color-primary);
                    --bg-hover: var(--color-primary);
                    --text-hover: var(--color-background);
                }
                
                :host([variant="ghost"]) button {
                    --bg-color: transparent;
                    --text-color: var(--color-primary);
                    --border: none;
                    --bg-hover: var(--color-secondary);
                    --text-hover: var(--color-foreground);
                }
                
                :host([variant="link"]) button {
                    --bg-color: transparent;
                    --text-color: var(--color-primary);
                    --border: none;
                    --padding: 0;
                    --min-height: auto;
                    --bg-hover: transparent;
                    --text-hover: var(--color-foreground);
                }
                
                /* Sizes */
                :host([size="sm"]) button {
                    --min-height: 2rem;
                    --padding: var(--space-xs) var(--space-sm);
                    --font-size: var(--font-size-sm);
                }
                
                :host([size="lg"]) button {
                    --min-height: 3rem;
                    --padding: var(--space-md) var(--space-lg);
                    --font-size: var(--font-size-lg);
                }
                
                /* Full width */
                :host([full-width]) {
                    --display: block;
                    --width: 100%;
                }
            </style>
            <button type="${type}" ${disabled ? 'disabled' : ''}>
                <div class="loading-spinner"></div>
                <div class="button-content">
                    <slot></slot>
                </div>
            </button>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.button = this.shadowRoot.querySelector('button');
    }

    updateStyles() {
        // Styles are handled via CSS custom properties and attributes
    }

    updateDisabledState() {
        if (this.button) {
            this.button.disabled = this.hasAttribute('disabled');
        }
    }

    updateLoadingState() {
        const loading = this.hasAttribute('loading');
        if (this.button) {
            this.button.disabled = loading;
            this.button.style.setProperty('--spinner-display', loading ? 'block' : 'none');
            this.button.style.setProperty('--content-display', loading ? 'none' : 'flex');
        }
    }

    attachEventListeners() {
        if (this.button) {
            this.button.addEventListener('click', (e) => {
                if (this.hasAttribute('disabled') || this.hasAttribute('loading')) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                
                // Emit custom event
                this.dispatchEvent(new CustomEvent('rxv-click', {
                    bubbles: true,
                    composed: true,
                    detail: { originalEvent: e }
                }));
            });
        }
    }

    // Public methods
    focus() {
        if (this.button && !this.hasAttribute('disabled')) {
            this.button.focus();
        }
    }

    blur() {
        if (this.button) {
            this.button.blur();
        }
    }
}

customElements.define('rxv-button', RxvButton);
