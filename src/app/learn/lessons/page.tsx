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

// ── Cat Mascot (3D SVG + CSS, Duolingo-style) ──────────────────────────────────────────────────────
type CatMood = 'idle' | 'happy' | 'sad' | 'excited' | 'thinking'

const CAT_STYLES = `
@keyframes catBob    { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-6px)} }
@keyframes catShake  { 0%,100%{transform:rotate(0deg)}   25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
@keyframes catJump   { 0%,100%{transform:translateY(0) scale(1)} 40%{transform:translateY(-18px) scale(1.08,0.93)} 60%{transform:translateY(-18px) scale(0.93,1.08)} }
@keyframes tailWag   { 0%,100%{transform:rotate(-20deg) } 50%{transform:rotate(20deg)} }
@keyframes tailDroop { 0%,100%{transform:rotate(40deg)}  50%{transform:rotate(60deg)} }
@keyframes blinkEye  { 0%,90%,100%{transform:scaleY(1)}  95%{transform:scaleY(0.1)} }
@keyframes pupilMove { 0%,100%{transform:translateX(0)}  50%{transform:translateX(2px)} }
@keyframes breathe   { 0%,100%{transform:scaleX(1)}      50%{transform:scaleX(1.04)} }
@keyframes starSpin  { 0%{transform:rotate(0deg) scale(0)} 50%{transform:rotate(180deg) scale(1.2)} 100%{transform:rotate(360deg) scale(0)} }
@keyframes tearDrop  { 0%{opacity:0;transform:translateY(0)} 20%{opacity:1} 100%{opacity:0;transform:translateY(16px)} }
@keyframes blushPulse{ 0%,100%{opacity:0.55} 50%{opacity:0.9} }
.cat-bob     { animation: catBob   1.8s ease-in-out infinite }
.cat-shake   { animation: catShake 0.5s ease-in-out 2 }
.cat-jump    { animation: catJump  0.6s ease-in-out 1 }
.cat-blink   { animation: blinkEye 3.5s ease-in-out infinite }
.cat-pupil   { animation: pupilMove 2.5s ease-in-out infinite }
.cat-breathe { animation: breathe  2s ease-in-out infinite }
.tail-wag    { transform-origin: 0% 100%; animation: tailWag  0.5s ease-in-out infinite }
.tail-droop  { transform-origin: 0% 100%; animation: tailDroop 1.5s ease-in-out infinite }
.star-spin   { animation: starSpin 0.8s ease-out forwards }
.tear-drop   { animation: tearDrop 1.2s ease-in forwards }
.blush-pulse { animation: blushPulse 1.5s ease-in-out infinite }
`

function CatMascot({ mood = 'idle' }: { mood?: CatMood }) {
  const bodyAnim  = mood === 'happy' || mood === 'excited' ? 'cat-jump'  : mood === 'sad' ? 'cat-shake' : 'cat-bob'
  const tailClass = mood === 'happy' || mood === 'excited' ? 'tail-wag'  : 'tail-droop'
  const showStars = mood === 'happy' || mood === 'excited'
  const showTear  = mood === 'sad'
  const blush     = mood === 'happy' || mood === 'excited'

  // Eye shapes per mood
  const eyeConfig: Record<CatMood, { left: string; right: string }> = {
    idle:     { left: 'M4,8 Q8,3 12,8 Q8,13 4,8Z', right: 'M4,8 Q8,3 12,8 Q8,13 4,8Z' },
    happy:    { left: 'M2,9 Q8,2 14,9',             right: 'M2,9 Q8,2 14,9' },
    sad:      { left: 'M2,7 Q8,13 14,7',            right: 'M2,7 Q8,13 14,7' },
    excited:  { left: 'M4,8 Q8,1 12,8 Q8,15 4,8Z', right: 'M4,8 Q8,1 12,8 Q8,15 4,8Z' },
    thinking: { left: 'M4,8 Q8,3 12,8 Q8,13 4,8Z', right: 'M3,9 Q8,4 13,9' },
  }

  const mouthConfig: Record<CatMood, string> = {
    idle:     'M5,10 Q8,13 11,10',
    happy:    'M4,9  Q8,15 12,9',
    sad:      'M4,11 Q8,7  12,11',
    excited:  'M3,9  Q8,16 13,9',
    thinking: 'M6,10 Q8,12 10,10',
  }

  const msgs: Record<CatMood, string> = {
    idle:     "Let's learn Japanese! にゃ～",
    happy:    'Correct! Great job! ✨',
    sad:      'Oops! You can do it! 💪',
    excited:  'On a streak! 🔥 Amazing!',
    thinking: 'Think carefully… にゃ？',
  }

  const eyeL = eyeConfig[mood].left
  const eyeR = eyeConfig[mood].right
  const mouth = mouthConfig[mood]
  const isHappyOrExcited = mood === 'happy' || mood === 'excited'

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <style>{CAT_STYLES}</style>

      {/* Speech bubble */}
      <div className="relative bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-600 rounded-2xl px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-md max-w-[220px] text-center">
        {msgs[mood]}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-purple-300 dark:border-t-purple-600" />
      </div>

      {/* Cat SVG */}
      <div className={bodyAnim} style={{filter:'drop-shadow(0 8px 16px rgba(109,40,217,0.35))'}}>
        <svg width="140" height="180" viewBox="0 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Body gradient — gives 3D depth */}
            <radialGradient id="bodyGrad" cx="38%" cy="35%" r="62%">
              <stop offset="0%"   stopColor="#c4b5fd"/>
              <stop offset="55%"  stopColor="#7c3aed"/>
              <stop offset="100%" stopColor="#4c1d95"/>
            </radialGradient>
            {/* Belly gradient */}
            <radialGradient id="bellyGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%"   stopColor="#ede9fe"/>
              <stop offset="100%" stopColor="#ddd6fe"/>
            </radialGradient>
            {/* Ear inner gradient */}
            <radialGradient id="earGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#fbcfe8"/>
              <stop offset="100%" stopColor="#f9a8d4"/>
            </radialGradient>
            {/* Paw gradient */}
            <radialGradient id="pawGrad" cx="40%" cy="35%" r="60%">
              <stop offset="0%"   stopColor="#c4b5fd"/>
              <stop offset="100%" stopColor="#6d28d9"/>
            </radialGradient>
          </defs>

          {/* ── Tail ── */}
          <g className={tailClass}>
            <path d="M105,150 Q140,130 130,100 Q120,75 110,90" stroke="#6d28d9" strokeWidth="10" strokeLinecap="round" fill="none"/>
            <path d="M105,150 Q140,130 130,100 Q120,75 110,90" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>
          </g>

          {/* ── Body ── */}
          <ellipse className="cat-breathe" cx="70" cy="130" rx="42" ry="38" fill="url(#bodyGrad)"/>
          {/* Belly */}
          <ellipse cx="70" cy="138" rx="24" ry="22" fill="url(#bellyGrad)" opacity="0.9"/>

          {/* ── Head ── */}
          <circle cx="70" cy="80" r="44" fill="url(#bodyGrad)"/>
          {/* Head highlight */}
          <ellipse cx="52" cy="62" rx="14" ry="10" fill="white" opacity="0.18" transform="rotate(-30 52 62)"/>

          {/* ── Ears ── */}
          {/* Left ear */}
          <polygon points="30,48 20,12 52,42" fill="#6d28d9"/>
          <polygon points="33,46 27,20 50,43" fill="url(#earGrad)"/>
          {/* Right ear */}
          <polygon points="110,48 120,12 88,42" fill="#6d28d9"/>
          <polygon points="107,46 113,20 90,43" fill="url(#earGrad)"/>

          {/* ── Blush ── */}
          {blush && <>
            <ellipse className="blush-pulse" cx="44" cy="95" rx="10" ry="6" fill="#f9a8d4" opacity="0.6"/>
            <ellipse className="blush-pulse" cx="96" cy="95" rx="10" ry="6" fill="#f9a8d4" opacity="0.6"/>
          </>}

          {/* ── Eyes ── */}
          {/* Left eye white */}
          <ellipse cx="53" cy="82" rx="13" ry="13" fill="white" opacity="0.95"/>
          {/* Right eye white */}
          <ellipse cx="87" cy="82" rx="13" ry="13" fill="white" opacity="0.95"/>

          {/* Left eye iris */}
          <g className="cat-blink" style={{transformOrigin:'53px 82px'}}>
            {isHappyOrExcited
              ? <path d={eyeL} fill="none" stroke="#4c1d95" strokeWidth="3" transform="translate(46,74)"/>
              : mood === 'sad'
                ? <path d={eyeL} fill="none" stroke="#4c1d95" strokeWidth="3" transform="translate(46,74)"/>
                : <ellipse cx="53" cy="82" rx="8" ry="9" fill="#4c1d95"/>
            }
            {!isHappyOrExcited && mood !== 'sad' && <>
              <ellipse className="cat-pupil" cx="53" cy="82" rx="4" ry="6" fill="#1e1b4b"/>
              <circle cx="56" cy="78" r="2" fill="white" opacity="0.9"/>
            </>}
          </g>

          {/* Right eye iris */}
          <g className="cat-blink" style={{transformOrigin:'87px 82px'}}>
            {isHappyOrExcited
              ? <path d={eyeR} fill="none" stroke="#4c1d95" strokeWidth="3" transform="translate(80,74)"/>
              : mood === 'sad'
                ? <path d={eyeR} fill="none" stroke="#4c1d95" strokeWidth="3" transform="translate(80,74)"/>
                : <ellipse cx="87" cy="82" rx="8" ry="9" fill="#4c1d95"/>
            }
            {!isHappyOrExcited && mood !== 'sad' && <>
              <ellipse className="cat-pupil" cx="87" cy="82" rx="4" ry="6" fill="#1e1b4b"/>
              <circle cx="90" cy="78" r="2" fill="white" opacity="0.9"/>
            </>}
          </g>

          {/* ── Whiskers ── */}
          <line x1="12" y1="88" x2="48" y2="92" stroke="white" strokeWidth="1.5" opacity="0.8"/>
          <line x1="10" y1="96" x2="47" y2="96" stroke="white" strokeWidth="1.5" opacity="0.8"/>
          <line x1="12" y1="104" x2="48" y2="100" stroke="white" strokeWidth="1.5" opacity="0.8"/>
          <line x1="92" y1="92" x2="128" y2="88" stroke="white" strokeWidth="1.5" opacity="0.8"/>
          <line x1="93" y1="96" x2="130" y2="96" stroke="white" strokeWidth="1.5" opacity="0.8"/>
          <line x1="92" y1="100" x2="128" y2="104" stroke="white" strokeWidth="1.5" opacity="0.8"/>

          {/* ── Nose & Mouth ── */}
          <path d="M67,100 L70,104 L73,100" fill="#f9a8d4" stroke="#e879f9" strokeWidth="1"/>
          <path d={mouth} fill="none" stroke="#6d28d9" strokeWidth="2.5" strokeLinecap="round"/>

          {/* ── Paws ── */}
          <ellipse cx="46" cy="163" rx="16" ry="10" fill="url(#pawGrad)"/>
          <ellipse cx="94" cy="163" rx="16" ry="10" fill="url(#pawGrad)"/>
          {/* Toe beans */}
          <circle cx="40" cy="163" r="3.5" fill="#a78bfa" opacity="0.6"/>
          <circle cx="46" cy="165" r="3.5" fill="#a78bfa" opacity="0.6"/>
          <circle cx="52" cy="163" r="3.5" fill="#a78bfa" opacity="0.6"/>
          <circle cx="88" cy="163" r="3.5" fill="#a78bfa" opacity="0.6"/>
          <circle cx="94" cy="165" r="3.5" fill="#a78bfa" opacity="0.6"/>
          <circle cx="100" cy="163" r="3.5" fill="#a78bfa" opacity="0.6"/>

          {/* ── Excited stars ── */}
          {showStars && <>
            <text className="star-spin" x="18" y="42" fontSize="16" style={{transformOrigin:'26px 34px'}}>✨</text>
            <text className="star-spin" x="106" y="38" fontSize="14" style={{transformOrigin:'113px 31px',animationDelay:'0.2s'}}>⭐</text>
          </>}

          {/* ── Sad tear ── */}
          {showTear && <>
            <ellipse className="tear-drop" cx="53" cy="95" rx="3" ry="5" fill="#93c5fd" opacity="0.9"/>
            <ellipse className="tear-drop" cx="87" cy="95" rx="3" ry="5" fill="#93c5fd" opacity="0.9" style={{animationDelay:'0.3s'}}/>
          </>}
        </svg>
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
  { id: 'u08', level: 'N5', title: 'Animals',          emoji: '🐾', category: 'Animals' },
  { id: 'u09', level: 'N5', title: 'Adjectives',       emoji: '✨', category: 'Adjectives' },
  { id: 'u10', level: 'N5', title: 'Verbs',            emoji: '🏃', category: 'Verbs' },
  { id: 'u11', level: 'N5', title: 'Common Words',     emoji: '💬', category: 'Common' },
  { id: 'u12', level: 'N4', title: 'Daily Life',       emoji: '🏠', category: 'Daily Life' },
  { id: 'u13', level: 'N4', title: 'School & Work',    emoji: '📚', category: 'School' },
  { id: 'u14', level: 'N4', title: 'Health',           emoji: '🏥', category: 'Health' },
  { id: 'u15', level: 'N4', title: 'Nature & Seasons', emoji: '🌸', category: 'Nature' },
  { id: 'u16', level: 'N4', title: 'Society',          emoji: '🌏', category: 'Society' },
  { id: 'u17', level: 'N4', title: 'Travel',           emoji: '✈️', category: 'Travel' },
  { id: 'u18', level: 'N4', title: 'Work & Business',  emoji: '💼', category: 'Work' },
  { id: 'u19', level: 'N4', title: 'Adverbs',          emoji: '⚡', category: 'Adverbs' },
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
    // Get words for this category, fallback to all vocab if fewer than 8 found
    let w = vocabData.filter(v => v.category === unit.category)
    // If fewer than 8 words in this category, pad with words from other categories
    if (w.length < 8) {
      const extra = shuffle(vocabData.filter(v => v.category !== unit.category))
      w = [...w, ...extra].slice(0, 12)
    } else {
      w = shuffle(w).slice(0, 12)
    }
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
    const allEnglish  = vocabData.map(v => v.english)
    const allJapanese = vocabData.map(v => v.japanese)
    const allRomaji   = vocabData.map(v => v.romaji)

    const qs: QuizQ[] = words.slice(0, 8).map((w, i) => {
      const type: QuizQ['type'] = i % 3 === 0 ? 'romaji' : i % 2 === 0 ? 'en→jp' : 'jp→en'

      if (type === 'jp→en') {
        // Show English options — ask what does the Japanese mean
        const wrongPool = shuffle(allEnglish.filter(e => e !== w.english)).slice(0, 3)
        // Guarantee 3 distractors even if pool is small
        while (wrongPool.length < 3) wrongPool.push(wrongPool[0] ?? 'other')
        const options = shuffle([w.english, ...wrongPool])
        return { word: w, options, correct: options.indexOf(w.english), type }
      } else if (type === 'en→jp') {
        // Show Japanese options — ask which is the Japanese for the English word
        const wrongPool = shuffle(allJapanese.filter(j => j !== w.japanese)).slice(0, 3)
        while (wrongPool.length < 3) wrongPool.push(wrongPool[0] ?? 'その他')
        const options = shuffle([w.japanese, ...wrongPool])
        return { word: w, options, correct: options.indexOf(w.japanese), type }
      } else {
        // Show romaji options — ask what is the romaji for the Japanese word
        const wrongPool = shuffle(allRomaji.filter(r => r !== w.romaji)).slice(0, 3)
        while (wrongPool.length < 3) wrongPool.push(wrongPool[0] ?? 'other')
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
