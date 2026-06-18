'use client'
import { useState, useEffect } from 'react'
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
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)

  const filtered = listeningExercises.filter(e => filter === 'All' || e.level === filter)
  const exercise = selected ? listeningExercises.find(e => e.id === selected) : null

  // Keep playing/paused state in sync with speechSynthesis events
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const ss = window.speechSynthesis

    const onStart  = () => { setPlaying(true);  setPaused(false) }
    const onPause  = () => { setPlaying(true);  setPaused(true)  }
    const onResume = () => { setPlaying(true);  setPaused(false) }
    const onEnd    = () => { setPlaying(false); setPaused(false) }
    const onError  = () => { setPlaying(false); setPaused(false) }

    ss.addEventListener('voiceschanged', () => {}) // keep voices loaded
    window.addEventListener('beforeunload', () => ss.cancel())

    return () => {
      ss.cancel()
    }
  }, [])

  // Reset playback state when switching exercises
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setPlaying(false)
    setPaused(false)
  }, [selected])

  const handlePlay = () => {
    const ss = window.speechSynthesis
    if (!exercise) return

    if (paused) {
      // Resume paused speech
      ss.resume()
      setPlaying(true)
      setPaused(false)
      return
    }

    // Start fresh
    ss.cancel()
    const text = exercise.transcript.replace(/[A-Z]：/g, '').replace(/\n/g, '。')
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ja-JP'
    u.rate = slow ? 0.6 : 0.9

    u.onstart  = () => { setPlaying(true);  setPaused(false) }
    u.onend    = () => { setPlaying(false); setPaused(false) }
    u.onerror  = () => { setPlaying(false); setPaused(false) }

    ss.speak(u)
    setPlaying(true)
    setPaused(false)
  }

  const handlePause = () => {
    const ss = window.speechSynthesis
    if (ss.speaking && !ss.paused) {
      ss.pause()
      setPlaying(true)
      setPaused(true)
    }
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setPlaying(false)
    setPaused(false)
  }

  // Restart when speed changes mid-play
  const handleSpeedChange = (isSlow: boolean) => {
    setSlow(isSlow)
    if (playing) {
      window.speechSynthesis.cancel()
      setPlaying(false)
      setPaused(false)
    }
  }

  const score = exercise
    ? exercise.questions.filter((q, i) => answers[`${exercise.id}-${i}`] === q.answer).length
    : 0

  if (exercise) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <button
          onClick={() => {
            handleStop()
            setSelected(null)
            setAnswers({})
            setSubmitted(false)
            setShowTranscript(false)
          }}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-indigo mb-6"
        >
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
            {/* Play / Resume button */}
            <button
              onClick={handlePlay}
              disabled={playing && !paused}
              className="w-14 h-14 bg-brand-indigo rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              title={paused ? 'Resume' : 'Play'}
            >
              <Play size={22} fill="white" />
            </button>

            {/* Pause button */}
            <button
              onClick={handlePause}
              disabled={!playing || paused}
              className="w-10 h-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Pause"
            >
              <Pause size={18} />
            </button>

            {/* Stop button */}
            <button
              onClick={handleStop}
              disabled={!playing && !paused}
              className="w-10 h-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Stop"
            >
              <Square size={18} />
            </button>

            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{exercise.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {playing && !paused ? '▶ Playing...' : paused ? '⏸ Paused' : 'Uses browser text-to-speech (Japanese)'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant={!slow ? 'primary' : 'secondary'} onClick={() => handleSpeedChange(false)}>Normal Speed</Button>
            <Button size="sm" variant={slow ? 'primary' : 'secondary'} onClick={() => handleSpeedChange(true)}>Slow Speed</Button>
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

        {/* Questions */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Comprehension Questions</h2>
        <div className="space-y-4 mb-6">
          {exercise.questions.map((q, i) => (
            <Card key={i}>
              <p className="font-medium text-gray-900 dark:text-white mb-3">{i + 1}. {q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, j) => {
                  const key = `${exercise.id}-${i}`
                  const selected_ans = answers[key]
                  const isSelected = selected_ans === j
                  const isCorrect = j === q.answer
                  let cls = 'w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors '
                  if (!submitted) {
                    cls += isSelected
                      ? 'bg-brand-indigo text-white border-brand-indigo'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-brand-indigo dark:hover:border-brand-indigo text-gray-800 dark:text-gray-200'
                  } else {
                    if (isCorrect) cls += 'bg-green-100 dark:bg-green-900/30 border-green-400 text-green-800 dark:text-green-300 font-semibold'
                    else if (isSelected) cls += 'bg-red-100 dark:bg-red-900/30 border-red-400 text-red-800 dark:text-red-300'
                    else cls += 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                  }
                  return (
                    <button key={j} className={cls} disabled={submitted}
                      onClick={() => setAnswers(a => ({ ...a, [key]: j }))}>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>

        {!submitted ? (
          <Button onClick={() => { setSubmitted(true); markLessonComplete(exercise.id) }}
            disabled={Object.keys(answers).length < exercise.questions.length}>
            Submit Answers
          </Button>
        ) : (
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Score: {score} / {exercise.questions.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {score === exercise.questions.length ? '🎉 Perfect! Great listening!' : score >= exercise.questions.length / 2 ? '👍 Good job! Keep practicing.' : '📖 Try listening again and review the transcript.'}
            </p>
            <Button variant="secondary" onClick={() => { setAnswers({}); setSubmitted(false) }}>Try Again</Button>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Listening — 聴解</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Practice listening comprehension with Japanese audio and questions.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {(['All', 'N5', 'N4'] as const).map(l => (
          <button key={l} onClick={() => setFilter(l)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === l ? 'bg-brand-indigo text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(ex => (
          <Card key={ex.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setSelected(ex.id); setAnswers({}); setSubmitted(false); setShowTranscript(false) }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                <Volume2 size={18} className="text-brand-indigo" />
              </div>
              <Badge label={ex.level} variant="level" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{ex.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{ex.topic} · {ex.estimatedTime} min</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{ex.questions.length} comprehension questions</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
