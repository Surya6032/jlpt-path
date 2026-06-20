'use client'
import { useState, useEffect, useRef } from 'react'
import { useProgress } from '@/store/progress'
import { vocabData } from '@/data/vocab'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { BookOpen, Volume2, ChevronLeft, ChevronRight, Search, Star, RotateCcw, Check, X } from 'lucide-react'
import type { VocabWord } from '@/types'

type Mode = 'browse' | 'flashcard' | 'quiz'

const LEVELS = ['All', 'N5', 'N4'] as const
const categories = ['All', ...new Set(vocabData.map(v => v.category))]

function speak(text: string) {
  if (typeof window === 'undefined') return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'; u.rate = 0.85
  speechSynthesis.cancel(); speechSynthesis.speak(u)
}

function buildOptions(correct: VocabWord, all: VocabWord[]): string[] {
  const pool = all.filter(v => v.id !== correct.id)
  const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 3).map(v => v.english)
  const opts = [...shuffled, correct.english].sort(() => Math.random() - 0.5)
  return opts
}

export default function VocabularyPage() {
  const { progress, markVocabLearned, updateSRS, addXP, recordStudyDay } = useProgress()
  const [level, setLevel] = useState<'All'|'N5'|'N4'>('All')
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [mode, setMode] = useState<Mode>('browse')
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [showRomaji, setShowRomaji] = useState(false)
  const [selected, setSelected] = useState<string|null>(null)
  const [showMnemonic, setShowMnemonic] = useState(false)

  useEffect(() => { recordStudyDay() }, [])

  const filtered = vocabData.filter(v => {
    if (level !== 'All' && v.level !== level) return false
    if (cat !== 'All' && v.category !== cat) return false
    if (search && !v.japanese.includes(search) && !v.english.toLowerCase().includes(search.toLowerCase()) && !v.furigana.includes(search)) return false
    return true
  })

  const current = filtered[cardIdx] || filtered[0]
  const isLearned = current ? progress.vocabLearned.includes(current.id) : false
  const options = current ? buildOptions(current, filtered.length >= 4 ? filtered : vocabData) : []

  function nextCard() { setCardIdx(i => (i+1) % filtered.length); setFlipped(false); setShowMnemonic(false); setSelected(null) }
  function prevCard() { setCardIdx(i => (i-1+filtered.length) % filtered.length); setFlipped(false); setShowMnemonic(false); setSelected(null) }

  function handleQuizAnswer(opt: string) {
    if (selected) return
    setSelected(opt)
    const correct = opt === current.english
    updateSRS(current.id, correct)
    if (correct) { markVocabLearned(current.id); addXP(5) }
    setTimeout(() => { nextCard() }, 1300)
  }

  const learnedCount = filtered.filter(v => progress.vocabLearned.includes(v.id)).length

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen size={28} className="text-brand-indigo"/> Vocabulary
          </h1>
          <p className="text-gray-500 mt-1">{filtered.length} words · {learnedCount} learned</p>
        </div>
        <div className="flex gap-2">
          {(['browse','flashcard','quiz'] as Mode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); setCardIdx(0); setFlipped(false); setSelected(null) }}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors
                ${mode===m ? 'bg-brand-indigo text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input value={search} onChange={e => { setSearch(e.target.value); setCardIdx(0) }}
            placeholder="Search words..."
            className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-indigo"/>
        </div>
        <div className="flex gap-1">
          {LEVELS.map(l => (
            <button key={l} onClick={() => { setLevel(l); setCardIdx(0) }}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors
                ${level===l ? 'bg-brand-indigo text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
              {l}
            </button>
          ))}
        </div>
        <select value={cat} onChange={e => { setCat(e.target.value); setCardIdx(0) }}
          className="px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <ProgressBar value={learnedCount} max={filtered.length || 1} showPercent={false}/>
      <p className="text-xs text-gray-400 mt-1 mb-6">{learnedCount}/{filtered.length} learned in this filter</p>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">No words match your filters.</div>
      )}

      {/* BROWSE MODE */}
      {mode === 'browse' && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(word => {
            const learned = progress.vocabLearned.includes(word.id)
            return (
              <Card key={word.id} className={`relative transition-all ${learned ? 'border-green-200 dark:border-green-800' : ''}`}>
                {learned && <div className="absolute top-3 right-3 text-green-500 text-xs font-bold">✓</div>}
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{word.japanese}</div>
                <div className="text-sm text-gray-500 mb-1">{word.furigana}</div>
                <div className="text-xs text-gray-400 mb-2">{word.romaji}</div>
                <div className="font-semibold text-brand-indigo mb-2">{word.english}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge>{word.level}</Badge>
                  <span className="text-xs text-gray-400">{word.category}</span>
                  <button onClick={() => speak(word.furigana)} className="ml-auto text-gray-400 hover:text-brand-indigo">
                    <Volume2 size={16}/>
                  </button>
                </div>
                {word.example && (
                  <div className="mt-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
                    {word.example}<br/><span className="text-gray-400">{word.exampleEn}</span>
                  </div>
                )}
                {!learned && (
                  <button onClick={() => { markVocabLearned(word.id); addXP(3) }}
                    className="mt-3 w-full text-xs py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-brand-indigo rounded-lg hover:bg-indigo-100 font-medium">
                    Mark as Learned ✓
                  </button>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* FLASHCARD MODE */}
      {mode === 'flashcard' && filtered.length > 0 && current && (
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <span>{cardIdx+1} / {filtered.length}</span>
            <div className="flex gap-2">
              <button onClick={() => setShowRomaji(r => !r)}
                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium hover:bg-gray-200 transition-colors">
                {showRomaji ? 'Hide' : 'Show'} Romaji
              </button>
            </div>
          </div>

          <div className="cursor-pointer" onClick={() => setFlipped(f => !f)}>
            <Card className="min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="text-xs font-medium text-gray-400 uppercase mb-4">{current.category} · {current.level}</div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">{current.japanese}</div>
              <div className="text-lg text-gray-500 mb-1">{current.furigana}</div>
              {showRomaji && <div className="text-sm text-gray-400 mb-2">{current.romaji}</div>}
              <button onClick={e => { e.stopPropagation(); speak(current.furigana) }}
                className="flex items-center gap-1 text-brand-indigo text-sm mt-2 hover:opacity-80">
                <Volume2 size={16}/> Hear it
              </button>

              {flipped && (
                <div className="mt-4 animate-fade-in w-full">
                  <div className="text-2xl font-bold text-brand-indigo mb-3">{current.english}</div>
                  {current.example && (
                    <div className="text-sm text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
                      <div>{current.example}</div>
                      <div className="text-gray-400 mt-1">{current.exampleEn}</div>
                      <button onClick={e => { e.stopPropagation(); speak(current.example!) }}
                        className="text-brand-indigo mt-1 hover:opacity-80 inline-flex items-center gap-1 text-xs">
                        <Volume2 size={12}/> Hear example
                      </button>
                    </div>
                  )}
                  {current.mnemonic && (
                    <div className="mt-3 text-xs text-purple-600 bg-purple-50 dark:bg-purple-900/20 rounded-xl px-4 py-2">
                      💡 {current.mnemonic}
                    </div>
                  )}
                </div>
              )}

              {!flipped && <p className="text-gray-400 text-sm mt-6 animate-pulse">Tap to reveal meaning</p>}
            </Card>
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={prevCard} className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 transition-colors">
              <ChevronLeft size={18}/> Prev
            </button>
            {flipped && !isLearned && (
              <button onClick={() => { markVocabLearned(current.id); addXP(5); nextCard() }}
                className="flex-1 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                <Check size={18}/> Learned!
              </button>
            )}
            {flipped && isLearned && (
              <div className="flex-1 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl font-medium text-center">
                ✓ Learned
              </div>
            )}
            <button onClick={nextCard} className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 transition-colors">
              Next <ChevronRight size={18}/>
            </button>
          </div>
        </div>
      )}

      {/* QUIZ MODE */}
      {mode === 'quiz' && filtered.length >= 4 && current && (
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <span>{cardIdx+1} / {filtered.length}</span>
            <span className="text-green-500 font-medium">{learnedCount} learned ✓</span>
          </div>

          <Card className="mb-4 text-center">
            <div className="text-xs text-gray-400 uppercase mb-3">{current.category} · {current.level}</div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{current.japanese}</div>
            <div className="text-gray-500">{current.furigana}</div>
            <button onClick={() => speak(current.furigana)} className="mt-2 text-brand-indigo flex items-center gap-1 mx-auto text-sm hover:opacity-80">
              <Volume2 size={16}/> Hear it
            </button>
            <div className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">What does this mean?</div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {options.map(opt => {
              const isCorrect = opt === current.english
              let cls = 'border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:border-brand-indigo'
              if (selected) {
                if (opt === selected && isCorrect) cls = 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700'
                else if (opt === selected && !isCorrect) cls = 'border-2 border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700'
                else if (isCorrect) cls = 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700'
                else cls = 'border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400'
              }
              return (
                <button key={opt} onClick={() => handleQuizAnswer(opt)}
                  disabled={!!selected}
                  className={`p-4 rounded-2xl font-medium text-sm transition-all text-left ${cls}`}>
                  {selected && isCorrect && <span className="mr-1">✓</span>}
                  {selected && opt === selected && !isCorrect && <span className="mr-1">✗</span>}
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      )}
      {mode === 'quiz' && filtered.length < 4 && (
        <div className="text-center text-gray-400 py-10">Need at least 4 words in your filter for quiz mode.</div>
      )}
    </div>
  )
}
