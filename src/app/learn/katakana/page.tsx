'use client'
import { useState } from 'react'
import { katakanaData } from '@/data/vocab'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { useProgress } from '@/store/progress'
import { Volume2, ChevronRight, RefreshCcw } from 'lucide-react'

type Mode = 'chart' | 'quiz' | 'flashcard'

function playAudio(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.85
    window.speechSynthesis.speak(u)
  }
}

export default function KatakanaPage() {
  const { progress, setKatakanaProgress, markLessonComplete } = useProgress()
  const [mode, setMode] = useState<Mode>('chart')
  const [selected, setSelected] = useState<string | null>(null)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const current = katakanaData[quizIdx]

  const getOptions = () => {
    const correct = current.romaji
    const others = katakanaData.filter(h => h.romaji !== correct).sort(() => Math.random() - 0.5).slice(0, 3).map(h => h.romaji)
    return [...others, correct].sort(() => Math.random() - 0.5)
  }

  const handleAnswer = (ans: string) => {
    setQuizAnswer(ans)
    if (ans === current.romaji) setScore(s => s + 1)
  }

  const nextQ = () => {
    if (quizIdx + 1 >= katakanaData.length) {
      setQuizDone(true)
      setKatakanaProgress(Math.round(((quizIdx + 1) / katakanaData.length) * 100))
      markLessonComplete('katakana-quiz')
    } else { setQuizIdx(i => i + 1); setQuizAnswer(null) }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <Badge label="Beginner" variant="level" className="mb-2" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Katakana — カタカナ</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Used for foreign words, loan words, and emphasis. Essential for reading menus, signs, and modern Japanese.</p>
        <div className="mt-4"><ProgressBar value={progress.katakanaProgress} label="Katakana Progress" /></div>
      </div>

      <div className="flex gap-2 mb-8">
        {(['chart','quiz','flashcard'] as Mode[]).map(m => (
          <Button key={m} variant={mode === m ? 'primary' : 'secondary'} size="sm" onClick={() => { setMode(m); setQuizIdx(0); setQuizAnswer(null); setScore(0); setQuizDone(false) }}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </Button>
        ))}
      </div>

      {mode === 'chart' && (
        <div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3">
            {katakanaData.map(k => (
              <Card key={k.id} hover onClick={() => { setSelected(selected === k.id ? null : k.id); playAudio(k.character) }}
                className={`text-center p-3 cursor-pointer ${selected === k.id ? 'border-brand-indigo bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
                <div className="jp text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{k.character}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{k.romaji}</div>
              </Card>
            ))}
          </div>
          {selected && (() => {
            const k = katakanaData.find(x => x.id === selected)!
            return (
              <Card className="mt-6 bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-6">
                  <div className="jp text-6xl font-bold text-brand-indigo">{k.character}</div>
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{k.romaji}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 jp">Example: <span className="font-semibold">{k.example}</span> — {k.exampleMeaning}</div>
                    <Button size="sm" onClick={() => playAudio(k.character)}><Volume2 size={14} /> Listen</Button>
                  </div>
                </div>
              </Card>
            )
          })()}
        </div>
      )}

      {mode === 'quiz' && !quizDone && (
        <Card className="max-w-md mx-auto">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{quizIdx + 1} / {katakanaData.length}</div>
          <ProgressBar value={quizIdx} max={katakanaData.length} showPercent={false} className="mb-6" />
          <div className="text-center mb-8">
            <div className="jp text-7xl font-bold text-gray-900 dark:text-white mb-2">{current.character}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">What is the reading?</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {getOptions().map(opt => (
              <button key={opt} onClick={() => !quizAnswer && handleAnswer(opt)}
                className={`py-3 px-4 rounded-xl font-semibold text-sm border-2 transition-all ${quizAnswer ? opt === current.romaji ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700' : opt === quizAnswer ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600' : 'border-gray-100 dark:border-gray-700 text-gray-400' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/10'}`}>
                {opt}
              </button>
            ))}
          </div>
          {quizAnswer && (
            <div className="mt-4">
              <div className={`text-sm font-semibold mb-2 ${quizAnswer === current.romaji ? 'text-green-600' : 'text-red-500'}`}>
                {quizAnswer === current.romaji ? '✓ Correct!' : `✗ Answer: ${current.romaji}`}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 jp">Example: {current.example} ({current.exampleMeaning})</div>
              <Button size="sm" onClick={nextQ} className="w-full">{quizIdx + 1 >= katakanaData.length ? 'Finish' : 'Next'} <ChevronRight size={14} /></Button>
            </div>
          )}
        </Card>
      )}

      {mode === 'quiz' && quizDone && (
        <Card className="max-w-md mx-auto text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <div className="text-3xl font-extrabold text-brand-indigo mb-4">{score} / {katakanaData.length}</div>
          <Button onClick={() => { setQuizIdx(0); setScore(0); setQuizDone(false); setQuizAnswer(null) }} className="w-full"><RefreshCcw size={14} /> Try Again</Button>
        </Card>
      )}

      {mode === 'flashcard' && (() => {
        const k = katakanaData[quizIdx]
        return (
          <div className="max-w-md mx-auto">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">{quizIdx + 1} / {katakanaData.length}</div>
            <Card className="text-center p-10 cursor-pointer" onClick={() => setSelected(selected === 'shown' ? null : 'shown')}>
              <div className="jp text-8xl font-bold text-gray-900 dark:text-white mb-4">{k.character}</div>
              {selected === 'shown' ? (
                <div className="animate-fade-in">
                  <div className="text-2xl font-bold text-brand-indigo mb-2">{k.romaji}</div>
                  <div className="text-sm text-gray-500 jp">Example: {k.example} — {k.exampleMeaning}</div>
                </div>
              ) : <p className="text-sm text-gray-400">Tap to reveal</p>}
            </Card>
            <div className="flex gap-3 mt-4 justify-center">
              <Button variant="secondary" size="sm" onClick={() => { setQuizIdx(i => Math.max(0, i - 1)); setSelected(null) }}>← Back</Button>
              <Button size="sm" onClick={() => playAudio(k.character)}><Volume2 size={14} /></Button>
              <Button variant="secondary" size="sm" onClick={() => { setQuizIdx(i => Math.min(katakanaData.length - 1, i + 1)); setSelected(null) }}>Next →</Button>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
