---
layout: post
title: "CHAP 4.🚀 함수 심화"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro4.png
author: Devchanny
---


# ** 📌1️⃣ 함수 4종 완벽 비교**

| 함수 유형 | 선언 방식 | 호이스팅 | `this` 바인딩 | 특징 & 주의 |
| --- | --- | --- | --- | --- |
| **함수 선언식** | `function func() {}` | **O (위로 끌어올림)** | 호출 컨텍스트 기준 | 기본 함수 |
| **함수 표현식** | `const func = function() {}` | **X** | 실행 시 결정 | 변수 기준 |
| **화살표 함수** | `const func = () => {}` | **X** | **상위 스코프의 `this`** | 가볍고, `arguments` 없음 |
| **IIFE** | `(function(){})()` | **X** | 즉시 실행 | 스코프 보호 (전역 오염 방지) |

---

### 📚 **예제 비교**

```jsx
// 함수 선언식
hoisted();
function hoisted() { console.log('선언식 호출됨!'); }

// 함수 표현식
// notHoisted(); // Error
const notHoisted = function() { console.log('표현식 호출'); };

// 화살표 함수 (this → 상위 스코프)
const arrow = () => console.log(this);

// IIFE
(function() { console.log('즉시 실행!'); })();

```

---

## 🧠 **2️⃣ `this` 바인딩 심화 비교**

| 함수 종류 | `this` 결정 방식 |
| --- | --- |
| **일반 함수** | **함수 호출 컨텍스트** (어떻게 호출했는가) |
| **화살표 함수** | **상위 스코프의 `this` 사용** (렉시컬 바인딩) |

---

### 📌 **예제**

```jsx
const obj = {
  name: 'JS',
  regularFunc: function() {
    console.log(this.name); // 'JS'
  },
  arrowFunc: () => {
    console.log(this.name); // undefined (상위 스코프)
  }
};

obj.regularFunc();
obj.arrowFunc();
```

---

---

## 🔥 **3️⃣ 클로저 (Closure) 완벽 해부**

---

### 🧩 **정의:**

> "함수와 그 함수가 선언된 렉시컬 환경(스코프)을 기억하는 함수"
> 

---

### 📌 **핵심 특징:**

- **외부 함수의 변수를 내부 함수가 기억**
- **외부 함수가 종료되어도 내부 함수가 변수 접근 가능**

---

### 📚 **기본 예제**

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

### ⚠️ **메모리 누수 주의 포인트**

```jsx
function createHeavy() {
  let largeData = new Array(1000000).fill('data');
  return function() {
    console.log(largeData[0]);
  };
}

const heavy = createHeavy();
// heavy 사용 후 참조 해제하지 않으면 largeData 계속 메모리 점유
```

✅ **실무 팁:**

> 이벤트 리스너, 타이머 내 클로저 → 반드시 해제 필요
> 

---

## 🚀 **4️⃣ 콜백 함수 (Callback)**

---

### 📌 **정의:**

> 다른 함수에 인수로 전달되어 실행되는 함수
> 

---

### 📚 **예제**

```jsx
function greet(callback) {
  console.log('Hello');
  callback();
}

greet(function() { console.log('Callback 실행!'); });
```

📢 **비유:**

> "일 끝나면 알려줘!" → 콜백 등록 후 호출
> 

---

## 🚀 **5️⃣ 고차 함수 (Higher-Order Function)**

---

### 📌 **정의:**

> 함수를 인자로 받거나, 함수를 반환하는 함수
> 

---

### 📚 **대표 예시**

```jsx
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
```

✅ **실무에서 대표 고차 함수:**

- `map()`, `filter()`, `reduce()`, `sort()` 등

---

## 🧠 **6️⃣ 실무 & 기술 면접 포인트**

| 질문 | 핵심 포인트 |
| --- | --- |
| 함수 선언식 vs 표현식 차이? | 호이스팅 여부, 선언 위치 |
| 화살표 함수의 `this`는? | 상위 스코프의 `this` 바인딩 |
| 클로저란? | 외부 스코프 기억, 상태 유지 |
| 클로저 메모리 누수 언제? | 이벤트 리스너, 참조 남을 때 |
| 고차 함수 예시? | map, filter, reduce, 커스텀 고차 |
| IIFE 목적? | 전역 스코프 오염 방지, 모듈화 |

---

---

## 📑 **7️⃣ 노션용 정리 표**

---

### 📋 **함수 유형 비교**

| 함수 유형 | 선언 방식 | 호이스팅 | `this` 바인딩 | 특징 |
| --- | --- | --- | --- | --- |
| 함수 선언식 | `function func(){}` | O | 호출 컨텍스트 | 기본 함수 |
| 함수 표현식 | `const func = function(){}` | X | 실행 시 결정 | 변수 기준 |
| 화살표 함수 | `const func = () => {}` | X | 상위 스코프 | `arguments` 없음 |
| IIFE | `(function(){})()` | X | 즉시 실행 | 스코프 보호 |

---

### 📋 **핵심 개념 요약**

| 개념 | 정의 | 실무 활용 |
| --- | --- | --- |
| 클로저 | 외부 스코프 기억 | 상태 유지, 모듈 패턴 |
| 콜백 | 인수로 전달되는 함수 | 비동기 처리 |
| 고차 함수 | 함수 인수/반환 | map, filter 등 |
| this | 호출 컨텍스트 | 객체 메서드, 이벤트 |

---

## 🚀 **8️⃣ 추가 심화 확장 가능**

1. **call, apply, bind로 this 바인딩 강제 제어**
2. **클로저 기반 모듈 패턴 실무 예제**
3. **고차 함수 심화 (커스텀 filter, reduce 직접 구현)**
4. **메모리 누수 방지 Best Practice**

### 📚 함수 1

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JavaScript Function Masterclass 🚀</title>
  <style>
    div {
      border: 1px solid black;
      padding: 10px;
      margin: 10px 0;
    }
    button {
      margin: 5px;
    }
  </style>
</head>

<body>

  <h1>✨ 자바스크립트 함수 완벽 가이드 ✨</h1>

  <!-- ==================== 1. 선언적 함수 ==================== -->
  <h2>📌 1. 선언적 함수 (Declarative Function)</h2>
  <p>✅ 가장 기본적인 함수 선언 방법 (호이스팅 가능)</p>
  <button onclick="basicFunction()">선언적 함수 실행</button>
  <div id="area1"></div>

  <script>
    // 🟢 선언적 함수 (호출 가능: 호이스팅 됨)
    function basicFunction() {
      document.getElementById("area1").innerHTML += "✅ 선언적 함수 호출됨!<br>";
    }
  </script>

  <!-- ==================== 2. 함수 표현식 (익명 함수 포함) ==================== -->
  <h2>📌 2. 함수 표현식 & 익명 함수 (Function Expression)</h2>
  <p>함수를 변수에 할당! 익명 함수는 이름 없이 대입됨</p>
  <button onclick="anonFunc()">익명 함수 실행</button>
  <div id="area2"></div>

  <script>
    // 🟢 함수 표현식 (호이스팅 안됨)
    const anonFunc = function () {
      document.getElementById("area2").innerHTML += "✅ 익명 함수 실행됨 (변수에 대입)<br>";
    };
  </script>

  <!-- ==================== 3. 화살표 함수 ==================== -->
  <h2>📌 3. 화살표 함수 (Arrow Function) 🔥</h2>
  <p>더 짧고 간결하며, this 바인딩 없음!</p>
  <button onclick="arrowFunc()">화살표 함수 실행</button>
  <div id="area3"></div>

  <script>
    // 🟢 화살표 함수
    const arrowFunc = () => {
      document.getElementById("area3").innerHTML += "✅ 화살표 함수 실행됨!<br>";
    };
  </script>

  <!-- ==================== 4. 매개변수 & 기본값 ==================== -->
  <h2>📌 4. 매개변수 & 기본값 설정</h2>
  <button onclick="paramFunc('Hi 🙋‍♂️')">매개변수 전달</button>
  <button onclick="paramFunc()">기본값 확인</button>
  <div id="area4"></div>

  <script>
    // 🟢 매개변수 기본값
    function paramFunc(msg = "👋 기본 메시지!") {
      document.getElementById("area4").innerHTML += `➡️ ${msg}<br>`;
    }
  </script>

  <!-- ==================== 5. 나머지 매개변수 & arguments ==================== -->
  <h2>📌 5. 나머지 매개변수 (...rest) & arguments</h2>
  <button onclick="restExample(1, 2, 3, 4, 5)">나머지 매개변수</button>
  <button onclick="argExample('A', 'B', 'C')">arguments 사용</button>
  <div id="area5"></div>

  <script>
    // 🟢 나머지 매개변수
    function restExample(...nums) {
      document.getElementById("area5").innerHTML += `받은 값들: ${nums.join(", ")}<br>`;
    }

    // 🟢 arguments (옛날 방식)
    function argExample() {
      let result = "";
      for (let i = 0; i < arguments.length; i++) {
        result += arguments[i] + " ";
      }
      document.getElementById("area5").innerHTML += `arguments로 받은 값: ${result}<br>`;
    }
  </script>

  <!-- ==================== 6. 반환값 ==================== -->
  <h2>📌 6. 반환값 (return)</h2>
  <button onclick="showSum()">반환값 확인</button>
  <div id="area6"></div>

  <script>
    function sum(a, b) {
      return a + b; // 💡 단순 더하기
    }
    function showSum() {
      const result = sum(7, 8);
      document.getElementById("area6").innerHTML += `7 + 8 = ${result}<br>`;
    }
  </script>

  <!-- ==================== 7. 함수가 함수 반환 ==================== -->
  <h2>📌 7. 함수가 또 다른 함수 반환 (고차 함수 개념)</h2>
  <button onclick="returnFunc()">함수 반환 실행</button>
  <div id="area7"></div>

  <script>
    function outer() {
      return function inner() {
        document.getElementById("area7").innerHTML += "✅ 내부 함수 실행됨!<br>";
      };
    }
    function returnFunc() {
      const inner = outer();
      inner();
    }
  </script>

  <!-- ==================== 8. 콜백 함수 ==================== -->
  <h2>📌 8. 콜백 함수 (Callback Function)</h2>
  <button onclick="useCallback()">콜백 함수 실행</button>
  <div id="area8"></div>

  <script>
    function greet(name, callback) {
      const msg = `👋 Hello, ${name}!`;
      callback(msg); // 콜백 호출
    }
    function display(msg) {
      document.getElementById("area8").innerHTML += `${msg}<br>`;
    }
    function useCallback() {
      greet("Bob", display);
    }
  </script>

  <!-- ==================== 9. 즉시 실행 함수 (IIFE) ==================== -->
  <h2>📌 9. 즉시 실행 함수 (IIFE)</h2>
  <div id="area9"></div>

  <script>
    (function () {
      document.getElementById("area9").innerHTML += "✅ 즉시 실행 함수 실행됨!<br>";
    })();
  </script>

  <!-- ==================== 10. 클로저 (Closure) 추가 ==================== -->
  <h2>📌 10. 클로저 (Closure) - 심화</h2>
  <button onclick="closureExample()">클로저 실행</button>
  <div id="area10"></div>

  <script>
    function makeCounter() {
      let count = 0; // 🚩 외부 변수
      return function () {
        count++;
        document.getElementById("area10").innerHTML += `현재 카운트: ${count}<br>`;
      };
    }
    const closureExample = makeCounter(); // 반환된 함수가 count 기억
  </script>

  <!-- ==================== 11. 재귀 함수 (Recursion) 추가 ==================== -->
  <h2>📌 11. 재귀 함수 (Recursion) - 심화</h2>
  <button onclick="factorialResult()">팩토리얼 계산</button>
  <div id="area11"></div>

  <script>
    function factorial(n) {
      if (n === 1) return 1;
      return n * factorial(n - 1); // 자기 자신 호출
    }
    function factorialResult() {
      const result = factorial(5);
      document.getElementById("area11").innerHTML += `5! = ${result}<br>`;
    }
  </script>

      <!-- 🎯 [심화] this 컨텍스트 + 함수 표현식 vs 화살표 함수 비교 -->
      <h3>🧭 this 컨텍스트 이해하기: 함수 표현식 vs 화살표 함수</h3>
      <button onclick="testThis()">this 테스트 실행</button>
      <div id="quiz4"></div>
  
      <script>
          const obj = {
              name: "MyObject",
              // 함수 표현식: this는 obj를 가리킴
              showNameFunc: function () {
                  return `함수 표현식: ${this.name}`;
              },
              // 화살표 함수: this는 window (전역)
              showNameArrow: () => {
                  return `화살표 함수: ${this.name}`; // 전역에 name 없음(undefined)
              }
          };
  
          function testThis() {
              let text = obj.showNameFunc() + "<br>" + obj.showNameArrow();
              document.getElementById("quiz4").innerHTML = text;
          }
      </script>

</body>
</html>

```

### 📚 배열

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>배열 메소드 완벽 정리 🍀</title>
  <style>
    .area {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0;
      background-color: #f9f9f9;
    }
  </style>
</head>

<body>
  <h2>📚 자바스크립트 배열 메소드 완벽 정리</h2>

  <!-- ✅ concat -->
  <h3>1️⃣ 배열.concat()</h3>
  <div id="area1" class="area"></div>
  <button onclick="concatTest()">concat 확인하기</button>

  <!-- ✅ reverse -->
  <h3>2️⃣ 배열.reverse()</h3>
  <div id="area2" class="area"></div>
  <button onclick="reverseTest()">reverse 확인하기</button>

  <!-- ✅ sort -->
  <h3>3️⃣ 배열.sort()</h3>
  <div id="area3" class="area"></div>
  <button onclick="sortTest()">sort 확인하기</button>

  <!-- ✅ push & pop -->
  <h3>4️⃣ 배열.push() & pop()</h3>
  <div id="area4" class="area"></div>
  <button onclick="pushPopTest()">push/pop 확인하기</button>

  <!-- ✅ unshift & shift -->
  <h3>5️⃣ 배열.unshift() & shift()</h3>
  <div id="area5" class="area"></div>
  <button onclick="shiftUnshiftTest()">unshift/shift 확인하기</button>

  <script>
    // ============================
    // 1️⃣ concat() 기초 ~ 심화
    // ============================
    function concatTest() {
      const area1 = document.querySelector("#area1");
      const arr1 = ["🍎사과", "🍌바나나"];
      const arr2 = ["🧀치즈", "🥓베이컨", "🏍️오토바이"];

      area1.innerHTML = "✅ arr1 : " + JSON.stringify(arr1) + "<br>";
      area1.innerHTML += "✅ arr2 : " + JSON.stringify(arr2) + "<br><br>";

      const combined = arr1.concat(arr2);
      area1.innerHTML += "👉 arr1.concat(arr2) : " + JSON.stringify(combined) + "<br>";

      area1.innerHTML += "🔎 arr1 (원본 유지) : " + JSON.stringify(arr1) + "<br><br>";

      const reverseCombined = arr2.concat(arr1);
      area1.innerHTML += "👉 arr2.concat(arr1) : " + JSON.stringify(reverseCombined) + "<br><br>";

      const multiCombined = arr2.concat(arr1, ["🎮게임기", "📱스마트폰"]);
      area1.innerHTML += "👉 arr2.concat(arr1, 추가배열) : " + JSON.stringify(multiCombined) + "<br><br>";

      const nestedArr = [[1, 2], [3, 4]];
      const flat = arr1.concat(nestedArr);
      area1.innerHTML += "⚠️ 중첩 배열 : " + JSON.stringify(flat) + "<br>";
      area1.innerHTML += "❗ 중첩된 배열은 평탄화 안됨 (flat 아님!)<br>";
    }

    // ============================
    // 2️⃣ reverse() 기초 ~ 심화
    // ============================
    function reverseTest() {
      const area2 = document.querySelector("#area2");
      const arr = [1, 2, 3, 4, 5];
      area2.innerHTML = "✅ 원본 arr : " + JSON.stringify(arr) + "<br>";

      const reversed = arr.reverse();
      area2.innerHTML += "👉 reverse() 후 arr : " + JSON.stringify(reversed) + "<br><br>";

      area2.innerHTML += "⚠️ 다시 arr 출력 : " + JSON.stringify(arr) + "<br>";

      const str = "Hello World!";
      const reversedStr = str.split("").reverse().join("");
      area2.innerHTML += "🎯 문자열 뒤집기 : " + reversedStr + "<br>";
    }

    // ============================
    // 3️⃣ sort() 기초 ~ 심화
    // ============================
    function sortTest() {
      const area3 = document.querySelector("#area3");
      const names = ["문근영", "김삿갓", "이몽룡", "홍길동", "김삿갓"];
      area3.innerHTML = "✅ 원본 names : " + JSON.stringify(names) + "<br>";

      names.reverse();
      area3.innerHTML += "👉 reverse 후 : " + JSON.stringify(names) + "<br>";

      names.sort();
      area3.innerHTML += "🔤 sort() 오름차순 : " + JSON.stringify(names) + "<br>";

      names.sort().reverse();
      area3.innerHTML += "🔽 sort() + reverse() 내림차순 : " + JSON.stringify(names) + "<br><br>";

      const numbers = [100, 25, 3, 56, 789, 12];
      area3.innerHTML += "✅ 숫자 배열 : " + JSON.stringify(numbers) + "<br>";
      numbers.sort();
      area3.innerHTML += "⚠️ 잘못된 sort 결과 : " + JSON.stringify(numbers) + "<br>";

      numbers.sort((a, b) => a - b);
      area3.innerHTML += "✔️ 숫자 오름차순 : " + JSON.stringify(numbers) + "<br>";

      numbers.sort((a, b) => b - a);
      area3.innerHTML += "✔️ 숫자 내림차순 : " + JSON.stringify(numbers) + "<br><br>";

      const students = [
        { name: "홍길동", score: 85 },
        { name: "이몽룡", score: 95 },
        { name: "성춘향", score: 75 },
      ];
      area3.innerHTML += "✅ 학생 점수 배열 : " + JSON.stringify(students) + "<br>";

      students.sort((a, b) => a.score - b.score);
      area3.innerHTML += "📊 점수 오름차순 : " + JSON.stringify(students) + "<br>";

      students.sort((a, b) => b.score - a.score);
      area3.innerHTML += "📊 점수 내림차순 : " + JSON.stringify(students) + "<br>";
    }

    // ============================
    // 4️⃣ push() & pop() 기초 ~ 심화
    // ============================
    function pushPopTest() {
      const area4 = document.querySelector("#area4");
      const arr = ["서초동", "우산산동", "연신동", "가산동", "빅베놈"];

      area4.innerHTML = "✅ 초기 arr : " + JSON.stringify(arr) + "<br>";

      // push 사용 (맨 끝에 추가)
      const pushResult = arr.push("신도림동");
      area4.innerHTML += `👉 arr.push("신도림동") 후 : ${JSON.stringify(arr)} (새 길이: ${pushResult})<br>`;

      arr.push("미아동");
      area4.innerHTML += `👉 arr.push("미아동") 후 : ${JSON.stringify(arr)}<br>`;

      // pop 사용 (맨 끝 삭제)
      const popped1 = arr.pop();
      area4.innerHTML += `❌ arr.pop() 후 (삭제된 값: ${popped1}) : ${JSON.stringify(arr)}<br>`;

      const popped2 = arr.pop();
      area4.innerHTML += `❌ arr.pop() 후 (삭제된 값: ${popped2}) : ${JSON.stringify(arr)}<br>`;

      // 최종 결과
      area4.innerHTML += "✅ 최종 arr : " + JSON.stringify(arr) + "<br>";
    }

    // ============================
    // 5️⃣ unshift() & shift() 기초 ~ 심화
    // ============================
    function shiftUnshiftTest() {
      const area5 = document.querySelector("#area5");
      const arr = ["농구", "야구", "골프", "테니스"];

      area5.innerHTML = "✅ 초기 arr : " + JSON.stringify(arr) + "<br><br>";

      // unshift() - 맨 앞에 추가
      const unshiftLength = arr.unshift("탁구");
      area5.innerHTML += `👉 arr.unshift("탁구") 후 : ${JSON.stringify(arr)} (새 길이: ${unshiftLength})<br>`;

      arr.unshift("배드민턴");
      area5.innerHTML += `👉 arr.unshift("배드민턴") 후 : ${JSON.stringify(arr)}<br><br>`;

      // shift() - 맨 앞 삭제
      const shifted1 = arr.shift();
      area5.innerHTML += `❌ arr.shift() 후 (삭제된 값: ${shifted1}) : ${JSON.stringify(arr)}<br>`;

      const shifted2 = arr.shift();
      area5.innerHTML += `❌ arr.shift() 후 (삭제된 값: ${shifted2}) : ${JSON.stringify(arr)}<br><br>`;

      area5.innerHTML += "✅ 최종 arr : " + JSON.stringify(arr) + "<br>";
    }
  </script>

<h3>6️⃣ 배열.slice() & splice()</h3>
<div id="area6" class="area"></div>
<button onclick="sliceSpliceTest()">slice/splice 확인하기</button>

<script>
  // ============================
  // 6️⃣ slice() & splice() 기초 ~ 심화
  // ============================
  function sliceSpliceTest() {
    const area6 = document.querySelector("#area6");
    const arr = ["Java", "Oracle", "HTML", "CSS", "JavaScript"];

    area6.innerHTML = "✅ 초기 arr : " + JSON.stringify(arr) + "<br><br>";

    // -----------------------------
    // 📌 slice()
    // -----------------------------
    const sliced = arr.slice(1, 4); // index 1부터 index 4 직전까지
    area6.innerHTML += "🔹 arr.slice(1, 4) 결과 : " + JSON.stringify(sliced) + "<br>";
    area6.innerHTML += "⚠️ slice 후 원본 arr : " + JSON.stringify(arr) + "<br><br>";

    // 음수 인덱스도 사용 가능
    const slicedNegative = arr.slice(-3);
    area6.innerHTML += "🔹 arr.slice(-3) 결과 : " + JSON.stringify(slicedNegative) + "<br>";
    area6.innerHTML += "⚠️ slice는 원본 유지됨<br><br>";

    // -----------------------------
    // 📌 splice()
    // -----------------------------
    const arrCopy = [...arr]; // 원본 보존 위해 복사
    const spliced = arrCopy.splice(2, 2, "Spring", "MyBatis"); // index 2부터 2개 삭제 후 새 요소 추가
    area6.innerHTML += "🔸 arr.splice(2, 2, 'Spring', 'MyBatis') 결과 : " + JSON.stringify(spliced) + "<br>";
    area6.innerHTML += "✅ splice 후 변경된 arr : " + JSON.stringify(arrCopy) + "<br><br>";

    // 요소 삭제만
    const arrCopy2 = [...arr];
    const removed = arrCopy2.splice(1, 3);
    area6.innerHTML += "🔸 arr.splice(1, 3) 삭제된 요소 : " + JSON.stringify(removed) + "<br>";
    area6.innerHTML += "✅ 삭제 후 arr : " + JSON.stringify(arrCopy2) + "<br><br>";

    // 요소 삽입만
    const arrCopy3 = [...arr];
    arrCopy3.splice(2, 0, "Python", "Django");
    area6.innerHTML += "🔸 arr.splice(2, 0, 'Python', 'Django') 삽입 후 arr : " + JSON.stringify(arrCopy3) + "<br>";
    area6.innerHTML += "⚠️ splice는 원본 배열 자체를 변경함<br>";
  }
</script>

</body>

</html>

```
