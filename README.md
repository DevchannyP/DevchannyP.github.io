# 📘 Devchanny 기술 블로그

> “배우고, 정리하고, 공유한다.”
> 
> 
> 모든 기술의 본질을 이해하고 나만의 언어로 설명하는 것을 목표로 하는 **풀스택 개발자의 기술 블로그**입니다.
> 

---

## 🧭 프로젝트 개요

| 항목 | 설명 |
| --- | --- |
| 🔍 목적 | 프론트/백엔드/인프라/AI 등 기술 학습과 실전 경험 정리를 위한 블로그 |
| 🧱 구조 | `Jekyll + Liquid` 기반 정적 사이트 + `Cloudflare Pages` 프라이빗 배포 |
| 🎯 운영 방식 | GitHub Private Repository + 무료 CDN을 이용한 **비공개 블로그 관리** |
| 🛡️ 보안 | 필요 시 Cloudflare Access / Auth 설정으로 접근 제어 |

---

## 🧱 기술 스택

| 영역 | 사용 기술 | 비고 |
| --- | --- | --- |
| 정적 사이트 생성기 | [Jekyll](https://jekyllrb.com/) | GitHub Pages 호환 |
| 스타일링 | HTML5, CSS3, SCSS (선택) | Pretendard, Tossface 등 |
| 인터랙션 | JavaScript (Vanilla) | 3단계 탭 기반 필터링 |
| 템플릿 언어 | Liquid | Jekyll 전용 |
| 배포 | [Cloudflare Pages](https://pages.cloudflare.com/) | 무제한 무료 티어 |
| 저장소 | GitHub Private Repo | 비공개 유지 |
| 기타 도구 | Markdown, YAML Frontmatter | 글 기반 콘텐츠 관리 |

---

## 🔒 보안 중심 운영 전략

- ✅ **GitHub Repository 비공개 설정**
- ✅ **Cloudflare Pages 무료 티어로 배포**
- ✅ 도메인 비공개 or 접근 제어 (Cloudflare Access, Auth 등)
- ✅ 구글 검색 색인 차단 (robots.txt / meta tag)

---

## 🗂️ 콘텐츠 카테고리 구조 (3단계 필터링)

**다단계 기술 필터링 시스템**을 직접 설계하여 구현하였으며, `data-category` 기반 JS DOM 필터링으로 작동합니다.

```
📁 대분류 (1단계)
├─ 프론트엔드
│  ├─ 핵심 언어 (JS, HTML&CSS, TS)
│  ├─ 프레임워크 (React, Next.js 등)
│  └─ 기타 기술
├─ 백엔드
│  ├─ 서버 언어 (Java, Node.js, Python)
│  ├─ 프레임워크 (Spring, Spring Boot, MyBatis)
│  └─ 인증, 배포, API 설계
├─ 서버/인프라
│  ├─ OS, CI/CD, 컨테이너, 보안, 로깅
├─ 데이터/AI
│  ├─ 모델링, ML/DL 프레임워크, AI 서비스 구현
├─ 프로젝트
│  ├─ 팀/개인 프로젝트, 프로젝트 일지
```

> ☑️ 모든 포스트는 YAML Frontmatter의 categories 필드에 계층 구조 기반의 분류가 포함되어야 함
> 

---

## 🖥️ 로컬 개발 및 배포

### 🔧 개발 실행

```bash
# 1. Jekyll 및 종속성 설치
gem install bundler jekyll

# 2. 의존성 설치
bundle install

# 3. 로컬 개발 서버 실행
bundle exec jekyll serve
# => http://localhost:4000
```

### ☁️ Cloudflare Pages 배포 설정

| 항목 | 값 |
| --- | --- |
| Framework preset | `Jekyll` |
| Build command | `bundle exec jekyll build` |
| Output directory | `_site` |
| Git 연동 | GitHub Private Repo |
| 커스텀 도메인 | 선택 사항 (프라이빗 운영 시 미사용 가능) |

---

## 📌 주요 기능 요약

| 기능명 | 설명 |
| --- | --- |
| ✅ 3단계 필터 | 카테고리 → 세부 → 언어별로 기술 글 필터링 |
| ✅ 썸네일 카드 | 이미지 + 요약 + 날짜 + 저자 정보 표시 |
| ✅ 사이드바 | 최근 학습 기술 / 프로젝트 글 자동 노출 |
| ✅ 반응형 UI | 다양한 디바이스에서 최적화 (개선 예정) |
| ✅ Liquid 기반 템플릿 | 반복적 HTML 작성 최소화 및 구성 모듈화 |

---

## ✨ 구조 예시

```
📦 _posts/
┣ 📜 2025-07-15-spring-security-jwt.md
┃ ┗ categories: ["backend", "auth", "springboot"]
┣ 📜 2025-07-16-js-event-loop.md
┃ ┗ categories: ["frontend", "core", "javascript"]
```

> 포스트 파일명은 yyyy-mm-dd-슬러그.md 형식, categories는 다단계 배열로 지정해야 필터링에 대응됨
> 

---

## 🚧 향후 개선 로드맵

| 우선순위 | 항목 | 비고 |
| --- | --- | --- |
| 🔜 | 태그 기반 포스트 필터링 | topic 단위 |
| 🔜 | 다국어 (i18n) 대응 | EN/KO 전환 |
| 🔜 | 검색 기능 (Fuse.js) | 클라이언트 사이드 검색 |
| 🔜 | 페이지네이션 | 포스트 수 증가 대비 |
| 🔜 | Light/Dark 모드 | CSS 변수 기반 |

---

## 👨‍💻 Author

**박찬희 (Devchanny)**

프론트/백엔드 통합 개발자

관심 분야: Java, TypeScript, Spring, React, AI 자동화

- GitHub: [@DevchannyP](https://github.com/DevchannyP)
- Notion Resume: devchanny.notion.site *(예시 주소)*

---

## 🪪 라이선스

```
MIT License © 2025 Devchanny
```

본 저장소는 개인 기술 기록 및 실험용으로 사용되며, 별도 상업적 목적은 없습니다.
