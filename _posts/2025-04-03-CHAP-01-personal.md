---
layout: post
title: "자바스크립트 타자 게임 프로젝트"
date: 2025-03-12
categories: [project-sub, personal]
tags: [project-sub, personal]
thumbnail: /assets/img/post-thumbnails/intro4.png
author: Devchanny
---

# 자바스크립트 타자 게임 프로젝트

## 💡 1단계: 프로젝트 개요 (What & Why)

| 항목 | 내용 |
| --- | --- |
| **프로젝트명** | JavaScript 개념 타자 게임 (Typing Game for JS Concept) |
| **목표** | JavaScript 핵심 개념을 타자 입력과 시각 피드백으로 반복 학습할 수 있도록 구성한 **실습형 학습 게임 웹앱** |
| **개발 배경** | 단순 암기보다 **입력-피드백-설명 반복 루프**가 학습에 더 효과적이라 판단하여, 직접 경험 기반으로 개념 학습할 수 있는 도구를 제작 |

📌 핵심

> "이 프로젝트는 JavaScript 핵심 개념을 눈으로 보고 손으로 입력하며 기억할 수 있게끔 만든 학습용 타자 게임입니다. 영문 타자의 속도를 향상시키고, '공부 모드'와 '게임 모드'로 나누어 다양한 학습 스타일을 지원하도록 설계했습니다."
> 

---

## 💡 2단계: 주요 기능 및 사용 기술 (How)

### 🔧 주요 기능 요약

| 기능 | 설명 |
| --- | --- |
| ✅ 개념 타이핑 게임 | JS 코드가 화면 위에서 떨어지고, 해당 코드를 타이핑하면 정답 처리 |
| ✅ 개념 버블 표시 | 각 코드에 대한 개념 풍선이 떠오르며 시각적 개념 연결 |
| ✅ 공부 모드 / 게임 모드 | 공부 모드: 맞추면 팝업으로 개념 예제 설명게임 모드: 점수, 목숨, 랭크 시스템 도입 |
| ✅ 효과음 시스템 | 정답 효과음, 오답 효과음, 배경음 재생 |
| ✅ 난이도 및 속도 조절 | 사용자가 난이도 및 코드 떨어지는 속도 조절 가능 |
| ✅ 자동 일시정지 | 탭 이탈 시 자동 정지, 복귀 시 자동 재개 처리 |

---

### 🛠️ 사용 기술 스택

- **HTML/CSS**: 시각적 구성 및 스타일링 (베이지톤 디자인, 애니메이션 포함)
- **JavaScript (Vanilla)**: DOM 조작, 이벤트 처리, 애니메이션 제어, 타이머 등
- **Web Audio API**: 정답/오답 효과음, 배경음 재생
- **CSS Animation**: 코드 낙하 애니메이션, 개념 강조 이펙트 구현

---

## 💡 3단계: 문제 상황과 해결 과정

| 문제 상황 | 해결 방법 |
| --- | --- |
| 🔇 브라우저에서 자동 오디오 재생 차단됨 | 클릭/키보드 상호작용 이후 `audio.play()` 호출로 재생 유도 |
| ⏸️ 사용자가 탭 이동 시에도 코드가 계속 떨어짐 | `window.blur`, `window.focus` 이벤트로 코드 낙하 자동 일시정지/재개 처리 |
| 🎯 정답을 입력해도 입력 타이밍과 낙하 타이밍이 어긋나 오답 처리됨 | `getBoundingClientRect`로 정확한 위치 비교 후 낙하 시점 판단 |
| 🎮 오답이거나 자동 낙하된 코드에도 효과음 처리 필요 | 정답/오답 타이밍 구분하여 `playHitSound()` 또는 `playMissSound()` 분리 호출 |
| 🧠 공부 모드에서 설명 팝업이 나와도 코드가 계속 떨어짐 | 일시정지 처리(`.paused`), 팝업이 꺼진 후 `startDropping()`으로 재개 |

## 💡 기능별 코드 분석

---

## ✅ 1. 생명 시스템: updateLivesDisplay()

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | `script` 내부, 상단 약 500줄 부근 |
| 🧠 코드 내용 |  |

```jsx
function updateLivesDisplay() {
  lifeBar.innerHTML = '';
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    lifeBar.appendChild(heart);
  }
}
```

| 🎯 설계 의도 |

- 현재 생명 수(`lives`)만큼 하트를 그려줌
- 새로고침 시 자동 렌더링되도록 설계
- 코드가 떨어져서 생명을 잃으면 이 함수를 호출해 시각적으로 생명 변화 표현

---

## ✅ 2. 랭크 시스템: rankLevels

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | `script` 내부, 약 540줄 |
| 🧠 코드 내용 |  |

```jsx
const rankLevels = [
  { threshold: 0, speed: 40000, rank: '🟫 브론즈' },
  { threshold: 10, speed: 33000, rank: '🟪 실버' },
  { threshold: 30, speed: 28000, rank: '🟨 골드' },
  { threshold: 60, speed: 20000, rank: '🟩 플레티넘' },
  { threshold: 100, speed: 12000, rank: '🟦 다이아' },
  { threshold: 150, speed: 6000, rank: '🔶 마스터' },
  { threshold: 200, speed: 2000, rank: '🔷 챌린저' },
];
```

| 🎯 설계 의도 |

- 점수(`score`)에 따라 단계적으로 랭크 및 애니메이션 속도 변경
- `updateRankByScore()` 함수와 연동되어 자동 갱신
- 유저의 성취감을 시각적으로 표현 (게이미피케이션 요소 강화)

---

## ✅ 3. 랭크 갱신 함수: updateRankByScore()

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | `script` 하단부 약 1560줄 |
| 🧠 코드 내용 |  |

```jsx
function updateRankByScore() {
  for (let i = rankLevels.length - 1; i >= 0; i--) {
    if (score >= rankLevels[i].threshold && currentLevel !== i) {
      currentLevel = i;
      dropSpeed = rankLevels[i].speed;
      rankDisplay.textContent = `랭크: ${rankLevels[i].rank}`;
      startDropping(); // 새 속도 적용
      break;
    }
  }
}
```

| 🎯 설계 의도 |

- **점수 변화 → 랭크 변화 → 속도 변화**라는 연결 구조 구성
- 하향 랭크는 허용하지 않도록 `currentLevel !== i` 조건
- 코드 난이도에 따라 실시간 난이도 조절 자동화

---

## ✅ 4. 게임 오버 처리: showGameOverPopup()

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | `script` 하단 약 1500줄 |
| 🧠 코드 내용 |  |

```jsx
function showGameOverPopup() {
  let tier = '';
  if (score >= 200) tier = '🔷 챌린저';
  else if (score >= 150) tier = '🔶 마스터';
  else if (score >= 100) tier = '🟦 다이아';
  else if (score >= 60) tier = '🟩 플레티넘';
  else if (score >= 30) tier = '🟨 골드';
  else if (score >= 10) tier = '🟪 실버';
  else tier = '🟫 브론즈';

  gameoverMessage.innerHTML = `
    💀 게임 오버!<br>
    맞춘 개수: <strong>${score}개</strong><br>
    당신의 티어: <strong>${tier}</strong>
  `;
  gameoverPopup.style.display = 'block';
}
```

| 🎯 설계 의도 |

- 생명(❤️)이 0이 되면 이 함수 호출
- **점수 기반 최종 랭크 계산 → 게임 오버 팝업 표시**
- 최종 랭크 보상 피드백 제공으로 사용자 몰입도 향상
- 

## ✅ 5. 코드 떨어뜨리기 시작: `startDropping()`

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | `script` 중간, 약 620줄 |
| 🧠 코드 내용 |  |

```jsx
function startDropping() {
  if (intervalId) clearInterval(intervalId); // 중복 방지
  intervalId = setInterval(dropCode, dropInterval); // 일정 간격마다 dropCode 실행

  if (gameMode === 'game') {
    updateLivesDisplay(); // 게임 모드에서는 하트 표시
  }
}
```

| 🎯 설계 의도 |

- 일정 주기마다 코드 떨어뜨리기 (`setInterval`)
- 게임 모드일 경우에는 생명(하트)도 함께 표시
- 기존 타이머 제거 → 새 타이머 시작을 반복 가능하게 구성

---

## ✅ 6. 떨어지는 코드 생성: `dropCode()`

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | `script` 중간, 약 630줄 |
| 🧠 코드 내용 (요약) |  |

```jsx
const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
const codeEl = document.createElement('div');
codeEl.classList.add('falling-code');
codeEl.textContent = snippet.code;
codeEl.dataset.concept = snippet.concept;
codeEl.style.left = Math.random() * 80 + '%';
codeEl.style.animationDuration = dropSpeed + 'ms';
game.appendChild(codeEl);
```

| 🎯 설계 의도 |

- `코드 + 개념` 세트를 DOM 요소로 만들어 떨어뜨림
- 좌우 랜덤 위치 지정으로 게임성 증가
- 애니메이션 속도는 현재 랭크의 `dropSpeed`를 반영
- 큐에 추가하여 개념 풍선과의 연결 유지

---

## ✅ 7. 입력 처리 및 정답 판별: `keydown` 이벤트

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | `userInput.addEventListener('keydown', ...)`, 약 970줄 |
| 🧠 코드 내용 |  |

```jsx
if (e.key === 'Enter') {
  const typed = userInput.value.trim();
  for (let el of fallingCodes) {
    if (el.textContent === typed) {
      playHitSound();
      removeFromQueue(el.dataset.concept);
      score++;
      updateRankByScore();
      pauseGameForExam(matchedSnippet);
    }
  }
}
```

| 🎯 설계 의도 |

- 사용자가 Enter 키를 누르면 `현재 입력값`을 정답 코드들과 비교
- 정확히 맞으면:
    - 정답 사운드 재생
    - 해당 개념 풍선 제거
    - 점수 증가 및 랭크 업데이트
    - 개념 설명 팝업 표시 (모드별 분기 처리)

---

## ✅ 8. 정답 개념 강조: `highlightConcept(concept)`

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | 약 1070줄 |
| 🧠 코드 내용 |  |

```jsx
function highlightConcept(concept) {
  const allConcepts = document.querySelectorAll('.concept');
  allConcepts.forEach(el => {
    el.classList.remove('highlight');
    if (el.dataset.concept === concept) {
      el.classList.add('highlight');
    }
  });
}
```

| 🎯 설계 의도 |

- 정답을 맞췄을 때 해당 개념 풍선에 시각 효과 주기
- 사용자가 "내가 무슨 개념을 맞췄는지" 확실하게 인식하도록 도움

---

## ✅ 9. 정답 이펙트 표시: `showCorrectEffectAtPosition()`

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | 약 1580줄 |
| 🧠 코드 내용 |  |

```jsx
function showCorrectEffectAtPosition(el) {
  const clone = el.cloneNode(true);
  clone.classList.add('correct-hit');
  clone.style.position = 'fixed';
  clone.style.top = rect.top + 'px';
  clone.style.left = rect.left + 'px';
  ...
  document.body.appendChild(clone);
  setTimeout(() => { clone.remove(); }, 500);
}
```

| 🎯 설계 의도 |

- 코드 블록을 정답 처리했을 때 시각적 팝 애니메이션 추가
- 복제된 요소를 `화면 고정(fixed)` 상태로 보여줘서 생생한 피드백 제공

## ✅ 10. 개념 설명 팝업 + 일시정지: `pauseGameForExam(snippet)`

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | 약 1120줄 |
| 🧠 코드 내용 요약 |  |

```jsx
if (gameMode === 'study') {
  clearInterval(intervalId); // 코드 떨어지기 멈춤
  examPopup.innerHTML = `
    <div class="exam-title">📘개념:${snippet.concept}</div>
    <pre>${snippet.exam}</pre>
    <div class="exam-note">⏸️ Enter 키를 누르면 계속 진행됩니다!</div>`;
  examPopup.style.display = 'block';
  waitingForResume = true;
}
```

| 🎯 설계 의도 |

- *공부 모드(📘)**에서는 정답을 맞췄을 때:
    - 코드를 잠깐 멈춤
    - 설명 팝업 띄움
    - `Enter` 누를 때까지 기다림
- *게임 모드(🎮)**에서는 자동으로 5초간 설명 보여주고 바로 재개

---

## ✅ 11. 효과음 재생 함수: `playHitSound()`, `playMissSound()`

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | `<script>` 제일 위 |
| 🧠 코드 내용 |  |

```jsx
function playHitSound() {
  hitSound.currentTime = 0;
  hitSound.play().catch(err => console.warn("정답 효과음 실패:", err));
}
```

| 🎯 설계 의도 |

- 정답/오답에 따라 효과음이 정확한 타이밍에 재생되도록 함
- `currentTime = 0`으로 항상 맨 앞부터 시작
- 모바일/브라우저 제한 시 실패해도 에러 안 나게 `catch` 처리

---

## ✅ 12. 배경음악 자동 재생 제어: `tryPlayBGM()`

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | 약 1620줄 |
| 🧠 코드 내용 요약 |  |

```jsx
function tryPlayBGM() {
  if (!bgmStarted) {
    bgm.play().then(() => {
      bgmStarted = true;
    }).catch(err => console.warn("BGM 실패", err));
  }
}
```

| 🎯 설계 의도 |

- **브라우저 자동 재생 차단** 회피
- 사용자 클릭 또는 키입력 시 `tryPlayBGM()` 호출 → BGM 재생 시도
- 한 번만 재생되도록 `bgmStarted`로 제어

---

## ✅ 13. 탭 이탈 감지 (자동 일시정지/재개)

| 항목 | 내용 |
| --- | --- |
| ✅ 코드 위치 | 약 1650줄 |
| 🧠 코드 내용 요약 |  |

```jsx
window.addEventListener('blur', () => {
  clearInterval(intervalId); // 떨어지기 멈춤
  document.querySelectorAll('.falling-code').forEach(el => el.classList.add('paused'));
});

window.addEventListener('focus', () => {
  if (!intervalId) startDropping(); // 다시 시작
  document.querySelectorAll('.falling-code').forEach(el => el.classList.remove('paused'));
});
```

| 🎯 설계 의도 |

- 사용자가 **다른 탭으로 이동하거나**, **다시 돌아오면** 자동으로 멈췄다 재개
- 모든 떨어지는 코드도 `paused` 클래스 추가/삭제로 애니메이션 일시정지 처리

---

## ✅ 14. 전체 구조 요약

| 구성 요소 | 설명 |
| --- | --- |
| 🧡 생명 시스템 | `lives`, `updateLivesDisplay()` — 떨어뜨리면 하트 차감 |
| 🏆 랭크 시스템 | `score`, `rankLevels`, `updateRankByScore()` — 점수 기준으로 티어/속도 상승 |
| ⌨️ 입력 검사 | `keydown` 이벤트 — 정답이면 개념 강조 + 설명 팝업 |
| 🎈 개념 버블 | `renderConcepts()` — 현재 화면에 뜬 코드들의 개념 버블 표시 |
| 🎮 모드 구분 | 공부 모드 vs 게임 모드 → 일시정지/하트 표시 방식 차이 |
| 🔇 사운드 효과 | 정답/오답/배경음 모두 `try-catch`로 안전하게 처리 |
| 🔁 자동 재개 | 탭 전환 감지로 코드 떨어뜨리기 일시정지/재시작 처리 |

---

## 💡 4단계: 결과 및 성과 (Result)

### 🎯 구현 완료 목록

- 공부/게임 모드 기능 완전 분리 구현
- 난이도 3단계 (easy, medium, hard), 속도 7단계 조절
- 총 7단계의 랭크 티어 (브론즈 → 챌린저) 시스템 구현
- 팝업 방식의 개념 설명, 애니메이션 강조 효과까지 완비
- 효과음, 배경음, 타이밍 제어, 상태 관리 등 완전한 인터랙션 UX 구현

### ✅ 성과 요약 문장

> "실제 사용자와 테스트하며 시각적 몰입감, 타이핑 반응성, 개념 학습 피드백을 모두 고려한 실용적 웹 학습 도구를 완성하였습니다."
> 

---

## 💡 5단계: 확장 가능성 및 개선 방향 (Future Plan)

| 개선 항목 | 설명 |
| --- | --- |
| 📦 문제 데이터 외부화 | JSON 또는 Firebase 등 외부 API 연동 구조로 변경 |
| 🧠 개념 데이터 확장 | JavaScript 외에도 HTML, CSS, Python 등으로 확장 가능 |
| 🧑‍🎓 리더보드 도입 | 점수 기반 실시간 랭킹 시스템 구축 (DB 연동 필요) |
| 📱 모바일 최적화 | 모바일 세로 모드 대응 레이아웃 설계 필요 |
| 💡 코드 하이라이팅 | `highlight.js` 등을 이용해 코드 단어 강조 |

---
