/**
 * Button Component (Atom)
 * Basic button with border styling
 */

class RxButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["variant", "disabled"];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback() {
        if (this.shadowRoot) {
            this.render();
        }
    }

    render() {
        const variant = this.getAttribute("variant") || "default";
        const disabled = this.hasAttribute("disabled");

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        button {
          font-family: 'Cascadia Code', monospace;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border: 1px solid #000;
          background: #fff;
          color: #000;
          cursor: pointer;
          transition: all 150ms ease;
        }

        button:hover:not(:disabled) {
          background: #000;
          color: #fff;
        }

        button:active:not(:disabled) {
          transform: translateY(1px);
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        button.primary {
          background: #000;
          color: #fff;
        }

        button.primary:hover:not(:disabled) {
          background: #fff;
          color: #000;
        }
      </style>
      <button class="${variant}" ${disabled ? "disabled" : ""}>
        <slot></slot>
      </button>
    `;
    }

    setupEventListeners() {
        const button = this.shadowRoot.querySelector("button");
        button.addEventListener("click", (e) => {
            if (!this.hasAttribute("disabled")) {
                this.dispatchEvent(
                    new CustomEvent("rx-click", {
                        bubbles: true,
                        composed: true,
                        detail: { originalEvent: e },
                    })
                );
            }
        });
    }
}

customElements.define("rx-button", RxButton);
