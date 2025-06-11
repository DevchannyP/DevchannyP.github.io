---
layout: post
title: "CHAP 9. 📦 ES6+ 주요 문법 초고급 완벽 정리"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro9.png
author: Devchanny
---


# ** 📌템플릿 리터럴 (Template Literal)**

### 📌 **정의:**

**백틱(``)과 `${}` 표현식으로 문자열 조립을 더 유연하게!**

---

### ✅ **기초 예제:**

```jsx
const name = 'Alice';
console.log(`Hello, ${name}!`);

```

---

### 🚀 **심화: 표현식 삽입, 삼항 연산자, 함수 호출 가능**

```jsx
const age = 21;
console.log(`You are ${age >= 18 ? 'adult' : 'minor'}.`);

function upper(str) {
  return str.toUpperCase();
}
console.log(`Name: ${upper('alice')}`); // Name: ALICE

```

---

### 🌟 **멀티라인 문자열 & HTML 템플릿 처리**

```jsx
const html = `
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
`;
console.log(html);

```

---

### 🧩 **Tagged Template Literal (고급 실무 패턴)**

```jsx
function sanitize(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}${String(values[i]).replace(/</g, '&lt;') || ''}`, '');
}

const name = '<Tom>';
const result = sanitize`Hello, ${name}!`;
console.log(result); // Hello, &lt;Tom&gt;!

```

> 실무 활용:
> 
> - **XSS 방지 (보안 강화)**
> - **i18n 다국어 처리 시스템**

---

## 2️⃣ 🧩 **디스트럭처링 (Destructuring)**

### 📌 **정의:**

**배열, 객체에서 값 추출 → 변수 할당 쉽게**

---

### ✅ **배열 디스트럭처링 기초**

```jsx
const arr = [1, 2, 3];
const [first, second, third] = arr;
console.log(first, second, third); // 1 2 3

```

---

### ✅ **객체 디스트럭처링 기초**

```jsx
const user = { id: 1, name: 'Tom' };
const { id, name } = user;
console.log(id, name); // 1 Tom

```

---

### 🚀 **심화: 기본값, 별칭, 중첩 구조**

```jsx
const person = { info: { name: 'Jane', age: 25 } };
const { info: { name: userName = 'Unknown', age } } = person;
console.log(userName, age); // Jane 25

```

---

### 🔥 **함수 매개변수 디스트럭처링 (실무 패턴)**

```jsx
function display({ id, name = 'Guest' }) {
  console.log(`${id}: ${name}`);
}
display({ id: 1 }); // 1: Guest

```

---

## 3️⃣ 🌊 **스프레드 & Rest 연산자 (...)**

### ✅ **배열 스프레드 기초**

```jsx
const arr = [1, 2];
const arr2 = [...arr, 3, 4];
console.log(arr2); // [1, 2, 3, 4]

```

---

### ✅ **객체 스프레드 기초**

```jsx
const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 };
console.log(obj2); // { a: 1, b: 2 }

```

---

### 🔥 **실무 패턴: 특정 속성 제외 → Rest 활용**

```jsx
function removeSensitive(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}
const user = { id: 1, name: 'Alice', password: 'secret' };
console.log(removeSensitive(user)); // { id: 1, name: 'Alice' }

```

---

## 4️⃣ 📦 **ES6 모듈 시스템**

### ✅ **Named Export / Default Export**

```jsx
// module.js
export const name = 'Tom';
export default function greet() { console.log('Hello'); }

```

```jsx
// main.js
import greet, { name } from './module.js';
greet(); // Hello
console.log(name); // Tom

```

---

### 🚀 **Dynamic Import (실무 최적화)**

```jsx
button.addEventListener('click', async () => {
  const module = await import('./module.js');
  module.default();
});

```

**💡 실무 장점:**

- **필요 시점 로딩 (Lazy Loading)**
- **성능 최적화 (코드 스플리팅, 번들 크기 최소화)**

---

## 🧠 **5️⃣ 기술 면접 대비 초고급 정리**

| 질문 | 핵심 답변 |
| --- | --- |
| 템플릿 리터럴 장점? | `${}` 삽입, 멀티라인, tagged 활용 가능 |
| 디스트럭처링 특징? | 객체/배열 값 추출, 함수 인자, 기본값, 중첩 |
| 스프레드와 Rest 차이? | 펼치기 vs 모으기, 얕은 복사 주의 |
| 모듈 시스템 특징? | import/export, 전역 오염 방지, lazy loading 가능 |
| 동적 import 사용 시점? | 성능 최적화, 필요한 시점에만 로딩 |
| Tree Shaking 적용 조건? | Named export만 가능, side-effect 없는 코드 |

---

### 🚀 종합 코드 예

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ES6+ 주요 문법 종합 예제 🚀</title>
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

  <h1>📚 ES6+ 주요 문법 실습</h1>
  
  <!-- 1️⃣ 템플릿 리터럴 -->
  <h3>1️⃣ 템플릿 리터럴 (Template Literal)</h3>
  <button id="btnTemplate">✨ 실행</button>
  <div id="output1" class="output"></div>

  <!-- 2️⃣ 디스트럭처링 -->
  <h3>2️⃣ 디스트럭처링 (Destructuring)</h3>
  <button id="btnDestructuring">🔍 실행</button>
  <div id="output2" class="output"></div>

  <!-- 3️⃣ 스프레드 & Rest 연산자 -->
  <h3>3️⃣ 스프레드 & Rest 연산자 (...) </h3>
  <button id="btnSpread">📦 실행</button>
  <div id="output3" class="output"></div>

  <!-- 4️⃣ ES6 모듈 시스템 -->
  <h3>4️⃣ ES6 모듈 시스템 (Console 확인)</h3>
  <button id="btnModule">📁 실행</button>

  <script>
    /*****************************
    1️⃣ 템플릿 리터럴 (문자열 조합의 혁신)
    *****************************/
    document.getElementById("btnTemplate").addEventListener("click", function() {
      const name = "Alice";
      const age = 25;
      // 백틱(``)을 활용한 문자열 조합
      document.getElementById("output1").textContent = `Hello, ${name}! You are ${age} years old.`;
    });

    /*****************************
    2️⃣ 디스트럭처링 (객체와 배열 쉽게 분해)
    *****************************/
    document.getElementById("btnDestructuring").addEventListener("click", function() {
      const user = { id: 1, name: "Tom", age: 30 };
      // 객체 디스트럭처링
      const { id, name, age } = user;
      document.getElementById("output2").textContent = `ID: ${id}, Name: ${name}, Age: ${age}`;

      // 배열 디스트럭처링
      const numbers = [10, 20, 30];
      const [first, second, third] = numbers;
      console.log(`First: ${first}, Second: ${second}, Third: ${third}`);
    });

    /*****************************
    3️⃣ 스프레드 & Rest 연산자 (...)
    *****************************/
    document.getElementById("btnSpread").addEventListener("click", function() {
      const arr1 = [1, 2, 3];
      const arr2 = [...arr1, 4, 5]; // 배열 확장
      
      const user = { name: "Alice", age: 25 };
      const newUser = { ...user, location: "NY" }; // 객체 확장
      
      document.getElementById("output3").textContent = `Array: ${arr2}, User: ${JSON.stringify(newUser)}`;

      // Rest 파라미터 예제
      function sum(...numbers) {
        return numbers.reduce((acc, num) => acc + num, 0);
      }
      console.log("Sum: ", sum(1, 2, 3, 4, 5));
    });

    /*****************************
    4️⃣ ES6 모듈 시스템 (코드 분할 및 재사용)
    *****************************/
    document.getElementById("btnModule").addEventListener("click", async function() {
      const module = await import('./module.js'); // 동적 import
      module.default();
    });
  </script>
</body>
</html>

```
