class FooterSection extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background: #1a2238;
          color: #f3f6fa;
          font-family: 'Montserrat', 'Arial', sans-serif;
        }
        .footer {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2.2rem 1.2rem 2.2rem 1.2rem;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
          font-size: 1rem;
        .footer-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1 1 0;
          min-width: 0;
        }
        }
        .footer-logo {
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: 0.08em;
          color: #ffb347;
          margin-bottom: 0.7rem;
          text-align: left;
          width: 100%;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.7rem;
          margin-bottom: 0;
          min-width: 120px;
        }
        .footer-link {
          color: #f3f6fa;
          text-decoration: none;
          font-size: 1.13rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: color 0.18s;
          cursor: pointer;
        }
        .footer-link:hover {
          color: #ffb347;
        }
        .footer-copy {
          font-size: 0.98rem;
          color: #bfc8e6;
          margin-top: 0.5rem;
          text-align: left;
          width: 100%;
        }
      </style>
      <footer class="footer">
        <div class="footer-left">
          <div class="footer-logo">ver.omusic</div>
          <div class="footer-copy">&copy; 2025 ver.omusic. All rights reserved.</div>
        </div>
        <div class="footer-links">
          <a href="#top" class="footer-link" id="footer-top-link">Top</a>
          <a href="#discography" class="footer-link" id="footer-disco-link">Discography</a>
          <a href="#profile" class="footer-link" id="footer-profile-link">Profile</a>
        </div>
      </footer>
    `;
        // Smooth scroll for footer links
        const scrollToSection = (selector) => {
            const root = window.document;
            let el = null;
            if (selector === '#top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            if (selector === '#discography') {
                el = root.querySelector('discography-section');
            } else if (selector === '#profile') {
                el = root.querySelector('profile-section');
            }
            if (el) {
                const rect = el.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                window.scrollTo({
                    top: rect.top + scrollTop - 40,
                    behavior: 'smooth'
                });
            }
        };
        this.shadowRoot.getElementById('footer-top-link').addEventListener('click', e => {
            e.preventDefault();
            scrollToSection('#top');
        });
        this.shadowRoot.getElementById('footer-disco-link').addEventListener('click', e => {
            e.preventDefault();
            scrollToSection('#discography');
        });
        this.shadowRoot.getElementById('footer-profile-link').addEventListener('click', e => {
            e.preventDefault();
            scrollToSection('#profile');
        });
    }
}
customElements.define('footer-section', FooterSection);
