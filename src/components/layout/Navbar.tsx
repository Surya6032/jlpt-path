'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  BookOpen, LayoutDashboard, PenLine, Headphones, Brain,
  BarChart2, CalendarDays, Search, Menu, X, Sun, Moon, FlameIcon
} from 'lucide-react'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/learn/hiragana', label: 'Hiragana', icon: PenLine },
  { href: '/learn/vocabulary', label: 'Vocabulary', icon: BookOpen },
  { href: '/learn/kanji', label: 'Kanji', icon: PenLine },
  { href: '/learn/grammar', label: 'Grammar', icon: Brain },
  { href: '/learn/reading', label: 'Reading', icon: BookOpen },
  { href: '/learn/listening', label: 'Listening', icon: Headphones },
  { href: '/quiz', label: 'Quiz', icon: Brain },
  { href: '/analytics', label: 'Progress', icon: BarChart2 },
  { href: '/planner', label: 'Planner', icon: CalendarDays },
]

export function Navbar({ darkMode, toggleDark }: { darkMode: boolean; toggleDark: () => void }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl">
            <span className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center text-white text-sm jp">日</span>
            <span className="text-gray-900 dark:text-white">JLPT <span className="text-brand-indigo">Path</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  pathname === l.href
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-brand-indigo dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
              >
                <l.icon size={15} />
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link href="/reference" className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Search size={18} />
            </Link>
            <button onClick={toggleDark} className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/dashboard" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-brand-indigo text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              <FlameIcon size={15} />
              <span>3 🔥</span>
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium',
                pathname === l.href
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-brand-indigo'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
            >
              <l.icon size={16} />
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
