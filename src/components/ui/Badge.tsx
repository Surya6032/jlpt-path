import { cn, getLevelColor } from '@/lib/utils'

interface BadgeProps {
  label: string
  variant?: 'level' | 'default' | 'success' | 'warning'
  className?: string
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold'
  const variants: Record<string, string> = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  }
  const cls = variant === 'level' ? getLevelColor(label) : (variants[variant] || variants.default)
  return <span className={cn(base, cls, className)}>{label}</span>
}
