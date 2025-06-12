---
layout: post
title: "CHAP 2. 파라미터 매핑 고급 이해"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro3.png
author: Devchanny
---


# ** 📌 2.1단계: parameterType의 작동 원리  ** 

---

## 🔍 목표 요약

| 전달 방식 | 설명 | 사용 예 |
| --- | --- | --- |
| 단일 값 | 기본형 또는 문자열 하나 전달 | `int`, `String`, 등 |
| Map 객체 | `Map<String, Object>`로 key-value 전달 | 여러 조건 있을 때 유용 |
| DTO 객체 | 자바 객체 전체 전달 | `Student`처럼 필드가 많은 경우 |

---

## ✅ 1) 단일 값 전달 방식

### 💡 예: 학년(grade)이 일치하는 학생 조회

### 🔧 매퍼 XML 예시 (`StudentMapper1.xml`에 추가 가능)

```xml
<select id="getStudentsByGrade" parameterType="int" resultType="main.Student">
  SELECT * FROM student WHERE grade = #{grade}
</select>
```

### 🔧 Java 호출 코드 예시

```java
List<Student> list = session.selectList("student.getStudentsByGrade", 1);
```

- `#{grade}`는 파라미터 이름으로, 단일 값을 그대로 매핑
- `parameterType="int"`을 통해 정수형 값 하나를 받는다고 명시

---

## ✅ 2) Map 전달 방식

### 💡 예: 이름 + 학년으로 검색할 때

### 🔧 매퍼 XML 예시

```xml
<select id="searchStudentByNameAndGrade" parameterType="map" resultType="main.Student">
  SELECT * FROM student
  WHERE irum = #{irum} AND grade = #{grade}
</select>
```

### 🔧 Java 호출 코드

```java
Map<String, Object> param = new HashMap<>();
param.put("irum", "김민수");
param.put("grade", 1);

List<Student> list = session.selectList("student.searchStudentByNameAndGrade", param);
```

- `Map`의 키와 `#{}` 안의 이름이 같아야 함
- 다중 조건 필터링에 아주 유용

---

## ✅ 3) 객체 전달 방식

### 💡 예: `Student` 객체 자체로 검색

### 🔧 매퍼 XML 예시

```xml
<select id="searchStudentByObject" parameterType="main.Student" resultType="main.Student">
  SELECT * FROM student
  WHERE irum = #{irum} AND grade = #{grade}
</select>
```

### 🔧 Java 호출 코드

```java
Student s = new Student();
s.setIrum("이영희");
s.setGrade(2);

List<Student> list = session.selectList("student.searchStudentByObject", s);
```

- `parameterType="main.Student"`: 객체 전체 전달
- `#{irum}`, `#{grade}`는 객체 필드명과 일치해야 함

---

## 🧠 정리 요약

| 전달 방식 | parameterType 값 | Java 전달 예 | 특징 |
| --- | --- | --- | --- |
| 단일 값 | `int`, `String` 등 | `selectList("id", 1)` | 가장 간단 |
| Map | `map` | `selectList("id", Map)` | 유연한 다중 조건 |
| 객체 | 클래스 경로 | `selectList("id", new Student())` | 필드명 매핑 자동 처리 |

---

## 🧪 네 프로젝트 적용 예시 (추천 확장)

| ID | 설명 | 추천 방식 |
| --- | --- | --- |
| `getStudentsByGrade` | 특정 학년 조회 | 단일 값 (`int`) |
| `searchStudentByNameAndGrade` | 이름 + 학년 복합 조건 | `Map` |
| `searchStudentByObject` | DTO 기반 필터링 | 객체 (`Student`) |

---

## ✅ 실습 추가 팁

- `parameterType`은 생략 가능하지만 **명시하면 유지보수에 좋음**
- `#{}` 내부 이름은 Java에서 넘긴 변수명, 객체 필드명, Map 키명과 반드시 일치해야 함
- 여러 값을 조건으로 걸 땐 **Map** 또는 **객체 방식**이 확실히 깔끔하고 유연함


✅ 2.2단계: SQL 조건절과 파라미터 매핑 실습

(📂 `StudentMapper1.xml` 확장 기반)

---

### 🎯 학습 목표

- `#{}` 구문이 SQL에서 어떻게 활용되는지 이해
- 전달받은 단일 값, Map, DTO 객체를 WHERE 조건절에 활용하는 법 학습
- 잘못된 파라미터 매핑 시 오류 원인을 파악할 수 있도록 하기

---

## ✅ 1) 단일 파라미터 + WHERE 조건절 실습

### 🔧 매퍼 XML 예시 (`StudentMapper1.xml`에 추가 가능)

```xml
<select id="getStudentsByGrade" parameterType="int" resultType="main.Student">
  SELECT * FROM student
  WHERE grade = #{grade}
</select>
```

### 🔧 Java 호출 코드

```java
List<Student> list = session.selectList("student.getStudentsByGrade", 1);
```

### 🧠 작동 원리

- `#{grade}`는 **Java에서 넘긴 int 값(1)**을 안전하게 SQL에 바인딩
- `parameterType="int"`은 선택적으로 명시 가능

---

## ✅ 2) 다중 파라미터(Map) + 조건절

### 🔧 매퍼 XML

```xml
<select id="searchStudentByNameAndGrade" parameterType="map" resultType="main.Student">
  SELECT * FROM student
  WHERE irum = #{irum}
  AND grade = #{grade}
</select>
```

### 🔧 Java 호출 코드

```java
Map<String, Object> param = new HashMap<>();
param.put("irum", "김민수");
param.put("grade", 1);

List<Student> list = session.selectList("student.searchStudentByNameAndGrade", param);
```

### 🧠 작동 원리

- `#{irum}` → `"김민수"`
- `#{grade}` → `1`
- `Map`의 key 이름과 `#{}` 내부 이름이 반드시 일치해야 함

---

## ✅ 3) 객체 파라미터 + 조건절

### 🔧 매퍼 XML

```xml
<select id="searchStudentByObject" parameterType="main.Student" resultType="main.Student">
  SELECT * FROM student
  WHERE irum = #{irum}
  AND grade = #{grade}
</select>

```

### 🔧 Java 호출 코드

```java
Student s = new Student();
s.setIrum("이영희");
s.setGrade(2);

List<Student> list = session.selectList("student.searchStudentByObject", s);
```

### 🧠 작동 원리

- `#{irum}` → `s.getIrum()`
- `#{grade}` → `s.getGrade()`
- **객체의 필드명을 그대로 `#{}` 안에 써야 함**

---

## ✅ 🔍 실전에서 자주 나오는 조건절 매핑 패턴

| 조건 유형 | SQL 예시 | MyBatis 예시 |
| --- | --- | --- |
| 문자열 비교 | `WHERE irum = '김민수'` | `WHERE irum = #{irum}` |
| 부분 검색 | `WHERE irum LIKE '김%'` | `WHERE irum LIKE CONCAT(#{keyword}, '%')` |
| 범위 | `WHERE grade BETWEEN 1 AND 3` | `WHERE grade BETWEEN #{min} AND #{max}` |
| 복합 조건 | `WHERE irum = '김' AND grade = 1` | `WHERE irum = #{irum} AND grade = #{grade}` |

---

## ✅ SQL 조건절 바인딩 오류 유형 예시

| 증상 | 원인 | 해결 방법 |
| --- | --- | --- |
| SQL 구문 오류 | `#{}`가 아닌 `${}` 사용 | SQL 인젝션 우려 → `#{}` 사용 권장 |
| 값이 null인데 필터 조건 포함 | null-safe 조건 필요 | `if` 사용하여 조건 분기 처리 |
| `#{}` 안 이름이 Java 필드/Map key와 불일치 | 매핑 실패 | 정확히 동일한 이름 사용 필요 |

---

## ✅ 정리 요약

| 포인트 | 설명 |
| --- | --- |
| `#{}` | Java 값 → 안전하게 SQL에 전달 (PreparedStatement) |
| `parameterType` | Java에서 전달하는 값의 자료형 명시 |
| WHERE 조건절 | `#{}`로 Java 값과 매핑해서 동적으로 조건 설정 |
| 오류 방지 | `Map` key 또는 객체 필드명과 반드시 일치해야 함 |

---

## 🧪 실습 체크리스트

- [x]  `parameterType`이 정확한가?
- [x]  `#{}` 안의 이름이 Java 전달값과 일치하는가?
- [x]  콘솔에서 실행된 SQL 로그 확인해보기 (log4j 활성화 시)


✅ 2.3단계: MyBatis SQL 로그 출력 설정 (Log4j 적용 실습)


---

## 🎯 목표 요약

| 항목 | 설명 |
| --- | --- |
| 목적 | SQL 실행 로그 + 파라미터를 콘솔에서 확인 |
| 사용 도구 | Log4j (MyBatis가 지원하는 대표 로깅 프레임워크) |
| 설정 위치 | `src/log4j.properties` 또는 `src/resources/log4j.xml` |
| 확인 항목 | 실행된 SQL 문장, 바인딩된 실제 값, 에러 발생 시 위치 |

---

## ✅ 1. 로그 출력 설정 준비

### ✅ 필요한 JAR 파일 (너의 `lib` 폴더에 있어야 함)

| 파일명 | 설명 |
| --- | --- |
| `log4j-1.2.17.jar` | 로그 출력 핵심 라이브러리 |
| `slf4j-api-*.jar` | 로깅 인터페이스 |
| `slf4j-log4j12-*.jar` | slf4j → log4j 연결 어댑터 |

> 📂 경로: WebContent/WEB-INF/lib/
> 
> 
> ✅ 너의 zip 파일 안에 이 JAR들이 이미 존재했는지 확인 후, 없으면 수동 추가 필요
> 

---

## ✅ 2. `log4j.properties` 설정 파일 만들기

📄 파일 생성 위치: `src/log4j.properties`

```
# 기본 로그 레벨 설정
log4j.rootLogger=DEBUG, stdout

# 콘솔 출력 설정
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%p] %c - %m%n

# MyBatis SQL 로그 확인
log4j.logger.org.apache.ibatis=DEBUG
log4j.logger.java.sql=DEBUG
log4j.logger.java.sql.Connection=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.PreparedStatement=DEBUG
```

---

## ✅ 3. 로그 확인 예시

예를 들어 다음 쿼리를 실행했을 때:

```java
Student s = new Student();
s.setIrum("이영희");
s.setGrade(2);
List<Student> list = session.selectList("student.searchStudentByObject", s);
```

✅ 로그 예시 (콘솔 출력)

```
2025-04-17 10:12:45 [DEBUG] org.apache.ibatis.logging - ==>  Preparing: SELECT * FROM student WHERE irum = ? AND grade = ?
2025-04-17 10:12:45 [DEBUG] org.apache.ibatis.logging - ==> Parameters: 이영희(String), 2(Integer)
```

---

## ✅ 4. 로그가 출력되지 않을 경우 체크사항

| 증상 | 원인 | 해결 방법 |
| --- | --- | --- |
| 콘솔에 아무 로그도 안 나옴 | log4j.properties 위치가 classpath 밖 | `src` 폴더에 정확히 위치해야 함 |
| 에러만 출력되고 SQL은 안 나옴 | `org.apache.ibatis` 로그 레벨 누락 | `DEBUG` 설정 필수 |
| 로그가 깨짐 | 패턴 설정 오류 | `ConversionPattern` 다시 확인 |

---

## ✅ 실습 체크리스트

- [x]  `log4j.properties`는 `src`에 정확히 위치했는가?
- [x]  `mybatis-config.xml`과 로그 설정이 충돌하지 않는가?
- [x]  로그에 `Preparing`, `Parameters`가 출력되는가?
- [x]  에러 발생 시 위치와 SQL도 함께 보이는가?

---

## ✅ 정리 요약

| 항목 | 설명 |
| --- | --- |
| log4j 설정 | 콘솔 로그 확인용 |
| logger 설정 | `org.apache.ibatis`, `java.sql.PreparedStatement` 등 |
| 확인할 로그 | Preparing(쿼리), Parameters(파라미터) |
| 위치 | 반드시 `src/log4j.properties`에 있어야 함 |


✅ 2.4단계: #{} vs ${} 차이 & SQL Injection 방지 실습

(📂 `StudentMapper1.xml` 적용 가능)

---

## 🎯 목표 요약

| 항목 | 설명 |
| --- | --- |
| 목적 | `#{}`와 `${}`의 **차이점**과 **보안 위험성**을 이해 |
| 보안 | SQL Injection을 방지하는 안전한 방법 익히기 |
| 실습 | 정적 바인딩 vs 동적 문자열 삽입의 차이 비교 |

---

## ✅ 1. `#{}` vs `${}` 차이 핵심 요약

| 항목 | `#{}` | `${}` |
| --- | --- | --- |
| 의미 | **PreparedStatement의 파라미터 바인딩** | **SQL 문자열 치환** |
| 처리 방식 | ? 로 치환되어 서버에서 값 바인딩 | SQL에 문자열 직접 삽입 |
| 보안 | **SQL Injection 방지 가능** | ⚠️ SQL Injection 위험 높음 |
| 용도 | 일반 조건절 값 바인딩 | 컬럼명, 테이블명, ORDER BY 같은 구조 조립 시만 사용 |

---

## ✅ 2. 실습 예제 비교

### 🛡 안전한 방식 – `#{}` (권장)

```xml
<select id="getStudentByName" parameterType="string" resultType="main.Student">
  SELECT * FROM student WHERE irum = #{irum}
</select>
```

```java
String name = "이영희";
List<Student> list = session.selectList("student.getStudentByName", name);
```

✅ 출력 로그 예시 (log4j 설정 시)

```
Preparing: SELECT * FROM student WHERE irum = ?
Parameters: 이영희(String)
```

---

### ⚠️ 위험한 방식 – `${}` (SQL Injection 가능)

```xml
<select id="getStudentByNameUnsafe" parameterType="string" resultType="main.Student">
  SELECT * FROM student WHERE irum = '${irum}'
</select>
```

```java
String name = "' OR '1'='1";
List<Student> list = session.selectList("student.getStudentByNameUnsafe", name);
```

❗ 실행되는 SQL 예:

```sql
SELECT * FROM student WHERE irum = '' OR '1'='1'
```

➡️ **모든 데이터가 조회됨 → SQL Injection 공격 성공**

---

## ✅ 3. 컬럼명에 `${}` 쓰는 안전한 예 (정적 구조 조립용)

```xml
<select id="getStudentsSorted" parameterType="string" resultType="main.Student">
  SELECT * FROM student ORDER BY ${sortColumn}
</select>

```

```java
String sortColumn = "grade"; // 외부 입력이면 반드시 화이트리스트 체크!
List<Student> list = session.selectList("student.getStudentsSorted", sortColumn);
```

✅ 주의:

- `sortColumn` 값은 `"hakbun"`, `"grade"` 등 **사전 검증된 값만 허용**해야 함
- 사용자가 직접 입력한 문자열을 `${}`에 넣는 건 매우 위험

---

## ✅ 실습 체크리스트

| 항목 | 확인 여부 |
| --- | --- |
| WHERE 조건, 값 비교에는 무조건 `#{}` 사용 | ✅ |
| `${}`는 구조적 조립에서만 제한적으로 사용 | ✅ |
| 외부 문자열이 `${}`에 들어가지 않도록 필터링 | ✅ |
| 로그 출력 시 `Preparing:` → `?` 사용되는지 확인 | ✅ |

---

## ✅ 정리 요약

| 항목 | `#{}` | `${}` |
| --- | --- | --- |
| 내부 동작 | ? 로 치환 + 안전한 값 바인딩 | 문자열 직접 삽입 (치환) |
| SQL Injection | **방지 가능 (권장)** | **위험 매우 높음** |
| 사용 위치 | WHERE, SET, INSERT VALUES 등 값 바인딩 | 테이블명/컬럼명 조립 시만 |
| 예시 | `WHERE name = #{name}` | `ORDER BY ${column}` |

---

## 🧠 실무 보안 팁

- `${}`는 사용자 입력을 절대 직접 넣지 말 것!
- 반드시 서버 코드에서 허용된 값만 넘기도록 필터링
- log4j로 SQL 로그 출력해서 실제 SQL 확인하며 디버깅할 것
