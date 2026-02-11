import type { Metadata } from 'next'
import StatsContent from './StatsContent'

export const metadata: Metadata = {
  title: '나의 통계',
  description:
    '내 타자난타 기록을 확인하세요. 평균 타자 속도(WPM), 정확도, 총 타수, 레벨 현황 등 상세한 통계를 한눈에 볼 수 있습니다. 얼마나 세게 두드렸는지 확인해보세요!',
  keywords: ['타자 통계', '타자 속도', 'WPM 기록', '타자연습 기록', '타이핑 통계', '타자난타 기록'],
  openGraph: {
    title: '나의 통계 | 타자난타',
    description:
      '내 타자난타 기록을 확인하세요. 평균 WPM, 정확도, 레벨 현황 등을 한눈에 볼 수 있습니다.',
  },
}

export default function StatsPage() {
  return <StatsContent />
}
