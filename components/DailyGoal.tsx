'use client'

import { useEffect, useState } from 'react'

interface DailyGoalProps {
  todayCharacters: number
  goal?: number
}

export default function DailyGoal({ todayCharacters, goal = 500 }: DailyGoalProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 애니메이션 효과
    const timer = setTimeout(() => {
      setProgress((todayCharacters / goal) * 100)
    }, 100)
    return () => clearTimeout(timer)
  }, [todayCharacters, goal])

  const isCompleted = todayCharacters >= goal

  return (
    <div className="retro-stat-card rounded-lg p-5" style={{ fontFamily: "'Courier New', 'Noto Sans KR', monospace" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs retro-text-dim" style={{ letterSpacing: '0.15em' }}>DAILY MISSION</div>
        <div className="text-xs retro-text-glow">
          {todayCharacters} / {goal}
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="mb-3">
        <div className="retro-progress-track h-3 rounded-none">
          <div
            className="h-full rounded-none transition-all duration-1000"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: isCompleted ? 'var(--retro-amber)' : 'var(--retro-green)',
              boxShadow: isCompleted
                ? '0 0 8px rgba(255, 176, 0, 0.4)'
                : '0 0 8px rgba(51, 255, 51, 0.4)',
            }}
          />
        </div>
      </div>

      {/* 시각적 게이지 (ASCII 스타일) */}
      <div className="text-xs mb-3 retro-text-dim" style={{ letterSpacing: '0.05em' }}>
        [{'='.repeat(Math.min(Math.floor(progress / 5), 20))}
        {'-'.repeat(Math.max(20 - Math.floor(progress / 5), 0))}]
        {' '}{Math.min(Math.round(progress), 100)}%
      </div>

      {/* 상태 메시지 */}
      <div className="text-xs">
        {isCompleted ? (
          <span className="retro-text-amber">
            *** MISSION COMPLETE ***
          </span>
        ) : (
          <span className="retro-text-dim">
            {goal - todayCharacters} CHARS TO GO...
          </span>
        )}
      </div>
    </div>
  )
}
