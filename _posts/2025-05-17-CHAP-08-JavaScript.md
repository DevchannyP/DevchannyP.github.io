---
layout: post
title: "CHAP 8. DOM 조작과 이벤트 심화"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro8.png
author: Devchanny
---


# ** 📌DOM(Document Object Model) 이란?** 

> HTML 문서를 객체로 표현한 구조 → 브라우저가 이해할 수 있는 트리
> 
- HTML을 **객체화 → JS로 직접 조작 가능**
- **트리(Tree) 구조**로 계층화 → 부모-자식 관계

---

## 2️⃣ 🌳 DOM 트리 구조 (시각화)

```html
<body>
  <div id="container">
    <p>Hello</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
</body>
```

```
php-template
복사편집
Document
 └── <html>
      └── <body>
           └── <div id="container">
                ├── <p>
                └── <ul>
                     ├── <li>
                     └── <li>
```

- **Document → Element → Text → Attribute → Comment**로 구성

---

## 3️⃣ 🔍 **DOM 탐색 (기초 + 심화)**

### 📋 기본 탐색 메서드

| 메서드 | 설명 |
| --- | --- |
| `getElementById` | id로 탐색 |
| `getElementsByClassName` | class로 탐색 (HTMLCollection) |
| `querySelector` | CSS 선택자 기반 탐색 (최초 하나) |
| `querySelectorAll` | CSS 선택자 기반 모든 요소 (NodeList) |

---

### ✅ **심화 탐색 메서드**

| 메서드 | 설명 |
| --- | --- |
| `parentNode` / `parentElement` | 부모 요소 탐색 |
| `children` | 자식 요소(HTMLCollection) |
| `firstElementChild` / `lastElementChild` | 첫/마지막 자식 |
| `nextElementSibling` / `previousElementSibling` | 형제 노드 탐색 |

---

### 🎯 **심화 예제**

```jsx
javascript
복사편집
const container = document.getElementById('container');
console.log(container.children); // ul, p
console.log(container.parentElement); // body
console.log(container.firstElementChild); // <p
```

---

## 4️⃣ 🛠️ **DOM 수정/추가/삭제 심화 패턴**

| 작업 | 메서드 |
| --- | --- |
| 내용 수정 | `element.textContent`, `innerHTML` |
| 속성 수정 | `setAttribute`, `classList` |
| 요소 추가 | `appendChild`, `insertBefore`, `insertAdjacentHTML` |
| 요소 삭제 | `removeChild`, `remove()` |

---

### 🚀 **실무 최적화 패턴**

```jsx
// 기존 요소를 제거 후 재삽입 → 성능 저하
document.body.innerHTML += '<div>New</div>'; // ❌

// DocumentFragment 사용 → 성능 향상
const frag = document.createDocumentFragment();
const newDiv = document.createElement('div');
newDiv.textContent = 'New';
frag.appendChild(newDiv);
document.body.appendChild(frag); // ✅
```

---

## 5️⃣ 🎯 **이벤트(Event) 기본**

| 용어 | 설명 |
| --- | --- |
| Event | 사용자 입력 or 시스템 발생 행동 (클릭, 스크롤 등) |
| Event Listener | 이벤트 발생 시 실행할 함수 등록 |

---

### ✅ **기초 예제**

```jsx
const btn = document.querySelector('button');
btn.addEventListener('click', () => console.log('Button clicked!'));
```

---

## 6️⃣ 🔥 **이벤트 버블링 & 캡처링 심화**

### 📌 **전파 과정:**

```
1. Capturing Phase (최상위 → 타겟)
2. Target Phase (이벤트 발생)
3. Bubbling Phase (타겟 → 최상위)
```

---

### 🚀 **가시적 도식**

```
<body>
  <div>
    <button>Click</button>
  </div>
</body>

Click →
1. body (캡처링)
2. div (캡처링)
3. button (타겟)
4. div (버블링)
5. body (버블링)
```

---

### ✅ **캡처링 설정**

```jsx
document.body.addEventListener('click', () => console.log('Capturing'), true);
```

---

### **면접 포인트:**

> "버블링과 캡처링의 차이와, 실무에서 캡처링은 언제 사용하는가?"
> 

→ 기본은 버블링, 특수한 경우 **전파 순서 제어** 위해 캡처링

---

## 7️⃣ 🚫 **stopPropagation & preventDefault 심화**

| 메서드 | 역할 |
| --- | --- |
| stopPropagation | **이벤트 전파 차단** (상위로 안 올라감) |
| stopImmediatePropagation | **현재 요소 내 모든 핸들러 실행 중단** |
| preventDefault | **기본 동작(링크 이동, 폼 제출 등) 차단** |

---

### ✅ **심화 예제**

```jsx
const link = document.querySelector('a');

link.addEventListener('click', (e) => {
  e.preventDefault();      // 링크 이동 X
  e.stopPropagation();     // 상위 전파 X
});
```

---

## 8️⃣ 🧠 **이벤트 위임 심화 실무 패턴**

> 부모 요소에 이벤트를 걸고, 자식의 이벤트를 한 번에 처리 → 성능 최적화
> 

---

### ✅ **기본 예제**

```jsx
document.querySelector('#list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('active');
  }
});
```

---

### 🚀 **심화: 동적 요소 관리 + 위임 활용**

```jsx
const list = document.querySelector('#list');

// 동적으로 요소 추가
const newItem = document.createElement('li');
newItem.textContent = 'New Item';
list.appendChild(newItem);

// 이미 부모에 등록된 이벤트 리스너로 처리 OK!
```

---

## 9️⃣ ⚡ **실무 성능 최적화 패턴**

| 상황 | 최적화 방법 |
| --- | --- |
| 많은 요소에 이벤트 리스너 | **부모에 이벤트 위임 적용** |
| DOM 조작 많을 때 | **DocumentFragment 사용 → 리플로우 최소화** |
| 고빈도 이벤트 (scroll, resize) | **Throttle/Debounce 적용** |
| 동적 요소 많을 때 | **MutationObserver + 이벤트 위임 조합 활용** |

---

## 🔟 🧠 **기술 면접 대비 핵심 정리**

| 질문 | 핵심 답변 |
| --- | --- |
| DOM이란? | HTML 문서를 객체로 표현한 트리 구조 |
| DOM 탐색 방법? | getElementById, querySelector, parentNode 등 |
| 버블링 vs 캡처링 차이? | 전파 방향: 하위→상위 vs 상위→하위 |
| stopPropagation과 preventDefault 차이? | 전파 중단 vs 기본 동작 취소 |
| 이벤트 위임 장점? | 리스너 부하 ↓, 동적 요소 관리 쉬움 |
| 실무에서 DOM 조작 성능 개선 방법? | Fragment, 이벤트 위임, Throttle, MutationObserver |

### 🚀 종합코드 예제

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 비동기 & DOM 조작 심화 실습</title>
    <style>
        .area {
            background: lightgray;
            border: 1px solid black;
            width: 600px;
            margin-bottom: 10px;
            padding: 10px;
            white-space: pre-wrap;
            font-family: monospace;
        }
        .big { height: 600px; overflow-y: scroll; }
    </style>
</head>
<body>
    <h2>🟢 JavaScript 비동기 & DOM 조작 심화 실습</h2>
    <div class="area big" id="outputArea"></div>
    
    <script>
        function runExamples() {
            const output = document.getElementById("outputArea");
            function log(text) { output.innerHTML += text + "\n"; }
            
            // ✅ DOM 조작 기본
            log("✅ DOM 조작 기본");
            document.body.innerHTML += '<div id="container"><p>Hello</p><ul><li>Item 1</li><li>Item 2</li></ul></div>';
            
            // ✅ DOM 탐색 예제
            log("\n✅ DOM 탐색 예제");
            const container = document.getElementById('container');
            log("children: " + container.children.length); // 자식 요소 개수
            log("parent: " + container.parentElement.tagName); // 부모 요소 태그명
            log("first child: " + container.firstElementChild.tagName); // 첫 번째 자식 요소 태그명
            
            // ✅ DOM 수정/추가/삭제 예제
            log("\n✅ DOM 수정/추가/삭제 예제");
            const newItem = document.createElement('li');
            newItem.textContent = 'New Item';
            container.querySelector('ul').appendChild(newItem);
            log("새 아이템 추가됨: " + newItem.textContent);
            
            // ✅ 이벤트 핸들링 기본
            log("\n✅ 이벤트 핸들링 기본");
            const btn = document.createElement('button');
            btn.textContent = '클릭하세요';
            document.body.appendChild(btn);
            btn.addEventListener('click', () => log('버튼 클릭됨!'));
            
            // ✅ 이벤트 버블링 & 캡처링
            log("\n✅ 이벤트 버블링 & 캡처링");
            document.body.addEventListener('click', () => log('📌 캡처링 단계'), true);
            document.body.addEventListener('click', () => log('📌 버블링 단계'));
            
            // ✅ stopPropagation & preventDefault 예제
            log("\n✅ stopPropagation & preventDefault 예제");
            const link = document.createElement('a');
            link.href = "#";
            link.textContent = "클릭 금지 링크";
            document.body.appendChild(link);
            link.addEventListener('click', (e) => {
                e.preventDefault(); // 기본 동작(이동) 차단
                e.stopPropagation(); // 이벤트 전파 차단
                log("❌ 링크 클릭 차단됨");
            });
            
            // ✅ 이벤트 위임 패턴
            log("\n✅ 이벤트 위임 패턴");
            const list = document.createElement('ul');
            list.innerHTML = '<li>Item A</li><li>Item B</li>';
            document.body.appendChild(list);
            list.addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    e.target.classList.toggle('active'); // 클래스 토글
                    log("📌 " + e.target.textContent + " 선택됨");
                }
            });
            
            // ✅ 실무 성능 최적화
            log("\n✅ 실무 성능 최적화");
            const frag = document.createDocumentFragment();
            for (let i = 0; i < 5; i++) {
                const div = document.createElement('div');
                div.textContent = 'Batch ' + i;
                frag.appendChild(div); // DocumentFragment에 추가
            }
            document.body.appendChild(frag); // 한 번에 추가 (리플로우 최소화)
            log("🚀 DocumentFragment로 배치 처리 완료");

            // ✅ MutationObserver를 활용한 동적 요소 감지
            log("\n✅ MutationObserver 활용 예제");
            const observerTarget = document.createElement('div');
            observerTarget.id = 'observerTarget';
            document.body.appendChild(observerTarget);

            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    log("⚡ 변경 감지됨: " + mutation.type);
                });
            });
            observer.observe(observerTarget, { childList: true, subtree: true });

            setTimeout(() => {
                const newElement = document.createElement('p');
                newElement.textContent = '👀 감지된 요소';
                observerTarget.appendChild(newElement);
            }, 2000);
        }
        
        runExamples();
    </script>
</body>
</html>

```

### 🚀 이벤트 코드 예제

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JavaScript 이벤트 완전 정복 🚀</title>
  <style>
    .area {
      width: 100%;
      height: 50px;
      border: 1px solid #333;
      margin-top: 10px;
      padding: 5px;
      background-color: #f9f9f9;
    }
    .highlight {
      background-color: yellow;
    }
  </style>
</head>
<body>

  <h1>📚 이벤트(Event) 완벽 가이드</h1>

  <!-- 1️⃣ 인라인 이벤트 -->
  <h3>1️⃣ 인라인 이벤트 방식</h3>
  <button onclick="inlineEvent()">🔥 인라인 실행확인</button>

  <!-- 2️⃣ 속성으로 핸들러 연결 -->
  <h3>2️⃣ 속성 방식 (DOM 프로퍼티 방식)</h3>
  <button id="btn1">✅ 속성 방식 실행</button>
  <div id="area1" class="area"></div>

  <!-- 3️⃣ addEventListener -->
  <h3>3️⃣ addEventListener 방식 (표준 이벤트 모델)</h3>
  <button id="btn2">🎯 addEventListener 실행</button>
  <div id="area2" class="area"></div>

  <!-- 4️⃣ 이벤트 객체 + this -->
  <h3>4️⃣ 이벤트 객체 & this 이해</h3>
  <button id="btn3">🔍 이벤트 객체 확인</button>
  <div id="area3" class="area"></div>

  <!-- 5️⃣ 이벤트 위임 -->
  <h3>5️⃣ 이벤트 위임 (Event Delegation)</h3>
  <div id="parentArea" class="area">
    <button class="child-btn">동적버튼1</button>
    <button class="child-btn">동적버튼2</button>
  </div>
  <button id="addBtn">➕ 동적 버튼 추가</button>

  <!-- 6️⃣ 고급 - 이벤트 제거 & once 옵션 -->
  <h3>6️⃣ 고급 - removeEventListener & once 옵션</h3>
  <button id="btn4">🗑️ 핸들러 한 번 실행 후 제거</button>
  <div id="area4" class="area"></div>

  <!-- 7️⃣ preventDefault & stopPropagation -->
  <h3>7️⃣ 기본 동작 방지 & 이벤트 전파 중단</h3>
  <form id="myForm">
    <input type="text" placeholder="아무거나 입력 후 엔터" />
    <button type="submit">🚫 제출</button>
  </form>
  <div id="area5" class="area"></div>

  <!-- 8️⃣ 커스텀 이벤트 -->
  <h3>8️⃣ 커스텀 이벤트 생성 & 사용</h3>
  <button id="btn5">✨ 커스텀 이벤트 실행</button>
  <div id="area6" class="area"></div>

  <script>
    /***********************************
    1️⃣ 인라인 이벤트 방식 - HTML에 직접 지정
    ************************************/
    function inlineEvent() {
      alert("🔥 인라인 이벤트 발생!");
    }

    /***********************************
    2️⃣ 속성 방식 (DOM 프로퍼티에 함수 할당)
    ************************************/
    const btn1 = document.getElementById("btn1");
    const area1 = document.getElementById("area1");

    btn1.onclick = function() {
      area1.textContent = "✅ 속성 방식 이벤트 실행!";
      area1.style.backgroundColor = "#d4edda";
    };

    /***********************************
    3️⃣ addEventListener 방식 (다중 핸들러 가능)
    ************************************/
    const btn2 = document.getElementById("btn2");
    const area2 = document.getElementById("area2");

    btn2.addEventListener("click", function() {
      area2.textContent = "🎯 첫 번째 핸들러 실행!";
      area2.style.backgroundColor = "#cce5ff";
    });

    btn2.addEventListener("click", function() {
      console.log("✅ 두 번째 핸들러도 실행됨!");
    });

    /***********************************
    4️⃣ 이벤트 객체(event) & this 이해
    ************************************/
    const btn3 = document.getElementById("btn3");
    const area3 = document.getElementById("area3");

    btn3.addEventListener("click", function(event) {
      console.log("👉 이벤트 타입:", event.type); // 클릭 타입
      console.log("👉 클릭한 요소:", event.target); // 클릭 대상
      this.style.backgroundColor = "pink"; // this는 btn3 가리킴

      area3.innerHTML = `
        <strong>이벤트 타입:</strong> ${event.type}<br/>
        <strong>클릭한 요소:</strong> ${event.target.textContent}
      `;
    });

    /***********************************
    5️⃣ 이벤트 위임 (부모에게 이벤트 연결)
    ************************************/
    const parentArea = document.getElementById("parentArea");
    const addBtn = document.getElementById("addBtn");

    parentArea.addEventListener("click", function(event) {
      if (event.target.classList.contains("child-btn")) {
        event.target.classList.toggle("highlight"); // 강조 토글
        alert(`🔽 ${event.target.textContent} 클릭됨!`);
      }
    });

    addBtn.addEventListener("click", function() {
      const newBtn = document.createElement("button");
      newBtn.textContent = `동적버튼${parentArea.children.length + 1}`;
      newBtn.classList.add("child-btn");
      parentArea.appendChild(newBtn);
    });

    /***********************************
    6️⃣ 이벤트 제거 & once 옵션
    ************************************/
    const btn4 = document.getElementById("btn4");
    const area4 = document.getElementById("area4");

    // 방법1 - once 옵션: 한 번만 실행 후 자동 제거
    btn4.addEventListener("click", function() {
      area4.textContent = "🗑️ 한 번만 실행 후 제거됨!";
      area4.style.backgroundColor = "#ffeeba";
    }, { once: true });

    // 방법2 - removeEventListener (설명용, 따로 사용하려면 핸들러 변수화 필요)

    /***********************************
    7️⃣ preventDefault & stopPropagation
    ************************************/
    const myForm = document.getElementById("myForm");
    const area5 = document.getElementById("area5");

    myForm.addEventListener("submit", function(event) {
      event.preventDefault(); // 폼 기본 제출 막기 🚫
      area5.textContent = "🚫 기본 제출 방지됨!";
      area5.style.backgroundColor = "#f8d7da";
    });

    /***********************************
    8️⃣ 커스텀 이벤트 만들기
    ************************************/
    const btn5 = document.getElementById("btn5");
    const area6 = document.getElementById("area6");

    // 커스텀 이벤트 정의
    const customEvent = new CustomEvent("shine", {
      detail: { message: "✨ 커스텀 이벤트 발생!" }
    });

    // 이벤트 리스너
    btn5.addEventListener("shine", function(e) {
      console.log(e.detail.message);
      area6.textContent = e.detail.message;
      area6.style.backgroundColor = "#e2e3e5";
    });

    // 클릭 시 커스텀 이벤트 발생
    btn5.addEventListener("click", function() {
      btn5.dispatchEvent(customEvent); // 커스텀 이벤트 실행
    });

  </script>

</body>
</html>

```
