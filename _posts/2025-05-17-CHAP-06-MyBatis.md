---
layout: post
title: "CHAP 5. DAO 구조 설계 및 분리"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro6.png
author: Devchanny
---


# ** 📌5.1단계: DAO 클래스 설계 – StudentDao 분리 구조 ** 

(📂 `StudentDao.java`, `StudentMapper1.xml`, `main.Student` 기반)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | DB 접근 로직을 DAO 클래스로 분리 |
| 구조 변화 | `SqlSession` 코드 → DAO 내부로 이동 |
| 기대 효과 | 비즈니스 로직과 DB 로직 분리, 재사용성 향상 |

---

## ✅ 1. DAO 클래스 기본 설계 (`StudentDao.java`)

```java
package dao;

import java.io.Reader;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import main.Student;

public class StudentDao {

    private static SqlSessionFactory factory;

    static {
        try {
            Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
            factory = new SqlSessionFactoryBuilder().build(reader);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Student> selectAll() {
        SqlSession session = factory.openSession();
        List<Student> list = session.selectList("student.getAllStudents");
        session.close();
        return list;
    }

    public Student selectByHakbun(int hakbun) {
        SqlSession session = factory.openSession();
        Student result = session.selectOne("student.getStudentByHakbun", hakbun);
        session.close();
        return result;
    }

    public int insert(Student s) {
        SqlSession session = factory.openSession();
        int result = session.insert("student.insertStudent", s);
        session.commit();
        session.close();
        return result;
    }

    public int update(Student s) {
        SqlSession session = factory.openSession();
        int result = session.update("student.updateStudentGradeAndPhone", s);
        session.commit();
        session.close();
        return result;
    }

    public int delete(int hakbun) {
        SqlSession session = factory.openSession();
        int result = session.delete("student.deleteStudentByHakbun", hakbun);
        session.commit();
        session.close();
        return result;
    }
}

```

---

## ✅ 2. Java 호출 코드에서 DAO 사용하기 (`Test1_A.java` 또는 Controller)

```java
StudentDao dao = new StudentDao();

List<Student> list = dao.selectAll();
for (Student s : list) {
    System.out.println(s.getHakbun() + " / " + s.getIrum());
}

Student newS = new Student();
newS.setHakbun(2028);
newS.setIrum("송다정");
newS.setHakgwa("소프트웨어학과");
int result = dao.insert(newS);
System.out.println("삽입 결과: " + result);
```

---

## ✅ 3. Mapper XML에 추가되어야 할 ID들

| 기능 | ID | 설명 |
| --- | --- | --- |
| 전체 조회 | `getAllStudents` | 기존 SELECT * |
| 한 명 조회 | `getStudentByHakbun` | `WHERE hakbun = #{hakbun}` |
| 삽입 | `insertStudent` | 기존 INSERT 문 |
| 수정 | `updateStudentGradeAndPhone` | 기존 UPDATE 문 |
| 삭제 | `deleteStudentByHakbun` | 기존 DELETE 문 |

---

## ✅ 4. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| DAO에 모든 DB 접근 코드가 들어갔는가 | ✅ |  |
| 외부에서는 `StudentDao`만 호출하는가 | ✅ |  |
| `SqlSession`은 DAO 내부에서만 열고 닫는가 | ✅ |  |
| commit/rollback이 필요한 메서드에만 commit이 포함되어 있는가 | ✅ |  |

---

## ✅ 실무 팁

| 항목 | 설명 |
| --- | --- |
| `SqlSessionFactory`는 static 블록으로 한 번만 초기화 | 성능과 안전성 향상 |
| DAO는 비즈니스 계층(서비스)보다 하단에 배치 | 명확한 계층화 |
| 예외 처리 시 try-catch-finally 또는 try-with-resources 사용 권장 | 오류 전파 방지 |

---

## ✅ 디렉터리 구조 예시 (MVC 스타일)

```
📂 main
 ┣ 📄 Student.java
📂 dao
 ┣ 📄 StudentDao.java
📂 mapper
 ┣ 📄 StudentMapper1.xml
📂 service (선택)
 ┣ 📄 StudentService.java
📂 controller
 ┣ 📄 Test1_A.java (또는 서블릿)
```

✅ 5.2단계: DTO 클래스 설계 – Student.java 필드 구조 정리

(📂 `main.Student` 기준, DB 테이블 컬럼과 매핑)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | DB의 컬럼 구조와 1:1 매핑되는 DTO(Data Transfer Object)를 설계 |
| 주요 포인트 | 필드 정렬, 접근 제어, 생성자, getter/setter, toString |
| 기대 효과 | 코드 가독성 향상 + MyBatis 매핑 일관성 유지 |

---

## ✅ 1. DB 테이블 구조 기반 설계 가정

```sql
CREATE TABLE student (
  hakbun INT PRIMARY KEY,
  irum VARCHAR(50),
  hakgwa VARCHAR(50),
  addr VARCHAR(100),
  phone VARCHAR(20),
  jumin VARCHAR(20),
  grade INT
);
```

---

## ✅ 2. DTO 클래스 정리 (`Student.java`)

```java
package main;

public class Student {
    private int hakbun;        // 학번
    private String irum;       // 이름
    private String hakgwa;     // 학과
    private String addr;       // 주소
    private String phone;      // 전화번호
    private String jumin;      // 주민번호
    private int grade;         // 학년

    // ✅ 기본 생성자
    public Student() {}

    // ✅ 전체 필드 생성자 (선택적)
    public Student(int hakbun, String irum, String hakgwa, String addr,
                   String phone, String jumin, int grade) {
        this.hakbun = hakbun;
        this.irum = irum;
        this.hakgwa = hakgwa;
        this.addr = addr;
        this.phone = phone;
        this.jumin = jumin;
        this.grade = grade;
    }

    // ✅ Getter/Setter
    public int getHakbun() { return hakbun; }
    public void setHakbun(int hakbun) { this.hakbun = hakbun; }

    public String getIrum() { return irum; }
    public void setIrum(String irum) { this.irum = irum; }

    public String getHakgwa() { return hakgwa; }
    public void setHakgwa(String hakgwa) { this.hakgwa = hakgwa; }

    public String getAddr() { return addr; }
    public void setAddr(String addr) { this.addr = addr; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getJumin() { return jumin; }
    public void setJumin(String jumin) { this.jumin = jumin; }

    public int getGrade() { return grade; }
    public void setGrade(int grade) { this.grade = grade; }

    // ✅ 디버깅용 toString()
    @Override
    public String toString() {
        return "Student [hakbun=" + hakbun + ", irum=" + irum +
               ", hakgwa=" + hakgwa + ", addr=" + addr +
               ", phone=" + phone + ", jumin=" + jumin +
               ", grade=" + grade + "]";
    }
}

```

---

## ✅ 3. 설계 원칙 요약

| 원칙 | 설명 |
| --- | --- |
| 필드명 = 컬럼명 | MyBatis 자동 매핑을 위해 정확히 일치시킴 |
| 접근 제한자 | 필드는 `private`, 메서드는 `public` |
| 기본 생성자 | 필수 (MyBatis 내부 객체 생성용) |
| 전체 생성자 | 선택 (테스트, 편의용) |
| `toString()` | 디버깅/로깅 용도로 유용 |

---

## ✅ 4. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| DB 컬럼명과 필드명이 정확히 일치하는가 | ✅ |  |
| `getter/setter`가 모두 구현되어 있는가 | ✅ |  |
| 기본 생성자가 존재하는가 | ✅ |  |
| 실수로 `public` 필드가 존재하지 않는가 | ✅ |  |

---

## ✅ 실무 팁

| 항목 | 설명 |
| --- | --- |
| Lombok 사용 시 | `@Getter`, `@Setter`, `@NoArgsConstructor`, `@ToString` 가능 |
| 이름이 다를 경우 | 매퍼에서 `<resultMap>`을 사용해야 함 |
| 다른 테이블과 조인할 경우 | 서브 DTO 또는 Join DTO를 별도 생성 |

---

## ✅ 확장 실습 예시

| 목적 | 클래스 |
| --- | --- |
| JOIN 결과용 | `StudentWithDeptDTO` 생성 가능 |
| 검색 전용 조건 DTO | `StudentSearchDTO` 로 따로 분리 |
| 입력/출력이 다를 경우 | `StudentInsertDTO`, `StudentViewDTO` 등 역할 분리 가능 |

✅ 5.3단계: DAO + DTO + Mapper 완전 분리 실습

(📂 `main/`, `dao/`, `mapper/` 기준)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 각 계층의 책임(R) 분리하여 코드 유지보수성 향상 |
| 핵심 | DTO ⇄ Mapper XML ⇄ DAO ⇄ Controller/JSP |
| 기대 효과 | 기능 추가, 필드 변경, 쿼리 변경 시 최소 수정 구조 확보 |

---

## ✅ 1. 아키텍처 정리 (MVC + MyBatis 레이어 분리)

```
📁 main/Student.java         → DTO (VO, Bean 역할)
📁 dao/StudentDao.java       → DB 접근 전용 DAO 계층
📁 mapper/StudentMapper1.xml → SQL만 담당하는 Mapper XML
📁 controller/Test1_A.java   → 호출/입출력 처리 (향후 JSP 또는 Servlet)
```

---

## ✅ 2. 역할 분리의 핵심 원칙

| 구성 요소 | 책임과 역할 |
| --- | --- |
| DTO (`Student`) | DB 컬럼 ↔ Java 필드 간 데이터 전달 객체 |
| Mapper XML | SQL만 선언 (`select`, `insert`, `update`, `delete`) |
| DAO 클래스 | Mapper 호출을 통해 DB 액세스 추상화 |
| Controller | 요청 흐름 제어, 서비스 호출 (JSP 연계 포함 시 View 연결) |

---

## ✅ 3. 구조 구현 흐름 (예: 학생 등록)

### 🔸 1) DTO: `Student.java`

→ 이전 5.2단계 설계 완료된 DTO 사용

---

### 🔸 2) Mapper: `StudentMapper1.xml`에 SQL 정의

```xml
<insert id="insertStudent" parameterType="main.Student">
  INSERT INTO student
  (hakbun, irum, hakgwa, addr, phone, jumin, grade)
  VALUES
  (#{hakbun}, #{irum}, #{hakgwa}, #{addr}, #{phone}, #{jumin}, #{grade})
</insert>
```

---

### 🔸 3) DAO: `StudentDao.java`

```java
public int insert(Student s) {
    SqlSession session = factory.openSession();
    int result = session.insert("student.insertStudent", s);
    session.commit();
    session.close();
    return result;
}
```

---

### 🔸 4) Controller or 호출부: `Test1_A.java`

```java
Student s = new Student(2029, "장예진", "소프트웨어학과", "서울", "010-1111-2222", "010101-4123456", 2);

StudentDao dao = new StudentDao();
int result = dao.insert(s);

System.out.println("학생 등록 결과: " + result);

```

---

## ✅ 4. 유지보수성과 확장성을 고려한 설계 포인트

| 항목 | 실무 기준 포인트 |
| --- | --- |
| SQL만 바뀔 때 | `Mapper XML`만 수정 → 나머지 영향 없음 |
| 필드 추가/삭제 | DTO ↔ Mapper XML만 수정 → DAO 재사용 |
| DAO 공통화 | `BaseDao` 상속 or 인터페이스 적용 가능 |
| 테스트 가능성 | DAO 단위 테스트, Controller 기능 테스트 분리 가능 |

---

## ✅ 5. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| DTO, DAO, Mapper XML이 각각 파일로 분리되어 있는가 | ✅ |  |
| 각 계층의 책임이 명확히 구분되었는가 | ✅ |  |
| 중복 코드 없이 기능별로만 구현되었는가 | ✅ |  |
| 전체 INSERT/SELECT 흐름이 정상 동작하는가 | ✅ |  |

---

## ✅ 확장 설계 예시 (실무형 구조 확장)

| 기능 | 확장 예 |
| --- | --- |
| 검색 조건 전달 | `StudentSearchDTO` 따로 분리 후 전달 |
| View 전용 DTO | `StudentViewDTO` 생성 (예: JOIN 결과용) |
| DAO 인터페이스화 | `IStudentDao` 인터페이스 + 구현체 분리 |
| Service 계층 도입 | `StudentService` 클래스 추가해 트랜잭션/로직 분리 가능 |

---

## ✅ 디렉터리 구조 예시 (실무 MVC 분리 구조)

```
📦 mybatisstudy
 ┣ 📁 main
 ┃ ┗ 📄 Student.java           → DTO
 ┣ 📁 dao
 ┃ ┗ 📄 StudentDao.java        → DAO
 ┣ 📁 mapper
 ┃ ┗ 📄 StudentMapper1.xml     → Mapper
 ┣ 📁 controller
 ┃ ┗ 📄 Test1_A.java           → 호출 테스트 or 서블릿 컨트롤러
```
