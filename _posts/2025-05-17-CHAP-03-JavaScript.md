---
layout: post
title: "CHAP 3. 연산자, 조건문, 반복문"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro3.png
author: Devchanny
---


# ** 📌1️⃣ 연산자 (Operators) 심화**

---

### 🔥 **(1) 비교 연산자: == vs === 완전 해부**

| 연산자 | 비교 기준 | 타입 변환 | 실무 권장 | 면접 포인트 |
| --- | --- | --- | --- | --- |
| `==` | 값만 비교 | O (암묵적 타입 변환) | ❌ 사용 지양 | "암묵적 타입 변환으로 예측 불가 결과" |
| `===` | 값 + 타입 모두 비교 | X | ✅ 항상 사용 | "엄격 비교, 안전" |

---

### 🧩 **암묵적 타입 변환 트랩 예시**

```jsx
console.log(0 == '');        // true (0 == 0)
console.log(false == '0');   // true (false → 0, '0' → 0)
console.log(null == undefined); // true
console.log([] == false);    // true ([] → '' → 0 → false)
```

📌 **실무 & 면접 필살 포인트:**

> ==은 암묵적 타입 변환 → 예측 불가 → 항상 === 사용 습관화!
> 

---

🧠 **논리 연산자 & 단락 평가 (Short-Circuit Evaluation)**

---

🔥 **1️⃣ 논리 연산자 종류**

| 연산자 | 의미 | 반환값 |
| --- | --- | --- |
| `&&` (AND) | **둘 다 참 → 참** | **왼쪽 값이 Falsy → 그 값 반환, 둘 다 Truthy → 오른쪽 값 반환** |
| `||` (OR) | **둘 중 하나 참 → 참** | 왼쪽 값이 **Truthy**이면 → 그 값을 바로 반환, 왼쪽이 **Falsy**면 → 오른쪽 값 반환 |
| `!` (NOT) | **부정** | **Boolean 반대값 반환 (true → false, false → true)** |

---

## 🚀 **1️⃣ OR(`||`) - 기본값 설정**

### 📌 **설명**

- 왼쪽 값이 **Truthy**이면 → 그 값을 바로 반환
- 왼쪽이 **Falsy**면 → 오른쪽 값 반환
- **기본값 지정 패턴에서 자주 사용**

### 💡 **예제**

```jsx
const input = '';
const value = input || 'Default';
console.log(value); // 'Default'
```

- **input이 빈 문자열(`Falsy`) → 'Default' 반환**

---

### 📌 **실무 활용**

```jsx
function getUsername(username) {
  return username || 'Guest';
}

console.log(getUsername('Tom')); // 'Tom'
console.log(getUsername(''));    // 'Guest'
```

✅ **설명:**

> 입력값이 비어있을 경우 → 기본값 'Guest' 자동 지정
> 

---

## 🚀 **2️⃣ AND(`&&`) - 조건부 실행**

### 📌 **설명**

- 왼쪽 값이 **Falsy**이면 → 바로 반환 (평가 중단)
- 왼쪽이 **Truthy**면 → 오른쪽 실행

---

### 💡 **예제**

```jsx
const user = null;
const name = user && user.name;
console.log(name); // null → 평가 중단
```

---

### 📌 **실무 활용**

```jsx
isLoggedIn && logout();
```

✅ **설명:**

> isLoggedIn이 true일 때만 logout() 실행
> 

---

## 🚀 **3️⃣ NOT(`!`) - Boolean 반전**

---

### 📌 **예제**

```jsx
const isAvailable = false;
console.log(!isAvailable); // true
```

📌 **실무:** 조건 반전 시 유용

---

## 🧩 **3️⃣ 실전 예제**

---

### ✅ **AND(`&&`) - 조건부 실행**

```jsx
const user = null;
const name = user && user.name;
console.log(name); // null → 평가 중단
```

- **왼쪽(user)이 null (Falsy)이므로 평가 중단, null 반환**

---

### ✅ **OR(`||`) - 기본값 설정**

```jsx
const input = '';
const value = input || 'Default';
console.log(value); // 'Default'
```

- **왼쪽이 ''(Falsy) → 오른쪽 'Default' 반환**

---

### ✅ **NOT(`!`) - Boolean 반전**

```jsx
const isLoggedIn = false;
console.log(!isLoggedIn); // true
```

---

### 📊 **(3) 연산자 우선순위 도식화**

| 우선순위 | 연산자 | 예시 |
| --- | --- | --- |
| 1 | `()` | `(a + b)` |
| 2 | `*`, `/`, `%` | `a * b` |
| 3 | `+`, `-` | `a + b` |
| 4 | `<`, `>`, `<=`, `>=` | `a > b` |
| 5 | `==`, `===`, `!=` | `a === b` |
| 6 | `&&`, ` |  |
| 7 | `=`, `+=` | `a = b` |

---

---

## 🎯 **2️⃣ 조건문 (Conditionals) 심화**

---

### 🔥 **(1) if-else 심화**

```jsx
const age = 20;

if (age >= 18) {
  console.log('성인');
} else if (age >= 13) {
  console.log('청소년');
} else {
  console.log('어린이');
}
```

📌 **가독성 팁:**

> 복잡 조건일수록 if-else 명확히! 삼항 연산자 남용 금지
> 

---

### 🧩 **(2) switch 문 & case fall-through 문제 방지**

---

```jsx
const fruit = 'apple';

switch (fruit) {
  case 'apple':
    console.log('🍎');
    break; // break 필수!
  case 'banana':
    console.log('🍌');
    break;
  default:
    console.log('Unknown fruit');
}
```

---

### ⚠️ **심화: case fall-through 의도적으로 활용**

```jsx
const key = 2;
switch (key) {
  case 1:
  case 2:
    console.log('1 또는 2'); // 둘 다 실행
    break;
}
```

---

### 💥 **(3) 삼항 연산자 중첩 → 가독성 경고**

```jsx
const score = 85;
const grade = score > 90 ? 'A' : score > 80 ? 'B' : 'C';
console.log(grade); // 'B'
```

📌 **실무 팁:**

> 중첩 복잡 → 반드시 if-else로 변환
> 

---

---

## 🔁 **3️⃣ 반복문 (Loops) 심화**

---

| 반복문 | 특징 | 사용 상황 | 주의 |
| --- | --- | --- | --- |
| `for` | 인덱스 기반 | 배열, 고정 횟수 | break/continue 가능 |
| `for...in` | 객체 key 순회 | 객체 탐색 | 배열 사용 시 key 외 프로퍼티 포함 |
| `for...of` | iterable 순회 | 배열, 문자열, Set, Map | 객체 사용 불가 |
| `.forEach()` | 배열 순회 | 콜백 기반 처리 | break/continue 불가 |

---

### 🧩 **for-in vs for-of 실무 트랩 예시**

```jsx
let arr = ['a', 'b', 'c'];
arr.extra = 'test';

for (let key in arr) {
  console.log(key); // '0', '1', '2', 'extra' (원치 않는 key 포함)
}

for (let val of arr) {
  console.log(val); // 'a', 'b', 'c'
}
```

✅ **배열은 반드시 → `for-of` 사용 권장**

---

### 🔥 **forEach 제약점 심화**

```jsx
arr.forEach(val => {
  if (val === 'b') return; // break 불가
});
```

📌 **실무 팁:**

> break 필요 → for or for-of 사용
> 

---

---

## 🧠 **4️⃣ 실무 & 면접 필살 포인트 정리**

---

| 질문 | 핵심 답변 |
| --- | --- |
| == vs === 차이? | 타입 변환 여부, `===` 항상 권장 |
| 단락 평가 실무 활용? | 조건부 실행, 기본값 처리 |
| switch fall-through 문제? | break 생략 → 의도치 않은 실행 |
| for-in vs for-of 차이? | 객체 key vs iterable 순회 |
| forEach 한계? | break/continue 불가 |
| 삼항 연산자 언제 사용? | 간단한 조건에서만, 복잡 조건 X |

---

---

## 📑 **5️⃣ 노션용 표 깔끔 정리**

---

### 📋 **연산자**

| 연산자 | 기능 | 특징 |
| --- | --- | --- |
| `==` | 값 비교 | 타입 변환 발생 (주의) |
| `===` | 값+타입 비교 | 타입 변환 X |

---

### 📋 **조건문**

| 종류 | 특징 | 주의 |
| --- | --- | --- |
| if-else | 복잡 조건 처리 | 가독성 좋음 |
| switch | 다중 조건 처리 | break 필수 |
| 삼항 | 간결 표현 | 중첩 가독성 ↓ |

---

### 📋 **반복문**

| 반복문 | 사용 상황 | 특성 | 주의 |
| --- | --- | --- | --- |
| for | 고정 횟수 | break/continue 가능 |  |
| for-in | 객체 key | key 순회 | 배열 사용 시 주의 |
| for-of | iterable | 값 순회 | 객체 사용 불가 |
| forEach | 배열 | 콜백 처리 | break 불가 |

---

---

## 🚀 **6️⃣ 마무리 코드 예제 정리**

### 📋 연산자

```jsx
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 연산자 심화</title>
</head>

<body>

    <script>
        /*
        📌 1. 산술 연산자 (Arithmetic Operators)
        ---------------------------------------
            1) 더하기 : +  ➕
            2) 빼기 : -  ➖
            3) 곱하기 : *  ✖️
            4) 나누기 : /  ➗ (5/2 = 2.5) => 정수화 함수 사용 가능:
                    - parseInt(5/2) => 2
                    - Math.floor(5/2) => 2
            5) 나머지 : %  (짝수/홀수 판별 자주 사용)
            6) 증가, 감소 연산자 : ++, --  (숨김 X, 명시적)
            7) 제곱 : ** (2**3 => 8)
        */

        console.log("📌 산술 연산자 예시");

        let x = 5;
        let y = 2;

        console.log(`더하기 ➕ : ${x + y}`); // 7
        console.log(`빼기 ➖ : ${x - y}`);  // 3
        console.log(`곱하기 ✖️ : ${x * y}`); // 10
        console.log(`나누기 ➗ : ${x / y}`); // 2.5
        console.log(`정수 나누기(parseInt) : ${parseInt(x / y)}`); // 2
        console.log(`정수 나누기(Math.floor) : ${Math.floor(x / y)}`); // 2
        console.log(`나머지 % : ${x % y}`); // 1
        console.log(`제곱 ** : ${2 ** 3}`); // 8

        // ++, -- 연산자 (주의: 전위/후위 차이!)
        let num = 1;
        console.log(`전위 증가: ${++num}`); // 먼저 증가 후 출력 → 2
        console.log(`후위 증가: ${num++}`); // 출력 후 증가 → 2
        console.log(`현재 num: ${num}`); // 3

        console.log("--------------------------------------------");

        /*
        📌 2. 비교 연산자 (Comparison Operators)
        ---------------------------------------
            >, >=, <, <=
            == : 값만 비교 (1 == '1' : true)
            === : 값 + 자료형 비교 (1 === '1' : false)
            != : 값만 비교 (1 != '1' : false)
            !== : 값 + 자료형 비교 (1 !== '1' : true)
        */

        console.log("📌 비교 연산자 예시");

        console.log(5 > 3);   // true
        console.log(5 >= 5);  // true
        console.log(2 < 4);   // true
        console.log(2 <= 1);  // false

        console.log(1 == '1');  // true (자료형 무시)
        console.log(1 === '1'); // false (자료형 엄격 비교)
        console.log(1 != '1');  // false
        console.log(1 !== '1'); // true

        console.log("--------------------------------------------");

        /*
        📌 3. 논리 연산자 (Logical Operators)
        ---------------------------------------
            && : AND (둘 다 참)
            || : OR (하나라도 참)
            !  : NOT (부정)
        */

        console.log("📌 논리 연산자 예시");

        console.log(true && true);   // true
        console.log(true && false);  // false
        console.log(false || true);  // true
        console.log(!true);          // false

        console.log("--------------------------------------------");

        /*
        📌 4. 대입 연산자 (Assignment Operators)
        ---------------------------------------
            =  : 대입
            += : 누적 더하기
            -=, *=, /= 가능
        */

        console.log("📌 대입 연산자 예시");

        let a = 10;
        a += 5; // a = a + 5
        console.log(a); // 15
        a *= 2;
        console.log(a); // 30

        console.log("--------------------------------------------");

        /*
        📌 5. 조건 연산자 (삼항 연산자)
        ---------------------------------------
            (조건식) ? 참 : 거짓
        */

        console.log("📌 조건 연산자 예시");

        let score = 85;
        let result = (score >= 60) ? "합격 🎉" : "불합격 ❌";
        console.log(result); // 합격 🎉

        console.log("--------------------------------------------");

        /*
        📌 6. 문자열 연산자
        ---------------------------------------
            + : 문자열 연결
        */

        console.log("📌 문자열 연산자 예시");

        let first = "Hello";
        let second = "World";
        console.log(first + " " + second); // Hello World

    </script>

    <script>
        /*
        📌 심화 예제: 최저 시급 계산기
        ---------------------------------------
        최저 시급이 9620원이다.
        8시간까지는 최저 시급을 받고,
        8시간 초과 근무는 최저 시급의 1.5배를 받는다.
        10시간 근무했을 때의 일당을 구하기
        */

        function calculatePay(hours) {
            const basePay = 9620;  // 최저 시급
            let totalPay = 0;

            if (hours > 8) {
                let regular = basePay * 8;  // 8시간 기본급
                let overtime = basePay * 1.5 * (hours - 8); // 초과 근무 수당
                totalPay = regular + overtime;
                console.log(`💼 기본급: ${regular}원, ⏰ 초과수당: ${overtime}원`);
            } else {
                totalPay = basePay * hours;
                console.log(`💼 기본급: ${totalPay}원 (초과 근무 없음)`);
            }

            console.log(`총 일당 💰: ${totalPay}원`);
        }

        calculatePay(10); // 10시간 근무 시 계산

        /*
        ✅ 개선:
        - 변수명 의미 있게 변경 (a → basePay, b → totalPay 등)
        - 불필요한 let b 삭제
        - console.log에 결과 보기 쉽게 구성
        - 함수 재활용성 높임
        */

    </script>

    <script>
        /*
        📌 추가 심화 예제: 홀수/짝수 판별기 (나머지 연산자 응용)
        */

        function checkOddEven(num) {
            let result = (num % 2 === 0) ? "짝수 ✨" : "홀수 🌙";
            console.log(`${num}은(는) ${result}`);
        }

        checkOddEven(5); // 홀수
        checkOddEven(12); // 짝수

    </script>

</body>

</html>

```

### 📋 조건반복문

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>조건문 & 반복문 완전 정복</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      padding: 20px;
    }
    .score {
      margin: 10px 0;
    }
    .high {
      color: green;
      font-weight: bold;
    }
    .low {
      color: red;
      font-weight: bold;
    }
    .pass {
      color: blue;
    }
    .fail {
      color: darkred;
    }
    #box1, #box2, #box3 {
      margin: 10px 0;
      padding: 5px;
      background: #e0e0e0;
    }
  </style>
</head>

<body>
  <h2>📚 학생 점수표 (조건문 + 반복문)</h2>

  <!-- 과목 점수 영역 -->
  <div id="scores">
    <div class="score">국어 점수: <span data-subject="kor">0</span>점</div>
    <div class="score">영어 점수: <span data-subject="eng">0</span>점</div>
    <div class="score">수학 점수: <span data-subject="math">0</span>점</div>
  </div>

  <div class="score">📊 평균 점수: <span id="average">0</span>점</div>
  <div class="score">💡 결과: <span id="result">-</span></div>

  <hr>

  <h3>🔁 반복문 연습 영역</h3>
  <div id="box1">🚩 while문 결과: </div>
  <div id="box2">🚩 for문 결과: </div>
  <div id="box3">🚩 do-while문 결과: </div>

  <script>
    // 🌟 1️⃣ 데이터 준비: 배열 + 객체 활용
    const subjects = [
      { name: "국어", key: "kor", score: 0 },
      { name: "영어", key: "eng", score: 0 },
      { name: "수학", key: "math", score: 0 }
    ];

    // 🌟 2️⃣ 사용자 입력: prompt로 점수 입력받기
    subjects.forEach(subject => {
      let input = prompt(`✏️ ${subject.name} 점수를 입력하세요 (0~100):`);
      // 입력값 검증
      if (input !== null && !isNaN(input) && input.trim() !== "") {
        let score = parseInt(input);
        if (score >= 0 && score <= 100) {
          subject.score = score;
        } else {
          alert("❗ 0~100 사이 숫자만 입력하세요!");
          location.reload(); // 잘못된 입력 시 다시
        }
      } else {
        alert("❗ 숫자를 제대로 입력하세요!");
        location.reload();
      }
    });

    // 🌟 3️⃣ 점수표 표시 & 스타일 적용
    let total = 0;
    subjects.forEach(subject => {
      const span = document.querySelector(`span[data-subject="${subject.key}"]`);
      span.textContent = subject.score;
      total += subject.score;

      // 점수 조건에 따라 색상 적용
      if (subject.score >= 90) {
        span.classList.add("high"); // 90점 이상
      } else if (subject.score < 60) {
        span.classList.add("low");  // 60점 미만
      }
    });

    // 🌟 4️⃣ 평균 계산 & 출력
    const average = (total / subjects.length).toFixed(2);
    document.getElementById("average").textContent = average;

    // 🌟 5️⃣ 조건문 (switch)으로 학점 표시
    const avgGrade = Math.floor(average / 10);
    const resultSpan = document.getElementById("result");

    switch (avgGrade) {
      case 10:
      case 9:
        resultSpan.textContent = "A (우수)";
        resultSpan.classList.add("pass");
        break;
      case 8:
        resultSpan.textContent = "B (양호)";
        resultSpan.classList.add("pass");
        break;
      case 7:
        resultSpan.textContent = "C (보통)";
        resultSpan.classList.add("pass");
        break;
      case 6:
        resultSpan.textContent = "D (미흡)";
        resultSpan.classList.add("fail");
        break;
      default:
        resultSpan.textContent = "F (불합격)";
        resultSpan.classList.add("fail");
    }

    // =====================
    // 🔥 반복문 심화 연습
    // =====================

    // 🌟 6️⃣ while문: 1~5 출력
    let i = 1;
    while (i <= 5) {
      document.getElementById("box1").innerHTML += `${i}&nbsp;&nbsp;`;
      i++;
    }

    // 🌟 7️⃣ for문: 5~1 역순 출력
    for (let j = 5; j >= 1; j--) {
      document.getElementById("box2").innerHTML += `${j}&nbsp;&nbsp;`;
    }

    // 🌟 8️⃣ do-while문: 1~5 출력 + 조건 한번만 확인
    let k = 1;
    do {
      document.getElementById("box3").innerHTML += `${k}&nbsp;&nbsp;`;
      k++;
    } while (k <= 5);

    // 🌟 9️⃣ 심화: 중첩 for문으로 구구단 일부 출력
    document.write(`<hr><h3>📌 구구단 2단~4단</h3>`);
    for (let dan = 2; dan <= 4; dan++) {
      document.write(`<strong>🔢 ${dan}단</strong><br>`);
      for (let n = 1; n <= 9; n++) {
        document.write(`${dan} × ${n} = ${dan * n}<br>`);
      }
      document.write(`<br>`);
    }

  </script>
</body>

</html>

```

### 📋 데이터 입출력 조건문

```jsx
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript 데이터 입출력 완전정복</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    table, th, td {
      border: 1px solid #000;
      border-collapse: collapse;
      padding: 5px;
    }
  </style>
</head>

<body>
  <h2>📢 데이터 출력하는 방법들</h2>
  <ul>
    <li>🟢 <strong>alert()</strong> → 확인창에 메시지 띄우기</li>
    <li>🔵 <strong>console.log()</strong> → 개발자 콘솔창에 메시지 출력</li>
    <li>🟡 <strong>document.write()</strong> → 페이지에 바로 출력 (비추천)</li>
    <li>🟣 <strong>innerHTML / innerText</strong> → 특정 태그 안에 값 넣기</li>
  </ul>

  <!-- innerHTML로 출력할 곳 -->
  <div id="outputArea"></div>

  <script>
    // 1️⃣ alert() → 브라우저 확인창에 띄우기
    alert("🚨 알림창에 메시지를 띄웁니다!");

    // 2️⃣ document.write() → 페이지에 바로 출력 (새로고침하면 이전 내용 덮어씌움, 실제론 잘 안 씀)
    document.write("<hr>");
    document.write("📝 document.write()로 직접 화면에 출력합니다!<br>");

    // 3️⃣ console.log() → 개발자 도구(F12) 콘솔창에서 확인
    console.log("🛠️ 콘솔창에 디버깅용 메시지 출력!");

    // 4️⃣ innerHTML 사용 → 태그 내부에 내용 삽입
    const outputDiv = document.getElementById("outputArea");
    outputDiv.innerHTML = `
      <table>
        <tr><th>📋 innerHTML로 출력</th></tr>
        <tr><td>HTML 태그 포함해서 출력 가능!</td></tr>
      </table>
    `;
  </script>

  <hr>

  <h2>📝 데이터 입력하는 방법들</h2>
  <ul>
    <li>🟢 <strong>confirm()</strong> → 확인 / 취소 버튼으로 true/false 입력 받기</li>
    <li>🔵 <strong>prompt()</strong> → 직접 텍스트 입력 받기</li>
    <li>🟣 <strong>HTML 요소 (input, textarea 등)</strong> → 입력값 가져오기</li>
  </ul>

  <!-- confirm, prompt 결과 표시할 곳 -->
  <div id="resultArea"></div>

  <button onclick="useConfirm()">✅ 확인창 띄우기</button>
  <button onclick="usePrompt()">✏️ 이름 입력받기</button>

  <hr>

  <h3>📥 입력 폼 예제 (심화)</h3>
  <form onsubmit="processForm(event)">
    <label>나이 입력: <input type="number" id="ageInput" required></label>
    <input type="submit" value="제출">
  </form>
  <div id="formResult"></div>

  <script>
    // ✅ confirm() 예제 → true/false 반환
    function useConfirm() {
      let result = confirm("홍길동님이 맞습니까?");

      // 콘솔로도 출력
      console.log("confirm 결과:", result);

      // 화면에도 결과 출력
      const area = document.getElementById("resultArea");
      if (result) {
        area.innerHTML = "<h3>😊 환영합니다, 홍길동님!</h3>";
      } else {
        area.innerHTML = "<h3>👋 다음에 또 만나요!</h3>";
      }
    }

    // ✏️ prompt() 예제 → 입력받은 문자열 반환
    function usePrompt() {
      let name = prompt("이름을 입력해주세요!");

      // 빈 칸으로 두고 취소 누를 수도 있으니 체크
      if (name === null || name.trim() === "") {
        document.getElementById("resultArea").innerHTML = "<p>❌ 이름을 입력하지 않았습니다.</p>";
      } else {
        document.getElementById("resultArea").innerHTML = `<p>👋 안녕하세요, <strong>${name}</strong>님!</p>`;
      }
    }

    // 📥 입력 폼 처리 → input 요소에서 데이터 가져오기
    function processForm(e) {
      e.preventDefault(); // 폼 제출시 페이지 새로고침 방지

      let age = document.getElementById("ageInput").value;

      if (Number(age) >= 20) {
        document.getElementById("formResult").innerHTML = "✅ 성인입니다!";
      } else {
        document.getElementById("formResult").innerHTML = "🚸 미성년자입니다!";
      }
    }
  </script>

</body>

</html>

```
