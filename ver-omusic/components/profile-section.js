class ProfileSection extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
      <style>
        :host {
          display: block;
          background: #22305a;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 5.5rem 1.2rem 5.5rem 1.1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          position: relative;
        }
        .profile-card {
          background: #22305a;
          border-radius: 2.2rem;
          box-shadow: none;
          padding: 2.7rem 2.2rem 2.7rem 2.2rem;
          max-width: 480px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
          margin-left: 0;
        }
        .profile-card.visible {
          opacity: 1;
          transform: none;
        }
        .profile-label {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          position: absolute;
          left: 1rem;
          top: 9rem;
          height: auto;
          width: auto;
          font-size: 1.05rem;
          font-weight: 600;
          color: #bfc8e6;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-family: 'Montserrat', 'Arial', sans-serif;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          text-align: left;
          margin-bottom: 0;
          user-select: none;
          z-index: 2;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
        }
        .profile-label.visible {
          opacity: 1;
          transform: none;
        }
        .profile-label span {
          display: inline-block;
          transform: rotate(180deg);
        }
        .profile-name {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffb347;
          letter-spacing: 0.04em;
          margin-bottom: 0.3rem;
          font-family: 'Montserrat', 'Arial', sans-serif;
          text-align: center;
        }
        .profile-divider {
          width: 38px;
          height: 3px;
          background: linear-gradient(90deg, #ffb347 60%, #22305a 100%);
          border-radius: 2px;
          margin: 0.2rem auto 0.7rem auto;
        }
        .profile-subtitle {
          font-size: 1.08rem;
          color: #f3f6fa;
          font-weight: 500;
          text-align: center;
          margin-bottom: 1.2rem;
          opacity: 0.82;
        }
        .profile-desc {
          font-size: 1.13rem;
          color: #f3f6fa;
          line-height: 1.8;
          margin-bottom: 2.5rem;
          text-align: center;
        }
        .links {
          display: flex;
          gap: 1.1rem;
          margin-top: 0.5rem;
          justify-content: center;
        }
        .link-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          background: #2d406b;
          color: #ffb347;
          font-size: 1.45rem;
          margin: 0;
          border: none;
          box-shadow: 0 2px 12px 0 rgba(20,33,61,0.08);
          transition: background 0.18s, color 0.18s, transform 0.18s;
        }
        .link-btn:hover {
          background: #ffb347;
          color: #22305a;
          transform: translateY(-2px) scale(1.09);
        }
        .link-btn.soundcloud svg { fill: #ffb347; }
        .link-btn.instagram svg { fill: #e4405f; }
        .link-btn.youtube svg { fill: #ff4444; }
        .link-btn.email svg { fill: #ffb347; }
        .link-btn:hover svg { fill: #22305a; }
        /* fadeInCard keyframes 제거 (transition으로 대체) */
      </style>
      <section class="container" style="position:relative;">
        <div class="profile-label"><span>PROFILE</span></div>
        <div class="profile-card">
          <div class="profile-name">Ver.Omusic</div>
          <div class="profile-divider"></div>
          <div class="profile-subtitle">Producer</div>
          <div class="profile-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.</div>
          <div class="links">
            <a href="https://soundcloud.com/ver-omusic" target="_blank" rel="noopener" class="link-btn soundcloud" title="SoundCloud">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M17.5 15.5c-.3 0-.5-.2-.5-.5v-6c0-.3.2-.5.5-.5s.5.2.5.5v6c0 .3-.2.5-.5.5zm-2.5.5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5s.5.2.5.5v7c0 .3-.2.5-.5.5zm-2.5.5c-.3 0-.5-.2-.5-.5v-8c0-.3.2-.5.5-.5s.5.2.5.5v8c0 .3-.2.5-.5.5zm-2.5.5c-.3 0-.5-.2-.5-.5v-9c0-.3.2-.5.5-.5s.5.2.5.5v9c0 .3-.2.5-.5.5zm-2.5.5c-.3 0-.5-.2-.5-.5v-10c0-.3.2-.5.5-.5s.5.2.5.5v10c0 .3-.2.5-.5.5z"/></svg>
            </a>
            <a href="https://instagram.com/vero_music39" target="_blank" rel="noopener" class="link-btn instagram" title="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.4 1 .4.4.7.8 1 1.4.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.4-.4.4-.8.7-1.4 1-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.4-1-.4-.4-.7-.8-1-1.4-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.4.4-.4.8-.7 1.4-1 .4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.7.4 3.9.7c-.9.3-1.6.7-2.3 1.4C.4 3.1 0 3.8-.3 4.7c-.3.8-.5 1.8-.6 3.1C-.9 8.3-.9 8.7-.9 12c0 3.3 0 3.7.1 5 .1 1.3.3 2.3.6 3.1.3.9.7 1.6 1.4 2.3.7.7 1.4 1.1 2.3 1.4.8.3 1.8.5 3.1.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.3-.3 3.1-.6.9-.3 1.6-.7 2.3-1.4.7-.7 1.1-1.4 1.4-2.3.3-.8.5-1.8.6-3.1.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.3-.6-3.1-.3-.9-.7-1.6-1.4-2.3C20.9.4 20.2 0 19.3-.3c-.8-.3-1.8-.5-3.1-.6C15.7-.9 15.3-.9 12-.9zM12 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 1 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>
            </a>
            <a href="https://www.youtube.com/@Ver.Omusic39_mydiary" target="_blank" rel="noopener" class="link-btn youtube" title="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C19.1 3.3 12 3.3 12 3.3s-7.1 0-9.1.5C1.7 4.1.8 5 .5 6.2.1 8.2.1 12 .1 12s0 3.8.4 5.8c.3 1.2 1.2 2.1 2.4 2.4 2 .5 9.1.5 9.1.5s7.1 0 9.1-.5c1.2-.3 2.1-1.2 2.4-2.4.4-2 .4-5.8.4-5.8s0-3.8-.4-5.8zM9.8 15.3V8.7l6.4 3.3-6.4 3.3z"/></svg>
            </a>
            <a href="mailto:zktmxldpf@naver.com" class="link-btn email" title="Email">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z"/></svg>
            </a>
          </div>
        </div>
        </div>
      </section>
    `;
        // IntersectionObserver로 스크롤 진입 시 카드에 visible 클래스 추가
        const card = shadow.querySelector('.profile-card');
        const label = shadow.querySelector('.profile-label');
        if (card || label) {
            const observer = new window.IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (entry.target === card) card.classList.add('visible');
                            if (entry.target === label) label.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.2 }
            );
            if (card) observer.observe(card);
            if (label) observer.observe(label);
        }
    }
}
customElements.define('profile-section', ProfileSection);
