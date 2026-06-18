'use client'
import { useState, useMemo } from 'react'
import { vocabData } from '@/data/vocab'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useProgress } from '@/store/progress'
import { Search, Volume2, BookmarkPlus, BookmarkCheck, ChevronRight, Filter } from 'lucide-react'

type JLPTFilter = 'All' | 'N5' | 'N4'
type ViewMode = 'list' | 'flashcard' | 'quiz'

function playAudio(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.85
    window.speechSynthesis.speak(u)
  }
}

const categories = ['All', 'Greetings', 'Family', 'Food', 'Time', 'Locations', 'Verbs', 'Adjectives', 'School', 'Work', 'Weather', 'Numbers', 'Common', 'Shopping', 'Travel', 'Health']

export default function VocabPage() {
  const { progress, markVocabLearned } = useProgress()
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState<JLPTFilter>('All')
  const [cat, setCat] = useState('All')
  const [view, setView] = useState<ViewMode>('list')
  const [saved, setSaved] = useState<string[]>([])
  const [cardIdx, setCardIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const filtered = useMemo(() =>
    vocabData.filter(v =>
      (level === 'All' || v.level === level) &&
      (cat === 'All' || v.category === cat) &&
      (search === '' || v.japanese.includes(search) || v.english.toLowerCase().includes(search.toLowerCase()) || v.romaji.toLowerCase().includes(search.toLowerCase()))
    ), [level, cat, search])

  const toggleSaved = (id: string) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <Badge label="N5 & N4" variant="level" className="mb-2" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Vocabulary</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{vocabData.length} words across N5 and N4. Filter by level, browse by category, or use flashcards.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Japanese, English, or romaji..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-indigo/20" />
        </div>
        <div className="flex gap-2">
          {(['All','N5','N4'] as JLPTFilter[]).map(l => (
            <Button key={l} variant={level === l ? 'primary' : 'secondary'} size="sm" onClick={() => setLevel(l)}>{l}</Button>
          ))}
        </div>
        <div className="flex gap-2">
          {(['list','flashcard'] as ViewMode[]).map(m => (
            <Button key={m} variant={view === m ? 'primary' : 'secondary'} size="sm" onClick={() => { setView(m); setCardIdx(0); setRevealed(false) }}>
              {m === 'list' ? 'List' : 'Flashcards'}
            </Button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${cat === c ? 'bg-brand-indigo text-white border-brand-indigo' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-indigo hover:text-brand-indigo dark:hover:text-indigo-400'}`}>{c}</button>
        ))}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{filtered.length} words found</p>

      {/* ── LIST VIEW ── */}
      {view === 'list' && (
        <div className="space-y-3">
          {filtered.map(v => (
            <Card key={v.id} hover className="group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-[60px]">
                    <div className="jp text-2xl font-bold text-gray-900 dark:text-white">{v.japanese}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">{v.romaji}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">{v.english}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge label={v.level} variant="level" />
                      <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{v.category}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="jp">{v.exampleJp}</span>
                      <div className="text-xs mt-0.5 text-gray-400 dark:text-gray-500">{v.exampleEn}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => playAudio(v.japanese)} className="p-1.5 rounded-lg text-gray-400 hover:text-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                    <Volume2 size={16} />
                  </button>
                  <button onClick={() => toggleSaved(v.id)} className={`p-1.5 rounded-lg transition-colors ${saved.includes(v.id) ? 'text-brand-indigo' : 'text-gray-400 hover:text-brand-indigo'}`}>
                    {saved.includes(v.id) ? <BookmarkCheck size={16} /> : <BookmarkPlus size={16} />}
                  </button>
                  {!progress.vocabLearned.includes(v.id) && (
                    <button onClick={() => markVocabLearned(v.id)} className="text-xs text-green-600 dark:text-green-400 hover:underline font-medium">Mark learned</button>
                  )}
                  {progress.vocabLearned.includes(v.id) && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓ Learned</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── FLASHCARD VIEW ── */}
      {view === 'flashcard' && filtered.length > 0 && (() => {
        const v = filtered[cardIdx % filtered.length]
        return (
          <div className="max-w-md mx-auto">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">{(cardIdx % filtered.length) + 1} / {filtered.length}</div>
            <Card className="text-center p-10 cursor-pointer min-h-[260px] flex flex-col justify-center" onClick={() => setRevealed(!revealed)}>
              <div className="jp text-5xl font-bold text-gray-900 dark:text-white mb-2">{v.japanese}</div>
              <div className="text-gray-400 dark:text-gray-500 text-sm mb-4">{v.romaji}</div>
              {revealed ? (
                <div className="animate-fade-in">
                  <div className="text-xl font-bold text-brand-indigo mb-3">{v.english}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 jp">{v.exampleJp}</div>
                  <div className="text-xs text-gray-400 mt-1">{v.exampleEn}</div>
                </div>
              ) : (
                <p className="text-sm text-gray-400">Tap to reveal translation</p>
              )}
            </Card>
            <div className="flex gap-3 mt-4 justify-center">
              <Button variant="secondary" size="sm" onClick={() => { setCardIdx(i => Math.max(0, i - 1)); setRevealed(false) }}>← Back</Button>
              <Button size="sm" onClick={() => playAudio(v.japanese)}><Volume2 size={14} /></Button>
              <Button variant="secondary" size="sm" onClick={() => { setCardIdx(i => i + 1); setRevealed(false) }}>Next →</Button>
            </div>
            {!progress.vocabLearned.includes(v.id) && (
              <div className="text-center mt-3">
                <Button size="sm" variant="ghost" onClick={() => markVocabLearned(v.id)} className="text-green-600 dark:text-green-400">
                  ✓ Mark as Learned
                </Button>
              </div>
            )}
          </div>
        )
      })()}
    </div>
  )
}
