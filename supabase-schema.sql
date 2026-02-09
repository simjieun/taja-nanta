-- 타자연습 플랫폼 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요

-- 1. 문구 테이블
CREATE TABLE IF NOT EXISTS phrases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('boss_rant', 'resignation', 'healing', 'empathy')),
  content TEXT NOT NULL,
  is_user_submitted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 사용자 통계 테이블
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  total_practice_time INTEGER DEFAULT 0, -- 초 단위
  total_characters_typed INTEGER DEFAULT 0,
  average_wpm DECIMAL(5,2) DEFAULT 0,
  average_accuracy DECIMAL(5,2) DEFAULT 0,
  level INTEGER DEFAULT 1,
  title TEXT DEFAULT '신입 퇴사러',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 연습 세션 테이블
CREATE TABLE IF NOT EXISTS practice_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  phrase_id UUID REFERENCES phrases(id),
  wpm DECIMAL(5,2) NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  duration INTEGER NOT NULL, -- 초 단위
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_phrases_category ON phrases(category);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_created_at ON practice_sessions(created_at);

-- 초기 문구 데이터 삽입
INSERT INTO phrases (category, content, is_user_submitted) VALUES
-- 상사 비난 카테고리
('boss_rant', '오늘도 상사의 무의미한 회의로 시간을 낭비했다. 내 시간은 소중하다.', false),
('boss_rant', '상사는 결재만 하면 되는데 왜 자꾸 일을 만드는가. 제발 좀 가만히 있어주세요.', false),
('boss_rant', '상사의 갑질은 언제까지 참아야 하는가. 나도 인간이고 싶다.', false),
('boss_rant', '일은 나한테 다 떠넘기고 성과는 상사가 가져간다. 이게 회사인가.', false),
('boss_rant', '상사의 비논리적인 지시에 지쳤다. 제발 논리적으로 생각해주세요.', false),

-- 퇴사 카테고리
('resignation', '퇴사는 도망이 아니라 더 나은 선택을 향한 용기다.', false),
('resignation', '이번 달 말에 퇴사서를 낸다. 드디어 자유다.', false),
('resignation', '퇴사 후 내 인생은 내가 결정한다. 더 이상 회사에 묶이지 않는다.', false),
('resignation', '퇴사는 끝이 아니라 새로운 시작이다. 나는 할 수 있다.', false),
('resignation', '월급보다 소중한 건 내 정신 건강이다. 퇴사 준비 시작.', false),

-- 치유 카테고리
('healing', '오늘 하루도 고생한 나 자신에게 박수를 보낸다. 잘했어.', false),
('healing', '힘들 때는 쉬어가도 괜찮아. 천천히 가도 괜찮아.', false),
('healing', '나는 충분히 잘하고 있어. 내 자신을 믿어.', false),
('healing', '완벽하지 않아도 괜찮아. 나는 나답게 살아가면 돼.', false),
('healing', '힘든 하루였지만 내일은 더 나은 날이 올 거야. 파이팅!', false),

-- 공감 카테고리
('empathy', '직장인의 월요병은 국민병이다. 당신만 그런 게 아니에요.', false),
('empathy', '점심시간이 하루 중 가장 행복한 시간이라는 데 동의합니다.', false),
('empathy', '퇴근길 지하철에서 느끼는 허무함, 다들 느끼는 거죠?', false),
('empathy', '회사에서 웃는 얼굴은 가면이고, 집에 와서야 진짜 얼굴이 나온다.', false),
('empathy', '출근길에 복권 당첨을 꿈꾸는 건 직장인의 로망이다.', false);

-- Row Level Security (RLS) 활성화 (선택사항)
ALTER TABLE phrases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

-- 모든 사람이 문구를 읽을 수 있도록 허용
CREATE POLICY "Anyone can read phrases" ON phrases FOR SELECT USING (true);

-- 인증된 사용자가 문구를 추가할 수 있도록 허용
CREATE POLICY "Authenticated users can insert phrases" ON phrases FOR INSERT WITH CHECK (true);

-- 사용자 자신의 통계만 읽고 쓸 수 있도록
CREATE POLICY "Users can read own stats" ON user_stats FOR SELECT USING (true);
CREATE POLICY "Users can insert own stats" ON user_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own stats" ON user_stats FOR UPDATE USING (true);

-- 사용자 자신의 세션만 읽고 쓸 수 있도록
CREATE POLICY "Users can read own sessions" ON practice_sessions FOR SELECT USING (true);
CREATE POLICY "Users can insert own sessions" ON practice_sessions FOR INSERT WITH CHECK (true);
