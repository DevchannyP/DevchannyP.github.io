---
layout: post
title: "CHAP 9. 기술면접 & 최종정리"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro10.png
author: Devchanny
---


# ** 📌 9단계: 기술면접 & 최종정리 🔍 예상 질문 20선 (MyBatis + JSP MVC2 기반) ** 

---

## 📌 목차

1. MyBatis 기본
2. Mapper, DAO, Service 구조
3. 동적 SQL, 트랜잭션, 에러 처리
4. JSP + JSTL + MVC 흐름
5. 실무 확장 & 비교 질문

---

## 🧩 1. MyBatis 기본

### ✅ Q1. MyBatis란 무엇인가요?

- SQL Mapper 프레임워크
- SQL을 XML에 정의, Java 코드에서 간편하게 호출
- ORM은 아니지만, SQL을 자유롭게 다루기 유리
- JDBC보다 코드 간결, SQL 성능 튜닝 용이

---

### ✅ Q2. `resultType`과 `resultMap`의 차이는?

| 항목 | resultType | resultMap |
| --- | --- | --- |
| 매핑 방식 | 자동 매핑 (컬럼=필드) | 수동 매핑 (명시적 지정) |
| 사용 예 | SELECT * FROM student | JOIN, alias, 복잡한 결과 |
| 장점 | 간단, 빠름 | 정밀 제어 가능 |
| 단점 | 컬럼≠필드 시 실패 | 설정 복잡함 |

---

### ✅ Q3. `#{} vs ${}` 차이?

| 항목 | #{} | ${} |
| --- | --- | --- |
| 처리 방식 | 바인딩 (PreparedStatement) | 문자열 치환 |
| 보안 | ✅ 안전 (SQL Injection 방지) | ❌ 위험 (주의 필요) |
| 사용 예 | WHERE name = #{name} | ORDER BY ${column} (화이트리스트 필요) |

---

### ✅ Q4. MyBatis에서 파라미터를 전달하는 3가지 방식은?

| 방식 | 예시 | 설명 |
| --- | --- | --- |
| 단일 값 | int id | selectOne("id", 1001) |
| Map | Map<String, Object> | 여러 조건 전달 시 사용 |
| DTO | Student 객체 | form 전체 전달 시 사용 |

---

### ✅ Q5. 동적 SQL 작성 방법은?

- `<if test="조건">`
- `<where>`, `<choose>`, `<foreach>`, `<trim>`
- 조건에 따라 SQL을 유동적으로 구성 가능
- 특히 조건 검색, 동적 INSERT, 다중 조회에서 유용

---

## 🧩 2. Mapper, DAO, Service 구조

### ✅ Q6. Mapper와 DAO의 차이는?

| 항목 | Mapper | DAO |
| --- | --- | --- |
| 위치 | XML / 인터페이스 | Java 클래스 |
| 역할 | SQL 정의 | DB 호출 로직 담당 |
| 호출 방식 | ID or 인터페이스 | SqlSession으로 호출 |

---

### ✅ Q7. DAO → Service → Controller 계층 분리 이유?

- **Controller**: 요청 처리 / JSP 전달
- **Service**: 비즈니스 로직 / 트랜잭션 관리
- **DAO**: DB 전용 접근

> 유지보수와 테스트, 재사용성 향상
> 

---

### ✅ Q8. MyBatis Mapper XML 구조는?

```xml
<mapper namespace="dao.StudentMapper">
  <select id="getAllStudents" resultType="main.Student">
    SELECT * FROM student
  </select>
</mapper>
```

- namespace는 인터페이스와 일치해야 함
- id는 호출 메서드명과 같아야 함

---

### ✅ Q9. SqlSessionFactory는 어떻게 구성하나요?

```java
Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);
```

- DB 연결, 트랜잭션 관리의 핵심
- 보통 static 초기화 블록에서 1회만 생성

---

### ✅ Q10. Mapper XML 등록 방법은?

```xml
<mappers>
  <mapper resource="mapper/StudentMapper.xml"/>
</mapp
```

- `resource="경로"`는 classpath 기준
- 어노테이션 방식인 경우 `<mapper class="dao.StudentMapper"/>`

---

## 🧩 3. 트랜잭션 & 예외 처리

### ✅ Q11. 트랜잭션을 수동으로 처리하는 방법은?

```java
try {
  session.insert(...);
  session.update(...);
  session.commit();
} catch (Exception e) {
  session.rollback();
}
```

- 예외 발생 시 rollback
- 반드시 `finally { session.close(); }` 필요

---

### ✅ Q12. insert/update/delete 시 `commit()`이 필요한가요?

- ✅ Yes
- `autoCommit=false`가 기본값
- commit 안 하면 DB에 반영 안 됨

---

### ✅ Q13. SQL 예외 로그 분석 방법은?

```
### The error may exist in mapper/StudentMapper.xml
### SQL: SELECT * FROM ...
### Cause: java.sql.SQLSyntaxErrorException: ...
```

- XML 위치, SQL 문장, 에러 코드 3단계 확인
- log4j 설정으로 Preparing, Parameters 확인 필수

---

### ✅ Q14. NullPointerException을 방지하는 패턴은?

```java
Student s = mapper.getStudentByHakbun(9999);
if (s != null) {
  System.out.println(s.getIrum());
} else {
  System.out.println("조회 결과 없음");
}
```

- `selectOne()`은 존재하지 않으면 `null` 반환
- 항상 `null` 체크 필수

---

### ✅ Q15. selectList() 결과가 null일 수 있나요?

- 기본은 빈 리스트 (`[]`) 반환
- 설정에 따라 `null`일 수도 있으니 `isEmpty()` 체크와 병행

---

## 🧩 4. JSP + JSTL 연동

### ✅ Q16. Controller에서 JSP로 데이터 넘기는 방법은?

```java
request.setAttribute("list", list);
request.getRequestDispatcher("/view/student/list.jsp").forward(request, response);
```

- JSP에서는 `${list}`, `<c:forEach>`로 출력

---

### ✅ Q17. JSTL과 EL을 사용하는 이유는?

- scriptlet 없이 데이터를 출력하기 위해
- 가독성, 유지보수, 재사용성이 좋아짐

---

### ✅ Q18. 입력 폼 데이터는 어떻게 Controller로 전달하나요?

- `<form method="POST" action="insert.do">`
- `request.getParameter("...")`로 추출 후 DTO에 set

---

## 🧩 5. 실무 비교 & 종합 질문

### ✅ Q19. MyBatis와 JPA의 차이점은?

| 항목 | MyBatis | JPA (Hibernate) |
| --- | --- | --- |
| SQL 작성 | 직접 작성 (자유로움) | SQL 생략 (자동 생성) |
| 성능 튜닝 | SQL 튜닝 쉬움 | SQL 제어 어려움 |
| 러닝 커브 | 비교적 쉬움 | 객체-관계 매핑 학습 필요 |
| 대표 성향 | SQL 중심 | 객체 중심 |

---

### ✅ Q20. MyBatis의 단점은?

- SQL이 많아질 경우 XML 관리 부담
- 쿼리 재사용을 위한 `<sql>`, `<include>` 학습 필요
- join 결과 매핑 복잡할 경우 `resultMap` 수동 매핑 필요

---

## 📚 기술면접 총정리

✅ 내가 구현한 프로젝트 흐름을 정확히 알고,

✅ 각 계층의 역할과 이유를 설명하고,

✅ 자주 나오는 **비교 질문(resultType vs resultMap, #{} vs ${})** 을 확실히 말할 수 있어야 해!

👨‍💻 **MyBatis 기술면접 요약**

- SQL Mapper 프레임워크
- `resultType` vs `resultMap` 차이
- `#{}` vs `${}` 바인딩 차이
- 동적 SQL, 트랜잭션, 예외 처리
- DAO → Service → Controller 구조 흐름
- `Mapper`, `JSTL`, `EL`, `form` 처리 방식
- JPA와 차이점, 실무 선택 기준


✅ 💡 실전 팁 20선 – MyBatis + JSP MVC2 프로젝트용

> 자주 하는 실수부터 DAO/DTO 설계 전략까지 실무 중심으로 정리
> 
> 
> ✨ 유지보수, 확장성, 안정성을 동시에 고려한 실전 마인드셋
> 

---

## 📁 1. Mapper / SQL 관련 팁

### ✅ 1. `resultType`은 컬럼명 = 필드명일 때만!

- 컬럼명이 다르면 `resultMap`을 꼭 사용해야 함
- 조인 결과 또는 alias 사용 시 자동 매핑 실패

---

### ✅ 2. `#{}` vs `${}` 혼용 주의

| 구분 | 설명 | 실수 예 |
| --- | --- | --- |
| `#{}` | 바인딩 (PreparedStatement) | WHERE name = #{name} |
| `${}` | SQL 문자열 치환 | ORDER BY ${sortColumn} (X: 사용자 입력 직접 전달 ❌) |

---

### ✅ 3. `<sql>`, `<include>`는 중복 제거의 핵심

- SELECT 컬럼, WHERE 조건을 재사용 가능

```xml
<sql id="baseColumns"> hakbun, irum, grade </sql>
<include refid="baseColumns"/>
```

---

### ✅ 4. `<where>` 없이 AND로 시작하면 구문 오류 발생

- 항상 `<where>` 또는 `<trim prefix="WHERE">`로 감싸야 함
- `AND` 자동 제거 기능 내장

---

### ✅ 5. `<foreach>`는 open, separator, close 생략 금지

```xml
<foreach item="id" collection="list" open="(" separator="," close=")">#{id}</foreach>
```

---

## 📁 2. DAO / DTO 설계 전략

### ✅ 6. DAO는 반드시 try-catch-finally 구조로!

```java
SqlSession session = null;
try {
  session = factory.openSession();
  session.insert(...);
  session.commit();
} catch (Exception e) {
  session.rollback();
} finally {
  if (session != null) session.close();
}
```

---

### ✅ 7. DTO는 **기본 생성자 필수** + Getter/Setter는 모두 구현

- MyBatis 내부 객체 생성 시 기본 생성자 필요
- 필드명은 DB 컬럼명과 정확히 일치해야 함

---

### ✅ 8. DTO에는 절대 public 필드 ❌

- `private` + `public getter/setter`가 기본 설계 원칙

---

### ✅ 9. DAO는 DB 전용! 로직, 트랜잭션, 조건 판단은 Service에서

- DAO는 SQL 실행만
- 유효성 검사, 트랜잭션 제어는 Service에서 분리

---

### ✅ 10. insert, update, delete 후에는 `session.commit()` 필수!

- 생략하면 아무 작업도 반영되지 않음
- rollback도 반드시 예외 발생 시 처리

---

## 📁 3. Null / 에러 방지 패턴

### ✅ 11. `selectOne()`은 항상 null 체크

```java
Student s = dao.selectByHakbun(1001);
if (s != null) {
  ...
}
```

---

### ✅ 12. `selectList()`는 `.isEmpty()`까지 함께 체크

```java
if (list == null || list.isEmpty()) {
  ...
}
```

---

### ✅ 13. log4j/logback을 꼭 설정해서 SQL 로그를 보자

```
log4j.logger.org.apache.ibatis=DEBUG
log4j.logger.java.sql=DEBUG
```

- Preparing, Parameters 로그 확인 가능

---

### ✅ 14. 예외 메시지는 최대한 구체적으로 출력하자

```java
System.out.println("❌ 삽입 중 오류 발생: " + e.getMessage());
```

---

### ✅ 15. Mapper ID, method명, namespace가 다르면 실행 실패

- 오타 실수가 많음 → IDE 자동완성 적극 활용

---

## 📁 4. 구조 및 유지보수 전략

### ✅ 16. Controller → Service → DAO → Mapper 흐름 철저 분리

| 계층 | 역할 |
| --- | --- |
| Controller | 요청/응답 처리 |
| Service | 로직/트랜잭션 |
| DAO | DB 접속 및 Mapper 실행 |
| Mapper | SQL 정의 |

---

### ✅ 17. Mapper XML에는 비즈니스 로직 절대 넣지 말 것

- 조건 분기, 유효성 검사는 Java에서
- Mapper는 SQL만 담당

---

### ✅ 18. insertForm.jsp / list.jsp 등은 역할별로 JSP 분리

- 하나의 JSP에 너무 많은 기능 넣지 말기
- 입력, 수정, 리스트, 상세 분리 원칙

---

### ✅ 19. `useGeneratedKeys="true"`로 자동 키 생성 처리 가능

```xml
<insert id="insertStudent" useGeneratedKeys="true" keyProperty="hakbun">
```

---

### ✅ 20. 오류 원인 추적 순서

```
1. 콘솔 로그 (에러 메시지 확인)
2. log4j Preparing: SQL 문 확인
3. DTO 필드 ↔ 컬럼 매핑 일치 여부
4. Mapper ID, namespace, 호출 ID 일치 여부
```

---

## 📌 추천 정리 포맷 (Notion 복붙용)

```markdown
## 💡 실전 팁 #3 - resultType vs resultMap 언제 선택?

| 항목 | resultType | resultMap |
|------|------------|-----------|
| 매핑 방식 | 자동 매핑 | 수동 매핑 |
| 사용 조건 | 컬럼 = 필드 | 컬럼 ≠ 필드, JOIN |
| 추천 상황 | 단순 SELECT * | 조인, alias 등 복잡한 결과 |

👉 원칙: 컬럼명 ≠ 필드명이면 무조건 resultMap 사용!
```

---

## 🏁 마지막 팁

> ✅ 오류가 발생한 순간이 실력 향상의 찬스!
> 
> 
> ✅ MyBatis는 **구조화 + 방어 + 로그**를 잘 하면 무조건 안정적으로 돌아간다
> 
> ✅ **IDE 자동완성 + 로그 + JSTL 조합**을 활용하면 유지보수가 즐거워진다 💪
>


✅ 최종 점검 체크리스트 – MyBatis + JSP MVC2 실습 프로젝트

> 📌 기능 완료 여부 확인 + 예외 대응 전략까지 포함된 실전용 QA 시트
> 
> 
> 💡 **Notion에 바로 복붙 가능**하며, 실무용으로도 바로 활용 가능!
> 

---

## ✅ 1. 기본 파일 구조 점검 🗂

| 항목 | 설명 | 완료 여부 |
| --- | --- | --- |
| `Student.java` | DTO 클래스, 필드명 = DB 컬럼명 | ⬜ |
| `StudentDao.java` | DB 접근 전용 DAO, `SqlSession` 포함 | ⬜ |
| `StudentMapper.xml` | SQL 쿼리 정의 (SELECT, INSERT 등) | ⬜ |
| `StudentMapper.java` | Mapper 인터페이스 (Optional) | ⬜ |
| `StudentService.java` | 비즈니스 로직 처리 계층 | ⬜ |
| `StudentController.java` | 요청 처리 / JSP 연동 컨트롤러 | ⬜ |
| `list.jsp` 등 | JSTL 기반 View 분리 구성 | ⬜ |
| `mybatis-config.xml` | mapper 경로 및 환경 설정 포함 | ⬜ |

---

## ✅ 2. 기능 구현 체크 ✅

| 기능 코드 | 기능 설명 | 구현 여부 |
| --- | --- | --- |
| S001 | 전체 학생 목록 조회 (`selectAll`) | ⬜ |
| S002 | 특정 학번으로 학생 조회 (`selectOne`) | ⬜ |
| S003 | 신규 학생 등록 (`insert`) | ⬜ |
| S004 | 학년 / 이름 조건 검색 (`<if>`, `<where>`) | ⬜ |
| S005 | 학년 / 전화번호 수정 (`update`) | ⬜ |
| S006 | 학번 기준 삭제 (`delete`) | ⬜ |

---

## ✅ 3. SQL Mapper 구성 체크 🎯

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| `resultType` → DTO 매핑이 일치하는가 | 컬럼명 = 필드명 여부 확인 | ⬜ |
| `parameterType` 정확히 지정되었는가 | `int`, `map`, `main.Student` | ⬜ |
| `#{} 사용` 바인딩 방식만 사용하고 있는가 | `${}`는 구조용으로만 사용 | ⬜ |
| `useGeneratedKeys` 옵션 필요한 경우 추가 | 자동 PK 생성 시 필수 | ⬜ |
| `<if>`, `<where>`, `<trim>` 올바르게 사용 | 조건부 동적 SQL 처리 확인 | ⬜ |
| `<foreach>`는 open/close/separator 완비 | IN 조건 등에서 오류 방지 | ⬜ |
| `<sql>`, `<include>`로 중복 제거 | SELECT 컬럼, WHERE 공통화 | ⬜ |

---

## ✅ 4. 예외 방지 및 대응 전략 🧯

| 상황 | 체크 포인트 | 대응 완료 |
| --- | --- | --- |
| `selectOne()` 결과 null → NPE 발생 | if-null 체크 또는 Optional 처리 | ⬜ |
| insert/update 후 `commit()` 생략 | 반드시 commit() 호출했는가? | ⬜ |
| MyBatis 바인딩 오류 발생 | `#{}` 내부 이름 ↔ Java 전달값 일치 확인 | ⬜ |
| 컬럼 오타로 인한 SQLSyntaxError | DB 컬럼명과 DTO 필드명 일치 여부 확인 | ⬜ |
| Mapper ID 오타 | DAO / XML ID / 인터페이스 메서드 완전 일치 | ⬜ |
| XML 파싱 오류 | `<mapper>`, `<sql>`, 태그 닫힘 등 구조 검토 | ⬜ |
| 중복키 오류 (PRIMARY KEY) | INSERT 전에 중복 여부 확인 or auto_increment | ⬜ |

---

## ✅ 5. View 출력 / 입력폼 연계 점검 🖥️

| JSP 파일 | 역할 | 구현 여부 |
| --- | --- | --- |
| `list.jsp` | 전체 학생 목록 출력 | ⬜ |
| `detail.jsp` | 학생 1명 상세보기 출력 | ⬜ |
| `insertForm.jsp` | 학생 입력 폼 | ⬜ |
| `updateForm.jsp` | 학생 수정용 폼 | ⬜ |
| JSTL 태그 선언 | `<%@ taglib uri=... %>` 포함 여부 | ⬜ |
| 데이터 출력 방식 | `${student.irum}` 등 EL로 출력 | ⬜ |
| 조건 검사 | `<c:if test="${empty list}">` 등 사용 | ⬜ |

---

## ✅ 6. 로그 / 디버깅 설정 체크 🔍

| 항목 | 설명 | 완료 |
| --- | --- | --- |
| log4j 설정 적용됨 | `log4j.properties` or XML 준비 | ⬜ |
| `Preparing:` 로그 확인됨 | 실제 실행 SQL 확인 | ⬜ |
| `Parameters:` 로그 출력됨 | 파라미터 바인딩 확인 | ⬜ |
| XML 문법 오류 시 빠른 대응 가능 | refid 순서, 태그 누락 등 점검 루틴 있음 | ⬜ |

---

## ✅ 7. 유지보수 전략 체크 🛠

| 항목 | 설명 | 체크 |
| --- | --- | --- |
| Controller → Service → DAO 구조로 분리되었는가 | 비즈니스 로직 계층화 적용 | ⬜ |
| DAO는 DB 전용, 로직 없음 | insert, update, select만 처리 | ⬜ |
| Service는 트랜잭션/검증 책임 | 조건 분기, rollback 포함 | ⬜ |
| Mapper는 오직 SQL 정의 전용 | Java 로직 절대 없음 | ⬜ |
| 코드 중복 제거 | `<sql>`, `<include>`, DAO 메서드 재사용 | ⬜ |

---

## 🧠 보너스: 실무 팁 ✨

| 팁 | 설명 |
| --- | --- |
| 오류 발생 시 로그부터 보자 | 로그 → SQL → DTO → Mapper 순서로 추적 |
| 테스트는 select부터! | INSERT/UPDATE 전에 반드시 SELECT로 구조 확인 |
| DTO 필드 수정 시 Mapper 먼저 체크 | resultType or resultMap 변경 여부 확인 필수 |
| JSP 디버깅은 EL로! | `${}` 값 안 나오면 setAttribute 문제 가능성 |
| 전체 구조는 항상 “요청 → 처리 → 결과” 흐름으로 생각하기 |  |
