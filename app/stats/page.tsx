'use client'

import StatsDashboard from '@/components/StatsDashboard'
import LevelDisplay from '@/components/LevelDisplay'
import DailyGoal from '@/components/DailyGoal'
import { useUser } from '@/hooks/useUser'
import * as localData from '@/lib/localData'

export default function StatsPage() {
  const { userId, userStats, todayCharacters, isLoaded } = useUser()

  if (!isLoaded) return null

  if (!userStats) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="text-6xl">📊</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          아직 통계가 없어요
        </h2>
        <p className="text-gray-600 dark:text-white/70">
          타자연습을 시작하면 여기에 통계가 표시됩니다
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          나의 통계
        </h2>
        <p className="text-lg text-gray-600 dark:text-white/70">
          꾸준한 연습이 실력을 만듭니다
        </p>
      </div>

      {/* 레벨 & 일일 목표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LevelDisplay
          totalCharacters={userStats.total_characters_typed}
          level={userStats.level}
          title={userStats.title}
        />
        <DailyGoal todayCharacters={todayCharacters} goal={500} />
      </div>

      {/* 통계 대시보드 */}
      <StatsDashboard
        stats={userStats}
        recentSessions={localData.getRecentSessions(userId)}
      />
    </div>
  )
}
