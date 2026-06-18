'use client'
import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ProgressProvider } from '@/store/progress'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('dark-mode')
    if (saved === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    setDarkMode(d => {
      const next = !d
      if (next) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      localStorage.setItem('dark-mode', String(next))
      return next
    })
  }

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-brand-cream dark:bg-gray-950 flex flex-col">
        <Navbar darkMode={darkMode} toggleDark={toggleDark} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ProgressProvider>
  )
}
