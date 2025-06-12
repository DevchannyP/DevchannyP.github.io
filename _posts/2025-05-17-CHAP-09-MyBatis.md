---
layout: post
title: "CHAP 8. 실전 프로젝트 구조 설계"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro9.png
author: Devchanny
---


# ** 📌 8.1단계: 도메인 예시 선정 – 학생관리, 게시판, 로그인 시스템 중 1개 선택  **

---

### 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 실전 웹 시스템을 위한 주제 도메인을 선택 |
| 선택지 | 학생관리 시스템 / 게시판 시스템 / 로그인 시스템 |
| 기대 효과 | 실무에 가까운 MVC2 + MyBatis 구조로 확장 실습 가능 |

---

## ✅ 선택 가능한 도메인 목록

| 도메인 | 설명 | 실습 확장성 |
| --- | --- | --- |
| **1. 학생관리 시스템** | 학생 등록, 수정, 삭제, 검색 등 전형적인 CRUD 기능 중심 | DTO, DAO, 동적쿼리, 트랜잭션, 유효성검사까지 실습 가능 |
| **2. 게시판 시스템** | 글쓰기, 목록, 상세보기, 댓글 등 사용자 콘텐츠 중심 | 페이징, 조회수 증가, 비동기 처리 등 고급기능 확장 가능 |
| **3. 로그인 시스템** | 회원가입, 로그인, 세션 처리, 암호화 등 보안 중심 | 세션, 쿠키, 필터, 로그인 유지, 권한 제어 등 실무 보안 핵심 |

---

## ✅ 추천 도메인 별 특징 비교

| 항목 | 학생관리 | 게시판 | 로그인 시스템 |
| --- | --- | --- | --- |
| 주 목적 | DB 기본 연산 (CRUD) 마스터 | 콘텐츠 처리 + 사용자 행동 분석 | 인증, 보안, 권한 처리 실습 |
| DTO 수 | 낮음 (1~2개) | 보통 (게시글 + 댓글) | 회원 + 세션 관련 객체 |
| 기능 수 | 기본 중심 | 실무형 기능 포함 (페이징, 검색) | 보안 실습 가능 (암호화, 세션) |
| 난이도 | ⭐ (초중급) | ⭐⭐ (중급) | ⭐⭐⭐ (중상급) |
| 확장 가능성 | 쉬움 (학생 성적, 출결 등으로 확장) | 높은 편 (게시판 + 댓글, 좋아요 등) | 매우 높음 (SNS 로그인, 관리자 구분 등) |

---

## ✅ 예시 도메인 선택 예

> 너가 이전에 사용한 Student.java, StudentDao, StudentMapper1.xml 구조는
> 
> 
> 이미 **학생관리 시스템** 구조의 기반을 갖추고 있어.
> 

💡 따라서 자연스럽게 이어가려면 👉 **"학생관리 시스템"** 을 선택하는 게 가장 유리해.

---


✅ 8.2단계: 요구사항 도출

(📂 `main.Student`, `StudentDao`, `StudentMapper1.xml` 기반)

---

### 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | 학생관리 시스템에서 필요한 기능, 데이터 흐름, DB 구조 정의 |
| 구성 | 기능 목록 → 입력/출력 명세 → 테이블 설계 |
| 기대 효과 | 구현 전 명확한 설계서 기반 확보 (요구사항 명세서 역할) |

---

## ✅ 1. 핵심 기능 정의

| 기능 코드 | 기능 명칭 | 설명 |
| --- | --- | --- |
| S001 | 학생 전체 조회 | 모든 학생 목록 출력 |
| S002 | 특정 학번으로 조회 | `hakbun` 기준 학생 1명 출력 |
| S003 | 신규 학생 등록 | `insertStudent` |
| S004 | 학년/이름 조건 검색 | `grade`, `irum` LIKE 등 조건 필터 |
| S005 | 학년/전화번호 수정 | `hakbun` 기준으로 `grade`, `phone` 변경 |
| S006 | 학번으로 삭제 | 해당 학번 학생 정보 삭제 |

✅ 위 기능들은 전부 **파일 내 XML과 DAO 코드 기반으로 이미 구조가 정리**되어 있음.

---

## ✅ 2. 입력 / 출력 정의

| 기능 | 입력 데이터 (From JSP / Controller) | 출력 (JSP, 콘솔, 반환값 등) |
| --- | --- | --- |
| 학생 전체 조회 | 없음 | List<Student> |
| 특정 학번 조회 | int hakbun | Student |
| 학생 등록 | Student 객체 (모든 필드) | 등록 성공 여부 (int) |
| 조건 검색 | Student 객체 (부분 필드: irum, grade 등) | List<Student> |
| 정보 수정 | Student 객체 (hakbun + 수정 대상 필드) | 수정 성공 여부 (int) |
| 삭제 | int hakbun | 삭제 성공 여부 (int) |

---

## ✅ 3. DB 테이블 구조 설계

📄 **테이블명**: `student`

| 컬럼명 | 자료형 | 설명 | 제약조건 |
| --- | --- | --- | --- |
| `hakbun` | `INT` | 학번 (PK) | PRIMARY KEY |
| `irum` | `VARCHAR(50)` | 이름 | NOT NULL |
| `hakgwa` | `VARCHAR(50)` | 학과명 |  |
| `addr` | `VARCHAR(100)` | 주소 |  |
| `phone` | `VARCHAR(20)` | 전화번호 |  |
| `jumin` | `VARCHAR(20)` | 주민번호 (성별 판단용) |  |
| `grade` | `INT` | 학년 (1~4) |  |

💡 **실제 코드에 있는 `main.Student.java`와 완전히 일치**

(→ MyBatis에서 resultType="main.Student" 사용 시 자동 매핑됨)

---

## ✅ 4. 화면 흐름 예시 (Controller → JSP)

| 기능 | 요청 URL | 처리 흐름 | 결과 JSP |
| --- | --- | --- | --- |
| 전체 조회 | `/student/list.do` | DAO → `selectAll()` → setAttribute | `list.jsp` |
| 상세 조회 | `/student/detail.do?hakbun=1001` | DAO → `selectByHakbun()` → setAttribute | `detail.jsp` |
| 등록 처리 | `/student/insert.do` (POST) | request → DTO → DAO → insert() | `redirect:list.do` |
| 수정 처리 | `/student/update.do` (POST) | request → DTO → DAO → update() | `redirect:detail.do?hakbun=...` |
| 삭제 처리 | `/student/delete.do?hakbun=...` | DAO → delete() | `redirect:list.do` |

---

## ✅ 5. 실습 체크리스트

| 항목 | 설명 | 완료 여부 |
| --- | --- | --- |
| 기능 목록을 모두 나열했는가 | ✅ |  |
| 각 기능의 입력/출력을 정리했는가 | ✅ |  |
| DB 컬럼명과 DTO 필드명이 일치하는가 | ✅ |  |
| 제약조건(PK, NOT NULL 등)이 명확히 설정되었는가 | ✅ |  |
| 실제 Mapper/DAO 코드와 설계가 일치하는가 | ✅ |  |


✅ 8.3단계: Controller → Service → DAO → MyBatis 흐름 설계

(📂 MVC 구조 완전 연동 + 실무 Mapper 연계 방식 실습)

---

### 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | MVC2 기반에서 Controller → Service → DAO → MyBatis 흐름을 이해하고 구현 |
| 핵심 구성 | 각 계층 책임 분리, 호출 흐름 구조화, 중복 방지 |
| 기대 효과 | 유지보수 가능한 구조로 확장, 트랜잭션/로직/DB 접근 분리 |

---

## ✅ 1. 전체 흐름 구조 (요청 처리 흐름도)

```
[Client (브라우저)]
      ↓ 요청 (e.g., /student/list.do)
[📂 Controller]
      ↓ StudentService 호출
[📂 Service]
      ↓ StudentDao 호출
[📂 DAO]
      ↓ StudentMapper.xml 실행 (MyBatis)
[📂 DB]
      ↑ 결과 반환
```

---

## ✅ 2. 계층별 책임 정리

| 계층 | 클래스 예 | 역할 |
| --- | --- | --- |
| Controller | `StudentController.java`, `Test1_A.java` | 클라이언트 요청 수신, 서비스 호출, JSP 연결 |
| Service | `StudentService.java` | 비즈니스 로직 처리, 트랜잭션 제어, DAO 호출 |
| DAO | `StudentDao.java` | DB 접근 코드, Mapper 실행 |
| Mapper | `StudentMapper.xml` | 실제 SQL 정의 (`<select>`, `<insert>` 등) |
| DTO | `Student.java` | DB ↔ Java 간 데이터 전달 객체 |

---

## ✅ 3. 실전 예시 – 전체 조회 기능 흐름

### 💡 요청: `/student/list.do` → 전체 목록 조회

### 🔹 ① Controller

```java
StudentService service = new StudentService();
List<Student> list = service.getStudentList();
request.setAttribute("list", list);
request.getRequestDispatcher("/view/student/list.jsp").forward(request, response);
```

### 🔹 ② Service

```java
public class StudentService {
    private StudentDao dao = new StudentDao();

    public List<Student> getStudentList() {
        return dao.selectAll();  // DAO 호출
    }
}
```

### 🔹 ③ DAO

```java
public List<Student> selectAll() {
    SqlSession session = factory.openSession();
    List<Student> list = session.selectList("student.getAllStudents");
    session.close();
    return list;
}
```

### 🔹 ④ Mapper XML

```xml
<select id="getAllStudents" resultType="main.Student">
  SELECT * FROM student
</select>
```

---

## ✅ 4. 실무 설계 핵심 포인트

| 항목 | 설명 |
| --- | --- |
| Controller → Service 분리 이유 | 비즈니스 로직 변경 시 Controller 영향 최소화 |
| Service → DAO 호출 이유 | 트랜잭션 제어나 서비스 정책(예: 중복체크) 추가 가능 |
| DAO는 쿼리 실행만 | 오로지 Mapper 호출만 담당 (DB 전용) |
| Mapper는 SQL만 담당 | XML 구조로 유지보수, 가독성 확보 |

---

## ✅ 5. 실습 디렉터리 구조 (권장)

```
📁 mybatisstudy/
 ┣ 📁 main/Student.java          → DTO
 ┣ 📁 dao/StudentDao.java        → DB 호출
 ┣ 📁 dao/StudentMapper.java     → 인터페이스 (선택)
 ┣ 📁 service/StudentService.java→ 서비스 계층
 ┣ 📁 controller/StudentController.java → 요청 처리
 ┣ 📁 mapper/StudentMapper.xml   → SQL 정의
 ┣ 📁 view/student/list.jsp      → 결과 출력 JSP
```

---

## ✅ 실습 체크리스트

| 항목 | 설명 | 체크 |
| --- | --- | --- |
| Controller → Service → DAO 계층이 명확히 분리되어 있는가 | ✅ |  |
| 각 계층은 자신의 책임만 처리하는가 (예: Controller는 DB 직접 접근 ❌) | ✅ |  |
| Mapper ID, DAO 호출명, 서비스 메서드명이 일치하는가 | ✅ |  |
| 흐름을 바꾸더라도 구조가 영향을 최소로 받는가 (유지보수성 확보) | ✅ |  |

✅ 8.4단계: JSP + JSTL 연동 – View 출력 및 입력폼 처리

(📂 `view/student/*.jsp` + JSTL + EL + `controller` 연계 기준)

---

### 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | Controller에서 전달한 데이터를 JSP에서 JSTL/EL로 출력하고, 입력폼도 구성 |
| 주요 구성 | `list.jsp`, `detail.jsp`, `insert.jsp`, `update.jsp` |
| 기대 효과 | MVC2 구조의 완전한 흐름 구현 (입력 → 처리 → 출력) |

---

## ✅ 1. 전체 흐름 복습 (데이터 출력)

```
[Controller]
  ↓ setAttribute("list", list)
  ↓
[view/student/list.jsp]
  <c:forEach items="${list}" var="stu"> ... </c:forEach>
```

---

## ✅ 2. 학생 목록 출력 JSP (`list.jsp`)

📄 `view/student/list.jsp`

```
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head><title>학생 목록</title></head>
<body>

<h2>📋 학생 목록</h2>

<table border="1">
  <tr>
    <th>학번</th><th>이름</th><th>학과</th><th>전화</th><th>학년</th><th>삭제</th>
  </tr>

  <c:forEach var="stu" items="${list}">
    <tr>
      <td><a href="detail.do?hakbun=${stu.hakbun}">${stu.hakbun}</a></td>
      <td>${stu.irum}</td>
      <td>${stu.hakgwa}</td>
      <td>${stu.phone}</td>
      <td>${stu.grade}</td>
      <td><a href="delete.do?hakbun=${stu.hakbun}">🗑 삭제</a></td>
    </tr>
  </c:forEach>
</table>

<p><a href="insertForm.jsp">➕ 신규 등록</a></p>

</body>
</html>
```

---

## ✅ 3. 학생 등록 폼 (`insertForm.jsp`)

📄 `view/student/insertForm.jsp`

```
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head><title>학생 등록</title></head>
<body>

<h2>📝 학생 등록</h2>

<form action="insert.do" method="post">
  학번: <input type="number" name="hakbun"><br>
  이름: <input type="text" name="irum"><br>
  학과: <input type="text" name="hakgwa"><br>
  주소: <input type="text" name="addr"><br>
  전화: <input type="text" name="phone"><br>
  주민번호: <input type="text" name="jumin"><br>
  학년: <select name="grade">
    <option>1</option><option>2</option><option>3</option><option>4</option>
  </select><br><br>
  <input type="submit" value="등록하기">
</form>

</body>
</html>
```

---

## ✅ 4. Controller 예시 – insert.do (POST)

```java
protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    req.setCharacterEncoding("UTF-8");
    Student s = new Student();

    s.setHakbun(Integer.parseInt(req.getParameter("hakbun")));
    s.setIrum(req.getParameter("irum"));
    s.setHakgwa(req.getParameter("hakgwa"));
    s.setAddr(req.getParameter("addr"));
    s.setPhone(req.getParameter("phone"));
    s.setJumin(req.getParameter("jumin"));
    s.setGrade(Integer.parseInt(req.getParameter("grade")));

    StudentService service = new StudentService();
    int result = service.insertStudent(s);

    res.sendRedirect("list.do");
}
```

---

## ✅ 5. 상세보기 JSP (`detail.jsp`)

```
<h2>👤 학생 상세 정보</h2>
<p>학번: ${student.hakbun}</p>
<p>이름: ${student.irum}</p>
<p>학과: ${student.hakgwa}</p>
<p>주소: ${student.addr}</p>
<p>전화: ${student.phone}</p>
<p>학년: ${student.grade}</p>
```

---

## ✅ 6. 실습 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| JSTL 태그 선언이 되어 있는가 | `<%@ taglib ... %>` | ✅ |
| `<c:forEach>`로 리스트 반복 출력이 구현되었는가 | ✅ |  |
| 폼 → POST → Controller → DB 저장 흐름이 연결되는가 | ✅ |  |
| setAttribute한 데이터를 `${}`로 출력했는가 | ✅ |  |
| null 체크 시 `<c:if test="${empty student}">` 등을 사용하는가 | ✅ |  |

---

## ✅ 실무 확장 팁

| 기능 | 확장 방법 |
| --- | --- |
| 폼 유효성 검사 | JavaScript 또는 서버 유효성 체크 추가 |
| 수정 기능 구현 | `updateForm.jsp` + `update.do` 추가 |
| 필터 검색 | 검색 폼 + 조건 처리 → `<if>` + `<where>` |
| 전체 CRUD 완성 | Controller + Service + DAO + JSP 전부 구성 |


✅ 8.5단계: 프로젝트 배포 – WAR 파일 생성 → Tomcat 배포 테스트


(📂 Eclipse or IntelliJ 프로젝트 기준, JSP + Servlet + MyBatis 포함)

---

## 🎯 학습 목표

| 항목 | 설명 |
| --- | --- |
| 목적 | JSP + MyBatis 웹 프로젝트를 `.war` 파일로 패키징하여 실제 톰캣에 배포 |
| 주요 개념 | WAR 구조 이해, 빌드 설정, Tomcat 연동 |
| 기대 효과 | 프로젝트 결과물 실서버 또는 로컬 톰캣에서 직접 실행 가능 |

---

## ✅ 1. WAR 파일이란?

| 용어 | 설명 |
| --- | --- |
| WAR (Web Archive) | JSP, Servlet, WEB-INF, lib 등을 포함하는 **웹 애플리케이션 전체 패키지** |
| 구조 예시 |  |

```bash
myapp.war/
 ┣ index.jsp
 ┣ login.jsp
 ┣ WEB-INF/
     ┣ web.xml
     ┣ classes/
         ┣ dao/
         ┣ service/
         ┣ controller/
         ┣ main/Student.class
     ┣ lib/
         ┣ mybatis-*.jar
         ┣ log4j.jar 등
```

---

## ✅ 2. Eclipse에서 WAR 파일 생성 (Dynamic Web Project 기준)

### 🔹 ① Java EE 프로젝트 우클릭 → Export

- `Export → WAR file` 선택
- Destination: `C:\apache-tomcat\webapps\myapp.war`

### 🔹 ② 옵션 설정

| 항목 | 설명 |
| --- | --- |
| Web project | 내 프로젝트 이름 선택 |
| Destination | Tomcat의 `/webapps` 경로 또는 로컬 지정 |
| Target Runtime | Tomcat이 등록되어 있어야 함 |
| Export source files | ✅ 체크 필요 없음 (컴파일된 class만 내보냄) |

---

## ✅ 3. Tomcat에 배포 및 실행

### 🧩 방식 1: 수동 배포

1. `myapp.war` 복사 → `C:\tomcat\webapps\` 에 붙여넣기
2. Tomcat 실행
3. 자동으로 `myapp/` 디렉토리로 압축 해제됨
4. 접속 주소 확인:
    
    `http://localhost:8080/myapp/student/list.do`
    

### 🧩 방식 2: Eclipse 서버 탭에 직접 추가

1. Servers 탭 우클릭 → `Add and Remove...`
2. 프로젝트 추가 → `Finish`
3. 서버 실행 (`Ctrl + F11`)
4. 콘솔에서 로그 확인 + 주소로 접근

---

## ✅ 4. 실전 체크리스트

| 항목 | 설명 | 확인 |
| --- | --- | --- |
| `/WebContent/WEB-INF/web.xml` 파일이 정확히 설정되어 있는가 | 서블릿 매핑 포함 여부 | ✅ |
| JSP, CSS, JS, 이미지 파일이 WAR 내에 포함되어 있는가 | WAR 안 구조 확인 | ✅ |
| lib/ 폴더에 필요한 `.jar` 파일이 누락되지 않았는가 | MyBatis, JSTL 등 포함 | ✅ |
| 컨트롤러 URL → JSP 연결 흐름이 작동하는가 | `list.do`, `insert.do` 등 테스트 | ✅ |

---

## ✅ WAR 배포 후 오류 체크 방법

| 현상 | 원인 | 해결 |
| --- | --- | --- |
| 404 오류 | 서블릿 URL, web.xml 매핑 문제 | URL 오타 / `@WebServlet` 확인 |
| 500 오류 | 자바 코드 예외 / DB 연결 실패 | 콘솔 로그 분석 |
| WAR 압축 해제 안 됨 | WAR 내부 구조 오류 | `/WEB-INF/web.xml` 누락 가능 |

---

## ✅ 실무 팁

| 팁 | 설명 |
| --- | --- |
| 정적 리소스 위치 | `/WebContent/css`, `/js`, `/images` 권장 |
| 빌드 자동화 | Maven/Gradle 프로젝트면 `mvn package`로 WAR 생성 |
| 배포 자동화 | Jenkins, GitHub Actions 등으로 `.war` 빌드 + 원격 전송 가능 |
| Tomcat reload 없이 변경 | `/webapps` 내 변경은 재시작 필요 → hot reload 어려움 (IDE 연동 추천) |

---

## ✅ 다음 학습 확장 제안

| 주제 | 설명 |
| --- | --- |
| DB 초기 데이터 자동 삽입 | `init.sql` → Tomcat 시작 시 자동 실행 |
| Maven/Gradle 적용 | `pom.xml`로 의존성 자동 관리, 빌드 효율 향상 |
| Web.xml → 어노테이션 전환 | Spring MVC로 넘어가기 전 단계 |
| HTTPS 설정 | `localhost:8443`으로 SSL 테스트 |
