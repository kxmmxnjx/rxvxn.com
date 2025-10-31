# 🚀 rxvxn.com 배포 체크리스트

## 완전한 배포 단계별 가이드

---

## Phase 1️⃣: 로컬 개발 완료 확인

### ✅ 코드 작성 완료

- [ ] 모든 Web Components 작성 완료
  - [ ] Atoms (Button, Card)
  - [ ] Molecules (ProjectCard)
  - [ ] Organisms (Navigation, Header, Sidebar)
  - [ ] Features (ProjectGrid)
- [ ] CSS 스타일 완료 (base, theme, layout)
- [ ] 라우팅 로직 구현 (main.js)
- [ ] 데이터 파일 작성 (projects.json)

### ✅ 로컬 테스트 완료

```bash
# 개발 서버 실행
./scripts/dev.sh

# 테스트 항목:
```

- [ ] <http://localhost:8000> 접속 성공
- [ ] 모든 페이지 라우팅 작동 (/, /projects, /demos, /art, /about)
- [ ] 브라우저 콘솔 에러 없음
- [ ] ProjectGrid에서 데이터 로딩 확인
- [ ] 반응형 디자인 테스트
  - [ ] Desktop (1120px+)
  - [ ] Tablet (768px-1119px)
  - [ ] Mobile (<768px)

### ✅ 빌드 테스트

```bash
./scripts/build.sh
ls -la public/
```

- [ ] `public/` 디렉터리 생성됨
- [ ] 모든 파일 복사됨 (index.html, assets/, pages/)
- [ ] build-info.json 생성됨

---

## Phase 2️⃣: 서버 준비 (OCI)

### ✅ OCI 인스턴스 생성

- [ ] Ubuntu 22.04 LTS 선택
- [ ] Shape 선택 (최소: VM.Standard.E2.1.Micro - 무료)
- [ ] 네트워크 설정
  - [ ] Public IP 할당
  - [ ] SSH 키 페어 생성/업로드
- [ ] 보안 목록 (Security List) 설정
  - [ ] Ingress Rule: Port 22 (SSH)
  - [ ] Ingress Rule: Port 80 (HTTP)
  - [ ] Ingress Rule: Port 443 (HTTPS)

### ✅ 서버 첫 접속

```bash
# SSH 접속 테스트
ssh ubuntu@<OCI_PUBLIC_IP>

# 성공 시:
```

- [ ] SSH 접속 성공
- [ ] 사용자: ubuntu
- [ ] sudo 권한 확인: `sudo whoami` → root

### ✅ 서버 초기 설정

```bash
# 로컬에서 스크립트 업로드
scp scripts/setup-server.sh ubuntu@<OCI_PUBLIC_IP>:~/

# 서버에서 실행
ssh ubuntu@<OCI_PUBLIC_IP>
chmod +x setup-server.sh
./setup-server.sh
```

#### 설정 과정 확인

- [ ] 시스템 업데이트 완료
- [ ] Nginx 설치 완료
- [ ] Node.js 설치 완료 (선택)
- [ ] PostgreSQL 설치 완료 (선택)
- [ ] 디렉터리 생성 (/var/www/rxvxn.com, /var/www/previews)
- [ ] 방화벽 (UFW) 활성화
- [ ] Certbot 설치 완료 (선택)

### ✅ Nginx 설정

```bash
# 로컬에서 설정 파일 업로드
scp nginx/rxvxn.conf ubuntu@<OCI_PUBLIC_IP>:/tmp/

# 서버에서 설정
ssh ubuntu@<OCI_PUBLIC_IP>
sudo mv /tmp/rxvxn.conf /etc/nginx/sites-available/rxvxn.conf
sudo ln -s /etc/nginx/sites-available/rxvxn.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 확인

- [ ] Nginx 설정 파일 복사됨
- [ ] Symbolic link 생성됨
- [ ] `nginx -t` 통과
- [ ] Nginx 재시작 성공

---

## Phase 3️⃣: 첫 배포

### ✅ deploy.sh 설정

```bash
# 로컬에서 편집
nano scripts/deploy.sh

# 변경 사항:
# SERVER_HOST="<OCI_PUBLIC_IP>"
# SERVER_USER="ubuntu"
# SSH_KEY="$HOME/.ssh/id_rsa"  # 또는 OCI 키 경로
```

- [ ] SERVER_HOST 설정 완료
- [ ] SSH 키 경로 확인
- [ ] SSH 키 권한 확인: `chmod 600 ~/.ssh/id_rsa`

### ✅ 배포 실행

```bash
./scripts/deploy.sh
```

#### 배포 과정 확인

- [ ] 백업 생성됨
- [ ] 파일 동기화 완료 (rsync)
- [ ] 권한 설정 완료 (www-data)
- [ ] Nginx 재시작 완료
- [ ] HTTP 200 응답 확인

### ✅ 배포 확인

```bash
# 로컬에서 테스트
curl -I http://<OCI_PUBLIC_IP>

# 브라우저에서 접속
# http://<OCI_PUBLIC_IP>
```

- [ ] HTTP/1.1 200 OK 응답
- [ ] 브라우저에서 사이트 로딩 확인
- [ ] 모든 페이지 라우팅 작동
- [ ] 정적 파일 로딩 (CSS, JS, 이미지)

---

## Phase 4️⃣: DNS 설정

### ✅ 도메인 구매 (이미 있다면 건너뛰기)

- [ ] 도메인 구매처: Namecheap, GoDaddy, Cloudflare 등
- [ ] 도메인 이름: rxvxn.com

### ✅ DNS 레코드 추가

#### DNS 관리 패널에서

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `<OCI_PUBLIC_IP>` | 300 |
| A | www | `<OCI_PUBLIC_IP>` | 300 |

- [ ] A 레코드 추가 완료
- [ ] DNS 전파 대기 (5분~48시간)

### ✅ DNS 전파 확인

```bash
# 로컬에서 확인
dig rxvxn.com
dig www.rxvxn.com

# 또는
nslookup rxvxn.com
```

- [ ] DNS 쿼리가 올바른 IP 반환
- [ ] www 서브도메인도 확인

### ✅ 도메인으로 접속 테스트

```bash
curl -I http://rxvxn.com
```

- [ ] HTTP 200 응답
- [ ] 브라우저에서 <http://rxvxn.com> 접속 성공

---

## Phase 5️⃣: SSL 인증서 (HTTPS)

### ✅ Certbot으로 SSL 설치

```bash
# 서버에서 실행
ssh ubuntu@<OCI_PUBLIC_IP>
sudo certbot --nginx -d rxvxn.com -d www.rxvxn.com
```

#### 프롬프트 응답

- [ ] 이메일 주소 입력
- [ ] 약관 동의 (Y)
- [ ] 뉴스레터 거부 (N)
- [ ] Redirect HTTP to HTTPS 선택 (2)

#### 확인 (Nginx 설정)

- [ ] 인증서 발급 성공
- [ ] Nginx 설정 자동 업데이트
- [ ] HTTPS 리다이렉트 설정

### ✅ HTTPS 접속 테스트

```bash
curl -I https://rxvxn.com
```

- [ ] HTTP 200 응답
- [ ] 브라우저에서 <https://rxvxn.com> 접속
- [ ] 자물쇠 아이콘 표시 (유효한 인증서)
- [ ] HTTP → HTTPS 자동 리다이렉트 확인

### ✅ SSL 자동 갱신 확인

```bash
# 서버에서
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

- [ ] certbot.timer 활성화됨
- [ ] Dry run 성공

---

## Phase 6️⃣: 백엔드 배포 (선택 사항)

### ✅ 백엔드 파일 업로드

```bash
# 로컬에서
scp -r server ubuntu@<OCI_PUBLIC_IP>:/var/www/rxvxn.com/
```

- [ ] server/ 디렉터리 업로드 완료
- [ ] index.js 확인
- [ ] data/previews.json 확인

### ✅ Systemd 서비스 설정

```bash
# 서버에서
sudo cp /var/www/rxvxn.com/systemd/rxvxn.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable rxvxn
sudo systemctl start rxvxn
sudo systemctl status rxvxn
```

- [ ] 서비스 파일 복사됨
- [ ] 서비스 활성화됨
- [ ] 서비스 시작 성공
- [ ] Status: active (running)

### ✅ Nginx API 프록시 설정

```bash
# 서버에서
sudo nano /etc/nginx/sites-available/rxvxn.conf

# location /api 블록 주석 해제 (45-57행)

sudo nginx -t
sudo systemctl reload nginx
```

- [ ] API 프록시 블록 활성화
- [ ] Nginx 설정 테스트 통과
- [ ] Nginx 재시작 완료

### ✅ API 테스트

```bash
curl https://rxvxn.com/api/health
```

- [ ] JSON 응답: `{"status":"ok",...}`
- [ ] 브라우저에서 <https://rxvxn.com/api/previews> 접속

---

## Phase 7️⃣: 데이터베이스 (선택 사항)

### ✅ PostgreSQL 데이터베이스 생성

```bash
# 서버에서
sudo -u postgres psql
```

```sql
CREATE DATABASE rxvxn;
\q
```

- [ ] 데이터베이스 생성 완료

### ✅ 스키마 및 시드 데이터 로드

```bash
# 로컬에서 SQL 파일 업로드
scp db/schema.sql ubuntu@<OCI_PUBLIC_IP>:/tmp/
scp db/seed.sql ubuntu@<OCI_PUBLIC_IP>:/tmp/

# 서버에서 실행
sudo -u postgres psql -d rxvxn -f /tmp/schema.sql
sudo -u postgres psql -d rxvxn -f /tmp/seed.sql
```

- [ ] 테이블 생성 완료
- [ ] 샘플 데이터 삽입 완료

### ✅ 데이터베이스 확인

```bash
sudo -u postgres psql -d rxvxn -c "SELECT COUNT(*) FROM projects;"
```

- [ ] 프로젝트 데이터 확인 (5개 이상)

---

## Phase 8️⃣: 최종 검증

### ✅ 기능 테스트

#### 브라우저에서 <https://rxvxn.com> 접속

- [ ] 홈페이지 로딩
- [ ] 네비게이션 작동
- [ ] Projects 페이지 (/projects)
- [ ] Demos 페이지 (/demos)
- [ ] Art 페이지 (/art)
- [ ] About 페이지 (/about)
- [ ] 404 페이지 테스트

### ✅ 반응형 테스트

- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### ✅ 성능 테스트

#### Chrome DevTools

- [ ] Lighthouse 점수 확인
  - [ ] Performance > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 90

### ✅ 크로스 브라우저 테스트

- [ ] Chrome
- [ ] Firefox
- [ ] Safari (Mac/iOS)
- [ ] Edge

---

## Phase 9️⃣: 모니터링 & 유지보수

### ✅ 로그 확인

```bash
# Nginx 로그
sudo tail -f /var/log/nginx/rxvxn.com-access.log
sudo tail -f /var/log/nginx/rxvxn.com-error.log

# 백엔드 로그 (사용 시)
sudo journalctl -u rxvxn -f
```

- [ ] 로그 파일 접근 가능
- [ ] 에러 로그 확인

### ✅ 자동 백업 설정 (선택)

```bash
# 서버에서 crontab 설정
crontab -e

# 추가:
# 0 3 * * * /var/www/rxvxn.com/scripts/backup.sh
```

### ✅ 업데이트 프로세스 확립

```bash
# 로컬에서 코드 수정 후
./scripts/build.sh
./scripts/deploy.sh
```

- [ ] Git 커밋 및 푸시
- [ ] 빌드 실행
- [ ] 배포 실행
- [ ] 사이트 확인

---

## 🎉 배포 완료

### 최종 체크리스트

- [x] 로컬 개발 환경 구축
- [x] OCI 서버 설정
- [x] Nginx 설정
- [x] 첫 배포 성공
- [x] DNS 설정
- [x] SSL 인증서 설치
- [ ] 백엔드 배포 (선택)
- [ ] 데이터베이스 설정 (선택)
- [x] 모든 기능 테스트 통과
- [x] 반응형 디자인 확인
- [x] 성능 최적화

### 사이트 URL

- **Main Site:** <https://rxvxn.com>
- **API Health:** <https://rxvxn.com/api/health> (백엔드 사용 시)

### 다음 단계

1. **콘텐츠 추가:** 실제 프로젝트 데이터 및 이미지 추가
2. **서브도메인 프리뷰:** `scripts/publish-preview.sh` 사용
3. **Analytics 추가:** Google Analytics 또는 자체 구축
4. **SEO 최적화:** meta 태그, sitemap.xml, robots.txt
5. **PWA 기능:** Service Worker, manifest.json

---

### 축하합니다 🎊 rxvxn.com이 성공적으로 배포되었습니다

버전: 1.0.0  
최종 업데이트: 2025-11-01
