import { Phrase, UserStats, PracticeSession } from '@/types'
import phrasesData from '@/data/phrases.json'

// 로컬 스토리지 키
const STORAGE_KEYS = {
  USER_STATS: 'taja_user_stats',
  PRACTICE_SESSIONS: 'taja_practice_sessions',
  USER_PHRASES: 'taja_user_phrases'
}

// JSON 데이터를 Phrase 타입으로 변환
const phrases: Phrase[] = phrasesData as Phrase[]

// 사용자가 추가한 문구를 가져오기
function getUserPhrases(): Phrase[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PHRASES)
  return stored ? JSON.parse(stored) : []
}

// 모든 문구 가져오기 (기본 + 사용자 추가)
export function getAllPhrases(): Phrase[] {
  return [...phrases, ...getUserPhrases()]
}

// 문구 추가
export function addPhrase(content: string): Phrase {
  const newPhrase: Phrase = {
    id: `user_${Date.now()}`,
    content,
    is_user_submitted: true,
    created_at: new Date().toISOString()
  }

  const userPhrases = getUserPhrases()
  userPhrases.push(newPhrase)
  localStorage.setItem(STORAGE_KEYS.USER_PHRASES, JSON.stringify(userPhrases))

  return newPhrase
}

// 사용자 통계 가져오기
export function getUserStats(userId: string): UserStats | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEYS.USER_STATS)
  if (!stored) return null

  const allStats = JSON.parse(stored)
  return allStats[userId] || null
}

// 사용자 통계 생성
export function createUserStats(userId: string): UserStats {
  const newStats: UserStats = {
    id: `stats_${Date.now()}`,
    user_id: userId,
    total_practice_time: 0,
    total_characters_typed: 0,
    average_wpm: 0,
    average_accuracy: 0,
    level: 1,
    title: '신입 퇴사러',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_STATS)
    const allStats = stored ? JSON.parse(stored) : {}
    allStats[userId] = newStats
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(allStats))
  }

  return newStats
}

// 사용자 통계 업데이트
export function updateUserStats(userId: string, updates: Partial<UserStats>): UserStats | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem(STORAGE_KEYS.USER_STATS)
  const allStats = stored ? JSON.parse(stored) : {}

  if (!allStats[userId]) return null

  allStats[userId] = {
    ...allStats[userId],
    ...updates,
    updated_at: new Date().toISOString()
  }

  localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(allStats))
  return allStats[userId]
}

// 연습 세션 저장
export function savePracticeSession(session: Omit<PracticeSession, 'id' | 'created_at'>): PracticeSession {
  const newSession: PracticeSession = {
    ...session,
    id: `session_${Date.now()}`,
    created_at: new Date().toISOString()
  }

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.PRACTICE_SESSIONS)
    const sessions = stored ? JSON.parse(stored) : []
    sessions.push(newSession)

    // 최근 100개만 유지
    if (sessions.length > 100) {
      sessions.shift()
    }

    localStorage.setItem(STORAGE_KEYS.PRACTICE_SESSIONS, JSON.stringify(sessions))
  }

  return newSession
}

// 사용자의 최근 연습 세션 가져오기
export function getRecentSessions(userId: string, limit: number = 10): PracticeSession[] {
  if (typeof window === 'undefined') return []

  const stored = localStorage.getItem(STORAGE_KEYS.PRACTICE_SESSIONS)
  if (!stored) return []

  const sessions: PracticeSession[] = JSON.parse(stored)
  return sessions
    .filter(s => s.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
}
