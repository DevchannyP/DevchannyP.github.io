---
layout: post
title: "CHAP 01.🚀 자바스크립트란?"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro1.png
author: Devchanny
---


# ** 📌 자바스크립트란 무엇인가?**

| 항목 | 내용 | 비유 |
| --- | --- | --- |
| 🗓️ 탄생 | 1995년, 넷스케이프, 10일 만에 개발 | "급조된 천재 아기" |
| 🌍 사용처 | 웹, 서버(Node.js), 데스크탑, 모바일, IoT | "웹의 언어, 전천후 엔진" |
| 🧬 언어 타입 | 인터프리터, 동적 타이핑, 싱글 스레드 | "유연한 통역사, 혼자 일하는 셰프" |
| 🔥 엔진 | V8(Chrome/Node.js), SpiderMonkey(Firefox), JavaScriptCore(Safari) | "브라우저의 심장, V8은 페라리 엔진" |
| 🧩 특징 | 이벤트 기반, 비동기, 객체 지향(프로토타입), 동적, 약한 타입 | "기민한 카멜레온" |

---

## 📌 **2️⃣ 왜 자바스크립트인가?**

### 🌟 **핵심 이유:**

1. **브라우저 내 기본 언어 (프론트엔드 필수)**
2. **Node.js로 서버 개발까지 확장**
3. **풀스택, 앱, IoT, AI까지 활용 범위 넓음**

---

## 🔎 **3️⃣ 주요 특징 깊게 파헤치기**

---

### 🧬 **A. 인터프리터 & JIT 컴파일**

| 용어 | 설명 |
| --- | --- |
| 인터프리터 | 코드 한 줄씩 실시간 해석, 빠른 실행 가능 |
| JIT 컴파일 | V8 엔진이 자주 쓰이는 코드를 **미리 기계어로 변환하여 속도 향상** |

**📊 구조 비유:**

> 👨‍🍳 "주방장"이 인터프리터 → 실시간 요리
> 
> 
> 🤖 JIT은 "레시피 암기" → 반복되는 메뉴는 미리 준비해 속도 업
> 

**심화:**

- V8은 **Inline Caching, Hidden Class**로 런타임 최적화 수행.

📌 **면접 포인트:**

> "자바스크립트는 인터프리터 언어인가 컴파일러 언어인가?" → 둘 다 (하이브리드)
> 

---

### 🔢 **B. 동적 타이핑 & 약한 타입**

| 용어 | 설명 |
| --- | --- |
| 동적 타이핑 | 변수 선언 시 타입 지정 X, 실행 중 타입 결정 |
| 약한 타입 | 다른 타입 간 자동 변환 허용 (암묵적 형변환) |

**예시:**

```jsx
let a = 1;
a = "문자열"; // OK
console.log(1 + '2'); // '12' (문자열 변환)
```

**트랩 포인트:**

```jsx
[] + {} // "[object Object]"
{} + [] // 0
```

**→ 실무에서 주의해야 함!**

📌 **면접 대비:**

> "동적 타이핑이 가져오는 장단점은?"
> 
> 
> **단점:** Type 안정성 ↓ → **TypeScript**로 보완
> 

## 📄 한눈에 보는 자바 스크립트

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width", initial-scale="1.0">
    <title>JavaScript 개요 심화 완성판</title>
</head>
<body>

    <!-- 
        🌐 HTML: 웹 페이지의 "구조" (뼈대)
        🎨 CSS: 웹 페이지의 "스타일" (피부, 옷)
        ⚙️ JavaScript: 웹 페이지의 "동작, 기능" (근육, 행동)
        
        📌 핵심:
        - HTML & CSS: 정적(Static) → 변하지 않음
        - JavaScript: 동적(Dynamic) → 실시간 변화 가능
    -->

    <h1>✨ 자바스크립트(JavaScript) 개요</h1>

    <p>
        🚀 HTML 페이지의 **동작, 기능을 제어**<br>
        🌍 브라우저에서 실행되는 **대표적인 클라이언트 사이드 언어**<br>
        📖 **인터프리터 방식** (한 줄씩 해석해 즉시 실행)<br>
        🔥 최근에는 **Node.js**로 서버 사이드에서도 사용 가능<br>
    </p>

    <!-- 
        📌 자바스크립트 특징 (심화 정리)
        1️⃣ 인터프리터 방식:
            - 별도 컴파일 없이 한 줄씩 해석, 바로 실행
            - 문법 오류는 실행 시점에서만 확인 가능

        2️⃣ 자바와의 차이:
            - Java: 정적 타입 + 컴파일 필요 → JVM에서 실행
            - JavaScript: 동적 타입 + 인터프리터 방식 → 브라우저에서 실행
        
        3️⃣ 동적 타입 (Dynamic Typing):
            - 변수 선언 시 타입 명시 X → 실행 중 타입 결정
            - 유연하지만 타입 오류 위험 ↑

        4️⃣ 싱글 스레드 + 비동기 처리:
            - 한 번에 하나의 작업 (싱글 스레드)
            - 비동기 처리는 Event Loop, Callback Queue 활용
        
        5️⃣ 실행 환경:
            - 브라우저(클라이언트) + Node.js(서버) + 모바일, IoT 등 확장 가능
        
        6️⃣ 스코프(Scope):
            - var: 함수 스코프 (지양)
            - let, const: 블록 스코프 (권장)

        7️⃣ 객체 지향 + 함수형 프로그래밍 지원
    -->

    <script>
        // 📢 콘솔에 "Hello World" 출력
        console.log("✅ Hello World");

        // 💡 변수 선언 (동적 타입 특징)
        let variable = 10; // 숫자형
        console.log("📌 변수 (숫자):", variable);

        variable = "문자열"; // 재할당 → 문자열형으로 변경
        console.log("📌 변수 (문자열):", variable);

        // 🎯 함수 선언식 예시
        function greet(name) {
            console.log(`👋 안녕하세요, ${name}님!`);
        }
        greet("홍길동");

        // 🚦 조건문 예시
        let score = 75;
        if (score >= 90) {
            console.log("🏅 A학점");
        } else if (score >= 80) {
            console.log("👍 B학점");
        } else {
            console.log("📉 C학점 이하");
        }

        // 🔁 반복문 (for, while, forEach)
        console.log("🔄 for문:");
        for (let i = 1; i <= 3; i++) {
            console.log(`반복 ${i}`);
        }

        console.log("🔄 while문:");
        let i = 1;
        while (i <= 3) {
            console.log(`반복 ${i}`);
            i++;
        }

        console.log("🔄 forEach문:");
        const animals = ["🐶", "🐱", "🦊"];
        animals.forEach((animal, index) => {
            console.log(`${index + 1}번째 동물: ${animal}`);
        });

        // 🗃️ 객체 사용 (프로퍼티 + 메서드)
        const person = {
            name: "철수",
            age: 25,
            greet: function() {
                console.log(`🙋‍♂️ ${this.name}의 나이는 ${this.age}살`);
            }
        };
        person.greet();

        // ⚙️ 함수 표현식 & 화살표 함수
        const multiply = (a, b) => a * b;
        console.log("✖️ 3 x 4 =", multiply(3, 4));

        // 🌟 비동기 처리 (setTimeout + 이벤트 루프 개념)
        console.log("⏱️ 2초 후 메시지 출력 예정...");
        setTimeout(() => {
            console.log("✅ 2초 경과: 비동기 처리 완료 (Event Loop 작동)");
        }, 2000);

        // 🧠 클로저 기본 예시 (심화)
        function outer() {
            let outerVar = "외부 변수";
            function inner() {
                console.log(`🔒 클로저: ${outerVar}`);
            }
            return inner;
        }
        const closureFunc = outer();
        closureFunc(); // 외부 변수 접근
    </script>

    <h3>📌 자바스크립트 특징 (정리)</h3>
    <ul>
        <li>❌ 접근제한자(public/private 등) 없음 → ES6 class 일부 제공</li>
        <li>💡 동적 타입 → 변수 타입 실행 중 결정 (장점: 유연, 단점: 타입 불안정)</li>
        <li>🔒 보안상 JS 소스가 노출 (F12 개발자도구로 확인 가능)</li>
        <li>⚠️ 문법 오류 실행 시점에서만 발견 (컴파일 X)</li>
        <li>📄 객체 지향 + 함수형 혼합형 언어</li>
        <li>📱 Node.js, React Native로 서버, 모바일, IoT 확장</li>
        <li>📦 방대한 라이브러리/프레임워크 (React, Vue, Express 등)</li>
    </ul>

    <h3>📚 자바스크립트 사용 방법</h3>
    <ul>
        <li>🔸 <strong>인라인(Inline)</strong>: HTML 태그에 직접 삽입 (비추천 ❌ 유지보수 어려움)</li>
        <li>🔸 <strong>내부(Internal)</strong>: HTML 내부 &lt;script&gt; 사용 (소규모에 적합)</li>
        <li>🔸 <strong>외부(External)</strong>: 별도 .js 파일 작성 후 불러오기 (✅ 강력 추천)</li>
    </ul>

    <h4>🎯 인라인 방식 예시</h4>

    <!-- 📢 버튼 클릭 시 알림창 출력 (인라인 방식) -->
    <button onclick="window.alert('👋 안녕하세요!')">알림창 출력</button>

    <!-- 📢 콘솔 출력 (인라인) -->
    <button onclick="console.log('🔔 콘솔 출력')">콘솔 출력</button>

    <!-- 📢 링크에서 자바스크립트 실행 -->
    <a href="javascript:alert('반갑습니다')">링크에서 알림창 출력</a>
    <a href="javascript:btnClick()">링크에서 콘솔 출력</a>

    <h4>📝 내부 스크립트 예시</h4>
    <button id="btn">내부 스크립트 알림 출력</button>
    <button onclick="btnClick()">내부 스크립트 콘솔 출력</button>

    <script>
        // 🎯 내부 방식: 버튼에 이벤트 리스너 연결
        let btn = document.getElementById("btn");
        btn.onclick = function() {
            window.alert("📢 내부 스크립트 알림창 출력됨");
        };

        // 콘솔 출력 함수
        function btnClick() {
            console.log("✅ 콘솔 출력 버튼 클릭됨");
        }
    </script>

    <H4>외부방식</H4>
    <script src="sample.js" rel="javascript"></script>
    <button onclick="text()">외부함수 호출</button>

    <!-- 📄 외부 스크립트 예시 -->
    <!-- <script src="main.js"></script> -->

    <!-- 
        🌟 실무/면접 심화 포인트:
        1. 싱글 스레드 → 비동기 처리(Event Loop, Callback Queue, Web API 구조 이해)
        2. 스코프(함수/블록) + 클로저(Closure) → 면접에서 자주 질문
        3. 프로토타입 기반 → 상속, 메모리 효율 (prototype chain)
        4. var 대신 let/const 사용 권장 (ES6 이후)
        5. Node.js → 백엔드, 모바일, IoT 확장 가능
        6. 함수형 패턴, 고차 함수, async/await 등 최신 문법도 익히기
    -->
</body>
</html>
```

---

### 🏎️ **C. 싱글 스레드 + 이벤트 루프 구조 완전 해부**

---

| 요소 | 역할 | 비유 |
| --- | --- | --- |
| Call Stack | 함수 실행 순서 스택 | 접수 창구 |
| Web APIs | 비동기 작업 처리 공간 (setTimeout, fetch 등) | 주방 외 알바 |
| Callback Queue | 작업 완료된 콜백 대기열 | 대기 손님 |
| Event Loop | Call Stack 비면 대기열 가져옴 | 웨이터 |

📊 **시각화:**

```
📥 Call Stack → 🌐 Web APIs → 📦 Callback Queue → 🔄 Event Loop → 📥 Call Stack
```

---

### 💡 **심화: Microtask vs Macrotask**

| 구분 | 예시 |
| --- | --- |
| **Microtask** | `Promise.then()`, `MutationObserver` |
| **Macrotask** | `setTimeout`, `setInterval`, UI 이벤트 |

**우선순위:**

**Microtask가 항상 먼저 실행됨!**

---

### 🧩 **D. 객체 지향 & 프로토타입 완전 분석**

---

| 자바스크립트 | 클래스 기반 언어 |
| --- | --- |
| 객체 → 프로토타입 체인 | 클래스 → 상속 |
| 동적 확장 가능 | 정적 구조 |

```jsx
function Animal(name) {
  this.name = name;
}
Animal.prototype.sound = function() {
  console.log('sound');
};
const dog = new Animal('Dog');
dog.sound();
```

📌 **Prototype Chain 시각화:**

```
dog → Animal.prototype → Object.prototype → null
```

📌 **면접 포인트:**

> "프로토타입 상속과 클래스 상속의 차이점은?"
> 

---

## 🕹️ **E. 엔진 심화 (V8 기준)**

---

### 🔥 **V8 엔진의 강점**

1. **JIT 컴파일 → 빠름**
2. **Garbage Collector → 메모리 관리 자동**
3. **Hidden Class → 객체 최적화**
4. **Inline Cache → 동일 연산 가속**

📌 **실무:**

> Node.js는 V8 기반 → 자바스크립트 서버에서 동작
> 

---

## 🎓 **기술 면접 대비 & 실무 포인트**

| 질문 | 핵심 |
| --- | --- |
| 싱글 스레드인데 비동기 처리 방법은? | 이벤트 루프, Web API, 콜백 큐 구조 |
| 프로토타입 체인이란? | 객체가 부모 역할 객체 참조 |
| TypeScript가 왜 필요한가? | 동적 타이핑으로 인한 타입 불안정성 해결 |
| V8 엔진 특징? | JIT 컴파일, 메모리 최적화 |
| Java와 JavaScript 차이? | 구조/목적/타입 전부 다름, 이름만 비슷 |

# 1️⃣ **싱글 스레드인데 비동기 처리 방법은?**

### 📌 **핵심**

- 자바스크립트는 **싱글 스레드** → 한 번에 한 작업만 실행 가능
- 그런데 **비동기 작업 (setTimeout, Ajax, Event)** 도 가능함!

### 🎯 **어떻게 가능?**

👉 **이벤트 루프(Event Loop), Web API, 콜백 큐 구조 덕분!**

### 🧩 **구조 흐름**

1. **싱글 스레드**: 메인 스레드에서 코드 한 줄씩 실행.
2. **Web API 영역 (브라우저 제공)**:
    - 비동기 작업 (setTimeout, DOM 이벤트, fetch 등) 처리를 맡음.
3. **콜백 큐(Callback Queue)**:
    - 비동기 작업 끝난 후, 콜백 함수가 큐에 들어감.
4. **이벤트 루프(Event Loop)**:
    - **메인 스택이 비면**, 콜백 큐에 있는 작업을 가져와 실행!

---

### 💡 **정리**

| 구성 요소 | 역할 |
| --- | --- |
| 싱글 스레드 | 한 번에 하나씩 코드 실행 |
| Web API | 비동기 작업 처리 (setTimeout 등) |
| 콜백 큐 | 완료된 비동기 작업 대기 장소 |
| 이벤트 루프 | 메인 스택이 비면, 콜백 큐에서 작업 가져옴 |

# 2️⃣ **프로토타입 체인이란?**

### 📌 **핵심**

- **객체가 부모 역할 객체(프로토타입)를 참조하는 구조**!

### 🎯 **어떻게 동작?**

1. **객체가 어떤 속성을 찾을 때:**
    - 먼저 **자기 자신에게서 찾음**.
    - 없으면 **자기 부모인 프로토타입 객체에서 찾음**.
    - 계속 **위로 따라감 → 프로토타입 체인!**
2. **끝까지 없으면 `undefined`.**

---

### 📝 **비유**

```jsx
let parent = { skill: "coding" };
let child = Object.create(parent);
console.log(child.skill); // "coding" (부모에서 상속받음)
```

**→ 상속처럼 작동, 객체 간 연결 고리!**

# 3️⃣ **TypeScript가 왜 필요한가?**

### 📌 **핵심**

- **동적 타이핑 때문에 타입이 불안정 → 버그 발생 위험 높음.**
- **TypeScript → 정적 타입 + 타입 검사 제공 → 안정성 확보!**

---

### 🎯 **장점**

| 장점 | 설명 |
| --- | --- |
| 정적 타입 | 변수, 함수의 타입 명확히 명시 가능 |
| 컴파일 단계에서 체크 | 타입 에러 미리 발견 → 런타임 오류 줄임 |
| 코드 가독성 ↑ | 협업 시 타입 명확 → 유지보수 쉬움 |
| 자동완성 ↑ | IDE에서 타입 정보 기반으로 추천 가능 |

# 4️⃣ **V8 엔진 특징?**

### 📌 **핵심**

- **V8 = 크롬, Node.js에 사용되는 자바스크립트 엔진**
- 특징:
    1. **JIT 컴파일(Just-In-Time) → 빠른 실행 속도**
    2. **메모리 최적화 → 가비지 컬렉션 잘함**

---

### 🎯 **상세**

| 특징 | 설명 |
| --- | --- |
| JIT 컴파일 | 자바스크립트 → 기계어로 바로 변환 → 빠름 |
| 가비지 컬렉션 | 안 쓰는 메모리 자동 정리 → 메모리 누수 방지 |
| 최적화된 실행 | 자주 쓰는 코드 → 더 빠르게 재컴파일 |

---

# 5️⃣ **Java와 JavaScript 차이?**

### 📌 **핵심**

> 이름만 비슷하고 완전히 다른 언어!
> 

---

### 🎯 **주요 차이점**

| 구분 | Java | JavaScript |
| --- | --- | --- |
| 구조 | 컴파일 언어, 강타입, 클래스 기반 | 인터프리터 언어, 동적 타입, 프로토타입 기반 |
| 실행 환경 | JVM (Java Virtual Machine) | 브라우저, Node.js |
| 목적 | 서버, 엔터프라이즈, 앱 개발용 | 웹 개발 (주로 클라이언트), 풀스택 가능 |
| 타입 | **정적 타입 (타입 명시 필수)** | **동적 타입 (타입 자유로움)** |
