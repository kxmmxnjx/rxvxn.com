class HeroSection extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          background: linear-gradient(120deg, #14213d 0%, #22305a 100%);
          overflow: hidden;
        }
        .night-sky {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 0;
        }
        .star {
          position: absolute;
          width: 2.2px;
          height: 2.2px;
          background: #fff;
          border-radius: 50%;
          opacity: 0.8;
          animation: twinkle 2.2s infinite alternate;
        }
        @keyframes twinkle {
          to { opacity: 0.2; }
        }
        .container, h1, p {
          pointer-events: auto;
        }
        .container {
          text-align: center;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 1rem;
          position: relative;
          z-index: 1;
        }
        h1 {
          font-family: 'Montserrat', 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
          font-size: 3.5rem;
          margin-bottom: 1.2rem;
          letter-spacing: -2px;
          color: #f3f6fa;
          background: linear-gradient(90deg, #f3f6fa 60%, #6ec1e4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInText 1.2s cubic-bezier(.4,0,.2,1) 0.2s both;
        }
        p {
          font-size: 1.25rem;
          color: #b6c6e3;
          margin-bottom: 2.5rem;
          animation: fadeInText 1.2s cubic-bezier(.4,0,.2,1) 0.5s both;
        }
        @keyframes fadeInText {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
      </style>
      <div class="night-sky"></div>
      <section class="container">
        <h1>Ver.Omusic</h1>
      </section>
    `;
        // 별 동적 생성
        const sky = shadow.querySelector('.night-sky');
        for (let i = 0; i < 120; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = (Math.random() * 100) + '%';
            star.style.left = (Math.random() * 100) + '%';
            star.style.animationDelay = (Math.random() * 2.2) + 's';
            star.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
            sky.appendChild(star);
        }
        // 별똥별 스타일 추가
        const style = shadow.querySelector('style');
        style.textContent += `
          .meteor {
            position: absolute;
            width: 2px;
            height: 120px;
            background: linear-gradient(0deg, #fff 0%, rgba(255,255,255,0) 80%);
            opacity: 0.7;
            border-radius: 2px;
            pointer-events: none;
            z-index: 1;
            transform: rotate(-25deg);
            animation: meteor-fall 1.2s linear forwards;
          }
          @keyframes meteor-fall {
            0% {
              opacity: 0;
              transform: translateY(-180px) translateX(-60px) rotate(-25deg) scaleY(0.7);
            }
            10% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(0) translateX(0) rotate(-25deg) scaleY(1.1);
            }
          }
        `;
        // 별똥별 생성 함수
        function spawnMeteor() {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            // 시작 위치 랜덤 (상단 10~40% 구간, 좌측 0~80vw)
            meteor.style.top = (Math.random() * 30 + 10) + 'vh';
            meteor.style.left = (Math.random() * 80) + 'vw';
            meteor.style.height = (Math.random() * 60 + 80) + 'px';
            meteor.style.animationDuration = (Math.random() * 0.5 + 1) + 's';
            sky.appendChild(meteor);
            setTimeout(() => meteor.remove(), 1400);
        }
        setInterval(() => {
            if (Math.random() < 0.5) spawnMeteor();
        }, 900);
    }
}
customElements.define('hero-section', HeroSection);
