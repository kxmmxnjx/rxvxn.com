/**
 * ProjectGrid Component (Feature)
 * Displays grid of projects loaded from JSON data
 */

class RxProjectGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.projects = [];
    }

    connectedCallback() {
        this.render();
        this.loadProjects();
    }

    async loadProjects() {
        try {
            const response = await fetch("/assets/data/projects.json");
            if (!response.ok) throw new Error("Failed to load projects");

            this.projects = await response.json();
            this.renderProjects();
        } catch (error) {
            console.error("Error loading projects:", error);
            this.renderError();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1rem;
        }

        .error {
          padding: 2rem;
          border: 1px solid #000;
          background: #f8f8f8;
        }

        @media (max-width: 767px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="grid" id="project-grid">
        <div class="loading">Loading projects...</div>
      </div>
    `;
    }

    renderProjects() {
        const grid = this.shadowRoot.getElementById("project-grid");
        grid.innerHTML = "";

        if (this.projects.length === 0) {
            grid.innerHTML = '<div class="loading">No projects found.</div>';
            return;
        }

        this.projects.forEach((project) => {
            const card = document.createElement("rx-project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("description", project.description);
            if (project.image) card.setAttribute("image", project.image);
            if (project.tags) card.setAttribute("tags", project.tags.join(","));
            if (project.url) card.setAttribute("url", project.url);

            grid.appendChild(card);
        });
    }

    renderError() {
        const grid = this.shadowRoot.getElementById("project-grid");
        grid.innerHTML = `
      <div class="error">
        <p>Failed to load projects. Please try again later.</p>
      </div>
    `;
    }
}

customElements.define("rx-project-grid", RxProjectGrid);
