---
layout: post
title: "CHAP 2. 기초 완전 정복 "
date: 2025-04-11
categories: [frontend, core, html&css]
tags: [frontend, language, html&css]
thumbnail: /assets/img/post-thumbnails/intro2.png
author: Devchanny
---

# 📌 1. HTML 정의와 역할

### ✅ **HTML이란?**

- **HTML (HyperText Markup Language)**
→ **웹 페이지의 뼈대 🦴**를 만드는 언어
→ 웹 브라우저가 읽고 **콘텐츠를 구조화**하여 보여줌

### 🏗️ **HTML의 역할**

| 역할 | 설명 |
| --- | --- |
| 📐 **구조화 (Structure)** | 제목, 문단, 이미지 등 **콘텐츠 배치** |
| 🔗 **하이퍼링크 연결** | 다른 페이지/파일로 연결하는 **HyperText** 기능 |
| 🌎 **웹 표준 준수** | 어떤 브라우저에서도 동일하게 보이도록 **표준화된 태그 사용** |
| 🤖 **검색 엔진 최적화(SEO)** | **시맨틱 태그**로 검색 엔진이 페이지 구조 쉽게 이해 (핵심 키워드 포함 유리) |
| ♿ **접근성(A11y)** | 스크린리더, 키보드 내비게이션을 위해 **정확한 태그 구조 필수** |

---

### 💡 **비유로 쉽게**

**HTML = 웹페이지 설계도**

→ **벽, 창문, 문**을 어디에 둘지 그려주는 역할!

CSS는 **벽 색칠/꾸미기**, JS는 **자동문, 전등 스위치**라 생각하면 쉬움

---

### 🎯 **심화 포인트**

- HTML은 **프로그래밍 언어 X**, 논리 수행 X, **마크업(표기) 언어**임
- **시맨틱(의미) 태그** 사용 시:
    - SEO 점수 ↑
    - 접근성 ↑
    - 유지보수 쉬움

---

### 💼 **면접 포인트**

**Q:** HTML과 XML 차이?

- **HTML**: 웹페이지 구조화 / 태그 미리 정의됨
- **XML**: 데이터 전송 목적, **개발자가 직접 태그 정의 가능**

---

## 🖋️ **2. HTML 기본 구조**

### 📌 **기본 틀**

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>나의 첫 웹페이지</title>
  </head>
  <body>
    <h1>안녕하세요, HTML!</h1>
    <p>이곳에 본문 내용이 들어갑니다.</p>
  </body>
</html>
```

---

### 🔍 **각 요소 설명**

| 요소 | 역할 설명 |
| --- | --- |
| `<!DOCTYPE html>` | **HTML5 문서**임을 선언 (브라우저가 표준모드로 해석) |
| `<html lang="ko">` | 문서의 **루트(root) 요소**, 언어 설정 (SEO, 스크린리더 활용) |
| `<head>` | 메타 정보, 외부 CSS, JS, 제목 등 **보이지 않는 설정** 영역 |
| `<meta charset>` | 문자 인코딩 → **한글 깨짐 방지 (UTF-8)** |
| `<meta viewport>` | **모바일/반응형** 대응 필수 |
| `<title>` | 브라우저 탭 제목, **검색 엔진 결과에 직접 표시됨 (SEO 영향!)** |
| `<body>` | 실제 **사용자에게 보이는 모든 콘텐츠** 영역 |

---

### 🧩 **비유로 쉽게**

`<!DOCTYPE html>` = "이 문서 최신 HTML5야!" 라고 **브라우저에게 신분증 제시**

`<html>` = 전체 건물

`<head>` = **설계도, 내부 정보** (사용자는 직접 안 봄)

`<body>` = **눈에 보이는 실제 건물 (콘텐츠)**

---

### 🚩 **심화 포인트**

- **DOCTYPE 없는 구버전 브라우저는 Quirks 모드로 비표준 해석 = 레이아웃 깨짐 가능성!**
- `<meta name="description">` → **검색 결과 요약**에 직접 사용됨
- `<lang>` → 스크린리더, 검색엔진은 이 언어정보로 **맞춤 결과** 제공

---

### 💻 **심화 적용 실전 예제**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="HTML 구조, 시맨틱 태그, SEO 최적화 방법">
  <title>HTML 구조 완벽 가이드</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>HTML 마스터 가이드</h1>
  </header>
  <main>
    <section>
      <h2>기본 구조 이해하기</h2>
      <p>DOCTYPE부터 body까지 하나하나 설명</p>
    </section>
    <footer>
      <p>&copy; 2025 All rights reserved.</p>
    </footer>
  </main>
</body>
</html>
```

---

### 💼 **기술 면접 포인트**

1. **Q:** DOCTYPE 왜 필요?**A:** 브라우저가 **표준모드로 렌더링**, Quirks 모드 방지
2. **Q:** `<head>`에서 SEO에 중요한 태그?**A:** `<title>`, `<meta name="description">`, `<meta lang>` 등

---

## ⚙️ **3. HTML 문서 작성 시 주의사항**

---

### 📌 **필수 규칙**

| 주의사항 | 설명 |
| --- | --- |
| ✅ 태그 **열고 닫기 정확** | `<p>`, `<div>` 등 닫는 태그 필수 (단, `<br>`, `<img>` 등 예외) |
| ✅ **중첩 규칙** 준수 | 태그 제대로 닫고, **부모-자식 관계 순서** 지키기 |
| ✅ **속성값 따옴표로 감싸기** | 예: `<meta charset="UTF-8">` |
| ✅ **시맨틱 태그 적극 활용** | `<header>`, `<main>`, `<footer>` → 구조 명확해짐 (SEO, 접근성 ↑) |
| ✅ **소문자 태그 권장** | 대소문자 구분 안하지만 **일관성, 유지보수성 ↑** |
| ✅ **W3C Validator로 유효성 검사** | 문법 오류 사전 점검, [https://validator.w3.org](https://validator.w3.org/) |

---

### 🎯 **심화 개념**

| 심화 개념 | 설명 |
| --- | --- |
| 🌐 **웹 접근성** | 올바른 태그 구조 → 스크린리더가 문서 흐름 자연스럽게 인식 |
| 🔍 **SEO 최적화** | 제목 태그 순서, 메타 정보 정확 → 검색 엔진이 페이지 잘 이해 |
| 🔥 **유효성 검사 필수** | 구조 오류, 속성 누락 발견 → 브라우저 렌더링 오류 방지, 유지보수 쉬움 |

---

### 💡 **자주하는 실수 & 수정**

❌ 잘못된 예

```html
<p>문단 시작
<p>중첩 잘못</p>
```

✅ 올바른 예

```html
<p>문단 시작</p>
<p>다음 문단</p>
```

---

### 💼 **면접에서 자주 나오는 질문**

1. **Q:** 왜 시맨틱 태그 써야 하나요?**A:** 구조 명확 → 검색 엔진 & 스크린리더 인식, 유지보수성, SEO ↑
2. **Q:** HTML 유효성 검사의 목적은?**A:** 문법 오류, 접근성, SEO, 브라우저 호환성 확보 위해

---

# 📚 **전체 요약**

| 항목 | 핵심 요점 |
| --- | --- |
| HTML 정의 & 역할 | 웹 페이지의 **구조화 언어**, 검색엔진 & 스크린리더가 인식하는 뼈대 |
| HTML 기본 구조 | DOCTYPE → `<html>` → `<head>` → `<body>` |
| 심화 포인트 | SEO (제목, 메타), 접근성 (시맨틱), 유효성 검사, lang 설정 |
| 문서 작성 주의사항 | 닫기태그, 중첩규칙, 따옴표, 시맨틱 태그 적극 사용, 소문자 일관성 유지 |
| 기술 면접 포인트 | DOCTYPE, 시맨틱, 유효성 검사, SEO 관련 태그 역할 정확히 숙지 |

---
