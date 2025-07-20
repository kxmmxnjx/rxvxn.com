class DiscographySection extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
      <style>
        :host {
          display: block;
          background: #101625ff;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 7rem 1rem 5rem 1rem;
          position: relative;
        }
        /* h2 removed, replaced by .disco-tape */
        .disco-tape {
          position: absolute;
          top: 0;
          left: 50%;
          width: 100vw;
          transform: translateX(-50%);
          overflow: hidden;
          color: #ff8e25ff;
          font-family: 'Montserrat', 'Arial', sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.2;
          border-radius: 0;
          margin: 0;
          padding: 0.7rem 0 0.7rem 0;
          z-index: 100;
          text-transform: uppercase;
          pointer-events: none;
          opacity: 1;
          transition: opacity 0.4s;
          border-top: 2px solid rgba(255,179,71,0.7);
          border-bottom: 2px solid rgba(255,179,71,0.7);
        }
        .disco-tape.visible {
          opacity: 1;
        }
        .disco-tape .tape-inner {
          display: inline-block;
          width: max-content;
          white-space: nowrap;
          animation: tape-scroll 30s linear infinite;
        }
        /* ::after 제거 */
        @keyframes tape-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem;
        }
        .cover {
          border-radius: 0;
          box-shadow: 0 2px 16px 0 rgba(20,33,61,0.08);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: fadeInCard 1s cubic-bezier(.4,0,.2,1) both;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cover:hover {
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 8px 32px 0 rgba(20,33,61,0.18);
        }
        .cover-img {
          width: 100%;
          max-width: 220px;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 0;
          background: #22305a;
          cursor: pointer;
          transition: filter 0.2s;
        }
        .cover-img:hover {
          filter: brightness(1.08) saturate(1.2);
          transform: scale(0.98);
        }
        .cover-title {
          color: #f3f6fa;
          font-size: 1rem;
          margin: 1rem 0 1.2rem 0;
          text-align: center;
        }
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
      </style>
      <section class="container discography-section">
        <div class="disco-tape">
          <div class="tape-inner">
            DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;
            DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;DISCOGRAPHY&nbsp;
          </div>
        </div>
        <div class="grid">
          <a class="cover" href="https://soundcloud.com/ver-omusic/i-really-want-to-stay-at-your-house-remix" target="_blank" rel="noopener">
            <img class="cover-img" src="/ver-omusic/assets/images/single/i-really-want-to-stay-at-your-house-remix.jpg" alt="I Really Want To Stay At Your House (Remix)" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/funk" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/funk.jpg" alt="Funk" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/e1b3fe6a-3f81-4441-a38e-abb16f4a1b21" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/himitsu.jpg" alt="Himitsu" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/25415986-4a6a-4635-a27b-917b1826c07a" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/shingeki-no-kyojin-wo-mite.jpg" alt="Shingeki no Kyojin wo Mite" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/gear" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/gear.jpg" alt="Gear" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/hi-oni" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/hi-oni.jpg" alt="Hi Oni" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/countrymalone" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/countrymalone.jpg" alt="Countrymalone" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/whiplash-remix-iron-flavor" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/whiplash-remix-iron-flavor.jpg" alt="Whiplash (Remix) - Iron Flavor" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/department-store" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/department-store.jpg" alt="Department Store" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/cyberpunk-trap" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/cyberpunk-trap.jpg" alt="Cyberpunk Trap" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/naughty-boy" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/naughty-boy.jpg" alt="Naughty Boy" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/run-run" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/run-run.jpg" alt="Run Run" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/my-mistakes" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/my-mistakes.jpg" alt="My Mistakes" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/alone" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/alone.jpg" alt="Alone" />
          </a>
          <a class="cover" href="https://soundcloud.com/ver-omusic/look-back" target="_blank" rel="noopener" tabindex="-1">
            <img class="cover-img" src="/assets/images/single/look-back.jpg" alt="Look Back" />
          </a>
        </div>
      </section>
    `;
        // 더 이상 Intersection Observer 필요 없음 (absolute로 항상 섹션 상단에서만 보임)
    }
}
customElements.define('discography-section', DiscographySection);
