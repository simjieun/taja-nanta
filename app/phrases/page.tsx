import type { Metadata } from 'next'
import PhrasesContent from './PhrasesContent'

export const metadata: Metadata = {
  title: '나만의 문구 추가',
  description:
    '나만의 문구를 등록하고 타자난타에 활용하세요. 하고 싶은 말, 좋아하는 명언, 속이 시원해지는 한마디를 직접 추가하고 신나게 두드려보세요!',
  keywords: ['타자연습 문구', '나만의 문구', '타이핑 문구 추가', '명언 타자연습', '타자난타 문구'],
  openGraph: {
    title: '나만의 문구 추가 | 타자난타',
    description:
      '나만의 문구를 등록하고 타자난타에 활용하세요. 속이 시원해지는 한마디를 직접 추가해보세요!',
  },
}

export default function PhrasesPage() {
  return <PhrasesContent />
}
