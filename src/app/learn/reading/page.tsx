'use client'
import { useState } from 'react'
import { readingPassages } from '@/data/misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useProgress } from '@/store/progress'
import { Eye, EyeOff, Clock, CheckCircle, ChevronLeft } from 'lucide-react'

export default function ReadingPage() {
  const { markLessonComplete } = useProgress()
  const [selected, setSelected] = useState<string | null>(null)
  const [showFurigana, setShowFurigana] = useState(true)
  const [showTranslation, setShowTranslation] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [filter, setFilter] = useState<'All' | 'N5' | 'N4'>('All')

  const filtered = readingPassages.filter(p => filter === 'All' || p.level === filter)
  const passage = selected ? readingPassages.find(p => p.id === selected) : null

  const handleAnswer = (qIdx: number, aIdx: number) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [`${selected}-${qIdx}`]: aIdx }))
  }

  const score = passage ? passage.questions.filter((q, i) => answers[`${passage.id}-${i}`] === q.answer).length : 0

  const handleSubmit = () => {
    setSubmitted(true)
    if (passage) markLessonComplete(passage.id)
  }

  if (passage) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <button onClick={() => { setSelected(null); setAnswers({}); setSubmitted(false) }} className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-indigo mb-6">
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
                      className={`py-2.5 px-3 rounded-xl text-sm text-left font-medium border-2 transition-all ${submitted ? oi === q.answer ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : oi === picked ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600' : 'border-gray-100 dark:border-gray-700 text-gray-400' : picked === oi ? 'border-brand-indigo bg-indigo-50 dark:bg-indigo-900/20 text-brand-indigo' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/10'}`}>
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Reading Practice — 読み物</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">5 passages from N5 to N4 with furigana, translation toggle, and comprehension questions.</p>
      </div>
      <div className="flex gap-2 mb-6">
        {(['All','N5','N4'] as const).map(l => (
          <Button key={l} variant={filter === l ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter(l)}>{l}</Button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
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
    </div>
  )
}
