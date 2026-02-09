'use client'

import { useState, useEffect, useRef } from 'react'

interface TypingPracticeProps {
  text: string
  onComplete: (wpm: number, accuracy: number, duration: number) => void
  onNext?: () => void
}

export default function TypingPractice({ text, onComplete, onNext }: TypingPracticeProps) {
  const [input, setInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const inputRef = useRef<HTMLInputElement>(null)

  // text가 변경될 때마다 상태 초기화
  useEffect(() => {
    setInput('')
    setStartTime(null)
    setIsComplete(false)
    setWpm(0)
    setAccuracy(100)
    inputRef.current?.focus()
  }, [text])

  // 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // 시작 시간 설정
    if (!startTime) {
      setStartTime(Date.now())
    }

    setInput(value)

    // 정확도 계산
    let correctChars = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) {
        correctChars++
      }
    }
    const currentAccuracy = value.length > 0 ? (correctChars / value.length) * 100 : 100
    setAccuracy(Math.round(currentAccuracy * 100) / 100)

    // 완료 체크
    if (value === text) {
      const endTime = Date.now()
      const duration = (endTime - startTime!) / 1000 // 초 단위
      const minutes = duration / 60
      const words = text.length / 5 // 평균 단어 길이를 5로 가정
      const calculatedWpm = Math.round(words / minutes)

      setWpm(calculatedWpm)
      setIsComplete(true)
      onComplete(calculatedWpm, accuracy, Math.round(duration))
    }
  }

  // 키보드 이벤트 처리 (스페이스바, 엔터키)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 완료 상태에서 스페이스바 또는 엔터키를 누르면 다음 문장으로
    if (isComplete && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault()
      onNext?.()
    }
  }

  // 진행률 계산
  const progress = (input.length / text.length) * 100

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 진행률 바 */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 타자 영역 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* 텍스트 표시 */}
        <div className="text-2xl leading-relaxed mb-6 font-medium text-gray-800 dark:text-gray-200">
          {text.split('').map((char, index) => {
            let color = 'text-gray-400 dark:text-gray-600'
            if (index < input.length) {
              color = input[index] === char
                ? 'text-green-500 dark:text-green-400'
                : 'text-red-500 dark:text-red-400'
            }
            return (
              <span key={index} className={color}>
                {char}
              </span>
            )
          })}
        </div>

        {/* 입력 필드 */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isComplete}
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          placeholder="여기에 타이핑하세요..."
        />
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-900">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">속도</div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{wpm}</div>
          <div className="text-xs text-gray-500 dark:text-gray-500">WPM</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-900">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">정확도</div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{accuracy.toFixed(1)}</div>
          <div className="text-xs text-gray-500 dark:text-gray-500">%</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-900">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">진행률</div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{Math.round(progress)}</div>
          <div className="text-xs text-gray-500 dark:text-gray-500">%</div>
        </div>
      </div>

      {/* 완료 메시지 */}
      {isComplete && (
        <div className="bg-emerald-50 dark:bg-emerald-950 rounded-2xl p-8 border-2 border-emerald-300 dark:border-emerald-700 text-center">
          <h2 className="text-3xl font-bold mb-2 text-emerald-600 dark:text-emerald-400">🎉 완료!</h2>
          <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">축하합니다! 스트레스를 날려버렸어요!</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ⌨️ 스페이스 또는 엔터키를 눌러 다음 문장으로 이동하세요
          </p>
        </div>
      )}
    </div>
  )
}
