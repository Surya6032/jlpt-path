'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useProgress } from '@/store/progress'
import { vocabData } from '@/data/vocab'
import { kanjiData } from '@/data/kanji'
import { grammarData } from '@/data/grammar'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Flame, BookOpen, PenLine, Brain, Headphones, BarChart2,
  ArrowRight, Star, Clock, RefreshCcw, Target, Zap, ChevronRight,
  CalendarDays, Trophy, ChevronLeft, X
} from 'lucide-react'

const learningAreas = [
  { label:'Hiragana',   key:'hiraganaProgress', icon:PenLine,    href:'/learn/hiragana',    color:'text-pink-500',   bg:'bg-pink-50 dark:bg-pink-900/20' },
  { label:'Katakana',   key:'katakanaProgress', icon:PenLine,    href:'/learn/katakana',    color:'text-purple-500', bg:'bg-purple-50 dark:bg-purple-900/20' },
  { label:'Vocabulary', key:'n5Progress',       icon:BookOpen,   href:'/learn/vocabulary',  color:'text-blue-500',   bg:'bg-blue-50 dark:bg-blue-900/20' },
  { label:'Grammar',    key:'n5Progress',       icon:Brain,      href:'/learn/grammar',     color:'text-indigo-500', bg:'bg-indigo-50 dark:bg-indigo-900/20' },
  { label:'Kanji',      key:'n5Progress',       icon:BookOpen,   href:'/learn/kanji',       color:'text-green-500',  bg:'bg-green-50 dark:bg-green-900/20' },
  { label:'Listening',  key:'n4Progress',       icon:Headphones, href:'/learn/listening',   color:'text-yellow-500', bg:'bg-yellow-50 dark:bg-yellow-900/20' },
]

const achievementDefs: Record<string,{icon:string,label:string}> = {
  first_lesson: { icon:'📚', label:'First Lesson' },
  first_quiz:   { icon:'🧠', label:'First Quiz' },
  streak_3:     { icon:'🔥', label:'3-Day Streak' },
  streak_7:     { icon:'🔥', label:'Week Warrior' },
  streak_30:    { icon:'🏆', label:'Monthly Master' },
  vocab_50:     { icon:'📖', label:'50 Words' },
  vocab_100:    { icon:'📗', label:'100 Words' },
  perfect_quiz: { icon:'⭐', label:'Perfect Quiz' },
}

function StreakCalendar({ onClose }: { onClose: () => void }) {
  const { progress } = useProgress()
  const studyDates = new Set(progress.studyDates || [])
  const [viewDate, setViewDate] = useState(new Date())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({length: daysInMonth}, (_, i) => i + 1)]

  function dateStr(d: number) {
    return `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
  }

  // Heatmap: last 84 days
  const heatDays: {date:string,studied:boolean}[] = []
  for (let i = 83; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const ds = d.toISOString().split('T')[0]
    heatDays.push({ date: ds, studied: studyDates.has(ds) })
  }
  const heatWeeks: {date:string,studied:boolean}[][] = []
  for (let i = 0; i < heatDays.length; i += 7) heatWeeks.push(heatDays.slice(i, i+7))

  const longestStreak = (() => {
    const sorted = [...studyDates].sort()
    let max = 0, cur = 0
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0) { cur = 1; continue }
      const prev = new Date(sorted[i-1]), curr = new Date(sorted[i])
      const diff = Math.round((curr.getTime() - prev.getTime()) / 86400000)
      cur = diff === 1 ? cur + 1 : 1
      max = Math.max(max, cur)
    }
    return Math.max(max, cur)
  })()

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame size={22} className="text-orange-500" />
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Study Streak</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label:'Current Streak', val:`${progress.streak} 🔥` },
            { label:'Longest Streak', val:`${longestStreak} days` },
            { label:'Total Days', val:`${studyDates.size} days` },
          ].map(s => (
            <div key={s.label} className="text-center bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3">
              <div className="text-lg font-extrabold text-orange-600">{s.val}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => setViewDate(new Date(year, month-1, 1))} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><ChevronLeft size={18}/></button>
            <span className="font-bold text-gray-900 dark:text-white">{monthName}</span>
            <button onClick={() => setViewDate(new Date(year, month+1, 1))} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><ChevronRight size={18}/></button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} className="text-center text-xs font-medium text-gray-400">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={i}/>
              const ds = dateStr(d)
              const today = new Date().toISOString().split('T')[0]
              const studied = studyDates.has(ds)
              const isToday = ds === today
              return (
                <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                  ${studied ? 'bg-orange-500 text-white' : 'text-gray-600 dark:text-gray-300'}
                  ${isToday && !studied ? 'ring-2 ring-orange-400 ring-offset-1' : ''}
                  ${isToday && studied ? 'ring-2 ring-orange-600 ring-offset-1' : ''}
                `}>
                  {studied ? '🔥' : d}
                </div>
              )
            })}
          </div>
        </div>

        {/* Heatmap */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last 12 Weeks</h3>
          <div className="flex gap-0.5">
            {heatWeeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {week.map((day, di) => (
                  <div key={di} title={day.date}
                    className={`w-3 h-3 rounded-sm ${day.studied ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center mt-1 text-xs text-gray-400">
            <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700"/>No study
            <div className="w-3 h-3 rounded-sm bg-orange-500"/>Studied
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { progress, recordStudyDay, addXP } = useProgress()
  const [showCal, setShowCal] = useState(false)

  useEffect(() => { recordStudyDay() }, [])

  const totalVocab = vocabData.length
  const totalKanji = kanjiData.length
  const totalGrammar = grammarData.length
  const learnedVocab = progress.vocabLearned.length
  const learnedKanji = progress.kanjiLearned.length
  const learnedGrammar = progress.grammarMastered.length

  const xpPct = Math.min(100, Math.round(((progress.xpToday || 0) / (progress.dailyGoalXP || 50)) * 100))
  const avgScore = progress.quizScores.length > 0
    ? Math.round(progress.quizScores.reduce((s, q) => s + q.score, 0) / progress.quizScores.length)
    : 0

  const isReturning = progress.lessonsCompleted.length > 0 || progress.vocabLearned.length > 0

  // Real weekly XP from quizScores (last 7 days)
  const weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const weekScores = Array(7).fill(0)
  const now = new Date()
  progress.quizScores.forEach(q => {
    const d = new Date(q.date)
    const diff = Math.round((now.getTime() - d.getTime()) / 86400000)
    if (diff < 7) {
      const dow = (d.getDay() + 6) % 7  // Mon=0
      weekScores[dow] = Math.max(weekScores[dow], q.score)
    }
  })
  const maxBar = Math.max(...weekScores, 10)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {showCal && <StreakCalendar onClose={() => setShowCal(false)} />}

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {isReturning
              ? <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome back! 👋</h1>
              : <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Your Dashboard</h1>
            }
            {isReturning && (
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                You have learned <span className="font-bold text-brand-indigo">{learnedVocab} words</span> and kept a <span className="font-bold text-orange-500">{progress.streak}-day streak</span>. Keep it up! 🔥
              </p>
            )}
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setShowCal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl font-medium hover:bg-orange-100 transition-colors text-sm">
              <CalendarDays size={16}/> Streak Calendar
            </button>
            <Link href="/review"><Button variant="secondary" size="sm"><RefreshCcw size={14}/> Review ({progress.reviewQueue.length})</Button></Link>
            <Link href="/planner"><Button size="sm"><Target size={14}/> Study Plan</Button></Link>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowCal(true)}>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Flame size={20} className="text-orange-500"/>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{progress.streak}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold text-brand-indigo mb-1">{learnedVocab}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Words Learned</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold text-purple-600 mb-1">{learnedKanji}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Kanji Learned</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold text-green-600 mb-1">{avgScore}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Avg Quiz Score</div>
        </Card>
      </div>

      {/* Daily XP goal */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-yellow-500"/>
            <span className="font-bold text-gray-900 dark:text-white">Daily XP Goal</span>
          </div>
          <span className="text-sm font-medium text-gray-500">{progress.xpToday || 0} / {progress.dailyGoalXP || 50} XP</span>
        </div>
        <ProgressBar value={progress.xpToday || 0} max={progress.dailyGoalXP || 50} showPercent={false}/>
        {xpPct >= 100 && (
          <div className="mt-2 text-center text-sm font-medium text-yellow-600">🎉 Daily goal complete!</div>
        )}
      </Card>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly activity — real data */}
        <Card className="lg:col-span-2">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart2 size={18} className="text-brand-indigo"/> Weekly Activity
          </h2>
          <div className="flex items-end gap-2 h-28">
            {weekDays.map((d, i) => {
              const h = maxBar > 0 ? Math.round((weekScores[i] / maxBar) * 100) : 0
              return (
                <div key={d} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-indigo-100 dark:bg-indigo-900/30 rounded-t-lg relative" style={{height:`${Math.max(h,4)}%`, minHeight:'4px'}}>
                    <div className="absolute inset-0 bg-brand-indigo rounded-t-lg opacity-80"/>
                  </div>
                  <span className="text-xs text-gray-400">{d}</span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Achievements */}
        <Card>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Trophy size={18} className="text-yellow-500"/> Achievements
          </h2>
          {progress.achievements.length === 0
            ? <p className="text-sm text-gray-500">Complete lessons to unlock achievements!</p>
            : <div className="space-y-2">
                {progress.achievements.map(id => {
                  const def = achievementDefs[id]
                  return def ? (
                    <div key={id} className="flex items-center gap-2 text-sm">
                      <span className="text-lg">{def.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{def.label}</span>
                    </div>
                  ) : null
                })}
              </div>
          }
        </Card>
      </div>

      {/* Learning areas */}
      <div className="mb-8">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">Learning Areas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningAreas.map(area => {
            const val = (progress as Record<string,number>)[area.key] || 0
            return (
              <Link key={area.label} href={area.href}>
                <Card className="hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl ${area.bg}`}>
                      <area.icon size={18} className={area.color}/>
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">{area.label}</span>
                    <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-brand-indigo transition-colors"/>
                  </div>
                  <ProgressBar value={val} max={100} showPercent={false}/>
                  <div className="text-xs text-gray-400 mt-1">{val}% complete</div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Overall progress */}
      <Card className="mb-8">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star size={18} className="text-yellow-500"/> Overall Progress
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { label:'Vocabulary', learned:learnedVocab, total:totalVocab, color:'text-blue-500' },
            { label:'Kanji',      learned:learnedKanji, total:totalKanji, color:'text-green-500' },
            { label:'Grammar',    learned:learnedGrammar, total:totalGrammar, color:'text-indigo-500' },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className={`font-medium ${item.color}`}>{item.label}</span>
                <span className="text-gray-400">{item.learned}/{item.total}</span>
              </div>
              <ProgressBar value={item.learned} max={item.total} showPercent={false}/>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'📚 Lessons', href:'/learn/lessons', desc:'Structured units' },
          { label:'🃏 Vocabulary', href:'/learn/vocabulary', desc:'Flashcards & quiz' },
          { label:'🔠 Kanji', href:'/learn/kanji', desc:'Kanji study' },
          { label:'📊 Analytics', href:'/analytics', desc:'Your full stats' },
        ].map(l => (
          <Link key={l.label} href={l.href}>
            <Card className="hover:shadow-md transition-all cursor-pointer text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{l.label}</div>
              <div className="text-xs text-gray-400 mt-1">{l.desc}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
