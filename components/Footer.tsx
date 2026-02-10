"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-black/90 backdrop-blur-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-white/70 mb-2">
            직장인들의 스트레스를 타자로 날려버리세요 💨
          </p>
          <p className="text-xs text-gray-500 dark:text-white/60">
            Made with 💚 by{" "}
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              심Joyful
            </span>
          </p>
          <p className="text-xs text-gray-400 dark:text-white/40 mt-1">
            © 2026 타자난타. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
