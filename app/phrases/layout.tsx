import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '타자연습 문구 모음 - 직장공감, 힐링, 퇴사, 동기부여',
  description: '직장공감, 힐링, 퇴사, 동기부여 카테고리의 타자연습 문구 65개를 확인하세요. 나만의 문구를 직접 추가해서 타자연습에 활용할 수 있습니다.',
}

export default function PhrasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
