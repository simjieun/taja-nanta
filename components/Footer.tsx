"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            직장인들의 스트레스를 타자로 날려버리세요 💨
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Made with 💚 by{" "}
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              심Joyful
            </span>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
            © 2026 타자힐링. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
