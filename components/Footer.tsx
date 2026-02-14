"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/90 backdrop-blur-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* 브랜드 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">타자난타</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              직장인들의 스트레스를 타자로 날려버리는 힐링 타자연습 플랫폼
            </p>
          </div>
          {/* 메뉴 링크 */}
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800 dark:text-white text-sm">메뉴</h4>
            <nav className="grid grid-cols-2 gap-1">
              {[
                { href: '/practice', label: '타자연습' },
                { href: '/phrases', label: '문구 모음' },
                { href: '/stats', label: '나의 통계' },
                { href: '/tips', label: '타자 팁' },
                { href: '/about', label: '서비스 소개' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-600 dark:text-white/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          {/* 서비스 정보 */}
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800 dark:text-white text-sm">서비스 정보</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-white/60">
              <li>회원가입 없이 무료 이용</li>
              <li>데이터는 브라우저에만 저장</li>
              <li>광고 없는 깔끔한 환경</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-neutral-800 pt-4 text-center space-y-1">
          <p className="text-xs text-gray-500 dark:text-white/60">
            Made with 💚 by{" "}
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              심Joyful
            </span>
          </p>
          <p className="text-xs text-gray-400 dark:text-white/40">
            © 2026 타자난타. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
