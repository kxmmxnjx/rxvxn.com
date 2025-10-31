/**
 * Footer Component (Organism)
 * Site footer with copyright and links
 */

class RxFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const currentYear = new Date().getFullYear();

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .footer {
          border-top: 1px solid #000;
          padding: 2rem 0;
          margin-top: 4rem;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright {
          font-size: 0.875rem;
        }

        .footer-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
        }

        .footer-links a {
          color: #000;
          text-decoration: none;
          font-size: 0.875rem;
        }

        .footer-links a:hover {
          text-decoration: underline;
        }

        @media (max-width: 767px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      </style>
      <footer class="footer">
        <div class="footer-content">
          <div class="copyright">
            © ${currentYear} rxvxn.com. All rights reserved.
          </div>
          <ul class="footer-links">
            <li><a href="https://github.com/kxmmxnjx" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </footer>
    `;
    }
}

customElements.define("rx-footer", RxFooter);
