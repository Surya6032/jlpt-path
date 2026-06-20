'use client'
import { useState, useRef, useEffect } from 'react'
import { useProgress } from '@/store/progress'
import { vocabData } from '@/data/vocab'
import { kanjiData } from '@/data/kanji'
import { grammarData } from '@/data/grammar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { RefreshCcw, Volume2, CheckCircle, XCircle, BookOpen } from 'lucide-react'

type ReviewItem = {
  id: string
  type: 'vocab' | 'kanji' | 'grammar'
  front: string
  back: string
  reading?: string
  example?: string
}

function buildQueue(progress: { reviewQueue: string[], srsMap: Record<string,{nextReview:string}> }): ReviewItem[] {
  const today = new Date().toISOString().split('T')[0]
  const dueIds = new Set([
    ...progress.reviewQueue,
    ...Object.entries(progress.srsMap || {})
      .filter(([,v]) => v.nextReview <= today)
      .map(([k]) => k)
  ])

  const items: ReviewItem[] = []
  dueIds.forEach(id => {
    const v = vocabData.find(x => x.id === id)
    if (v) { items.push({ id, type:'vocab', front:v.japanese, back:v.english, reading:v.furigana, example:v.example }); return }
    const k = kanjiData.find(x => x.id === id)
    if (k) { items.push({ id, type:'kanji', front:k.kanji, back:k.meaning, reading:k.onyomi+' / '+k.kunyomi, example:k.exampleWord }); return }
    const g = grammarData.find(x => x.id === id)
    if (g) { items.push({ id, type:'grammar', front:g.title, back:g.meaning, example:g.examples[0]?.jp }); return }
  })

  // If review queue is empty, grab all vocab not yet in SRS
  if (items.length === 0) {
    const inSRS = new Set(Object.keys(progress.srsMap || {}))
    vocabData.filter(v => !inSRS.has(v.id)).slice(0, 20).forEach(v => {
      items.push({ id:v.id, type:'vocab', front:v.japanese, back:v.english, reading:v.furigana, example:v.example })
    })
  }

  return items.sort(() => Math.random() - 0.5)
}

function speak(text: string) {
  if (typeof window === 'undefined') return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'; u.rate = 0.85
  speechSynthesis.cancel()
  speechSynthesis.speak(u)
}

export default function ReviewPage() {
  const { progress, updateSRS, markVocabLearned, addXP, recordStudyDay } = useProgress()
  const [queue, setQueue] = useState<ReviewItem[]>([])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState<{id:string,correct:boolean}[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    recordStudyDay()
    setQueue(buildQueue(progress))
  }, [])

  const current = queue[idx]
  const total = queue.length

  function handleAnswer(correct: boolean) {
    if (!current) return
    updateSRS(current.id, correct)
    if (correct && current.type === 'vocab') markVocabLearned(current.id)
    if (correct) addXP(5)
    setResults(r => [...r, { id: current.id, correct }])

    const next = idx + 1
    if (next >= total) { setDone(true); return }
    setIdx(next)
    setFlipped(false)
  }

  function restart() {
    setQueue(buildQueue(progress))
    setIdx(0); setFlipped(false); setResults([]); setDone(false)
  }

  const correctCount = results.filter(r => r.correct).length
  const accuracy = total > 0 ? Math.round((correctCount / results.length) * 100) : 0

  if (queue.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">No reviews due!</h2>
      <p className="text-gray-500 mb-6">You are all caught up. Come back tomorrow for more reviews.</p>
      <Button onClick={restart}><RefreshCcw size={16}/> Review Anyway</Button>
    </div>
  )

  if (done) return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="text-6xl mb-4">{accuracy >= 80 ? '🌟' : accuracy >= 60 ? '👍' : '💪'}</div>
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Session Complete!</h2>
      <p className="text-gray-500 mb-6">{correctCount}/{results.length} correct — {accuracy}% accuracy</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label:'Correct', val:correctCount, color:'text-green-600' },
          { label:'Wrong',   val:results.length - correctCount, color:'text-red-500' },
          { label:'XP Earned', val:`+${correctCount * 5}`, color:'text-yellow-600' },
        ].map(s => (
          <Card key={s.label} className="text-center">
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.val}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Wrong items */}
      {results.filter(r => !r.correct).length > 0 && (
        <Card className="text-left mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <XCircle size={16} className="text-red-500"/> Items to review more
          </h3>
          <div className="space-y-2">
            {results.filter(r => !r.correct).map(r => {
              const item = queue.find(q => q.id === r.id)
              return item ? (
                <div key={r.id} className="flex items-center justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-800">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{item.front}</span>
                  <span className="text-gray-500">{item.back}</span>
                </div>
              ) : null
            })}
          </div>
        </Card>
      )}

      <Button onClick={restart}><RefreshCcw size={16}/> Review Again</Button>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <RefreshCcw size={22} className="text-brand-indigo"/> SRS Review
          </h1>
          <span className="text-sm text-gray-400">{idx+1}/{total}</span>
        </div>
        <ProgressBar value={idx} max={total} showPercent={false}/>
        <div className="flex gap-4 mt-1 text-xs text-gray-400">
          <span className="text-green-500">✓ {correctCount} correct</span>
          <span className="text-red-500">✗ {results.filter(r=>!r.correct).length} wrong</span>
        </div>
      </div>

      {/* Card */}
      <div
        className="cursor-pointer select-none mb-6"
        onClick={() => !flipped && setFlipped(true)}
      >
        <Card className="min-h-[280px] flex flex-col items-center justify-center text-center transition-all">
          <div className="text-xs font-medium text-gray-400 uppercase mb-4">
            {current.type === 'vocab' ? '📖 Vocabulary' : current.type === 'kanji' ? '🔠 Kanji' : '📝 Grammar'}
          </div>

          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-3">{current.front}</div>

          {current.reading && !flipped && (
            <button onClick={e => { e.stopPropagation(); speak(current.reading!) }}
              className="flex items-center gap-1 text-brand-indigo text-sm mt-2 hover:opacity-80">
              <Volume2 size={16}/> Hear it
            </button>
          )}

          {!flipped && (
            <p className="text-gray-400 text-sm mt-6 animate-pulse">Tap to reveal</p>
          )}

          {flipped && (
            <div className="animate-fade-in">
              {current.reading && (
                <div className="text-gray-500 dark:text-gray-400 mb-1">{current.reading}</div>
              )}
              <div className="text-2xl font-bold text-brand-indigo mb-3">{current.back}</div>
              {current.example && (
                <div className="text-sm text-gray-500 italic bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2">
                  {current.example}
                  <button onClick={e => { e.stopPropagation(); speak(current.example!) }}
                    className="ml-2 text-brand-indigo hover:opacity-80 inline-flex items-center">
                    <Volume2 size={12}/>
                  </button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Answer buttons */}
      {flipped ? (
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleAnswer(false)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl font-bold text-lg hover:bg-red-100 transition-colors border-2 border-red-200 dark:border-red-800">
            <XCircle size={22}/> Got it wrong
          </button>
          <button onClick={() => handleAnswer(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-2xl font-bold text-lg hover:bg-green-100 transition-colors border-2 border-green-200 dark:border-green-800">
            <CheckCircle size={22}/> Got it right
          </button>
        </div>
      ) : (
        <button onClick={() => setFlipped(true)}
          className="w-full py-4 bg-brand-indigo text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity">
          Show Answer
        </button>
      )}
    </div>
  )
}
