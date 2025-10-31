# 📚 rxvxn.com 문서 목차

## 프로젝트 전체 문서 가이드

---

## 🎯 문서 구조

이 프로젝트는 5개의 주요 문서로 구성되어 있습니다:

### 1. 📖 [README.md](./README.md)

#### 프로젝트 개요 및 소개

- 프로젝트 목적
- 디자인 콘셉트
- 기술 스택
- 디렉터리 구조
- Getting Started

👉 **누가 읽어야 하나?**  

- 처음 프로젝트를 접하는 사람
- 프로젝트 개요를 빠르게 파악하고 싶은 사람

---

### 2. ⚡ [QUICKSTART.md](./QUICKSTART.md)

#### 빠른 시작 가이드

- 프로젝트 구조 요약
- 로컬 개발 빠른 시작 (3단계)
- 빌드 & 배포 요약
- 개발 워크플로우 (컴포넌트, 페이지 추가)
- 백엔드 & 서브도메인 설정
- 주요 명령어 치트시트
- 개발 체크리스트
- 문제 해결

👉 **누가 읽어야 하나?**  

- 빠르게 개발을 시작하고 싶은 사람
- 자주 사용하는 명령어를 찾는 사람
- 특정 작업(컴포넌트 추가, 페이지 추가)을 하려는 사람

#### 추천 사용 시나리오 (README)

```bash
# "어떻게 시작하지?" → QUICKSTART.md
# "컴포넌트를 어떻게 추가하지?" → QUICKSTART.md
# "자주 쓰는 명령어가 뭐였지?" → QUICKSTART.md
```text

---

### 3. 📘 [DEVELOPMENT.md](./DEVELOPMENT.md)

#### 상세 개발 가이드 (700줄+)

- Phase별 상세 개발 단계 (8단계)
  - Phase 1: 초기 설정
  - Phase 2: 프론트엔드 개발
  - Phase 3: 빌드 & 배포
  - Phase 4: 백엔드 (선택)
  - Phase 5: 데이터베이스 (선택)
  - Phase 6: 서브도메인 프리뷰
  - Phase 7: 모니터링
  - Phase 8: 문제 해결
- 각 단계별 코드 예시
- 서버 설정 상세 설명
- DNS, SSL, Nginx 설정
- 로그 확인 방법
- 문제 해결 가이드
- 추가 리소스 링크

👉 **누가 읽어야 하나?**  

- 전체 개발 과정을 이해하고 싶은 사람
- 서버 설정을 처음 하는 사람
- 문제가 발생했을 때 심층 분석이 필요한 사람
- 각 도구(Nginx, systemd, PostgreSQL)를 배우고 싶은 사람

#### 추천 사용 시나리오 (QUICKSTART)

```bash
# "OCI 서버를 어떻게 설정하지?" → DEVELOPMENT.md Phase 3
# "Nginx 설정이 무슨 의미지?" → DEVELOPMENT.md Phase 3
# "백엔드를 어떻게 배포하지?" → DEVELOPMENT.md Phase 4
# "에러가 났는데 원인을 모르겠어" → DEVELOPMENT.md Phase 8
```text

---

### 4. ✅ [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)

#### 배포 체크리스트 (단계별)

- 9단계 배포 프로세스
  - Phase 1: 로컬 개발 완료 확인
  - Phase 2: 서버 준비 (OCI)
  - Phase 3: 첫 배포
  - Phase 4: DNS 설정
  - Phase 5: SSL 인증서
  - Phase 6: 백엔드 배포
  - Phase 7: 데이터베이스
  - Phase 8: 최종 검증
  - Phase 9: 모니터링
- 각 단계별 체크박스
- 명령어 스니펫
- 검증 방법

👉 **누가 읽어야 하나?**  

- 프로덕션 배포를 준비하는 사람
- 배포 과정을 빠뜨리지 않고 확인하고 싶은 사람
- 팀원에게 배포 프로세스를 전달하려는 사람

#### 추천 사용 시나리오 (PROJECT-SUMMARY)

```bash
# "배포할 준비가 됐는데 뭘 확인해야 하지?" → DEPLOYMENT-CHECKLIST.md
# "배포 중 어디까지 했더라?" → DEPLOYMENT-CHECKLIST.md (체크박스 확인)
# "SSL 설정을 잊었나?" → DEPLOYMENT-CHECKLIST.md Phase 5
```text

---

### 5. 📊 [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md)

#### 프로젝트 완료 보고서

- 프로젝트 전체 개요
- 완성된 디렉터리 구조 (시각화)
- 구현 완료 항목 (100% 체크리스트)
- 디자인 시스템 설명
- 기술적 특징 & 아키텍처
- 배포 워크플로우
- 파일 통계 (코드 라인 수)
- 배운 점 & 특징
- 다음 단계 제안

👉 **누가 읽어야 하나?**  

- 프로젝트 전체를 한눈에 보고 싶은 사람
- 프로젝트 완성도를 확인하고 싶은 사람
- 프로젝트 구조와 아키텍처를 이해하고 싶은 사람
- 포트폴리오나 보고서를 작성하는 사람

#### 추천 사용 시나리오

```bash
# "이 프로젝트가 뭘 구현했지?" → PROJECT-SUMMARY.md
# "어떤 기술을 썼지?" → PROJECT-SUMMARY.md
# "프로젝트 완성도가 어느 정도지?" → PROJECT-SUMMARY.md
# "보고서를 쓰는데 참고할 자료가 필요해" → PROJECT-SUMMARY.md
```text

---

## 🎯 상황별 문서 가이드

### 시나리오 1: "처음 프로젝트를 접했어요"

1. [README.md](./README.md) - 프로젝트 이해
2. [QUICKSTART.md](./QUICKSTART.md) - 로컬 개발 시작
3. [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md) - 전체 구조 파악

### 시나리오 2: "로컬 개발을 시작하고 싶어요"

1. [QUICKSTART.md](./QUICKSTART.md) - "빠른 시작" 섹션
2. 터미널: `./scripts/dev.sh`
3. 브라우저: `http://localhost:8000`

### 시나리오 3: "새 컴포넌트를 추가하고 싶어요"

1. [QUICKSTART.md](./QUICKSTART.md) - "새 컴포넌트 추가하기" 섹션
2. [DEVELOPMENT.md](./DEVELOPMENT.md) - Phase 2 (상세 설명)
3. 기존 컴포넌트 코드 참고 (`src/assets/js/components/`)

### 시나리오 4: "프로덕션에 배포하고 싶어요"

1. [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) - 전체 체크리스트
2. [DEVELOPMENT.md](./DEVELOPMENT.md) - Phase 3~5 (상세 명령어)
3. [QUICKSTART.md](./QUICKSTART.md) - 명령어 치트시트

### 시나리오 5: "서버 설정이 막혔어요"

1. [DEVELOPMENT.md](./DEVELOPMENT.md) - Phase 3 (서버 설정)
2. [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) - Phase 2 (OCI 설정)
3. [DEVELOPMENT.md](./DEVELOPMENT.md) - Phase 8 (문제 해결)

### 시나리오 6: "백엔드를 추가하고 싶어요"

1. [QUICKSTART.md](./QUICKSTART.md) - "백엔드" 섹션
2. [DEVELOPMENT.md](./DEVELOPMENT.md) - Phase 4 (백엔드 상세)
3. [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) - Phase 6 (백엔드 배포)

### 시나리오 7: "에러가 발생했어요"

1. [QUICKSTART.md](./QUICKSTART.md) - "문제 해결" 섹션
2. [DEVELOPMENT.md](./DEVELOPMENT.md) - Phase 8 (문제 해결)
3. 로그 확인: `sudo tail -f /var/log/nginx/error.log`

### 시나리오 8: "프로젝트를 소개하고 싶어요"

1. [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md) - 전체 보고서
2. [README.md](./README.md) - 간단한 소개

---

## 📝 문서 비교표

| 문서 | 길이 | 깊이 | 대상 | 목적 |
|------|------|------|------|------|
| README | 짧음 | 얕음 | 모두 | 개요 파악 |
| QUICKSTART | 중간 | 중간 | 개발자 | 빠른 시작 & 작업 |
| DEVELOPMENT | 김 | 깊음 | 개발자/운영자 | 심층 이해 & 설정 |
| DEPLOYMENT-CHECKLIST | 중간 | 중간 | 운영자 | 배포 검증 |
| PROJECT-SUMMARY | 중간 | 중간 | PM/보고자 | 완성도 확인 |

---

## 🔖 추가 리소스

### 프로젝트 내부 문서

- `nginx/rxvxn.conf` - Nginx 설정 (주석 포함)
- `systemd/rxvxn.service` - Systemd 서비스 (주석 포함)
- `db/schema.sql` - 데이터베이스 스키마 (주석 포함)
- `scripts/*.sh` - 모든 스크립트에 주석 포함

### 외부 리소스

- **Web Components:** <https://developer.mozilla.org/en-US/docs/Web/Web_Components>
- **Atomic Design:** <https://bradfrost.com/blog/post/atomic-web-design/>
- **Nginx Docs:** <https://nginx.org/en/docs/>
- **Let's Encrypt:** <https://letsencrypt.org/getting-started/>
- **PostgreSQL:** <https://www.postgresql.org/docs/>

---

## 💡 문서 읽는 순서 (추천)

### 초심자용 (처음 접하는 경우)

```text
1. README.md (10분)
   ↓
2. QUICKSTART.md (20분)
   ↓
3. 실습: ./scripts/dev.sh (30분)
   ↓
4. DEVELOPMENT.md - Phase 1~2 (1시간)
   ↓
5. 실습: 컴포넌트 추가 (1시간)
```

### 중급자용 (배포 준비)

```text
1. QUICKSTART.md - 복습 (10분)
   ↓
2. DEPLOYMENT-CHECKLIST.md (30분)
   ↓
3. DEVELOPMENT.md - Phase 3~5 (1시간)
   ↓
4. 실습: 서버 설정 & 배포 (2~3시간)
```

### 고급자용 (전체 이해)

```text
1. PROJECT-SUMMARY.md (30분)
   ↓
2. DEVELOPMENT.md - 전체 (2시간)
   ↓
3. 코드 리뷰: src/ 전체 (2시간)
   ↓
4. 실습: 백엔드 & DB 추가 (3시간)
```

---

## ✅ 문서 활용 체크리스트

### 개발 시작 전

- [ ] README.md 읽음
- [ ] QUICKSTART.md의 "빠른 시작" 따라함
- [ ] 로컬 개발 서버 실행 성공

### 개발 중

- [ ] QUICKSTART.md를 북마크
- [ ] 새 기능 추가 시 DEVELOPMENT.md 참고
- [ ] 문제 발생 시 "문제 해결" 섹션 확인

### 배포 준비

- [ ] DEPLOYMENT-CHECKLIST.md 인쇄 또는 북마크
- [ ] DEVELOPMENT.md Phase 3~5 숙지
- [ ] 모든 체크박스 확인하며 배포

### 배포 완료 후

- [ ] PROJECT-SUMMARY.md로 완성도 확인
- [ ] 문서 업데이트 (변경사항 있다면)
- [ ] 팀원에게 문서 공유

---

## 🎉 결론

### 5개의 문서가 프로젝트의 모든 측면을 다룹니다

- 📖 **README:** 첫 인상
- ⚡ **QUICKSTART:** 빠른 행동
- 📘 **DEVELOPMENT:** 깊은 이해
- ✅ **DEPLOYMENT-CHECKLIST:** 확실한 배포
- 📊 **PROJECT-SUMMARY:** 완전한 그림

#### 언제 어떤 문서를 읽어야 할지 헷갈린다면

#### 이 INDEX.md로 돌아오세요 🧭

---

**버전:** 1.0.0  
**최종 업데이트:** 2025-11-01
