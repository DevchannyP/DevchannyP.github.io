---
layout: post
title: "CHAP 1.  MyBatis 기초 익히기"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro2.png
author: Devchanny
---


# ** 📌✅ 1.1단계: MyBatis란? & 동작 흐름 ** 

---

### 💡 MyBatis란?

> SQL을 XML에 작성해서 Java 코드와 분리하고, 실행 결과를 Java 객체에 자동 매핑해주는 프레임워크야.
> 

🔍 핵심 키워드:

- 직접 SQL 작성 → **자유도 매우 높음**
- resultType/resultMap → **Java 객체에 자동 매핑**
- JDBC보다 **코드 양 적고 유지보수 쉬움**

---

## 🧱 전체 흐름: 네 프로젝트 기준 동작 순서

실행 파일인 `Test1_A.java`에서 작동하는 **MyBatis의 전체 처리 흐름**을 정리하면 다음과 같아:

```
1️⃣ mybatis-config.xml 설정 읽기
    ↓
2️⃣ SqlSessionFactory 생성 (설정 파일 기반)
    ↓
3️⃣ SqlSession 생성 (쿼리 실행 객체)
    ↓
4️⃣ Mapper XML(SQL) 호출
    ↓
5️⃣ 결과를 Student 객체로 자동 매핑
    ↓
6️⃣ 세션 닫기
```

---

## 📄 실제 코드 분석: `Test1_A.java`

```java
package test0415;

import java.io.Reader;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import main.Student;

public class Test1_A {
    public static void main(String[] args) throws Exception {
        // 1️⃣ 설정 파일(xml) 읽기
        Reader reader = Resources.getResourceAsReader("mybatis-config.xml");

        // 2️⃣ 설정 기반으로 SqlSessionFactory 생성
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);

        // 3️⃣ SqlSession (DB 연결 + SQL 실행 담당 객체) 생성
        SqlSession session = factory.openSession();

        // 4️⃣ Mapper 호출 → SQL 실행 (단일 값 반환)
        int count = session.selectOne("student.getStudentCount");
        System.out.println("전체 학생 수 : " + count);

        // 5️⃣ Mapper 호출 → SQL 실행 (리스트 반환 + DTO 매핑)
        List<Student> list = session.selectList("student.getAllStudents");
        for (Student s : list) {
            System.out.println(s.getHakbun() + " / " + s.getIrum() + " / " + s.getHakgwa());
        }

        // 6️⃣ 세션 닫기
        session.close();
    }
}

```

---

## 📂 설정 파일: `mybatis-config.xml`

```xml
<configuration> <!-- MyBatis 전체 설정 시작 -->

  <environments default="development"> <!-- DB 환경 목록, 기본은 development -->
    <environment id="development"> <!-- 개발용 DB 설정 -->
      <transactionManager type="JDBC"/> <!-- JDBC 방식 트랜잭션 -->
      <dataSource type="POOLED"> <!-- 커넥션 풀 사용 -->
        <property name="driver" value="org.mariadb.jdbc.Driver"/> <!-- 드라이버 클래스 -->
        <property name="url" value="jdbc:mariadb://localhost:3306/mybatisdb"/> <!-- DB 주소 -->
        <property name="username" value="root"/> <!-- DB 계정 -->
        <property name="password" value="1234"/> <!-- DB 비밀번호 -->
      </dataSource>
    </environment>
  </environments>

  <mappers> <!-- Mapper 파일 등록 -->
    <mapper resource="StudentMapper1.xml"/> <!-- SQL 정의된 XML -->
  </mappers>

</configuration> <!-- 설정 끝 -->
```

🔑 핵심 포인트:

- DB 접속 정보: `driver`, `url`, `username`, `password`
- Mapper 등록: `StudentMapper1.xml`

---

## 🧾 SQL Mapper 파일: `StudentMapper1.xml`

```xml
<!-- ✅ 이 파일은 MyBatis의 Mapper XML로, SQL 문장을 정의하고 Java 객체와 매핑하는 역할을 함 -->
<mapper namespace="student">
  <!-- ✅ namespace: 이 매퍼를 Java에서 식별할 수 있는 고유 이름 -->
  <!-- 예: sqlSession.selectList("student.getAllStudents")처럼 사용됨 -->
  <!-- 반드시 Java 코드에서 사용할 이름과 일치해야 함 -->

  <!-- ✅ 첫 번째 SQL 정의 영역 시작 -->
  <select id="getStudentCount" resultType="int">
    <!-- ✅ id="getStudentCount": 이 SQL을 Java에서 호출할 때 사용할 이름 -->
    <!-- ✅ resultType="int": 쿼리 결과가 정수(int)형으로 반환된다는 뜻 -->
    SELECT COUNT(*) FROM student
    <!-- ✅ SQL 내용: student 테이블의 전체 행 수(레코드 수)를 계산하는 쿼리 -->
    <!-- 예: SELECT COUNT(*)는 총 몇 명의 학생이 있는지 숫자 하나를 반환함 -->
  </select>

  <!-- ✅ 두 번째 SQL 정의 영역 시작 -->
  <select id="getAllStudents" resultType="main.Student">
    <!-- ✅ id="getAllStudents": 이 SQL을 Java에서 호출할 때 사용할 이름 -->
    <!-- ✅ resultType="main.Student": 쿼리 결과가 main 패키지의 Student 클래스와 자동 매핑됨 -->
    SELECT * FROM student
    <!-- ✅ SQL 내용: student 테이블의 모든 컬럼과 모든 레코드를 조회하는 쿼리 -->
    <!-- ✅ 이 결과는 여러 개의 학생 정보를 담고 있으며, 각 행은 Student 객체로 자동 변환됨 -->
    <!-- ✅ 자동 매핑 조건: DB 컬럼명과 Student 클래스의 변수명이 동일해야 자동으로 필드가 채워짐 -->
    <!-- 예: DB의 name → Student 클래스의 setName() 메서드 호출됨 -->
  </select>

</mapper>

```

| 항목 | 설명 |
| --- | --- |
| `namespace="student"` | 호출 시 `"student.getStudentCount"` 형태로 사용됨 |
| `resultType="int"` | 첫 쿼리는 단일 숫자 반환 (학생 수) |
| `resultType="main.Student"` | 두 번째 쿼리는 Student 객체로 자동 매핑 |

---

## 📦 DTO 클래스: `main.Student.java`

```java
package main;

public class Student {
    private int hakbun;
    private String irum;
    private String hakgwa;
    private String addr;
    private String phone;
    private String jumin;
    private int grade;

    // Getter/Setter 생략
}
```

🔎 DB 컬럼명과 필드명이 같으면 자동으로 매핑됨

예: `SELECT * FROM student` → `hakbun`, `irum`, `hakgwa` → 자동 주입

---

## 🧠 구조 시각화

```
📄 Test1_A.java
    ↓
📖 mybatis-config.xml 로딩
    ↓
⚙ SqlSessionFactory 생성
    ↓
🔓 SqlSession 열기
    ↓
🧾 StudentMapper1.xml의 SQL 실행
    ↓
📦 결과를 Student 객체로 변환
    ↓
📃 콘솔 출력 후 종료

```

---

## ✅ 실행 결과 예시

콘솔 출력 예시 (DB에 6명 있다고 가정):

```
전체 학생 수 : 6
1001 / 김민수 / 컴퓨터공학과
1002 / 이영희 / 전자공학과
...
```

---

## ✅ 정리 요약

| 요소 | 역할 |
| --- | --- |
| `mybatis-config.xml` | DB 연결 + Mapper 등록 |
| `StudentMapper1.xml` | 실제 SQL이 정의된 XML |
| `Test1_A.java` | MyBatis 실행 코드 |
| `Student.java` | SQL 결과를 담을 객체 (DTO) |

✅ 1.2단계: SqlSessionFactoryBuilder + 설정 로딩 구조 (🔍 Test1_A.java 기준)

---

### 🔄 핵심 흐름 요약 (너의 코드 기준)

```java
Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);
SqlSession session = factory.openSession();
```

| 순서 | 실제 동작 | 관련 파일 |
| --- | --- | --- |
| 1️⃣ | 설정파일 로딩 (Reader) | `mybatis-config.xml` |
| 2️⃣ | 설정을 파싱하고 팩토리 생성 | 내부적으로 XML을 읽어 `SqlSessionFactory` 생성 |
| 3️⃣ | 팩토리에서 세션을 열어 DB 연결 | `session` 객체는 실제 DB 연결된 상태 |

---

## 🔍 실제 코드 분석: `Test1_A.java`

```java
package test0415;

import java.io.Reader;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import main.Student;

public class Test1_A {
    public static void main(String[] args) throws Exception {
        // 설정 파일(mybatis-config.xml) 읽기
        Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
        
        // SqlSessionFactory 생성
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);
        
        // SqlSession 열기 (DB 연결)
        SqlSession session = factory.openSession();

        // 학생 수 조회 (정수 1개 반환)
        int count = session.selectOne("student.getStudentCount");
        System.out.println("전체 학생 수 : " + count);

        // 전체 학생 목록 조회
        List<Student> list = session.selectList("student.getAllStudents");
        
        // 결과 출력
        for (Student s : list) {
            System.out.println(s.getHakbun() + " / " + s.getIrum() + " / " + s.getHakgwa());
        }

        // 세션 종료
        session.close();
    }
}
```

---

## 📁 설정 파일 분석: `mybatis-config.xml`

```xml
<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="org.mariadb.jdbc.Driver"/>
        <property name="url" value="jdbc:mariadb://localhost:3306/mybatisdb"/>
        <property name="username" value="root"/>
        <property name="password" value="1234"/>
      </dataSource>
    </environment>
  </environments>

  <mappers>
    <mapper resource="StudentMapper1.xml"/>
  </mappers>
</configuration>
```

---

## 🔧 설정 → 실행 흐름 구조도

```
📄 mybatis-config.xml
   ├─ DB 접속 설정
   └─ Mapper 등록
        ↓
📖 Resources.getResourceAsReader()   ← XML 파일 읽기
        ↓
🏗 SqlSessionFactoryBuilder.build()  ← Reader → XML 파싱
        ↓
⚙ SqlSessionFactory                 ← DB 세션 생성 공장
        ↓
🔓 factory.openSession()            ← 실제 DB 연결 객체(SqlSession)
        ↓
🧾 session.selectOne() / selectList()

```

---

## ✅ 핵심 개념 요약

| 구성 요소 | 설명 | 실제 사용 파일 |
| --- | --- | --- |
| `Resources.getResourceAsReader` | 설정파일(xml)을 읽어서 `Reader` 객체로 변환 | `mybatis-config.xml` |
| `SqlSessionFactoryBuilder` | 설정을 바탕으로 MyBatis 초기화 객체 생성 | `Test1_A.java` |
| `SqlSessionFactory` | 세션(SqlSession)을 만드는 공장 객체 | 내부 사용 |
| `SqlSession` | 쿼리 실행 객체 (select, insert 등) | `Test1_A.java` |

---

## 🧪 실습 결과 예시

실행 시 다음과 같은 콘솔 출력이 나와야 정상 작동:

```bash
전체 학생 수 : 6
1001 / 김민수 / 컴퓨터공학과
1002 / 이영희 / 전자공학과
...
```

---

## 🧯 자주 발생하는 오류

| 오류 메시지 | 원인 | 해결 방법 |
| --- | --- | --- |
| `IOException: Could not find resource` | `mybatis-config.xml` 경로 오류 | `src` 하위 또는 classpath 확인 |
| `ClassNotFoundException: org.mariadb.jdbc.Driver` | JAR 파일 누락 | `WEB-INF/lib` 확인 + Build Path 등록 |
| `SQLException: Access denied` | DB 계정/비밀번호 오류 | `root` 비번 확인, 사용자 권한 부여 |

---

## ✅ 최종 정리

> SqlSessionFactoryBuilder는 MyBatis에서 설정파일을 분석해서 쿼리를 실행할 수 있는 세션 팩토리(SqlSessionFactory) 를 만들어주는 부트스트랩 엔진이야.
> 
> 
> 이 설정에 따라 나중에 `selectOne`, `selectList` 같은 메서드가 정상 동작할 수 있어.
>

✅ 1.3단계: selectOne vs selectList 실전 사용법 (📂 mybatisstudy 기반)

---

### 📄 기준 실행파일: `Test1_A.java`

```java
Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(reader);
SqlSession session = factory.openSession();

// 🔸 selectOne: 1개의 결과만 반환
int count = session.selectOne("student.getStudentCount");
System.out.println("전체 학생 수 : " + count);

// 🔸 selectList: 여러 개의 레코드를 리스트로 반환
List<Student> list = session.selectList("student.getAllStudents");
for (Student s : list) {
    System.out.println(s.getHakbun() + " / " + s.getIrum() + " / " + s.getHakgwa());
}
```

---

## ① `selectOne()` 사용법

### 📌 사용된 쿼리: `StudentMapper1.xml`

```xml
<select id="getStudentCount" resultType="int">
  SELECT COUNT(*) FROM student
</select>
```

### 🔎 분석

| 항목 | 설명 |
| --- | --- |
| `id="getStudentCount"` | Java에서 `student.getStudentCount`로 호출 |
| `resultType="int"` | 결과는 숫자 하나 (학생 수) |
| 실행 코드 | `session.selectOne("student.getStudentCount")` |

### ✅ 특징 정리

| 항목 | 설명 |
| --- | --- |
| 리턴 타입 | 단일 값 (`int`, `String`, DTO 한 개 등) |
| 결과 | 1행 1열만 반환해야 함 |
| 예외 | 2개 이상 결과 반환 시 `TooManyResultsException` 발생 |

---

## ② `selectList()` 사용법

### 📌 사용된 쿼리: `StudentMapper1.xml`

```xml
<select id="getAllStudents" resultType="main.Student">
  SELECT * FROM student
</select>
```

### 🔎 분석

| 항목 | 설명 |
| --- | --- |
| `id="getAllStudents"` | Java에서 `student.getAllStudents`로 호출 |
| `resultType="main.Student"` | 결과를 `Student` 객체로 자동 매핑 |
| 실행 코드 | `session.selectList("student.getAllStudents")` |

> ❗ main.Student 경로는 DTO 클래스가 src/main/Student.java에 있기 때문!
> 

---

## 📦 DTO 매핑: `Student.java`

```java
public class Student {
    private int hakbun;
    private String irum;
    private String hakgwa;
    private String addr;
    private String phone;
    private String jumin;
    private int grade;
    // Getter/Setter 생략
}
```

### 🔎 자동 매핑 원리

- MyBatis는 DB 컬럼명과 DTO 필드명이 **동일하면 자동 매핑**해 줌
    
    예: `hakbun`, `irum`, `hakgwa` → Student 객체에 자동 주입
    

---

## ✅ `selectOne` vs `selectList` 차이 요약

| 항목 | `selectOne()` | `selectList()` |
| --- | --- | --- |
| 리턴 타입 | 단일 객체 or 기본형 | `List<객체>` |
| 예제 쿼리 | `SELECT COUNT(*) FROM ...` | `SELECT * FROM ...` |
| 매핑 대상 | 기본형 or DTO 하나 | DTO 목록 |
| 예외 발생 조건 | 결과 2개 이상이면 오류 | 0개여도 정상 작동 |

---

## 🧪 콘솔 출력 예시

```bash
전체 학생 수 : 6
1001 / 김민수 / 컴퓨터공학과
1002 / 이영희 / 전자공학과
...
```

---

## 📁 파일 기준 사용 정리

| 사용된 XML 파일 | SQL ID | Java 호출 코드 | 리턴 타입 |
| --- | --- | --- | --- |
| `StudentMapper1.xml` | `getStudentCount` | `selectOne("student.getStudentCount")` | `int` |
| `StudentMapper1.xml` | `getAllStudents` | `selectList("student.getAllStudents")` | `List<Student>` |

---

## ✅ 실습 확인 체크리스트

| 항목 | 확인 여부 |
| --- | --- |
| `selectOne()` → COUNT 쿼리에서 정상 작동 | ✅ |
| `selectList()` → DTO 리스트로 정상 매핑 | ✅ |
| 콘솔 출력 확인 | ✅ |
| DB 컬럼명 ↔ DTO 필드명 일치 여부 | ✅ |

---

## ✅ 정리 요약

> selectOne()은 단일 값 반환에만 사용하고,
> 
> 
> `selectList()`는 여러 행을 `List<DTO>`로 반환해서 for문 등으로 반복 처리할 수 있어.
> 

둘 다 **Mapper XML의 `id`와 정확히 일치**해야 하며,

**resultType**이 정확히 DTO 또는 기본형과 매칭되도록 해야 오류가 안 나.

✅ 1.4단계: 매퍼 파일 구성

---

### ✅ 먼저 매퍼 파일이란?

> MyBatis에서 SQL을 정의해두는 XML 파일이며,
> 
> 
> Java 코드에서 실제로 실행할 수 있도록 **쿼리 ID, 결과 매핑 방식, 파라미터 처리 방식** 등을 작성하는 곳이야.
> 

---

## 📄 실제 매퍼 파일: `StudentMapper1.xml` (파일에서 추출)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!-- ✅ 이 XML은 MyBatis 3.0용 매퍼 문서임을 명시 -->
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!-- ✅ 이 매퍼의 식별 이름(namespace). Java에서 호출 시 사용 -->
<mapper namespace="student">

  <!-- ✅ 1. 전체 학생 수를 조회하는 SQL -->
  <!-- id="getStudentCount": Java 코드에서 사용할 쿼리 이름 -->
  <!-- resultType="int": 결과가 정수 하나 (COUNT) -->
  <select id="getStudentCount" resultType="int">
    SELECT COUNT(*) FROM student
    <!-- ✅ student 테이블에 있는 모든 행의 수(학생 수)를 가져옴 -->
  </select>

  <!-- ✅ 2. 전체 학생 목록을 조회하는 SQL -->
  <!-- resultType="main.Student": 각 행이 Student 객체로 매핑됨 -->
  <select id="getAllStudents" resultType="main.Student">
    SELECT * FROM student
    <!-- ✅ 모든 학생 정보를 조회하여 List<Student> 형태로 반환 -->
  </select>

  <!-- ✅ 3. 1학년 학생만 조회하는 SQL -->
  <select id="getGrade1Students" resultType="main.Student">
    SELECT * FROM student WHERE grade = 1
    <!-- ✅ grade 컬럼이 1인 (즉, 1학년) 학생만 가져옴 -->
  </select>

  <!-- ✅ 4. 이름이 '김'으로 시작하는 학생만 조회하는 SQL -->
  <select id="getKimStudents" resultType="main.Student">
    SELECT * FROM student WHERE irum LIKE '김%'
    <!-- ✅ irum(이름) 컬럼이 '김'으로 시작하는 경우만 조회 -->
    <!-- ✅ '김%'는 '김OO', '김철수', '김하나' 등 모든 김씨를 의미함 -->
  </select>

  <!-- ✅ 5. 주민번호로 여학생 판별해서 조회하는 SQL -->
  <select id="getFemaleStudents" resultType="main.Student">
    SELECT * FROM student
    WHERE SUBSTR(jumin, 8, 1) = '2' OR SUBSTR(jumin, 8, 1) = '4'
    <!-- ✅ jumin(주민번호)에서 8번째 자리가 성별 코드 -->
    <!-- ✅ '2' 또는 '4'는 여자 (1980년대 이후 주민번호 기준) -->
    <!-- ✅ SUBSTR(jumin, 8, 1)은 jumin에서 8번째 글자 하나를 추출 -->
  </select>

</mapper>

```

---

## 📌 구성 요소별 정리

| 구성 요소 | 예시 | 설명 |
| --- | --- | --- |
| `namespace` | `"student"` | Java 코드에서 호출 시 사용하는 접두사 |
| `<select>` | `id="getAllStudents"` | Java에서 호출할 SQL 식별자 |
| `resultType` | `"main.Student"` | SQL 실행 후 결과를 자동 매핑할 DTO 타입 |
| `parameterType` *(생략됨)* | 없음 → 파라미터 없이 실행되는 쿼리들 |  |

---

## ✅ 1. `namespace="student"`

- 이 네임스페이스는 Java 코드에서 쿼리를 호출할 때 prefix 역할을 해.

```java
session.selectList("student.getAllStudents");
```

👉 여기서 `student`는 XML의 `<mapper namespace="student">`와 매칭되는 것!

---

## ✅ 2. `<select>` 태그

각 SQL 구문을 정의하는 핵심 태그로, 최소 `id`와 `resultType`을 포함해야 해.

### 예: `getAllStudents`

```xml
<select id="getAllStudents" resultType="main.Student">
  SELECT * FROM student
</select>
```

| 항목 | 설명 |
| --- | --- |
| `id` | 호출할 때 사용할 SQL 식별자 |
| `resultType` | 결과를 매핑할 Java 클래스 (`Student`) |
| `parameterType` *(생략)* | 파라미터 없는 쿼리이기 때문에 생략 가능 |

---

## ✅ 3. 전체 매퍼 구조 시각화

```
StudentMapper1.xml
  └── <mapper namespace="student">
        ├── <select id="getStudentCount" resultType="int">
        ├── <select id="getAllStudents" resultType="main.Student">
        ├── <select id="getGrade1Students" resultType="main.Student">
        ├── ...
```

---

## ✅ 4. `resultType="main.Student"` 자동 매핑 작동 방식

- 결과 쿼리의 컬럼명과 DTO 클래스의 필드명이 **동일**할 경우
- MyBatis가 자동으로 `setXXX()` 메서드를 호출해서 값을 주입해 줘

```java
SELECT * FROM student
→ DB 결과: hakbun = 1001 → student.setHakbun(1001)
```

💡 너의 `main.Student.java` 클래스 구조는 이미 다음과 같아:

```java
public class Student {
    private int hakbun;
    private String irum;
    private String hakgwa;
    ...
}
```

즉, `resultType="main.Student"`와 완벽하게 매핑됨.

---

## ✅ 실습 정리: 쿼리 ID별 매퍼 구조

| SQL ID | 설명 | 반환 타입 |
| --- | --- | --- |
| `getStudentCount` | 전체 학생 수 조회 | `int` |
| `getAllStudents` | 전체 학생 리스트 | `List<Student>` |
| `getGrade1Students` | 1학년 학생 필터 | `List<Student>` |
| `getKimStudents` | 성이 '김'씨 | `List<Student>` |
| `getFemaleStudents` | 여학생 판별 | `List<Student>` |
|  |  |  |

---

## ✅ 매퍼 XML 정리 요약표

| 태그 | 역할 |
| --- | --- |
| `<!DOCTYPE mapper ...>` | XML 문법 유효성 선언 |
| `<mapper namespace="...">` | 호출 식별자 네임스페이스 정의 |
| `<select id="..." resultType="...">` | SQL 정의 + 결과 매핑 타입 지정 |

✅ 1.5단계: resultType vs resultMap 비교 (실전 코드 중심)

---

## 🔸 먼저 요약 비교부터

| 구분 | resultType | resultMap |
| --- | --- | --- |
| 핵심 역할 | DB 결과를 Java 객체로 자동 매핑 | 복잡한 매핑, 별명(alias), 조인 결과 수동 매핑 |
| 설정 방식 | `resultType="main.Student"` | `resultMap="studentResultMap"` |
| 사용 조건 | DB 컬럼명 == Java 필드명일 때 추천 | 컬럼명 ≠ 필드명일 때 필수 |
| 장점 | 매우 간단함 (자동 매핑) | 매핑 구조를 상세히 정의 가능 |
| 단점 | 컬럼명과 필드명이 다르면 매핑 실패 | 설정이 조금 더 복잡함 |

---

## ✅ 실습 1: 현재 너의 매퍼는 **전부 `resultType`** 사용 중

예: `StudentMapper1.xml`

```xml
<select id="getAllStudents" resultType="main.Student">
  SELECT * FROM student
</select>
```

→ 이 경우는 DB 테이블 컬럼명(hakbun, irum, hakgwa, ...)과

Java DTO 필드명(`main.Student`)이 완벽하게 **동일**하기 때문에 `resultType`으로 충분함.

---

## ✅ 실습 2: 컬럼명이 다를 경우 → `resultMap`이 필요함

### 📌 예제 상황: 별칭(alias)을 쓰거나, 조인 결과를 매핑할 때

```sql
SELECT hakbun AS stu_no, irum AS name FROM student
```

이 결과는 Java의 `Student` 클래스와 **필드명이 다름**

→ 자동 매핑 실패! → `resultMap` 필요

---

## ✅ 실습 코드 예시 (파일 확장용)

### 🔧 1) 매퍼에 resultMap 정의 추가

```xml
<resultMap id="studentResultMap" type="main.Student">
  <result property="hakbun" column="stu_no"/>
  <result property="irum" column="name"/>
</resultMap>
```

- `resultMap`: 매핑 규칙을 직접 정의
- `property`: Java 클래스의 필드명
- `column`: SQL 결과의 컬럼명 또는 별칭

---

### 🔧 2) select에 resultMap 적용

```xml
<select id="getStudentsWithAlias" resultMap="studentResultMap">
  SELECT hakbun AS stu_no, irum AS name FROM student
</select>
```

> ☝ 이 쿼리는 resultType으로는 매핑이 불가능하므로 resultMap으로만 가능!
> 

---

### 🔧 3) Java에서 호출하는 코드 예시

```java
List<Student> list = session.selectList("student.getStudentsWithAlias");
for (Student s : list) {
    System.out.println(s.getHakbun() + " / " + s.getIrum());
}
```

---

## ✅ 시각적 비교 요약

### ✅ resultType 방식 (현재 사용 중)

```xml
<select id="getAllStudents" resultType="main.Student">
  SELECT * FROM student
</select>
```

- 자동 매핑
- 간단하지만 컬럼명 ≠ 필드명일 경우 사용 불가

---

### ✅ resultMap 방식 (복잡한 매핑에 필수)

```xml
<resultMap id="studentResultMap" type="main.Student">
  <result property="hakbun" column="stu_no"/>
  <result property="irum" column="name"/>
</resultMap>

<select id="getStudentsWithAlias" resultMap="studentResultMap">
  SELECT hakbun AS stu_no, irum AS name FROM student
</select>
```

---

## ✅ 정리 요약

| 항목 | resultType | resultMap |
| --- | --- | --- |
| 기본 매핑 방식 | 자동 매핑 | 수동 명시 매핑 |
| 사용 조건 | 컬럼명과 DTO 필드명이 같을 때 | 컬럼명 ≠ 필드명 / JOIN / alias |
| 사용법 | 간단 | 명시적 설정 필요 |
| 예시 상황 | SELECT * FROM student | SELECT ... AS alias, JOIN 등 |

---

## ✅ 실습 확장 과제 (네 프로젝트에 반영해볼 수 있음)

### ➕ 도전 실습:

1. `StudentMapper1.xml`에 별칭 쿼리 추가
2. `resultMap` 작성
3. Java에서 selectList로 호출
4. 콘솔 출력까지 확인
