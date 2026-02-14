import type { Metadata } from 'next'
import PracticeContent from './PracticeContent'

export const metadata: Metadata = {
  title: '타자연습',
  description:
    '키보드를 신나게 두드리며 타자 속도와 정확도를 높여보세요. 랜덤 문구를 빠르게 타이핑하며 스트레스를 시원하게 날려버리고, 실시간 WPM 측정과 레벨 시스템으로 성장을 확인하세요.',
  keywords: ['타자연습', '키보드 난타', '타자 속도 측정', 'WPM 측정', '한글 타자연습', '스트레스 해소 타이핑'],
  openGraph: {
    title: '타자연습 | 타자난타',
    description:
      '키보드를 신나게 두드리며 타자 속도와 정확도를 높여보세요. 두드릴수록 시원해지는 타자난타!',
  },
}

export default function PracticePage() {
  return (
      <PracticeContent />
  )
}
