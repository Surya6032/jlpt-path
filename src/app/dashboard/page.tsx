'use client'
import Link from 'next/link'
import { useProgress } from '@/store/progress'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Flame, BookOpen, PenLine, Brain, Headphones, BarChart2,
  ArrowRight, Star, Clock, RefreshCcw, Target, Zap, ChevronRight
} from 'lucide-react'

const learningAreas = [
  { label: 'Hiragana', key: 'hiraganaProgress', icon: PenLine, href: '/learn/hiragana', color: 'text-pink-500' },
  { label: 'Katakana', key: 'katakanaProgress', icon: PenLine, href: '/learn/katakana', color: 'text-purple-500' },
  { label: 'Vocabulary', key: 'n5Progress', icon: BookOpen, href: '/learn/vocabulary', color: 'text-blue-500' },
  { label: 'Grammar', key: 'n5Progress', icon: Brain, href: '/learn/grammar', color: 'text-indigo-500' },
  { label: 'Reading', key: 'n4Progress', icon: BookOpen, href: '/learn/reading', color: 'text-green-500' },
  { label: 'Listening', key: 'n4Progress', icon: Headphones, href: '/learn/listening', color: 'text-yellow-500' },
]

const nextLessons = [
  { title: 'Hiragana — か row', level: 'Beginner', time: 10, href: '/learn/hiragana' },
  { title: 'Vocabulary: Food & Drink', level: 'N5', time: 12, href: '/learn/vocabulary' },
  { title: 'Grammar: は topic marker', level: 'N5', time: 15, href: '/learn/grammar' },
  { title: 'N5 Reading: Daily Routine', level: 'N5', time: 8, href: '/learn/reading' },
]

const achievements = [
  { id: 'first_lesson', label: 'First Lesson ✓', icon: '📚' },
  { id: 'first_quiz', label: 'First Quiz ✓', icon: '🧠' },
  { id: 'streak_3', label: '3-Day Streak 🔥', icon: '🔥' },
]

export default function DashboardPage() {
  const { progress } = useProgress()

  const weeklyPct = Math.min(100, Math.round((progress.weeklyStudiedMinutes / progress.weeklyGoalMinutes) * 100))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* ── Header ── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Your Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Keep the streak going 🔥</p>
          </div>
          <div className="flex gap-3">
            <Link href="/review">
              <Button variant="secondary" size="sm">
                <RefreshCcw size={14} /> Review Queue ({progress.reviewQueue.length})
              </Button>
            </Link>
            <Link href="/planner">
              <Button size="sm">
                <Target size={14} /> Study Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Flame size={20} className="text-orange-500" />
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{progress.streak}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold text-brand-indigo mb-1">{progress.vocabLearned.length}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Words Learned</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold text-purple-600 mb-1">{progress.kanjiLearned.length}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Kanji Learned</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold text-green-600 mb-1">{progress.totalStudyMinutes}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Study Minutes</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left column ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Weekly Goal */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Target size={18} className="text-brand-indigo" /> Weekly Goal
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">{progress.weeklyStudiedMinutes} / {progress.weeklyGoalMinutes} min</span>
            </div>
            <ProgressBar value={progress.weeklyStudiedMinutes} max={progress.weeklyGoalMinutes} showPercent={false} />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {weeklyPct >= 100 ? '🎉 Weekly goal complete!' : `${progress.weeklyGoalMinutes - progress.weeklyStudiedMinutes} min left to hit your weekly goal`}
            </p>
          </Card>

          {/* Progress by area */}
          <Card>
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart2 size={18} className="text-brand-indigo" /> Progress by Area
            </h2>
            <div className="space-y-4">
              {learningAreas.map(a => (
                <div key={a.label} className="flex items-center gap-3">
                  <a.icon size={16} className={a.color + ' flex-shrink-0'} />
                  <div className="flex-1">
                    <ProgressBar
                      value={(progress as any)[a.key] || 0}
                      label={a.label}
                      showPercent
                    />
                  </div>
                  <Link href={a.href} className="text-xs text-brand-indigo hover:underline flex-shrink-0">
                    Study
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* What to study next */}
          <Card>
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap size={18} className="text-brand-indigo" /> What Should I Study Next?
            </h2>
            <div className="space-y-3">
              {nextLessons.map((l, i) => (
                <Link key={l.title} href={l.href}>
                  <div className={`flex items-center justify-between p-3 rounded-xl border transition-colors cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-700 ${i === 0 ? 'border-indigo-200 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-900/10' : 'border-gray-100 dark:border-gray-700'}`}>
                    <div className="flex items-center gap-3">
                      {i === 0 && <span className="text-xs bg-brand-indigo text-white px-2 py-0.5 rounded-full font-semibold">Recommended</span>}
                      <div>
                        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{l.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge label={l.level} variant="level" />
                          <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} />{l.time} min</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-6">

          {/* N5 / N4 readiness */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Star size={18} className="text-brand-indigo" /> JLPT Readiness
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">JLPT N5</span>
                  <Badge label="N5" variant="level" />
                </div>
                <ProgressBar value={progress.n5Progress} colorOverride="bg-indigo-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">JLPT N4</span>
                  <Badge label="N4" variant="level" />
                </div>
                <ProgressBar value={progress.n4Progress} colorOverride="bg-purple-500" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {progress.n5Progress >= 80
                ? '🎉 You are ready for N5! Keep going toward N4.'
                : `Keep studying! You are ${progress.n5Progress}% toward N5 readiness.`}
            </p>
          </Card>

          {/* Review queue */}
          <Card>
            <h2 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <RefreshCcw size={18} className="text-brand-indigo" /> Review Queue
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{progress.reviewQueue.length} items due for review today.</p>
            <Link href="/review">
              <Button variant="secondary" size="sm" className="w-full">
                Start Review <ArrowRight size={14} />
              </Button>
            </Link>
          </Card>

          {/* Achievements */}
          <Card>
            <h2 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Star size={18} className="text-brand-indigo" /> Achievements
            </h2>
            <div className="space-y-2">
              {achievements.map(a => (
                <div key={a.id} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${progress.achievements.includes(a.id) ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'opacity-40'}`}>
                  <span className="text-lg">{a.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{a.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick links */}
          <Card>
            <h2 className="font-bold text-gray-900 dark:text-white mb-3">Quick Access</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: '/mock-test', label: 'Mock Test' },
                { href: '/analytics', label: 'Analytics' },
                { href: '/reference', label: 'Dictionary' },
                { href: '/learn/pronunciation', label: 'Pronunciation' },
              ].map(l => (
                <Link key={l.href} href={l.href}>
                  <div className="text-center px-3 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-brand-indigo transition-colors">
                    {l.label}
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
