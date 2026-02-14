'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TypingPractice from '@/components/TypingPractice'
import LevelDisplay from '@/components/LevelDisplay'
import DailyGoal from '@/components/DailyGoal'
import ShareButton from '@/components/ShareButton'
import { Phrase } from '@/types'
import * as localData from '@/lib/localData'
import { useUser } from '@/hooks/useUser'

export default function PracticeContent() {
  const router = useRouter()
  const { userId, userStats, todayCharacters, isLoaded, updateStatsAfterPractice } = useUser()
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null)

  const loadRandomPhrase = useCallback(() => {
    const allPhrases = localData.getAllPhrases()
    if (allPhrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * allPhrases.length)
      setCurrentPhrase(allPhrases[randomIndex])
    }
  }, [])

  const handleTypingComplete = (wpm: number, accuracy: number, duration: number) => {
    if (!currentPhrase) return

    localData.savePracticeSession({
      user_id: userId,
      phrase_id: currentPhrase.id,
      wpm,
      accuracy,
      duration,
    })

    updateStatsAfterPractice(currentPhrase.content, wpm, accuracy, duration)
  }

  // 첫 로드 시 자동으로 문구 불러오기
  useEffect(() => {
    loadRandomPhrase()
  }, [loadRandomPhrase])

  if (!isLoaded) return null

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-4 -mx-4 px-4 rounded-2xl" style={{ background: 'var(--retro-bg)' }}>
      {/* 타자 연습 */}
      {currentPhrase && (
        <div className="retro-boot space-y-5 w-full flex flex-col items-center">
          <TypingPractice
            text={currentPhrase.content}
            onComplete={handleTypingComplete}
            onNext={loadRandomPhrase}
          />

          {/* 액션 버튼 (레트로 스타일) */}
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => router.push('/')}
              className="retro-btn retro-btn-amber px-5 py-2.5 rounded text-sm"
            >
              [ESC] 처음으로
            </button>
            <button
              onClick={loadRandomPhrase}
              className="retro-btn px-5 py-2.5 rounded text-sm"
            >
              [F5] 다른 문구
            </button>
            {userStats && (
              <ShareButton
                wpm={userStats.average_wpm}
                accuracy={userStats.average_accuracy}
                level={userStats.level}
                title={userStats.title}
              />
            )}
          </div>

          {/* 레벨 & 일일 목표 */}
          {userStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
              <LevelDisplay
                totalCharacters={userStats.total_characters_typed}
                level={userStats.level}
                title={userStats.title}
              />
              <DailyGoal todayCharacters={todayCharacters} goal={500} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
