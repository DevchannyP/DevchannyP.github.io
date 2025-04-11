---
layout: post
title: "CHAP 15.🌟 웹 접근성 & SEO"
date: 2025-04-11
categories: [frontend, core, html&css]
tags: [frontend, language, html&css]
thumbnail: /assets/img/post-thumbnails/intro15.png
author: Devchanny
---
---

## 📌 **1️⃣ 웹 접근성 (Web Accessibility) 심화 확장**

### 🟢 **1-1. 웹 접근성 개념 + 실무 필수**

| 🏛️ 정의 | **모든 사용자(장애 포함)에게 동등한 웹 사용 경험 제공** |
| --- | --- |
| 📢 비유 | 웹사이트 = **공공도서관** 📚 → 휠체어 경사로, 점자, 안내판 |
| 🌍 실무 중요성 | **장애인차별금지법, WCAG 2.1 준수 필수 (공공기관, 대기업 의무)** |
| 📊 SEO 영향 | 시맨틱 구조 → **검색 엔진 인식 & 스크린리더 접근 ↑** |

---

### 🛠️ **1-2. 접근성 필수 HTML 요소 심화**

| 요소 | 역할 | 실무 예시 | 비유 🌟 |
| --- | --- | --- | --- |
| `<label>` | **폼 요소와 연관 설명 제공** | `<label for="email">📧 Email</label><input id="email">` | 안내 표지판 |
| `alt` | **이미지 대체 텍스트** | `<img src="logo.png" alt="회사 로고">` | 점자 설명 |
| `<fieldset>` + `<legend>` | 폼 그룹화 및 설명 | `<fieldset><legend>회원정보</legend>...</fieldset>` | 폼 그룹 묶기 |
| `<button>` | 버튼엔 텍스트 or `aria-label` 필수 | `<button aria-label="닫기">❌</button>` | 설명 없는 버튼 X |
| `tabindex` | **키보드 포커스 순서 제어** | `<a href="#" tabindex="0">링크</a>` | 키보드 내비 |

---

### ✅ **심화 폼 예제 + 주석**

```html
<form>
  <!-- 📧 Email 입력 + label 연결 -->
  <label for="email">📧 Email</label>
  <input type="email" id="email" required>

  <!-- 🔑 Password 입력 -->
  <label for="password">🔑 Password</label>
  <input type="password" id="password" required>

  <!-- 📅 날짜 선택 + 그룹화 -->
  <fieldset>
    <legend>📅 예약 정보</legend>
    <label for="date">날짜</label>
    <input type="date" id="date">
  </fieldset>

  <!-- 버튼엔 반드시 텍스트 or aria-label -->
  <button type="submit">제출</button>
</form>
```

---

### 🎯 **1-3. ARIA 속성 심화 정리**

| 속성 | 역할 | 예시 | 실무 팁 🚀 |
| --- | --- | --- | --- |
| `aria-label` | 스크린리더용 텍스트 | `<button aria-label="닫기">❌</button>` | **텍스트 없는 버튼 필수** |
| `aria-hidden` | 장식 요소 숨김 | `<i aria-hidden="true">⭐</i>` | 스크린리더 혼란 방지 |
| `aria-live` | 실시간 알림 | `<div aria-live="polite">새 메시지!</div>` | 채팅, 알림 영역 |
| `role` | 역할 명시 | `<div role="dialog">모달창</div>` | 비표준 태그에 의미 부여 |
| `aria-expanded` | 열림/닫힘 상태 | `<button aria-expanded="false">메뉴</button>` | 드롭다운, 아코디언 |

---

### 🚀 **1-4. 실전 내비게이션 예제 (접근성 100점)**

```html
<nav aria-label="주 내비게이션">
  <ul>
    <li><a href="/home">🏠 <span>홈</span></a></li>
    <li><a href="/about">ℹ️ <span>소개</span></a></li>
    <li><a href="/contact">📞 <span>연락처</span></a></li>
  </ul>
</nav>

```

✅ **포인트:**

- **aria-label로 내비게이션 명확히**
- **아이콘만 있으면 스크린리더 못 읽음 → 반드시 `<span>` 텍스트 병행**

---

### 🧠 **1-5. WCAG 핵심 원칙 + 심화**

| 원칙 | 설명 | 비유 🌟 |
| --- | --- | --- |
| **Perceivable (지각 가능)** | 모든 정보는 **텍스트/대체수단 제공** | 점자, 자막 |
| **Operable (조작 가능)** | **키보드, 음성, 터치** 입력 모두 지원 | 엘리베이터 버튼 |
| **Understandable (이해 가능)** | **일관된 UI, 명확한 네비** | 도서관 안내 표지 |
| **Robust (견고성)** | **다양한 기기, 보조기술에서도 호환** | 다국적 ATM |

---

---

# 🔍 **2️⃣ SEO 심화 확장**

### 🚀 **2-1. SEO 기본 + 실무 중요성**

| 정의 | **검색 엔진 결과 상위 노출 위한 최적화** |
| --- | --- |
| 📢 비유 | 웹사이트 = 가게 🏪 → SEO = 간판 + 지도 등록 + 전단지 |
| 실무 | 검색 유입 = 매출, 방문자 수 직접 영향 |

---

### 🗝️ **2-2. SEO 필수 요소**

| 요소 | 역할 | 예시 |
| --- | --- | --- |
| `<title>` | 페이지 제목 | `<title>🔥 UX 디자이너 포트폴리오</title>` |
| `<meta description>` | 검색결과 설명 | `<meta name="description" content="UX 전문가 프로젝트">` |
| 시맨틱 구조 | `<header>`, `<main>`, `<article>` 명확하게 |  |
| 명확한 링크 | `<a href="/portfolio">포트폴리오 보기</a>` |  |
| 키워드 최적화 | 자연스럽게 핵심 키워드 배치 |  |

---

### 🌍 **2-3. Open Graph + Canonical + Sitemap**

```html
<!-- SNS 공유 최적화 -->
<meta property="og:title" content="🔥 UX 포트폴리오">
<meta property="og:description" content="UI/UX 전문가의 프로젝트">
<meta property="og:image" content="thumbnail.jpg">
<meta property="og:url" content="https://myportfolio.com/">

<!-- 중복 방지 -->
<link rel="canonical" href="https://myportfolio.com/">
```

✅ **robots.txt + sitemap.xml → 검색봇 최적 관리**

---

### 🚀 **2-4. 최신 SEO 트렌드 심화**

| 기술 | 설명 | 실무 팁 🚀 |
| --- | --- | --- |
| **Core Web Vitals** | UX 성능 지표 (LCP, FID, CLS) | 구글 순위 영향 |
| **Mobile-First Indexing** | **모바일 기준 크롤링** | 반응형 필수 |
| **Schema.org (구조화 데이터)** | 별점, 리뷰 표시 가능 | SEO CTR↑ |
| **HTTPS** | 보안 연결 | 순위 가산점 |

---

---

# 🏎️ **3️⃣ 웹 페이지 최적화 심화**

### 📦 **3-1. 이미지 최적화**

| 기법 | 설명 | 예시 |
| --- | --- | --- |
| **WebP/AVIF 사용** | 고압축 포맷 | `<img src="img.webp" loading="lazy">` |
| **Responsive Image** | 다양한 해상도 대응 | `<img srcset="small.jpg 400w, large.jpg 800w">` |
| **Lazy Loading** | 스크롤시 로딩 | `<img loading="lazy">` |

---

### 📶 **3-2. 네트워크 최적화**

| 기법 | 설명 |
| --- | --- |
| CSS/JS Minify | 공백 제거 |
| Gzip/Brotli | 서버 압축 |
| CDN | 글로벌 빠른 전송 |
| 파일 병합 | 요청 수 ↓ (단, HTTP/2는 권장 X) |

---

### ✅ **3-3. 실전 최적화 예시 + 주석**

```html
<img src="product.webp" width="600" height="400" loading="lazy"
     srcset="product-400.webp 400w, product-800.webp 800w"
     sizes="(max-width: 600px) 400px, 800px" alt="상품 이미지">
```

**포인트:**

- **WebP 포맷**
- **Lazy Load 적용**
- **반응형 대응 (srcset + sizes)**

---

# 🧠 **4️⃣ 기술 면접 예상 질문 (심화 포인트)**

| 질문 | 심화 답변 |
| --- | --- |
| SEO 핵심 요소? | `<title>`, 메타태그, Open Graph, 시맨틱 구조, 속도 최적화 |
| 웹 접근성 어떻게 구현? | 시맨틱 태그, label, alt, ARIA 최소화, 키보드 내비 |
| WCAG 원칙은? | Perceivable, Operable, Understandable, Robust |
| Core Web Vitals란? | LCP(최대 콘텐츠 로딩), FID(입력 지연), |
