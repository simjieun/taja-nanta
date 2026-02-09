# 타자힐링 ✨

> 직장인들의 스트레스를 타자로 날려버리는 힐링 타자연습 플랫폼

Made with 💜 by **심Joyful**

## 🎯 프로젝트 소개

**타자힐링**은 직장인들이 타자연습을 통해 스트레스를 해소할 수 있는 독특한 플랫폼입니다.
상사 비난, 퇴사, 자기 치유, 공감 등의 카테고리로 나눠진 문구들을 타이핑하면서
속도와 정확도를 향상시키고, 동시에 마음의 안정을 찾을 수 있습니다.

## ✨ 주요 기능

### 📝 타자연습
- 실시간 속도(WPM) 및 정확도 측정
- 틀린 글자 하이라이팅
- 진행률 표시

### 🎭 4가지 카테고리
- 😤 **상사 비난**: 상사에 대한 불만을 표출
- 🚀 **퇴사**: 퇴사와 관련된 용기있는 문구
- 💚 **치유**: 자기 자신을 위로하는 문구
- 🤝 **공감**: 직장인이라면 공감할 수 있는 문구

### 🎮 게임화 요소
- 레벨 시스템 (신입 퇴사러 → 퇴사의 신)
- 타이핑한 글자 수에 따른 경험치
- 칭호 획득
- 일일 목표 달성

### 📊 통계 대시보드
- 평균 타자 속도 (WPM)
- 평균 정확도
- 총 연습 시간
- 총 타이핑 글자 수
- 최근 연습 기록

### 🌓 다크모드
- 힐링을 위한 부드러운 테마
- 라이트/다크 모드 자동/수동 전환

### 📤 소셜 공유
- 익명으로 결과 공유
- Web Share API 지원
- 클립보드 복사 폴백

### ✍️ 사용자 문구 추가
- 나만의 문구 추가 기능
- 카테고리별 분류
- 즉시 반영

## 🛠️ 기술 스택

- **Frontend**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Hooks
- **Package Manager**: npm

## 📦 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd taja-practice
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 수정하여 Supabase 정보를 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Supabase 데이터베이스 설정

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다
2. Supabase SQL Editor에서 `supabase-schema.sql` 파일의 내용을 실행합니다
3. 이렇게 하면 필요한 테이블들이 자동으로 생성됩니다:
   - `phrases`: 타자연습 문구
   - `user_stats`: 사용자 통계
   - `practice_sessions`: 연습 세션 기록

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
taja-practice/
├── app/
│   ├── page.tsx              # 메인 페이지
│   ├── layout.tsx            # 루트 레이아웃
│   └── globals.css           # 글로벌 스타일
├── components/
│   ├── Header.tsx            # 헤더 (로고, 테마 토글)
│   ├── Footer.tsx            # 푸터 (브랜딩)
│   ├── CategorySelector.tsx # 카테고리 선택
│   ├── TypingPractice.tsx   # 타자연습 컴포넌트
│   ├── LevelDisplay.tsx     # 레벨 표시
│   ├── DailyGoal.tsx        # 일일 목표
│   ├── StatsDashboard.tsx   # 통계 대시보드
│   ├── StatsCard.tsx        # 통계 카드
│   ├── ShareButton.tsx      # 공유 버튼
│   ├── AddPhraseForm.tsx    # 문구 추가 폼
│   └── ThemeToggle.tsx      # 테마 토글
├── lib/
│   └── supabase.ts          # Supabase 클라이언트
├── types/
│   └── index.ts             # TypeScript 타입 정의
├── supabase-schema.sql      # 데이터베이스 스키마
└── package.json
```

## 🎨 디자인 컨셉

**힐링과 치유**를 테마로 한 부드럽고 따뜻한 디자인:
- 그라데이션 배경 (보라 → 핑크)
- 부드러운 둥근 모서리
- 편안한 색상 팔레트
- 직관적인 UI/UX

## 🚀 배포

### Vercel에 배포하기

1. [Vercel](https://vercel.com)에 가입
2. GitHub 저장소 연결
3. 환경 변수 설정 (Supabase URL, Key)
4. 배포!

```bash
npm run build
```

## 📝 라이센스

© 2024 타자힐링 by 심Joyful. All rights reserved.

## 🙏 감사합니다

직장인 여러분의 스트레스 해소와 타자 실력 향상을 기원합니다! 💜

---

Made with 💜 by **심Joyful**
