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
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          오늘의 목표 {isCompleted && '🎯'}
        </h3>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {todayCharacters} / {goal}자
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${
              isCompleted
                ? 'bg-green-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* 상태 메시지 */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {isCompleted ? (
          <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            오늘의 목표를 달성했어요! 🎉
          </div>
        ) : (
          <div>
            목표까지 {goal - todayCharacters}자 남았어요. 화이팅! 💪
          </div>
        )}
      </div>
    </div>
  )
}
