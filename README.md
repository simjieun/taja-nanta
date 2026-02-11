# 타자난타 ⚡

> 키보드를 두드려 스트레스를 날려버리세요! 신나는 키보드 난타 타자연습 플랫폼

Made with 💜 by **심Joyful**

## 🎯 프로젝트 소개

**타자난타**는 직장인들이 키보드를 신나게 두드리며 스트레스를 시원하게 해소할 수 있는 타자연습 플랫폼입니다.
상사 비난, 퇴사, 자기 치유, 공감 등 속이 뻥 뚫리는 문구들을 타이핑하면서
타자 속도와 정확도를 높이고, 쌓인 스트레스를 키보드에 쏟아내세요.

## ✨ 주요 기능

### ⌨️ 타자연습
- 실시간 속도(WPM) 및 정확도 측정
- 틀린 글자 하이라이팅
- 진행률 표시
- 레트로 터미널 스타일 UI

### 🎭 속이 시원해지는 문구들
- 😤 **상사 비난**: 참았던 불만을 키보드에 쏟아내세요
- 🚀 **퇴사**: 용기 있는 퇴사 관련 문구
- 💚 **치유**: 오늘 하루도 살아낸 나에게 보내는 위로
- 🤝 **공감**: 직장인이라면 100% 공감하는 문구

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
- 라이트/다크 모드 자동/수동 전환

### 📤 소셜 공유
- 익명으로 결과 공유
- Web Share API 지원
- 클립보드 복사 폴백

### ✍️ 사용자 문구 추가
- 나만의 문구 추가 기능
- 로컬 스토리지에 저장
- 즉시 연습에 반영

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Database**: LocalStorage + Supabase (PostgreSQL)
- **State Management**: React Hooks
- **Package Manager**: pnpm

## 📦 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd taja-healing
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정 (선택)

Supabase 연동이 필요한 경우 `.env.local` 파일을 생성하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> Supabase 없이도 로컬 스토리지 기반으로 동작합니다.

### 4. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
taja-healing/
├── app/
│   ├── layout.tsx               # 루트 레이아웃 (SEO 메타데이터)
│   ├── page.tsx                 # 메인 페이지
│   ├── globals.css              # 글로벌 스타일
│   ├── robots.ts                # 검색엔진 크롤링 설정
│   ├── sitemap.ts               # 사이트맵 생성
│   ├── practice/
│   │   ├── page.tsx             # 타자연습 페이지 (메타데이터)
│   │   └── PracticeContent.tsx  # 타자연습 클라이언트 컴포넌트
│   ├── stats/
│   │   ├── page.tsx             # 통계 페이지 (메타데이터)
│   │   └── StatsContent.tsx     # 통계 클라이언트 컴포넌트
│   └── phrases/
│       ├── page.tsx             # 문구 추가 페이지 (메타데이터)
│       └── PhrasesContent.tsx   # 문구 추가 클라이언트 컴포넌트
├── components/
│   ├── Header.tsx               # 헤더 (로고, 네비게이션)
│   ├── Footer.tsx               # 푸터
│   ├── TypingPractice.tsx       # 타자연습 핵심 컴포넌트
│   ├── LevelDisplay.tsx         # 레벨 표시
│   ├── DailyGoal.tsx            # 일일 목표
│   ├── StatsDashboard.tsx       # 통계 대시보드
│   ├── StatsCard.tsx            # 통계 카드
│   ├── ShareButton.tsx          # 공유 버튼
│   ├── AddPhraseForm.tsx        # 문구 추가 폼
│   └── ThemeToggle.tsx          # 테마 토글
├── data/
│   └── phrases.json             # 기본 제공 문구 데이터
├── hooks/
│   └── useUser.ts               # 사용자 상태 훅
├── lib/
│   ├── localData.ts             # 로컬 스토리지 데이터 관리
│   └── supabase.ts              # Supabase 클라이언트
├── types/
│   └── index.ts                 # TypeScript 타입 정의
├── supabase-schema.sql          # 데이터베이스 스키마
└── package.json
```

## 🎨 디자인 컨셉

**키보드 난타 & 스트레스 해소**를 테마로 한 에너지 넘치는 디자인:
- 레트로 터미널 스타일의 타자연습 화면
- 시원한 에메랄드 계열 컬러 팔레트
- 부드러운 둥근 모서리
- 직관적인 UI/UX

## 🔍 SEO 최적화

- Open Graph / Twitter Card 메타데이터
- JSON-LD 구조화 데이터 (WebApplication 스키마)
- `robots.txt` / `sitemap.xml` 자동 생성
- 페이지별 개별 메타데이터 설정
- Google / 네이버 검색엔진 인증 지원

## 🚀 배포

### Vercel에 배포하기

1. [Vercel](https://vercel.com)에 가입
2. GitHub 저장소 연결
3. 환경 변수 설정 (`NEXT_PUBLIC_SITE_URL` 등)
4. 배포!

```bash
pnpm build
```

## 📝 라이센스

© 2025 타자난타 by 심Joyful. All rights reserved.

## 🙏 감사합니다

키보드를 두드려 스트레스를 날려버리세요! 오늘도 고생한 당신을 응원합니다 ⚡

---

Made with 💜 by **심Joyful**
