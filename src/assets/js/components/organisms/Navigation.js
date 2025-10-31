/**
 * Navigation Component (Organism)
 * Main site navigation with logo and links
 */

class RxNavigation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.setupNavigation();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .nav-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 600;
          padding-bottom: 1rem;
          border-bottom: 1px solid #000;
        }

        .logo a {
          color: #000;
          text-decoration: none;
        }

        .nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .nav-item a {
          color: #000;
          text-decoration: none;
          padding: 0.5rem 0;
          display: block;
          transition: transform 150ms ease;
        }

        .nav-item a:hover,
        .nav-item a.active {
          transform: translateX(4px);
        }

        .nav-item a.active {
          font-weight: 600;
        }

        .nav-item a::before {
          content: '> ';
          opacity: 0;
          transition: opacity 150ms ease;
        }

        .nav-item a:hover::before,
        .nav-item a.active::before {
          opacity: 1;
        }

        @media (max-width: 767px) {
          .nav-container {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }

          .logo {
            border: none;
            padding: 0;
          }

          .nav-list {
            flex-direction: row;
            gap: 1rem;
          }
        }
      </style>
      <nav class="nav-container">
        <div class="logo">
          <a href="/">rxvxn.com</a>
        </div>
        <ul class="nav-list">
          <li class="nav-item"><a href="/" data-route="/">Home</a></li>
          <li class="nav-item"><a href="/projects" data-route="/projects">Projects</a></li>
          <li class="nav-item"><a href="/demos" data-route="/demos">Demos</a></li>
          <li class="nav-item"><a href="/art" data-route="/art">Art</a></li>
          <li class="nav-item"><a href="/about" data-route="/about">About</a></li>
        </ul>
      </nav>
    `;
    }

    setupNavigation() {
        const links = this.shadowRoot.querySelectorAll("a[data-route]");
        const currentPath = window.location.pathname;

        // Set active link
        links.forEach((link) => {
            const route = link.getAttribute("data-route");
            if (
                route === currentPath ||
                (currentPath === "/" && route === "/")
            ) {
                link.classList.add("active");
            }

            // Client-side routing (if needed)
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const route = link.getAttribute("data-route");

                // Dispatch custom navigation event
                this.dispatchEvent(
                    new CustomEvent("rx-navigate", {
                        bubbles: true,
                        composed: true,
                        detail: { route },
                    })
                );

                // Update active state
                links.forEach((l) => l.classList.remove("active"));
                link.classList.add("active");
            });
        });
    }
}

customElements.define("rx-navigation", RxNavigation);
