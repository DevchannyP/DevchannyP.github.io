---
layout: post
title: "CHAP 00. MyBatis목차"
date: 2025-06-10
categories: [backend, backend-fw, mybatis]
tags: [backend, backend-fw, mybatis]
thumbnail: /assets/img/post-thumbnails/intro0.png
author: Devchanny
---


# ** 📌마이바티스(MyBatis) 완전 실습형 학습 목차 (파일 기반) ** 

---

## ✅ 0단계: 실습 환경 준비

| 단계 | 학습 항목 | 설명 |
| --- | --- | --- |
| 0.1 | 개발 도구 설치 | Eclipse, JDK, Apache Tomcat, MariaDB 설치 |
| 0.2 | 마이바티스 프로젝트 구조 분석 | 업로드한 `mybatisstudy.zip` 구조 분석 및 세팅 |
| 0.3 | JDBC 연동 확인 | `test JDBC` → DB 연결 확인 실습 |
| 0.4 | `lib` 디렉토리 구성 | MyBatis + JDBC + Log4J JAR 추가 및 Build Path 등록 |

---

## 📗 1단계: MyBatis 기초 익히기

| 단계 | 학습 항목 | 실습 예제 |
| --- | --- | --- |
| 1.1 | MyBatis란? & 동작 흐름 | XML 기반 ORM 구조 설명 + `StudentMapper1.xml` 예제 분석 |
| 1.2 | SqlSessionFactoryBuilder 이해 | `Resources.getResourceAsReader()` → 세션 생성 흐름 실습 |
| 1.3 | selectOne / selectList 사용법 | `학생 수`, `전체 학생 조회`, `1학년 학생 조회` 실습 |
| 1.4 | 매퍼 파일 구성 | `StudentMapper1.xml`의 구조 (namespace, resultType, parameterType 등) |
| 1.5 | resultMap vs resultType 비교 | 객체 자동 매핑 vs 수동 설정 실습 비교 |

---

## 📘 2단계: 파라미터 매핑 고급 이해

| 단계 | 학습 항목 | 실습 예제 |
| --- | --- | --- |
| 2.1 | parameterType의 작동 원리 | 단일 값 vs Map vs 객체 전달 실습 |
| 2.2 | SQL 조건절과 매핑 | 성이 '김'씨인 학생, 주민번호 → 여학생 판별 |
| 2.3 | MyBatis SQL 로깅 | `log4j.properties` 설정으로 쿼리 출력 실습 |
| 2.4 | 마이바티스 #{} vs ${} 차이 | SQL Injection 방지 실습 포함 |

---

## 📗 3단계: INSERT / UPDATE / DELETE 실습

| 단계 | 학습 항목 | 실습 예제 |
| --- | --- | --- |
| 3.1 | INSERT 구문 작성 | 학생 등록 기능 실습 |
| 3.2 | UPDATE 구문 | 학년 수정, 전화번호 수정 |
| 3.3 | DELETE 구문 | 특정 ID 학생 삭제 |
| 3.4 | 트랜잭션 처리 | `commit`, `rollback` 개념 실습 |

---

## 📘 4단계: 동적 SQL 심화

| 단계 | 학습 항목 | 실습 예제 |
| --- | --- | --- |
| 4.1 | if, choose, where, trim | 조건별 조회 (`성`, `학년`, `전화번호` 등 조합) |
| 4.2 | foreach 사용 | 다중 학번 조회 (배열/리스트로 전달) |
| 4.3 | 동적 INSERT | 빈값 제외 INSERT |
| 4.4 | SQL 재사용 - include | 공통 WHERE절/SELECT절 재사용 |

---

## 📗 5단계: DAO 구조 설계 및 분리

| 단계 | 학습 항목 | 실습 예제 |
| --- | --- | --- |
| 5.1 | DAO 클래스 설계 | `StudentDao` 분리 구조로 변경 |
| 5.2 | DTO 클래스 설계 | `Student.java` 필드 구조 정리 |
| 5.3 | DAO + DTO + Mapper 완전 분리 실습 | 유지보수성과 확장성 고려 설계 실습 |

---

## 📘 6단계: 인터페이스 기반 매퍼 구조

| 단계 | 학습 항목 | 실습 예제 |
| --- | --- | --- |
| 6.1 | 인터페이스 기반 매퍼 구조란? | `StudentMapper.java` + `StudentMapper.xml` 연결 실습 |
| 6.2 | MyBatis Config 설정 확장 | `<mappers>` 태그 설정법 |
| 6.3 | 자동 매퍼 스캔 (`@Mapper`) | Annotation 활용 방식도 비교 소개 (기초만) |

---

## 📗 7단계: 예외 처리 및 고급 에러 디버깅

| 단계 | 학습 항목 | 실습 예제 |
| --- | --- | --- |
| 7.1 | try-catch, finally 구조 | DB 연결 실패, 쿼리 실패 처리 실습 |
| 7.2 | SQL 예외 메시지 분석법 | 오류 로그 분석 실전 |
| 7.3 | NullPointerException 방지 패턴 | select 결과 null 대응 실습 |
| 7.4 | XML 매퍼 문법 오류 디버깅 | common error checklist 정리 제공 |

---

## 📘 8단계: 실전 프로젝트 구조 설계

| 단계 | 구성 요소 | 설명 |
| --- | --- | --- |
| 8.1 | 도메인 예시 선정 | 학생관리, 게시판, 로그인 시스템 중 1개 선택 |
| 8.2 | 요구사항 도출 | 기능 정리, 입력/출력 정의, DB 설계 |
| 8.3 | Controller → Service → DAO → MyBatis 흐름 설계 | MVC 구조 + Mapper 연동 실습 |
| 8.4 | JSP + JSTL 연동 | View 출력 및 입력폼 처리까지 연계 |
| 8.5 | 프로젝트 배포 | WAR 파일 생성 → Tomcat 배포 테스트 |

---

## 📕 9단계: 기술면접 & 최종정리

| 항목 | 내용 |
| --- | --- |
| 🔍 면접 예상 질문 20선 | resultType vs resultMap 차이, MyBatis vs JPA 비교 등 |
| 💡 실전 팁 20 | 자주 발생하는 실수 정리, DAO/DTO 구조 설계 전략 |
| ✅ 점검 체크리스트 | 실습 완료 점검표, SQL 예외 대응 전략 |

