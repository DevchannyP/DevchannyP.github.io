---
layout: post
title: "# CHAP 11. 🎯 CSS 기초 + 심화 완전 정복 📘 "
date: 2025-04-11
categories: [frontend, core, html&css]
tags: [frontend, language, html&css]
thumbnail: /assets/img/post-thumbnails/intro11.png
author: Devchanny
---

## 📌 **1️⃣ CSS란? + 실무 감각까지 확장**

| 구분 | 내용 | 비유 🌟 |
| --- | --- | --- |
| CSS란? | **Cascading Style Sheets (계단식 스타일 시트)**. HTML 구조에 **디자인과 레이아웃 적용** | HTML: 🏠 **건물 뼈대**, CSS: 👕 **인테리어 & 옷** |
| 역할 | 색상, 폰트, 크기, 위치, 정렬, 반응형, 애니메이션 등 **시각적 표현 전담** | 📖 **흑백 책을 컬러로 꾸미기** |

✅ **심화 포인트:**

- **"Cascading" → 우선순위에 따라 스타일이 겹쳐지며 적용되는 원리**
- **HTML과 CSS 분리 → 유지보수성, 협업 효율↑**

---

## ⚙️ **2️⃣ CSS 작성 방법 심화 + 장단점**

| 방법 | 위치 | 특징 | 비유 🌟 | 실무 Best Practice 🚩 |
| --- | --- | --- | --- | --- |
| **Inline** | HTML 태그 내 `style` 속성 | 특정 요소 1개에만 적용, 우선순위 최상, **유지보수 지옥** | ✍️ 옷에 **낙서하기** | 긴급 수정 외에 사용 지양 |
| **Internal** | `<style>` 태그, `<head>` 안 | 1페이지 전용, 유지보수 불편 | 📄 한 장에만 **색칠** | 작은 프로젝트나 프로토타입 시 |
| **External** | 별도 `.css` 파일 | **실무 표준! 여러 페이지, 유지보수 & 속도↑** | 📁 **옷장에 스타일 모아놓기** | **파일 분리 + Minify + CDN 적용 권장** |

✅ **추가 심화:**

- **파일 용량 크면 → CSS 파일 Split & Critical CSS만 inline 처리 → 속도 최적화**

---

## 🔍 **3️⃣ 선택자 심화 확장 + 실전 예제**

| 선택자 | 예시 | 설명 | 비유 🌟 |
| --- | --- | --- | --- |
| **전체 선택자** | `* {}` | 모든 요소 적용 | 🌍 **전세계 적용** |
| **태그 선택자** | `h1 {}` | 특정 태그 전체 | 📢 **모든 h1 불러** |
| **클래스 선택자** | `.menu {}` | 여러 요소 묶음 | 📦 **박스 묶음 선택** |
| **아이디 선택자** | `#header {}` | 단 하나 요소 | 🎯 **유일 ID 지정** |
| **속성 선택자** | `[type="text"] {}` | 특정 속성 가진 요소 | 🔍 **조건 검사** |
| **가상 클래스** | `a:hover` | 특정 상태 | 🎨 **마우스 올릴 때 색칠** |
| **자식 선택자** | `div > p {}` | 바로 아래 자식 | 👪 **엄마 직계자식** |
| **후손 선택자** | `div p {}` | 모든 후손 | 🌳 **가족 나무 전체** |

---

### ✅ **복합 선택자 심화 예제**

```css
/* 네비게이션 메뉴에서 활성화된 항목에만 효과 */
nav > ul.menu > li.active a:hover {
  color: red;
  font-weight: bold;
}
```

**기술 면접 포인트:**

- **id (100점) > class (10점) > tag (1점) → 우선순위 계산법!**
- **자식(`>`) vs 후손(`space`) → 정확히 구분할 것**

---

## 📦 **4️⃣ 박스 모델 심화 시각화**

| 구성 | 설명 | 비유 🌟 |
| --- | --- | --- |
| **Content** | 내용 영역 (텍스트, 이미지) | 📜 **본문 내용** |
| **Padding** | 내용과 테두리 사이 여백 | 🧸 **내용 주변 쿠션** |
| **Border** | 테두리 | 📏 **책 표지 테두리** |
| **Margin** | 요소 바깥 여백 | 🚪 **옆 박스와의 거리** |

---

### ✅ **box-sizing 심화 예제**

```css
* {
  box-sizing: border-box;
}
```

**Why?**

- 기본은 content-box → padding, border 추가되면 width 계산 복잡
- border-box → **총 width 안에 padding, border 포함! → 레이아웃 깨짐 방지**

---

## 🖌️ **5️⃣ 배경 설정 심화 + 고급 패턴**

| 속성 | 설명 | 비유 🌟 |
| --- | --- | --- |
| `background-color` | 배경 색상 | 🎨 벽 색 |
| `background-image` | 배경 이미지 | 🖼️ 벽 그림 |
| `background-repeat` | 이미지 반복 여부 | 🔁 타일 반복 |
| `background-position` | 위치 | 📍 그림 위치 |
| `background-size` | 크기 (`cover`, `contain`, 값) | 📐 맞춤 사이즈 |
| `background-attachment` | 스크롤 시 배경 고정 | 📌 **고정된 벽지** |

---

### ✅ **배경 심화 예제**

```css
body {
  background: url('bg.jpg') no-repeat center/cover fixed;
}
```

✅ **cover vs contain:**

- **cover**: 배경이 꽉 채움 (잘림 가능)
- **contain**: 잘림 없이 맞춤

✅ **fixed → 패럴랙스 스크롤 효과에 자주 사용**

---

## 🎯 **6️⃣ 선택자 우선순위(Specificity) 심화 공식**

| 선택자 | 점수 |
| --- | --- |
| Inline Style | 1000 |
| ID | 100 |
| Class / 속성 선택자 | 10 |
| 태그 | 1 |
| * | 0 |

💡 **실무에서 !important 남발 지양 → 구조적 우선순위 관리 필수**

---

## 🚀 **7️⃣ 실무 Best Practice 정리**

| 포인트 | 설명 |
| --- | --- |
| **External CSS 관리 → 파일 분리 & Minify 적용** | 유지보수, 속도 향상 |
| **box-sizing: border-box 전체 적용** | 크기 계산 쉽게, 레이아웃 안정 |
| **선택자 → id 최소, class 중심, 태그 선택 최소화** | 우선순위 관리 편리 |
| **background shorthand 적극 활용** | 성능, 가독성 ↑ |
| **가상 클래스 (`hover`, `focus`, `nth-child` 등) 적극 사용 → UX 개선** | **심화 스타일링 필수** |

---

## 💼 **8️⃣ 기술 면접 고급 질문 포인트**

| 질문 | 심화 답변 |
| --- | --- |
| box-sizing: border-box의 장점? | **레이아웃 계산 간편, 크기 유지, 유지보수 편리** |
| class와 id 선택자 차이? | class → 재사용 가능, id → 유일 요소 |
| 가상 클래스와 일반 클래스 차이? | 가상 클래스 → **상태/위치(hover, nth-child 등) 스타일링** |
| background cover와 contain 차이는? | cover → 채움, 잘림O / contain → 잘림X, 여백O |
| 선택자 우선순위 정렬은 어떻게? | inline > id > class > 태그 > * |

---
