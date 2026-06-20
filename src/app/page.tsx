'use client'
import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, Headphones, PenLine, BarChart2, Star, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useProgress } from '@/store/progress'
import { vocabData } from '@/data/vocab'
import { kanjiData } from '@/data/kanji'
import { grammarData } from '@/data/grammar'

const paths = [
  { label:'Beginner Foundations', tag:'Beginner', desc:'Hiragana, Katakana, pronunciation, greetings, numbers, basic sentence structure.' },
  { label:'JLPT N5 Path',         tag:'N5',       desc:'N5 vocab, grammar, kanji, reading, listening, and mock quizzes.' },
  { label:'JLPT N4 Path',         tag:'N4',       desc:'N4 vocab, grammar, kanji, reading, listening, and mock tests.' },
]

const milestones = [
  'Mastered Hiragana & Katakana', 'Learned 50 N5 vocabulary words',
  'Completed 10 N5 grammar points', 'Passed first N5 mock test',
  'Advanced to JLPT N4 level',    'Finished N4 reading practice',
]

export default function HomePage() {
  const { progress } = useProgress()
  const isReturning = progress.vocabLearned.length > 0 || progress.lessonsCompleted.length > 0

  const features = [
    { icon:PenLine,   title:'Hiragana & Katakana',  desc:'Interactive charts, stroke-order guides, audio pronunciation, and drills to master both writing systems fast.' },
    { icon:BookOpen,  title:'Vocabulary & Kanji',    desc:`${vocabData.length}+ words and ${kanjiData.length} kanji across N5 & N4 levels. Flashcards, categories, furigana, and spaced review.` },
    { icon:Brain,     title:'Grammar Deep-Dives',    desc:`${grammarData.length} grammar points explained clearly with examples, common mistakes, quizzes, and linked vocabulary.` },
    { icon:BookOpen,  title:'Reading Practice',      desc:'Passages from N5 to N4 with furigana toggle, translation toggle, and comprehension questions.' },
    { icon:Headphones,title:'Listening Exercises',   desc:'Daily-life dialogues with transcripts, slow/fast speed, comprehension questions, and keyword highlights.' },
    { icon:BarChart2, title:'Progress Analytics',    desc:'Track every lesson, quiz score, streak, and weak area. Visualize your path to N5 and N4.' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Returning user banner */}
      {isReturning && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 text-center text-sm font-medium">
          Welcome back! 👋 You have learned <strong>{progress.vocabLearned.length}</strong> words · <strong>{progress.streak}</strong>-day streak 🔥
          <Link href="/dashboard" className="ml-3 underline hover:no-underline">Go to Dashboard →</Link>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 -z-10"/>
        <div className="absolute top-20 right-10 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 -z-10"/>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-rose-100 dark:bg-rose-900/20 rounded-full blur-3xl opacity-40 -z-10"/>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-indigo-100 dark:border-indigo-800">
            <Zap size={14}/>
            Complete self-study platform · N5 & N4
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Learn Japanese<br/>
            <span className="text-brand-indigo">from Zero</span>
            <span className="text-brand-red"> to JLPT N4</span>
          </h1>

          <div className="jp text-3xl sm:text-4xl text-gray-400 dark:text-gray-500 mb-6 tracking-wider">
            日本語を学ぼう！
          </div>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Everything you need to learn Japanese in one place — Hiragana, Katakana, Vocabulary, Kanji, Grammar, Reading, Listening, Quizzes, and full Progress Tracking.
            <strong className="text-gray-800 dark:text-gray-100"> No textbooks. No other apps needed.</strong>
          </p>

          {/* Dynamic live stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-500">
            <div className="flex items-center gap-1.5"><BookOpen size={15} className="text-brand-indigo"/><strong className="text-gray-800 dark:text-white">{vocabData.length}+</strong> vocabulary words</div>
            <div className="flex items-center gap-1.5"><span className="text-lg">🔠</span><strong className="text-gray-800 dark:text-white">{kanjiData.length}</strong> kanji characters</div>
            <div className="flex items-center gap-1.5"><Brain size={15} className="text-purple-500"/><strong className="text-gray-800 dark:text-white">{grammarData.length}</strong> grammar points</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link href={isReturning ? '/dashboard' : '/learn/hiragana'}>
              <Button size="lg" className="w-full sm:w-auto">
                {isReturning ? 'Continue Learning' : 'Start Learning'} <ArrowRight size={18}/>
              </Button>
            </Link>
            <Link href="/learn/lessons">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Lesson Path <Target size={18}/>
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label:'Vocabulary', count:`${vocabData.length}+`, icon:'📖' },
              { label:'Kanji',      count:`${kanjiData.length}`,  icon:'🔠' },
              { label:'Grammar',    count:`${grammarData.length}`,icon:'📝' },
              { label:'Free',       count:'100%',                 icon:'✨' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{s.icon} {s.count}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Everything you need to pass JLPT</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <Card key={f.title} className="hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
                <f.icon size={20} className="text-brand-indigo"/>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Paths */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-10">Choose Your Path</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {paths.map(p => (
              <Card key={p.label} className="hover:shadow-lg transition-shadow">
                <Badge className="mb-3">{p.tag}</Badge>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{p.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-10">Your Journey Milestones</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((m, i) => (
            <div key={m} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-sm font-bold text-brand-indigo flex-shrink-0">{i+1}</div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{m}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
