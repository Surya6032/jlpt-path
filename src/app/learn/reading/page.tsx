'use client'
import { useState } from 'react'
import { readingPassages } from '@/data/misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Clock, Eye, EyeOff, ChevronLeft, Play, ExternalLink } from 'lucide-react'
import { useProgress } from '@/store/progress'

// ─── Helpful Videos Data ────────────────────────────────────────────────────
const helpfulVideos = {
  N5: [
    {
      title: 'Learn Japanese for Beginners – Hiragana, Katakana & N5 Basics',
      channel: 'JapanesePod101',
      url: 'https://www.youtube.com/@JapanesePod101/featured',
      description: 'Structured beginner playlist covering all N5 essentials — kana, vocabulary, and basic grammar.',
      tag: 'Comprehensive',
    },
    {
      title: 'Japanese from Zero! – Complete N5 Course',
      channel: 'Learn Japanese from Zero!',
      url: 'https://www.youtube.com/@japanesefromzero',
      description: 'Friendly step-by-step N5 course that takes you from zero knowledge to reading simple sentences.',
      tag: 'Beginner Friendly',
    },
    {
      title: 'Absolute Beginner Japanese with Misa',
      channel: 'Japanese with Misa',
      url: 'https://www.youtube.com/@JapaneseAmmowithMisa',
      description: 'In-depth grammar and vocabulary explanations for absolute beginners aiming for N5.',
      tag: 'Grammar Focus',
    },
    {
      title: 'N5 Listening Practice – Beginner Japanese',
      channel: 'Study in Daily Japanese',
      url: 'https://www.youtube.com/watch?v=ii-9pc1bfJo',
      description: 'Natural listening practice at N5 level — great for training your ear alongside reading.',
      tag: 'Listening',
    },
    {
      title: 'Yuko Sensei – N5 Vocabulary and Grammar',
      channel: 'Yuko Sensei',
      url: 'https://www.youtube.com/@YukoSensei',
      description: 'Short, focused lessons on N5 vocabulary and grammar patterns taught by a native speaker.',
      tag: 'Vocabulary',
    },
  ],
  N4: [
    {
      title: 'Nihongo no Mori – JLPT N4 Grammar Full Playlist',
      channel: 'Nihongo no Mori',
      url: 'https://www.youtube.com/@nihongonomori2013/featured',
      description: 'The most popular N4 grammar series on YouTube — thorough explanations of every N4 grammar point.',
      tag: 'Grammar Focus',
    },
    {
      title: 'N4 Grammar Video Series – Parts 1 to 6',
      channel: 'Gogaku Education',
      url: 'https://gogakueducation.com/2026/05/29/jlpt-n4-grammar-series-parts-1-to-6/',
      description: 'Six-part structured video series covering all major N4 grammar patterns with examples.',
      tag: 'Grammar Focus',
    },
    {
      title: 'Minna no Nihongo N4 – Vocabulary Lessons 26–30',
      channel: 'Nihongo Dekita Sayaka',
      url: 'https://www.youtube.com/watch?v=LFfmml-sFO4',
      description: 'Clear vocabulary walkthroughs following the Minna no Nihongo N4 curriculum.',
      tag: 'Vocabulary',
    },
    {
      title: 'JLPT N4 Listening Practice',
      channel: 'Study in Daily Japanese',
      url: 'https://www.youtube.com/watch?v=_gBilEjnA9k',
      description: 'Exam-style N4 listening exercises to sharpen comprehension before test day.',
      tag: 'Listening',
    },
    {
      title: 'Japanese with Misa – Intermediate Grammar for N4',
      channel: 'Japanese with Misa',
      url: 'https://www.youtube.com/@JapaneseAmmowithMisa',
      description: 'Deep-dive grammar explanations bridging N5 knowledge up to N4 difficulty.',
      tag: 'Grammar Focus',
    },
  ],
}

const tagColors: Record<string, string> = {
  'Comprehensive':    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'Beginner Friendly':'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'Grammar Focus':    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'Listening':        'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  'Vocabulary':       'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ReadingPage() {
  const { markLessonComplete } = useProgress()
  const [selected, setSelected] = useState<string | null>(null)
  const [showFurigana, setShowFurigana] = useState(true)
  const [showTranslation, setShowTranslation] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [filter, setFilter] = useState<'All' | 'N5' | 'N4'>('All')
  const [videoLevel, setVideoLevel] = useState<'N5' | 'N4'>('N5')

  const filtered = readingPassages.filter(p => filter === 'All' || p.level === filter)
  const passage = selected ? readingPassages.find(p => p.id === selected) : null

  const handleAnswer = (qIdx: number, aIdx: number) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [`${selected}-${qIdx}`]: aIdx }))
  }

  const score = passage
    ? passage.questions.filter((q, i) => answers[`${passage.id}-${i}`] === q.answer).length
    : 0

  const handleSubmit = () => {
    setSubmitted(true)
    if (passage) markLessonComplete(passage.id)
  }

  // ── Passage reader view ──────────────────────────────────────────────────
  if (passage) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <button
          onClick={() => { setSelected(null); setAnswers({}); setSubmitted(false) }}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-indigo mb-6"
        >
          <ChevronLeft size={16} /> Back to Reading
        </button>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge label={passage.level} variant="level" />
          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{passage.topic}</span>
          <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} />{passage.estimatedTime} min</span>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">{passage.title}</h1>

        <div className="flex gap-2 mb-5 flex-wrap">
          <Button size="sm" variant={showFurigana ? 'primary' : 'secondary'} onClick={() => setShowFurigana(!showFurigana)}>
            {showFurigana ? <Eye size={14} /> : <EyeOff size={14} />} Furigana
          </Button>
          <Button size="sm" variant={showTranslation ? 'primary' : 'secondary'} onClick={() => setShowTranslation(!showTranslation)}>
            {showTranslation ? <Eye size={14} /> : <EyeOff size={14} />} Translation
          </Button>
        </div>

        <Card className="mb-6 bg-white dark:bg-gray-800">
          <p className="jp text-lg leading-relaxed text-gray-900 dark:text-white mb-3">
            {showFurigana ? passage.bodyFurigana : passage.bodyJp}
          </p>
          {showTranslation && (
            <p className="text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3 mt-3 italic">
              {passage.bodyEn}
            </p>
          )}
        </Card>

        <h2 className="font-bold text-gray-900 dark:text-white mb-4">Comprehension Questions</h2>
        <div className="space-y-5 mb-6">
          {passage.questions.map((q, qi) => {
            const picked = answers[`${passage.id}-${qi}`]
            return (
              <Card key={qi} className={submitted ? picked === q.answer ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10' : 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10' : ''}>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">{qi + 1}. {q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => handleAnswer(qi, oi)}
                      className={`py-2.5 px-3 rounded-xl text-sm text-left font-medium border-2 transition-all ${
                        submitted
                          ? oi === q.answer
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : oi === picked
                              ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600'
                              : 'border-gray-100 dark:border-gray-700 text-gray-400'
                          : picked === oi
                            ? 'border-brand-indigo bg-indigo-50 dark:bg-indigo-900/20 text-brand-indigo'
                            : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/10'
                      }`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        {!submitted ? (
          <Button onClick={handleSubmit} className="w-full" disabled={Object.keys(answers).length < passage.questions.length}>
            Submit Answers
          </Button>
        ) : (
          <Card className="text-center bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
            <div className="text-4xl mb-2">{score === passage.questions.length ? '🎉' : score >= passage.questions.length / 2 ? '👍' : '📚'}</div>
            <div className="text-2xl font-extrabold text-brand-indigo mb-1">{score} / {passage.questions.length} correct</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {score === passage.questions.length ? 'Perfect score! Excellent reading comprehension.' : 'Review the passage and try again for a perfect score.'}
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="secondary" size="sm" onClick={() => { setAnswers({}); setSubmitted(false) }}>Try Again</Button>
              <Button size="sm" onClick={() => { setSelected(null); setAnswers({}); setSubmitted(false) }}>Next Passage</Button>
            </div>
          </Card>
        )}
      </div>
    )
  }

  // ── List / Videos view ───────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Reading Practice — 読み物</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {readingPassages.length} passages across N5 and N4 with furigana, translation toggle, and comprehension questions.
        </p>
      </div>

      {/* Level filter */}
      <div className="flex gap-2 mb-6">
        {(['All', 'N5', 'N4'] as const).map(l => (
          <Button key={l} variant={filter === l ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter(l)}>{l}</Button>
        ))}
      </div>

      {/* Passage grid */}
      <div className="grid sm:grid-cols-2 gap-5 mb-16">
        {filtered.map(p => (
          <Card key={p.id} hover onClick={() => { setSelected(p.id); setAnswers({}); setSubmitted(false) }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge label={p.level} variant="level" />
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{p.topic}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={11} />{p.estimatedTime} min</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 jp line-clamp-2">{p.bodyFurigana}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-400">{p.questions.length} questions</span>
              <Button size="sm" variant="ghost" className="text-brand-indigo dark:text-indigo-400">Read Now →</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Helpful Videos Section ──────────────────────────────────────── */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Play size={22} className="text-brand-indigo" /> Helpful Videos
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Curated YouTube resources to complement your reading practice — pick your level below.
          </p>
        </div>

        {/* Level tabs for videos */}
        <div className="flex gap-2 mb-6">
          {(['N5', 'N4'] as const).map(l => (
            <Button key={l} variant={videoLevel === l ? 'primary' : 'secondary'} size="sm" onClick={() => setVideoLevel(l)}>
              {l} Videos
            </Button>
          ))}
        </div>

        {/* Video cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpfulVideos[videoLevel].map((v, i) => (
            <a
              key={i}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card className="h-full hover:border-brand-indigo dark:hover:border-indigo-500 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[v.tag] ?? ''}`}>
                    {v.tag}
                  </span>
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-brand-indigo shrink-0 mt-0.5" />
                </div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1 group-hover:text-brand-indigo leading-snug">
                  {v.title}
                </h3>
                <p className="text-xs text-brand-indigo dark:text-indigo-400 font-medium mb-2">{v.channel}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.description}</p>
              </Card>
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}
