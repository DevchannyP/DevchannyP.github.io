---
layout: post
title: "Devchanny | Resume & Portfolio"
date: 2025-07-28
categories: [resume]
tags: [resume, site, dev]
thumbnail: /assets/img/post-thumbnails/resume-profile.png
author: 박찬희
---

# 🚀 Devchanny Resume & Portfolio

> **BackEnd & FullStack Developer**  
> <code>Java</code> <code>Spring Boot</code> <code>Next.js</code> <code>React</code> <code>MariaDB</code> <code>AWS</code> <code>CI/CD</code>  
> **문제 해결과 코드, 실전 설계에 진심입니다.**

---

## Quick Navigation

- [Summary](#1--summary)
- [Skills](#2--skills)
- [Projects](#3--projects)
- [Experience](#4--experience)
- [Certifications & Education](#5--certifications--education)
- [Open Source / Side](#6--open-source--side)
- [Contact](#7--contact--blog--portfolio)

---

## 1. 🗂️ Summary

```yaml
이름: 박찬희 (Devchanny)
역할: Backend/Fullstack Developer
성향: 설계, 최적화, 자동화, 커뮤니케이션에 강점
특징: 실전 아키텍처/데이터/UX/협업에 폭넓은 경험
👨‍💻 문제 해결/설계/최적화 중심의 개발자

🚀 Spring Boot, React, DB, DevOps, 클라우드 실전 경험

🤝 협업/문서화/리더십, 코드 리뷰 및 교육 경험 다수

2. 🛠️ Skills
typescript
const Skills = {
  Backend: ['Java', 'Spring Boot', 'JPA', 'Node.js', 'JWT'],
  Frontend: ['React', 'Next.js', 'TypeScript', 'SSR/CSR'],
  Database: ['MariaDB', 'PostgreSQL', 'Redis'],
  DevOps: ['Docker', 'AWS', 'Github Actions', 'Nginx'],
  ETC: ['Python', 'Shell', 'Git', 'Notion']
};
영역	기술/툴	주 사용처/비고	숙련도
Backend	Spring Boot, JPA, Node.js	API, 인증/인가, 모듈설계	★★★★☆
Frontend	React, Next.js, TypeScript	대시보드, SSR/CSR, UI 구현	★★★★☆
DB/Cache	MariaDB, PostgreSQL, Redis	모델링, 인덱스/트랜잭션	★★★★☆
DevOps	Docker, AWS, Github Actions	CI/CD, 자동배포	★★★★☆
ETC	Python, Shell, Git, Notion	데이터/스크립트, 협업/문서화	★★★★☆

3. 💼 Projects
<details> <summary><b>지방청년 플랫폼</b> <code>Spring Boot</code> <code>Next.js</code> <code>MariaDB</code> <code>AWS</code></summary>
기간: 2024.03 ~ 2025.07

주요 역할: 시스템/DB/백엔드/프론트엔드 설계&개발, 인프라 자동화

성과: 사용자 인증/정책추천/마이페이지/대시보드 핵심 기능 주도 구현

코드 아키텍처 예시

sql
-- 유저 활동/점수 로그 테이블
CREATE TABLE user_activity_event (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  region_id BIGINT NOT NULL,
  action_type ENUM('POST','COMMENT','POLICY_LIKE','REPORT','LOGIN','SYSTEM'),
  score_delta INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
</details> <details> <summary><b>Devfolio (OpenSource/Side)</b> <code>React</code> <code>Notion API</code> <code>Github Actions</code></summary>
Notion 기반 이력서/블로그 정적 생성, Github Actions 자동배포

API/컴포넌트 기반 마크다운 포트폴리오 템플릿

shell
# 워크플로우 자동화 예시
git clone https://github.com/DevchannyP/markdown-resume-template.git
npm run build
</details>
4. 🏢 Experience
json
[
  {
    "company": "㈜굿코드랩",
    "period": "2022.03~2023.12",
    "role": "사내 플랫폼 개발, DevOps, R&D"
  },
  {
    "type": "프리랜서/협력",
    "period": "2023.12~현재",
    "project": "지방청년 Fullstack 개발"
  }
]
기간	소속/프로젝트	역할/성과
2022.03~2023.12	㈜굿코드랩	플랫폼/백엔드/DevOps 개발, R&D
2023.12~현재	프리랜서/협력	지방청년 프로젝트 등 Fullstack 리딩/설계

5. 🎓 Certifications & Education
python
certs = [
  {"title": "정보처리기사", "date": "2023.06", "org": "한국산업인력공단"},
  {"title": "AWS Cloud Practitioner", "date": "2024.01", "org": "Amazon"}
]
종류	내용/기관	일자	비고
학위	컴퓨터공학, OO대학교	2022.02	졸업
자격	정보처리기사	2023.06	한국산업인력공단
수료	KDT(백엔드)	2023.09	삼성SW캠퍼스
기타	AWS Cloud Practitioner	2024.01	(예시)

6. 🌱 Open Source / Side
bash
# 오픈소스/강의/기여
contribute --repo=DevchannyP/markdown-resume-template --feature=API
API/모니터링 툴 오픈소스 기여

실전 SQL/백엔드 강의/아키텍처 설계 블로그/노션 연재

7. 🔗 Contact / Blog / Portfolio
json
{
  "Blog": "https://devchanny.github.io",
  "Portfolio": "https://your-notion-link",
  "Github": "https://github.com/DevchannyP",
  "Email": "devchanny@gmail.com"
}
블로그: devchanny.github.io

포트폴리오: Notion Resume

GitHub: github.com/DevchannyP

이메일: devchanny@gmail.com

실전 코드와 설계, 협업 문서 모두 직접 경험하고 성과로 증명한 개발자

(상세 내용/코드/문서는 블로그, 깃허브, 노션에서 확인 가능)

<!-- **활용 팁** - Collapse, 코드, 표 등 어디서든 깨지지 않는 마크다운 문법만 사용 - Github, Velog, Notion 등 지원하는 곳에 바로 복붙 가능 - Mermaid, HTML, CSS 등 추가적 시각화는 지원여부에 따라 커스텀 (예시 코드 참고) -->
yaml

---

### ✅ **설명**

- **모든 코드/표/네비/섹션 오류 없이 연결**
- **Collapse(접힘) 섹션은 Github, Notion, Velog 등에서 모두 안전하게 작동**
- **코드블록(typescript, sql, shell, python, json, yaml) 실제 이력/경험/스택 강조**
- **표/리스트/링크/섹션 등 가독성 최적화**
- **“사이트처럼” 섹션별 이동 가능**

---

### 💡 **추가 안내**

- Mermaid/HTML 태그, 더 복잡한 스타일/슬라이드/탭 등은  
  **GitHub Pages, Notion 등 플랫폼별 추가 커스텀 필요**
- 실제 사이트(Next.js/React/MDX 기반)로 변환 시 JSX 구조로 바로 재가공 가능

---

#### 한 줄 요약  
> 코드, 표, collapse, 네비게이션, 실전 예시를 한 번에 제공하는 “정적 개발자 이력서 사이트” 마크다운 완성본!

---

**필요 시**  
- Next.js/React/JSX 기반 “진짜 웹사이트용 이력서 코드”  
- Mermaid, 커스텀 스타일 적용법  
- PDF/슬라이드/노션 자동 변환  
- 플랫폼별 커스텀 가이드  
까지 요청해주시면 바로 이어서 제공 가능합니다!
