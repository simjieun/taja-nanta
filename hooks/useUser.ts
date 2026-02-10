'use client'

import { useState, useEffect, useCallback } from 'react'
import { UserStats } from '@/types'
import { getLevelFromXP, getTitleFromLevel } from '@/types'
import * as localData from '@/lib/localData'

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function useUser() {
  const [userId, setUserId] = useState<string>('')
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [todayCharacters, setTodayCharacters] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

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

  const loadUserStats = useCallback((uid: string) => {
    const stats = localData.getUserStats(uid) ?? localData.createUserStats(uid)
    setUserStats(stats)
  }, [])

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId')
    if (!storedUserId) {
      storedUserId = generateUUID()
      localStorage.setItem('userId', storedUserId)
    }
    setUserId(storedUserId)
    loadUserStats(storedUserId)
    loadTodayProgress()
    setIsLoaded(true)
  }, [loadUserStats, loadTodayProgress])

  const updateStatsAfterPractice = useCallback(
    (phraseContent: string, wpm: number, accuracy: number, duration: number) => {
      if (!userId || !userStats) return

      const newTotalChars = userStats.total_characters_typed + phraseContent.length
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

      const newTodayChars = todayCharacters + phraseContent.length
      setTodayCharacters(newTodayChars)
      localStorage.setItem(
        'todayProgress',
        JSON.stringify({
          date: new Date().toDateString(),
          characters: newTodayChars,
        })
      )
    },
    [userId, userStats, todayCharacters]
  )

  return {
    userId,
    userStats,
    todayCharacters,
    isLoaded,
    updateStatsAfterPractice,
    refreshStats: () => userId && loadUserStats(userId),
  }
}
