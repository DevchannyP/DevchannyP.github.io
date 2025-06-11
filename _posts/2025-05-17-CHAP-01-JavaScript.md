---
layout: post
title: "CHAP 0.  자바스크립트란?"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro0.png
author: Devchanny
---


# ** 📌 자바스크립트의 정체 완전 해부**

### 🔥 자바스크립트란?

| 구분 | 내용 |
| --- | --- |
| 🧬 **언어 타입** | 인터프리터, 동적 타이핑, 싱글 스레드 |
| 🌍 **역할** | 웹 브라우저 제어, 서버(Node.js), 앱 |
| 🕹️ **엔진** | V8(Chrome), SpiderMonkey(Firefox) |
| 🧩 **특징** | 이벤트 기반, 비동기, 객체 기반 |

**🔍 심화 비유:**

> 자바스크립트 = 자동차의 조종석
> 
> 
> 🚗 HTML: 차체, CSS: 디자인, JavaScript: 조작 (운전대, 페달)
> 

---

## 📌 **2️⃣ 변수와 데이터 타입 심화**

### 🏷️ **변수 선언**

| 키워드 | 특징 |
| --- | --- |
| `var` | 함수 스코프, 호이스팅 O |
| `let` | 블록 스코프, 호이스팅 O(초기화 X) |
| `const` | 상수, 블록 스코프, 재할당 불가 |

```jsx
console.log(a); // undefined, var 호이스팅
var a = 10;
```

> 면접 포인트:
> 
> 
> `let`, `const`가 **TDZ(Temporal Dead Zone)**에 빠지는 이유 → **초기화 전 참조 금지**
> 

---

### 🔢 **자료형 심화**

- **원시 타입:** `Number`, `String`, `Boolean`, `undefined`, `null`, `Symbol`, `BigInt`
- **참조 타입:** `Object`, `Array`, `Function`

**🔍 심화 포인트:**

- **Immutable(불변성)**: 원시 타입
- **Mutable(가변성)**: 참조 타입 (메모리 참조 방식까지)

---

## 🔥 **3️⃣ 연산자, 조건문, 반복문 심화**

### 🚀 **연산자 심화**

- == vs ===
→ **암묵적 타입 변환** 발생 차이
- `&&` 단락 평가 (short-circuit) 활용

```jsx
const user = null;
const name = user && user.name; // user가 null이면 평가 중단
```

---

### 🎯 **조건문 심화**

- `switch` + **case fall-through 방지**
- **삼항 연산자 중첩** (주의: 가독성 저하 위험)

---

### 🔁 **반복문 심화**

| 반복문 | 특성 |
| --- | --- |
| `for` | 인덱스 접근 |
| `for...in` | 객체 프로퍼티 열거 |
| `for...of` | iterable 순회 |
| `.forEach()` | 배열 순회, break 불가 |

---

## 🧩 **4️⃣ 함수 심화: 진짜 함수 마스터하기**

### 💡 **함수 4종 완벽 비교**

1. **함수 선언식** → 호이스팅 O
2. **함수 표현식** → 호이스팅 X
3. **화살표 함수** → `this` 바인딩 X
4. **IIFE (즉시 실행)**

---

### 🔥 **콜백, 클로저, 고차 함수**

```jsx
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}
const counter = outer();
counter(); // 1
counter(); // 2
```

- **클로저 심화** → **메모리 누수 주의**, 이벤트 리스너 예시까지 연결

---

## 🌐 **5️⃣ 객체(Object)와 프로토타입 심화**

### 📦 **객체 리터럴 → 생성자 함수 → 클래스**

```jsx
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  console.log(`Hi ${this.name}`);
};
```

- **프로토타입 체인**
    - `__proto__`, `prototype`의 차이 명확히

**🌟 심화:**

- **상속 구현:**
    - ES5: 프로토타입 기반 상속
    - ES6: `class`, `extends`, `super`

---

## 🚀 **6️⃣ 스코프, 호이스팅, this, 클로저 초고급 정리**

| 개념 | 설명 |
| --- | --- |
| **Lexical Scope** | 선언된 위치 기준 스코프 결정 |
| **호이스팅** | 선언만 끌어올림, 초기화는 X |
| **this** | 호출 방식에 따라 결정 (메소드, 생성자, call/apply/bind) |
| **클로저** | 외부 함수 변수 기억, GC에 잡히지 않음 |

> 면접 단골 질문:
> 
> 
> "this가 가리키는 대상은 어떻게 결정될까?"
> 

---

## ⚙️ **7️⃣ 비동기 프로그래밍 심화**

| 방식 | 특징 |
| --- | --- |
| 콜백 | 단순하지만 Callback Hell 문제 |
| 프로미스 | `then`, `catch`, `finally` |
| async/await | 가독성 좋고 try-catch 가능 |

```jsx
async function getData() {
  try {
    const res = await fetch('url');
    const data = await res.json();
  } catch (e) {
    console.error(e);
  }
}
```

- **실무 포인트:**`Promise.all`, `Promise.race`로 병렬 처리 최적화 🌊

---

## 🖱️ **8️⃣ DOM 조작과 이벤트 심화**

- **DOM 트리구조 → 탐색 → 수정/추가/삭제**
- **이벤트 버블링/캡처링, stopPropagation, preventDefault 완벽 이해**

**🎯 이벤트 위임 실무 예제**

```jsx
document.querySelector('#list').addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('active');
  }
});
```

---

## 📦 **9️⃣ ES6+ 심화 (진짜 실무용)**

| 문법 | 활용 |
| --- | --- |
| 템플릿 리터럴 | `${}`로 문자열 조립 |
| 디스트럭처링 | 객체/배열 분해 대입 |
| 스프레드/Rest | 배열/객체 확장, 매개변수 모음 |
| 모듈 | `import`, `export`로 코드 관리 |

---

## 🏎️ **🔟 성능 최적화, 디버깅, 보안 심화**

- **메모리 누수 원인 & 방지**
- **리플로우, 리페인트 최소화 (DOM 조작 최적화)**
- **크롬 DevTools로 디버깅 심화**
- **XSS, CSRF 방어 실무 예시**

---

## 🏆 1**1️⃣ 기술 면접 & 실무 최종 대비**

- 🌟 **클로저, 스코프, this, 이벤트 루프, 비동기, 프로토타입 체인, 메모리 최적화** 완벽 대비
- 자주 나오는 실전 **코딩 테스트 문제** 포함
- **자바스크립트 트렌드: TypeScript, React/Vue 연결 포인트 소개**

---
