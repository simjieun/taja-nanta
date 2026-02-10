'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [isStarting, setIsStarting] = useState(false)

  const handleStart = () => {
    setIsStarting(true)
    setTimeout(() => {
      router.push('/practice')
    }, 400)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-8">
      {/* 웰컴 & 시작하기 */}
      <div className="fade-in-up flex flex-col items-center space-y-10">
        {/* 웰컴 메시지 */}
        <div className="text-center space-y-3">
          <div className="keyboard-icon text-6xl mb-4">
            &#x2328;&#xFE0F;
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            타자로 스트레스를 날려버리세요
          </h2>
          <p className="text-lg text-gray-500 dark:text-white/60 max-w-md mx-auto">
            다양한 힐링 문구를 랜덤으로 만나며<br />타자 연습과 함께 마음을 치유하세요
          </p>
        </div>

        {/* 시작하기 버튼 */}
        <button
          onClick={handleStart}
          disabled={isStarting}
          className={`
            btn-start btn-start-wrapper
            relative px-14 py-5 rounded-2xl
            text-white text-xl font-bold tracking-wide
            cursor-pointer select-none
            disabled:opacity-70 disabled:cursor-not-allowed
            ${isStarting ? 'scale-95 opacity-80' : ''}
          `}
        >
          <span className="relative z-10 flex items-center gap-3">
            {isStarting ? (
              <>
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                준비 중...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
                시작하기
              </>
            )}
          </span>
        </button>

        {/* 안내 텍스트 */}
        <p className="text-sm text-gray-400 dark:text-white/40">
          버튼을 누르면 랜덤 문구가 나타납니다
        </p>
      </div>
    </div>
  )
}
