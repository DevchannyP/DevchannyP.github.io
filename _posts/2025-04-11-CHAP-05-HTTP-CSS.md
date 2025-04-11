---
layout: post
title: "CHAP 5. HTML 표(Table) 태그 "
date: 2025-04-11
categories: [frontend, core, html&css]
tags: [frontend, language, html&css]
thumbnail: /assets/img/post-thumbnails/intro5.png
author: Devchanny
---

## 📌 **1️⃣ 표 태그 한눈에 핵심 요약**

| 태그 | 역할 | 기본 스타일 | 시맨틱 의미 | 접근성 | SEO |
| --- | --- | --- | --- | --- | --- |
| `<table>` | 표 전체 생성 | 틀 생성 | ✅ | 그룹 인식 | 데이터 구조화 |
| `<tr>` | 표의 행(Row) | 가로줄 | ✅ | 줄 탐색 | 데이터 배치 |
| `<th>` | 헤더 셀 (제목 셀) | 굵은 글씨 + 중앙 | ✅ | 제목 강조 | 데이터 설명 |
| `<td>` | 일반 데이터 셀 | 왼쪽 정렬 | ✅ | 일반 셀로 인식 | 데이터 내용 |
| `<caption>` | 표 제목 | 상단 중앙 | ✅ | 제목 읽음 | 표 주제 제공 |
| `<thead>` | 머리글 구간 | 상단 구조 | ✅ | 상단 인식 | 구조화 |
| `<tbody>` | 본문 데이터 | 본문 구조 | ✅ | 내용 탐색 | 주요 데이터 |
| `<tfoot>` | 하단 구간 | 하단 구조 | ✅ | 요약 인식 | 요약/총계 |
| `<colgroup>`, `<col>` | 열 그룹화 & 스타일 적용 | 열 전체 | ✅ | 열별 구분 | 스타일 효율 |

---

## 🧩 **2️⃣ 비유로 쉽게 정리 (확장판)**

| 태그 | 비유 🌟 |
| --- | --- |
| `<table>` | 📋 **식판 전체 틀** (표 전체 틀) |
| `<tr>` | 🛏️ **침대 줄처럼 가로줄** (행) |
| `<th>` | 📢 **굵은 제목 셀** (헤더 셀, 두껍고 중앙) |
| `<td>` | 📄 **일반 데이터 셀** (내용 담기) |
| `<caption>` | 🏷️ **표 타이틀 (명패)** |
| `<thead>` | 🎯 **머리글 (표 상단 안내판)** |
| `<tbody>` | 📑 **본문 데이터 (내용 목록)** |
| `<tfoot>` | 📌 **합계, 요약 구간 (총정리)** |
| `<colgroup>`, `<col>` | 📏 **열 전체 꾸미기, 색칠, 스타일 일괄 적용** |

---

## 🏗️ **3️⃣ 태그별 심화 예제 & 실무 팁**

---

### 📋 **1) `<table>` & `<tr>` - 표 기본 틀 & 가로줄**

```html
<table border="1">
  <tr>
    <td>셀1</td>
    <td>셀2</td>
  </tr>
  <tr>
    <td>셀3</td>
    <td>셀4</td>
  </tr>
</table>
```

✅ **Tip:**

- `<tr>`로 **행(Row)** 생성 → **필수**
- **CSS로 border-collapse:collapse;** 자주 사용해 선 깔끔하게:

```css
table {
  border-collapse: collapse;
}
```

---

### 📢 **2) `<th>` vs `<td>` - 헤더 셀과 데이터 셀**

```html
<tr>
  <th>이름</th>
  <th>직책</th>
</tr>
<tr>
  <td>홍길동</td>
  <td>프론트엔드</td>
</tr>
```

| 태그 | 역할 | 스타일 | 접근성 |
| --- | --- | --- | --- |
| `<th>` | 제목 셀 (의미 강조) | 굵음, 중앙 정렬 | 스크린리더 "제목" 인식 |
| `<td>` | 일반 데이터 | 왼쪽 정렬 | 일반 셀 인식 |

✅ **실무 Tip:**

- 데이터 표라면 **헤더 반드시 `<th>`** 사용 → SEO & 접근성 ↑
- **`scope="col"`**, **`scope="row"`** 사용 시 더 정확히:

```html
<th scope="col">이름</th>
<th scope="row">홍길동</th>
```

---

### 🏷️ **3) `<caption>` - 표 제목**

```html
<caption>📊 월별 매출 현황</caption>
```

✅ **Tip:**

- **표 설명 제공 → SEO, 접근성 최적화**
- 화면 밖 숨기고 싶은 경우:

```css
caption {
  position: absolute;
  left: -9999px;
}
```

(스크린리더만 읽고 시각적으로 숨김)

---

### 🎯 **4) `<thead>`, `<tbody>`, `<tfoot>` - 구조화**

```html
<thead>
  <tr><th>이름</th><th>직책</th></tr>
</thead>
<tbody>
  <tr><td>홍길동</td><td>개발자</td></tr>
</tbody>
<tfoot>
  <tr><td colspan="2">총 인원: 1명</td></tr>
</tfoot>
```

✅ **실무 Tip:**

- 대형 표에서 **스타일링, JavaScript 조작 시 유지보수 매우 효율적**
- 스크린리더가 **표 구조 정확히 인식**

---

### 📏 **5) `<colgroup>`, `<col>` - 열 스타일 일괄 적용**

```html
<colgroup>
  <col style="background-color:#eee; width:150px;">
  <col style="width:200px;">
</colgroup>
```

✅ **Tip:**

- 열 전체 배경, 너비, 폰트 등 **반복 제거**
- 테이블 열 많은 경우 **가독성 & 유지보수 ↑**

---

## 🖼️ **6️⃣ 실전 심화 예제: 프로젝트 팀 스케줄**

```html
<table border="1">
  <caption>📝 프로젝트 팀 스케줄</caption>

  <colgroup>
    <col style="width:120px; background:#f9f9f9;">
    <col style="width:180px;">
    <col style="width:150px;">
  </colgroup>

  <thead>
    <tr>
      <th>날짜</th>
      <th>업무</th>
      <th>담당자</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>3/1</td>
      <td>기획 완료</td>
      <td>홍길동</td>
    </tr>
    <tr>
      <td>3/10</td>
      <td>디자인 확정</td>
      <td>김영희</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td colspan="3">총 인원: 2명</td>
    </tr>
  </tfoot>
</table>
```

✅ **실무 활용:**

- **정렬, 헤더, 본문, 요약 명확히 구분**
- **스타일 수정 시 colgroup 사용**

---

## 💼 **7️⃣ 기술 면접 예상 질문 (심화)**

| 질문 | 핵심 정리 |
| --- | --- |
| `<th>` vs `<td>` 차이? | `<th>`: 제목 셀, 굵게, 스크린리더 강조`<td>`: 일반 데이터 셀 |
| `<caption>`의 역할은? | 표 제목 제공, 접근성 & SEO 향상 |
| `<thead>`, `<tbody>`, `<tfoot>`의 용도? | 표 구조 구분, 유지보수 ↑, 스크린리더 탐색 ↑ |
| `<colgroup>`, `<col>` 활용 이유는? | 열 전체 스타일 일괄 적용, 코드 중복 제거 |
| 표 접근성 높이는 방법? | **`<caption>`, `<th>`, `scope`, `<thead>` 적극 활용** |

---

## 🚀 **8️⃣ 실무 Best Practice & 고급 포인트**

| 포인트 | 설명 |
| --- | --- |
| **표 구조 → `<thead>`, `<tbody>`, `<tfoot>`로 구분 필수** | 유지보수, 접근성, 스타일 조작 용이 |
| **`<caption>`으로 표 제목 제공** | 스크린리더, SEO 모두 도움 |
| **헤더 셀은 반드시 `<th>` 사용 + `scope` 명시** | 시맨틱 명확, 스크린리더 정확 인식 |
| **열별 스타일은 `<colgroup>`, `<col>` 적극 사용** | 코드 간결화, 반복 제거 |
| **CSS로 border-collapse, padding, background 적극 활용** | 가독성 ↑ |

---
