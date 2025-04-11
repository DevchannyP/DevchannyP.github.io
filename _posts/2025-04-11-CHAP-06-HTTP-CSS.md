---
layout: post
title: "CHAP 6. HTML📸 이미지 & 미디어 태그"
date: 2025-04-11
categories: [frontend, core, html&css]
tags: [frontend, language, html&css]
thumbnail: /assets/img/post-thumbnails/intro6.png
author: Devchanny
---

## 📌 **1️⃣ 이미지 관련 태그 심화 정리**

| 태그 / 속성 | 역할 | 시맨틱 의미 | 실무 활용 팁 🚀 |
| --- | --- | --- | --- |
| `<img>` | 이미지 삽입 | ❌ (비시맨틱) | 꼭 `alt`와 함께! 장식용 이미지는 `alt=""` |
| `src` | 이미지 경로 | - | 상대 경로(./images/img.png) & 절대 경로(https://) 사용 가능 |
| `alt` | 대체 텍스트 (스크린리더 & SEO) | ✅ | **접근성 최우선!** 설명 충실히 작성 |
| `width`, `height` | 크기 지정 (px, %, auto) | - | 고정보다 **반응형 (max-width, auto)** 권장 |
| `title` | 마우스 툴팁 | - | UX 개선용, 남용은 지양 |
| `<figure>` | 이미지+설명 묶음 | ✅ | 의미 있는 이미지 그룹화에 적합 |
| `<figcaption>` | 캡션 (설명) | ✅ | **SEO, 접근성에 도움** |

---

### ✅ **추가 심화 개념**

- **Lazy Loading (지연 로딩)**
    
    👉 이미지 로딩 최적화:
    
    ```html
    <img src="big-image.jpg" alt="..." loading="lazy">
    ```
    
    - **장점**: 스크롤 내릴 때만 이미지 로드 → **페이지 속도 향상**
    - 크롬/사파리 등 대부분 지원
- **WebP, AVIF 포맷**
    
    👉 기존 JPEG/PNG 대비 **용량 ↓, 품질 ↑**, SEO, Core Web Vitals 최적화
    
    ```html
    <img src="image.webp" alt="..." type="image/webp">
    ```
    

---

## 🖼️ **2️⃣ 이미지 예제 심화 (모든 포인트 적용)**

```html
<figure>
  <img src="cat.webp" alt="웃고 있는 귀여운 고양이" width="300" height="200" loading="lazy" style="max-width:100%;height:auto;">
  <figcaption>🐱 귀여운 고양이 (출처: Unsplash)</figcaption>
</figure>
```

✅ 포함 요소:

- `alt` **설명 충실**
- **반응형 크기 조정**
- **Lazy Loading 적용**
- **WebP 포맷 활용**
- **시맨틱 구조 (figure + figcaption)**

---

## 📺 **3️⃣ 미디어 태그 심화 정리**

| 태그 | 역할 | 시맨틱 의미 | 실무 활용 팁 🚀 |
| --- | --- | --- | --- |
| `<audio>` | 오디오 삽입 | ✅ | 여러 포맷(mp3, ogg) 제공 필수 |
| `<video>` | 비디오 삽입 | ✅ | autoplay, muted, poster 활용 |
| `<source>` | 소스 지정 | ✅ | 브라우저 호환성을 위해 여러 파일 제공 |
| `<track>` | 자막 제공 | ✅ | 접근성 강화 (청각장애인 등) |

---

### ✅ **비디오 심화 기능**

| 속성 | 설명 | 활용 포인트 |
| --- | --- | --- |
| `controls` | 기본 버튼 제공 | 필수 |
| `autoplay` | 자동 재생 | **muted와 함께, UX 고려** |
| `loop` | 반복 재생 | 짧은 영상 배경에 적합 |
| `muted` | 음소거 | 자동재생 시 필수 |
| `poster` | 썸네일 이미지 | UX 개선 |
| `preload` | 미리 불러올지 여부 | none, metadata, auto |
| `<track>` | 자막, 설명 | 접근성, 다국어 대응 |

---

## 🎬 **4️⃣ 비디오 & 오디오 심화 예제**

```html
<video controls width="600" poster="thumb.jpg" preload="metadata">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  <track src="subtitles.vtt" kind="subtitles" srclang="en" label="English">
  지원하지 않는 브라우저입니다.
</video>
```

✅ **자막(track)** 추가로 **접근성, 글로벌 대응력 강화!**

---

## 🚀 **5️⃣ Picture 태그 심화 (고해상도 대응)**

```html
<picture>
  <source media="(min-width:1000px)" srcset="large.webp">
  <source media="(min-width:500px)" srcset="medium.webp">
  <img src="small.jpg" alt="반응형 풍경 이미지" loading="lazy">
</picture>
```

**포인트:**

- 고해상도 디바이스에 고화질 이미지 제공 (성능 & UX 최적화)
- **SEO & 접근성은 항상 alt 필수!**

---

## 🧠 **6️⃣ 기술 면접 심화 질문 & 답변 포인트**

| 질문 | 심화 답변 포인트 |
| --- | --- |
| `<img>`의 alt 속성의 SEO/접근성 효과는? | 스크린리더, 이미지 실패 시 대체 텍스트 제공 → 검색엔진 크롤러가 내용을 인식 |
| `<figure>` + `<figcaption>`을 언제 쓰는가? | 단순 이미지가 아닌 **의미 있는 이미지+설명** 세트로 묶을 때, 시맨틱 구조 강화 |
| `<source>`를 쓰는 이유는? | 다양한 포맷 제공해 **브라우저별 호환성 확보 (ex: mp4, webm, ogg)** |
| 반응형 이미지 최적화 방법은? | `max-width:100%`, `<picture>` 태그, WebP/AVIF 포맷 사용, Lazy Loading 적용 |
| 비디오 autoplay 사용 시 UX, 접근성 문제? | 자동재생은 **muted 필수**, 사용자가 원하지 않는 소리 방지, 자막 제공해 접근성 강화 |

---

## 💼 **7️⃣ 실무 Best Practice 심화**

| Best Practice | 설명 |
| --- | --- |
| **`alt`는 SEO, 접근성의 핵심** | 이미지마다 반드시 명확한 설명 작성 |
| **장식용 이미지 = `alt=""`** | 불필요한 스크린리더 낭독 방지 |
| **Lazy Loading 적극 활용** | 페이지 렌더링 속도 향상 |
| **WebP, AVIF 활용** | 가벼운 고품질 이미지로 성능 최적화 |
| **비디오, 오디오 → 자막(`<track>`) 추가** | 접근성 & 다국어 대응 |
| **반응형은 Picture + CSS + WebP 세트로** | 다양한 해상도 디바이스 완벽 대응 |
| **미디어 파일 경량화** | 이미지 압축 도구, 비디오 bitrate 조절 필수 |

---

## 🎯 **8️⃣ 실무에서 자주 발생하는 문제 & 해결법**

| 문제 | 해결 방법 |
| --- | --- |
| 이미지 용량 커서 렌더링 느림 | WebP/AVIF 사용, Lazy Loading |
| 스크린리더가 장식용 이미지 읽음 | `alt=""` 처리 |
| 비디오 자동재생 UX 불만 | `autoplay` 시 반드시 `muted`, `poster` 썸네일 |
| SEO 점수 낮음 | 모든 이미지에 의미 있는 `alt`, `<figure>` 활용 |
| 다양한 디바이스에서 해상도 깨짐 | `<picture>`로 해상도별 이미지 제공 |

---

## 🎁 **정리하면…**

| 핵심 포인트 | 기억법 |
| --- | --- |
| **접근성 = alt, track, figcaption** | 스크린리더도 사용자를 생각하자 |
| **최적화 = WebP/AVIF, Lazy, Picture** | 빠른 페이지 = 좋은 UX |
| **시맨틱 = figure, figcaption, source** | 검색엔진도 이해하기 쉽게 |
| **실무에서는 퍼포먼스 & UX 동시 고려** | 고품질 + 빠른 속도 = 완벽 |
