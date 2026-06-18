'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { vocabData } from '@/data/vocab'
import { useProgress } from '@/store/progress'
import type { VocabWord } from '@/types'

// ── helpers ──────────────────────────────────────────────────────────────────
function speakJapanese(text: string, rate = 1) {
  if (typeof window === 'undefined') return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'
  u.rate = rate
  window.speechSynthesis.speak(u)
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

// ── Cat Mascot ────────────────────────────────────────────────────────────────
type CatMood = 'idle' | 'happy' | 'sad' | 'excited' | 'thinking'

function CatMascot({ mood = 'idle' }: { mood?: CatMood }) {
  const expressions: Record<CatMood, { eyes: string; mouth: string; tail: string; msg: string }> = {
    idle:     { eyes: '◕ ◕', mouth: 'ω', tail: '~',  msg: 'Let\'s learn Japanese!' },
    happy:    { eyes: '＾ ＾', mouth: '∇', tail: '≈',  msg: 'Correct! Nyan~!' },
    sad:      { eyes: '× ×', mouth: 'ε', tail: '.',  msg: 'Oops! Try again!' },
    excited:  { eyes: '★ ★', mouth: '▽', tail: '≋',  msg: 'You\'re on fire! 🔥' },
    thinking: { eyes: '- ◕', mouth: '3', tail: '?',  msg: 'Hmm, think carefully...' },
  }
  const e = expressions[mood]
  const tailAnim = mood === 'happy' || mood === 'excited' ? 'animate-bounce' : ''

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative">
        {/* Body */}
        <div className="w-20 h-16 bg-gradient-to-b from-purple-300 to-purple-400 dark:from-purple-600 dark:to-purple-700 rounded-3xl flex items-center justify-center shadow-lg relative">
          {/* Ears */}
          <div className="absolute -top-4 left-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-l-transparent border-r-transparent border-b-purple-400 dark:border-b-purple-600" />
          <div className="absolute -top-4 right-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-l-transparent border-r-transparent border-b-purple-400 dark:border-b-purple-600" />
          {/* Inner ears */}
          <div className="absolute -top-3 left-2.5 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-pink-300" />
          <div className="absolute -top-3 right-2.5 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-pink-300" />
          {/* Face */}
          <div className="text-center">
            <div className="text-xs font-bold text-white leading-tight">{e.eyes}</div>
            <div className="text-xs text-white">{e.mouth}</div>
          </div>
          {/* Whiskers */}
          <div className="absolute left-0 top-7 flex flex-col gap-0.5 -translate-x-2">
            <div className="w-3 h-px bg-white/70" />
            <div className="w-4 h-px bg-white/70" />
            <div className="w-3 h-px bg-white/70" />
          </div>
          <div className="absolute right-0 top-7 flex flex-col gap-0.5 translate-x-2">
            <div className="w-3 h-px bg-white/70" />
            <div className="w-4 h-px bg-white/70" />
            <div className="w-3 h-px bg-white/70" />
          </div>
        </div>
        {/* Tail */}
        <div className={`absolute -bottom-2 -right-4 text-purple-400 dark:text-purple-500 font-bold text-lg ${tailAnim}`}>
          {e.tail}
        </div>
        {/* Paws */}
        <div className="flex justify-center gap-3 mt-1">
          <div className="w-5 h-3 bg-purple-300 dark:bg-purple-600 rounded-full" />
          <div className="w-5 h-3 bg-purple-300 dark:bg-purple-600 rounded-full" />
        </div>
      </div>
      {/* Speech bubble */}
      <div className="mt-3 bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-600 rounded-2xl px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 shadow relative">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-purple-300 dark:border-b-purple-600" />
        {e.msg}
      </div>
    </div>
  )
}

// ── Pronunciation breakdown ────────────────────────────────────────────────────
function PronunciationBreakdown({ word }: { word: VocabWord }) {
  const morae = word.romaji.split(/[-\s]/)
  const kanaChars = [...word.furigana]
  const chunks: string[] = []
  let kanaIdx = 0
  morae.forEach((m) => {
    const count = m.length <= 2 ? 1 : 2
    chunks.push(kanaChars.slice(kanaIdx, kanaIdx + count).join(''))
    kanaIdx += count
  })
  return (
    <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
      <p className="text-xs font-semibold text-purple-600 dark:text-purple-300 mb-2 uppercase tracking-wide">
        🔊 Pronunciation Guide
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        {morae.map((m, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">{chunks[i] || ''}</span>
            <span className="text-base font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-800 px-2 py-0.5 rounded">{m}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Full romaji: <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">{word.romaji}</span>
      </p>
      <button
        onClick={() => speakJapanese(word.japanese, 0.7)}
        className="mt-2 text-xs px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
      >
        🐢 Hear it slowly
      </button>
    </div>
  )
}

// ── Usage context panel ────────────────────────────────────────────────────────
function UsageContext({ word }: { word: VocabWord }) {
  const usageNotes: Record<string, string> = {
    Greetings:   'Used in everyday social interactions. Politeness level matters — formal versions are used with strangers and superiors.',
    Family:      'Japanese has separate words for your own family (humble) vs. someone else\'s family (honorific). These are the general/honorific forms.',
    Food:        'Common in restaurants, menus, and daily conversation. Often paired with ください (kudasai) to order.',
    Time:        'Essential for scheduling and daily planning. Combine with に (ni) to express "at [time]".',
    Numbers:     'Japanese has two counting systems — native Japanese and Sino-Japanese. Usage depends on what you are counting.',
    Locations:   'Used with に (ni) for destination ("going to") and で (de) for location of action ("doing at").',
    Verbs:       'Verbs go at the end of the sentence in Japanese. The ます (masu) form is polite; dictionary form is casual.',
    Adjectives:  'い-adjectives conjugate directly. な-adjectives need な before a noun and です after.',
    Weather:     'Common in small talk. Often used with です (desu) for a polite statement.',
    Animals:     'Often used with の (no) to describe something belonging to or related to the animal.',
    Colors:      'い-adjectives like 赤い (red) attach directly. Nouns like 白 need の (no) before a noun.',
    School:      'Common in academic settings. Combine with に行く (ni iku) to say you\'re going somewhere.',
    Work:        'Professional vocabulary — use polite ます form in workplace conversations.',
    Health:      'Use が痛い (ga itai) to say something hurts — e.g. 頭が痛い (atama ga itai = I have a headache).',
    Nature:      'Often used with が (ga) as the subject in descriptive sentences.',
    Transport:   'Pair with に乗る (ni noru = to ride/board) or で行く (de iku = to go by).',
    'Daily Life': 'Core vocabulary used in everyday household and routine contexts.',
    'Daily life': 'Core vocabulary used in everyday household and routine contexts.',
    Adverbs:     'Adverbs modify verbs and adjectives. Place them directly before what they modify.',
    Society:     'Used in discussions about social topics, community, and culture.',
    Shopping:    'Key phrases for stores — pair with いくら (ikura = how much) and ください (kudasai = please give me).',
    Travel:      'Use で (de) for transport method and まで (made) to indicate destination.',
    Seasons:     'Pair with に (ni) to say "in [season]" — 春に (haru ni = in spring).',
    Clothing:    'Use を着る (wo kiru) for upper body clothing and をはく (wo haku) for lower body/shoes.',
  }
  const note = usageNotes[word.category] || 'Pay attention to the particle used with this word in example sentences.'
  return (
    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
      <p className="text-xs font-semibold text-blue-600 dark:text-blue-300 mb-1 uppercase tracking-wide">
        💡 When to Use It
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{note}</p>
      {word.exampleJp && (
        <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg p-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{word.exampleJp}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{word.exampleEn}</p>
          <button
            onClick={() => speakJapanese(word.exampleJp)}
            className="mt-1 text-xs text-blue-500 hover:text-blue-700"
          >
            🔊 Hear example
          </button>
        </div>
      )}
    </div>
  )
}

// ── Units ─────────────────────────────────────────────────────────────────────
const UNITS = [
  { id: 'u01', level: 'N5', title: 'Greetings',        emoji: '👋', category: 'Greetings' },
  { id: 'u02', level: 'N5', title: 'Numbers',          emoji: '🔢', category: 'Numbers' },
  { id: 'u03', level: 'N5', title: 'Family',           emoji: '👨‍👩‍👧', category: 'Family' },
  { id: 'u04', level: 'N5', title: 'Food & Drink',     emoji: '🍱', category: 'Food' },
  { id: 'u05', level: 'N5', title: 'Time & Dates',     emoji: '🕐', category: 'Time' },
  { id: 'u06', level: 'N5', title: 'Locations',        emoji: '📍', category: 'Locations' },
  { id: 'u07', level: 'N5', title: 'Weather',          emoji: '🌤', category: 'Weather' },
  { id: 'u08', level: 'N5', title: 'Adjectives',       emoji: '✨', category: 'Adjectives' },
  { id: 'u09', level: 'N5', title: 'Verbs',            emoji: '🏃', category: 'Verbs' },
  { id: 'u10', level: 'N5', title: 'Common Words',     emoji: '💬', category: 'Common' },
  { id: 'u11', level: 'N4', title: 'Daily Life',       emoji: '🏠', category: 'Daily Life' },
  { id: 'u12', level: 'N4', title: 'School & Work',    emoji: '📚', category: 'School' },
  { id: 'u13', level: 'N4', title: 'N4 Verbs',         emoji: '⚡', category: 'Verbs' },
  { id: 'u14', level: 'N4', title: 'N4 Adjectives',    emoji: '🎨', category: 'Adjectives' },
  { id: 'u15', level: 'N4', title: 'Society & Travel', emoji: '🌏', category: 'Travel' },
] as const

type UnitId = typeof UNITS[number]['id']

interface QuizQ {
  word: VocabWord
  options: string[]
  correct: number
  type: 'jp→en' | 'en→jp' | 'romaji'
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LessonsPage() {
  const { progress, markLessonComplete, addStudyMinutes, addQuizScore } = useProgress()
  const [screen, setScreen]           = useState<'map' | 'intro' | 'flashcard' | 'quiz' | 'result'>('map')
  const [activeUnit, setActiveUnit]   = useState<typeof UNITS[number] | null>(null)
  const [words, setWords]             = useState<VocabWord[]>([])
  const [cardIdx, setCardIdx]         = useState(0)
  const [showBack, setShowBack]       = useState(false)
  const [showPronunciation, setShowPronunciation] = useState(false)
  const [showUsage, setShowUsage]     = useState(false)
  const [quizQs, setQuizQs]           = useState<QuizQ[]>([])
  const [qIdx, setQIdx]               = useState(0)
  const [selected, setSelected]       = useState<number | null>(null)
  const [hearts, setHearts]           = useState(3)
  const [xpEarned, setXpEarned]       = useState(0)
  const [streak, setStreak]           = useState(0)
  const [correct, setCorrect]         = useState(0)
  const [toast, setToast]             = useState('')
  const [catMood, setCatMood]         = useState<CatMood>('idle')

  const n5Done = UNITS.filter(u => u.level === 'N5').every(u => progress.lessonsCompleted.includes(u.id))

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function triggerCatMood(mood: CatMood, duration = 2000) {
    setCatMood(mood)
    setTimeout(() => setCatMood('idle'), duration)
  }

  function startUnit(unit: typeof UNITS[number]) {
    const w = vocabData.filter(v => v.category === unit.category).slice(0, 12)
    setWords(w)
    setActiveUnit(unit)
    setCardIdx(0)
    setShowBack(false)
    setShowPronunciation(false)
    setShowUsage(false)
    setCatMood('excited')
    setScreen('intro')
  }

  function startFlashcards() {
    setCardIdx(0)
    setShowBack(false)
    setShowPronunciation(false)
    setShowUsage(false)
    setCatMood('thinking')
    setScreen('flashcard')
  }

  function nextCard() {
    if (cardIdx < words.length - 1) {
      setCardIdx(cardIdx + 1)
      setShowBack(false)
      setShowPronunciation(false)
      setShowUsage(false)
      setCatMood('thinking')
    } else {
      buildQuiz()
    }
  }

  function buildQuiz() {
    const allEnglish = vocabData.map(v => v.english)
    const allJapanese = vocabData.map(v => v.japanese)
    const allRomaji = vocabData.map(v => v.romaji)

    const qs: QuizQ[] = words.slice(0, 8).map((w, i) => {
      const type: QuizQ['type'] = i % 3 === 0 ? 'romaji' : i % 2 === 0 ? 'en→jp' : 'jp→en'

      if (type === 'jp→en') {
        // show English options, ask what does Japanese mean
        const wrongPool = shuffle(allEnglish.filter(e => e !== w.english)).slice(0, 3)
        const options = shuffle([w.english, ...wrongPool])
        return { word: w, options, correct: options.indexOf(w.english), type }
      } else if (type === 'en→jp') {
        // show Japanese options, ask which is the Japanese for English word
        const wrongPool = shuffle(allJapanese.filter(j => j !== w.japanese)).slice(0, 3)
        const options = shuffle([w.japanese, ...wrongPool])
        return { word: w, options, correct: options.indexOf(w.japanese), type }
      } else {
        // romaji — show romaji options, ask what is the romaji for Japanese word
        const wrongPool = shuffle(allRomaji.filter(r => r !== w.romaji)).slice(0, 3)
        const options = shuffle([w.romaji, ...wrongPool])
        return { word: w, options, correct: options.indexOf(w.romaji), type }
      }
    })

    setQuizQs(qs)
    setQIdx(0)
    setSelected(null)
    setHearts(3)
    setXpEarned(0)
    setStreak(0)
    setCorrect(0)
    setCatMood('thinking')
    setScreen('quiz')
  }

  function handleAnswer(idx: number) {
    if (selected !== null) return   // already answered this question
    setSelected(idx)
    const q = quizQs[qIdx]
    const isCorrect = idx === q.correct

    if (isCorrect) {
      const newStreak = streak + 1
      setStreak(newStreak)
      setCorrect(c => c + 1)
      let xp = 10
      if (newStreak % 3 === 0) {
        xp += 10
        showToast(`🔥 ${newStreak} streak! +20 XP bonus!`)
        triggerCatMood('excited', 2500)
      } else {
        triggerCatMood('happy', 1500)
      }
      setXpEarned(x => x + xp)
      addStudyMinutes(1)
    } else {
      setStreak(0)
      setHearts(h => h - 1)
      triggerCatMood('sad', 1500)
    }

    setTimeout(() => {
      const remainingHearts = hearts - (isCorrect ? 0 : 1)
      if (remainingHearts <= 0) {
        setScreen('result')
        return
      }
      if (qIdx < quizQs.length - 1) {
        setSelected(null)
        setCatMood('thinking')
        setQIdx(i => i + 1)
      } else {
        if (activeUnit) markLessonComplete(activeUnit.id)
        setScreen('result')
      }
    }, 1400)
  }

  // ── MAP ──────────────────────────────────────────────────────────────────────
  if (screen === 'map') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {toast && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 font-bold px-6 py-2 rounded-full shadow-lg z-50 animate-bounce">
              {toast}
            </div>
          )}

          {/* Cat mascot at top of map */}
          <div className="flex flex-col items-center mb-8">
            <CatMascot mood="idle" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-1">Lessons</h1>
            <p className="text-gray-500 dark:text-gray-400">Complete units to unlock the next level</p>
          </div>

          <div className="space-y-3">
            {UNITS.map((unit, i) => {
              const done    = progress.lessonsCompleted.includes(unit.id)
              const locked  = unit.level === 'N4' && !n5Done
              const available = !locked

              return (
                <Card
                  key={unit.id}
                  className={`flex items-center gap-4 p-4 transition-all ${
                    locked
                      ? 'opacity-40 cursor-not-allowed'
                      : done
                      ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/10 cursor-pointer hover:shadow-md'
                      : 'cursor-pointer hover:shadow-md hover:border-purple-400'
                  }`}
                  onClick={() => available && startUnit(unit)}
                >
                  <span className="text-3xl">{unit.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">{unit.title}</span>
                      <Badge label={unit.level} variant={unit.level === 'N5' ? 'default' : 'warning'} className="text-xs" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {vocabData.filter(v => v.category === unit.category).length} words
                    </p>
                  </div>
                  <span className="text-xl">
                    {locked ? '🔒' : done ? '✅' : '▶'}
                  </span>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ── INTRO ────────────────────────────────────────────────────────────────────
  if (screen === 'intro' && activeUnit) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-lg mx-auto px-4 py-12 flex flex-col items-center text-center gap-6">
          <CatMascot mood="excited" />
          <span className="text-6xl">{activeUnit.emoji}</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{activeUnit.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {words.length} words to learn · flashcards then a quiz
          </p>
          <div className="flex gap-3 w-full">
            <Button variant="secondary" className="flex-1" onClick={() => setScreen('map')}>← Back</Button>
            <Button className="flex-1" onClick={startFlashcards}>Start Lesson →</Button>
          </div>
        </div>
      </div>
    )
  }

  // ── FLASHCARD ────────────────────────────────────────────────────────────────
  if (screen === 'flashcard' && words.length > 0) {
    const word = words[cardIdx]
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setScreen('map')} className="text-gray-400 hover:text-gray-600 text-sm">← Back</button>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${((cardIdx + 1) / words.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{cardIdx + 1}/{words.length}</span>
          </div>

          {/* Cat mascot */}
          <div className="flex justify-center mb-4">
            <CatMascot mood={catMood} />
          </div>

          <Card className="p-6 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
              {word.category} · {word.level}
            </p>

            {/* Japanese word — always visible */}
            <div
              className="text-5xl font-bold text-gray-900 dark:text-white mb-2 cursor-pointer"
              onClick={() => speakJapanese(word.japanese)}
              title="Click to hear"
            >
              {word.japanese}
            </div>
            <p className="text-gray-400 text-sm mb-1">{word.furigana}</p>
            <button
              onClick={() => speakJapanese(word.japanese)}
              className="text-purple-500 hover:text-purple-700 text-sm mb-4"
            >
              🔊 Hear it
            </button>

            {/* Answer hidden until revealed */}
            {!showBack ? (
              <Button onClick={() => { setShowBack(true); triggerCatMood('happy', 1200) }} variant="secondary" className="w-full">
                Show meaning
              </Button>
            ) : (
              <div className="w-full text-left space-y-1">
                <p className="text-2xl font-bold text-center text-purple-700 dark:text-purple-300 mb-1">
                  {word.english}
                </p>
                <p className="text-center text-sm text-gray-500">{word.romaji}</p>

                {/* Toggle buttons */}
                <div className="flex gap-2 mt-3 justify-center">
                  <button
                    onClick={() => setShowPronunciation(p => !p)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      showPronunciation
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-purple-300 text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    📖 Pronunciation
                  </button>
                  <button
                    onClick={() => setShowUsage(u => !u)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      showUsage
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    💡 Usage
                  </button>
                </div>

                {showPronunciation && <PronunciationBreakdown word={word} />}
                {showUsage && <UsageContext word={word} />}
              </div>
            )}
          </Card>

          {showBack && (
            <Button onClick={nextCard} className="w-full mt-4">
              {cardIdx < words.length - 1 ? 'Next word →' : 'Start Quiz →'}
            </Button>
          )}
        </div>
      </div>
    )
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────────
  if (screen === 'quiz' && quizQs.length > 0) {
    const q = quizQs[qIdx]
    const progress_pct = Math.round(((qIdx + 1) / quizQs.length) * 100)

    const prompt =
      q.type === 'jp→en' ? `What does "${q.word.japanese}" mean?` :
      q.type === 'en→jp' ? `Which is the Japanese word for "${q.word.english}"?` :
                            `What is the romaji for "${q.word.japanese}"?`

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-lg mx-auto px-4 py-6">
          {toast && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 font-bold px-6 py-2 rounded-full shadow-lg z-50">
              {toast}
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="text-lg">{i < hearts ? '❤️' : '🖤'}</span>
              ))}
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${progress_pct}%` }} />
              </div>
            </div>
            <span className="text-sm font-bold text-yellow-500">⚡ {xpEarned} XP</span>
          </div>

          {/* Cat mascot */}
          <div className="flex justify-center mb-4">
            <CatMascot mood={catMood} />
          </div>

          <Card className="p-6">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              {q.type === 'jp→en' ? 'Translate to English' : q.type === 'en→jp' ? 'Translate to Japanese' : 'Romaji'}
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">{prompt}</p>

            {/* Audio button for jp→en and romaji */}
            {(q.type === 'jp→en' || q.type === 'romaji') && (
              <button
                onClick={() => speakJapanese(q.word.japanese)}
                className="text-sm text-purple-500 hover:text-purple-700 mb-4 block"
              >
                🔊 Hear word
              </button>
            )}

            <div className="grid grid-cols-1 gap-2 mt-4">
              {q.options.map((opt, i) => {
                // Only apply colour AFTER the user has selected an answer
                let cls = 'p-3 rounded-xl border-2 text-left font-medium transition-all '
                if (selected === null) {
                  // No answer yet — all neutral + hoverable
                  cls += 'border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer'
                } else if (i === q.correct) {
                  // Always highlight the correct answer after submission
                  cls += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                } else if (i === selected) {
                  // Highlight the wrong answer the user picked
                  cls += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                } else {
                  cls += 'border-gray-200 dark:border-gray-600 opacity-50'
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* After answer — show pronunciation + usage */}
            {selected !== null && (
              <div className="mt-4 space-y-2">
                <PronunciationBreakdown word={q.word} />
                <UsageContext word={q.word} />
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }

  // ── RESULT ────────────────────────────────────────────────────────────────────
  if (screen === 'result' && activeUnit) {
    const accuracy = Math.round((correct / quizQs.length) * 100)
    const resultMood: CatMood = accuracy >= 80 ? 'excited' : accuracy >= 50 ? 'happy' : 'sad'
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-lg mx-auto px-4 py-12 flex flex-col items-center text-center gap-4">
          <CatMascot mood={resultMood} />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {accuracy >= 80 ? 'Great job! 🎉' : accuracy >= 50 ? 'Good effort! 👍' : 'Keep practising! 💪'}
          </h1>
          <div className="grid grid-cols-3 gap-4 w-full mt-2">
            <Card className="p-4">
              <p className="text-2xl font-bold text-purple-600">⚡ {xpEarned}</p>
              <p className="text-xs text-gray-500 mt-1">XP Earned</p>
            </Card>
            <Card className="p-4">
              <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
              <p className="text-xs text-gray-500 mt-1">Accuracy</p>
            </Card>
            <Card className="p-4">
              <p className="text-2xl font-bold text-red-500">
                {[...Array(hearts)].map(() => '❤️').join('') || '💔'}
              </p>
              <p className="text-xs text-gray-500 mt-1">Hearts Left</p>
            </Card>
          </div>
          <div className="flex gap-3 w-full mt-4">
            <Button variant="secondary" className="flex-1" onClick={() => setScreen('map')}>← All Lessons</Button>
            <Button className="flex-1" onClick={() => startUnit(activeUnit)}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
