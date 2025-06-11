---
layout: post
title: "CHAP 10. 노션 활용 및 자바 기초 개념"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro10.png
author: Devchanny
---


# ** 📌메모리 누수 심화**

### 📌 **정의**

> 사용하지 않는데도 GC에 의해 해제되지 않고 계속 메모리에 남아있는 데이터
> 

---

### 🔥 **주요 원인 심화 정리**

| 원인 | 설명 | 실수 패턴 |
| --- | --- | --- |
| 전역 변수 | 전역 참조는 앱 종료 전까지 해제 X | `window.leak = ...` |
| 클로저 내부 참조 | 외부 함수 스코프 참조 유지 | 이벤트 핸들러 내부에서 클로저 |
| DOM 요소 참조 | DOM 삭제했는데 참조 변수 유지 | `let btn = document.getElementById()` 후 DOM 삭제 안 함 |
| 타이머 | `setInterval` → `clearInterval` 누락 | 주기적 함수 → 페이지 이동해도 계속 동작 |
| 이벤트 리스너 | `removeEventListener` 안 함 | Single Page App에서 자주 발생 |

---

### ✅ **실무 방지 예제**

```jsx
// BAD
let leak = [];
document.querySelector('#btn').addEventListener('click', function handler() {
  leak.push(new Array(100000).fill('*'));
});

// GOOD
const btn = document.querySelector('#btn');
function handler() {
  leak.push(new Array(100000).fill('*'));
}
btn.addEventListener('click', handler);
btn.removeEventListener('click', handler);
```

---

### 🚀 **DevTools로 메모리 누수 검출**

1. **Memory → Heap Snapshot → GC 강제 실행**
2. **Detached DOM Tree 확인**
3. **Object → Retainers Chain → 누수된 참조 확인**
4. **실제 원인 (클로저, DOM 참조 등) 추적 가능**

---

### 🌳 **메모리 누수 발생 흐름 도식화**

```
[ DOM 요소 ]
     ↓
[ 이벤트 리스너, 클로저에서 참조 ]
     ↓
[ 요소 삭제 → 참조 남음 ]
     ↓
[ GC 불가 → 메모리 증가 ]
```

---

---

## 2️⃣ 🎯 **리플로우 & 리페인트 최적화 심화**

### 📌 **정확한 차이**

| 용어 | 의미 | 성능 영향 |
| --- | --- | --- |
| **Reflow (Layout)** | DOM 구조 변경 → 레이아웃 재계산 | **크다** (트리 전체 영향) |
| **Repaint** | 색상/폰트 등 시각적 속성 변경 | 상대적 **낮음** |

---

### 🚨 **Reflow 발생 트리거 심화**

| 트리거 | 설명 |
| --- | --- |
| DOM 삽입/삭제 | `.appendChild()`, `.remove()` |
| 클래스 추가/삭제 | `.classList.add()` |
| offsetWidth, getBoundingClientRect 접근 | **강제 Reflow 발생!** |
| 윈도우 리사이즈, 폰트 변경 등 |  |

---

### 🛠️ **최적화 전략**

| 방법 | 설명 |
| --- | --- |
| **DocumentFragment** | 다수 DOM 조작 → 한 번에 삽입 |
| **batch 처리** | 스타일 변경 한 번에 |
| **requestAnimationFrame** | 애니메이션 최적화 |
| **GPU 가속(css transform, opacity)** | Reflow 피하고 Repaint만 유도 |

---

### ❌ **잘못된 예제:**

```jsx
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  document.body.appendChild(item); // Reflow 1000번 발생
}
```

---

### ✅ **개선 예제:**

```jsx
const frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  frag.appendChild(item);
}
document.body.appendChild(frag); // Reflow 1번
```

---

---

## 3️⃣ 🛠️ **크롬 DevTools 고급 디버깅**

### 📌 **필수 탭 & 실무 포인트**

| 탭 | 사용법 |
| --- | --- |
| **Performance** | FPS Drop 원인, Layout Shifts 확인 |
| **Memory → Leak 분석** | Snapshot → Detached DOM/Closure 추적 |
| **Sources → Breakpoints** | 조건부, DOM 변경 시, XHR 요청 시 중단 가능 |
| **Network** | 요청/응답 헤더, 캐시 전략 확인 |
| **Application** | 쿠키, Storage, Service Worker 확인 |

---

### 🚀 **실전 트러블 슈팅 예시**

1. Performance → **Long Task (빨간색) 확인**
2. 해당 Task → 함수 확인 → 스크롤 렉 원인 pinpoint
3. Memory → Heap 비교, 누수 원인 찾기

---

---

## 4️⃣ 🔐 **XSS & CSRF 심화**

---

### 🦠 **XSS 종류별 예제**

| 유형 | 설명 | 예시 |
| --- | --- | --- |
| **Stored XSS** | DB에 스크립트 저장 → 여러 사용자 노출 | 댓글에 `<script>alert(1)</script>` |
| **Reflected XSS** | URL에 삽입 → 즉시 실행 | `?search=<script>alert(1)</script>` |
| **DOM-based XSS** | JS가 innerHTML로 바로 삽입 | `element.innerHTML = userInput;` |

---

### ✅ **CSP 적용 실무 예제**

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; object-src 'none';">
```

- 외부 스크립트, 인라인 스크립트 차단

---

---

### 🦠 **CSRF 구조 시각화**

```
User 로그인 → 공격 사이트 접속 →
<img src="https://bank.com/transfer?amount=1000"> →
쿠키 자동 포함 → 요청 조작 성공
```

---

### ✅ **실무 방어: Token + SameSite**

```
Set-Cookie: session=abc; SameSite=Strict; Secure
```

1. **서버 → 랜덤 CSRF Token 발급**
2. **폼/헤더에 포함 → 서버 검증**
3. **SameSite + HTTPS 필수**

---

---

## 🧠 **기술 면접 대비 초고급 요약**

| 질문 | 핵심 답변 |
| --- | --- |
| 메모리 누수 원인? | 전역 변수, DOM 참조, 클로저, 이벤트 미제거, 타이머 |
| 리플로우 vs 리페인트? | 레이아웃 재계산 → 성능 영향 큼 / 색상, 글꼴 등 |
| DevTools Memory에서 누수 찾기? | Heap Snapshot → Detached DOM, Retainers Chain 분석 |
| XSS 방어법? | 입력 검증, 이스케이프, CSP |
| CSRF 방어법? | Token 검증, SameSite 쿠키, CORS, HTTPS |

### ✅ 종합코드 예제

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>고급 성능 최적화 & 보안 실습 🚀</title>
  <style>
    .output {
      width: 100%;
      min-height: 50px;
      border: 1px solid #333;
      margin-top: 10px;
      padding: 10px;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <h1>📚 성능 최적화 & 보안 실습</h1>
  
  <h3>1️⃣ 메모리 누수 방지</h3>
  <button id="btnMemoryLeak">🔍 실행</button>
  <div id="output1" class="output"></div>

  <h3>2️⃣ 리플로우 & 리페인트 최적화</h3>
  <button id="btnReflow">⚡ 실행</button>
  <div id="output2" class="output"></div>

  <h3>3️⃣ 크롬 DevTools 활용</h3>
  <button id="btnDevTools">🛠 실행</button>
  <div id="output3" class="output"></div>

  <h3>4️⃣ XSS & CSRF 방어</h3>
  <button id="btnSecurity">🔐 실행</button>
  <div id="output4" class="output"></div>

  <script>
    /*****************************
    1️⃣ 메모리 누수 방지
    *****************************/
    document.getElementById("btnMemoryLeak").addEventListener("click", function() {
      let element = document.createElement("div");
      element.textContent = "✅ 메모리 누수 예제 실행!";
      document.body.appendChild(element);
      
      // 🔴 메모리 누수 방지: 타이머 종료 후 요소 제거
      setTimeout(() => {
        document.body.removeChild(element); 
      }, 2000);
      
      document.getElementById("output1").textContent = "메모리 관리: DOM 요소 자동 제거";
    });

    /*****************************
    2️⃣ 리플로우 & 리페인트 최적화
    *****************************/
    document.getElementById("btnReflow").addEventListener("click", function() {
      const frag = document.createDocumentFragment();
      
      for (let i = 0; i < 1000; i++) {
        const div = document.createElement("div");
        div.textContent = `Item ${i}`;
        frag.appendChild(div);
      }
      
      document.body.appendChild(frag); // 🚀 Reflow 최소화
      document.getElementById("output2").textContent = "Reflow 최적화 완료!";
    });

    /*****************************
    3️⃣ 크롬 DevTools 활용
    *****************************/
    document.getElementById("btnDevTools").addEventListener("click", function() {
      console.log("Performance 탭에서 확인하세요!");
      document.getElementById("output3").textContent = "DevTools 활용: 콘솔 확인!";
    });

    /*****************************
    4️⃣ XSS & CSRF 방어
    *****************************/
    document.getElementById("btnSecurity").addEventListener("click", function() {
      const userInput = "<script>alert('XSS 공격!')</script>";
      
      // 🛑 XSS 방지: 특수문자를 HTML 엔티티로 변환
      const sanitizedInput = userInput.replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
      
      document.getElementById("output4").innerHTML = `안전한 출력: ${sanitizedInput}`;
    });
  </script>
</body>
</html>

```
