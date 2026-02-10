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
    <div className="retro-stat-card rounded-lg p-5" style={{ fontFamily: "'Courier New', 'Noto Sans KR', monospace" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs retro-text-dim mb-1" style={{ letterSpacing: '0.15em' }}>LEVEL</div>
          <div className="text-3xl font-bold retro-text-glow">LV.{String(currentLevel).padStart(2, '0')}</div>
        </div>
        <div className="text-right">
          <div className="text-xs retro-text-dim mb-1" style={{ letterSpacing: '0.15em' }}>TITLE</div>
          <div className="text-base font-bold retro-text-amber">{currentTitle}</div>
        </div>
      </div>

      {/* 경험치 바 */}
      <div className="mb-3">
        <div className="flex justify-between text-xs retro-text-dim mb-1.5">
          <span>NEXT LV</span>
          <span>{1000 - (totalCharacters % 1000)} CHARS LEFT</span>
        </div>
        <div className="retro-progress-track h-2 rounded-none">
          <div
            className="retro-progress-bar h-full rounded-none transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-xs retro-text-dim">
        TOTAL: {totalCharacters.toLocaleString()} CHARS TYPED
      </div>
    </div>
  )
}
