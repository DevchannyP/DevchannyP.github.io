---
layout: post
title: "CHAP 2. 변수와 데이터 타입"
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro2.png
author: Devchanny
---


# ** 📌1. 변수란 무엇인가?**

> 프로그램에서 데이터를 저장할 수 있는 공간(이름)
> 
> 
> 쉽게 말해, **값을 담는 상자** 🎁
> 

---

## 🏷️ **2. 변수 선언 키워드 비교**

| 키워드 | 스코프 | 호이스팅 | TDZ | 재선언 | 재할당 | 특징 |
| --- | --- | --- | --- | --- | --- | --- |
| `var` | 함수 | O (초기화: undefined) | X | O | O | 오래된 방식, 권장 X |
| `let` | 블록 | O (초기화 X) | O | X | O | 현대 표준 |
| `const` | 블록 | O (초기화 X) | O | X | X | 상수, 단 객체/배열 내부 수정 가능 |

---

## 🎯 **3. 스코프(Scope) 심화**

### 🚩 **종류**

| 종류 | 설명 | 비유 |
| --- | --- | --- |
| 전역 스코프 | 어디서든 접근 가능 | "건물 전체에 있는 CCTV" |
| 함수 스코프 | 함수 내에서만 유효 (`var`) | "방 안에서만 켜지는 전등" |
| 블록 스코프 | `{}` 블록 내 유효 (`let`, `const`) | "칸막이로 구분된 공간" |

---

### 💡 **스코프 예제**

```jsx
function test() {
  if (true) {
    var x = 1;
    let y = 2;
    const z = 3;
  }
  console.log(x); // 1 (var → 함수 스코프)
  console.log(y); // ReferenceError (let → 블록 스코프)
  console.log(z); // ReferenceError (const → 블록 스코프)
}
test();
```

---

## 🚀 **4. 호이스팅(끌어올림) 심화**

### 🔥 **정의:**

> 변수와 함수 선언이 해당 스코프의 최상단으로 끌어올려지는 현상
> 

---

### 📌 **핵심 차이**

| 키워드 | 호이스팅 | 초기화 |
| --- | --- | --- |
| `var` | O | undefined |
| `let`, `const` | O | 초기화 X → TDZ 발생 |

---

### 🧩 **호이스팅 심화 예시**

```jsx
console.log(a); // undefined (var)
var a = 10;
console.log(b); // ReferenceError (let)
let b = 20;
```

📊 **내부 동작:**

```
1. var a → 메모리 공간 확보 → undefined
2. let b → 메모리 공간 확보 → 초기화 전 접근 금지 (TDZ)
```

---

## 🕵️ **5. TDZ (Temporal Dead Zone) 완전 이해**

| 용어 | 설명 |
| --- | --- |
| TDZ | `let`/`const`가 선언된 블록의 시작 ~ 초기화 전까지 접근 불가 |
| 이유 | 변수의 "안정성" 보장 (초기화 안 된 값 참조 방지) |

---

### 📌 **TDZ 심화 예시**

```jsx
{
  // TDZ 시작
  console.log(myVar); // ❌ ReferenceError
  let myVar = 100;
  // TDZ 끝 (초기화 후 접근 가능)
}
```

---

### 🔍 **비유:**

> TDZ = 예약 시작 전 입장 불가한 공연장 🎭
> 
> 
> **var**: 예약 없어도 무조건 입장
> 
> **let/const**: 예약 시간 이후에만 입장 가능, 전엔 무조건 에러
> 

---

## 🏆 **6. 재선언 & 재할당**

| 키워드 | 재선언 | 재할당 | 주의 |
| --- | --- | --- | --- |
| `var` | O | O | 여러 번 선언 가능 (혼란) |
| `let` | X | O | 변수 값 변경 가능 |
| `const` | X | X (바인딩 불변) | 단, 객체 내부 속성은 변경 가능 |

---

### 📌 **const 객체 내부 속성 변경 예시**

```jsx
const obj = { name: "JS" };
obj.name = "JavaScript"; // 가능

const arr = [1, 2];
arr.push(3); // 가능
```

📢 **헷갈리는 포인트!**

> const는 변수 바인딩 불변
> 
> 
> **객체 자체의 참조 값은 유지**, 내부 프로퍼티는 변경 가능!
> 

---

## 💥 **7. 실무에서 발생하는 변수 관련 트랩 예시**

---

### 🔥 **클로저 + 루프 문제**

```jsx
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 출력: 3, 3, 3 (모두 3)
```

**원인:**

- `var` → 함수 스코프 → 하나의 i 공유 → 루프 끝나고 i = 3

✅ **해결: `let` 사용**

```jsx
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 출력: 0, 1, 2 (블록 스코프)
```

---

### ⚠️ **재선언 혼란 예시**

```jsx
var x = 10;
var x = 20; // 가능 (혼란 유발)

let y = 10;
let y = 20; // SyntaxError
```

---

## 🎓 **8. 기술 면접 대비 질문**

| 질문 | 답변 포인트 |
| --- | --- |
| var, let, const 차이점? | 스코프, 호이스팅, TDZ, 재선언/재할당 차이 구체적으로 |
| TDZ란? | 초기화 전 접근 금지, ReferenceError 발생 |
| const의 객체 내부 속성 변경 가능? | O (바인딩 불변, 내부 가변성 허용) |
| var 사용 시 발생할 문제점? | 함수 스코프 → 의도치 않은 값 공유, 재선언 혼란 |
| 클로저 + 루프에서 var과 let 차이? | let → 블록 스코프, var → 함수 스코프 (값 공유 문제 발생) |

---

## 📝 **9. 노션용 깔끔 표 요약**

---

### 🚩 **변수 키워드 비교**

| 키워드 | 스코프 | 호이스팅 | TDZ | 재선언 | 재할당 | 특징 |
| --- | --- | --- | --- | --- | --- | --- |
| `var` | 함수 | O (`undefined`) | X | O | O | 오래된 방식, 권장 X |
| `let` | 블록 | O (초기화 X) | O | X | O | 현대 기본 |
| `const` | 블록 | O (초기화 X) | O | X | X | 상수, 내부 수정 가능 |

---

## 📚 **10. 메모리 내부 동작까지 심화 정리**

| 단계 | 동작 |
| --- | --- |
| 선언 | 메모리 공간 확보 |
| var | 초기화: undefined |
| let, const | TDZ 상태 → 초기화 전 접근 시 에러 |
| 할당 | 실제 값 저장 |

---

## 🌟 **1️⃣ 자바스크립트 자료형이란?**

> 값의 종류와 성질을 정의하는 것!
> 

**자바스크립트 특징:**

- **동적 타입 언어 (Dynamic Typing)**
→ 변수 선언 시 타입 명시 X
→ 실행 시 타입 결정됨
→ 유연성 높음 = 실수하기 쉬움

---

## 📌 **2️⃣ 자료형의 2대 분류**

| 구분 | 종류 | 저장 위치 | 복사 방식 | 불변성 |
| --- | --- | --- | --- | --- |
| **원시 타입 (Primitive)** | Number, String, Boolean, undefined, null, Symbol, BigInt | **Stack** | 값 복사 (깊은 복사) | **Immutable (불변)** |
| **참조 타입 (Reference)** | Object, Array, Function, Date, RegExp 등 | **Heap (주소), Stack (주소 저장)** | 참조 복사 (얕은 복사) | **Mutable (가변)** |

---

## 🔥 **3️⃣ 원시 타입(Primitive Types) 완전 심화**

---

### 🔢 **(1) Number**

- **정수, 실수, NaN, Infinity 모두 포함**
- 내부적으로 **64bit 부동소수점** (IEEE 754)

```jsx
let int = 42;
let float = 3.14;
console.log(1 / 0); // Infinity
console.log('abc' * 2); // NaN
```

📌 **부동소수점 오차 심화:**

```jsx
console.log(0.1 + 0.2); // 0.30000000000000004
```

✅ **해결:** `Number.EPSILON`, 또는 정수로 변환 후 계산

---

### 🔤 **(2) String**

- **문자열 저장**
- "", '', `` 모두 사용 가능
- **불변성 → 수정 시 새로운 값 생성**

```jsx
let str = 'JS';
str[0] = 'A';
console.log(str); // 'JS'
```

📌 **템플릿 리터럴 (ES6+)**

```jsx
let name = 'JavaScript';
console.log(`Hello, ${name}`);
```

---

### 🔥 **(3) Boolean**

```jsx
javascript
복사편집
let isDone = true;
let isFalse = false;
```

📌 **Truthy / Falsy 심화:**

Falsy 값

---

```
false
```

,

```
0
```

,

```
""
```

,

```
null
```

,

```
undefined
```

,

```
NaN
```

---

```jsx
if (0) console.log('Falsy'); // 실행 안 됨
```

---

### 🕳️ **(4) undefined**

- **변수 선언 → 값 할당 X**

```jsx
let a;
console.log(a); // undefined
```

---

### 🌑 **(5) null**

- **의도적으로 '값 없음' 표시**

```jsx
let b = null;
```

📌 **면접 단골:**

```jsx
console.log(typeof null); // 'object' → JS 초창기 버그
```

---

### 🌀 **(6) Symbol (ES6)**

- **유일하고 변경 불가능한 값**

```jsx
let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(id1 === id2); // false
```

✅ **실무:** 객체 프로퍼티의 **고유 키**로 활용

---

### 🔢 **(7) BigInt (ES2020)**

```jsx
let big = 123456789012345678901234567890n;
console.log(big * 2n);
```

📌 **용도:** 2^53-1 초과 큰 정수 처리

---

---

## 🏗️ **4️⃣ 참조 타입(Reference Types) 심화**

---

| 종류 | 특징 | 예시 |
| --- | --- | --- |
| Object | 키-값 쌍 | `{name: 'JS'}` |
| Array | 순서 있는 값 리스트 | `[1,2,3]` |
| Function | 실행 가능한 객체 | `function() {}` |
| Date, RegExp 등 | 내장 객체 |  |

---

### 🔍 **참조 타입 특징**

| 특성 | 설명 |
| --- | --- |
| Heap 저장 | 실제 값은 Heap, Stack에는 주소 |
| 얕은 복사 | 참조 값만 복사, 원본 영향 |
| Mutable | 내부 값 자유롭게 변경 가능 |

---

### 📌 **얕은 복사 문제 심화**

```jsx
let obj1 = {name: 'JS'};
let obj2 = obj1;
obj2.name = 'Changed';
console.log(obj1.name); // 'Changed'
```

✅ **깊은 복사 (Deep Copy)**

```jsx
let obj3 = structuredClone(obj1);
```

📌 **실무에서는 lodash `cloneDeep()`도 사용**

---

## 🔥 **5️⃣ 불변성(Immutable) vs 가변성(Mutable)**

| 타입 | 불변성 여부 | 수정 시 동작 |
| --- | --- | --- |
| 원시 타입 | 불변 | 새 값 생성, 기존 변경 불가 |
| 참조 타입 | 가변 | 원본 내부 속성 변경 가능 |

---

### **메모리 구조 시각화**

```
Primitive:
[ Stack ] → 값 자체 저장

Reference:
[ Stack ] → 주소 → [ Heap ] 실제 데이터
```

---

## 🎯 **6️⃣ 실무 & 면접 필살 포인트**

---

| 질문 | 핵심 |
| --- | --- |
| 원시 & 참조 타입 차이? | Stack vs Heap, 불변 vs 가변, 복사 차이 |
| typeof null 결과? | "object", JS 초기 버그 |
| 얕은 복사와 깊은 복사 차이? | 주소 공유 여부 |
| Truthy/Falsy 값 구분? | 실무에서 조건문 주의 필수 |
| 불변성 유지 왜 중요한가? | 상태 예측 가능, Redux 등에서 핵심 |

---

## 📝 **7️⃣  깔끔 정리**

---

### 📋 **자료형 정리표**

| 분류 | 타입 | 불변성 | 저장 위치 | 복사 |
| --- | --- | --- | --- | --- |
| 원시 타입 | Number, String, Boolean, undefined, null, Symbol, BigInt | 불변 | Stack | 값 복사 |
| 참조 타입 | Object, Array, Function 등 | 가변 | Heap(값), Stack(참조) | 얕은 복사 |

---

## 📝 **마무리 코드 예제**

```jsx
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <script>
        /*
        📌 1. 기본 자료형 (Primitive Type)
        1) number : 정수, 실수 구분이 없다
                    NaN (Not a Number) : 숫자가 아님
                    Infinity/-Infinity: +0/-0으로 나눈 값. 불능 값.
        2) string : 문자/문자열 구분이 없다. 작은따옴표(''), 큰따옴표("") 모두 사용 가능
        3) boolean : true/false
        4) null : 값이 "없음" (의도적으로 비워둠)
        5) undefined : 값이 저장된 적이 없다. 초기화되지 않은 상태의 변수임
        6) symbol (ES6) : 유일한 값 (심볼형)
        7) bigint (ES11) : 아주 큰 정수
        */

        console.log("📌 number 타입 예시");
        let num = 123;
        console.log(num, typeof num); // 123 'number'

        let float = 3.14;
        console.log(float, typeof float); // 3.14 'number'

        // NaN (숫자형인데 '숫자가 아님'❌)
        let invalidNum = 100 / "사과";
        console.log(invalidNum, typeof invalidNum); // NaN 'number'

        // Infinity / -Infinity
        console.log(1 / 0);  // Infinity
        console.log(-1 / 0); // -Infinity

        console.log("\n📌 string 타입 예시");
        let str1 = 'hello';
        let str2 = "world";
        console.log(str1, typeof str1); // hello 'string'
        console.log(str2, typeof str2); // world 'string'

        console.log("\n📌 boolean 타입 예시");
        let isTrue = true;
        let isFalse = false;
        console.log(isTrue, typeof isTrue);   // true 'boolean'
        console.log(isFalse, typeof isFalse); // false 'boolean'

        console.log("\n📌 null과 undefined 차이");
        let empty = null;
        let notAssigned;
        console.log(empty, typeof empty);       // null 'object' (자바스크립트의 오래된 설계 버그 🤯)
        console.log(notAssigned, typeof notAssigned); // undefined 'undefined'

        // 심볼, 빅인트 심화 예시
        console.log("\n📌 symbol, bigint 예시 (심화)");
        let sym = Symbol('unique');
        console.log(sym, typeof sym); // Symbol(unique) 'symbol'

        let big = 1234567890123456789012345678901234567890n;
        console.log(big, typeof big); // 'bigint'
    </script>

    <script>
        /*
        📌 2. 자바스크립트 변수의 특징
        1) 동적 타입 (Dynamically Typed) - 선언하지 않아도 변수 사용 가능 (❌ 추천X, 암묵적 전역변수됨)
        2) 변수 선언시 자료형 작성하지 않는다
        3) 변수에 저장된 값에 따라 자료형 결정됨 => 값이 수정되면 자료형 변경 가능
        */

        // var 키워드 사용 예시
        var a; // 선언 (초기화 X)
        console.log(a); // undefined

        var a; // 같은 이름으로 재선언 가능 (var의 특징!)
        a = 10;
        console.log(a, typeof a); // 10 'number'

        // 값 변경 → 자료형 변경
        a = "Hello world";
        console.log(a, typeof a); // Hello world 'string'

        // 변수 선언 없이 사용 (❌ 암묵적 전역 변수)
        b = false;
        console.log(b, typeof b); // false 'boolean'

        /*
        ⚠️ **중요**: 자바스크립트는 "동적 타입 언어"
        변수의 자료형이 값에 따라 바뀌므로 실수할 가능성이 큼!
        */
    </script>

    <script>
        /*
        📌 3. 변수 선언 키워드
        
        1) var
            (1) 범위 : 함수 레벨 (function scope)
            (2) 변수 선언 생략 가능 (❌ 권장하지 않음)
            (3) 같은 변수명으로 재선언 가능
            (4) 초기화 생략 가능 (undefined)
        
        2) let (ES6)
            (1) 범위 : 블록 레벨 {} (지역 변수)
            (2) 변수 선언 생략 ❌ 불가능 (무조건 let)
            (3) 같은 변수명 재선언 불가능
            (4) 초기화 생략 가능 (선언 후 undefined 상태, but TDZ 존재)
        
        3) const (ES6)
            (1) 범위 : 블록 레벨 {}
            (2) 선언 생략 ❌ 불가능
            (3) 같은 변수명 재선언 불가능
            (4) 초기화 생략 ❌ 불가능 (선언과 동시에 초기화 필수)
            (5) 값 변경 불가능 (상수)
        
        💡 const 객체나 배열의 경우 내부 값은 변경 가능!
        */

        console.log("\n📌 let 예시");
        let user = "user1";
        console.log(user, typeof user); // user1 'string'
        // let user = "user2"; // ❌ 중복 선언 불가

        console.log("\n📌 const 예시");
        const pw = "pw1";
        console.log(pw, typeof pw); // pw1 'string'
        // pw = "pw2"; // ❌ 값 변경 불가

        // 심화 const 객체 예시
        const person = { name: "철수" };
        person.name = "영희"; // 내부 값은 변경 가능!
        console.log(person);

        // const 배열 예시
        const arr = [1, 2, 3];
        arr.push(4);
        console.log(arr); // [1, 2, 3, 4]

    </script>

    <script>
        /*
        📌 4. 호이스팅 (Hoisting)
        
        자바스크립트는 코드 실행 전, "변수 선언"과 "함수 선언"을 코드 최상단으로 끌어올림!
        
        1) var는 선언만 끌어올려지고 초기화는 안 됨 (undefined)
        2) let, const는 호이스팅 되지만 TDZ(Temporal Dead Zone)에 빠짐 → 초기화 전 접근 시 에러
        */

        console.log("\n📌 var 호이스팅 예시");
        console.log(c); // undefined (선언은 올라감)
        var c;
        c = Math.sqrt(25); // Math 대소문자 수정!
        console.log(c, typeof c); // 5 'number'

        // console.log(userLet); // ❌ ReferenceError
        // let userLet = "호이스팅 테스트";

        /*
        ✅ 심화 개념: TDZ
        let, const로 선언된 변수는 선언 전 접근 시 에러 발생 (초기화 전, 사용 불가!)
        */

    </script>

    <script>
        /*
        📌 5. 변수의 범위 (Scope)
        
        1) var : 함수 레벨 스코프
        2) let, const : 블록 레벨 스코프
        */

        console.log("\n📌 var 스코프 예시");
        if (true) {
            var age = 10; // 함수 전체에서 접근 가능
        }
        console.log(age, typeof age); // 10 'number'

        console.log("\n📌 let, const 스코프 예시");
        if (true) {
            const hobby = "운동"; // 블록 레벨
            let name = "홍길동";
            console.log(hobby, name); // 정상 출력
        }
        // console.log(hobby, name); // ❌ ReferenceError (블록 밖 접근 불가)

    </script>

    <script>
        /*
        📌 6. 심화 예제 : var vs let 차이
        
        👉 var는 함수 전체에서 변수 공유 → 반복문에서 문제 발생 가능
        */

        console.log("\n📌 var 반복문 문제점");
        for (var i = 0; i < 3; i++) {
            setTimeout(() => console.log("var i:", i), 100);
        }
        // 결과: var i: 3, 3, 3 (i가 전역에서 공유됨)

        console.log("\n📌 let 반복문 개선");
        for (let i = 0; i < 3; i++) {
            setTimeout(() => console.log("let i:", i), 100);
        }
        // 결과: let i: 0, 1, 2 (각 블록마다 i 독립적으로 존재)

    </script>

</body>

</html>
```
