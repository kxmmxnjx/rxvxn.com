/**
 * Sidebar Component (Organism)
 * Right column with Table of Contents and auxiliary information
 */

class RxSidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.setupTOC();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .section {
          border: 1px solid #000;
          padding: 1rem;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #000;
        }

        .section-content {
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .toc-list {
          list-style: none;
        }

        .toc-list li {
          margin-bottom: 0.5rem;
        }

        .toc-list a {
          color: #000;
          text-decoration: none;
          display: block;
          padding: 0.25rem 0;
          transition: transform 150ms ease;
        }

        .toc-list a:hover {
          transform: translateX(4px);
        }

        .toc-list a::before {
          content: '> ';
          opacity: 0;
          transition: opacity 150ms ease;
        }

        .toc-list a:hover::before,
        .toc-list a.active::before {
          opacity: 1;
        }

        .toc-list a.active {
          font-weight: 600;
        }

        ul {
          list-style: none;
        }

        li {
          margin-bottom: 0.5rem;
        }

        a {
          color: #000;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      </style>
      <aside class="sidebar">
        <div class="section">
          <h3 class="section-title">Table of Contents</h3>
          <div class="section-content">
            <ul class="toc-list" id="toc">
              <!-- TOC will be generated here -->
            </ul>
          </div>
        </div>
        
        <div class="section">
          <h3 class="section-title">Quick Links</h3>
          <div class="section-content">
            <ul>
              <li><a href="https://github.com/kxmmxnjx" target="_blank">GitHub</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </aside>
    `;
    }

    setupTOC() {
        // Wait for content to be loaded
        setTimeout(() => {
            this.generateTOC();
            this.setupScrollSpy();
        }, 500);
    }

    generateTOC() {
        const contentArea = document.getElementById("content-area");
        if (!contentArea) return;

        const headings = contentArea.querySelectorAll("h2, h3");
        const tocList = this.shadowRoot.getElementById("toc");

        if (!tocList) return;

        if (headings.length === 0) {
            tocList.innerHTML =
                '<li style="color: #666;">No headings found</li>';
            return;
        }

        tocList.innerHTML = "";

        headings.forEach((heading, index) => {
            // Add ID to heading if it doesn't have one
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }

            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            a.dataset.target = heading.id;

            // Indent h3 more than h2
            if (heading.tagName === "H3") {
                a.style.paddingLeft = "1rem";
                a.style.fontSize = "0.8125rem";
            }

            a.addEventListener("click", (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: "smooth", block: "start" });

                // Update active state
                this.shadowRoot
                    .querySelectorAll(".toc-list a")
                    .forEach((link) => {
                        link.classList.remove("active");
                    });
                a.classList.add("active");
            });

            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    setupScrollSpy() {
        const contentArea = document.getElementById("content-area");
        if (!contentArea) return;

        const headings = contentArea.querySelectorAll("h2, h3");
        const tocLinks = this.shadowRoot.querySelectorAll(".toc-list a");

        if (headings.length === 0 || tocLinks.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        tocLinks.forEach((link) => {
                            if (link.dataset.target === id) {
                                tocLinks.forEach((l) =>
                                    l.classList.remove("active")
                                );
                                link.classList.add("active");
                            }
                        });
                    }
                });
            },
            {
                rootMargin: "-100px 0px -66%",
                threshold: 0,
            }
        );

        headings.forEach((heading) => {
            observer.observe(heading);
        });
    }

    // Method to refresh TOC when content changes
    refresh() {
        this.generateTOC();
    }
}

customElements.define("rx-sidebar", RxSidebar);
