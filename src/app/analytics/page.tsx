'use client'
import { useState } from 'react'
import { useProgress } from '@/store/progress'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { vocabData } from '@/data/vocab'
import { kanjiData } from '@/data/kanji'
import { grammarData } from '@/data/grammar'
import { BarChart2, Flame, BookOpen, Brain, Clock, Star, TrendingUp } from 'lucide-react'

const WEEK = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export default function AnalyticsPage() {
  const { progress } = useProgress()

  const n5vocab  = vocabData.filter(v => v.level === 'N5').length
  const n4vocab  = vocabData.filter(v => v.level === 'N4').length
  const n5kanji  = kanjiData.filter(k => k.level === 'N5').length
  const n4kanji  = kanjiData.filter(k => k.level === 'N4').length
  const n5gram   = grammarData.filter(g => g.level === 'N5').length
  const n4gram   = grammarData.filter(g => g.level === 'N4').length

  const learnedN5v = progress.vocabLearned.filter(id => vocabData.find(v => v.id===id && v.level==='N5')).length
  const learnedN4v = progress.vocabLearned.filter(id => vocabData.find(v => v.id===id && v.level==='N4')).length
  const learnedN5k = progress.kanjiLearned.filter(id => kanjiData.find(k => k.id===id && k.level==='N5')).length
  const learnedN4k = progress.kanjiLearned.filter(id => kanjiData.find(k => k.id===id && k.level==='N4')).length

  const avgScore = progress.quizScores.length > 0
    ? Math.round(progress.quizScores.reduce((s,q) => s+q.score, 0) / progress.quizScores.length)
    : 0

  // Real weekly scores
  const weekScores = Array(7).fill(0)
  const now = new Date()
  progress.quizScores.forEach(q => {
    const d = new Date(q.date)
    const diff = Math.round((now.getTime() - d.getTime()) / 86400000)
    if (diff < 7) {
      const dow = (d.getDay() + 6) % 7
      weekScores[dow] = Math.max(weekScores[dow], q.score)
    }
  })
  const maxBar = Math.max(...weekScores, 10)

  // Heatmap: last 84 days
  const studyDates = new Set(progress.studyDates || [])
  const heatDays: {date:string,studied:boolean}[] = []
  for (let i = 83; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const ds = d.toISOString().split('T')[0]
    heatDays.push({ date: ds, studied: studyDates.has(ds) })
  }
  const heatWeeks: {date:string,studied:boolean}[][] = []
  for (let i = 0; i < heatDays.length; i += 7) heatWeeks.push(heatDays.slice(i, i+7))

  // Weak areas from quiz scores
  const topicScores: Record<string,number[]> = {}
  progress.quizScores.forEach(q => {
    if (!topicScores[q.topic]) topicScores[q.topic] = []
    topicScores[q.topic].push(q.score)
  })
  const weakAreas = Object.entries(topicScores)
    .map(([topic, scores]) => ({ topic, avg: Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) }))
    .sort((a,b) => a.avg - b.avg)
    .slice(0, 5)

  // Category breakdown from vocab
  const categories = [...new Set(vocabData.map(v => v.category))]
  const categoryStats = categories.map(cat => {
    const total = vocabData.filter(v => v.category === cat).length
    const learned = vocabData.filter(v => v.category === cat && progress.vocabLearned.includes(v.id)).length
    return { cat, total, learned, pct: total > 0 ? Math.round((learned/total)*100) : 0 }
  }).sort((a,b) => b.pct - a.pct)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          <BarChart2 size={28} className="text-brand-indigo"/> Progress Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Your complete study history and performance breakdown.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon:Flame,   val:progress.streak,             label:'Day Streak',     color:'text-orange-500' },
          { icon:Clock,   val:progress.totalStudyMinutes,  label:'Study Minutes',  color:'text-blue-500' },
          { icon:BookOpen,val:progress.vocabLearned.length,label:'Words Learned',  color:'text-indigo-500' },
          { icon:Star,    val:avgScore+'%',                label:'Avg Quiz Score', color:'text-yellow-500' },
        ].map(s => (
          <Card key={s.label} className="text-center">
            <s.icon size={22} className={s.color+' mx-auto mb-2'}/>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.val}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Weekly bar chart — real data */}
      <Card className="mb-6">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-brand-indigo"/> Weekly Quiz Scores
        </h2>
        <div className="flex items-end gap-3 h-36">
          {WEEK.map((d,i) => {
            const h = Math.round((weekScores[i] / maxBar) * 100)
            return (
              <div key={d} className="flex-1 flex flex-col items-center gap-1">
                {weekScores[i] > 0 && <span className="text-xs text-gray-400">{weekScores[i]}</span>}
                <div className="w-full rounded-t-lg bg-brand-indigo opacity-80 transition-all" style={{height:`${Math.max(h,2)}%`, minHeight:'3px'}}/>
                <span className="text-xs text-gray-400">{d}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Activity heatmap */}
      <Card className="mb-6">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          🗓️ Study Activity — Last 12 Weeks
        </h2>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {heatWeeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <div key={di} title={day.date}
                  className={`w-4 h-4 rounded-sm ${day.studied ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-center mt-2 text-xs text-gray-400">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700"/>No study</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-orange-500"/>Studied</div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Vocabulary progress */}
        <Card>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-brand-indigo"/> Vocabulary Progress
          </h2>
          <div className="space-y-4">
            {[
              { label:'N5 Vocabulary', learned:learnedN5v, total:n5vocab },
              { label:'N4 Vocabulary', learned:learnedN4v, total:n4vocab },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
                  <span className="text-gray-500">{item.learned}/{item.total}</span>
                </div>
                <ProgressBar value={item.learned} max={item.total} showPercent={false}/>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mt-5 mb-3 text-sm">By Category</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {categoryStats.map(c => (
              <div key={c.cat}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-gray-600 dark:text-gray-400">{c.cat}</span>
                  <span className="text-gray-400">{c.learned}/{c.total}</span>
                </div>
                <ProgressBar value={c.learned} max={c.total} showPercent={false}/>
              </div>
            ))}
          </div>
        </Card>

        {/* Weak areas + Kanji/Grammar */}
        <div className="space-y-4">
          <Card>
            <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              ⚠️ Weak Areas
            </h2>
            {weakAreas.length === 0
              ? <p className="text-sm text-gray-500">Complete some quizzes to see weak areas.</p>
              : <div className="space-y-3">
                  {weakAreas.map(w => (
                    <div key={w.topic}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{w.topic}</span>
                        <span className={w.avg < 60 ? 'text-red-500 font-bold' : 'text-gray-500'}>{w.avg}%</span>
                      </div>
                      <ProgressBar value={w.avg} max={100} showPercent={false}/>
                    </div>
                  ))}
                </div>
            }
          </Card>

          <Card>
            <h2 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Brain size={18} className="text-indigo-500"/> Kanji & Grammar
            </h2>
            <div className="space-y-3">
              {[
                { label:'N5 Kanji', learned:learnedN5k, total:n5kanji },
                { label:'N4 Kanji', learned:learnedN4k, total:n4kanji },
                { label:'N5 Grammar', learned:progress.grammarMastered.filter(id=>grammarData.find(g=>g.id===id&&g.level==='N5')).length, total:n5gram },
                { label:'N4 Grammar', learned:progress.grammarMastered.filter(id=>grammarData.find(g=>g.id===id&&g.level==='N4')).length, total:n4gram },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
                    <span className="text-gray-400">{item.learned}/{item.total}</span>
                  </div>
                  <ProgressBar value={item.learned} max={item.total} showPercent={false}/>
                </div>
              ))}
            </div>
          </Card>

          {/* Quiz history */}
          <Card>
            <h2 className="font-bold text-gray-900 dark:text-white mb-3">📋 Recent Quizzes</h2>
            {progress.quizScores.length === 0
              ? <p className="text-sm text-gray-500">No quizzes yet.</p>
              : <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[...progress.quizScores].reverse().slice(0,10).map((q,i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{q.topic}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${q.score>=80?'text-green-600':q.score>=60?'text-yellow-600':'text-red-500'}`}>{q.score}%</span>
                        <span className="text-gray-400 text-xs">{q.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </Card>
        </div>
      </div>
    </div>
  )
}
