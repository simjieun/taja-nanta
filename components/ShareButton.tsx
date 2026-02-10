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
      className="retro-btn px-5 py-2.5 rounded text-sm"
    >
      {copied ? '>> COPIED!' : '[SHARE] 결과 공유'}
    </button>
  )
}
