class RxvCheckbox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const label = this.getAttribute('label') || '';
        const checked = this.hasAttribute('checked') ? 'checked' : '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    align-items: center;
                    cursor: pointer;
                    font-family: var(--font-family-base);
                    font-size: var(--font-size-md);
                    color: var(--color-foreground);
                }
                input[type="checkbox"] {
                    /* Hide default checkbox */
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    width: var(--space-md);
                    height: var(--space-md);
                    border: var(--border-width) var(--border-style) var(--border-color);
                    border-radius: var(--border-radius);
                    margin-right: var(--space-sm);
                    display: inline-block;
                    position: relative;
                    cursor: pointer;
                }
                input[type="checkbox"]:checked {
                    background-color: var(--color-primary);
                    border-color: var(--color-primary);
                }
                input[type="checkbox"]:checked::after {
                    content: '\u2713'; /* Checkmark character */
                    color: var(--color-background);
                    font-size: var(--font-size-sm);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                label {
                    cursor: pointer;
                }
            </style>
            <label>
                <input type="checkbox" ${checked}>
                <slot>${label}</slot>
            </label>
        `;

        this.shadowRoot.querySelector('input').addEventListener('change', this._handleChange.bind(this));
    }

    _handleChange(event) {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { checked: event.target.checked },
            bubbles: true,
            composed: true
        }));
    }

    get checked() {
        return this.shadowRoot.querySelector('input').checked;
    }

    set checked(value) {
        this.shadowRoot.querySelector('input').checked = value;
    }
}

customElements.define('rxv-checkbox', RxvCheckbox);
