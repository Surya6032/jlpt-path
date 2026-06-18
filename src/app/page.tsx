'use client'
import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, Headphones, PenLine, BarChart2, CheckCircle, Star, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const features = [
  { icon: PenLine, title: 'Hiragana & Katakana', desc: 'Interactive charts, stroke-order guides, audio pronunciation, and drills to master both writing systems fast.' },
  { icon: BookOpen, title: 'Vocabulary & Kanji', desc: '80+ seed words and 40 kanji across N5 & N4 levels. Flashcards, categories, furigana, and spaced review.' },
  { icon: Brain, title: 'Grammar Deep-Dives', desc: '20 grammar points explained clearly with examples, common mistakes, quizzes, and linked vocabulary.' },
  { icon: BookOpen, title: 'Reading Practice', desc: '5 passages from N5 to N4 with furigana toggle, translation toggle, and comprehension questions.' },
  { icon: Headphones, title: 'Listening Exercises', desc: 'Daily-life dialogues with transcripts, slow/fast speed, comprehension questions, and keyword highlights.' },
  { icon: BarChart2, title: 'Progress Analytics', desc: 'Track every lesson, quiz score, streak, and weak area. Visualize your path to N5 and N4.' },
]

const paths = [
  { label: 'Beginner Foundations', tag: 'Beginner', desc: 'Hiragana, Katakana, pronunciation, greetings, numbers, basic sentence structure.' },
  { label: 'JLPT N5 Path', tag: 'N5', desc: 'N5 vocab, grammar, kanji, reading, listening, and mock quizzes.' },
  { label: 'JLPT N4 Path', tag: 'N4', desc: 'N4 vocab, grammar, kanji, reading, listening, and mock tests.' },
]

const milestones = [
  'Mastered Hiragana & Katakana', 'Learned 50 N5 vocabulary words',
  'Completed 10 N5 grammar points', 'Passed first N5 mock test',
  'Advanced to JLPT N4 level', 'Finished N4 reading practice',
]

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 -z-10" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-rose-100 dark:bg-rose-900/20 rounded-full blur-3xl opacity-40 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-indigo-100 dark:border-indigo-800">
            <Zap size={14} />
            Complete self-study platform · N5 & N4
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Learn Japanese<br />
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Start Learning <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Take Placement Quiz
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { n: '80+', label: 'Vocabulary Words' },
              { n: '40', label: 'Kanji Covered' },
              { n: '20', label: 'Grammar Points' },
              { n: '5+5', label: 'Reading + Listening' },
            ].map(s => (
              <div key={s.label} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-extrabold text-brand-indigo">{s.n}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learning Paths ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Structured Learning Paths</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Follow a clear roadmap. Every path builds on the last — from total beginner to JLPT N4 ready.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {paths.map((p, i) => (
            <Card key={p.label} hover className="text-center p-6">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-indigo font-bold text-lg jp">
                {['あ', 'N5', 'N4'][i]}
              </div>
              <Badge label={p.tag} variant="level" className="mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{p.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{p.desc}</p>
              <Link href={`/dashboard`}>
                <Button variant="ghost" size="sm" className="text-brand-indigo hover:text-indigo-700 dark:text-indigo-400">
                  Start Path <ArrowRight size={14} />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Everything in One Place</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Every tool a self-learner needs — built in, connected, and designed to guide you forward.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <Card key={f.title} hover>
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-brand-indigo mb-4">
                  <f.icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Your Journey, Milestone by Milestone</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Clear checkpoints so you always know you are making real progress.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((m, i) => (
            <div key={m} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl px-5 py-4 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={16} className="text-brand-indigo" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{m}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-br from-brand-indigo to-indigo-700 rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full" />
          <Target size={40} className="mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-extrabold mb-3">Ready to Pass JLPT N5?</h2>
          <p className="text-indigo-100 mb-8 max-w-md mx-auto text-base">
            Start your free self-study journey today. No account needed — just open the dashboard and begin.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button className="bg-white text-brand-indigo hover:bg-indigo-50 w-full sm:w-auto">
                Open Dashboard <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/mock-test">
              <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10 w-full sm:w-auto">
                Try a Mock Test
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
