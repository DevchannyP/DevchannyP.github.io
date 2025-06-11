---
layout: post
title: "CHAP 6. 스코프, 호이스팅, this, 클로저 정리"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro6.png
author: Devchanny
---


# ** 📌 Lexical Scope (렉시컬 스코프) **

> "코드가 선언된 위치(정의 위치) 기준으로 스코프(유효 범위)가 결정된다."
> 
- **"실행 위치"가 아닌, "정의된 위치"가 기준**
- **런타임이 아닌, 파싱 단계에서 결정**

### 📑 **스코프 체인**

| 레벨 | 스코프 |
| --- | --- |
| 현재 실행 컨텍스트 | 가장 가까운 함수 또는 블록 |
| 상위 스코프 | 상위 함수 |
| 전역 스코프 | 최상위(Global Object) |

---

### 🎯 **예제:**

```jsx
let globalVar = 'I am Global';

function outer() {
  let outerVar = 'I am Outer';

  function inner() {
    let innerVar = 'I am Inner';
    console.log(globalVar); // 'I am Global' - 전역 스코프
    console.log(outerVar);  // 'I am Outer'  - 상위 함수 스코프
    console.log(innerVar);  // 'I am Inner'  - 자신의 스코프
  }

  inner();
}

outer();
```

> ⚠️ 절대 착각 X!
> 
> - **스코프는 실행 위치 X, 선언 위치로 이미 고정**
> - 함수가 **어디서 실행되든 상관없이** 선언된 위치의 스코프에 접근

---

### 📢 **비유:**

> "🏠 내 집 열쇠는 내 방 서랍(정의 위치)에 있고, 이사를 가도 그 방에서만 열쇠를 찾을 수 있다!"
> 

---

### 🧠 **기술 면접 고급 질문:**

- **Q: 스코프 체인은 어떻게 형성되는가?**
    - **A: 함수가 선언될 때, 상위 렉시컬 환경에 대한 참조를 포함하여 스코프 체인이 만들어짐.**

---

## 🟠 2️⃣ Hoisting (호이스팅) 최심화

### 📌 **정의:**

> "변수, 함수 선언이 스코프 최상단으로 끌어올려진 것처럼 동작"
> 

### 📊 **호이스팅 정리 표:**

| 선언 방식 | 선언 호이스팅 | 초기화 | TDZ (Temporal Dead Zone) |
| --- | --- | --- | --- |
| `var` | O | `undefined`로 초기화 | X |
| `let` | O | X (초기화 안 됨) | O |
| `const` | O | X (초기화 안 됨) | O |
| 함수 선언식 | O | 즉시 사용 가능 | X |
| 함수 표현식 | 변수처럼 취급 (let/const/var 따라감) | 변수 스코프 따라감 | 변수 스코프 따라감 |

---

### 🚀 **심화 예제:**

```jsx
console.log(a); // undefined → var 선언, 선언은 끌어올려지고 초기화 undefined
var a = 10;

// console.log(b); // ReferenceError → TDZ
let b = 20;

// 함수 선언식
hoistedFunc(); // 정상 실행
function hoistedFunc() {
  console.log('I am hoisted function!');
}

// 함수 표현식
// nonHoistedFunc(); // TypeError (let 사용 시 ReferenceError)
let nonHoistedFunc = function() {
  console.log('Not hoisted!');
};
```

---

### 🔥 **TDZ 심화 & 버그 예시:**

```jsx
function demo() {
  console.log(temp); // ReferenceError
  let temp = 'Hello';
}
demo();
```

> ✅ TDZ 발생 이유:
> 
> - **스코프가 생성될 때 변수는 선언되지만, 초기화되기 전에 접근하면 에러!**
> - let, const 안전성 확보 (의도치 않은 사용 방지)

---

### 🧠 **면접 포인트:**

> "호이스팅은 선언만 끌어올림. 초기화는 let/const는 X. TDZ 주의."
> 

---

## 🟡 3️⃣ this 완벽 해부 최심화

### 📌 **정의:**

> "this는 함수가 호출될 때 결정되며, 호출 방식에 따라 값이 다름"
> 

---

### 📋 **정리 표:**

| 호출 방식 | this 값 |
| --- | --- |
| 일반 함수 호출 | 전역 객체 (브라우저: `window`, strict: `undefined`) |
| 메서드 호출 | 메서드 호출한 객체 |
| 생성자 호출 (new) | 새로 생성된 인스턴스 |
| call/apply/bind 사용 | 명시적으로 지정한 객체 |
| 화살표 함수 | 상위 스코프의 this (렉시컬 바인딩) |

---

### 🎯 **다양한 예제:**

```jsx
function regular() {
  console.log(this);
}
regular(); // window or undefined(strict)

const obj = {
  name: 'JS',
  method() {
    console.log(this.name); // 'JS'
  }
};
obj.method();

function Person(name) {
  this.name = name;
}
const p = new Person('Tom'); // this → p 객체

regular.call({name: 'CallObj'}); // {name: 'CallObj'}

const arrowFunc = () => console.log(this);
arrowFunc(); // 상위 스코프의 this (global)
```

---

### 🚀 **화살표 함수 심화 예제:**

```jsx
const obj = {
  name: 'Arrow',
  arrow: () => console.log(this.name), // this → 전역
  normal: function() {
    const innerArrow = () => console.log(this.name); // this → obj
    innerArrow();
  }
};

obj.arrow(); // undefined or global
obj.normal(); // 'Arrow'
```

---

### 🧠 **면접 포인트:**

> "함수 호출 방식 → this 결정
> 
> 
> 화살표 함수 → 상위 스코프 this 유지"
> 

---

## 🔵 4️⃣ Closure (클로저) 심화 확장

### 📌 **정의:**

> "함수와 선언된 렉시컬 환경을 기억하는 함수"
> 

---

### 🎯 **핵심 특징:**

- 외부 함수 실행 종료 후에도 **내부 함수가 외부 변수 참조 가능**
- **상태 유지 & 데이터 은닉**
- 주의: **메모리 누수 가능성**

---

### 📚 **기본 예제:**

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

---

### 🧩 **실무 활용: 모듈 패턴**

```jsx
const CounterModule = (function() {
  let count = 0;
  return {
    increment: function() {
      count++;
      console.log(count);
    },
    reset: function() {
      count = 0;
    }
  };
})();
CounterModule.increment(); // 1
CounterModule.increment(); // 2
CounterModule.reset();
CounterModule.increment(); // 1
```

---

### 🚨 **메모리 누수 심화 예제:**

```jsx
function createHeavy() {
  let largeData = new Array(1_000_000).fill('data');
  return function() {
    console.log(largeData[0]);
  };
}
const heavy = createHeavy();
// heavy = null; // 참조 해제하지 않으면 메모리 점유
```

---

### 🧠 **면접 핵심 포인트:**

| 질문 | 핵심 요점 |
| --- | --- |
| 스코프 체인은? | 렉시컬 환경에 따라 상위 스코프 참조 |
| 호이스팅 발생 방식은? | 선언만 끌어올림. let/const는 TDZ 발생 |
| this 결정 기준은? | 호출 방식 따라. 화살표 함수 예외 (상위 this) |
| 클로저란? | 외부 환경 기억, 상태 유지 가능, 메모리 누수 주의 |

---

## 📑 **깔끔 요약**

| 개념 | 설명 | 주의 |
| --- | --- | --- |
| Lexical Scope | 선언된 위치 기준 스코프 결정 | 실행 위치와 무관 |
| Hoisting | 선언 끌어올림 | let/const TDZ, 초기화 X |
| this | 호출 방식에 따라 결정 | 화살표 함수는 상위 스코프의 this |
| Closure | 외부 스코프 기억 & 상태 유지 가능 | 메모리 누수 가능성, 참조 관리 주의 |

### 🚨  **종합 정리 예**

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 핵심 개념 심화 예제</title>
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
    <h2>🟢 JavaScript 핵심 개념 심화 실습</h2>
    <div class="area big" id="outputArea"></div>
    
    <script>
        function runExamples() {
            const output = document.getElementById("outputArea");
            function log(text) { output.innerHTML += text + "\n"; }
            
            log("✅ Lexical Scope (렉시컬 스코프)");
            let globalVar = '🌍 I am Global';
            function outer() {
                let outerVar = '🏠 I am Outer';
                function inner() {
                    let innerVar = '🔑 I am Inner';
                    log(globalVar); // 전역 스코프 접근 가능
                    log(outerVar); // 바깥 함수 스코프 접근 가능
                    log(innerVar); // 자기 자신의 스코프 접근 가능
                }
                inner();
            }
            outer();
            
            log("\n✅ Hoisting (호이스팅)");
            log(a); // undefined (var는 호이스팅되지만 값은 할당되지 않음)
            var a = 10;
            
            try { log(b); } catch (e) { log("❌ TDZ 오류: " + e); }
            let b = 20; // TDZ(Temporal Dead Zone) 때문에 초기화 전에 접근 불가
            
            hoistedFunc(); // 정상 실행됨 (함수 선언문은 호이스팅됨)
            function hoistedFunc() { log("🎈 I am hoisted function!"); }
            
            try { nonHoistedFunc(); } catch (e) { log("❌ 익명 함수 호이스팅 오류: " + e); }
            let nonHoistedFunc = function() { log("Not hoisted!"); }; // 함수 표현식은 호이스팅되지 않음
            
            log("\n✅ this 바인딩 (문맥에 따라 변화)");
            function regular() { log("🌎 일반 함수 this:", this); }
            regular();
            
            const obj = {
                name: 'JS',
                method() { log("🔗 객체 내부 this: ", this.name); }
            };
            obj.method();
            
            log("\n✅ Closure (클로저)");
            function counter() {
                let count = 0;
                return function() { count++; log("🔢 카운터 값: ", count); };
            }
            const countFunc = counter();
            countFunc();
            countFunc();
            
            log("\n✅ Object.entries & 객체 조작");
            const product = { name: "🍋 레몬", price: 3000 };
            Object.entries(product).forEach(([key, value]) => log(`📌 ${key}: ${value}`));
            
            log("\n✅ Call, Apply, Bind (this 조작)");
            function introduce(age, country) {
                log(`👤 ${this.name}, 나이: ${age}, 국가: ${country}`);
            }
            const user = { name: "홍길동" };
            introduce.call(user, 30, "한국");
            introduce.apply(user, [25, "일본"]);
            const boundFunc = introduce.bind(user, 40, "미국");
            boundFunc();
            
            log("\n✅ IIFE (즉시 실행 함수)");
            (function() { log("🚀 즉시 실행 함수 실행됨!"); })();
            
            log("\n✅ Prototype & 상속");
            function Person(name) { this.name = name; }
            Person.prototype.greet = function() { log("👋 Hello, " + this.name); };
            
            const person1 = new Person("Alice");
            person1.greet();
            
            log("\n✅ Promise & async/await (비동기 처리)");
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            async function asyncExample() {
                log("⏳ 1초 후 실행...");
                await delay(1000);
                log("✅ 비동기 실행 완료!");
            }
            asyncExample();
        }
        
        runExamples();
    </script>
</body>
</html>

```
