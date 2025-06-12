---
layout: post
title: "CHAP 4. 동적 SQL 심화"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro5.png
author: Devchanny
---


# ** 📌 4.1단계: <if>, <choose>, <where>, <trim> 실습 – 조건 조합 검색 기능  ** 

(📂 `StudentMapper1.xml` 확장 / DTO: `main.Student` 기반)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 사용자가 입력한 조건에 따라 유동적으로 WHERE절을 구성 |
| 핵심 태그 | `<if>`, `<choose>`, `<where>`, `<trim>` |
| 조건 예시 | 성(김), 학년(1~4), 전화번호 포함 여부 |

---

## ✅ 1. 전제: 검색 조건 DTO 설계

→ 이미 사용 중인 `main.Student`를 그대로 활용할 수 있어.

```java
Student s = new Student();
s.setIrum("김");       // 성으로 시작하는 이름
s.setGrade(1);         // 1학년
s.setPhone("010");     // "010" 포함된 전화번호
```

---

## ✅ 2. 매퍼 XML 동적 SQL 정의 예시

```xml
<select id="searchStudentDynamic" parameterType="main.Student" resultType="main.Student">
  SELECT * FROM student
  <where>
    <if test="irum != null and irum != ''">
      irum LIKE CONCAT(#{irum}, '%')
    </if>
    <if test="grade != null">
      AND grade = #{grade}
    </if>
    <if test="phone != null and phone != ''">
      AND phone LIKE CONCAT('%', #{phone}, '%')
    </if>
  </where>
</select>

```

---

## ✅ 3. 태그별 설명 요약

| 태그 | 설명 | 사용 위치 |
| --- | --- | --- |
| `<if test="조건">` | 해당 조건이 true일 경우에만 SQL 포함 | WHERE, SET 안 |
| `<where>` | 내부 조건이 있을 때 자동으로 `WHERE` 추가, AND/OR 자동 정리 | SELECT, DELETE |
| `<trim prefix="SET" suffixOverrides=",">` | UPDATE 구문 등에서 마지막 쉼표 제거 | UPDATE |
| `<choose>`, `<when>`, `<otherwise>` | if-else처럼 하나만 선택 | 동적 조건 분기 |

---

## ✅ 4. Java 호출 예시 (동적 조건 구성)

```java
Student s = new Student();
s.setIrum("김");          // 성이 '김'으로 시작
s.setGrade(1);            // 1학년만
// s.setPhone("010");    // 생략하면 조건에 포함되지 않음

List<Student> result = session.selectList("student.searchStudentDynamic", s);
for (Student stu : result) {
    System.out.println(stu.getHakbun() + " / " + stu.getIrum());
}
```

---

## ✅ 5. SQL 로그 예시 (log4j)

```sql
Preparing: SELECT * FROM student WHERE irum LIKE ? AND grade = ?
Parameters: 김(String), 1(Integer)
```

---

## ✅ 6. 동적 조건 조립 시 주의사항

| 항목 | 문제 | 해결 방법 |
| --- | --- | --- |
| 첫 조건이 없으면 `AND`가 앞에 옴 | 구문 오류 발생 | `<where>` 사용 시 자동 정리됨 |
| 마지막 쉼표가 남는 경우 (`SET`) | 구문 오류 발생 | `<trim suffixOverrides=",">`로 제거 |
| 여러 조건 중 하나만 사용하고 싶을 때 | if 중복 사용 | `<choose>`로 단일 선택 분기 처리 |

---

## ✅ 실습 체크리스트

| 항목 | 확인 |
| --- | --- |
| XML에 `<where>`, `<if>`가 정확히 구성되어 있는가 | ✅ |
| 빈 조건은 WHERE절에 포함되지 않는가 | ✅ |
| 조건별로 SELECT 쿼리가 동적으로 조립되는가 | ✅ |
| log4j로 실제 실행된 SQL을 확인했는가 | ✅ |

---

## ✅ 확장 실습 아이디어

| 기능 | 방법 |
| --- | --- |
| 학년 또는 주소로 조건 검색 | `<if>` 추가 |
| 성별(주민번호 8번째 자리) 선택 분기 | `<choose>` 사용 |
| 전화번호 끝자리가 특정 번호 | `LIKE CONCAT('%', #{phoneTail})` |

✅ 4.2단계: <foreach> 사용 – 다중 학번 조회 실습

(📂 `StudentMapper1.xml` 확장)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 여러 개의 학번을 한 번에 조회 (IN 조건) |
| 핵심 태그 | `<foreach>` |
| 실습 대상 | `List<Integer>`, `int[]`, `List<Student>` 등 전달받은 리스트 처리 |

---

## ✅ 1. 매퍼 XML 예시: 다중 학번 조회 (IN 조건)

```xml
<!-- ✅ id: Java 코드에서 이 SQL을 호출할 때 사용할 이름 -->
<!-- ✅ parameterType="list": Java에서 List<Integer> 형태로 값을 전달받음 -->
<!-- ✅ resultType="main.Student": 결과는 Student 객체로 자동 매핑됨 -->
<select id="getStudentsByHakbunList" parameterType="list" resultType="main.Student">
  
  <!-- ✅ 전체 SQL의 시작 -->
  SELECT * FROM student
  WHERE hakbun IN

  <!-- ✅ <foreach>: List 안의 값들을 하나씩 꺼내서 반복 출력해주는 태그 -->
  <!-- ✅ item="id": 반복문에서 사용할 변수명 (list에서 꺼낸 각 원소를 id라고 부름) -->
  <!-- ✅ collection="list": Java에서 넘겨준 List의 이름 (보통 그냥 list로 씀) -->
  <!-- ✅ open="(" / close=")": 반복문으로 만들어진 결과 앞뒤에 괄호 붙임 -->
  <!-- ✅ separator=",": 요소 사이마다 ,(쉼표)를 자동으로 붙여줌 -->
  <!-- ✅ 결과적으로 (101, 102, 103) 같은 SQL 조건이 완성됨 -->
  <foreach item="id" collection="list" open="(" separator="," close=")">
    #{id}
    <!-- ✅ #{id}는 하나씩 꺼낸 값을 실제 SQL에 바인딩함 (PreparedStatement로 처리됨) -->
  </foreach>

</select>

```

| 속성 | 설명 |
| --- | --- |
| `collection="list"` | Java에서 전달받는 리스트 (List 또는 배열) |
| `item="id"` | 루프 내에서 사용될 변수명 |
| `open="("`, `close=")"` | IN 절 괄호 처리 |
| `separator=","` | 항목 구분자 (쉼표) |

---

## ✅ 2. Java 호출 코드 예시

```java
java
복사편집
List<Integer> hakbunList = Arrays.asList(1001, 1002, 1003);
List<Student> list = session.selectList("student.getStudentsByHakbunList", hakbunList);

for (Student s : list) {
    System.out.println(s.getHakbun() + " / " + s.getIrum());
}

```

---

## ✅ 3. 로그 출력 예시 (log4j 설정 시)

```sql
sql
복사편집
Preparing: SELECT * FROM student WHERE hakbun IN (?, ?, ?)
Parameters: 1001(Integer), 1002(Integer), 1003(Integer)

```

---

## ✅ 4. 다른 collection 유형 지원

| Java 전달값 | parameterType | collection 값 |
| --- | --- | --- |
| `List<Integer>` | `list` | `collection="list"` |
| `int[]` | `array` | `collection="array"` |
| `Map<String, List<Integer>>` | `map` | `collection="mapKey"` |

---

## ✅ 5. 실습 체크리스트

| 항목 | 설명 |  |
| --- | --- | --- |
| XML에 `<foreach>` 문법이 정확히 작성되었는가 | ✅ |  |
| 괄호 및 쉼표 처리 (open/close/separator)가 정확한가 | ✅ |  |
| 전달한 리스트가 잘 매핑되는가 (`#{id}`) | ✅ |  |
| 로그에서 `IN (?, ?, ?)` 형식으로 출력되는가 | ✅ |  |

---

## ✅ 확장 실습 아이디어

| 기능 | 설명 |
| --- | --- |
| 다중 학번 삭제 | `DELETE FROM student WHERE hakbun IN <foreach> ...` |
| 다중 이름 검색 | `WHERE irum IN <foreach>` |
| 여러 조건을 `<foreach>`로 조합 | `grade IN (...)` + `hakgwa IN (...)` |

---

## 🧠 실무 팁

- `<foreach>`는 꼭 `open=`, `close=`, `separator=`를 써서 구문 오류를 방지해야 해
- 전달되는 리스트가 `null`이면 실행 시 NPE 또는 SQL 오류 발생 → 사전 null 체크 필요
- `collection` 이름은 `list`, `array`, `mapKey` 등 상황에 맞게 지정해야 함

✅ 4.3단계: 동적 INSERT – null/빈값 제외하고 INSERT 처리


(📂 `StudentMapper1.xml` 확장 / DTO: `main.Student` 기준)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 값이 있는 필드만 INSERT 되도록 유연한 SQL 생성 |
| 핵심 태그 | `<trim>`, `<if>` |
| 사용 상황 | INSERT 시 null 필드는 제외하고 INSERT 수행하고 싶을 때 |

---

## ✅ 1. 매퍼 XML – 동적 INSERT 예시

```xml

<insert id="insertStudentDynamic" parameterType="main.Student">
  INSERT INTO student
  <trim prefix="(" suffix=")" suffixOverrides=",">
    <if test="hakbun != null">hakbun,</if>
    <if test="irum != null and irum != ''">irum,</if>
    <if test="hakgwa != null">hakgwa,</if>
    <if test="addr != null">addr,</if>
    <if test="phone != null">phone,</if>
    <if test="jumin != null">jumin,</if>
    <if test="grade != null">grade,</if>
  </trim>
  VALUES
  <trim prefix="(" suffix=")" suffixOverrides=",">
    <if test="hakbun != null">#{hakbun},</if>
    <if test="irum != null and irum != ''">#{irum},</if>
    <if test="hakgwa != null">#{hakgwa},</if>
    <if test="addr != null">#{addr},</if>
    <if test="phone != null">#{phone},</if>
    <if test="jumin != null">#{jumin},</if>
    <if test="grade != null">#{grade},</if>
  </trim>
</insert>
```

---

## ✅ 2. Java 호출 코드 예시

```java
Student s = new Student();
s.setHakbun(2027);
s.setIrum("박수빈");
s.setHakgwa("AI학과");
// 주소와 주민번호는 입력하지 않음 (null)

int result = session.insert("student.insertStudentDynamic", s);
session.commit();

System.out.println("입력 결과: " + result);
```

✅ 위 코드 실행 시, `addr`, `jumin`은 INSERT 구문에서 **자동으로 제외됨**

✅ log4j를 통해 SQL 로그에서 동적으로 구성된 INSERT 문 확인 가능

---

## ✅ 3. 로그 출력 예시 (log4j 설정 시)

```sql
==> Preparing: INSERT INTO student (hakbun, irum, hakgwa) VALUES (?, ?, ?)
==> Parameters: 2027(Integer), 박수빈(String), AI학과(String)
```

---

## ✅ 4. 태그별 기능 설명 요약

| 태그 | 설명 |
| --- | --- |
| `<if test="...">` | 조건을 만족할 때만 해당 SQL 조각 삽입 |
| `<trim>` | 쉼표(,) 제거 처리: `suffixOverrides=","` |
| `prefix/suffix` | `(`, `)` 등으로 쿼리 괄호 감싸기 |

---

## ✅ 5. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| null/빈값 필드가 자동으로 제외되는가 | ✅ |  |
| SQL 구문이 유효한 형태로 조립되는가 | ✅ |  |
| 마지막 쉼표가 자동으로 제거되는가 | ✅ |  |
| log4j로 실제 SQL 조합 확인했는가 | ✅ |  |
| 누락된 필드는 DB에 `null`로 저장되는가 (기본값 없음 시) | ✅ |  |

---

## ✅ 확장 실습 아이디어

| 기능 | 설명 |
| --- | --- |
| 필수값만 동적 INSERT + 선택 필드만 `if` 처리 | `hakbun`, `irum`은 필수, 나머지는 optional |
| 유효성 검사 추가 | null이거나 공백일 경우 insert 제외 |
| 동적 INSERT + 자동 키 반환 (4.4단계) | `useGeneratedKeys="true"` 적용 가능 |

---

## 🧠 실무 팁

- 반드시 `suffixOverrides=","`를 사용하지 않으면 SQL 문법 오류 발생 가능
- `insert` 후 `commit()`을 잊으면 DB에 반영되지 않음
- log4j 설정으로 동적 SQL 조립 결과를 확인하는 습관 중요

✅ 4.4단계: SQL 재사용 – <sql> + <include> 실습

(📂 `StudentMapper1.xml` 기준 / DTO: `main.Student`)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 반복되는 SELECT 컬럼, WHERE 조건을 한 곳에 정의하고 재사용 |
| 주요 태그 | `<sql>`, `<include>` |
| 기대 효과 | 코드 중복 제거, 유지보수 편의성 향상 |

---

## ✅ 1. 공통 SELECT 컬럼 정의 (기본 필드셋)

### 🔧 `StudentMapper1.xml` 상단에 추가:

```xml
<sql id="studentBaseColumns">
  hakbun, irum, hakgwa, addr, phone, jumin, grade
</sql>
```

> ✅ 이 컬럼셋은 SELECT문에서 반복해서 쓰는 부분을 재사용하기 위함이야.
> 

---

## ✅ 2. 공통 WHERE 조건 정의 (동적 조건 조립)

```xml
<sql id="dynamicStudentWhere">
  <where>
    <if test="irum != null and irum != ''">
      irum LIKE CONCAT(#{irum}, '%')
    </if>
    <if test="grade != null">
      AND grade = #{grade}
    </if>
    <if test="phone != null and phone != ''">
      AND phone LIKE CONCAT('%', #{phone}, '%')
    </if>
  </where>
</sql>
```

> ✅ 공통 검색 조건을 정의하여 여러 SELECT 문에서 재사용 가능해.
> 

---

## ✅ 3. 실제 SELECT 문에서 `<include>`로 재사용하기

```xml
<select id="searchStudentReusable" parameterType="main.Student" resultType="main.Student">
  SELECT
    <include refid="studentBaseColumns"/>
  FROM student
  <include refid="dynamicStudentWhere"/>
</select>
```

---

## ✅ 4. Java 호출 코드 예시

```java
Student s = new Student();
s.setIrum("김");       // '김'으로 시작하는 이름
s.setGrade(2);         // 2학년만

List<Student> list = session.selectList("student.searchStudentReusable", s);
for (Student stu : list) {
    System.out.println(stu.getHakbun() + " / " + stu.getIrum());
}
```

---

## ✅ 5. SQL 로그 예시 (log4j 출력)

```
==> Preparing: SELECT hakbun, irum, hakgwa, addr, phone, jumin, grade FROM student WHERE irum LIKE ? AND grade = ?
==> Parameters: 김(String), 2(Integer)
```

---

## ✅ 6. 실습 체크리스트

| 항목 | 설명 | 체크 |
| --- | --- | --- |
| `<sql id="...">`로 공통 블록을 정의했는가 | ✅ |  |
| `<include refid="..."/>`로 불러오고 있는가 | ✅ |  |
| 컬럼 리스트 및 조건이 반복되지 않고 한 곳에 관리되는가 | ✅ |  |
| log4j 출력으로 SQL 결과를 확인했는가 | ✅ |  |

---

## ✅ 실무 팁

| 항목 | 팁 |
| --- | --- |
| 컬럼이 많고 여러 매퍼에 공통이면 | `BaseColumns`를 별도의 xml로 분리 가능 (고급) |
| 여러 검색 조건이 유사한 경우 | 공통 WHERE절을 `<sql>`로 관리해두면 매우 편리 |
| `<sql>` 안에서는 다른 `<sql>` 중첩 불가 | 조립은 `<include>`로만 가능 |

---

## ✅ 예시 구조 정리 (요약용)

```xml
<sql id="studentBaseColumns">
  hakbun, irum, hakgwa, addr, phone, jumin, grade
</sql>

<sql id="dynamicStudentWhere">
  <where>
    <if test="...">...</if>
  </where>
</sql>

<select id="searchStudentReusable" ...>
  SELECT <include refid="studentBaseColumns"/>
  FROM student
  <include refid="dynamicStudentWhere"/>
</select>
```
