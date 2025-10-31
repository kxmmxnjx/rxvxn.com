/**
 * Card Component (Atom)
 * Basic container with border
 */

class RxCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .card {
          border: 1px solid #000;
          padding: 1rem;
          background: #fff;
        }

        .card:hover {
          box-shadow: 2px 2px 0 #000;
          transform: translate(-1px, -1px);
          transition: all 150ms ease;
        }
      </style>
      <div class="card">
        <slot></slot>
      </div>
    `;
    }
}

customElements.define("rx-card", RxCard);
