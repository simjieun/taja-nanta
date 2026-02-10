'use client'

import StatsCard from './StatsCard'
import { UserStats } from '@/types'

interface StatsDashboardProps {
  stats: UserStats
  recentSessions?: Array<{
    wpm: number
    accuracy: number
    created_at: string
  }>
}

export default function StatsDashboard({ stats, recentSessions = [] }: StatsDashboardProps) {
  // 최근 세션에서 가장 많이 사용된 속도 계산
  const bestWpm = recentSessions.length > 0
    ? Math.max(...recentSessions.map(s => s.wpm))
    : stats.average_wpm

  // 총 연습 시간을 시간/분으로 변환
  const hours = Math.floor(stats.total_practice_time / 3600)
  const minutes = Math.floor((stats.total_practice_time % 3600) / 60)
  const timeDisplay = hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        📊 나의 통계
      </h2>

      {/* 주요 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          icon="⚡"
          title="평균 속도"
          value={stats.average_wpm.toFixed(1)}
          subtitle="WPM"
        />
        <StatsCard
          icon="🎯"
          title="평균 정확도"
          value={`${stats.average_accuracy.toFixed(1)}%`}
        />
        <StatsCard
          icon="⏱️"
          title="총 연습 시간"
          value={timeDisplay}
        />
        <StatsCard
          icon="✍️"
          title="총 타이핑"
          value={stats.total_characters_typed.toLocaleString()}
          subtitle="글자"
        />
      </div>

      {/* 최고 기록 */}
      <div className="bg-white dark:bg-black rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-neutral-800">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          🏆 최고 기록
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 dark:bg-neutral-900 rounded-xl p-4 border border-emerald-200 dark:border-neutral-800">
            <div className="text-sm text-gray-600 dark:text-white/70 mb-1">최고 속도</div>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {bestWpm.toFixed(1)} <span className="text-lg">WPM</span>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-neutral-900 rounded-xl p-4 border border-emerald-200 dark:border-neutral-800">
            <div className="text-sm text-gray-600 dark:text-white/70 mb-1">현재 레벨</div>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              LV {stats.level}
            </div>
          </div>
        </div>
      </div>

      {/* 최근 연습 기록 */}
      {recentSessions.length > 0 && (
        <div className="bg-white dark:bg-black rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-neutral-800">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            📈 최근 연습 기록
          </h3>
          <div className="space-y-3">
            {recentSessions.slice(0, 5).map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg"
              >
                <div className="flex-1">
                  <div className="text-sm text-gray-600 dark:text-white/70">
                    {new Date(session.created_at).toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-white/70">속도</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      {session.wpm} WPM
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-white/70">정확도</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      {session.accuracy.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
