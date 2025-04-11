---
layout: post
title: "CHAP 13. 🌐  HTML5 & 최신 웹 기술"
date: 2025-04-11
categories: [frontend, core, html&css]
tags: [frontend, language, html&css]
thumbnail: /assets/img/post-thumbnails/intro13.png
author: Devchanny
---

## 📌 **1️⃣ 시맨틱 태그 심화 확장**

| 태그 | 설명 | 비유 🌟 | 실무 포인트 🚀 |
| --- | --- | --- | --- |
| `<header>` | 문서 or 섹션의 머릿말 (로고, 내비 포함 가능) | 🏠 **집 현관, 간판** | 전체뿐 아니라 각 `<section>` 안에도 사용 가능 |
| `<footer>` | 꼬리말 (저작권, 연락처 등) | 🏡 **집 뒷마당, 명함** | 사이트 전체 & 개별 섹션 내에서도 사용 |
| `<nav>` | 내비게이션 링크 모음 | 🚗 **길 안내 표지판** | **ARIA role="navigation"** 병행 추천 |
| `<section>` | 주제별 구획 | 📚 **챕터 구분** | 반드시 **제목(h1~h6)** 포함! |
| `<article>` | 독립 콘텐츠 | 📰 **신문기사** | RSS로 퍼가도 의미 유지 |
| `<aside>` | 보조 정보 (광고, 링크) | 📎 **참고자료, 사이드바** | 검색엔진은 본문과 구분 |

---

### ✅ **심화 예제 + 주석**

```html
<body>
  <header>
    <h1>🌐 My Website</h1>
    <nav> <!-- 내비게이션 -->
      <a href="#home">Home</a>
      <a href="#about">About</a>
    </nav>
  </header>

  <main>
    <section>
      <h2>📚 About Us</h2>
      <article>
        <h3>📰 Company Story</h3>
        <p>독립적 기사 내용...</p>
      </article>
      <aside>
        📎 관련 링크, 광고 배너
      </aside>
    </section>
  </main>

  <footer>
    <p>© 2025 My Company</p>
  </footer>
</body>
```

✅ **면접 포인트:**

- **시맨틱 구조 → SEO & 스크린리더 접근성 강화**
- **div 남발 X → 의미 있는 구역은 반드시 시맨틱 태그 사용**

---

## 📦 **2️⃣ Web Storage 심화**

| 저장소 | 특징 | 비유 🌟 | 실무 포인트 🚀 |
| --- | --- | --- | --- |
| `localStorage` | **브라우저에 영구 저장 (탭/브라우저 종료해도 유지)** | 📦 **장기 보관 창고** | 최대 5~10MB, 민감 정보 저장 금지 |
| `sessionStorage` | **탭 닫히면 삭제됨** | 🛒 **임시 장바구니** | 로그인 세션, 임시 데이터 |
| **쿠키** | **서버와 매 요청 함께 전송 (4KB 제한)** | 🍪 **항상 들고 다니는 메모장** | 세션 관리, 서버 인증 |

---

### ✅ **실전 예제 + 주석**

```jsx
// localStorage - 영구 데이터 저장
localStorage.setItem('theme', 'dark'); // 저장
console.log(localStorage.getItem('theme')); // 읽기

// sessionStorage - 탭 닫으면 삭제
sessionStorage.setItem('user', '홍길동');

// 쿠키 예시
document.cookie = "username=hong; path=/; max-age=86400"; // 하루 동안 유지
```

✅ **보안 포인트:**

- **local/sessionStorage → XSS 공격 시 데이터 탈취 위험 있음**
- 민감 정보는 **서버 or HTTP-only 쿠키 사용!**

---

## 🎵 **3️⃣ 오디오 & 비디오 심화**

| 태그 | 설명 | 비유 🌟 | 실무 포인트 🚀 |
| --- | --- | --- | --- |
| `<audio>`, `<video>` | 멀티미디어 삽입 | 🎵, 🎥 **미디어 플레이어** | **controls 필수, autoplay+muted 주의** |
| `controls` | 재생, 정지, 볼륨 등 조작 버튼 표시 | 🎮 **리모컨** | UX 향상 |
| `autoplay`, `loop` | 자동 재생, 반복 재생 | 🔄 **자동 플레이** | SEO/접근성 고려해 사용 |

---

### ✅ **심화 예제 + 주석**

```html
<video width="320" controls autoplay muted loop poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  브라우저가 비디오를 지원하지 않아요!
</video>
```

📌 **포인트:**

- **poster → 비디오 썸네일 제공**
- **muted 없으면 autoplay 대부분 비활성 (UX 주의)**

---

## 📝 **4️⃣ HTML5 폼 고급 기능 심화**

| 속성 | 설명 | 비유 🌟 | 실무 포인트 🚀 |
| --- | --- | --- | --- |
| `input[type="email"]` | 이메일 형식 자동 검증 | 📧 **이메일 필터** | **pattern 속성으로 추가 검증 가능** |
| `input[type="date"]` | 달력 팝업 | 📅 **날짜 선택기** | 모바일에서 UX 개선 |
| `input[type="range"]` | 슬라이더로 숫자 선택 | 🎚️ **볼륨 조절** | 실시간 시각 피드백 제공 |

---

### ✅ **예제 + 주석**

```html
<form>
  <input type="email" placeholder="이메일 입력" required>
  <input type="date">
  <input type="range" min="1" max="100" value="50">
  <button>제출</button>
</form>
```

📌 **실무 팁:**

- **기본 검증 + JS 추가 검증 병행**
- *aria- 속성 활용 → 접근성↑*

---

## ✍️ **5️⃣ 웹 폰트 심화**

| 개념 | 설명 | 비유 🌟 | 실무 포인트 🚀 |
| --- | --- | --- | --- |
| `@font-face` | 외부 폰트 불러와 커스텀 | ✍️ **글씨체 가져오기** | **woff2 포맷 권장, 최소 크기 유지** |
| Google Fonts | 무료 폰트 CDN | 🌎 **폰트 도서관** | **font-display: swap 적용 필수** |

---

### ✅ **예제 + 주석**

```css
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* 폰트 로딩 전 기본 폰트 먼저 보여줌 */
}

body {
  font-family: 'CustomFont', sans-serif;
}
```

---

## 📐 **6️⃣ SVG & Canvas 심화**

| 개념 | 특징 | 비유 🌟 | 실무 포인트 🚀 |
| --- | --- | --- | --- |
| `<svg>` | 벡터 그래픽, 확대해도 깨짐 X | 📐 **도면 그리기** | DOM 접근 가능, 간단한 UI 아이콘 |
| `<canvas>` | 비트맵 그래픽, 빠른 실시간 렌더링 | 🎮 **그림판, 게임** | 고성능 게임, 실시간 데이터 시각화 |

---

### ✅ **심화 예제 + 주석**

```html
<!-- 📐 SVG 예제: 벡터 그래픽 (확대해도 깨지지 않음) -->
<svg width="100" height="100"> <!-- SVG 캔버스 크기: 100x100 -->
  <!-- 원(circle) 요소
       cx, cy → 원의 중심 좌표
       r → 반지름
       stroke → 테두리 색
       fill → 내부 색 -->
  <circle cx="50" cy="50" r="40" stroke="blue" fill="lightblue" />
</svg>

<!-- 🎮 Canvas 예제: 비트맵 그래픽 (픽셀 기반, 실시간 렌더링에 강점) -->
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
  // 1️⃣ canvas 요소 가져오기
  const ctx = document.getElementById('myCanvas').getContext('2d');

  // 2️⃣ 채우기 색상 설정 (fillStyle → 채울 색상)
  ctx.fillStyle = 'green';

  // 3️⃣ 사각형 그리기: (x좌표, y좌표, 너비, 높이)
  ctx.fillRect(10, 10, 150, 80); // 좌상단 (10,10)부터 150x80 크기의 녹색 사각형
</script>

```

📌 **포인트:**

- SVG: **아이콘, 차트, UI 요소 → DOM 조작 가능**
- Canvas: **게임, 그래프 → 픽셀 기반, 빠름**

---

# 🚀 **기술 면접 예상 질문 심화**

| 질문 | 심화 포인트 |
| --- | --- |
| localStorage, sessionStorage, 쿠키 차이? | 저장 기간, 크기 제한, 서버 전송 여부 |
| 시맨틱 태그 SEO 영향? | 검색엔진 → 구조 명확, 스크린리더 접근성 ↑ |
| Canvas vs SVG 선택 기준? | SVG: UI, 확대 가능 / Canvas: 실시간, 고성능 |
| HTML5 form 검증 장점? | 기본 검증 제공 → JS 부담 ↓, 하지만 JS 병행 필수 |
| 웹폰트 성능 최적화 방법? | woff2, font-display: swap, preload 사용 권장 |

---

# 💼 **실무 Best Practice 정리**

| 포인트 | 이유 |
| --- | --- |
| 시맨틱 태그 적극 사용 | SEO & 접근성 강화 |
| Web Storage → 비민감 데이터만 | 보안 (XSS) 고려 |
| 비디오 → controls 필수, autoplay 주의 | UX/접근성 ↑ |
| 웹폰트 → swap + preload | 렌더링 최적화 |
| SVG vs Canvas 상황별 선택 | 성능, UI 목적에 맞게 선택 |

---
