'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS = [
  { href: '/', label: '타자연습', icon: '⌨️' },
  { href: '/phrases', label: '문구추가', icon: '✏️' },
  { href: '/stats', label: '통계', icon: '📊' },
] as const

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">⚡</span>
          <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            타자난타
          </h1>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive = pathname === href

            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                    : 'text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <span className="text-base">{icon}</span>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* 테마 토글 */}
        <ThemeToggle />
      </div>
    </header>
  )
}
