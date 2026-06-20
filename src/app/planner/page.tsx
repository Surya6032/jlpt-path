'use client'
import { useState, useEffect } from 'react'
import { useProgress } from '@/store/progress'
import { vocabData } from '@/data/vocab'
import { kanjiData } from '@/data/kanji'
import { grammarData } from '@/data/grammar'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { Target, CheckCircle, Circle, BookOpen, Brain, PenLine, RefreshCcw, Flame } from 'lucide-react'

type Task = { id: string; label: string; href: string; icon: string; done: boolean }

function getTodayKey() { return `jlpt-planner-${new Date().toISOString().split('T')[0]}` }

export default function PlannerPage() {
  const { progress, addXP, recordStudyDay } = useProgress()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loaded, setLoaded] = useState(false)

  // Build dynamic tasks from real progress
  function buildTasks(): Task[] {
    const base: Task[] = []

    // Vocab task
    const unlearnedVocab = vocabData.filter(v => !progress.vocabLearned.includes(v.id))
    if (unlearnedVocab.length > 0) {
      base.push({ id:'vocab', label:`Learn ${Math.min(5, unlearnedVocab.length)} new vocab words`, href:'/learn/vocabulary', icon:'📖', done:false })
    }

    // Kanji task
    const unlearnedKanji = kanjiData.filter(k => !progress.kanjiLearned.includes(k.id))
    if (unlearnedKanji.length > 0) {
      base.push({ id:'kanji', label:`Study ${Math.min(3, unlearnedKanji.length)} new kanji`, href:'/learn/kanji', icon:'🔠', done:false })
    }

    // Grammar task
    const unmastered = grammarData.filter(g => !progress.grammarMastered.includes(g.id))
    if (unmastered.length > 0) {
      base.push({ id:'grammar', label:`Review ${Math.min(2, unmastered.length)} grammar points`, href:'/learn/grammar', icon:'📝', done:false })
    }

    // Review task
    if (progress.reviewQueue.length > 0) {
      base.push({ id:'review', label:`Complete SRS review (${progress.reviewQueue.length} due)`, href:'/review', icon:'🔄', done:false })
    }

    // Lesson task
    base.push({ id:'lesson', label:'Complete one lesson unit', href:'/learn/lessons', icon:'🎓', done:false })

    // Quiz task
    base.push({ id:'quiz', label:'Take a vocabulary quiz', href:'/quiz', icon:'🧠', done:false })

    return base
  }

  useEffect(() => {
    recordStudyDay()
    const saved = localStorage.getItem(getTodayKey())
    if (saved) {
      const savedTasks: Task[] = JSON.parse(saved)
      const fresh = buildTasks()
      // Merge done status from saved
      const merged = fresh.map(t => ({ ...t, done: savedTasks.find(s => s.id === t.id)?.done ?? false }))
      setTasks(merged)
    } else {
      setTasks(buildTasks())
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(getTodayKey(), JSON.stringify(tasks))
  }, [tasks, loaded])

  function toggleTask(id: string) {
    setTasks(ts => {
      const updated = ts.map(t => {
        if (t.id !== id) return t
        if (!t.done) addXP(10) // award XP on completion
        return { ...t, done: !t.done }
      })
      return updated
    })
  }

  const doneTasks = tasks.filter(t => t.done).length
  const pct = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0

  // Weekly plan overview
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  const focusMap: Record<string,string[]> = {
    Monday:    ['📖 Vocabulary: 10 new words', '🔄 SRS Review'],
    Tuesday:   ['🔠 Kanji: 5 new characters',  '📝 Grammar: 1 point'],
    Wednesday: ['🎧 Listening practice',         '📖 Vocabulary review'],
    Thursday:  ['🔠 Kanji review',              '🧠 Quiz: Vocabulary N5'],
    Friday:    ['📝 Grammar: 1 point',          '🔄 SRS Review'],
    Saturday:  ['📚 Reading practice',           '🎓 Full lesson unit'],
    Sunday:    ['🔄 Full SRS review',            '📊 Check analytics'],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          <Target size={28} className="text-brand-indigo"/> Study Planner
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Your personalized daily plan based on real progress.</p>
      </div>

      {/* Streak + XP banner */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-2xl font-extrabold text-orange-500">{progress.streak} 🔥</div>
          <div className="text-xs text-gray-400 mt-1">Current Streak</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold text-yellow-500">{progress.xpToday || 0} ⚡</div>
          <div className="text-xs text-gray-400 mt-1">XP Today</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-extrabold text-brand-indigo">{progress.vocabLearned.length}</div>
          <div className="text-xs text-gray-400 mt-1">Words Learned</div>
        </Card>
      </div>

      {/* Today's tasks */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            📅 Today's Tasks
          </h2>
          <span className="text-sm font-medium text-gray-500">{doneTasks}/{tasks.length} done</span>
        </div>
        <ProgressBar value={doneTasks} max={tasks.length || 1} showPercent={false}/>
        {pct === 100 && <div className="text-center text-green-600 font-bold text-sm mt-2">🎉 All done! Great work today!</div>}

        <div className="mt-4 space-y-3">
          {tasks.map(task => (
            <button key={task.id} onClick={() => toggleTask(task.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all
                ${task.done
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/10'
                }`}>
              {task.done
                ? <CheckCircle size={22} className="text-green-500 flex-shrink-0"/>
                : <Circle size={22} className="text-gray-300 flex-shrink-0"/>
              }
              <span className="text-xl">{task.icon}</span>
              <div className="flex-1">
                <span className={`font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
                  {task.label}
                </span>
                {!task.done && <span className="block text-xs text-gray-400 mt-0.5">+10 XP on completion</span>}
              </div>
              {task.done && <span className="text-xs font-bold text-green-500">+10 XP ✓</span>}
            </button>
          ))}
        </div>

        <Button
          variant="secondary" size="sm"
          className="mt-4 w-full"
          onClick={() => { setTasks(buildTasks()); localStorage.removeItem(getTodayKey()) }}
        >
          <RefreshCcw size={14}/> Reset Today's Tasks
        </Button>
      </Card>

      {/* Progress snapshot */}
      <Card className="mb-8">
        <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📊 Progress Snapshot
        </h2>
        <div className="space-y-3">
          {[
            { label:'Vocabulary', learned:progress.vocabLearned.length, total:vocabData.length },
            { label:'Kanji',      learned:progress.kanjiLearned.length, total:kanjiData.length },
            { label:'Grammar',    learned:progress.grammarMastered.length, total:grammarData.length },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                <span className="text-gray-400">{item.learned}/{item.total} ({Math.round((item.learned/item.total)*100)}%)</span>
              </div>
              <ProgressBar value={item.learned} max={item.total} showPercent={false}/>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly plan */}
      <Card>
        <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4">📆 Suggested Weekly Plan</h2>
        <div className="space-y-3">
          {days.map(day => {
            const todayName = new Date().toLocaleString('default', { weekday: 'long' })
            const isToday = day === todayName
            return (
              <div key={day}
                className={`rounded-xl p-3 border ${isToday ? 'border-brand-indigo bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-100 dark:border-gray-800'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold text-sm ${isToday ? 'text-brand-indigo' : 'text-gray-700 dark:text-gray-300'}`}>
                    {day} {isToday && '← today'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {focusMap[day].map((f, i) => (
                    <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg">{f}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
