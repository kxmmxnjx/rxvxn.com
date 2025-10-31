# rxvxn.com - Quick Start Guide

## 개인 포트폴리오 사이트 개발 완료 가이드

---

## 📁 프로젝트 구조

```text
rxvxn.com/
├── src/                          # 소스 파일
│   ├── index.html               # 메인 HTML
│   ├── pages/                   # 추가 페이지
│   │   ├── demos.html
│   │   └── art.html
│   └── assets/
│       ├── css/                 # 스타일
│       │   ├── base.css         # 리셋 & 타이포그래피
│       │   ├── theme.css        # 디자인 토큰
│       │   └── layout.css       # 레이아웃 & 반응형
│       ├── js/
│       │   ├── main.js          # 메인 앱 로직
│       │   ├── utils/           # 유틸리티
│       │   │   ├── router.js    # 클라이언트 라우팅
│       │   │   ├── fetcher.js   # 데이터 페칭
│       │   │   └── dom.js       # DOM 헬퍼
│       │   └── components/      # Web Components
│       │       ├── atoms/       # Button, Card
│       │       ├── molecules/   # ProjectCard
│       │       ├── organisms/   # Navigation, Header, Sidebar
│       │       └── features/    # ProjectGrid
│       └── data/
│           └── projects.json    # 프로젝트 데이터
├── public/                      # 빌드 결과물 (생성됨)
├── server/                      # Node.js 백엔드 (선택)
│   ├── index.js                # API 서버
│   └── data/
│       └── previews.json       # 프리뷰 데이터
├── scripts/                     # 자동화 스크립트
│   ├── dev.sh                  # 개발 서버
│   ├── build.sh                # 빌드
│   ├── deploy.sh               # 배포
│   ├── setup-server.sh         # 서버 초기 설정
│   └── publish-preview.sh      # 서브도메인 생성
├── nginx/
│   └── rxvxn.conf              # Nginx 설정
├── systemd/
│   └── rxvxn.service           # Systemd 서비스
├── db/                          # PostgreSQL (선택)
│   ├── schema.sql
│   └── seed.sql
├── README.md                    # 프로젝트 개요
└── DEVELOPMENT.md               # 상세 개발 가이드
```

---

## 🚀 빠른 시작 (로컬)

### 1. 개발 서버 실행

```bash
cd ~/project/rxvxn.com
./scripts/dev.sh
```

브라우저에서 `http://localhost:8000` 접속

### 2. 코드 수정

- **스타일 변경:** `src/assets/css/` 파일 수정
- **컴포넌트 수정:** `src/assets/js/components/` 파일 수정
- **데이터 수정:** `src/assets/data/projects.json` 수정
- **페이지 추가:** `src/pages/` 에 HTML 파일 추가

### 3. 브라우저에서 새로고침

변경사항이 즉시 반영됩니다 (빌드 도구 불필요).

---

## 📦 프로덕션 빌드 & 배포

### Step 1: 빌드

```bash
./scripts/build.sh
```

→ `public/` 디렉터리에 결과물 생성

### Step 2: 서버 초기 설정 (최초 1회)

#### OCI 서버에 SSH 접속

```bash
ssh ubuntu@your-oci-ip
```

#### 설정 스크립트 업로드 및 실행

```bash
# 로컬에서
scp scripts/setup-server.sh ubuntu@your-oci-ip:~/

# 서버에서
chmod +x setup-server.sh
./setup-server.sh
```

#### Nginx 설정

```bash
# 로컬에서
scp nginx/rxvxn.conf ubuntu@your-oci-ip:/tmp/

# 서버에서
sudo mv /tmp/rxvxn.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/rxvxn.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 3: 배포

#### deploy.sh 설정 수정

```bash
nano scripts/deploy.sh
# 변경: SERVER_HOST="your-oci-ip"
```

#### 배포 실행

```bash
./scripts/deploy.sh
```

### Step 4: DNS 설정

#### 도메인 DNS에 A 레코드 추가

- Type: A
- Name: @ (또는 www)
- Value: your-oci-ip
- TTL: 300

### Step 5: SSL 설정

#### 서버에서 (프리뷰)

```bash
sudo certbot --nginx -d rxvxn.com -d www.rxvxn.com
```

---

## 🛠️ 개발 워크플로우

### 새 컴포넌트 추가하기

#### 1. 컴포넌트 파일 생성

```bash
touch src/assets/js/components/atoms/MyComponent.js
```

#### 2. 컴포넌트 코드 작성

```javascript
class RxMyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* 스타일 */
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('rx-my-component', RxMyComponent);
```

#### 3. index.html에 등록

```html
<script type="module" src="/assets/js/components/atoms/MyComponent.js"></script>
```

#### 4. 사용

```html
<rx-my-component>Content</rx-my-component>
```

### 새 페이지 추가하기

#### 1. 라우트 등록 (main.js)

```javascript
router.register('/new-page', () => {
  this.renderPage('New Page', 'Description', `
    <div>Page content</div>
  `);
});
```

#### 2. 네비게이션에 링크 추가 (Navigation.js)

```html
<li class="nav-item"><a href="/new-page" data-route="/new-page">New Page</a></li>
```

### 프로젝트 데이터 추가하기

#### projects.json 수정

```json
{
  "id": "my-project",
  "title": "My Project",
  "description": "Project description",
  "image": "/assets/images/projects/my-project.png",
  "tags": ["Tag1", "Tag2"],
  "url": "/demos/my-project",
  "category": "demo",
  "featured": true
}
```

---

## 🔧 백엔드 (선택 사항)

### 로컬에서 백엔드 실행

```bash
cd server
node index.js
```

→ `http://localhost:3000` 에서 API 실행

### API 엔드포인트

- `GET /api/health` - 헬스체크
- `GET /api/previews` - 모든 프리뷰 조회
- `POST /api/previews` - 프리뷰 생성
- `PUT /api/previews/:subdomain` - 프리뷰 수정
- `DELETE /api/previews/:subdomain` - 프리뷰 삭제

### 서버에 백엔드 배포

```bash
# 로컬에서 서버 파일 업로드
scp -r server ubuntu@your-oci-ip:/var/www/rxvxn.com/

# 서버에서 systemd 설정
sudo cp /var/www/rxvxn.com/systemd/rxvxn.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable rxvxn
sudo systemctl start rxvxn
sudo systemctl status rxvxn
```

### Nginx에 API 프록시 추가

#### rxvxn.conf 수정

```nginx
# location /api 블록 주석 해제 (45-57행)
```

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🌐 서브도메인 프리뷰

### 프리뷰 생성

#### 서버에서

```bash
sudo /var/www/rxvxn.com/scripts/publish-preview.sh
```

#### 입력

- Subdomain: `john` (john.rxvxn.com)
- Owner: `John Doe`
- Target: `https://example.com` 또는 로컬 경로

### DNS 설정

#### A 레코드 추가

- Name: `john`
- Value: your-oci-ip

### SSL 설정

```bash
sudo certbot --nginx -d john.rxvxn.com
```

---

## 📊 주요 명령어

### 로컬 개발 (명령어)

```bash
./scripts/dev.sh           # 개발 서버
./scripts/build.sh         # 빌드
./scripts/deploy.sh        # 배포
```

### 서버 관리

```bash
# Nginx
sudo systemctl status nginx
sudo systemctl reload nginx
sudo nginx -t

# 백엔드 (사용 시)
sudo systemctl status rxvxn
sudo systemctl restart rxvxn
sudo journalctl -u rxvxn -f

# 로그
sudo tail -f /var/log/nginx/rxvxn.com-access.log
sudo tail -f /var/log/nginx/rxvxn.com-error.log
```

---

## ✅ 개발 체크리스트

### 로컬 개발 (체크리스트)

- [ ] 개발 서버 실행 (`./scripts/dev.sh`)
- [ ] 컴포넌트 개발 및 테스트
- [ ] 반응형 디자인 확인 (1120px / 768px / 480px)
- [ ] 브라우저 콘솔 에러 확인
- [ ] 라우팅 동작 확인

### 배포 준비

- [ ] 빌드 스크립트 실행 (`./scripts/build.sh`)
- [ ] `public/` 디렉터리 확인
- [ ] `deploy.sh`에 서버 IP 설정
- [ ] SSH 키 설정 완료

### 서버 설정

- [ ] OCI 인스턴스 생성
- [ ] `setup-server.sh` 실행
- [ ] Nginx 설정 복사 및 활성화
- [ ] 방화벽 설정 (80, 443, 22)

### 배포

- [ ] `./scripts/deploy.sh` 실행
- [ ] DNS A 레코드 설정
- [ ] SSL 인증서 설치
- [ ] 사이트 접속 테스트

### 선택 사항

- [ ] 백엔드 서버 배포
- [ ] PostgreSQL 설정
- [ ] 서브도메인 프리뷰 설정

---

## 🐛 문제 해결

### 컴포넌트가 렌더링 안 됨

1. 브라우저 콘솔 에러 확인
2. HTML에 스크립트 import 확인
3. `customElements.define()` 호출 확인

### 라우팅 작동 안 함

1. Nginx `try_files` 설정 확인
2. `main.js`에서 router 초기화 확인
3. 브라우저 Network 탭 확인

### 데이터 로딩 안 됨

1. `projects.json` 경로 확인
2. fetch URL 확인
3. CORS 에러 확인

### 배포 실패

1. SSH 키 설정 확인
2. `deploy.sh`의 서버 IP 확인
3. `build.sh` 실행 여부 확인
4. 서버 디스크 공간 확인: `df -h`

---

## 📚 추가 자료

- **상세 개발 가이드:** `DEVELOPMENT.md`
- **Web Components:** <https://developer.mozilla.org/en-US/docs/Web/Web_Components>
- **Atomic Design:** <https://bradfrost.com/blog/post/atomic-web-design/>

---

**버전:** 1.0.0  
**최종 업데이트:** 2025-11-01
