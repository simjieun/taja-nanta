'use client'

import { getLevelFromXP, getTitleFromLevel } from '@/types'

interface LevelDisplayProps {
  totalCharacters: number
  level?: number
  title?: string
}

export default function LevelDisplay({ totalCharacters, level, title }: LevelDisplayProps) {
  const currentLevel = level || getLevelFromXP(totalCharacters)
  const currentTitle = title || getTitleFromLevel(currentLevel)

  // 다음 레벨까지 필요한 글자 수
  const progress = ((totalCharacters % 1000) / 1000) * 100

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-900 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">현재 레벨</div>
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">LV {currentLevel}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">칭호</div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{currentTitle}</div>
        </div>
      </div>

      {/* 경험치 바 */}
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-400">
          <span>다음 레벨까지</span>
          <span>{1000 - (totalCharacters % 1000)}자 남음</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        총 {totalCharacters.toLocaleString()}자 타이핑 완료
      </div>
    </div>
  )
}
