---
layout: post
title: "CHAP 7. 예외 처리 및 고급 에러 디버깅"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro7.png
author: Devchanny
---


# ** 📌7.1단계: try-catch, finally 구조 – DB 연결 실패, 쿼리 실패 처리 실습 ** 



(📂 `StudentDao.java`, `SqlSession` 사용 기준)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | DB 연결 실패 또는 SQL 실행 오류 시 안정적인 처리 |
| 핵심 개념 | `try-catch-finally`, `session.commit()` 시점, `rollback()` |
| 기대 효과 | 서비스 안정성 확보, 오류 추적 로그 출력, 연결 누수 방지 |

---

## ✅ 1. 기본 구조: SqlSession 처리 방식

### 🔹 기존 코드 (에러 처리 없음)

```java
SqlSession session = factory.openSession();
List<Student> list = session.selectList("student.getAllStudents");
session.close();
```

👉 **문제점**: 쿼리 실패 시 로그도 안 남고, session이 닫히지 않아 리소스 누수 발생 가능

---

## ✅ 2. 실전용 예외 처리 구조

```java
public List<Student> selectAll() {
    SqlSession session = null;
    List<Student> list = null;

    try {
        session = factory.openSession();  // DB 연결
        list = session.selectList("student.getAllStudents");  // 쿼리 실행
    } catch (Exception e) {
        System.out.println("❌ 학생 목록 조회 실패: " + e.getMessage());
        e.printStackTrace();  // 로그로 예외 원인 출력
    } finally {
        if (session != null) session.close();  // 반드시 닫아줌
    }

    return list;  // 실패 시 null 반환
}
```

---

## ✅ 3. INSERT/UPDATE/DELETE 시 예외 처리

```java
public int insert(Student s) {
    SqlSession session = null;
    int result = 0;

    try {
        session = factory.openSession();
        result = session.insert("student.insertStudent", s);
        session.commit();  // 정상 처리 시 커밋
    } catch (Exception e) {
        System.out.println("❌ 학생 등록 중 오류 발생");
        e.printStackTrace();
        if (session != null) session.rollback();  // 예외 발생 시 롤백
    } finally {
        if (session != null) session.close();
    }

    return result;
}
```

---

## ✅ 4. 예외 상황별 처리 전략

| 상황 | 처리 방법 |
| --- | --- |
| DB 연결 불가 (session = null) | `catch`에서 연결 오류 메시지 출력 |
| SQL 문법 오류 | `e.printStackTrace()`로 SQL 위치 파악 |
| 중복 키 등 데이터 오류 | `session.rollback()`으로 트랜잭션 취소 |
| 로그 미출력 | log4j 또는 SLF4J 연동 필요 |

---

## ✅ 5. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| 모든 DAO 메서드에 try-catch-finally가 적용되어 있는가 | ✅ |  |
| 커밋이 필요한 경우 `commit()` 호출 후 예외 발생 시 `rollback()`도 있는가 | ✅ |  |
| `session`은 항상 `finally`에서 닫히는가 | ✅ |  |
| 예외 메시지가 사용자/로그에 구분되어 출력되는가 | ✅ |  |

---

## ✅ 실무 팁

| 항목 | 팁 |
| --- | --- |
| 모든 DB 처리에는 **예외 방어 코드** 필수 |  |
| `rollback()`은 INSERT/UPDATE/DELETE만 필요 (SELECT는 불필요) |  |
| 로그 프레임워크 연동 시 `logger.error(e)`로 변경 |  |
| `try-with-resources` 구문으로 session 자동 close도 가능 (Java 7+) |  |

---

## ✅ 확장 학습 (실무 연습용)

| 시나리오 | 연습 방법 |
| --- | --- |
| 학번 중복으로 INSERT 실패 | `Duplicate entry` 예외 확인 |
| WHERE 조건 불일치로 UPDATE 실패 | 영향 행 수 0 확인 |
| SQL 문법 오류 | 오타 포함된 쿼리 실행 → 예외 발생 로그 확인 |


✅ 7.2단계: SQL 예외 메시지 분석법 – 오류 로그 분석 실전

(📂 `StudentDao.java` 기반, JDBC + MyBatis 에러 로그 중심)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 콘솔에 출력된 SQL 오류 메시지를 해석하고 원인 파악 |
| 대상 | 쿼리 문법 오류, 바인딩 오류, 컬럼 불일치, 중복키 오류 등 |
| 기대 효과 | 실무에서 DB 오류 원인 파악 속도 대폭 향상 |

---

## ✅ 1. MyBatis 에러 메시지 구조 이해

> 💡 대부분 다음과 같은 패턴으로 출력돼
> 

```
### Error querying database. Cause: java.sql.SQLSyntaxErrorException: ...
### The error may exist in mapper/StudentMapper.xml
### The error occurred while executing a query
### SQL: SELECT * FROM student WHERE hakbun = #{studentId}
### Cause: java.sql.SQLSyntaxErrorException: Unknown column 'studentId' in 'where clause'
```

| 로그 행 | 의미 |
| --- | --- |
| `### Error querying database` | MyBatis 쿼리 실행 오류 |
| `Cause:` | JDBC가 발생시킨 구체적 예외 (`SQLSyntaxErrorException`, `IntegrityConstraintViolationException` 등) |
| `The error may exist in ...` | 어느 XML에서 문제 발생했는지 표시 |
| `SQL:` | 실제 실행된 SQL (바인딩 전) |
| `Cause:` | DB에서 받은 최종 오류 메시지 |

---

## ✅ 2. 실전 예외 사례별 분석

---

### ❌ ① SQL 문법 오류 (SyntaxError)

```
Cause: java.sql.SQLSyntaxErrorException: You have an error in your SQL syntax
SQL: SELECT * FORM student WHERE grade = ?
```

🔍 원인: `FROM` 오타 → `FORM`

✅ 해결: 오타 수정

---

### ❌ ② 컬럼 오타

```
SQLSyntaxErrorException: Unknown column 'phnne' in 'field list'
```

🔍 원인: SQL이나 DTO에 없는 컬럼명 사용

✅ 해결: DB 스키마 또는 DTO, SQL에서 `phnne → phone` 으로 수정

---

### ❌ ③ 바인딩 오류 (MyBatis)

```
org.apache.ibatis.binding.BindingException: Parameter 'hakbun' not found. Available parameters are [id]
```

🔍 원인: XML에서는 `#{hakbun}`인데 Java에서는 `param.put("id", 1001)` 처럼 이름이 다름

✅ 해결: XML의 파라미터명과 Java의 전달 키(key)/필드명이 **정확히 일치**해야 함

---

### ❌ ④ 중복키 오류

```
Cause: java.sql.SQLIntegrityConstraintViolationException: Duplicate entry '1001' for key 'PRIMARY'
```

🔍 원인: PRIMARY KEY인 `hakbun`에 이미 존재하는 값 삽입 시도

✅ 해결: 중복 여부 먼저 확인하거나 auto_increment 적용

---

### ❌ ⑤ ResultType 매핑 오류

```
java.lang.IllegalArgumentException: Result Maps collection does not contain value for studentResultMap
```

🔍 원인: `<select resultMap="studentResultMap">` 사용했는데, 위에 `resultMap` 정의가 없음

✅ 해결: `<resultMap id="studentResultMap">`가 선언되어 있어야 함

---

## ✅ 3. 실습 체크리스트

| 항목 | 설명 | 체크 |
| --- | --- | --- |
| 콘솔에서 SQL 오류 메시지를 캡처했는가 | ✅ |  |
| XML 위치, SQL 문, 바인딩 변수 등을 정확히 추적했는가 | ✅ |  |
| 오류 원인을 명확히 식별하고 해결 포인트를 정리했는가 | ✅ |  |
| 동일 오류가 반복되지 않도록 구조를 개선했는가 | ✅ |  |

---

## ✅ 4. 실무 팁

| 항목 | 팁 |
| --- | --- |
| `log4j` 설정은 필수 → SQL, 파라미터 로그 함께 출력됨 |  |
| `SQLSyntaxErrorException`은 쿼리 구조 자체 문제 |  |
| `BindingException`은 XML ↔ 자바 파라미터 불일치 문제 |  |
| `IntegrityConstraintViolationException`은 중복 키 또는 외래키 오류 |  |
| MySQL Workbench에서 수동 실행해보며 SQL 확인도 병행 |  |

---

## ✅ 확장 학습 예시

| 예외 상황 | 연습 방법 |
| --- | --- |
| 컬럼 오타 | SELECT phnne FROM student |
| 없는 resultMap 호출 | resultMap id 오타 intentionally 유발 |
| DTO 필드명 변경 | Student.java의 `phone`을 `tel`로 변경 후 실행 |


✅ 7.3단계: NullPointerException 방지 패턴


(📂 `StudentDao.java` + `StudentMapper.xml` + Controller 연동 기준)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | `selectOne`, `selectList` 결과가 `null`일 때 안전하게 처리 |
| 주요 개념 | `null 체크`, `Optional 패턴`, `결과 유무 분기 처리` |
| 기대 효과 | 서비스 다운 방지, 사용자에게 친절한 메시지 제공, NullPointerException 예방 |

---

## ✅ 1. 가장 흔한 예외 상황 예시

```java
Student s = mapper.getStudentByHakbun(9999);
System.out.println("이름: " + s.getIrum());  // ❌ 여기서 NullPointerException 발생 가능
```

🔍 원인: 학번 9999번이 존재하지 않아서 `null`이 리턴됨

---

## ✅ 2. 안전한 처리 방식 예시 (기본 패턴)

### 🔹 방법 1: `null` 체크 후 분기

```java
Student s = mapper.getStudentByHakbun(9999);

if (s != null) {
    System.out.println("이름: " + s.getIrum());
} else {
    System.out.println("❗ 조회 결과가 없습니다.");
}
```

> 💡 selectOne() 결과는 찾는 데이터가 없을 경우 null 반환되므로 항상 체크해야 함.
> 

---

### 🔹 방법 2: Optional 패턴 (Java 8+)

```java
Optional.ofNullable(mapper.getStudentByHakbun(9999))
        .ifPresentOrElse(
            stu -> System.out.println("이름: " + stu.getIrum()),
            () -> System.out.println("❗ 해당 학번 학생 없음")
        );
```

> 실무에서는 Optional<Student>로 리턴하도록 설계하는 것도 가능 (Spring 환경 등)
> 

---

## ✅ 3. Controller + JSP 연동 시 안전처리 흐름

```java
Student s = dao.selectByHakbun(9999);

if (s == null) {
    request.setAttribute("msg", "해당 학생이 존재하지 않습니다.");
    request.getRequestDispatcher("/error.jsp").forward(request, response);
} else {
    request.setAttribute("student", s);
    request.getRequestDispatcher("/student_detail.jsp").forward(request, response);
}
```

---

## ✅ 4. `selectList()` 결과가 빈 리스트일 경우

```java
List<Student> list = mapper.getAllStudents();

if (list == null || list.isEmpty()) {
    System.out.println("❗ 학생 데이터가 없습니다.");
} else {
    for (Student s : list) {
        System.out.println(s.getHakbun() + " / " + s.getIrum());
    }
}
```

✅ `selectList()`는 기본적으로 빈 리스트를 반환하지만,

MyBatis 설정에 따라 `null`이 될 수도 있으므로 **`null || isEmpty()`** 를 함께 쓰는 것이 안정적이야.

---

## ✅ 5. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| `selectOne()` 결과가 null일 수 있음을 가정하고 대응하는가 | ✅ |  |
| `null` 검사 없이 getter 호출하는 코드가 없는가 | ✅ |  |
| `selectList()` 결과가 빈 리스트일 때도 예외 없이 출력 가능한가 | ✅ |  |
| 사용자에게는 '조회 결과 없음' 메시지를 명확히 전달하는가 | ✅ |  |

---

## ✅ 실무 팁

| 상황 | 대응 방법 |
| --- | --- |
| select 결과가 없는데 getter 호출 시 | `NullPointerException` 발생 → 반드시 `null` 체크 |
| JSP에서 `${student.irum}` 출력 시 null이면? | JSTL `<c:if test="${empty student}">`로 방어 가능 |
| 대량 데이터 조회 결과 없음 | `"검색된 결과가 없습니다"` 메시지 띄우기 필수 |
| API 응답 | null 대신 `{ "data": null, "message": "학생 없음" }` 등의 포맷 권장 |

---

## ✅ 확장 학습: 예외 UX 설계

| 목표 | 실습 방법 |
| --- | --- |
| null 결과 시 사용자에게 안내 메시지 표시 | JSP + `<c:if>` + `${empty}` 활용 |
| 서비스 장애 방지 | 모든 DAO 메서드에 `null` 방어 추가 |
| 로그 출력도 함께 구성 | null 반환 시 `logger.info("학생 없음")` |

✅ 7.4단계: XML 매퍼 문법 오류 디버깅

(📂 StudentMapper1.xml, StudentMapper.xml 중심)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | XML Mapper 작성 시 발생할 수 있는 문법 오류를 사전에 방지 또는 빠르게 디버깅 |
| 대상 | 오타, 누락, 경로 오류, 태그 순서 오류 등 |
| 기대 효과 | XML 오류 발생 시 원인을 빠르게 찾고 수정할 수 있는 능력 확보 |

---

## ✅ 1. 매퍼 문법 오류의 대표 증상 5가지

| 증상 | 로그 메시지 예시 | 원인 분석 |
| --- | --- | --- |
| ❌ XML 파싱 실패 | `org.apache.ibatis.exceptions.PersistenceException: Error parsing SQL Mapper Configuration.` | `DTD` 누락, 태그 누락, XML 깨짐 |
| ❌ Mapper ID 불일치 | `Parameter 'id' not found. Available parameters are ...` | XML ID 이름 오타 또는 Java 쪽 ID 오타 |
| ❌ resultType 불일치 | `Could not set property 'irum' on class main.Student` | DTO 필드명과 컬럼명이 다름 |
| ❌ SQL 문법 오류 | `SQLSyntaxErrorException: Unknown column` | 컬럼명 오타 or 존재하지 않는 테이블 |
| ❌ include refid 오류 | `org.apache.ibatis.builder.IncompleteElementException: Could not find SQL statement to include with refid` | `<sql id="...">` 정의 없음 or 순서 오류 |

---

## ✅ 2. Common Error Checklist (현업 기반 정리)

| 구분 | 체크 항목 | 예시 / 설명 |
| --- | --- | --- |
| ✅ XML 기본 구조 | `<!DOCTYPE mapper ...>` 선언이 있는가? | DTD 누락 시 파싱 오류 |
| ✅ 네임스페이스 | `<mapper namespace="...">`에 정확한 경로가 들어있는가? | Java 인터페이스 이름과 완전히 같아야 함 |
| ✅ `<select>`/`<insert>` 태그 | `id`, `resultType`, `parameterType` 누락 없음? | 빠지면 컴파일 OK → 실행 오류 발생 |
| ✅ resultType | DTO 필드명과 컬럼명이 일치하는가? | 자동 매핑이 실패하면 값이 안 들어옴 |
| ✅ 파라미터명 | Java → XML 전달값 이름이 일치하는가? | `#{hakbun}` ⇔ Java `param.put("hakbun", 1)` |
| ✅ 중첩 태그 | `<where>`, `<trim>`, `<foreach>` 안 닫힘 여부 확인 | 열고 닫는 태그 쌍 필수 |
| ✅ include | `<sql>` 정의 순서가 `<include>`보다 먼저인가? | refid를 못 찾는 경우 |
| ✅ 경로 문제 | `mapper/*.xml` 경로가 mybatis-config.xml에 맞게 지정되어 있는가? | 경로 오타가 의외로 잦음 |
| ✅ 로그로 SQL 확인 | log4j 설정이 적용되어 있는가? | SQL을 눈으로 확인해야 추적 가능 |

---

## ✅ 3. 실전 예외 메시지 예시 & 해결

---

### ❌ 예외: `Could not set property 'irum'`

```
Caused by: java.lang.NoSuchMethodException: main.Student.setIrum(java.lang.Integer)
```

🔍 원인: DB에서 `irum`을 숫자로 보내는데 DTO의 `setIrum(String)`이기 때문

✅ 해결: 컬럼 타입, DTO 타입을 일치시킴

---

### ❌ 예외: `<sql id="studentColumns">` 정의 못 찾음

```
Could not find SQL statement to include with refid 'studentColumns'
```

🔍 원인: `<sql id="studentColumns">`가 `<include refid="studentColumns"/>`보다 아래쪽에 정의되어 있음

✅ 해결: `<sql>` 정의는 **위쪽**에 선언

---

## ✅ 4. 실습 체크리스트

| 항목 | 설명 | 체크 |
| --- | --- | --- |
| DTD 포함 여부 확인 (`<!DOCTYPE mapper ...>`) | ✅ |  |
| 모든 태그 닫힘 여부 확인 | ✅ |  |
| `<sql>`, `<include>` 순서 오류가 없는가 | ✅ |  |
| parameterType, resultType 정확하게 일치하는가 | ✅ |  |
| DTO 필드명 ↔ 컬럼명 일치 여부 | ✅ |  |
| Java → XML 전달 파라미터 이름 일치 여부 | ✅ |  |

---

## ✅ 실무 팁

| 항목 | 팁 |
| --- | --- |
| XML 에디터에서 자동완성 기능이 있는 도구(Eclipse, IntelliJ)를 사용 |  |
| 로그에 `SQL:` `Parameters:` 가 나오도록 log4j 설정 필수 |  |
| 오류가 반복되면 Mapper XML을 최소단위로 쪼개서 테스트 |  |
| 복잡한 WHERE절은 `<sql>`로 분리해 디버깅 쉽게 |  |
