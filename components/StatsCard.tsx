'use client'

interface StatsCardProps {
  icon: string
  title: string
  value: string | number
  subtitle?: string
}

export default function StatsCard({ icon, title, value, subtitle }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-black rounded-2xl p-6 border-2 border-emerald-200 dark:border-neutral-800 shadow-lg transform transition-all hover:scale-105">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm text-gray-600 dark:text-white/70 mb-1">{title}</div>
      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{value}</div>
      {subtitle && <div className="text-xs text-gray-500 dark:text-white/50">{subtitle}</div>}
    </div>
  )
}
