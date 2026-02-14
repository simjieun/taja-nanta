'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Phrase } from '@/types'

/**
 * 비용 절감 전략:
 * 1. 앱 최초 로드 시 전체 문구를 1번만 API 호출
 * 2. 이후 랜덤 선택은 클라이언트 메모리에서 처리 (추가 API 호출 없음)
 * 3. 모듈 레벨 캐시: 같은 세션에서 컴포넌트 언마운트/재마운트 시에도 재호출 없음
 * 4. 서버 측 Cache-Control 1시간 + ISR revalidate로 CDN 캐시 활용
 */

// 모듈 레벨 캐시 (페이지 새로고침 전까지 유지)
let cachedPhrases: Phrase[] | null = null
let fetchPromise: Promise<Phrase[]> | null = null

async function fetchAllPhrases(): Promise<Phrase[]> {
  if (cachedPhrases) return cachedPhrases

  // 동시 요청 방지: 이미 진행 중인 fetch가 있으면 그것을 재사용
  if (fetchPromise) return fetchPromise

  fetchPromise = fetch('/api/phrases')
    .then(res => {
      if (!res.ok) throw new Error('문구를 불러오는데 실패했습니다')
      return res.json() as Promise<Phrase[]>
    })
    .then(data => {
      cachedPhrases = data
      fetchPromise = null
      return data
    })
    .catch(err => {
      fetchPromise = null
      throw err
    })

  return fetchPromise
}

interface UsePhrasesOptions {
  category?: string
}

interface UsePhrasesReturn {
  phrases: Phrase[]
  loading: boolean
  error: string | null
  getRandomPhrase: (excludeId?: string) => Phrase | null
  getPhrase: (id: string) => Phrase | null
}

export function usePhrases(options: UsePhrasesOptions = {}): UsePhrasesReturn {
  const { category } = options
  const [phrases, setPhrases] = useState<Phrase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const allPhrasesRef = useRef<Phrase[]>([])

  useEffect(() => {
    let cancelled = false

    fetchAllPhrases()
      .then(data => {
        if (cancelled) return
        allPhrasesRef.current = data
        const filtered = category
          ? data.filter(p => p.category === category)
          : data
        setPhrases(filtered)
        setLoading(false)
      })
      .catch(err => {
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [category])

  const getRandomPhrase = useCallback((excludeId?: string): Phrase | null => {
    const pool = excludeId ? phrases.filter(p => p.id !== excludeId) : phrases
    if (pool.length === 0) return phrases[0] ?? null
    return pool[Math.floor(Math.random() * pool.length)]
  }, [phrases])

  const getPhrase = useCallback((id: string): Phrase | null => {
    return allPhrasesRef.current.find(p => p.id === id) ?? null
  }, [])

  return { phrases, loading, error, getRandomPhrase, getPhrase }
}
