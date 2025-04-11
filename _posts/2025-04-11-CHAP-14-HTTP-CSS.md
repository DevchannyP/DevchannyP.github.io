---
layout: post
title: "CHAP 14. 🖥️ 웹 페이지 구성 예제"
date: 2025-04-11
categories: [frontend, core, html&css]
tags: [frontend, language, html&css]
thumbnail: /assets/img/post-thumbnails/intro14.png
author: Devchanny
---
## 🚀 **1-1. 개념부터! "웹 페이지는 집이다!" 🏠**

| 🏠 구성 요소 | 🌐 HTML 시맨틱 태그 | 💬 비유 | 🔥 심화 |
| --- | --- | --- | --- |
| 상단(Header) | `<header>` | 현관문 & 간판 🏠 | 로고, 내비게이션, 검색바 포함. SEO와 접근성에서 중요한 역할 |
| 메뉴(Navigation) | `<nav>` | 안내표시판 🗺️ | **ARIA 속성**과 함께 사용하면 스크린리더에서 더 좋음 |
| 메인 콘텐츠(Main) | `<main>`, `<section>` | 거실, 방 🛋️ | 페이지에 **하나만 존재해야 함**. 핵심 콘텐츠만 포함 |
| 글, 기사(Article) | `<article>` | 책상 위 신문 📄 | 독립적으로 배포 가능한 콘텐츠 (RSS 피드 대상) |
| 사이드바(Aside) | `<aside>` | 벽장, 수납공간 🗄️ | 관련 콘텐츠, 광고, 추천 글 등 보조 정보 |
| 하단(Footer) | `<footer>` | 집명패 & 연락처 📞 | 저작권 정보, 사이트 맵, 연락처, 하단 메뉴 |

---

## ✨ **1-2. 기본 HTML + CSS: 주석 포함**

```html
<!-- 기본 레이아웃 -->
<body>
  <header>🏠 MySite</header> <!-- 사이트 상단 -->

  <nav> <!-- 내비게이션 -->
    Home | About | Contact
  </nav>

  <main> <!-- 메인 콘텐츠 -->
    <section>
      <article>
        <h2>🌟 Welcome!</h2>
        <p>Main content goes here.</p>
      </article>
    </section>

    <aside>📢 Ads, Sidebar content</aside> <!-- 보조 콘텐츠 -->
  </main>

  <footer>© 2025 MySite</footer> <!-- 하단 -->
</body>
```

```css
/* Header와 Footer 스타일 */
header, footer {
  background: #333; color: white; padding: 1rem; text-align: center;
}

/* 내비게이션 바 */
nav {
  background: #555; color: white; padding: 1rem; text-align: center;
}

/* 메인 콘텐츠 영역 */
main {
  display: flex; /* 가로 정렬 */
  gap: 1rem; /* 요소 사이 여백 */
  padding: 1rem;
}

/* 사이드바 */
aside {
  width: 200px; /* 고정 폭 */
  background: #f0f0f0;
  padding: 1rem;
}
```

---

## 🏗️ **1-3. 실무: Grid + Flex 콤보로 레이아웃 강화**

```css
/* 메인 레이아웃을 Grid로 */
.main-container {
  display: grid;
  grid-template-columns: 3fr 1fr; /* 콘텐츠 3, 사이드바 1 비율 */
  gap: 1rem;
}

/* 내비게이션을 Flex로 정렬 */
nav {
  display: flex;
  justify-content: space-around; /* 메뉴를 좌우로 고르게 */
}
```

📌 **왜 Grid + Flex를 같이 써?**

- **Grid**: 전체 구획(페이지 틀) → Excel처럼 2D
- **Flex**: 내부 정렬 (가로/세로) → 메뉴, 버튼 배치 최적!

---

## 📱 **1-4. 심화: 반응형 + Sticky Header 적용**

```css
/* 스크롤해도 header가 고정됨 */
header {
  position: sticky;
  top: 0;
  background: #222;
  z-index: 1000; /* 다른 요소 위에 표시 */
}

/* 모바일 화면 대응 */
@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr; /* 한 열로 변경 */
  }

  nav {
    flex-direction: column; /* 메뉴 세로 정렬 */
  }
}
```

---

## 🎨 **1-5. 심화: CSS 변수로 Theme 변경 쉽게!**

```css
:root {
  --main-color: #3498db; /* 기본 색상 */
  --accent-color: #f39c12; /* 강조 색상 */
}

header {
  background: var(--main-color); /* 변수 사용 */
}

button:hover {
  background: var(--accent-color); /* 버튼 강조 효과 */
}
```

**장점 →**: 색상 바꿀 때 변수만 수정하면 전체 테마가 변경됨! **대규모 프로젝트 관리 필수 스킬!**

---

## 📝 **1-6. 기술 면접 대비 심화 질문**

| 질문 | 심화 답변 |
| --- | --- |
| Flex와 Grid 차이? | Flex: 1D 정렬 (수평/수직 한 방향), Grid: 2D (행+열). 실무는 **Grid로 레이아웃**, 내부는 Flex로 조합 |
| 시맨틱 태그 왜 중요한가? | SEO 최적화, 스크린리더 접근성 향상, 코드 가독성/유지보수성 상승. 협업 시 의미 명확히 전달 가능 |
| 반응형 원리? | **미디어쿼리 + 유동 단위(%/vw/rem) 사용**, Mobile-First 접근 전략 추천 |

---
