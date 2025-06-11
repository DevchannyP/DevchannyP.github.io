---
layout: post
title: "CHAP 5.🌐 객체(Object) & 프로토타입 "
date: 2025-05-17
categories: [frontend, core, javascript]
tags: [frontend, core, javascript]
thumbnail: /assets/img/post-thumbnails/intro5.png
author: Devchanny
---


# ** 📌 객체 생성 방식 완전 해부**

| 생성 방법 | 문법 | 특징 | 주의사항 |
| --- | --- | --- | --- |
| **객체 리터럴** | `{ key: value }` | 가장 간단, 즉석에서 객체 생성 | 메서드 공유 불가 (메모리 비효율) |
| **생성자 함수** | `function Person() {}` | 동일한 구조 객체 생성 가능, 프로토타입 사용 | `new` 안 쓰면 undefined 반환 |
| **Object.create()** | `Object.create(proto)` | 원하는 프로토타입 직접 지정 | 프로퍼티 추가 별도 필요 |
| **ES6 클래스** | `class Person {}` | 문법적 설탕, 내부는 여전히 프로토타입 | 실제 동작은 ES5 방식과 동일 |

---

### 📚 **예제 비교**

```jsx
// 1. 객체 리터럴
const obj = { name: 'JS' };

// 2. 생성자 함수
function Person(name) {
  this.name = name;
}
const p1 = new Person('Tom');

// 3. Object.create()
const proto = { greet() { console.log('Hello'); } };
const obj2 = Object.create(proto);
obj2.greet();

// 4. 클래스
class Animal {
  constructor(type) {
    this.type = type;
  }
  speak() {
    console.log(`${this.type} sound`);
  }
}
const dog = new Animal('Dog');
dog.speak();
```

---

### 🧠 **왜 생성자 함수 & 클래스가 프로토타입을 쓰나?**

- **객체 리터럴 → 매 객체마다 메서드 새로 생성 → 메모리 비효율**
- **생성자/클래스 → 공통 메서드를 프로토타입에 넣어 공유 → 효율적**

---

## 🔥 **2️⃣ 프로토타입 & 프로토타입 체인 심화**

---

### 📌 **핵심 용어 명확히 구분**

| 용어 | 위치 | 설명 |
| --- | --- | --- |
| `prototype` | **함수(생성자 함수 or 클래스)** | 해당 함수로 생성된 객체가 참조하는 프로토타입 객체 |
| `__proto__` | **모든 객체** | 실제 부모 객체의 `prototype`을 참조 |

---

### 🎯 **프로토타입 체인 시각화**

```
객체 → __proto__ → 생성자 함수의 prototype → Object.prototype → null
```

---

### 📚 **예제: 확인**

```jsx
javascript
복사편집
function Person(name) { this.name = name; }
Person.prototype.sayHi = function() { console.log(`Hi ${this.name}`); };

const p1 = new Person('Tom');

console.log(p1.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null

```

---

## 🚀 **3️⃣ 프로토타입 체인 탐색 흐름**

1. **객체 자신에서 프로퍼티/메서드 찾기**
2. **없으면 → `__proto__` → 부모 프로토타입으로 이동**
3. **Object.prototype까지 올라가도 없으면 → undefined**

---

---

## 🏗️ **4️⃣ ES5 vs ES6 상속 완벽 비교**

---

### 📜 **ES5: 프로토타입 기반 상속**

```jsx
function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function() {
  console.log(`${this.type} sound`);
};

function Dog(name) {
  Animal.call(this, 'Dog'); // super
  this.name = name;
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const d1 = new Dog('Max');
d1.speak(); // Dog sound
```

---

### 🦄 **ES6: class 기반 상속**

```jsx
class Animal {
  constructor(type) {
    this.type = type;
  }
  speak() {
    console.log(`${this.type} sound`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super('Dog');
    this.name = name;
  }
}

const d2 = new Dog('Buddy');
d2.speak(); // Dog sound

```

✅ **내부적으로 여전히 프로토타입 기반**

---

## 🧠 **5️⃣ 기술 면접 포인트 정리**

| 질문 | 답변 포인트 |
| --- | --- |
| `__proto__`와 `prototype` 차이? | `__proto__`: 객체의 내부 참조, `prototype`: 함수에만 존재 |
| 프로토타입 체인 동작? | 객체 → 부모 프로토타입 → 최종 `Object.prototype` |
| ES5 vs ES6 상속 차이? | ES5: 수작업 프로토타입 연결, ES6: 문법적 설탕 |
| 클래스가 프로토타입 기반인 이유? | 메서드 공유 최적화, 기존 JS 엔진 호환성 |
| 메서드 메모리 효율성? | 프로토타입에 저장 → 모든 인스턴스가 공유 |

---

---

## 📑 **6️⃣ 노션용 요약 정리**

---

### 📋 **객체 생성 방법 정리**

| 방식 | 문법 | 특징 | 주의 |
| --- | --- | --- | --- |
| 객체 리터럴 | `{}` | 직관적 | 메서드 공유 불가 |
| 생성자 함수 | `function(){}` | 재사용성, 프로토타입 명시 | `new` 안 쓰면 undefined |
| Object.create() | `Object.create(proto)` | 원하는 프로토타입 설정 | 프로퍼티 추가 필요 |
| 클래스 | `class` | 가독성, 상속 깔끔 | 내부는 프로토타입 |

---

### 📋 **프로토타입 핵심**

| 용어 | 설명 |
| --- | --- |
| `prototype` | 함수에 존재, 객체 생성 시 참조 |
| `__proto__` | 객체에 존재, 부모 프로토타입 연결 |
| 프로토타입 체인 | 객체 → 부모 → `Object.prototype` |

---

---

## 🔥 **7️⃣ 실무 & 면접 심화 확장 가능:**

1. **프로토타입 체인 도식화 자료**
2. **Prototype Pollution 보안 이슈**
3. **커스텀 Object.create 패턴 & 모듈화 패턴**
4. **클래스 private 필드 & Symbol 활용**
5. **면접 대비 - 프로토타입과 클래스 심층 질문 세트**

---

**필요하시면 바로 시각 자료, 실전 문제 세트, 마크다운으로 제공 가능해요!
추가로 심화 요청 주시면 바로 준비할게요! 🚀🔥**

### 🦄  객체 1

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 객체 심화 예제</title>

    <style>
        .area {
            background: lightgray;
            border: 1px solid black;
            width: 500px;
            margin-bottom: 10px;
            padding: 10px;
            white-space: pre-wrap; /* 줄바꿈 유지 */
        }
        .big { height: 500px; overflow-y: scroll; }
    </style>
</head>
<body>

    <h2>🟢 JavaScript 객체(Object) 심화 예제</h2>

    <div class="area big" id="outputArea"> <!-- 결과 출력 영역 --></div>

    <script>
        function objectExamples() {
            const output = document.getElementById("outputArea");

            /* ---------------------------------------------------
            ✅ 1. 객체 선언 기본 - 기초
            --------------------------------------------------- */
            const product = {
                name: "망고 피클",      // 🥭 상품 이름
                price: 4000,          // 💰 가격
                ingredients: ["망고", "설탕", "식초"], // 🧂 재료 (배열)
                isAvailable: true     // ✅ 판매 여부
            };

            output.innerHTML += "📦 기본 객체 선언:\n";
            output.innerHTML += JSON.stringify(product) + "\n\n";

            /* ---------------------------------------------------
            ✅ 2. 객체 속성 접근 - 점 표기법 & 대괄호 표기법
            --------------------------------------------------- */
            output.innerHTML += "🔑 점 표기법으로 접근: " + product.name + "\n";
            output.innerHTML += "🔑 대괄호 표기법으로 접근: " + product['price'] + "원\n\n";

            /* ---------------------------------------------------
            ✅ 3. 속성 추가, 수정, 삭제
            --------------------------------------------------- */
            product.origin = "필리핀"; // ➕ 속성 추가
            product.price = 4500;      // ✏️ 속성 수정
            delete product.isAvailable; // ❌ 속성 삭제
            output.innerHTML += "🛠️ 속성 추가/수정/삭제 후:\n" + JSON.stringify(product) + "\n\n";

            /* ---------------------------------------------------
            ✅ 4. 계산된 속성명 (동적 key)
            --------------------------------------------------- */
            const keyName = "special-offer";
            const dynamicProduct = {
                [keyName]: "세일 중",  // 🌀 대괄호 안에 변수 사용
                price: 3000
            };
            output.innerHTML += "⚙️ 계산된 속성명 사용:\n" + JSON.stringify(dynamicProduct) + "\n\n";

            /* ---------------------------------------------------
            ✅ 5. 객체 메서드 선언과 this 사용
            --------------------------------------------------- */
            const person = {
                firstName: "홍",
                lastName: "길동",
                fullName: function() { 
                    return `${this.firstName} ${this.lastName}`; // this로 자기 자신 참조
                }
            };
            output.innerHTML += "👤 메서드 사용: " + person.fullName() + "\n\n";

            /* ---------------------------------------------------
            ✅ 6. for...in 문으로 객체 반복
            --------------------------------------------------- */
            output.innerHTML += "🔁 for...in 반복:\n";
            for (let key in product) {
                output.innerHTML += `➡️ ${key}: ${product[key]}\n`;
            }
            output.innerHTML += "\n";

            /* ---------------------------------------------------
            ✅ 7. Object.keys, values, entries
            --------------------------------------------------- */
            output.innerHTML += "🗝️ Object.keys: " + JSON.stringify(Object.keys(product)) + "\n";
            output.innerHTML += "🔢 Object.values: " + JSON.stringify(Object.values(product)) + "\n";
            output.innerHTML += "📄 Object.entries:\n";
            Object.entries(product).forEach(([key, value]) => {
                output.innerHTML += `➡️ ${key}: ${value}\n`;
            });
            output.innerHTML += "\n";

            /* ---------------------------------------------------
            ✅ 8. 객체 복사 - 얕은 복사
            --------------------------------------------------- */
            const copy1 = Object.assign({}, product);
            const copy2 = { ...product }; // 스프레드 연산자
            output.innerHTML += "📋 얕은 복사(Object.assign): " + JSON.stringify(copy1) + "\n";
            output.innerHTML += "📋 얕은 복사(스프레드): " + JSON.stringify(copy2) + "\n\n";

            /* ---------------------------------------------------
            ✅ 9. 중첩 객체와 메서드에서의 this
            --------------------------------------------------- */
            const order = {
                orderId: 101,
                customer: {
                    name: "홍길동",
                    address: "서울"
                },
                total: 5000,
                summary() {
                    return `주문번호: ${this.orderId}, 고객: ${this.customer.name}, 총액: ${this.total}원`;
                }
            };
            output.innerHTML += "📄 중첩 객체 + 메서드 사용:\n" + order.summary() + "\n\n";

            /* ---------------------------------------------------
            ✅ 10. 객체 비구조화 할당 (Destructuring)
            --------------------------------------------------- */
            const { name, price } = product;
            output.innerHTML += `📦 비구조화 할당: 상품명 = ${name}, 가격 = ${price}원\n\n`;

            /* ---------------------------------------------------
            ✅ 11. 객체 깊은 복사 (deep copy)
            --------------------------------------------------- */
            const deepCopy = JSON.parse(JSON.stringify(order));
            deepCopy.customer.name = "임꺽정"; // 원본 영향 X
            output.innerHTML += "📌 깊은 복사 후 수정:\n";
            output.innerHTML += `원본 고객명: ${order.customer.name}, 복사 고객명: ${deepCopy.customer.name}\n\n`;

            /* ---------------------------------------------------
            ✅ 12. 객체 비교 특징
            --------------------------------------------------- */
            const objA = { a: 1 };
            const objB = { a: 1 };
            output.innerHTML += `⚠️ 객체 비교: objA === objB → ${objA === objB}\n`; // false (주소 다름)
            const objC = objA;
            output.innerHTML += `✅ 동일 참조 비교: objA === objC → ${objA === objC}\n`; // true
        }

        // 함수 실행
        objectExamples();
    </script>

</body>
</html>

```

### 🦄  객체 2

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JavaScript Object Deep Dive</title>
</head>
<body>

<script>
/************************************************
 * 🟢 [1] 객체 리터럴 방식 (가장 기본)
 ************************************************/
const product1 = {
  code: 'A1000',
  name: '음료수',
  price: 1000,
  showInfo: function() {
    console.log(`📦 [리터럴] 상품명: ${this.name}, 💰 가격: ${this.price}원`);
  }
};
product1.showInfo();

/************************************************
 * 🟢 [2] 생성자 함수 방식 (기초)
 ************************************************/
function Product(code, name, price) {
  this.code = code;
  this.name = name;
  this.price = price;
  // 비효율적 메서드 (각 객체마다 복사됨)
  this.showInfo = function() {
    console.log(`📦 [생성자 함수] 상품명: ${this.name}, 💰 가격: ${this.price}원`);
  };
}
let p1 = new Product('A1001', '치토스', 2000);
let p2 = new Product('A1002', '초콜릿', 1500);
p1.showInfo();
p2.showInfo();

/************************************************
 * 🟢 [3] 프로토타입으로 메서드 공유 (추천!)
 ************************************************/
function ProductProto(code, name, price) {
  this.code = code;
  this.name = name;
  this.price = price;
}
// ✅ 메서드를 프로토타입에 추가 → 모든 객체가 공유!
ProductProto.prototype.showInfo = function() {
  console.log(`📦 [프로토타입] 상품명: ${this.name}, 💰 가격: ${this.price}원`);
};
let p3 = new ProductProto('A1003', '쿠키', 1800);
let p4 = new ProductProto('A1004', '사탕', 1000);
p3.showInfo();
p4.showInfo();

/************************************************
 * 🟢 [4] ES6 클래스 문법 (가독성 좋음, 추천!)
 ************************************************/
class ProductClass {
  constructor(code, name, price) {
    this.code = code;
    this.name = name;
    this.price = price;
  }
  showInfo() {
    console.log(`📦 [클래스] 상품명: ${this.name}, 💰 가격: ${this.price}원`);
  }
}
let p5 = new ProductClass('A1005', '라면', 1200);
p5.showInfo();

/************************************************
 * 🟢 [5] 클래스 상속 (부모 → 자식)
 ************************************************/
class DiscountProduct extends ProductClass {
  constructor(code, name, price, discountRate) {
    super(code, name, price); // 부모 호출
    this.discountRate = discountRate; // 추가 속성
  }
  getDiscountedPrice() {
    const discounted = this.price * (1 - this.discountRate / 100);
    console.log(`💸 할인 적용가: ${discounted}원`);
    return discounted;
  }
}
let dp1 = new DiscountProduct('A2001', '피자', 10000, 20);
dp1.showInfo();
dp1.getDiscountedPrice();

/************************************************
 * 🟢 [6] 정적 메서드 (클래스 자체에서 호출)
 ************************************************/
class Utility {
  static sayHello() {
    console.log('👋 안녕하세요! (정적 메서드)');
  }
}
Utility.sayHello(); // 객체 생성 없이 호출 가능

/************************************************
 * 🟢 [7] 객체 비교 (참조형 비교 주의)
 ************************************************/
let obj1 = new ProductClass('A1006', '과자', 2200);
let obj2 = new ProductClass('A1006', '과자', 2200);
console.log('🔸obj1 === obj2 ?', obj1 === obj2); // false (다른 메모리)

let obj3 = obj1; // 참조 복사
console.log('🔸obj1 === obj3 ?', obj1 === obj3); // true (같은 참조)

/************************************************
 * 🟢 [8] 동적 속성 추가 & 삭제
 ************************************************/
obj1.category = '식품'; // 추가
console.log('🔸obj1에 category 추가:', obj1);
delete obj1.category; // 삭제
console.log('🔸obj1에서 category 삭제:', obj1);

/************************************************
 * 🟢 [9] 고급: 객체 속성 열거 & 키/값 접근
 ************************************************/
console.log('🔍 객체의 속성 열거 (for...in):');
for (let key in obj2) {
  console.log(`🔑 ${key} : ${obj2[key]}`);
}

// 키/값 배열로
console.log('📋 Object.keys:', Object.keys(obj2));
console.log('📋 Object.values:', Object.values(obj2));
console.log('📋 Object.entries:', Object.entries(obj2));

/************************************************
 * 🟢 [10] 고급: 객체 복사 (얕은 복사 vs 깊은 복사)
 ************************************************/
const original = { code: 'X1', name: '스낵', price: 1500, details: { origin: 'Korea' } };

// 얕은 복사 (참조 공유)
const shallowCopy = { ...original };
shallowCopy.details.origin = 'USA';
console.log('🔸원본 객체:', original); // origin도 바뀜 (참조 공유)

// 깊은 복사 (JSON 사용)
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.details.origin = 'Japan';
console.log('🔸원본 객체 (깊은 복사 후):', original);
console.log('🔸깊은 복사 객체:', deepCopy);

</script>

</body>
</html>

```
