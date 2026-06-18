'use client'

import { useState, useEffect, useRef } from 'react'
import AppLayout from '@/components/layout/AppLayout'
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

// ── Pronunciation breakdown ───────────────────────────────────────────────────
function PronunciationBreakdown({ word }: { word: VocabWord }) {
  const morae = word.romaji.split(/[-\s]/)
  const kanaChars = [...word.furigana]

  // Group kana into morae-sized chunks (approximate)
  const chunks: string[] = []
  let kanaIdx = 0
  morae.forEach((m) => {
    // each romaji mora is 1-3 chars → map to 1 kana roughly
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

// ── Usage context panel ───────────────────────────────────────────────────────
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
    Weather:     'Common in small talk. Often used with です (desu) for a simple statement.',
    School:      'Useful in academic settings. Pair with で (de) to say where you study.',
    Work:        'Business Japanese often uses more formal/polite language. These words appear in N4 business contexts.',
    Travel:      'Essential for navigating Japan. Pair with はどこですか (wa doko desu ka) to ask where something is.',
    Health:      'Used at clinics or when describing symptoms. Pair with が痛い (ga itai) to say something hurts.',
    Nature:      'Often appear in reading passages and poetry. Common in weather/season descriptions.',
    Animals:     'Appear in everyday conversation and reading passages. の (no) connects them as modifiers.',
    Colors:      'い-colors (あかい、あおい) work like い-adjectives. の-colors (オレンジの) need の before a noun.',
    Transport:   'Use で (de) to say you travel "by" a vehicle. Pair with に乗る (ni noru) meaning "to ride".',
    Shopping:    'Pair with いくらですか (ikura desu ka) meaning "how much is it?" Very common in stores.',
    'Daily Life':'Core vocabulary for describing your routine. Combine with 毎日 (mainichi = every day) for habits.',
    Adverbs:     'Adverbs modify verbs or adjectives. Place them directly before what they modify.',
    Society:     'Formal vocabulary appearing in reading passages, news, and N4 written material.',
  }

  const note = usageNotes[word.category] ?? 'Commonly used in everyday Japanese conversation and reading.'

  return (
    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
      <p className="text-xs font-semibold text-blue-600 dark:text-blue-300 mb-1 uppercase tracking-wide">
        💡 When to Use It
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{note}</p>
      <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-800">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{word.exampleJp}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{word.exampleEn}</p>
        <button
          onClick={() => speakJapanese(word.exampleJp)}
          className="mt-1 text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full hover:bg-blue-200 transition-colors"
        >
          🔊 Hear example
        </button>
      </div>
    </div>
  )
}

// ── Lesson units config ───────────────────────────────────────────────────────
const UNITS = [
  { id: 'u01', title: 'Greetings',       level: 'N5', icon: '👋', category: 'Greetings' },
  { id: 'u02', title: 'Family',          level: 'N5', icon: '👨‍👩‍👧', category: 'Family' },
  { id: 'u03', title: 'Numbers & Time',  level: 'N5', icon: '🕐', category: 'Time' },
  { id: 'u04', title: 'Food & Drink',    level: 'N5', icon: '🍜', category: 'Food' },
  { id: 'u05', title: 'Locations',       level: 'N5', icon: '📍', category: 'Locations' },
  { id: 'u06', title: 'Weather',         level: 'N5', icon: '⛅', category: 'Weather' },
  { id: 'u07', title: 'School',          level: 'N5', icon: '🏫', category: 'School' },
  { id: 'u08', title: 'Verbs (N5)',      level: 'N5', icon: '🏃', category: 'Verbs' },
  { id: 'u09', title: 'Adjectives (N5)', level: 'N5', icon: '🎨', category: 'Adjectives' },
  { id: 'u10', title: 'Animals & Nature',level: 'N5', icon: '🐾', category: 'Animals' },
  { id: 'u11', title: 'Daily Life',      level: 'N4', icon: '🏠', category: 'Daily Life' },
  { id: 'u12', title: 'Work & Society',  level: 'N4', icon: '💼', category: 'Work' },
  { id: 'u13', title: 'Travel',          level: 'N4', icon: '✈️', category: 'Travel' },
  { id: 'u14', title: 'Health',          level: 'N4', icon: '🏥', category: 'Health' },
  { id: 'u15', title: 'Adverbs',         level: 'N4', icon: '⚡', category: 'Adverbs' },
]

type Screen = 'map' | 'intro' | 'flashcard' | 'quiz' | 'result'

interface QuizQ {
  word: VocabWord
  options: string[]
  correct: number
  type: 'en→jp' | 'jp→en' | 'romaji'
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function LessonsPage() {
  const { progress, completeLesson, addXP } = useProgress()
  const [screen, setScreen] = useState<Screen>('map')
  const [activeUnit, setActiveUnit] = useState<typeof UNITS[0] | null>(null)
  const [words, setWords] = useState<VocabWord[]>([])
  const [cardIdx, setCardIdx] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const [showPronunciation, setShowPronunciation] = useState(false)
  const [showUsage, setShowUsage] = useState(false)
  const [quizQs, setQuizQs] = useState<QuizQ[]>([])
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [hearts, setHearts] = useState(3)
  const [xpEarned, setXpEarned] = useState(0)
  const [streak, setStreak] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [toast, setToast] = useState('')

  const n5Done = UNITS.filter(u => u.level === 'N5').every(u => progress.lessonsCompleted.includes(u.id))

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function startUnit(unit: typeof UNITS[0]) {
    const w = vocabData.filter(v => v.category === unit.category).slice(0, 12)
    setWords(w)
    setActiveUnit(unit)
    setCardIdx(0)
    setShowBack(false)
    setShowPronunciation(false)
    setShowUsage(false)
    setScreen('intro')
  }

  function startFlashcards() {
    setCardIdx(0)
    setShowBack(false)
    setShowPronunciation(false)
    setShowUsage(false)
    setScreen('flashcard')
  }

  function nextCard() {
    if (cardIdx < words.length - 1) {
      setCardIdx(cardIdx + 1)
      setShowBack(false)
      setShowPronunciation(false)
      setShowUsage(false)
    } else {
      buildQuiz()
    }
  }

  function buildQuiz() {
    const allEnglish = vocabData.map(v => v.english)
    const qs: QuizQ[] = words.slice(0, 8).map((w, i) => {
      const type = i % 3 === 0 ? 'romaji' : i % 2 === 0 ? 'en→jp' : 'jp→en'
      const wrongPool = shuffle(allEnglish.filter(e => e !== w.english)).slice(0, 3)
      const options = shuffle([w.english, ...wrongPool])
      return { word: w, options, correct: options.indexOf(w.english), type }
    })
    setQuizQs(qs)
    setQIdx(0)
    setSelected(null)
    setHearts(3)
    setXpEarned(0)
    setStreak(0)
    setCorrect(0)
    setScreen('quiz')
  }

  function handleAnswer(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    const q = quizQs[qIdx]
    if (idx === q.correct) {
      const newStreak = streak + 1
      setStreak(newStreak)
      setCorrect(c => c + 1)
      let xp = 10
      if (newStreak % 3 === 0) {
        xp += 10
        showToast(`🔥 ${newStreak} streak! +20 XP bonus!`)
      }
      setXpEarned(x => x + xp)
      addXP(xp)
    } else {
      setStreak(0)
      setHearts(h => h - 1)
    }
    setTimeout(() => {
      if (hearts - (idx !== q.correct ? 1 : 0) <= 0) {
        setScreen('result')
        return
      }
      if (qIdx < quizQs.length - 1) {
        setQIdx(i => i + 1)
        setSelected(null)
      } else {
        if (activeUnit) completeLesson(activeUnit.id)
        setScreen('result')
      }
    }, 1200)
  }

  // ── MAP ──────────────────────────────────────────────────────────────────────
  if (screen === 'map') {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Lessons</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Complete units to unlock the next level</p>

          {toast && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 font-bold px-6 py-2 rounded-full shadow-lg z-50 animate-bounce">
              {toast}
            </div>
          )}

          <div className="space-y-3">
            {UNITS.map((unit, i) => {
              const done = progress.lessonsCompleted.includes(unit.id)
              const locked = unit.level === 'N4' && !n5Done
              const available = !locked

              return (
                <Card
                  key={unit.id}
                  className={`flex items-center gap-4 p-4 transition-all ${
                    locked ? 'opacity-40 cursor-not-allowed' :
                    done   ? 'border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/10 cursor-pointer hover:shadow-md' :
                             'cursor-pointer hover:shadow-md hover:border-purple-400'
                  }`}
                  onClick={() => available && startUnit(unit)}
                >
                  <div className="text-3xl">{locked ? '🔒' : done ? '✅' : unit.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">{unit.title}</span>
                      <Badge variant={unit.level === 'N5' ? 'blue' : 'purple'}>{unit.level}</Badge>
                      {done && <Badge variant="green">Done</Badge>}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {vocabData.filter(v => v.category === unit.category).length} words · flashcards + quiz
                    </p>
                  </div>
                  {!locked && !done && (
                    <span className="text-purple-600 font-bold text-lg">›</span>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </AppLayout>
    )
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────────
  if (screen === 'intro' && activeUnit) {
    return (
      <AppLayout>
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">{activeUnit.icon}</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{activeUnit.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            {words.length} words · Flashcards with pronunciation & usage context, then a quiz
          </p>
          <div className="flex justify-center gap-6 my-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🔊</span><span>Hear it spoken</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">📖</span><span>Pronunciation breakdown</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">💡</span><span>Usage context</span>
            </div>
          </div>
          <Button onClick={startFlashcards} className="w-full">Start Lesson →</Button>
          <button onClick={() => setScreen('map')} className="mt-3 text-sm text-gray-400 hover:text-gray-600">
            ← Back to map
          </button>
        </div>
      </AppLayout>
    )
  }

  // ── FLASHCARD ─────────────────────────────────────────────────────────────────
  if (screen === 'flashcard' && activeUnit) {
    const word = words[cardIdx]
    const progress_pct = Math.round(((cardIdx + 1) / words.length) * 100)

    return (
      <AppLayout>
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setScreen('map')} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${progress_pct}%` }} />
              </div>
            </div>
            <span className="text-sm text-gray-500">{cardIdx + 1}/{words.length}</span>
          </div>

          {/* Card */}
          <Card className="p-6 text-center min-h-[220px] flex flex-col items-center justify-center">
            <Badge variant="purple" className="mb-3">{word.category}</Badge>
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

            {!showBack ? (
              <Button onClick={() => setShowBack(true)} variant="outline" className="w-full">
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
      </AppLayout>
    )
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────────
  if (screen === 'quiz' && quizQs.length > 0) {
    const q = quizQs[qIdx]
    const progress_pct = Math.round(((qIdx + 1) / quizQs.length) * 100)

    const prompt =
      q.type === 'jp→en'   ? `What does "${q.word.japanese}" mean?` :
      q.type === 'en→jp'   ? `Which is the Japanese word for "${q.word.english}"?` :
                              `What is the romaji for "${q.word.japanese}"?`

    return (
      <AppLayout>
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

          <Card className="p-6">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              {q.type === 'jp→en' ? 'Translate to English' : q.type === 'en→jp' ? 'Translate to Japanese' : 'Romaji'}
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">{prompt}</p>

            {/* Show word with audio on jp→en */}
            {q.type === 'jp→en' && (
              <button
                onClick={() => speakJapanese(q.word.japanese)}
                className="text-sm text-purple-500 hover:text-purple-700 mb-4 block"
              >
                🔊 Hear word
              </button>
            )}

            <div className="grid grid-cols-1 gap-2 mt-4">
              {q.options.map((opt, i) => {
                let cls = 'p-3 rounded-xl border-2 text-left font-medium transition-all '
                if (selected === null) {
                  cls += 'border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer'
                } else if (i === q.correct) {
                  cls += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                } else if (i === selected) {
                  cls += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                } else {
                  cls += 'border-gray-200 dark:border-gray-600 opacity-50'
                }
                return (
                  <button key={i} className={cls} onClick={() => handleAnswer(i)}>
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
      </AppLayout>
    )
  }

  // ── RESULT ────────────────────────────────────────────────────────────────────
  if (screen === 'result' && activeUnit) {
    const accuracy = Math.round((correct / quizQs.length) * 100)
    return (
      <AppLayout>
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">{accuracy >= 80 ? '🏆' : accuracy >= 50 ? '⭐' : '💪'}</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {accuracy >= 80 ? 'Great job!' : accuracy >= 50 ? 'Good effort!' : 'Keep practicing!'}
          </h2>
          <div className="grid grid-cols-3 gap-4 my-8">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <p className="text-2xl font-bold text-yellow-600">⚡ {xpEarned}</p>
              <p className="text-xs text-gray-500 mt-1">XP earned</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
              <p className="text-xs text-gray-500 mt-1">Accuracy</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <p className="text-2xl font-bold text-red-500">{'❤️'.repeat(hearts)}{'🖤'.repeat(3 - hearts)}</p>
              <p className="text-xs text-gray-500 mt-1">Hearts left</p>
            </div>
          </div>
          <Button onClick={() => setScreen('map')} className="w-full mb-3">← Back to Lessons</Button>
          <button onClick={() => startUnit(activeUnit)} className="text-sm text-purple-600 hover:text-purple-800">
            🔄 Retry this lesson
          </button>
        </div>
      </AppLayout>
    )
  }

  return null
}
