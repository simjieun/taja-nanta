import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://taja-healing.vercel.app'
const SITE_NAME = '타자난타'
const SITE_DESCRIPTION =
  '키보드를 두드려 스트레스를 날려버리세요! 타자난타는 신나는 문구를 빠르게 타이핑하며 스트레스를 해소하는 타자연습 플랫폼입니다. 두드릴수록 시원해지는 키보드 난타, 무료 온라인 한글 타자연습.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: '타자난타 - 키보드를 두드려 스트레스를 날려버리세요',
    template: '%s | 타자난타',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    '타자연습',
    '한글 타자연습',
    '온라인 타자연습',
    '무료 타자연습',
    '타자난타',
    '키보드 난타',
    '스트레스 해소',
    '타자 속도 측정',
    '타자 게임',
    '타이핑 연습',
    '키보드 연습',
    '직장인 스트레스',
    '키보드 스트레스 해소',
  ],

  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,

  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: '타자난타 - 키보드를 두드려 스트레스를 날려버리세요',
    description: SITE_DESCRIPTION,
  },

  twitter: {
    card: 'summary_large_image',
    title: '타자난타 - 키보드를 두드려 스트레스를 날려버리세요',
    description: SITE_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    // TODO: Google Search Console 인증 후 아래 값을 실제 값으로 교체하세요
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },

  other: {
    'naver-site-verification': '',
    // TODO: 네이버 서치어드바이저 인증 후 실제 값으로 교체하세요
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  inLanguage: 'ko',
  audience: {
    '@type': 'Audience',
    audienceType: '스트레스 해소가 필요한 직장인, 학생, 타자연습이 필요한 모든 사람',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
