"use client";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* 로고 */}
        <div className="flex items-center gap-3">
          <div className="text-3xl"></div>
          <div>
            <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              타자힐링
            </h1>
          </div>
        </div>

        {/* 테마 토글 */}
        <ThemeToggle />
      </div>
    </header>
  );
}
