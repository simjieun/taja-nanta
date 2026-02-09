'use client'

import { useState, useEffect, useCallback } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CategorySelector from '@/components/CategorySelector'
import TypingPractice from '@/components/TypingPractice'
import LevelDisplay from '@/components/LevelDisplay'
import DailyGoal from '@/components/DailyGoal'
import StatsDashboard from '@/components/StatsDashboard'
import ShareButton from '@/components/ShareButton'
import AddPhraseForm from '@/components/AddPhraseForm'
import { Category, Phrase, UserStats } from '@/types'
import { getLevelFromXP, getTitleFromLevel } from '@/types'
import * as localData from '@/lib/localData'

// 간단한 UUID 생성 함수
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export default function Home() {
  const [userId, setUserId] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [todayCharacters, setTodayCharacters] = useState(0)
  const [showStats, setShowStats] = useState(false)

  // 오늘 진행률 로드
  const loadTodayProgress = useCallback(() => {
    const today = new Date().toDateString()
    const stored = localStorage.getItem('todayProgress')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.date === today) {
        setTodayCharacters(parsed.characters)
        return
      }
    }
    setTodayCharacters(0)
  }, [])

  // 사용자 통계 로드
  const loadUserStats = useCallback((uid: string) => {
    let stats = localData.getUserStats(uid)

    if (!stats) {
      // 새 사용자 통계 생성
      stats = localData.createUserStats(uid)
    }

    setUserStats(stats)
  }, [])

  // 사용자 ID 초기화
  useEffect(() => {
    let storedUserId = localStorage.getItem('userId')
    if (!storedUserId) {
      storedUserId = generateUUID()
      localStorage.setItem('userId', storedUserId)
    }
    setUserId(storedUserId)
    loadUserStats(storedUserId)
    loadTodayProgress()
  }, [loadUserStats, loadTodayProgress])

  // 카테고리 선택 시 랜덤 문구 로드
  const loadRandomPhrase = (category: Category) => {
    const phrases = localData.getPhrasesByCategory(category)

    if (phrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * phrases.length)
      setCurrentPhrase(phrases[randomIndex])
    }
  }

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    loadRandomPhrase(category)
  }

  // 타자 완료 핸들러
  const handleTypingComplete = (wpm: number, accuracy: number, duration: number) => {
    if (!userId || !currentPhrase) return

    // 세션 저장
    localData.savePracticeSession({
      user_id: userId,
      phrase_id: currentPhrase.id,
      wpm,
      accuracy,
      duration,
    })

    // 통계 업데이트
    if (userStats) {
      const newTotalChars = userStats.total_characters_typed + currentPhrase.content.length
      const newLevel = getLevelFromXP(newTotalChars)
      const newTitle = getTitleFromLevel(newLevel)

      const updatedStats = {
        total_practice_time: userStats.total_practice_time + duration,
        total_characters_typed: newTotalChars,
        average_wpm: (userStats.average_wpm + wpm) / 2,
        average_accuracy: (userStats.average_accuracy + accuracy) / 2,
        level: newLevel,
        title: newTitle,
      }

      const newStats = localData.updateUserStats(userId, updatedStats)
      if (newStats) setUserStats(newStats)

      // 오늘 진행률 업데이트
      const newTodayChars = todayCharacters + currentPhrase.content.length
      setTodayCharacters(newTodayChars)
      localStorage.setItem(
        'todayProgress',
        JSON.stringify({
          date: new Date().toDateString(),
          characters: newTodayChars,
        })
      )
    }

    // 3초 후 다음 문구로
    setTimeout(() => {
      if (selectedCategory) {
        loadRandomPhrase(selectedCategory)
      }
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8">
        {/* 웰컴 메시지 */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            ✨ 타자로 스트레스를 날려버리세요 ✨
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            직장인의 마음을 이해하는 타자연습 플랫폼
          </p>
        </div>

        {/* 카테고리 선택 */}
        {!currentPhrase && (
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}

        {/* 타자 연습 */}
        {currentPhrase && (
          <div className="space-y-4">
            <TypingPractice
              text={currentPhrase.content}
              onComplete={handleTypingComplete}
              onNext={() => selectedCategory && loadRandomPhrase(selectedCategory)}
            />

            {/* 액션 버튼 */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentPhrase(null)
                  setSelectedCategory(null)
                }}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                다른 카테고리
              </button>
              <button
                onClick={() => selectedCategory && loadRandomPhrase(selectedCategory)}
                className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all"
              >
                다른 문구
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
          </div>
        )}

        {/* 레벨 & 일일 목표 */}
        {userStats && currentPhrase && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LevelDisplay
              totalCharacters={userStats.total_characters_typed}
              level={userStats.level}
              title={userStats.title}
            />
            <DailyGoal todayCharacters={todayCharacters} goal={500} />
          </div>
        )}

        {/* 문구 추가 버튼 */}
        <div className="flex justify-center">
          <AddPhraseForm onSuccess={() => selectedCategory && loadRandomPhrase(selectedCategory)} />
        </div>

        {/* 통계 보기/숨기기 */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowStats(!showStats)}
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:shadow-lg transition-all border-2 border-gray-200 dark:border-gray-700"
          >
            {showStats ? '📊 통계 숨기기' : '📊 통계 보기'}
          </button>
        </div>

        {/* 통계 대시보드 */}
        {showStats && userStats && (
          <StatsDashboard
            stats={userStats}
            recentSessions={localData.getRecentSessions(userId)}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
