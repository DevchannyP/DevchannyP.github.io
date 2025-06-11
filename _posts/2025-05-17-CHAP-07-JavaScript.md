---
layout: post
title: "CHAP 7.⚙️ 비동기 프로그래밍 심화"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro7.png
author: Devchanny
---


# ** 📌비동기란 무엇인가?**

> 비동기 → "시간이 오래 걸리는 작업을 기다리지 않고 바로 다음 작업으로 넘어가는 방식"
> 

---

### 🎯 **동기 vs 비동기 비교**

| 유형 | 동기 | 비동기 |
| --- | --- | --- |
| 특징 | 작업 완료 후 다음 진행 | 작업 완료 여부 관계없이 진행 |
| 예시 | `alert()`, `prompt()` | `setTimeout()`, `fetch()` |
| 장점 | 순차적, 예측 가능 | UI 멈춤 방지, 효율적 |
| 단점 | 느림, 블로킹 발생 | 복잡한 제어, 콜백 헬 가능 |

---

### 🧩 **기본 예시**

```jsx
// 동기
console.log('A');
console.log('B');

// 비동기
console.log('A');
setTimeout(() => console.log('B'), 1000);
console.log('C');
```

---

## 2️⃣ 🧵 **싱글 스레드 & 이벤트 루프**

### 📌 **자바스크립트 특징**

- **싱글 스레드(Single Thread)**
    - 한 번에 하나의 작업만 실행
- 비동기 작업은 **브라우저(Web API)**가 관리 → 완료되면 **이벤트 루프(Event Loop)** 통해 **콜백 큐**로 전달

---

### 🚀 **Event Loop 도식화**

```
[ Call Stack ] <---> [ Event Loop ] <---> [ Callback Queue ]
        ↑                                         ↓
   실행 중인 함수                              완료된 비동기 함수
```

---

### 🧠 **면접 포인트**

> "JS가 싱글 스레드인데, 어떻게 비동기 처리 가능?"
> 
> 
> → **Web API + Event Loop + Callback Queue 구조 덕분!**
> 

---

## 3️⃣ 🔄 **Callback (콜백)**

### 📌 **정의:**

> 다른 함수에 인자로 전달되는 함수 → 특정 작업 완료 후 실행
> 

---

### ✅ **기초 예제**

```jsx
function greet(name, callback) {
  console.log(`Hello, ${name}`);
  callback();
}

greet('Tom', () => console.log('Welcome!'));
```

---

## 4️⃣ 🚨 **Callback Hell 심화**

### 📌 **문제점**

- 콜백 중첩 → 가독성 ↓
- 에러 처리 복잡
- 디버깅 어려움

---

### ❌ **콜백 헬 예시**

```jsx
setTimeout(() => {
  console.log('1');
  setTimeout(() => {
    console.log('2');
    setTimeout(() => {
      console.log('3');
    }, 1000);
  }, 1000);
}, 1000);
```

---

## 5️⃣ ✨ **Promise 구조 & 동작 원리**

### 📌 **정의**

> 비동기 작업의 결과값(성공/실패)을 표현하는 객체
> 

---

### 📊 **상태 변화**

| 상태 | 설명 |
| --- | --- |
| Pending | 대기 상태 |
| Fulfilled | 성공(resolve) |
| Rejected | 실패(reject) |

---

### ✅ **기본 예제**

```jsx
const myPromise = new Promise((resolve, reject) => {
  let success = true;
  if(success) resolve('Success!');
  else reject('Error!');
});

myPromise
  .then(result => console.log(result))  // 성공
  .catch(error => console.log(error))   // 실패
  .finally(() => console.log('Done!')); // 항상 실행
```

---

### 🧩 **Promise Chaining (연쇄 처리)**

```jsx
fetch('url1')
  .then(res => res.json())
  .then(data => fetch('url2'))
  .then(res => res.json())
  .then(data2 => console.log('Complete'))
  .catch(err => console.error(err));
```

---

## 6️⃣ 🔥 **Promise 심화 패턴**

### 🚀 **Promise.all**

```jsx
Promise.all([
  fetch('url1'),
  fetch('url2')
]).then(([res1, res2]) => console.log('All done!'));
```

- **모두 성공해야 다음으로 진행**
- **하나라도 실패 → `.catch()`로 이동**

---

### ⚡ **Promise.race**

```jsx
Promise.race([
  fetch('url1'),
  fetch('url2')
]).then(res => console.log('First done!'));
```

- **가장 빨리 끝난 Promise 반환**

---

### ✅ **Promise.allSettled**

```jsx
Promise.allSettled([
  Promise.resolve('A'),
  Promise.reject('B')
]).then(results => console.log(results));
```

- **모든 Promise 완료 → 실패/성공 모두 확인 가능**

---

### 🌟 **Promise.any**

```jsx
Promise.any([
  Promise.reject('X'),
  Promise.resolve('Y')
]).then(result => console.log(result)); // Y
```

- **가장 먼저 성공하는 것 반환**

---

## 7️⃣ 🟢 **async/await 내부 작동 원리 & 심화**

### 📌 **정의**

> Promise를 더 읽기 쉽게 쓰기 위한 문법 → 동기처럼 보이지만 내부는 비동기
> 

---

### ✅ **기본 예제**

```jsx
async function fetchData() {
  try {
    const res = await fetch('url');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Done');
  }
}
fetchData();
```

---

### 🚀 **병렬 처리 최적화: Promise.all 활용**

```jsx
async function parallelFetch() {
  const [res1, res2] = await Promise.all([
    fetch('url1'),
    fetch('url2')
  ]);
  const data1 = await res1.json();
  const data2 = await res2.json();
}
```

---

### 🚨 **주의: forEach + async/await 금지**

```jsx
[1,2,3].forEach(async (num) => {
  await fetchData(num); // 제대로 기다리지 않음
});
```

✅ **정확한 방법: for...of**

```jsx
for (const num of [1,2,3]) {
  await fetchData(num);
}
```

---

## 8️⃣ 💼 **비동기 + 에러 핸들링 심화**

### ✅ **try-catch-finally 패턴**

```jsx
async function robustFetch() {
  try {
    const res = await fetch('url');
    if(!res.ok) throw new Error('Server error!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Handled:', err);
  } finally {
    console.log('Cleanup');
  }
}
```

---

## 9️⃣ 🧠 **기술 면접 대비 핵심 요약**

| 질문 | 핵심 답변 |
| --- | --- |
| JS에서 비동기 처리 방법? | Callback, Promise, async/await |
| Callback Hell 문제? | 중첩 → 가독성↓, 에러 처리 어려움 |
| Promise 상태? | Pending → Fulfilled/Rejected |
| Promise.all, race 차이? | all: 모두 성공 시 진행, race: 가장 빠른 것 |
| allSettled와 any는 언제? | 실패 포함 모든 결과 확인, 가장 먼저 성공 반환 |
| async/await 내부 원리? | Promise 기반, 실행 컨텍스트에 Promise 등록 |
| forEach + await 사용해도 되나? | 비추천 (흐름 제어 불가), for...of 사용 |
| 에러 핸들링 패턴? | try-catch-finally, HTTP 에러도 따로 확인 필요 |

---

### 🚀 종합 정리 코드 예

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 비동기 프로그래밍 심화 실습</title>
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
    <h2>🟢 JavaScript 비동기 프로그래밍 심화 실습</h2>
    <div class="area big" id="outputArea"></div>
    
    <script>
        function runExamples() {
            const output = document.getElementById("outputArea");
            function log(text) { output.innerHTML += text + "\n"; }
            
            log("✅ 동기 vs 비동기 예제");
            log("동기 코드 실행:");
            log("A");
            log("B");
            
            log("\n비동기 코드 실행:");
            log("A");
            setTimeout(() => log("B (1초 후 실행)"), 1000); // 1초 후 실행되는 비동기 코드
            log("C");
            
            log("\n✅ Event Loop 이해");
            setTimeout(() => log("🌟 이벤트 루프 실행 완료!"), 0); // 이벤트 루프의 동작 방식 확인
            log("📌 동기 코드 먼저 실행됨");
            
            log("\n✅ Promise 기본 사용");
            const myPromise = new Promise((resolve) => {
                setTimeout(() => resolve("🎉 Promise 성공!"), 1500);
            });
            myPromise.then(result => log(result)); // Promise가 성공하면 실행
            
            log("\n✅ async/await 사용");
            async function fetchData() {
                log("⏳ 데이터 가져오는 중...");
                await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
                log("✅ 데이터 가져오기 완료!");
            }
            fetchData();
            
            log("\n✅ Promise.all 사용");
            async function parallelTasks() {
                const [res1, res2] = await Promise.all([
                    new Promise(resolve => setTimeout(() => resolve("📦 작업 1 완료"), 1000)),
                    new Promise(resolve => setTimeout(() => resolve("📦 작업 2 완료"), 1200))
                ]);
                log(res1);
                log(res2);
            }
            parallelTasks();
            
            log("\n✅ 에러 핸들링");
            async function errorHandlingExample() {
                try {
                    throw new Error("🔥 오류 발생!");
                } catch (err) {
                    log("❌ " + err.message); // 오류 메시지 출력
                } finally {
                    log("🛠️ 정리 완료"); // finally 블록 실행
                }
            }
            errorHandlingExample();

            log("\n✅ 마이크로태스크 vs 매크로태스크");
            setTimeout(() => log("🕒 setTimeout (매크로태스크)"), 0);
            Promise.resolve().then(() => log("⚡ Promise (마이크로태스크)"));
            log("🔄 동기 코드 실행 중");
        }
        
        runExamples();
    </script>
</body>
</html>

```
