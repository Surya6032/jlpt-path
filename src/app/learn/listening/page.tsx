'use client'
import { useState } from 'react'
import { listeningExercises } from '@/data/misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useProgress } from '@/store/progress'
import { Play, Volume2, FileText, ChevronLeft, Clock } from 'lucide-react'

function playAudio(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.8
    window.speechSynthesis.speak(u)
  }
}

export default function ListeningPage() {
  const { markLessonComplete } = useProgress()
  const [selected, setSelected] = useState<string | null>(null)
  const [showTranscript, setShowTranscript] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [filter, setFilter] = useState<'All' | 'N5' | 'N4'>('All')
  const [slow, setSlow] = useState(false)

  const filtered = listeningExercises.filter(e => filter === 'All' || e.level === filter)
  const exercise = selected ? listeningExercises.find(e => e.id === selected) : null

  const handlePlay = () => {
    if (!exercise) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(exercise.transcript.replace(/[A-Z]：/g, '').replace(/\n/g, '。'))
    u.lang = 'ja-JP'
    u.rate = slow ? 0.6 : 0.9
    window.speechSynthesis.speak(u)
  }

  const score = exercise ? exercise.questions.filter((q, i) => answers[`${exercise.id}-${i}`] === q.answer).length : 0

  if (exercise) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <button onClick={() => { setSelected(null); setAnswers({}); setSubmitted(false); setShowTranscript(false) }} className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-indigo mb-6">
          <ChevronLeft size={16} /> Back to Listening
        </button>

        <div className="flex flex-wrap gap-3 mb-4">
          <Badge label={exercise.level} variant="level" />
          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{exercise.topic}</span>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">{exercise.title}</h1>

        {/* Audio player UI */}
        <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={handlePlay} className="w-14 h-14 bg-brand-indigo rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors shadow-lg">
              <Play size={22} fill="white" />
            </button>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{exercise.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Uses browser text-to-speech (Japanese)</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant={!slow ? 'primary' : 'secondary'} onClick={() => setSlow(false)}>Normal Speed</Button>
            <Button size="sm" variant={slow ? 'primary' : 'secondary'} onClick={() => setSlow(true)}>Slow Speed</Button>
            <Button size="sm" variant={showTranscript ? 'primary' : 'secondary'} onClick={() => setShowTranscript(!showTranscript)}>
              <FileText size={14} /> {showTranscript ? 'Hide' : 'Show'} Transcript
            </Button>
          </div>
          {showTranscript && (
            <div className="mt-4 pt-4 border-t border-indigo-100 dark:border-indigo-800 animate-fade-in">
              <pre className="jp text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">{exercise.transcript}</pre>
            </div>
          )}
        </Card>

        <h2 className="font-bold text-gray-900 dark:text-white mb-4">Comprehension Questions</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Listen to the audio, then answer the questions below.</p>

        <div className="space-y-5 mb-6">
          {exercise.questions.map((q, qi) => {
            const picked = answers[`${exercise.id}-${qi}`]
            return (
              <Card key={qi} className={submitted ? picked === q.answer ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700' : ''}>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">{qi + 1}. {q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => !submitted && setAnswers(p => ({ ...p, [`${exercise.id}-${qi}`]: oi }))}
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
          <Button onClick={() => { setSubmitted(true); markLessonComplete(exercise.id) }} className="w-full" disabled={Object.keys(answers).filter(k => k.startsWith(exercise.id)).length < exercise.questions.length}>
            Submit Answers
          </Button>
        ) : (
          <Card className="text-center bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
            <div className="text-2xl font-extrabold text-brand-indigo mb-2">{score} / {exercise.questions.length} correct</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {score === exercise.questions.length ? '🎉 Perfect! Great listening comprehension!' : '📻 Listen again and review the transcript for the ones you missed.'}
            </p>
            <Button onClick={() => { setSelected(null); setAnswers({}); setSubmitted(false); setShowTranscript(false) }}>Next Exercise</Button>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Listening Practice — 聴解</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">5 daily-life dialogues with audio, transcript, and comprehension questions. Uses browser TTS for Japanese audio.</p>
      </div>
      <div className="flex gap-2 mb-6">
        {(['All','N5','N4'] as const).map(l => (
          <Button key={l} variant={filter === l ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter(l)}>{l}</Button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {filtered.map(e => (
          <Card key={e.id} hover onClick={() => { setSelected(e.id); setAnswers({}); setSubmitted(false); setShowTranscript(false) }}>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-brand-indigo flex-shrink-0">
                <Volume2 size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge label={e.level} variant="level" />
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{e.topic}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{e.title}</h3>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 jp line-clamp-2">{e.transcript.split('\n')[0]}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-400">{e.questions.length} questions</span>
              <Button size="sm" variant="ghost" className="text-brand-indigo dark:text-indigo-400">Listen Now →</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
