'use client'

import { useState } from 'react'

interface ShareButtonProps {
  wpm: number
  accuracy: number
  level: number
  title: string
}

export default function ShareButton({ wpm, accuracy, level, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `🎯 타자연습 결과 공유
레벨: LV ${level} (${title})
속도: ${wpm.toFixed(1)} WPM
정확도: ${accuracy.toFixed(1)}%

직장인들의 힐링 타자연습 플랫폼 - 심Joyful
#타자연습 #힐링 #직장인`

  const handleShare = async () => {
    // Web Share API 지원 확인
    if (navigator.share) {
      try {
        await navigator.share({
          title: '타자연습 결과',
          text: shareText,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: 클립보드에 복사
      try {
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {copied ? '복사됨!' : '결과 공유하기'}
    </button>
  )
}
