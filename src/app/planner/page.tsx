'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CalendarDays, Clock, Target, CheckCircle, BookOpen, Brain, PenLine, Headphones } from 'lucide-react'

const plans = {
  15: [
    { day: 1, tasks: ['Hiragana: 5 characters', 'Vocabulary: 5 words', 'Daily phrase'] },
    { day: 2, tasks: ['Hiragana: 5 characters (review)', 'Vocabulary flashcards', 'Grammar: read 1 point'] },
    { day: 3, tasks: ['Katakana: 5 characters', 'Vocabulary quiz (10 words)', 'Review yesterday'] },
    { day: 4, tasks: ['Katakana review', 'Grammar: 1 new point', 'Vocabulary: 5 new words'] },
    { day: 5, tasks: ['Reading passage (N5)', 'Vocabulary review', 'Mini quiz'] },
    { day: 6, tasks: ['Kanji: 2 N5 kanji', 'Listening exercise', 'Daily phrase'] },
    { day: 7, tasks: ['Weekly review', 'Flashcard review', 'Progress check'] },
  ],
  30: [
    { day: 1, tasks: ['Hiragana: full row', '10 vocab words', 'Grammar: です/ます', 'Daily phrase'] },
    { day: 2, tasks: ['Hiragana quiz', 'Vocab flashcards (15)', 'Grammar: は particle', 'Reading 5 min'] },
    { day: 3, tasks: ['Katakana: first row', '10 vocab (food)', 'Grammar: を particle', 'Listening exercise'] },
    { day: 4, tasks: ['Katakana quiz', 'Kanji: 3 N5', 'Grammar practice quiz', 'Vocab review'] },
    { day: 5, tasks: ['Reading: N5 passage', 'Grammar: に/で particles', 'Vocab: adjectives', 'Daily phrases x3'] },
    { day: 6, tasks: ['Mixed vocab quiz (20)', 'Kanji: 3 more N5', 'Listening: restaurant', 'Weak items review'] },
    { day: 7, tasks: ['Full week review', 'Mock quiz (10 Q)', 'Progress analytics', 'Plan next week'] },
  ],
  60: [
    { day: 1, tasks: ['Hiragana: 2 rows + quiz', '20 vocab words', 'Grammar: 3 points', 'N5 reading passage', 'Daily phrases'] },
    { day: 2, tasks: ['Katakana: 2 rows + quiz', 'Vocab flashcards (25)', 'Grammar quiz', 'Listening exercise (2)', 'Kanji: 5 N5'] },
    { day: 3, tasks: ['Hiragana/Katakana revision', 'Food & travel vocab', 'Grammar: て-form intro', 'Reading passage 2', 'Pronunciation practice'] },
    { day: 4, tasks: ['Kanji: 5 more N5', 'Grammar: ている', 'Vocab quiz (30)', 'Listening comprehension', 'Review weak items'] },
    { day: 5, tasks: ['N5 reading passage 3', 'Grammar deep dive', 'Kanji quiz', 'Vocab: adjectives & verbs', 'Daily phrases x5'] },
    { day: 6, tasks: ['Full N5 mock quiz', 'Weak area focus session', 'Listening x2', 'Grammar review', 'Analytics check'] },
    { day: 7, tasks: ['N5 mini mock test', 'Review all missed answers', 'Spaced review session', 'Plan N4 intro', 'Celebrate progress!'] },
  ],
}

const roadmap = [
  { phase: 'Week 1–2', title: 'Foundations', items: ['Hiragana (all 46)', 'Katakana (all 46)', 'Basic pronunciation', 'Greetings & phrases', 'Numbers 1–100'], badge: 'Beginner' as const },
  { phase: 'Week 3–6', title: 'N5 Core', items: ['N5 vocabulary (1–100)', 'N5 grammar points 1–5', 'N5 kanji batch 1', 'First N5 reading passage', 'N5 listening exercise'], badge: 'N5' as const },
  { phase: 'Week 7–10', title: 'N5 Completion', items: ['N5 vocabulary complete', 'N5 grammar all points', 'All N5 kanji', 'All N5 reading passages', 'N5 mock test'], badge: 'N5' as const },
  { phase: 'Week 11–16', title: 'N4 Introduction', items: ['N4 vocabulary (1–80)', 'N4 grammar points 1–5', 'N4 kanji batch 1', 'N4 reading passages', 'N4 listening'], badge: 'N4' as const },
  { phase: 'Week 17–22', title: 'N4 Mastery', items: ['N4 vocabulary complete', 'All N4 grammar', 'All N4 kanji', 'N4 mock test pass 60%+', 'Full review'], badge: 'N4' as const },
]

export default function PlannerPage() {
  const [session, setSession] = useState<15 | 30 | 60>(30)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const toggleTask = (key: string) =>
    setCompletedTasks(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          <CalendarDays size={28} className="text-brand-indigo" /> Study Planner
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Personalized daily plans and your full N5 → N4 roadmap.</p>
      </div>

      {/* Session selector */}
      <Card className="mb-8">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock size={18} className="text-brand-indigo" /> Daily Study Plan
        </h2>
        <div className="flex gap-3 mb-6 flex-wrap">
          {([15, 30, 60] as const).map(n => (
            <Button key={n} variant={session === n ? 'primary' : 'secondary'} size="sm" onClick={() => setSession(n)}>
              <Clock size={14} /> {n} min/day
            </Button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {plans[session].map(d => (
            <div key={d.day} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <div className="font-bold text-gray-900 dark:text-white text-sm mb-3">Day {d.day}</div>
              <ul className="space-y-2">
                {d.tasks.map(task => {
                  const key = `${session}-${d.day}-${task}`
                  const done = completedTasks.includes(key)
                  return (
                    <li key={task} className="flex items-start gap-2 cursor-pointer" onClick={() => toggleTask(key)}>
                      <div className={`w-4 h-4 rounded flex-shrink-0 mt-0.5 border-2 transition-colors flex items-center justify-center ${done ? 'bg-brand-indigo border-brand-indigo' : 'border-gray-300 dark:border-gray-500'}`}>
                        {done && <CheckCircle size={10} className="text-white" />}
                      </div>
                      <span className={`text-xs leading-relaxed ${done ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>{task}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Roadmap */}
      <Card>
        <h2 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Target size={18} className="text-brand-indigo" /> Your Full Learning Roadmap: Zero → N4
        </h2>
        <div className="space-y-4">
          {roadmap.map((r, i) => (
            <div key={r.phase} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-xs font-bold text-brand-indigo flex-shrink-0">{i + 1}</div>
                {i < roadmap.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-600 mt-2 mb-0 min-h-[24px]" />}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{r.phase}</span>
                  <Badge label={r.badge} variant="level" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{r.title}</h3>
                <ul className="space-y-1">
                  {r.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-indigo flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
