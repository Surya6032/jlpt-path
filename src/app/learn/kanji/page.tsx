'use client'
import { useState } from 'react'
import { kanjiData } from '@/data/kanji'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useProgress } from '@/store/progress'
import { Volume2, BookmarkPlus, BookmarkCheck } from 'lucide-react'

function playAudio(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.85
    window.speechSynthesis.speak(u)
  }
}

export default function KanjiPage() {
  const { progress, markKanjiLearned } = useProgress()
  const [level, setLevel] = useState<'All' | 'N5' | 'N4'>('All')
  const [selected, setSelected] = useState<string | null>(null)
  const [saved, setSaved] = useState<string[]>([])
  const [quizMode, setQuizMode] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const filtered = kanjiData.filter(k => level === 'All' || k.level === level)
  const current = filtered[quizIdx]

  const getOptions = () => {
    const correct = current.meaning
    const others = kanjiData.filter(k => k.meaning !== correct).sort(() => Math.random() - 0.5).slice(0, 3).map(k => k.meaning)
    return [...others, correct].sort(() => Math.random() - 0.5)
  }

  const handleAnswer = (ans: string) => {
    setQuizAnswer(ans)
    if (ans === current.meaning) setScore(s => s + 1)
  }

  const nextQ = () => {
    if (quizIdx + 1 >= filtered.length) { setQuizDone(true) }
    else { setQuizIdx(i => i + 1); setQuizAnswer(null) }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Kanji — 漢字</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">40 kanji across N5 and N4. Study meaning, readings, example words and sentences.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {(['All','N5','N4'] as const).map(l => (
          <Button key={l} variant={level === l ? 'primary' : 'secondary'} size="sm" onClick={() => { setLevel(l); setSelected(null); setQuizIdx(0); setQuizAnswer(null); setScore(0); setQuizDone(false) }}>{l}</Button>
        ))}
        <Button variant={quizMode ? 'primary' : 'secondary'} size="sm" onClick={() => { setQuizMode(!quizMode); setQuizIdx(0); setQuizAnswer(null); setScore(0); setQuizDone(false) }}>
          {quizMode ? 'Exit Quiz' : 'Take Quiz'}
        </Button>
      </div>

      {!quizMode ? (
        <>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-8">
            {filtered.map(k => (
              <Card key={k.id} hover onClick={() => setSelected(selected === k.id ? null : k.id)}
                className={`text-center p-3 ${selected === k.id ? 'border-brand-indigo bg-indigo-50 dark:bg-indigo-900/20' : ''} ${progress.kanjiLearned.includes(k.id) ? 'ring-1 ring-green-400' : ''}`}>
                <div className="jp text-2xl font-bold text-gray-900 dark:text-white">{k.kanji}</div>
                <Badge label={k.level} variant="level" className="mt-1.5 text-xs" />
              </Card>
            ))}
          </div>

          {selected && (() => {
            const k = kanjiData.find(x => x.id === selected)!
            return (
              <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/10 dark:to-gray-800 border-indigo-100 dark:border-indigo-800">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="text-center sm:text-left">
                    <div className="jp text-8xl font-bold text-brand-indigo leading-none mb-3">{k.kanji}</div>
                    <Button size="sm" variant="secondary" onClick={() => playAudio(k.kanji)}><Volume2 size={14} /> Listen</Button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{k.meaning}</h2>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white dark:bg-gray-700 rounded-xl p-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">On'yomi (音読み)</div>
                        <div className="jp font-semibold text-gray-800 dark:text-gray-200">{k.onyomi}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-xl p-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Kun'yomi (訓読み)</div>
                        <div className="jp font-semibold text-gray-800 dark:text-gray-200">{k.kunyomi}</div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Example word</div>
                      <span className="jp font-bold text-gray-800 dark:text-gray-200">{k.exampleWord}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm"> ({k.exampleReading})</span>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Example sentence</div>
                      <div className="jp text-sm font-medium text-gray-800 dark:text-gray-200">{k.exampleSentenceJp}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{k.exampleSentenceEn}</div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {!progress.kanjiLearned.includes(k.id)
                        ? <Button size="sm" onClick={() => markKanjiLearned(k.id)}>✓ Mark as Learned</Button>
                        : <span className="text-sm text-green-600 dark:text-green-400 font-semibold">✓ Learned</span>}
                      <Button size="sm" variant="secondary" onClick={() => { setSaved(s => s.includes(k.id) ? s.filter(x => x !== k.id) : [...s, k.id]) }}>
                        {saved.includes(k.id) ? <><BookmarkCheck size={14} /> Saved</> : <><BookmarkPlus size={14} /> Save</>}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })()}
        </>
      ) : !quizDone ? (
        <Card className="max-w-md mx-auto">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{quizIdx + 1} / {filtered.length}</div>
          <div className="text-center mb-6">
            <div className="jp text-8xl font-bold text-gray-900 dark:text-white mb-3">{current.kanji}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">What does this kanji mean?</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {getOptions().map(opt => (
              <button key={opt} onClick={() => !quizAnswer && handleAnswer(opt)}
                className={`py-3 px-4 rounded-xl font-semibold text-sm border-2 transition-all ${quizAnswer ? opt === current.meaning ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700' : opt === quizAnswer ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600' : 'border-gray-100 dark:border-gray-700 text-gray-400' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/10'}`}>
                {opt}
              </button>
            ))}
          </div>
          {quizAnswer && (
            <div className="mt-4">
              <div className={`text-sm font-semibold mb-2 ${quizAnswer === current.meaning ? 'text-green-600' : 'text-red-500'}`}>
                {quizAnswer === current.meaning ? '✓ Correct!' : `✗ Answer: ${current.meaning}`}
              </div>
              <Button size="sm" onClick={nextQ} className="w-full">{quizIdx + 1 >= filtered.length ? 'Finish' : 'Next →'}</Button>
            </div>
          )}
        </Card>
      ) : (
        <Card className="max-w-md mx-auto text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h2>
          <div className="text-3xl font-extrabold text-brand-indigo mb-4">{score} / {filtered.length}</div>
          <Button onClick={() => { setQuizIdx(0); setScore(0); setQuizDone(false); setQuizAnswer(null) }} className="w-full">Try Again</Button>
        </Card>
      )}
    </div>
  )
}
