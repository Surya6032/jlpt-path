'use client'
import { useState } from 'react'
import { useProgress } from '@/store/progress'
import { vocabData } from '@/data/vocab'
import { kanjiData } from '@/data/kanji'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { RefreshCcw, Volume2, CheckCircle } from 'lucide-react'

function playAudio(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.85
    window.speechSynthesis.speak(u)
  }
}

export default function ReviewPage() {
  const { progress, markVocabLearned, markKanjiLearned } = useProgress()
  const [tab, setTab] = useState<'vocab' | 'kanji' | 'weak'>('vocab')
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const reviewVocab = vocabData.filter(v => progress.reviewQueue.includes(v.id) || !progress.vocabLearned.includes(v.id)).slice(0, 15)
  const reviewKanji = kanjiData.filter(k => progress.reviewQueue.includes(k.id) || !progress.kanjiLearned.includes(k.id)).slice(0, 10)
  const weakVocab = vocabData.filter(v => !progress.vocabLearned.includes(v.id)).slice(0, 10)

  const items = tab === 'vocab' ? reviewVocab : tab === 'kanji' ? reviewKanji : weakVocab
  const item = items[idx % Math.max(items.length, 1)]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          <RefreshCcw size={26} className="text-brand-indigo" /> Smart Review
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Daily review queue — items due for spaced repetition today.</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['vocab','kanji','weak'] as const).map(t => (
          <Button key={t} variant={tab === t ? 'primary' : 'secondary'} size="sm" onClick={() => { setTab(t); setIdx(0); setRevealed(false) }}>
            {t === 'vocab' ? `Vocabulary (${reviewVocab.length})` : t === 'kanji' ? `Kanji (${reviewKanji.length})` : `Weak Items (${weakVocab.length})`}
          </Button>
        ))}
      </div>

      {items.length === 0 ? (
        <Card className="text-center py-12">
          <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
          <h2 className="font-bold text-gray-900 dark:text-white mb-2">All reviewed!</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">You are all caught up. Come back tomorrow for more review items.</p>
        </Card>
      ) : (
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">{(idx % items.length) + 1} / {items.length}</div>
          <Card className="text-center p-10 min-h-[260px] flex flex-col justify-center cursor-pointer" onClick={() => setRevealed(!revealed)}>
            {'japanese' in item ? (
              <>
                <div className="jp text-5xl font-bold text-gray-900 dark:text-white mb-2">{(item as any).japanese}</div>
                <div className="text-gray-400 dark:text-gray-500 text-sm mb-4">{(item as any).romaji}</div>
                {revealed ? (
                  <div className="animate-fade-in">
                    <div className="text-xl font-bold text-brand-indigo mb-3">{(item as any).english}</div>
                    <Badge label={(item as any).level} variant="level" className="mb-2" />
                    <div className="text-sm text-gray-500 dark:text-gray-400 jp mt-2">{(item as any).exampleJp}</div>
                    <div className="text-xs text-gray-400 mt-1">{(item as any).exampleEn}</div>
                  </div>
                ) : <p className="text-sm text-gray-400">Tap to reveal</p>}
              </>
            ) : (
              <>
                <div className="jp text-7xl font-bold text-brand-indigo mb-2">{(item as any).kanji}</div>
                {revealed ? (
                  <div className="animate-fade-in">
                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">{(item as any).meaning}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{(item as any).onyomi} / {(item as any).kunyomi}</div>
                    <div className="jp text-sm mt-2">{(item as any).exampleWord} ({(item as any).exampleReading})</div>
                  </div>
                ) : <p className="text-sm text-gray-400">Tap to reveal meaning</p>}
              </>
            )}
          </Card>
          <div className="flex gap-3 mt-4 justify-center flex-wrap">
            <Button variant="secondary" size="sm" onClick={() => { setRevealed(false); setIdx(i => Math.max(0, i - 1)) }}>← Back</Button>
            {'japanese' in item && <Button size="sm" variant="secondary" onClick={() => playAudio((item as any).japanese)}><Volume2 size={14} /></Button>}
            {'japanese' in item && !progress.vocabLearned.includes(item.id) && (
              <Button size="sm" variant="ghost" className="text-green-600 dark:text-green-400" onClick={() => { markVocabLearned(item.id); setIdx(i => i + 1); setRevealed(false) }}>
                ✓ Got it
              </Button>
            )}
            {'kanji' in item && !progress.kanjiLearned.includes(item.id) && (
              <Button size="sm" variant="ghost" className="text-green-600 dark:text-green-400" onClick={() => { markKanjiLearned(item.id); setIdx(i => i + 1); setRevealed(false) }}>
                ✓ Got it
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={() => { setRevealed(false); setIdx(i => i + 1) }}>Next →</Button>
          </div>
        </div>
      )}
    </div>
  )
}
