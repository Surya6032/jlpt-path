import { cn, getProgressColor } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercent?: boolean
  className?: string
  colorOverride?: string
}

export function ProgressBar({ value, max = 100, label, showPercent = true, className, colorOverride }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const color = colorOverride || getProgressColor(pct)
  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
          {showPercent && <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{pct}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={cn('h-full rounded-full progress-bar', color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
