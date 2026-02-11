'use client'

import { useState } from 'react'
import { Phrase } from '@/types'
import * as localData from '@/lib/localData'

export default function PhrasesContent() {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [userPhrases, setUserPhrases] = useState<Phrase[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('taja_user_phrases')
    return stored ? JSON.parse(stored) : []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (content.trim().length < 10) {
      setError('최소 10자 이상 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const newPhrase = localData.addPhrase(content.trim())
      setUserPhrases((prev) => [...prev, newPhrase])
      setContent('')
      setSuccessMessage('문구가 추가되었습니다!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError('문구 추가에 실패했습니다. 다시 시도해주세요.')
      console.error('Error adding phrase:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (phraseId: string) => {
    const stored = localStorage.getItem('taja_user_phrases')
    if (!stored) return

    const phrases: Phrase[] = JSON.parse(stored)
    const filtered = phrases.filter((p) => p.id !== phraseId)
    localStorage.setItem('taja_user_phrases', JSON.stringify(filtered))
    setUserPhrases(filtered)
  }

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          나만의 문구 추가하기
        </h2>
        <p className="text-lg text-gray-600 dark:text-white/70">
          당신만의 특별한 문구를 등록하고 타자연습에 활용하세요
        </p>
      </div>

      {/* 문구 추가 폼 */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-black rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-neutral-800 space-y-5"
        >
          {/* 문구 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              문구 입력 (최소 10자)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-neutral-900 text-gray-800 dark:text-white transition-colors"
              placeholder="당신의 마음을 표현해보세요..."
            />
            <div className="text-sm text-gray-500 dark:text-white/50 mt-1">
              {content.length}자
            </div>
          </div>

          {/* 에러 / 성공 메시지 */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {successMessage && (
            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              {successMessage}
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting || content.trim().length < 10}
            className="w-full px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '추가 중...' : '문구 추가하기'}
          </button>
        </form>
      </div>

      {/* 내가 추가한 문구 목록 */}
      {userPhrases.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            내가 추가한 문구 ({userPhrases.length}개)
          </h3>
          <div className="space-y-3">
            {userPhrases.map((phrase) => (
              <div
                key={phrase.id}
                className="flex items-start justify-between gap-4 p-4 bg-white dark:bg-black rounded-xl border-2 border-gray-200 dark:border-neutral-800"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 dark:text-white wrap-break-word">
                    {phrase.content}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-1">
                    {new Date(phrase.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(phrase.id)}
                  className="shrink-0 p-2 text-gray-400 hover:text-red-500 dark:text-white/40 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                  title="삭제"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
