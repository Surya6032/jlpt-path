'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useProgress } from '@/store/progress'
import { vocabData } from '@/data/vocab'
import type { VocabWord } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = 'map' | 'calendar' | 'flashcard' | 'quiz' | 'result'
type Mood   = 'idle' | 'happy' | 'sad' | 'excited' | 'thinking'
type QType  = 'jp2en' | 'en2jp' | 'audio'

interface QuizQ { word: VocabWord; options: string[]; correct: string; type: QType }
interface Unit  { id: string; title: string; emoji: string; level: 'N5'|'N4'; category: string; color: string }

// ─── All 25 Units mapped to every category in vocab ──────────────────────────
const UNITS: Unit[] = [
  // N5
  { id:'u01', title:'Greetings',     emoji:'👋', level:'N5', category:'Greetings',  color:'#461E96' },
  { id:'u02', title:'Family',        emoji:'👨‍👩‍👧', level:'N5', category:'Family',     color:'#00B4E6' },
  { id:'u03', title:'Numbers',       emoji:'🔢', level:'N5', category:'Numbers',    color:'#E6008C' },
  { id:'u04', title:'Time',          emoji:'⏰', level:'N5', category:'Time',       color:'#00DC8C' },
  { id:'u05', title:'Food & Drink',  emoji:'🍜', level:'N5', category:'Food',       color:'#735CCC' },
  { id:'u06', title:'Daily Life',    emoji:'🏠', level:'N5', category:'Daily Life', color:'#461E96' },
  { id:'u07', title:'School',        emoji:'📚', level:'N5', category:'School',     color:'#00B4E6' },
  { id:'u08', title:'Locations',     emoji:'📍', level:'N5', category:'Locations',  color:'#E6008C' },
  { id:'u09', title:'Weather',       emoji:'🌤',  level:'N5', category:'Weather',    color:'#00DC8C' },
  { id:'u10', title:'Adjectives',    emoji:'✨', level:'N5', category:'Adjectives', color:'#735CCC' },
  { id:'u11', title:'Verbs N5',      emoji:'⚡', level:'N5', category:'Verbs',      color:'#461E96' },
  { id:'u12', title:'Common Words',  emoji:'💬', level:'N5', category:'Common',     color:'#00B4E6' },
  { id:'u13', title:'Animals',       emoji:'🐾', level:'N5', category:'Animals',    color:'#E6008C' },
  { id:'u14', title:'Health N5',     emoji:'🏥', level:'N5', category:'Health',     color:'#00DC8C' },
  { id:'u15', title:'Nature',        emoji:'🌸', level:'N5', category:'Nature',     color:'#735CCC' },
  { id:'u16', title:'Seasons',       emoji:'🍂', level:'N5', category:'Seasons',    color:'#461E96' },
  { id:'u17', title:'Work N5',       emoji:'💼', level:'N5', category:'Work',       color:'#00B4E6' },
  // N4
  { id:'u18', title:'Adjectives N4', emoji:'🎨', level:'N4', category:'Adjectives', color:'#E6008C' },
  { id:'u19', title:'Adverbs',       emoji:'🔤', level:'N4', category:'Adverbs',    color:'#00DC8C' },
  { id:'u20', title:'Daily Life N4', emoji:'🏡', level:'N4', category:'Daily Life', color:'#735CCC' },
  { id:'u21', title:'Health N4',     emoji:'💊', level:'N4', category:'Health',     color:'#461E96' },
  { id:'u22', title:'School N4',     emoji:'🏫', level:'N4', category:'School',     color:'#00B4E6' },
  { id:'u23', title:'Society',       emoji:'🌏', level:'N4', category:'Society',    color:'#E6008C' },
  { id:'u24', title:'Travel',        emoji:'✈️', level:'N4', category:'Travel',     color:'#00DC8C' },
  { id:'u25', title:'Verbs N4',      emoji:'🏃', level:'N4', category:'Verbs',      color:'#735CCC' },
  { id:'u26', title:'Work N4',       emoji:'🏢', level:'N4', category:'Work',       color:'#461E96' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function speak(text: string) {
  if (typeof window === 'undefined') return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'; u.rate = 0.8
  window.speechSynthesis.speak(u)
}

function buildQuestions(words: VocabWord[]): QuizQ[] {
  const allEnglish = vocabData.map(v => v.english)
  const types: QType[] = ['jp2en', 'en2jp', 'audio']
  return shuffle(words).slice(0, Math.min(10, words.length)).map(word => {
    const type = types[Math.floor(Math.random() * types.length)]
    const distractors = shuffle(allEnglish.filter(e => e !== word.english)).slice(0, 3)
    const options = shuffle([word.english, ...distractors])
    return { word, options, correct: word.english, type }
  })
}

// ─── Mnemonics ────────────────────────────────────────────────────────────────
const MNEMONICS: Record<string, string> = {
  'こんにちは': 'Ko-ni-chi-WA sounds like "Come, knee, chee-WA!" — bow at the knee!',
  'ありがとう': 'ARI-GA-TOU — "A really gato (cat) too!" — a grateful cat.',
  'すみません': 'SUMI-MASEN — "Sue me, masen" — apologizing to Sue.',
  'おはようございます': 'O-HA-YO — "Oh! Hi, yo!" in the morning.',
  'さようなら': 'SA-YO-NA-RA — "Say-yo, nah, rah!" — wave goodbye.',
  'ありがとうございます': 'Picture a gator (ありがとう) bowing very formally.',
}

function getMnemonic(word: VocabWord): string {
  return MNEMONICS[word.japanese] || `"${word.romaji}" — imagine ${word.english.toLowerCase()} written in Japanese dust.`
}

// ─── Stroke SVG stub (visual pattern, not a full stroke-order library) ────────
function StrokeDisplay({ kanji }: { kanji: string }) {
  const isKanji = /[\u4E00-\u9FFF]/.test(kanji)
  if (!isKanji) return null
  return (
    <div className="flex items-center justify-center mt-2">
      <div className="relative w-16 h-16 border-2 border-dashed border-purple-200 rounded-lg flex items-center justify-center bg-purple-50">
        <span className="text-3xl">{kanji}</span>
        <div className="absolute -bottom-5 text-xs text-gray-400">kanji</div>
      </div>
    </div>
  )
}

// ─── 3D SVG Cat ───────────────────────────────────────────────────────────────
function NekoSan({ mood }: { mood: Mood }) {
  const [blink, setBlink] = useState(false)
  const [pupilX, setPupilX] = useState(0)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3500)
    const pupilInterval = setInterval(() => {
      setPupilX(Math.random() > 0.5 ? 1.5 : -1.5)
    }, 2000)
    return () => { clearInterval(blinkInterval); clearInterval(pupilInterval) }
  }, [])

  const bodyAnim = mood === 'happy' || mood === 'excited'
    ? 'animate-bounce'
    : mood === 'sad'
    ? 'animate-pulse'
    : 'animate-[bob_3s_ease-in-out_infinite]'

  return (
    <div className="flex flex-col items-center select-none">
      <style>{`
        @keyframes bob       { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-8px)} }
        @keyframes tailWag   { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)}  }
        @keyframes tailDroop { 0%,100%{transform:rotate(10deg)}  50%{transform:rotate(20deg)}  }
        @keyframes tearDrop  { 0%{opacity:0;transform:translateY(0)} 100%{opacity:1;transform:translateY(12px)} }
        @keyframes starSpin  { from{transform:rotate(0deg) scale(1)} to{transform:rotate(360deg) scale(1.2)} }
        @keyframes blush     { 0%,100%{opacity:.5} 50%{opacity:.9} }
        @keyframes shake     { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
      `}</style>
      <svg width="140" height="160" viewBox="0 0 140 160" className={bodyAnim} style={mood==='sad'?{animation:'shake 0.5s ease-in-out 3'}:{}}>
        {/* Drop shadow */}
        <ellipse cx="70" cy="155" rx="35" ry="6" fill="rgba(0,0,0,0.12)" />

        {/* Tail */}
        <path
          d="M 95 120 Q 130 110 125 85 Q 120 65 108 75"
          fill="none" stroke="#5B2FBE" strokeWidth="8" strokeLinecap="round"
          style={{ transformOrigin:'95px 120px', animation: mood==='happy'||mood==='excited' ? 'tailWag 0.4s ease-in-out infinite' : 'tailDroop 2s ease-in-out infinite' }}
        />

        {/* Body */}
        <ellipse cx="70" cy="118" rx="38" ry="35" fill="url(#bodyGrad)" />
        {/* Belly */}
        <ellipse cx="70" cy="122" rx="22" ry="20" fill="url(#bellyGrad)" opacity="0.9" />

        {/* Paws */}
        <ellipse cx="48" cy="148" rx="13" ry="9" fill="url(#pawGrad)" />
        <ellipse cx="92" cy="148" rx="13" ry="9" fill="url(#pawGrad)" />
        {/* Toe beans */}
        <ellipse cx="44" cy="150" rx="3" ry="2" fill="rgba(180,100,200,0.4)" />
        <ellipse cx="50" cy="152" rx="3" ry="2" fill="rgba(180,100,200,0.4)" />
        <ellipse cx="56" cy="150" rx="3" ry="2" fill="rgba(180,100,200,0.4)" />
        <ellipse cx="88" cy="150" rx="3" ry="2" fill="rgba(180,100,200,0.4)" />
        <ellipse cx="94" cy="152" rx="3" ry="2" fill="rgba(180,100,200,0.4)" />
        <ellipse cx="100" cy="150" rx="3" ry="2" fill="rgba(180,100,200,0.4)" />

        {/* Head */}
        <circle cx="70" cy="72" r="36" fill="url(#headGrad)" />
        {/* Head highlight */}
        <ellipse cx="58" cy="58" rx="14" ry="10" fill="rgba(255,255,255,0.18)" transform="rotate(-20,58,58)" />

        {/* Ears */}
        <polygon points="38,50 28,22 52,42" fill="url(#earGrad)" />
        <polygon points="32,48 30,26 46,42" fill="#FF9CC2" />
        <polygon points="102,50 112,22 88,42" fill="url(#earGrad)" />
        <polygon points="108,48 110,26 94,42" fill="#FF9CC2" />

        {/* Eyes */}
        {mood === 'happy' || mood === 'excited' ? (
          <>
            <path d="M 53 70 Q 60 62 67 70" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M 73 70 Q 80 62 87 70" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : mood === 'sad' ? (
          <>
            <path d="M 53 74 Q 60 68 67 74" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M 73 74 Q 80 68 87 74" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Left eye */}
            <circle cx="60" cy="70" r="9" fill="white" />
            <circle cx="60" cy="70" r={blink ? 1 : 6} fill="#1a0040" style={{ transition: 'r 0.05s' }}>
              <animateTransform attributeName="transform" type="translate" values={`${pupilX},0;${pupilX},0`} dur="0.1s" />
            </circle>
            <circle cx={60 + pupilX - 2} cy="68" r="2" fill="white" opacity="0.8" />
            {/* Right eye */}
            <circle cx="80" cy="70" r="9" fill="white" />
            <circle cx="80" cy="70" r={blink ? 1 : 6} fill="#1a0040" style={{ transition: 'r 0.05s' }}>
              <animateTransform attributeName="transform" type="translate" values={`${pupilX},0;${pupilX},0`} dur="0.1s" />
            </circle>
            <circle cx={80 + pupilX - 2} cy="68" r="2" fill="white" opacity="0.8" />
          </>
        )}

        {/* Nose */}
        <polygon points="70,79 67,83 73,83" fill="#FF6BAE" />
        {/* Mouth */}
        <path d="M 67 83 Q 70 87 73 83" fill="none" stroke="#FF6BAE" strokeWidth="1.5" strokeLinecap="round" />

        {/* Whiskers */}
        <line x1="30" y1="76" x2="58" y2="79" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="28" y1="81" x2="58" y2="82" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="30" y1="86" x2="58" y2="84" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="82" y1="79" x2="110" y2="76" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="82" y1="82" x2="112" y2="81" stroke="white" strokeWidth="1.2" opacity="0.8" />
        <line x1="82" y1="84" x2="110" y2="86" stroke="white" strokeWidth="1.2" opacity="0.8" />

        {/* Blush — happy/excited */}
        {(mood === 'happy' || mood === 'excited') && (
          <>
            <ellipse cx="50" cy="78" rx="9" ry="5" fill="#FF9CC2" style={{ animation: 'blush 1s ease-in-out infinite' }} />
            <ellipse cx="90" cy="78" rx="9" ry="5" fill="#FF9CC2" style={{ animation: 'blush 1s ease-in-out infinite' }} />
          </>
        )}

        {/* Tears — sad */}
        {mood === 'sad' && (
          <>
            <ellipse cx="57" cy="84" rx="2.5" ry="4" fill="#00B4E6" style={{ animation: 'tearDrop 1s ease-in infinite' }} />
            <ellipse cx="83" cy="84" rx="2.5" ry="4" fill="#00B4E6" style={{ animation: 'tearDrop 1s ease-in infinite 0.3s' }} />
          </>
        )}

        {/* Stars — excited */}
        {mood === 'excited' && (
          <>
            <text x="18" y="45" fontSize="14" style={{ animation: 'starSpin 1s linear infinite', transformOrigin: '25px 40px' }}>⭐</text>
            <text x="108" y="45" fontSize="14" style={{ animation: 'starSpin 1s linear infinite 0.5s', transformOrigin: '115px 40px' }}>⭐</text>
          </>
        )}
        {mood === 'happy' && (
          <>
            <text x="20" y="42" fontSize="12">✨</text>
            <text x="108" y="42" fontSize="12">✨</text>
          </>
        )}

        {/* Gradients */}
        <defs>
          <radialGradient id="headGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#7B52D3" />
            <stop offset="100%" stopColor="#3A1580" />
          </radialGradient>
          <radialGradient id="bodyGrad" cx="40%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#6B42C3" />
            <stop offset="100%" stopColor="#2E1070" />
          </radialGradient>
          <radialGradient id="bellyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%"   stopColor="#EDE0FF" />
            <stop offset="100%" stopColor="#C8A8F0" />
          </radialGradient>
          <radialGradient id="pawGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#7B52D3" />
            <stop offset="100%" stopColor="#3A1580" />
          </radialGradient>
          <radialGradient id="earGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="#7B52D3" />
            <stop offset="100%" stopColor="#3A1580" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

// ─── Speech Bubble ─────────────────────────────────────────────────────────────
const BUBBLE_LINES: Record<Mood, string[]> = {
  idle:     ['にゃ～ 🐾', 'Let\'s study! にゃ！', 'がんばって！✨', 'You can do it! にゃ'],
  thinking: ['Think carefully... にゃ？', 'Hmm... にゃ🤔', 'Take your time! にゃ', 'You\'ve got this! にゃ'],
  happy:    ['すごい！ Great job! 🎉', '正解！ Correct! にゃ！', 'Amazing! ✨にゃ！', 'You\'re on fire! 🔥にゃ'],
  excited:  ['PERFECT! 🌟にゃ！！', 'STREAK BONUS! ⭐にゃ！', '100%! Incredible! にゃ！', 'SUPERCAT APPROVES! 🐾'],
  sad:      ['Don\'t give up! にゃ💪', 'Almost! Try again にゃ', 'Practice makes perfect にゃ', 'Next one! にゃ🌸'],
}

function SpeechBubble({ mood }: { mood: Mood }) {
  const lines = BUBBLE_LINES[mood]
  const [line, setLine] = useState(lines[0])
  useEffect(() => {
    setLine(lines[Math.floor(Math.random() * lines.length)])
  }, [mood])
  return (
    <div className="relative bg-white border-2 border-purple-200 rounded-2xl px-4 py-2 text-sm font-medium text-purple-800 shadow-md mb-2 max-w-[220px] text-center">
      {line}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-purple-200 rotate-45" />
    </div>
  )
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#461E96','#00B4E6','#E6008C','#00DC8C','#735CCC'][i % 5],
    delay: Math.random() * 1,
    duration: 1.5 + Math.random(),
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div key={p.id} className="absolute top-0 w-2 h-3 rounded-sm"
          style={{
            left: `${p.x}%`,
            backgroundColor: p.color,
            animation: `fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }} />
      ))}
      <style>{`@keyframes fall { from{transform:translateY(-20px) rotate(0)} to{transform:translateY(100vh) rotate(720deg)} }`}</style>
    </div>
  )
}

// ─── Calendar Screen ──────────────────────────────────────────────────────────
function CalendarScreen({ onBack, studyDates }: { onBack: () => void; studyDates: string[] }) {
  const today = new Date()
  const [viewYear, setViewYear]   = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const monthName    = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' })

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1) } else setViewMonth(m => m-1) }
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1) } else setViewMonth(m => m+1) }

  // Calculate current streak
  const sortedDates = [...new Set(studyDates)].sort().reverse()
  let streak = 0
  const now = new Date(); now.setHours(0,0,0,0)
  for (let i = 0; i < 365; i++) {
    const d = new Date(now); d.setDate(d.getDate() - i)
    const ds = d.toISOString().split('T')[0]
    if (sortedDates.includes(ds)) { streak++ } else break
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-purple-600 hover:text-purple-800 font-medium">← Back</button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Study Streak 🔥</h1>
        </div>

        {/* Streak Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4 shadow-lg border border-purple-100 text-center">
          <div className="text-6xl font-black text-purple-700 dark:text-purple-300">{streak}</div>
          <div className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Day Streak 🔥</div>
          <div className="mt-3 text-sm text-gray-400">{studyDates.length} total study days</div>
          {streak >= 7  && <div className="mt-2 text-xs bg-yellow-50 text-yellow-700 rounded-full px-3 py-1 inline-block">🏅 Week Warrior</div>}
          {streak >= 30 && <div className="mt-2 text-xs bg-orange-50 text-orange-700 rounded-full px-3 py-1 inline-block ml-1">🔥 Monthly Master</div>}
        </div>

        {/* Month Nav */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 flex items-center justify-center font-bold">‹</button>
            <span className="font-bold text-gray-800 dark:text-white">{monthName}</span>
            <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 flex items-center justify-center font-bold">›</button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-2">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} className="text-center text-xs font-bold text-gray-400 py-1">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstWeekday }).map((_,i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }, (_,i) => i+1).map(day => {
              const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
              const isStudy   = studyDates.includes(dateStr)
              const isToday   = dateStr === today.toISOString().split('T')[0]
              return (
                <div key={day} className={`
                  aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all
                  ${isStudy ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300'}
                  ${isToday ? 'ring-2 ring-purple-400 ring-offset-1' : ''}
                  ${!isStudy && !isToday ? 'hover:bg-purple-50' : ''}
                `}>
                  {isStudy ? '🔥' : day}
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 justify-center text-xs text-gray-500">
            <div className="flex items-center gap-1"><span className="w-4 h-4 bg-purple-600 rounded-full inline-block" /> Studied</div>
            <div className="flex items-center gap-1"><span className="w-4 h-4 border-2 border-purple-400 rounded-full inline-block" /> Today</div>
          </div>
        </div>

        {/* Weekly heatmap */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mt-4 shadow-lg border border-purple-100">
          <h3 className="font-bold text-gray-700 dark:text-white mb-3 text-sm">Last 12 Weeks</h3>
          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: 84 }, (_, i) => {
              const d = new Date(); d.setDate(d.getDate() - (83 - i)); d.setHours(0,0,0,0)
              const ds = d.toISOString().split('T')[0]
              const studied = studyDates.includes(ds)
              return (
                <div key={i} title={ds}
                  className={`w-4 h-4 rounded-sm transition-all ${studied ? 'bg-purple-600' : 'bg-gray-100 dark:bg-gray-700'}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LessonsPage() {
  const { progress, markLessonComplete, markVocabLearned, addQuizScore, addStudyMinutes, unlockAchievement } = useProgress()

  const [screen,      setScreen]      = useState<Screen>('map')
  const [mood,        setMood]        = useState<Mood>('idle')
  const [unit,        setUnit]        = useState<Unit | null>(null)
  const [flashWords,  setFlashWords]  = useState<VocabWord[]>([])
  const [flashIdx,    setFlashIdx]    = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)
  const [showMnemonic,setShowMnemonic]= useState(false)
  const [showRomaji,  setShowRomaji]  = useState(false)
  const [questions,   setQuestions]   = useState<QuizQ[]>([])
  const [qIdx,        setQIdx]        = useState(0)
  const [selected,    setSelected]    = useState<string | null>(null)
  const [score,       setScore]       = useState(0)
  const [wrongWords,  setWrongWords]  = useState<VocabWord[]>([])
  const [streak,      setStreak]      = useState(0)
  const [showConfetti,setShowConfetti]= useState(false)
  const [stars,       setStars]       = useState(0)
  const [hint,        setHint]        = useState<string | null>(null)
  const [studyDates,  setStudyDates]  = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('jlpt-study-dates')
    return saved ? JSON.parse(saved) : []
  })

  // Record today as a study day
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setStudyDates(prev => {
      const updated = prev.includes(today) ? prev : [...prev, today]
      localStorage.setItem('jlpt-study-dates', JSON.stringify(updated))
      return updated
    })
  }, [])

  // ── Start a unit ──────────────────────────────────────────────────────────
  const startUnit = useCallback((u: Unit) => {
    const words = vocabData.filter(v => v.category === u.category && v.level === u.level)
    const padded = words.length < 4
      ? [...words, ...shuffle(vocabData.filter(v => v.id !== words[0]?.id)).slice(0, 4 - words.length)]
      : words
    const selected = shuffle(padded).slice(0, Math.min(12, padded.length))
    setUnit(u); setFlashWords(selected); setFlashIdx(0)
    setShowMeaning(false); setShowMnemonic(false); setShowRomaji(false)
    setMood('thinking'); setScreen('flashcard')
  }, [])

  // ── Flashcard nav ─────────────────────────────────────────────────────────
  const nextFlash = useCallback(() => {
    if (flashIdx < flashWords.length - 1) {
      setFlashIdx(i => i + 1); setShowMeaning(false); setShowMnemonic(false); setShowRomaji(false)
      setMood('thinking')
    } else {
      // Build quiz synchronously from stable flashWords
      const qs = buildQuestions(flashWords)
      setQuestions(qs); setQIdx(0); setSelected(null)
      setScore(0); setWrongWords([]); setStreak(0); setHint(null)
      setMood('thinking'); setScreen('quiz')
    }
  }, [flashIdx, flashWords])

  const prevFlash = useCallback(() => {
    if (flashIdx > 0) {
      setFlashIdx(i => i - 1); setShowMeaning(false); setShowMnemonic(false)
    }
  }, [flashIdx])

  // ── Handle quiz answer ────────────────────────────────────────────────────
  const handleAnswer = useCallback((ans: string) => {
    if (selected !== null) return
    const q = questions[qIdx]
    const correct = ans === q.correct
    setSelected(ans)
    speak(q.word.furigana)
    if (correct) {
      const newStreak = streak + 1
      setStreak(newStreak)
      setScore(s => s + 1)
      setMood(newStreak >= 3 ? 'excited' : 'happy')
      markVocabLearned(q.word.id)
    } else {
      setStreak(0)
      setMood('sad')
      setWrongWords(prev => prev.find(w => w.id === q.word.id) ? prev : [...prev, q.word])
    }
    setTimeout(() => {
      setSelected(null); setHint(null)
      if (qIdx < questions.length - 1) {
        setQIdx(i => i + 1); setMood('thinking')
      } else {
        // Show results
        const finalScore = correct ? score + 1 : score
        const pct = Math.round((finalScore / questions.length) * 100)
        const s = pct === 100 ? 3 : pct >= 70 ? 2 : 1
        setStars(s); setShowConfetti(pct === 100)
        addQuizScore(unit?.title || 'Lesson', pct)
        markLessonComplete(unit?.id || '')
        addStudyMinutes(Math.round(questions.length * 0.5))
        if (pct === 100) unlockAchievement('perfect_lesson')
        if (s === 3) unlockAchievement('three_star')
        setMood(pct >= 70 ? 'excited' : 'sad')
        setScreen('result')
      }
    }, 1400)
  }, [selected, questions, qIdx, score, streak, unit, markVocabLearned, addQuizScore, markLessonComplete, addStudyMinutes, unlockAchievement])

  // ── Use hint (eliminate one wrong option) ─────────────────────────────────
  const useHint = useCallback(() => {
    if (!questions[qIdx] || hint) return
    const q = questions[qIdx]
    const wrong = q.options.find(o => o !== q.correct)
    setHint(wrong || null)
  }, [questions, qIdx, hint])

  // ── Retry wrong words ──────────────────────────────────────────────────────
  const retryWrong = useCallback(() => {
    if (wrongWords.length === 0) return
    const qs = buildQuestions(wrongWords)
    setQuestions(qs); setQIdx(0); setSelected(null)
    setScore(0); setWrongWords([]); setStreak(0); setHint(null)
    setMood('thinking'); setScreen('quiz')
  }, [wrongWords])

  // ─── Map Screen ─────────────────────────────────────────────────────────────
  if (screen === 'map') {
    const n5Units = UNITS.filter(u => u.level === 'N5')
    const n4Units = UNITS.filter(u => u.level === 'N4')
    const completedIds = new Set(progress.lessonsCompleted)

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pb-20">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-purple-100 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-black text-purple-700 dark:text-purple-300">📖 Lessons</h1>
          <button onClick={() => setScreen('calendar')}
            className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold px-4 py-2 rounded-full text-sm transition-all">
            🔥 {progress.streak} day streak · 📅 Calendar
          </button>
        </div>

        <div className="max-w-lg mx-auto px-4 pt-6 space-y-8">
          {/* N5 Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">N5</span>
              <span className="text-gray-500 text-sm font-medium">{n5Units.filter(u => completedIds.has(u.id)).length}/{n5Units.length} complete</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {n5Units.map((u, idx) => {
                const done = completedIds.has(u.id)
                const locked = idx > 0 && !completedIds.has(n5Units[idx - 1]?.id)
                const wordCount = vocabData.filter(v => v.category === u.category && v.level === u.level).length
                return (
                  <button key={u.id} onClick={() => !locked && startUnit(u)}
                    disabled={locked}
                    className={`relative rounded-2xl p-4 text-left transition-all shadow-md active:scale-95
                      ${locked ? 'bg-gray-100 dark:bg-gray-800 opacity-60 cursor-not-allowed' : 'hover:scale-102 cursor-pointer bg-white dark:bg-gray-800'}
                      ${done ? 'ring-2 ring-green-400' : ''}
                    `}
                    style={{ borderTop: `4px solid ${locked ? '#ccc' : u.color}` }}>
                    <div className="text-3xl mb-1">{locked ? '🔒' : u.emoji}</div>
                    <div className="font-bold text-gray-800 dark:text-white text-sm">{u.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{wordCount} words · ~{Math.ceil(wordCount * 0.5)} min</div>
                    {done && <div className="absolute top-2 right-2 text-yellow-400 text-lg">⭐</div>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* N4 Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">N4</span>
              <span className="text-gray-500 text-sm font-medium">{n4Units.filter(u => completedIds.has(u.id)).length}/{n4Units.length} complete</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {n4Units.map((u, idx) => {
                const done = completedIds.has(u.id)
                const allN5Done = n5Units.every(n => completedIds.has(n.id))
                const locked = !allN5Done || (idx > 0 && !completedIds.has(n4Units[idx - 1]?.id))
                const wordCount = vocabData.filter(v => v.category === u.category && v.level === u.level).length
                return (
                  <button key={u.id} onClick={() => !locked && startUnit(u)}
                    disabled={locked}
                    className={`relative rounded-2xl p-4 text-left transition-all shadow-md active:scale-95
                      ${locked ? 'bg-gray-100 dark:bg-gray-800 opacity-60 cursor-not-allowed' : 'hover:scale-102 cursor-pointer bg-white dark:bg-gray-800'}
                      ${done ? 'ring-2 ring-green-400' : ''}
                    `}
                    style={{ borderTop: `4px solid ${locked ? '#ccc' : u.color}` }}>
                    <div className="text-3xl mb-1">{locked ? '🔒' : u.emoji}</div>
                    <div className="font-bold text-gray-800 dark:text-white text-sm">{u.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{wordCount} words · ~{Math.ceil(wordCount * 0.5)} min</div>
                    {done && <div className="absolute top-2 right-2 text-yellow-400 text-lg">⭐</div>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── Calendar Screen ─────────────────────────────────────────────────────────
  if (screen === 'calendar') {
    return <CalendarScreen onBack={() => setScreen('map')} studyDates={studyDates} />
  }

  // ─── Flashcard Screen ────────────────────────────────────────────────────────
  if (screen === 'flashcard') {
    const word = flashWords[flashIdx]
    if (!word) return null
    const isKanji = /[\u4E00-\u9FFF]/.test(word.japanese)

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
        {/* Progress bar */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => setScreen('map')} className="text-purple-600 text-sm font-medium hover:underline">← Back</button>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((flashIdx + 1) / flashWords.length) * 100}%` }} />
            </div>
            <span className="text-sm text-gray-500 font-medium">{flashIdx + 1}/{flashWords.length}</span>
          </div>
        </div>

        {/* Cat */}
        <div className="flex flex-col items-center px-4 py-2">
          <SpeechBubble mood={mood} />
          <NekoSan mood={mood} />
        </div>

        {/* Card */}
        <div className="flex-1 px-4 pb-6 flex flex-col gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 text-center border border-purple-100 dark:border-gray-700">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              {unit?.title} · {unit?.level}
            </div>

            {/* Japanese word */}
            <div className="text-5xl font-black text-gray-900 dark:text-white mb-1">{word.japanese}</div>

            {/* Furigana */}
            {isKanji && <div className="text-lg text-purple-500 mb-1">{word.furigana}</div>}

            {/* Romaji toggle */}
            <button onClick={() => setShowRomaji(r => !r)}
              className="text-xs text-gray-400 hover:text-purple-500 transition-colors mb-2">
              {showRomaji ? word.romaji : 'Show romaji'}
            </button>

            {/* Stroke display */}
            {isKanji && <StrokeDisplay kanji={word.japanese[0]} />}

            {/* Hear it */}
            <button onClick={() => speak(word.furigana)}
              className="mt-3 flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium mx-auto transition-colors">
              🔊 Hear it
            </button>

            {/* Meaning flip */}
            {!showMeaning ? (
              <button onClick={() => { setShowMeaning(true); setMood('happy') }}
                className="mt-4 w-full py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 font-semibold hover:border-purple-400 hover:text-purple-600 transition-all">
                Show meaning
              </button>
            ) : (
              <div className="mt-4 space-y-3 text-left">
                {/* English */}
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-3 text-center">
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{word.english}</div>
                </div>

                {/* Example sentence */}
                {word.exampleJp && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-3">
                    <div className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-1">Example</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{word.exampleJp}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{word.exampleEn}</div>
                    <button onClick={() => speak(word.exampleJp || '')}
                      className="text-xs text-blue-500 hover:text-blue-700 mt-1">🔊 hear sentence</button>
                  </div>
                )}

                {/* Mnemonic */}
                <button onClick={() => setShowMnemonic(m => !m)}
                  className="w-full text-xs text-amber-600 hover:text-amber-800 font-medium py-1 transition-colors">
                  {showMnemonic ? '▲ Hide mnemonic' : '💡 Show memory trick'}
                </button>
                {showMnemonic && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-3 text-xs text-amber-800 dark:text-amber-200 italic">
                    {getMnemonic(word)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3">
            <button onClick={prevFlash} disabled={flashIdx === 0}
              className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-semibold disabled:opacity-30 hover:bg-gray-200 transition-all">
              ← Prev
            </button>
            <button onClick={nextFlash}
              className="flex-[2] py-3 rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 active:scale-95 transition-all">
              {flashIdx < flashWords.length - 1 ? 'Next →' : 'Start Quiz →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Quiz Screen ─────────────────────────────────────────────────────────────
  if (screen === 'quiz') {
    if (questions.length === 0 || qIdx >= questions.length) return null
    const q = questions[qIdx]

    const questionLabel = q.type === 'en2jp'
      ? `Which Japanese word means "${q.correct}"?`
      : q.type === 'audio'
      ? 'What does this word mean?'
      : `What does "${q.word.japanese}" mean?`

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
        {/* Progress bar */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => setScreen('map')} className="text-purple-600 text-sm font-medium">← Back</button>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(qIdx / questions.length) * 100}%` }} />
            </div>
            <span className="text-sm font-medium text-gray-500">{qIdx + 1}/{questions.length}</span>
            {streak >= 2 && <span className="text-sm font-bold text-orange-500">🔥{streak}</span>}
          </div>
        </div>

        {/* Cat */}
        <div className="flex flex-col items-center px-4 py-1">
          <SpeechBubble mood={mood} />
          <NekoSan mood={mood} />
        </div>

        {/* Question card */}
        <div className="flex-1 px-4 pb-6 flex flex-col gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-5 border border-purple-100 dark:border-gray-700">
            {/* Q type badge */}
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
              {q.type === 'audio' ? '🔊 Listening' : q.type === 'en2jp' ? '🇯🇵 English → Japanese' : '📖 Translation'}
              <span className="ml-auto text-purple-500 text-xs">{unit?.title} · {unit?.level}</span>
            </div>

            {/* Word display */}
            <div className="text-center mb-4">
              {q.type === 'audio' ? (
                <button onClick={() => speak(q.word.furigana)}
                  className="mx-auto w-20 h-20 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-4xl transition-all active:scale-95">
                  🔊
                </button>
              ) : q.type === 'en2jp' ? (
                <div className="text-3xl font-bold text-gray-800 dark:text-white">{q.word.english}</div>
              ) : (
                <>
                  <div className="text-4xl font-black text-gray-900 dark:text-white">{q.word.japanese}</div>
                  {/[\u4E00-\u9FFF]/.test(q.word.japanese) && (
                    <div className="text-base text-purple-400 mt-1">{q.word.furigana}</div>
                  )}
                </>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">{questionLabel}</div>
            </div>

            {/* Hear it again (for non-audio types) */}
            {q.type !== 'audio' && (
              <button onClick={() => speak(q.word.furigana)}
                className="flex items-center gap-1 text-xs text-purple-500 hover:text-purple-700 mx-auto mb-3 transition-colors">
                🔊 Tap to hear
              </button>
            )}

            {/* Options — 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt, i) => {
                const isEliminated = hint === opt
                const isSelected   = selected === opt
                const isCorrect    = opt === q.correct
                let btnClass = 'relative py-4 px-3 rounded-2xl border-2 font-semibold text-sm transition-all text-center '
                if (isEliminated) {
                  btnClass += 'border-gray-200 bg-gray-50 text-gray-300 line-through cursor-not-allowed'
                } else if (selected === null) {
                  btnClass += 'border-purple-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:border-purple-500 hover:bg-purple-50 active:scale-95 cursor-pointer'
                } else if (isCorrect) {
                  btnClass += 'border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 scale-102'
                } else if (isSelected) {
                  btnClass += 'border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                } else {
                  btnClass += 'border-gray-200 bg-gray-50 dark:bg-gray-800 text-gray-400 opacity-60'
                }

                // For en2jp type, show the Japanese word as option text
                const displayOpt = q.type === 'en2jp'
                  ? (vocabData.find(v => v.english === opt)?.japanese || opt)
                  : opt

                return (
                  <button key={i} onClick={() => !isEliminated && handleAnswer(opt)} className={btnClass} disabled={isEliminated}>
                    {selected !== null && isCorrect && <span className="absolute top-1 right-2 text-green-500">✓</span>}
                    {selected !== null && isSelected && !isCorrect && <span className="absolute top-1 right-2 text-red-500">✗</span>}
                    {displayOpt}
                  </button>
                )
              })}
            </div>

            {/* Hint button */}
            {selected === null && (
              <button onClick={useHint} className="mt-3 w-full text-xs text-amber-500 hover:text-amber-700 font-medium transition-colors py-1">
                {hint ? '✓ Hint used — one wrong answer removed' : '💡 Use hint (remove one wrong answer)'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ─── Result Screen ───────────────────────────────────────────────────────────
  if (screen === 'result') {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
        {showConfetti && <Confetti />}

        <NekoSan mood={mood} />
        <SpeechBubble mood={mood} />

        {/* Stars */}
        <div className="flex gap-2 mt-4 mb-2">
          {[1,2,3].map(s => (
            <span key={s} className={`text-4xl transition-all ${s <= stars ? 'opacity-100 scale-110' : 'opacity-20'}`}>⭐</span>
          ))}
        </div>

        <div className="text-5xl font-black text-purple-700 dark:text-purple-300 mt-2">{pct}%</div>
        <div className="text-gray-500 dark:text-gray-400 mt-1">{score} / {questions.length} correct</div>

        {/* Wrong words review */}
        {wrongWords.length > 0 && (
          <div className="w-full max-w-sm mt-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-red-100">
            <div className="text-sm font-bold text-red-500 mb-2">📝 Review these words:</div>
            <div className="space-y-2">
              {wrongWords.map(w => (
                <div key={w.id} className="flex items-center gap-3 text-sm">
                  <span className="font-bold text-gray-800 dark:text-white">{w.japanese}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-purple-600 dark:text-purple-300">{w.english}</span>
                  <button onClick={() => speak(w.furigana)} className="ml-auto text-purple-400 hover:text-purple-600">🔊</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-sm mt-6">
          {wrongWords.length > 0 && (
            <button onClick={retryWrong}
              className="py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-lg active:scale-95 transition-all">
              🔁 Retry Wrong Words ({wrongWords.length})
            </button>
          )}
          <button onClick={() => unit && startUnit(unit)}
            className="py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg active:scale-95 transition-all">
            🔄 Redo Lesson
          </button>
          <button onClick={() => { setScreen('map'); setMood('idle') }}
            className="py-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-purple-200 text-purple-700 dark:text-purple-300 font-bold text-lg hover:border-purple-400 active:scale-95 transition-all">
            🗺️ Back to Map
          </button>
        </div>
      </div>
    )
  }

  return null
}
