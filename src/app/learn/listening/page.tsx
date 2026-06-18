'use client'
import { useState, useRef } from 'react'
import { listeningExercises } from '@/data/misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useProgress } from '@/store/progress'
import { Play, Pause, Square, Volume2, FileText, ChevronLeft } from 'lucide-react'

export default function ListeningPage() {
  const { markLessonComplete } = useProgress()
  const [selected, setSelected] = useState<string | null>(null)
  const [showTranscript, setShowTranscript] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [filter, setFilter] = useState<'All' | 'N5' | 'N4'>('All')
  const [slow, setSlow] = useState(false)
  const [playState, setPlayState] = useState<'idle' | 'playing' | 'paused'>('idle')
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const filtered = listeningExercises.filter(e => filter === 'All' || e.level === filter)
  const exercise = selected ? listeningExercises.find(e => e.id === selected) : null

  const handlePlay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    if (playState === 'paused') {
      window.speechSynthesis.resume()
      setPlayState('playing')
      return
    }
    window.speechSynthesis.cancel()
    if (!exercise) return
    const u = new SpeechSynthesisUtterance(exercise.transcript.replace(/\\n/g, '。'))
    u.lang = 'ja-JP'
    u.rate = slow ? 0.6 : 0.85
    u.onend = () => setPlayState('idle')
    u.onpause = () => setPlayState('paused')
    utteranceRef.current = u
    window.speechSynthesis.speak(u)
    setPlayState('playing')
  }

  const handlePause = () => {
    if (typeof window === 'undefined') return
    window.speechSynthesis.pause()
    setPlayState('paused')
  }

  const handleStop = () => {
    if (typeof window === 'undefined') return
    window.speechSynthesis.cancel()
    setPlayState('idle')
  }

  const handleBack = () => {
    if (typeof window !== 'undefined') window.speechSynthesis.cancel()
    setSelected(null)
    setAnswers({})
    setSubmitted(false)
    setShowTranscript(false)
    setPlayState('idle')
  }

  const handleSpeedToggle = () => {
    if (typeof window !== 'undefined') window.speechSynthesis.cancel()
    setPlayState('idle')
    setSlow(v => !v)
  }

  if (exercise) {
    const score = exercise.questions.filter((q, i) => answers[`${exercise.id}-${i}`] === q.answer).length

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <button onClick={handleBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white mb-6 transition-colors">
          <ChevronLeft size={16} /> Back to exercises
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Badge label={exercise.level} variant="level" />
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{exercise.topic}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{exercise.title}</h2>
          {playState === 'playing' && <p className="text-xs text-indigo-500 mt-1 animate-pulse">&#9654; Playing...</p>}
          {playState === 'paused' && <p className="text-xs text-yellow-500 mt-1">&#9646;&#9646; Paused</p>}
        </div>

        {/* Playback Controls */}
        <Card className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handlePlay}
              disabled={playState === 'playing'}
              variant="primary"
              className="flex items-center gap-2"
            >
              <Play size={16} />
              {playState === 'paused' ? 'Resume' : 'Play'}
            </Button>
            <Button
              onClick={handlePause}
              disabled={playState !== 'playing'}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Pause size={16} /> Pause
            </Button>
            <Button
              onClick={handleStop}
              disabled={playState === 'idle'}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Square size={16} /> Stop
            </Button>
            <Button
              onClick={handleSpeedToggle}
              variant="ghost"
              className="flex items-center gap-2 text-sm ml-auto"
            >
              <Volume2 size={16} /> {slow ? 'Speed: Slow' : 'Speed: Normal'}
            </Button>
          </div>
        </Card>

        {/* Transcript Toggle */}
        <Button
          variant="ghost"
          onClick={() => setShowTranscript(v => !v)}
          className="flex items-center gap-2 text-sm mb-4"
        >
          <FileText size={14} /> {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
        </Button>

        {showTranscript && (
          <Card className="mb-6 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-sm jp leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">{exercise.transcript}</p>
          </Card>
        )}

        {/* Questions */}
        <div className="space-y-4 mb-6">
          {exercise.questions.map((q, i) => (
            <Card key={i}>
              <p className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">{i + 1}. {q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, j) => {
                  const key = `${exercise.id}-${i}`
                  const chosen = answers[key] === j
                  const correct = submitted && j === q.answer
                  const wrong = submitted && chosen && j !== q.answer
                  return (
                    <button
                      key={j}
                      disabled={submitted}
                      onClick={() => setAnswers(a => ({ ...a, [key]: j }))}
                      className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                        correct ? 'bg-green-50 border-green-400 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        wrong ? 'bg-red-50 border-red-400 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                        chosen ? 'bg-indigo-50 border-indigo-400 dark:bg-indigo-900/30 dark:border-indigo-500' :
                        'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                      }`}
                    >{opt}</button>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>

        {!submitted ? (
          <Button onClick={() => { setSubmitted(true); markLessonComplete(exercise.id) }} className="w-full" disabled={Object.keys(answers).filter(k => k.startsWith(exercise.id)).length < exercise.questions.length}>
            Submit Answers
          </Button>
        ) : (
          <Card className="text-center bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
            <div className="text-2xl font-extrabold text-brand-indigo mb-2">{score} / {exercise.questions.length} correct</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {score === exercise.questions.length ? '\uD83C\uDF89 Perfect! Great listening comprehension!' : '\uD83D\uDCFB Listen again and review the transcript for the ones you missed.'}
            </p>
            <Button onClick={() => { setSelected(null); setAnswers({}); setSubmitted(false); setShowTranscript(false); setPlayState('idle') }}>Next Exercise</Button>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Listening Practice \u2014 \u8074\u89E3</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Daily-life dialogues with audio, transcript, and comprehension questions. Uses browser TTS for Japanese audio.</p>
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
              <Button size="sm" variant="ghost" className="text-brand-indigo dark:text-indigo-400">Listen Now &rarr;</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
