---
layout: post
title: "CHAP 3.  INSERT / UPDATE / DELETE 실습"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro4.png
author: Devchanny
---


# ** 📌 3.1단계: INSERT 구문 작성 – 학생 등록 기능 실습 ** 

(📂 StudentMapper1.xml + DTO: `main.Student` 기반)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 새로운 학생 정보를 DB에 INSERT 하기 |
| 주요 포인트 | `parameterType`, `insert`, `commit()` |
| 전제 조건 | `Student` 클래스의 필드와 DB 컬럼명이 일치해야 함 |

---

## ✅ 1. DTO 클래스 구조 (`main.Student.java` 기준)

```java
public class Student {
    private int hakbun;
    private String irum;
    private String hakgwa;
    private String addr;
    private String phone;
    private String jumin;
    private int grade;
    // + Getter / Setter 포함
}
```

---

## ✅ 2. INSERT SQL 작성 (📄 StudentMapper1.xml에 추가)

```xml
<insert id="insertStudent" parameterType="main.Student">
  INSERT INTO student
  (hakbun, irum, hakgwa, addr, phone, jumin, grade)
  VALUES
  (#{hakbun}, #{irum}, #{hakgwa}, #{addr}, #{phone}, #{jumin}, #{grade})
</insert>
```

| 항목 | 설명 |
| --- | --- |
| `id="insertStudent"` | Java에서 호출할 SQL ID |
| `parameterType="main.Student"` | DTO 객체 전체를 넘김 |
| `#{필드명}` | DTO의 필드명과 100% 일치해야 함 |

---

## ✅ 3. Java 호출 코드 예시

```java
Student s = new Student();
s.setHakbun(2025);                      // 학번
s.setIrum("정다운");                    // 이름
s.setHakgwa("컴퓨터공학과");             // 학과
s.setAddr("서울시 마포구");              // 주소
s.setPhone("010-1234-5678");            // 전화번호
s.setJumin("010101-4123456");           // 주민번호
s.setGrade(3);                          // 학년

int result = session.insert("student.insertStudent", s);
session.commit();  // 필수!

System.out.println("학생 등록 결과: " + result);

```

---

## ✅ SQL 로그 출력 예시 (log4j 설정 시)

```
==>  Preparing: INSERT INTO student (hakbun, irum, hakgwa, addr, phone, jumin, grade) VALUES (?, ?, ?, ?, ?, ?, ?)
==> Parameters: 2025(Integer), 정다운(String), 컴퓨터공학과(String), ...
```

---

## ✅ 4. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| DTO의 필드명이 DB 컬럼명과 정확히 일치하는가 | `hakbun`, `irum` 등 | ✅ |
| parameterType이 `main.Student`로 지정되었는가 | 경로 정확히 입력 | ✅ |
| SQL INSERT 구문이 정확하게 작성되었는가 | 컬럼 수 == 값 수 | ✅ |
| `session.commit()` 호출이 있는가 | 생략 시 DB 반영 안 됨 | ✅ |
| 콘솔 로그에 INSERT 쿼리가 출력되는가 | log4j 설정 필요 | ✅ |

---

## ✅ DB 반영 확인 쿼리 (MariaDB)

```sql
SELECT * FROM student WHERE hakbun = 2025;

```

---

## ✅ 실무 확장 포인트

| 포인트 | 설명 |
| --- | --- |
| 중복 학번 방지 | `hakbun`에 UNIQUE 제약 조건 걸기 |
| 기본 키 자동 생성 | auto_increment 컬럼 설정 + `useGeneratedKeys="true"` 사용 |
| 입력 유효성 검사 | Java 단에서 null, 공백, 형식 검사 등 사전 처리 필요 |


✅ 3.2단계: UPDATE 구문 – 학년 수정, 전화번호 수정 기능 실습

(📂 StudentMapper1.xml + DTO: `main.Student` 기반)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 기존 학생 데이터의 `grade`, `phone` 값을 수정 |
| 주요 키워드 | `update`, `parameterType`, `#{}` 사용, `commit()` |
| 전제 조건 | 수정 기준 컬럼 (`hakbun`)이 WHERE 절에 존재해야 함 |

---

## ✅ 1. UPDATE SQL 작성 – `hakbun` 기준으로 학년과 전화번호 수정

### 🔧 매퍼 XML (`StudentMapper1.xml`에 추가)

```xml
<update id="updateStudentGradeAndPhone" parameterType="main.Student">
  UPDATE student
  SET grade = #{grade},
      phone = #{phone}
  WHERE hakbun = #{hakbun}
</update>
```

| 항목 | 설명 |
| --- | --- |
| `id="updateStudentGradeAndPhone"` | Java에서 호출 시 사용될 ID |
| `parameterType="main.Student"` | DTO 전체 전달 |
| `WHERE hakbun = #{hakbun}` | 수정 대상 식별 기준 |
| `SET grade = #{grade}` | 수정할 내용 정의 |

---

## ✅ 2. Java 호출 코드 예시

```java
Student s = new Student();
s.setHakbun(2025);              // 학번으로 대상 학생 지정
s.setGrade(4);                  // 학년 수정
s.setPhone("010-9999-8888");    // 전화번호 수정

int result = session.update("student.updateStudentGradeAndPhone", s);
session.commit();  // 반드시 커밋해야 실제 반영됨

System.out.println("수정된 학생 수: " + result);
```

---

## ✅ 3. 로그 출력 예시 (log4j 설정 시)

```
==> Preparing: UPDATE student SET grade = ?, phone = ? WHERE hakbun = ?
==> Parameters: 4(Integer), 010-9999-8888(String), 2025(Integer)
```

---

## ✅ 4. DB 결과 확인 쿼리

```sql
SELECT * FROM student WHERE hakbun = 2025;
```

| 기대 결과 | 변경 확인 포인트 |
| --- | --- |
| `grade` = 4 | 학년 수정됨 |
| `phone` = '010-9999-8888' | 전화번호 수정됨 |

---

## ✅ 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| WHERE 절이 누락되지 않았는가? | `hakbun` 기준 필수 | ✅ |
| DTO 필드명과 SQL의 `#{}` 이름이 일치하는가? | `phone`, `grade`, `hakbun` | ✅ |
| `session.commit()`이 있는가? | 없으면 rollback 됨 | ✅ |
| 로그 출력으로 실제 쿼리 확인했는가? | log4j 설정 필요 | ✅ |

---

## ✅ 실무 팁

| 포인트 | 설명 |
| --- | --- |
| 조건 없이 UPDATE 시 주의 | `WHERE` 누락 시 전체 데이터 수정될 수 있음 |
| 파라미터 하나만 수정하고 싶을 때 | `if`, `trim`으로 동적 SQL 작성 필요 |
| `update()` 반환값 | 수정된 행 수 (0이면 대상 없음) |

---

## ✅ 확장 실습 아이디어

1. 이름으로 찾고 주소 변경
2. 주민번호 기준으로 학과 변경
3. `if` 조건으로 전화번호만 있을 때만 수정하는 버전

✅ 3.3단계: DELETE 구문 – 특정 학생 삭제 기능 실습

(📂 `StudentMapper1.xml` + DTO: `main.Student` 기반)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 특정 학번(`hakbun`)의 학생 데이터를 삭제 |
| 핵심 개념 | `delete`, `parameterType`, `#{}`, `commit()` |
| 전제 조건 | `hakbun`은 `WHERE` 절에서 반드시 조건으로 사용되어야 함 |

---

## ✅ 1. DELETE SQL 작성 – 학번 기준 삭제

### 🔧 매퍼 XML (`StudentMapper1.xml`에 추가)

```xml
<delete id="deleteStudentByHakbun" parameterType="int">
  DELETE FROM student
  WHERE hakbun = #{hakbun}
</delete>
```

| 속성 | 설명 |
| --- | --- |
| `id` | `"deleteStudentByHakbun"` – Java에서 호출할 쿼리 식별자 |
| `parameterType` | `int` – 단일 학번(hakbun) 값 전달 |
| `#{hakbun}` | 삭제 기준으로 전달받은 학번이 들어감 |

---

## ✅ 2. Java 호출 코드 예시

```java
int hakbun = 2025;  // 삭제 대상 학번

int result = session.delete("student.deleteStudentByHakbun", hakbun);
session.commit();  // 필수! delete 후 commit 안 하면 rollback 됨

System.out.println("삭제된 학생 수: " + result);
```

| 출력 예시 |

```
삭제된 학생 수: 1
```

---

## ✅ 3. 로그 출력 예시 (log4j 설정 시)

```
==> Preparing: DELETE FROM student WHERE hakbun = ?
==> Parameters: 2025(Integer)
```

---

## ✅ 4. DB 삭제 확인 쿼리

```sql
SELECT * FROM student WHERE hakbun = 2025;
```

| 기대 결과 |

```
(결과 없음) → 정상 삭제
```

---

## ✅ 실습 체크리스트

| 항목 | 설명 | 체크 |
| --- | --- | --- |
| WHERE 절에 `hakbun`이 정확히 들어갔는가 | 전체 삭제 방지 | ✅ |
| `parameterType="int"`가 올바르게 설정되었는가 | `hakbun` 값 전달 | ✅ |
| `#{}` 내부 이름이 Java 변수명과 일치하는가 | `hakbun` | ✅ |
| `session.commit()` 호출 여부 | DB 반영 | ✅ |
| 로그 출력에서 DELETE 쿼리 확인 여부 | log4j 설정 필요 | ✅ |

---

## ✅ 실무 팁

| 항목 | 설명 |
| --- | --- |
| `WHERE` 조건 없을 경우 | 전체 테이블 데이터 삭제됨 → 매우 위험! |
| 삭제 전 유효성 검사 | 존재하지 않는 학번일 경우 사용자에게 알림 필요 |
| 반환값 처리 | `0`이면 삭제 대상이 없음 → 메시지 출력 필요 |

---

## ✅ 확장 실습 아이디어

- 이름으로 삭제: `irum = #{irum}` (단, 중복 가능성 주의)
- 주민번호 기준 삭제: `jumin = #{jumin}` (고유 식별 가능)
- `WHERE hakbun IN (...)`을 활용한 다중 삭제 (`foreach` 적용은 3.4단계)

✅ 3.4단계: 트랜잭션 처리 실습

(📂 `Test1_A.java` 또는 컨트롤러 클래스 + `StudentMapper1.xml` 기반)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | `commit()`과 `rollback()`을 활용한 트랜잭션 개념 이해 |
| 핵심 키워드 | 트랜잭션, 예외 처리, 수동 커밋, 자동 롤백 |
| 실습 | INSERT → UPDATE 도중 예외 발생 시, 전체 취소 확인 |

---

## ✅ 1. 트랜잭션이란?

> 데이터베이스에서 하나의 작업 단위로 처리되어야 하는 연산 집합
> 
> 
> 즉, "모두 성공 or 모두 실패"가 되어야 함.
> 

---

## ✅ 2. 기본 트랜잭션 구조 (MyBatis의 `SqlSession` 수동 처리)

```java
SqlSession session = factory.openSession();  // autoCommit = false
try {
    session.insert(...);   // 1단계
    session.update(...);   // 2단계
    session.commit();      // ✅ 모두 성공 시 커밋
} catch (Exception e) {
    session.rollback();    // ❌ 실패 발생 시 롤백
    e.printStackTrace();
} finally {
    session.close();
}
```

---

## ✅ 3. 실전 예시: INSERT + UPDATE 중간 실패 → rollback()

### 🔧 매퍼 XML: 기존에 작성된 것 활용

- `insertStudent` (📘 3.1단계)
- `updateStudentGradeAndPhone` (📘 3.2단계)

---

### 🔧 Java 트랜잭션 예시

```java
SqlSession session = factory.openSession();  // 자동 커밋 ❌

try {
    // 1. INSERT 실행
    Student s = new Student();
    s.setHakbun(2026);
    s.setIrum("김민지");
    s.setHakgwa("전산학과");
    s.setAddr("부산");
    s.setPhone("010-1111-1111");
    s.setJumin("000101-4123456");
    s.setGrade(1);

    session.insert("student.insertStudent", s);

    // 2. 강제로 예외 발생 (null 포인트 등)
    String test = null;
    System.out.println(test.length());  // 💥 강제 예외 발생

    // 3. 이 아래는 실행 안 됨
    s.setPhone("010-0000-0000");
    session.update("student.updateStudentGradeAndPhone", s);

    session.commit();
} catch (Exception e) {
    session.rollback();  // ✅ 모든 작업 롤백
    System.out.println("⚠️ 트랜잭션 실패, 롤백됨: " + e.getMessage());
} finally {
    session.close();
}

```

---

## ✅ 4. 로그 & DB 상태 확인

| 항목 | 기대 결과 |
| --- | --- |
| 콘솔 로그 | `rollback()` 발생 메시지 출력 |
| DB 조회 | `SELECT * FROM student WHERE hakbun = 2026` → 결과 없음 |

---

## ✅ 트랜잭션 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| `factory.openSession()`에 커밋 생략했는가 | MyBatis는 기본적으로 `autoCommit = false` 상태에서 세션을 열기 때문에, SQL을 실행해도 `commit()` 하지 않으면 DB에 실제로 반영되지 않음 | ✅ |
| `commit()` 전에 예외 발생 시 `rollback()` 처리했는가 | SQL 실행 도중 예외가 발생하면 `commit()` 없이 끝나므로, 반드시 `catch` 블록에서 `session.rollback()` 호출해서 변경 시도를 취소해야 함 | ✅ |
| DB에는 아무 작업도 반영되지 않았는가 | `commit()` 전에 예외가 나거나 `rollback()`만 실행되었을 경우, DB에는 아무런 INSERT/UPDATE/DELETE 내용이 저장되지 않아야 정상 | ✅ |
| 로그에 `rollback` 관련 로그가 출력되는가 | 예외 발생 시 `rollback()`이 제대로 실행되면, 콘솔이나 로그파일에 `Rolling back JDBC Connection`과 같은 문구가 출력됨 | ✅ |

---

## 💡 추가 설명: 트랜잭션 실패 흐름 예시

---

## ✅ 정리 요약

| 구분 | 설명 |
| --- | --- |
| `commit()` | 모든 작업이 문제 없을 때 명시적으로 실행 |
| `rollback()` | 예외 발생 시, 이전 작업까지 모두 취소 |
| `finally { close(); }` | 자원 해제 필수 |
| 트랜잭션 단위 | 하나의 `SqlSession` 내에서 수행되는 작업 집합 |

---

## 🧠 실무 팁

| 항목 | 설명 |
| --- | --- |
| 자동 커밋 사용 시 | 예외가 발생해도 이전 작업이 반영됨 (위험) |
| 다단계 작업 시 | 반드시 수동 커밋 방식 사용 권장 |
| 웹 환경에서는 | 스프링에서는 트랜잭션 어노테이션으로 대체 (`@Transactional`) |
