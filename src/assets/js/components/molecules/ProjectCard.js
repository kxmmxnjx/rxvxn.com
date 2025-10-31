/**
 * ProjectCard Component (Molecule)
 * Displays a single project with image, title, description, and tags
 */

class RxProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["title", "description", "image", "tags", "url"];
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
        const title = this.getAttribute("title") || "Untitled";
        const description = this.getAttribute("description") || "";
        const image = this.getAttribute("image") || "";
        const tags = this.getAttribute("tags") || "";
        const url = this.getAttribute("url") || "#";

        const tagList = tags ? tags.split(",").map((tag) => tag.trim()) : [];

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .project-card {
          border: 1px solid #000;
          background: #fff;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: all 150ms ease;
        }

        .project-card:hover {
          box-shadow: 3px 3px 0 #000;
          transform: translate(-2px, -2px);
        }

        .project-image {
          width: 100%;
          height: 200px;
          background: #f0f0f0;
          border-bottom: 1px solid #000;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-content {
          padding: 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .project-description {
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          flex: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid #000;
          background: #fff;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      </style>
      <a href="${url}" class="project-card">
        ${
            image
                ? `
          <div class="project-image">
            <img src="${image}" alt="${title}" loading="lazy">
          </div>
        `
                : ""
        }
        <div class="project-content">
          <h3 class="project-title">${title}</h3>
          <p class="project-description">${description}</p>
          ${
              tagList.length > 0
                  ? `
            <div class="project-tags">
              ${tagList
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")}
            </div>
          `
                  : ""
          }
        </div>
      </a>
    `;
    }
}

customElements.define("rx-project-card", RxProjectCard);
