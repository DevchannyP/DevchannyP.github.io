---
layout: post
title: "CHAP 0. MyBatis 실습 환경 준비"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro1.png
author: Devchanny
---


# ** 📌0.1단계: 개발 도구 설치 (Eclipse + JDK + Tomcat + MariaDB)

---

### 📌 [1] Java JDK 설치 (MyBatis 실행을 위한 필수 조건)

### 💡 JDK란?

> Java Development Kit. 자바로 개발하고 실행할 수 있게 해주는 기본 개발 도구 세트야.
> 

### ✅ 설치 방법

1. **공식 사이트 접속:**
    
    [https://jdk.java.net](https://jdk.java.net/) 또는 [https://adoptium.net](https://adoptium.net/)
    
    ⇒ `Temurin 11` 또는 `JDK 17` LTS 버전 추천
    
2. **운영체제에 맞게 다운로드:**
    
    예: Windows 64bit 사용자 → `.msi` 또는 `.zip` 선택
    
3. **설치 실행 후 환경변수 설정 (윈도우 기준):**

```
제어판 > 시스템 > 고급 시스템 설정 > 환경 변수
```

- 시스템 변수 추가
    
    ```
    변수 이름: JAVA_HOME
    변수 값: C:\Program Files\Java\jdk-17 (설치 경로 입력)
    ```
    
- `Path` 변수 편집
    
    ```
    %JAVA_HOME%\bin 추가
    ```
    
1. **설치 확인 (명령 프롬프트):**

```bash
java -version
```

> ✅ 결과 예시:
> 

```
java version "17.0.8"
Java(TM) SE Runtime Environment ...
```

---

### 📌 [2] Eclipse 설치 (Java 프로젝트 개발 IDE)

### 💡 Eclipse란?

> 자바 프로젝트를 개발, 실행, 디버깅하는 통합 개발 도구야. MyBatis를 연동하기 딱 좋아.
> 

### ✅ 설치 방법

1. **공식 사이트 접속:**
    
    https://www.eclipse.org/downloads/
    
2. **Eclipse IDE for Java Developers** 선택 후 다운로드
3. **설치 및 실행 후 워크스페이스 설정**
    - 예: `C:\workspace\mybatisstudy`

---

### 📌 [3] Apache Tomcat 설치 (웹 서버 역할)

### 💡 Tomcat이란?

> JSP/Servlet을 실행하고, MyBatis 연동 웹 프로젝트를 브라우저에서 확인하게 해주는 서버야.
> 

### ✅ 설치 방법

1. **공식 사이트 접속:**
    
    [https://tomcat.apache.org](https://tomcat.apache.org/)
    
2. **Tomcat 9.x or 10.x 버전 선택** → `Windows zip` 다운로드
3. **압축 해제 후 폴더 위치 지정**
예: `C:\tomcat9`
4. **Tomcat 실행 테스트**
    - `bin/startup.bat` 실행
    - 브라우저에서 `http://localhost:8080` 접속 → Tomcat 홈페이지 나오면 성공

---

### 📌 [4] MariaDB 설치 (MyBatis에서 사용하는 DB)

### 💡 MariaDB란?

> MySQL과 호환되는 오픈소스 관계형 데이터베이스야. MyBatis로 SQL을 연동할 때 주로 쓰여.
> 

### ✅ 설치 방법

1. **공식 사이트 접속:**
    
    https://mariadb.org/download/
    
2. **Windows용 설치 파일 다운로드**
3. **설치 과정 중 다음 설정 주의:**
    - Root 비밀번호 설정 (`root / 1234`처럼 기억하기 쉬운 걸로)
    - 포트 번호: 기본 3306 유지
    - 서비스 등록: 체크된 채 유지
4. **설치 확인**
    - 명령 프롬프트에서:
        
        ```bash
        mysql -u root -p
        ```
        
    - 비밀번호 입력 후 접속 성공 시 OK
5. **Workbench 또는 HeidiSQL 등 GUI 클라이언트 추천**
    - MariaDB 접속 및 테이블 생성 쉽게 가능

---

### ✅ 개발환경 최종 점검 체크리스트

| 항목 | 체크 여부 |
| --- | --- |
| JDK 설치 및 `java -version` 확인 | ✅ |
| Eclipse 설치 및 워크스페이스 세팅 | ✅ |
| Tomcat 압축 해제 및 `localhost:8080` 접속 확인 | ✅ |
| MariaDB 설치 및 `mysql -u root -p` 접속 확인 | ✅ |

✅ 0.2단계: MyBatis 실습 프로젝트 임포트 + 구조 분석

---

### 📁 Step 1: 프로젝트 임포트 (압축 해제 → Eclipse로 가져오기)

### 1️⃣ 압축 해제

- `mybatisstudy.zip`을 임의의 폴더에 압축 해제
    
    예: `C:\workspace\mybatisstudy`
    

### 2️⃣ Eclipse에서 프로젝트 임포트

1. **Eclipse 실행 → [File] → [Import] 클릭**
2. 선택 항목:
    
    ```
    General > Existing Projects into Workspace
    ```
    
3. [Select root directory] 클릭 → `C:\workspace\mybatisstudy` 선택
4. [Finish] 클릭

> ✅ 성공 시 mybatisstudy라는 프로젝트가 Package Explorer에 보이면 성공!
> 

---

### 📂 Step 2: 프로젝트 구조 분석

압축된 구조를 기준으로 일반적인 MyBatis + Java 구조는 다음과 같이 되어 있어:

```
mybatisstudy/
├── src/                           👉 Java 소스코드 (DAO, DTO, 메인 등)
│   └── test0415/                  👉 실제 실습용 패키지
│       └── Test1_A.java           👉 실습 메인 파일
├── WebContent/                    👉 JSP, HTML 등 웹 리소스
│   ├── WEB-INF/
│   │   ├── lib/                   👉 JDBC, MyBatis JAR 파일 위치
│   │   └── web.xml                👉 배포 설정 파일
├── StudentMapper1.xml            👉 XML Mapper 파일 (SQL 정의)
├── mybatis-config.xml            👉 MyBatis 설정파일
└── .classpath, .project           👉 Eclipse 자동 생성 파일

```

---

### 🔍 핵심 파일 설명 (한 줄 요약 포함)

| 파일/폴더 | 설명 |
| --- | --- |
| `src/test0415/Test1_A.java` | MyBatis의 기본 select 실습 코드가 작성된 메인 클래스 |
| `StudentMapper1.xml` | SQL 쿼리와 매핑 정보를 담은 XML 매퍼 파일 |
| `mybatis-config.xml` | MyBatis 전체 설정 파일 (Mapper 등록, 환경 설정 포함) |
| `WEB-INF/lib/` | JDBC 드라이버와 MyBatis 실행에 필요한 외부 라이브러리(JAR) 저장소 |
| `web.xml` | 웹 애플리케이션 배포 구성 파일 |
| `WebContent/` | JSP, HTML, CSS 등 웹 리소스를 위치시킬 공간 (현재 실습에는 최소화되어 있음) |

---

### 🔌 Step 3: Build Path 설정 (JAR 연결 확인)

1. `mybatisstudy` 프로젝트에서 **우클릭 → Build Path → Configure Build Path**
2. [Libraries] 탭에서 다음 항목 확인:
    - `mybatis-xxx.jar`
    - `mariadb-java-client.jar`
    - `log4j-xxx.jar` 등

> ❗ 빠져 있다면 WEB-INF/lib/ 폴더에 .jar 파일을 넣고 다시 Add JARs로 추가!
> 

---

### ✅ Step 4: 실행 확인

1. `Test1_A.java` 열기
2. 메인 함수 우클릭 → Run As → Java Application
3. 콘솔 결과 예시:
    
    ```
    전체 학생 수: 6명
    전체 학생 목록 출력
    1학년만 출력
    성이 김씨인 학생 출력
    주민번호로 여학생 구분
    ```
    

> ✅ 성공적으로 출력된다면 프로젝트 Import + 설정은 완벽히 완료된 거야!
> 

---

### 💡 디버깅 포인트 (중요)

| 문제 증상 | 점검할 것 |
| --- | --- |
| ClassNotFoundException | JAR 파일 누락 → Build Path 등록 확인 |
| IOException (config 파일 못 찾음) | `mybatis-config.xml` 경로 확인, `Resources.getResourceAsReader()` 경로 체크 |
| SQLException | DB URL/ID/PW 확인, MariaDB가 실행 중인지 확인 |

✅ 0.3단계: JDBC 연동 확인 (MyBatis 없이 직접 연결 테스트)

---

### 🎯 목표

Java 코드로 MariaDB에 직접 접속해서 데이터 조회가 되는지 확인하기

(성공 시 콘솔에 DB 내용 출력됨)

---

### 🛠 1단계: 환경 준비 확인

| 항목 | 확인사항 |
| --- | --- |
| MariaDB 실행 여부 | `mysql -u root -p` 명령어로 접속 확인 |
| DB 생성 | `mybatisdb` 라는 DB와 `student` 테이블이 존재해야 함 |
| JDBC 드라이버 | `WEB-INF/lib`에 `mariadb-java-client-xxx.jar` 파일이 있어야 함 |
| Eclipse 프로젝트에 Build Path 등록 | 해당 JAR이 Java Build Path에 포함되어 있어야 함 |

---

### 📄 2단계: 테스트용 student 테이블 생성

```sql
CREATE DATABASE mybatisdb;

USE mybatisdb;

CREATE TABLE student (
    hakbun INT PRIMARY KEY,
    irum VARCHAR(20),
    hakgwa VARCHAR(20),
    addr VARCHAR(50),
    phone VARCHAR(20),
    jumin VARCHAR(20),
    grade INT
);

INSERT INTO student VALUES
(1001, '김민수', '컴퓨터공학과', '서울시', '010-1234-5678', '010101-4123456', 1),
(1002, '이영희', '전자공학과', '부산시', '010-9876-5432', '020202-2234567', 2);
```

> 👉 이건 MariaDB에서 직접 실행해줘야 해. Workbench, DBeaver, HeidiSQL 등을 사용하면 편해.
> 

---

### 📦 3단계: JDBC 테스트용 Java 코드 작성 (`JDBCTest.java`)

`src/test0415` 패키지에 아래 파일을 생성:

```java
package test0415;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCTest {
    public static void main(String[] args) {
        // 1️⃣ DB 접속 정보
        String url = "jdbc:mariadb://localhost:3306/mybatisdb";
        String user = "root";         // 본인 DB 계정
        String password = "1234";     // 본인 DB 비번

        try {
            // 2️⃣ 드라이버 로딩
            Class.forName("org.mariadb.jdbc.Driver");
            System.out.println("✅ 드라이버 로딩 성공");

            // 3️⃣ DB 연결
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("✅ DB 연결 성공");

            // 4️⃣ SQL 실행
            String sql = "SELECT * FROM student";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            // 5️⃣ 결과 출력
            while (rs.next()) {
                int hakbun = rs.getInt("hakbun");
                String irum = rs.getString("irum");
                String hakgwa = rs.getString("hakgwa");
                System.out.println("📌 " + hakbun + " / " + irum + " / " + hakgwa);
            }

            // 6️⃣ 자원 정리
            rs.close();
            stmt.close();
            conn.close();

        } catch (Exception e) {
            e.printStackTrace();  // 에러 발생 시 콘솔 출력
        }
    }
}

```

---

### 🚀 4단계: 실행 결과 확인

### ▶ Eclipse에서 `JDBCTest.java` 실행 (Run As → Java Application)

### 👉 콘솔 출력 예시:

```
✅ 드라이버 로딩 성공
✅ DB 연결 성공
📌 1001 / 김민수 / 컴퓨터공학과
📌 1002 / 이영희 / 전자공학과

```

> ✅ 이 출력이 보이면 JDBC → MariaDB 연결 성공!
> 

---

### 🧯 오류 대응 체크리스트

| 에러 메시지 | 원인 | 해결방법 |
| --- | --- | --- |
| `ClassNotFoundException` | JDBC 드라이버 없음 | `mariadb-java-client.jar`을 lib에 추가 + Build Path 등록 |
| `SQLException: Access denied` | DB 계정/비번 오류 | `root / 비번` 확인 또는 권한 부여 |
| `Unknown database` | DB 존재 안 함 | `CREATE DATABASE mybatisdb` 실행 필요 |
| `Communications link failure` | DB 서버 접속 불가 | MariaDB 실행 중인지, 포트번호 맞는지 확인 (3306) |

✅ 0.4단계: lib 디렉토리 구성 – JAR 파일 완벽 등록하기


---

### 🔍 왜 `WEB-INF/lib`에 JAR 파일을 넣어야 해?

- JSP/Servlet 프로젝트는 톰캣이 실행할 때 `WEB-INF/lib` 폴더 안에 있는 `.jar` 파일만 자동으로 인식해.
- 여기에 필요한 라이브러리를 정확히 넣지 않으면 실행 중 **ClassNotFoundException**, **NoClassDefFoundError** 발생!

---

## 🧱 구성할 필수 JAR 목록

| 용도 | 파일명 예시 | 설명 |
| --- | --- | --- |
| 📦 JDBC 드라이버 | `mariadb-java-client-3.0.3.jar` | Java에서 MariaDB에 연결할 때 필요 |
| 📦 MyBatis | `mybatis-3.5.15.jar` | SQL 매핑 기능 제공 |
| 🧾 로그 출력 | `log4j-1.2.17.jar` | 쿼리 로그, 에러 로그 등 출력 |
| 🔌 기타 | `slf4j-api.jar`, `slf4j-log4j12.jar` | log4j와 연동시 필요 (버전 따라 다름) |

> 💡 mybatisstudy.zip 안에 대부분 포함되어 있을 가능성이 높아. 없을 경우 직접 다운로드하면 돼.
> 

---

## 📁 1단계: `WEB-INF/lib` 폴더 확인

1. Eclipse에서 `WebContent/WEB-INF/lib` 폴더 열기
2. 아래 `.jar` 파일들이 있는지 확인해:
    
    ```
    mariadb-java-client-3.0.3.jar
    mybatis-3.5.15.jar
    log4j-1.2.17.jar
    slf4j-api-1.7.30.jar
    slf4j-log4j12-1.7.30.jar
    ```
    

> ❗ 빠진 파일이 있다면 [공식 사이트] 또는 Maven Repository에서 개별 다운로드 가능.
> 

---

## 🌐 공식 다운로드 링크 모음

| 라이브러리 | 다운로드 링크 |
| --- | --- |
| MyBatis | [https://mybatis.org](https://mybatis.org/) |
| MariaDB JDBC | https://mariadb.com/downloads/#connectors |
| Log4J | https://logging.apache.org/log4j/1.2/download.html |
| SLF4J | https://www.slf4j.org/download.html |

---

## 🔧 2단계: Eclipse Build Path에 JAR 추가

> ⚠️ lib 폴더에 jar를 넣는 것만으로는 실행되지 않아. 반드시 Build Path에도 연결해야 해!
> 
1. 프로젝트 우클릭 → `Build Path` → `Configure Build Path`
2. [Libraries] 탭 클릭
3. 오른쪽 [Add JARs] 클릭
4. `WebContent/WEB-INF/lib` 안의 `.jar` 전부 선택
5. [Apply and Close]

---

### ✅ Build Path 등록 성공 확인법

1. `Referenced Libraries` 항목에 위의 JAR들이 보이면 OK
2. 코드에서 아래처럼 `import`가 오류 없이 작동하는지 확인:

```java
import org.apache.ibatis.session.SqlSession;
import java.sql.Connection;
```

---

## 🧪 3단계: 간단한 로그 출력 테스트 (log4j 작동 확인)

`log4j.properties` 파일이 `src` 또는 `WEB-INF/classes` 폴더에 있어야 함:

```
log4j.rootLogger=DEBUG, stdout

log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%p] %m%n
```

실행 시 콘솔에 쿼리 로그나 DEBUG 메시지가 보이면 log4j 정상 작동!

---

## 🧯 자주 발생하는 에러와 해결법

| 증상 | 원인 | 해결방법 |
| --- | --- | --- |
| `ClassNotFoundException` | jar 파일 누락 | `lib`에 넣고 Build Path 등록 |
| `No suitable driver found` | 드라이버 불일치 | `mariadb-java-client.jar` 반드시 확인 |
| 쿼리 로그 안 찍힘 | log4j 설정 누락 | `log4j.properties` 작성 + 등록 확인 |
