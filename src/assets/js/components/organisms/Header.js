/**
 * Header Component (Organism)
 * Page header with title and optional actions
 */

class RxHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["title", "subtitle"];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.shadowRoot) {
            this.render();
        }
    }

    render() {
        const title = this.getAttribute("title") || "Welcome";
        const subtitle = this.getAttribute("subtitle") || "";

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 2rem;
        }

        .header {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #000;
        }

        .title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          font-size: 1rem;
          color: #666;
        }

        .actions {
          margin-top: 1rem;
        }
      </style>
      <header class="header">
        <h1 class="title">${title}</h1>
        ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ""}
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
    }

    setTitle(title, subtitle = "") {
        this.setAttribute("title", title);
        if (subtitle) {
            this.setAttribute("subtitle", subtitle);
        }
    }
}

customElements.define("rx-header", RxHeader);
