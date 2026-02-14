import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '나의 타자 통계 - WPM, 정확도, 레벨 확인',
  description: '나의 타자연습 통계를 확인하세요. 평균 WPM, 정확도, 총 연습 시간, 레벨, 일일 목표 달성 현황을 한눈에 볼 수 있습니다.',
}

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
