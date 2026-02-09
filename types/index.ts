export type Category = 'boss_rant' | 'resignation' | 'healing' | 'empathy'

export interface Phrase {
  id: string
  category: Category
  content: string
  is_user_submitted: boolean
  created_at: string
}

export interface UserStats {
  id: string
  user_id: string
  total_practice_time: number
  total_characters_typed: number
  average_wpm: number
  average_accuracy: number
  level: number
  title: string
  created_at: string
  updated_at: string
}

export interface PracticeSession {
  id: string
  user_id: string
  phrase_id: string
  wpm: number
  accuracy: number
  duration: number
  created_at: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  boss_rant: '상사 비난',
  resignation: '퇴사',
  healing: '치유',
  empathy: '공감'
}

export const CATEGORY_EMOJIS: Record<Category, string> = {
  boss_rant: '😤',
  resignation: '🚀',
  healing: '💚',
  empathy: '🤝'
}

export const LEVEL_TITLES = [
  '신입 퇴사러',
  '주니어 퇴사러',
  '시니어 퇴사러',
  '팀장 퇴사러',
  '임원 퇴사러',
  '프로 퇴사러',
  '레전드 퇴사러',
  '퇴사의 신',
]

export function getLevelFromXP(totalCharacters: number): number {
  // 1000자마다 레벨업
  return Math.min(Math.floor(totalCharacters / 1000) + 1, LEVEL_TITLES.length)
}

export function getTitleFromLevel(level: number): string {
  return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)]
}
