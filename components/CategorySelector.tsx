'use client'

import { Category, CATEGORY_LABELS, CATEGORY_EMOJIS } from '@/types'

interface CategorySelectorProps {
  selectedCategory: Category | null
  onSelectCategory: (category: Category) => void
}

export default function CategorySelector({ selectedCategory, onSelectCategory }: CategorySelectorProps) {
  const categories: Category[] = ['boss_rant', 'resignation', 'healing', 'empathy']

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        오늘은 어떤 기분인가요?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105
              ${selectedCategory === category
                ? 'bg-emerald-500 text-white shadow-xl scale-105 border-2 border-emerald-600'
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:shadow-lg border-2 border-gray-200 dark:border-gray-700'
              }
            `}
          >
            <div className="text-4xl mb-3">{CATEGORY_EMOJIS[category]}</div>
            <div className="font-bold text-lg">{CATEGORY_LABELS[category]}</div>
            {selectedCategory === category && (
              <div className="absolute top-2 right-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
