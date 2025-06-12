---
layout: post
title: "CHAP 6. 인터페이스 기반 매퍼 구조"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro7.png
author: Devchanny
---


# ** 📌 6.1단계: 인터페이스 기반 매퍼 구조란? **

(📂 `dao/StudentMapper.java`, `mapper/StudentMapper.xml` 기준)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | XML + 인터페이스를 연결하여 **Mapper ID 대신 메서드 호출**로 SQL 실행 |
| 효과 | 호출부 간결화, 오타 방지, 자동 완성 가능 |
| 핵심 요소 | `@Mapper`, `StudentMapper.java`, `StudentMapper.xml`, `namespace 일치` |

---

## ✅ 1. 기존 방식의 단점 (SqlSession 직접 사용 방식)

```java
session.selectList("student.getAllStudents");
```

- `"student.getAllStudents"`라는 **ID 문자열**을 잘못 쓰면 오류 발생!
- 어떤 파라미터인지, 어떤 리턴값인지 **IDE에서 알 수 없음**

---

## ✅ 2. 인터페이스 기반 구조의 핵심

| 파일명 | 역할 |
| --- | --- |
| `StudentMapper.java` | **인터페이스**로 SQL 메서드 시그니처 정의 |
| `StudentMapper.xml` | XML로 실제 쿼리 정의 (`namespace`가 인터페이스 경로와 같아야 함) |

---

## ✅ 3. 구조 구현 실습

### 🔹 (1) Mapper 인터페이스: `dao/StudentMapper.java`

```java
package dao;

import java.util.List;
import main.Student;

public interface StudentMapper {
    List<Student> getAllStudents();                         // SELECT *
    Student getStudentByHakbun(int hakbun);                // SELECT WHERE
    int insertStudent(Student s);                          // INSERT
    int updateStudentGradeAndPhone(Student s);             // UPDATE
    int deleteStudentByHakbun(int hakbun);                 // DELETE
}
```

---

### 🔹 (2) Mapper XML: `mapper/StudentMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="dao.StudentMapper">  <!-- ✅ 인터페이스와 완벽히 일치해야 함 -->

  <select id="getAllStudents" resultType="main.Student">
    SELECT * FROM student
  </select>

  <select id="getStudentByHakbun" parameterType="int" resultType="main.Student">
    SELECT * FROM student WHERE hakbun = #{hakbun}
  </select>

  <insert id="insertStudent" parameterType="main.Student">
    INSERT INTO student (hakbun, irum, hakgwa, addr, phone, jumin, grade)
    VALUES (#{hakbun}, #{irum}, #{hakgwa}, #{addr}, #{phone}, #{jumin}, #{grade})
  </insert>

  <update id="updateStudentGradeAndPhone" parameterType="main.Student">
    UPDATE student SET grade = #{grade}, phone = #{phone}
    WHERE hakbun = #{hakbun}
  </update>

  <delete id="deleteStudentByHakbun" parameterType="int">
    DELETE FROM student WHERE hakbun = #{hakbun}
  </delete>

</mapper>
```

---

## ✅ 4. 호출 예시 (컨트롤러/서비스 등에서 사용)

```java

SqlSession session = factory.openSession();
StudentMapper mapper = session.getMapper(StudentMapper.class);

List<Student> list = mapper.getAllStudents();
Student s = mapper.getStudentByHakbun(1001);

Student newS = new Student(2030, "유다인", "AI과", "서울", "010-2222-3333", "010101-4123456", 2);
mapper.insertStudent(newS);
session.commit();

session.close();
```

---

## ✅ 5. 매퍼 연결 조건 요약

| 항목 | 필수 조건 |
| --- | --- |
| `mapper.xml`의 `namespace` | 인터페이스 FQCN (`dao.StudentMapper`)와 **완전 일치** |
| 메서드명 | XML의 `<select id="...">` 와 정확히 일치 |
| 파라미터 타입 | `parameterType`과 인터페이스 파라미터 **동일해야 함** |
| 반환 타입 | `resultType` 또는 `resultMap`과 일치 |

---

## ✅ 6. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| `StudentMapper.java`와 XML이 연결되었는가? | ✅ |  |
| `namespace`가 인터페이스 경로와 완전 일치하는가? | ✅ |  |
| 메서드 이름 = ID 이름 = 호출 메서드 이름인가? | ✅ |  |
| SqlSession으로 `getMapper()`로 정상 작동되는가? | ✅ |  |

---

## ✅ 실무 팁

| 항목 | 팁 |
| --- | --- |
| 스프링 환경 | `@Mapper`, `@Autowired StudentMapper mapper` 로 DI 가능 |
| 테스트 시 | `mapper = session.getMapper(...)` 구조로 단위 테스트 가능 |
| 자동완성 지원 | IDE에서 Mapper 메서드 자동완성 + 타입 추론 가능 |
| 인터페이스에 `@Select`, `@Insert` 붙이면 XML 없이도 사용 가능 (어노테이션 방식) |  |


✅ 6.2단계: MyBatis Config 설정 확장 – <mappers> 태그 실습

(📄 `mybatis-config.xml` 기준, 인터페이스 기반 매퍼 구조에 대응)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 인터페이스 기반 Mapper를 `mybatis-config.xml`에 등록 |
| 주요 태그 | `<mappers>`, `<mapper resource="...">`, `<mapper class="...">` |
| 효과 | SqlSessionFactory 생성 시, Mapper XML & Java 인터페이스 자동 연결 가능 |

---

## ✅ 1. 설정 위치: `mybatis-config.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configurationPUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

  <!-- 💡 다른 설정 (예: 환경설정 등)이 올 수도 있음 -->

  <mappers>
    <!-- ✅ 1) XML 방식으로 등록 -->
    <mapper resource="mapper/StudentMapper.xml"/>

    <!-- ✅ 2) 또는 인터페이스(Java) 기반으로 등록 (Spring 환경 or MyBatis 직접 사용 시) -->
    <!-- <mapper class="dao.StudentMapper"/> -->
  </mappers>
</configuration>
```

> ⚠️ 둘 다 등록하면 중복 에러!
> 
> 
> 보통은 **resource 방식만 사용**, 또는 스프링에서는 `@MapperScan`으로 대체 가능.
> 

---

## ✅ 2. 등록 방식 비교 요약

| 등록 방식 | 설명 | 사용 예 |
| --- | --- | --- |
| `resource="..."` | XML 기반 매퍼 등록 | `mapper/StudentMapper.xml` |
| `class="..."` | 인터페이스 등록 (어노테이션 기반 또는 Spring용) | `dao.StudentMapper` |

---

## ✅ 3. 현재 구조 기준 예시 (`mapper` 폴더 안에 XML 있음)

### ✅ 이 구조에 맞는 설정 예:

```
📦 mybatisstudy
 ┣ 📁 dao
 ┃ ┗ 📄 StudentMapper.java
 ┣ 📁 mapper
 ┃ ┗ 📄 StudentMapper.xml
 ┣ 📄 mybatis-config.xml
```

```xml
<mappers>
  <mapper resource="mapper/StudentMapper.xml"/>
</mappers>
```

---

## ✅ 4. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| XML 또는 인터페이스 기반으로 `<mapper>`가 등록되었는가 | ✅ |  |
| XML 경로가 resource 경로 기준으로 정확한가 | ✅ |  |
| `mybatis-config.xml`이 SqlSessionFactory에 로딩되고 있는가 | ✅ |  |
| 중복 등록 없이 1회만 선언되었는가 | ✅ |  |

---

## ✅ 실무 팁

| 상황 | 팁 |
| --- | --- |
| XML 기반 프로젝트 | `<mapper resource="..."/>` 방식 사용 |
| 스프링 프로젝트 | `@Mapper + @MapperScan(basePackages = "...")` |
| 어노테이션 방식 사용 시 | `<mapper class="..."/>`로도 동작 |
| 에러 발생 시 | 중복 등록 또는 XML 위치 오타 가능성 높음 |


✅ 6.3단계: 자동 매퍼 스캔 – @Mapper 어노테이션 활용


(📂 Spring 기반 프로젝트를 위한 구조, `StudentMapper.java` 기준)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | MyBatis Mapper 인터페이스를 XML 등록 없이 자동 인식하게 만들기 |
| 주요 기술 | `@Mapper`, `@MapperScan`, XML 없이도 작동 가능한 구조 |
| 장점 | 간결한 설정, IDE 자동 완성, 컴파일 시점 오류 감지 |

---

## ✅ 1. 기존 방식 vs 어노테이션 방식 비교

| 방식 | 특징 | 등록 위치 |
| --- | --- | --- |
| XML 방식 (`<mappers>`) | `mapper/StudentMapper.xml` + 설정 필요 | `mybatis-config.xml` |
| 어노테이션 방식 (`@Mapper`) | 자바 코드로 직접 매핑 | Spring 설정 클래스 또는 `@MapperScan` |

---

## ✅ 2. 자동 매퍼 스캔 방식 사용 예

### 🔹 (1) 매퍼 인터페이스에 `@Mapper` 추가

```java
package dao;

import java.util.List;
import main.Student;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudentMapper {
    List<Student> getAllStudents();
    Student getStudentByHakbun(int hakbun);
    int insertStudent(Student s);
    int updateStudentGradeAndPhone(Student s);
    int deleteStudentByHakbun(int hakbun);
}
```

> @Mapper가 붙은 인터페이스는 Spring이 자동으로 매퍼 객체로 생성함.
> 
> 
> 💡 XML을 함께 사용하려면 namespace와 id가 일치해야 함.
> 

---

### 🔹 (2) 설정 클래스 또는 메인 클래스에 `@MapperScan` 등록

```java
@SpringBootApplication
@MapperScan(basePackages = "dao")  // 또는 @Mapper가 붙은 패키지 전체
public class MyBatisSpringBootApp {
    public static void main(String[] args) {
        SpringApplication.run(MyBatisSpringBootApp.class, args);
    }
}
```

> @MapperScan은 @Mapper가 붙은 인터페이스들을 자동 등록해주는 역할!
> 

---

## ✅ 3. 어노테이션만으로 SQL 작성도 가능 (XML 없이!)

```java
@Mapper
public interface StudentMapper {

    @Select("SELECT * FROM student")
    List<Student> getAllStudents();

    @Insert("INSERT INTO student (hakbun, irum, hakgwa, grade) VALUES (#{hakbun}, #{irum}, #{hakgwa}, #{grade})")
    int insertStudent(Student s);
}
```

> ⚠️ 단점: SQL이 코드에 섞이기 때문에 복잡한 쿼리나 가독성 측면에서는 XML이 더 유리함
> 

---

## ✅ 4. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| `@Mapper`가 인터페이스에 붙어 있는가 | ✅ |  |
| `@MapperScan`이 Spring 설정에 등록되었는가 | ✅ |  |
| XML 없이 어노테이션 기반 쿼리가 작동하는가 | ✅ |  |
| IDE에서 자동 완성, 에러 감지가 가능한가 | ✅ |  |

---

## ✅ 실무 팁

| 항목 | 팁 |
| --- | --- |
| 단순한 쿼리 | `@Select`, `@Insert` 등으로 어노테이션 방식 사용 가능 |
| 복잡한 SQL, 조인 | XML을 선호함 (`resultMap`, `<sql>`, `<include>`, `<foreach>`) |
| `@MapperScan`은 Application 클래스 또는 설정 클래스에 1회 선언하면 됨 |  |
| `@Mapper`만 붙이고 `@MapperScan` 없으면 작동 안 됨 (Spring Boot 기준) |  |
