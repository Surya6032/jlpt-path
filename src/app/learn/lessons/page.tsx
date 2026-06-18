'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { vocabData } from '@/data/vocab'
import { useProgress } from '@/store/progress'
import type { VocabWord } from '@/types'
import {
  Heart, Star, Zap, CheckCircle2, XCircle, ArrowRight,
  Home, RotateCcw, Trophy, Flame, ChevronRight, BookOpen
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────
type QuestionType = 'multipleChoice' | 'translate' | 'tapWords' | 'trueFalse' | 'fillBlank'
interface Question {
  type: QuestionType
  word: VocabWord
  prompt: string
  options?: string[]
  correctAnswer: string
  tappableWords?: string[]
  correctTapOrder?: string[]
}

interface LessonUnit {
  id: string
  title: string
  description: string
  level: 'N5' | 'N4'
  category: string
  icon: string
  color: string
  words: VocabWord[]
  unlocked: boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getDistractors(correct: VocabWord, pool: VocabWord[], field: keyof VocabWord, count = 3): string[] {
  const others = pool.filter(w => w.id !== correct.id && w[field] !== correct[field])
  return shuffle(others).slice(0, count).map(w => String(w[field]))
}

function buildQuestions(words: VocabWord[], allWords: VocabWord[]): Question[] {
  const qs: Question[] = []
  const pool = allWords.filter(w => w.level === words[0].level)

  for (const word of words) {
    const qTypes: QuestionType[] = ['multipleChoice', 'translate', 'trueFalse', 'fillBlank']
    const qType = qTypes[Math.floor(Math.random() * qTypes.length)]

    if (qType === 'multipleChoice') {
      const distractors = getDistractors(word, pool, 'english')
      const options = shuffle([word.english, ...distractors])
      qs.push({
        type: 'multipleChoice',
        word,
        prompt: `What does "${word.japanese}" mean?`,
        options,
        correctAnswer: word.english,
      })
    } else if (qType === 'translate') {
      const distractors = getDistractors(word, pool, 'japanese')
      const options = shuffle([word.japanese, ...distractors])
      qs.push({
        type: 'translate',
        word,
        prompt: `Select the Japanese word for: "${word.english}"`,
        options,
        correctAnswer: word.japanese,
      })
    } else if (qType === 'trueFalse') {
      const showCorrect = Math.random() > 0.5
      const shownEnglish = showCorrect
        ? word.english
        : shuffle(pool.filter(w => w.id !== word.id))[0]?.english ?? word.english
      qs.push({
        type: 'trueFalse',
        word,
        prompt: `Does "${word.japanese}" mean "${shownEnglish}"?`,
        options: ['True', 'False'],
        correctAnswer: showCorrect ? 'True' : 'False',
      })
    } else {
      // fillBlank — show example sentence with blank
      const blank = word.japanese
      const sentence = word.exampleJp.replace(blank, '＿＿＿')
      const distractors = getDistractors(word, pool, 'japanese')
      const options = shuffle([word.japanese, ...distractors])
      qs.push({
        type: 'fillBlank',
        word,
        prompt: `Fill in the blank:\n${sentence}\n(${word.exampleEn})`,
        options,
        correctAnswer: word.japanese,
      })
    }
  }
  return qs
}

// ─── Unit Config ─────────────────────────────────────────────────────────────
const UNIT_CONFIGS = [
  { id:'u01', title:'Greetings',      description:'Say hello & goodbye',       level:'N5', category:'Greetings',  icon:'👋', color:'from-purple-500 to-purple-600' },
  { id:'u02', title:'Family',         description:'Talk about your family',     level:'N5', category:'Family',     icon:'👨‍👩‍👧', color:'from-pink-500 to-rose-500' },
  { id:'u03', title:'Food & Drink',   description:'Order and describe food',    level:'N5', category:'Food',       icon:'🍱', color:'from-orange-400 to-orange-500' },
  { id:'u04', title:'Time & Dates',   description:'Tell the time and dates',    level:'N5', category:'Time',       icon:'🕐', color:'from-blue-500 to-blue-600' },
  { id:'u05', title:'Places',         description:'Navigate your surroundings', level:'N5', category:'Locations',  icon:'🏙️', color:'from-teal-500 to-teal-600' },
  { id:'u06', title:'Colors',         description:'Describe colors',            level:'N5', category:'Common',     icon:'🎨', color:'from-violet-500 to-violet-600' },
  { id:'u07', title:'Animals',        description:'Name animals',               level:'N5', category:'Animals',    icon:'🐾', color:'from-amber-500 to-amber-600' },
  { id:'u08', title:'Body & Health',  description:'Describe your body',         level:'N5', category:'Health',     icon:'💪', color:'from-red-500 to-red-600' },
  { id:'u09', title:'Verbs I',        description:'Core action words',          level:'N5', category:'Verbs',      icon:'⚡', color:'from-yellow-500 to-yellow-600' },
  { id:'u10', title:'Adjectives I',   description:'Describe the world',         level:'N5', category:'Adjectives', icon:'✨', color:'from-cyan-500 to-cyan-600' },
  { id:'u11', title:'Daily Life',     description:'Everyday N4 expressions',    level:'N4', category:'Daily Life', icon:'🌅', color:'from-indigo-500 to-indigo-600' },
  { id:'u12', title:'Work & Office',  description:'Business vocabulary',        level:'N4', category:'Work',       icon:'💼', color:'from-slate-500 to-slate-600' },
  { id:'u13', title:'Travel',         description:'Get around Japan',           level:'N4', category:'Travel',     icon:'✈️', color:'from-sky-500 to-sky-600' },
  { id:'u14', title:'Society',        description:'Culture & society',          level:'N4', category:'Society',    icon:'🏯', color:'from-rose-500 to-rose-600' },
  { id:'u15', title:'Adverbs',        description:'Express how and when',       level:'N4', category:'Adverbs',    icon:'💬', color:'from-emerald-500 to-emerald-600' },
] as const

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LessonsPage() {
  const router = useRouter()
  const { progress, markLessonComplete, markVocabLearned } = useProgress()

  const [view, setView] = useState<'map' | 'lesson' | 'result'>('map')
  const [activeUnit, setActiveUnit] = useState<LessonUnit | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [hearts, setHearts] = useState(3)
  const [xpEarned, setXpEarned] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showStreakBonus, setShowStreakBonus] = useState(false)

  // Build lesson units from vocab data
  const units: LessonUnit[] = UNIT_CONFIGS.map((cfg, idx) => {
    const words = vocabData.filter(w => w.level === cfg.level && w.category === cfg.category)
    const isFirst = idx === 0
    const prevCompleted = idx === 0 || progress.lessonsCompleted.indexOf(UNIT_CONFIGS[idx - 1].id) !== -1
    return {
      ...cfg,
      level: cfg.level as 'N5' | 'N4',
      words,
      unlocked: isFirst || prevCompleted,
    }
  })

  const startLesson = (unit: LessonUnit) => {
    if (!unit.unlocked || unit.words.length === 0) return
    const lessonWords = shuffle(unit.words).slice(0, Math.min(8, unit.words.length))
    const qs = buildQuestions(lessonWords, vocabData)
    setActiveUnit(unit)
    setQuestions(qs)
    setCurrentQ(0)
    setSelected(null)
    setAnswered(false)
    setHearts(3)
    setXpEarned(0)
    setCorrectCount(0)
    setStreak(0)
    setView('lesson')
  }

  const handleAnswer = (answer: string) => {
    if (answered) return
    setSelected(answer)
    setAnswered(true)
    const isCorrect = answer === questions[currentQ].correctAnswer

    if (isCorrect) {
      const newStreak = streak + 1
      setStreak(newStreak)
      const bonus = newStreak > 0 && newStreak % 3 === 0
      const xp = bonus ? 20 : 10
      setXpEarned(prev => prev + xp)
      setCorrectCount(prev => prev + 1)
      if (bonus) {
        setShowStreakBonus(true)
        setTimeout(() => setShowStreakBonus(false), 1500)
      }
      markVocabLearned(questions[currentQ].word.id)
    } else {
      setStreak(0)
      setHearts(prev => Math.max(0, prev - 1))
    }
  }

  const handleNext = () => {
    if (hearts === 0) {
      setView('result')
      return
    }
    if (currentQ + 1 >= questions.length) {
      // Lesson complete
      if (activeUnit) markLessonComplete(activeUnit.id)
      setView('result')
      return
    }
    setCurrentQ(prev => prev + 1)
    setSelected(null)
    setAnswered(false)
  }

  const q = questions[currentQ]
  const progress_pct = questions.length > 0 ? Math.round((currentQ / questions.length) * 100) : 0

  // ─── MAP VIEW ──────────────────────────────────────────────────────────────
  if (view === 'map') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Lessons</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Learn Japanese step by step</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/30 px-4 py-2 rounded-full">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-600 dark:text-orange-400">{progress.streak} day streak</span>
          </div>
        </div>

        {/* N5 Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-bold px-3 py-1 rounded-full">N5 BEGINNER</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="space-y-3">
            {units.filter(u => u.level === 'N5').map((unit, i) => {
              const done = progress.lessonsCompleted.indexOf(unit.id) !== -1
              return (
                <button
                  key={unit.id}
                  onClick={() => startLesson(unit)}
                  disabled={!unit.unlocked}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left
                    ${done
                      ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                      : unit.unlocked
                        ? 'border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-800 hover:border-purple-400 hover:shadow-lg hover:scale-[1.02]'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-50 cursor-not-allowed'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${unit.color} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                    {done ? '✅' : unit.unlocked ? unit.icon : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">{unit.title}</span>
                      {done && <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Complete!</span>}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{unit.description}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{unit.words.length} words</p>
                  </div>
                  {unit.unlocked && !done && <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                  {done && <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* N4 Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full">N4 ELEMENTARY</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="space-y-3">
            {units.filter(u => u.level === 'N4').map(unit => {
              const done = progress.lessonsCompleted.indexOf(unit.id) !== -1
              return (
                <button
                  key={unit.id}
                  onClick={() => startLesson(unit)}
                  disabled={!unit.unlocked}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left
                    ${done
                      ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                      : unit.unlocked
                        ? 'border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 hover:border-blue-400 hover:shadow-lg hover:scale-[1.02]'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-50 cursor-not-allowed'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${unit.color} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                    {done ? '✅' : unit.unlocked ? unit.icon : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">{unit.title}</span>
                      {done && <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Complete!</span>}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{unit.description}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{unit.words.length} words</p>
                  </div>
                  {unit.unlocked && !done && <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                  {done && <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ─── RESULT VIEW ───────────────────────────────────────────────────────────
  if (view === 'result') {
    const failed = hearts === 0
    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-8xl mb-6">{failed ? '💔' : accuracy >= 80 ? '🏆' : '⭐'}</div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          {failed ? 'Out of hearts!' : accuracy >= 80 ? 'Excellent!' : 'Lesson Complete!'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {failed ? 'Practice more to improve.' : `You got ${correctCount} out of ${questions.length} correct.`}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{xpEarned}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">XP Earned</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{accuracy}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Accuracy</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4">
            <div className="text-2xl font-bold text-red-500">{hearts}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hearts Left</div>
          </div>
        </div>

        <div className="space-y-3">
          {!failed && (
            <button
              onClick={() => activeUnit && startLesson(activeUnit)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Practice Again
            </button>
          )}
          {failed && (
            <button
              onClick={() => activeUnit && startLesson(activeUnit)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Try Again
            </button>
          )}
          <button
            onClick={() => setView('map')}
            className="w-full py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" /> Back to Lessons
          </button>
        </div>
      </div>
    )
  }

  // ─── LESSON VIEW ───────────────────────────────────────────────────────────
  if (!q) return null

  const isCorrect = selected === q.correctAnswer
  const progressWidth = `${progress_pct}%`

  return (
    <div className="max-w-xl mx-auto px-4 py-6 min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setView('map')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <Home className="w-5 h-5" />
        </button>
        {/* Progress bar */}
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}
          />
        </div>
        {/* Hearts */}
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <Heart key={i} className={`w-5 h-5 ${i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-300 dark:text-gray-600'}`} />
          ))}
        </div>
        {/* XP */}
        <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
          <Zap className="w-4 h-4" /> {xpEarned}
        </div>
      </div>

      {/* Streak bonus toast */}
      {showStreakBonus && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-yellow-500 text-white font-bold px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
          🔥 Streak Bonus! +20 XP
        </div>
      )}

      {/* Question card */}
      <div className="flex-1">
        {/* Question type label */}
        <div className="text-xs font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest mb-4">
          {q.type === 'multipleChoice' && '🎯 Choose the meaning'}
          {q.type === 'translate' && '🇯🇵 Select the Japanese'}
          {q.type === 'trueFalse' && '✅ True or False?'}
          {q.type === 'fillBlank' && '✏️ Fill in the blank'}
        </div>

        {/* Word display */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 mb-6 text-center">
          {q.type !== 'fillBlank' && (
            <>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">{q.word.japanese}</div>
              <div className="text-lg text-gray-500 dark:text-gray-400">{q.word.furigana}</div>
              <div className="text-sm text-gray-400 dark:text-gray-500 mt-1">{q.word.romaji}</div>
            </>
          )}
          {q.type === 'fillBlank' && (
            <div className="text-lg text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">{q.prompt}</div>
          )}
        </div>

        {/* Prompt (for non-fillBlank) */}
        {q.type !== 'fillBlank' && (
          <p className="text-center text-gray-600 dark:text-gray-300 font-semibold mb-6">{q.prompt}</p>
        )}

        {/* Options */}
        <div className={`grid gap-3 ${q.options && q.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {q.options?.map((opt) => {
            let btnClass = 'w-full p-4 rounded-2xl border-2 font-semibold text-left transition-all duration-200 '
            if (!answered) {
              btnClass += 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
            } else if (opt === q.correctAnswer) {
              btnClass += 'border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            } else if (opt === selected && selected !== q.correctAnswer) {
              btnClass += 'border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            } else {
              btnClass += 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 opacity-60'
            }
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={answered}
                className={btnClass}
              >
                <span className="flex items-center gap-3">
                  {answered && opt === q.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  {answered && opt === selected && opt !== q.correctAnswer && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                  <span className="text-base">{opt}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Answer feedback & continue */}
      {answered && (
        <div className={`mt-6 p-5 rounded-2xl ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`font-bold text-lg ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {isCorrect ? '🎉 Correct!' : '❌ Not quite'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Correct answer: <span className="font-bold">{q.correctAnswer}</span>
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">{q.word.exampleJp} — {q.word.exampleEn}</p>
            </div>
            <button
              onClick={handleNext}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90
                ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {currentQ + 1 >= questions.length || hearts === 0 ? 'Finish' : 'Continue'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
