'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { useProgress } from '@/store/progress'
import { vocabData } from '@/data/vocab'
import type { VocabWord } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = 'map' | 'intro' | 'flashcard' | 'quiz' | 'result'
type Mood   = 'idle' | 'happy' | 'sad' | 'excited' | 'thinking'

interface QuizQ {
  word: VocabWord
  options: string[]   // 4 english strings
  correct: string     // the correct english
}

interface Unit {
  id: string
  title: string
  emoji: string
  level: 'N5' | 'N4'
  category: string
  color: string
}

// ─── Units ────────────────────────────────────────────────────────────────────
const UNITS: Unit[] = [
  { id:'u1',  title:'Greetings',       emoji:'👋', level:'N5', category:'Greetings',  color:'#461E96' },
  { id:'u2',  title:'Family',          emoji:'👨‍👩‍👧', level:'N5', category:'Family',     color:'#00B4E6' },
  { id:'u3',  title:'Numbers',         emoji:'🔢', level:'N5', category:'Numbers',    color:'#E6008C' },
  { id:'u4',  title:'Time',            emoji:'⏰', level:'N5', category:'Time',       color:'#00DC8C' },
  { id:'u5',  title:'Food & Drink',    emoji:'🍜', level:'N5', category:'Food',       color:'#735CCC' },
  { id:'u6',  title:'Daily Life',      emoji:'🏠', level:'N5', category:'Daily Life', color:'#461E96' },
  { id:'u7',  title:'School',          emoji:'📚', level:'N5', category:'School',     color:'#00B4E6' },
  { id:'u8',  title:'Locations',       emoji:'📍', level:'N5', category:'Locations',  color:'#E6008C' },
  { id:'u9',  title:'Weather',         emoji:'🌤',  level:'N5', category:'Weather',    color:'#00DC8C' },
  { id:'u10', title:'Adjectives',      emoji:'✨', level:'N5', category:'Adjectives', color:'#735CCC' },
  { id:'u11', title:'Verbs',           emoji:'⚡', level:'N5', category:'Verbs',      color:'#461E96' },
  { id:'u12', title:'Common Words',    emoji:'💬', level:'N5', category:'Common',     color:'#00B4E6' },
  { id:'u13', title:'Animals',         emoji:'🐾', level:'N4', category:'Animals',    color:'#E6008C' },
  { id:'u14', title:'Health',          emoji:'🏥', level:'N4', category:'Health',     color:'#00DC8C' },
  { id:'u15', title:'Nature',          emoji:'🌸', level:'N4', category:'Nature',     color:'#735CCC' },
  { id:'u16', title:'Seasons',         emoji:'🍂', level:'N4', category:'Seasons',    color:'#461E96' },
  { id:'u17', title:'Society',         emoji:'🌏', level:'N4', category:'Society',    color:'#00B4E6' },
  { id:'u18', title:'Travel',          emoji:'✈️', level:'N4', category:'Travel',     color:'#E6008C' },
  { id:'u19', title:'Work',            emoji:'💼', level:'N4', category:'Work',       color:'#00DC8C' },
  { id:'u20', title:'Adverbs',         emoji:'🔤', level:'N4', category:'Adverbs',    color:'#735CCC' },
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
  u.lang = 'ja-JP'
  u.rate = 0.8
  window.speechSynthesis.speak(u)
}

// Build quiz questions — completely self-contained, no external state
function buildQuestions(words: VocabWord[]): QuizQ[] {
  const allEnglish = vocabData.map(v => v.english)
  return shuffle(words).slice(0, 8).map(word => {
    const distractors = shuffle(
      allEnglish.filter(e => e !== word.english)
    ).slice(0, 3)
    const options = shuffle([word.english, ...distractors])
    return { word, options, correct: word.english }
  })
}

// ─── 3D SVG Cat Mascot ────────────────────────────────────────────────────────
function NekoCat({ mood }: { mood: Mood }) {
  const animations = `
    @keyframes bob      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes jump     { 0%,100%{transform:translateY(0) scaleY(1)} 40%{transform:translateY(-20px) scaleY(1.1)} 80%{transform:translateY(0) scaleY(0.9)} }
    @keyframes shake    { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
    @keyframes blink    { 0%,90%,100%{transform:scaleY(1)} 95%{transform:scaleY(0.05)} }
    @keyframes tailWag  { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
    @keyframes tailDrop { 0%,100%{transform:rotate(10deg)} 50%{transform:rotate(-10deg)} }
    @keyframes tearDrop { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(14px);opacity:0} }
    @keyframes starSpin { 0%{transform:rotate(0deg) scale(0)} 50%{transform:rotate(180deg) scale(1)} 100%{transform:rotate(360deg) scale(0)} }
    @keyframes blush    { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
    @keyframes breathe  { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.04)} }
  `
  const anim =
    mood === 'happy'   ? 'jump 0.6s ease' :
    mood === 'excited' ? 'jump 0.5s ease infinite' :
    mood === 'sad'     ? 'shake 0.5s ease' :
    mood === 'thinking'? 'bob 1.2s ease infinite' :
    'bob 2s ease infinite'

  const eyeLeft  = mood === 'happy' || mood === 'excited'
    ? <path d="M62 88 Q69 82 76 88" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    : mood === 'sad'
    ? <path d="M62 92 Q69 98 76 92" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    : <><ellipse cx="69" cy="89" rx="7" ry="7" fill="white"/><ellipse cx="70" cy="89" rx="3.5" ry="4" fill="#1a1a2e" style={{animation:'blink 3.5s ease infinite'}}/><ellipse cx="71" cy="87" rx="1.2" ry="1.2" fill="white"/></>

  const eyeRight = mood === 'happy' || mood === 'excited'
    ? <path d="M94 88 Q101 82 108 88" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    : mood === 'sad'
    ? <path d="M94 92 Q101 98 108 92" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
    : <><ellipse cx="101" cy="89" rx="7" ry="7" fill="white"/><ellipse cx="102" cy="89" rx="3.5" ry="4" fill="#1a1a2e" style={{animation:'blink 3.5s ease infinite 0.3s'}}/><ellipse cx="103" cy="87" rx="1.2" ry="1.2" fill="white"/></>

  const tailAnim = mood === 'happy' || mood === 'excited' ? 'tailWag 0.4s ease infinite' :
                   mood === 'sad' ? 'tailDrop 2s ease infinite' : 'tailWag 2s ease infinite'

  const showBlush  = mood === 'happy' || mood === 'excited'
  const showTears  = mood === 'sad'
  const showStars  = mood === 'happy' || mood === 'excited'

  return (
    <div style={{ width:170, height:220, position:'relative', filter:'drop-shadow(0 8px 16px rgba(70,30,150,0.35))' }}>
      <style>{animations}</style>
      <svg viewBox="0 0 170 220" width="170" height="220" style={{ animation: anim, transformOrigin:'bottom center' }}>
        <defs>
          <radialGradient id="bodyGrad" cx="38%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#7B52D4"/>
            <stop offset="60%" stopColor="#461E96"/>
            <stop offset="100%" stopColor="#2B1060"/>
          </radialGradient>
          <radialGradient id="headGrad" cx="35%" cy="28%" r="62%">
            <stop offset="0%" stopColor="#8A64DC"/>
            <stop offset="55%" stopColor="#5B2DB8"/>
            <stop offset="100%" stopColor="#2B1060"/>
          </radialGradient>
          <radialGradient id="bellyGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#E8E0FF"/>
            <stop offset="100%" stopColor="#C5B8F0"/>
          </radialGradient>
          <radialGradient id="earGrad" cx="30%" cy="20%" r="70%">
            <stop offset="0%" stopColor="#9B7AE0"/>
            <stop offset="100%" stopColor="#3A1880"/>
          </radialGradient>
        </defs>

        {/* Tail */}
        <path d="M115 175 Q150 160 148 140 Q146 120 132 118"
          fill="none" stroke="url(#bodyGrad)" strokeWidth="14" strokeLinecap="round"
          style={{ transformOrigin:'115px 175px', animation: tailAnim }}/>
        <path d="M115 175 Q150 160 148 140 Q146 120 132 118"
          fill="none" stroke="#7B52D4" strokeWidth="8" strokeLinecap="round"
          style={{ transformOrigin:'115px 175px', animation: tailAnim, opacity:0.6 }}/>

        {/* Body */}
        <ellipse cx="85" cy="165" rx="42" ry="48" fill="url(#bodyGrad)"/>
        <ellipse cx="85" cy="185" rx="28" ry="16" fill="rgba(0,0,0,0.15)"/>

        {/* Belly */}
        <ellipse cx="85" cy="165" rx="22" ry="28" fill="url(#bellyGrad)"
          style={{ animation:'breathe 3s ease infinite' }}/>

        {/* Left ear */}
        <polygon points="52,68 42,38 68,55" fill="url(#earGrad)"/>
        <polygon points="55,66 47,44 66,57" fill="#FF8FAB" opacity="0.8"/>

        {/* Right ear */}
        <polygon points="118,68 128,38 102,55" fill="url(#earGrad)"/>
        <polygon points="115,66 123,44 104,57" fill="#FF8FAB" opacity="0.8"/>

        {/* Head */}
        <ellipse cx="85" cy="84" rx="38" ry="36" fill="url(#headGrad)"/>
        {/* Head highlight */}
        <ellipse cx="74" cy="72" rx="18" ry="13" fill="white" opacity="0.12" transform="rotate(-20,74,72)"/>

        {/* Whiskers left */}
        <line x1="30" y1="96" x2="62" y2="98" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
        <line x1="28" y1="102" x2="62" y2="101" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
        <line x1="32" y1="108" x2="62" y2="105" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
        {/* Whiskers right */}
        <line x1="108" y1="98" x2="140" y2="96" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
        <line x1="108" y1="101" x2="142" y2="102" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
        <line x1="108" y1="105" x2="138" y2="108" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>

        {/* Eyes */}
        {eyeLeft}
        {eyeRight}

        {/* Nose */}
        <polygon points="85,100 82,105 88,105" fill="#FF8FAB"/>
        {/* Mouth */}
        <path d="M82 106 Q85 110 88 106" stroke="#FF6B8A" strokeWidth="1.5" fill="none"/>

        {/* Blush */}
        {showBlush && <>
          <ellipse cx="60" cy="100" rx="10" ry="6" fill="#FF8FAB"
            style={{ animation:'blush 1s ease infinite', opacity:0.7 }}/>
          <ellipse cx="110" cy="100" rx="10" ry="6" fill="#FF8FAB"
            style={{ animation:'blush 1s ease infinite 0.5s', opacity:0.7 }}/>
        </>}

        {/* Tears */}
        {showTears && <>
          <ellipse cx="65" cy="98" rx="3" ry="3" fill="#80DEFF" opacity="0.9"
            style={{ animation:'tearDrop 1.2s ease infinite' }}/>
          <ellipse cx="105" cy="98" rx="3" ry="3" fill="#80DEFF" opacity="0.9"
            style={{ animation:'tearDrop 1.2s ease infinite 0.4s' }}/>
        </>}

        {/* Stars */}
        {showStars && <>
          <text x="25" y="55" fontSize="16" style={{ animation:'starSpin 1s ease infinite' }}>✨</text>
          <text x="128" y="50" fontSize="14" style={{ animation:'starSpin 1s ease infinite 0.3s' }}>⭐</text>
        </>}

        {/* Paws */}
        <ellipse cx="62" cy="210" rx="16" ry="10" fill="url(#bodyGrad)"/>
        <ellipse cx="108" cy="210" rx="16" ry="10" fill="url(#bodyGrad)"/>
        {/* Toe beans */}
        <ellipse cx="58" cy="213" rx="3" ry="2" fill="rgba(255,143,171,0.6)"/>
        <ellipse cx="65" cy="214" rx="3" ry="2" fill="rgba(255,143,171,0.6)"/>
        <ellipse cx="104" cy="213" rx="3" ry="2" fill="rgba(255,143,171,0.6)"/>
        <ellipse cx="111" cy="214" rx="3" ry="2" fill="rgba(255,143,171,0.6)"/>
      </svg>
    </div>
  )
}

// ─── Speech Bubble ─────────────────────────────────────────────────────────────
function Bubble({ text }: { text: string }) {
  return (
    <div style={{
      position:'relative', background:'white',
      border:'2px solid #461E96', borderRadius:16,
      padding:'10px 18px', fontSize:14, fontWeight:600,
      color:'#461E96', maxWidth:220, textAlign:'center',
      boxShadow:'0 4px 12px rgba(70,30,150,0.15)',
      marginBottom:8
    }}>
      {text}
      <div style={{
        position:'absolute', bottom:-12, left:'50%',
        transform:'translateX(-50%)',
        width:0, height:0,
        borderLeft:'8px solid transparent',
        borderRight:'8px solid transparent',
        borderTop:'12px solid #461E96'
      }}/>
      <div style={{
        position:'absolute', bottom:-9, left:'50%',
        transform:'translateX(-50%)',
        width:0, height:0,
        borderLeft:'7px solid transparent',
        borderRight:'7px solid transparent',
        borderTop:'11px solid white'
      }}/>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function LessonsPage() {
  const { progress, markLessonComplete, markVocabLearned, addQuizScore, addStudyMinutes } = useProgress()

  // ── state ──
  const [screen,     setScreen]     = useState<Screen>('map')
  const [unit,       setUnit]       = useState<Unit | null>(null)
  const [mood,       setMood]       = useState<Mood>('idle')
  const [bubble,     setBubble]     = useState('にゃ！')

  // Flashcard state
  const [flashWords, setFlashWords] = useState<VocabWord[]>([])
  const [flashIdx,   setFlashIdx]   = useState(0)
  const [showMeaning,setShowMeaning]= useState(false)

  // Quiz state — stored as plain local variables passed down, no async state
  const [questions,  setQuestions]  = useState<QuizQ[]>([])
  const [qIdx,       setQIdx]       = useState(0)
  const [selected,   setSelected]   = useState<string | null>(null)
  const [score,      setScore]      = useState(0)
  const [streak,     setStreak]     = useState(0)

  // ── cat bubble helper ──
  const say = useCallback((text: string, m: Mood) => {
    setBubble(text)
    setMood(m)
  }, [])

  // idle loop
  useEffect(() => {
    if (screen !== 'map') return
    const phrases = ['にゃ！', 'がんばって！', '練習しよう！', 'ฅ^•ω•^ฅ', 'Let\'s study!']
    let i = 0
    const t = setInterval(() => { i = (i+1)%phrases.length; setBubble(phrases[i]) }, 3000)
    return () => clearInterval(t)
  }, [screen])

  // ── start unit ──
  function startUnit(u: Unit) {
    const pool = vocabData.filter(v => v.category === u.category)
    const words = shuffle(pool.length >= 5 ? pool : [...pool, ...shuffle(vocabData).slice(0, 12 - pool.length)]).slice(0, 12)
    setUnit(u)
    setFlashWords(words)
    setFlashIdx(0)
    setShowMeaning(false)
    setScreen('intro')
    say(`Let\'s learn ${u.title}! にゃ`, 'excited')
  }

  // ── flashcard controls ──
  function handleShowMeaning() {
    setShowMeaning(true)
    say('Remember this! にゃ', 'thinking')
    speak(flashWords[flashIdx].furigana)
  }

  function handleNextFlash() {
    const next = flashIdx + 1
    if (next >= flashWords.length) {
      // Build quiz immediately with the words we have right here
      const qs = buildQuestions(flashWords)
      setQuestions(qs)
      setQIdx(0)
      setScore(0)
      setStreak(0)
      setSelected(null)
      setScreen('quiz')
      say('Quiz time! にゃ？', 'thinking')
    } else {
      setFlashIdx(next)
      setShowMeaning(false)
      say('Next word! にゃ', 'idle')
    }
  }

  // ── quiz answer ──
  function handleAnswer(choice: string) {
    if (selected !== null) return   // already answered
    const q = questions[qIdx]
    const correct = choice === q.correct

    setSelected(choice)

    if (correct) {
      const newStreak = streak + 1
      setStreak(newStreak)
      setScore(s => s + 1)
      markVocabLearned(q.word.id)
      speak(q.word.furigana)
      if (newStreak >= 3) say('Amazing streak! にゃ！！', 'excited')
      else say('Correct! にゃ！', 'happy')
    } else {
      setStreak(0)
      speak(q.word.furigana)
      say('Not quite... にゃ', 'sad')
    }

    // Advance after 1.4s — we capture qIdx + questions locally to avoid stale refs
    const nextQIdx = qIdx + 1
    const totalQs  = questions.length
    setTimeout(() => {
      if (nextQIdx >= totalQs) {
        // Done
        const finalScore = correct ? score + 1 : score
        const pct = Math.round((finalScore / totalQs) * 100)
        addQuizScore(unit?.title ?? 'Lessons', pct)
        addStudyMinutes(5)
        if (unit) markLessonComplete(unit.id)
        setScreen('result')
        if (pct >= 80) say('Excellent! にゃ！', 'excited')
        else if (pct >= 50) say('Good job! にゃ！', 'happy')
        else say('Keep practicing! にゃ', 'sad')
      } else {
        setQIdx(nextQIdx)
        setSelected(null)
        say('Think carefully... にゃ？', 'thinking')
      }
    }, 1400)
  }

  // ── computed ──
  const flashWord  = flashWords[flashIdx] ?? null
  const currentQ   = questions[qIdx]      ?? null
  const totalQ     = questions.length

  // ── screens ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg,#f8f4ff 0%,#e8f4ff 100%)', padding:'24px 16px' }}>

      {/* ── MAP ── */}
      {screen === 'map' && (
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <h1 style={{ fontSize:28, fontWeight:800, color:'#461E96', marginBottom:4 }}>📚 Lessons</h1>
          <p style={{ color:'#666', marginBottom:24 }}>Choose a unit to start learning vocabulary</p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:16 }}>
            {UNITS.map(u => {
              const done = progress.lessonsCompleted.includes(u.id)
              return (
                <button key={u.id} onClick={() => startUnit(u)} style={{
                  background: done ? `${u.color}22` : 'white',
                  border: `2px solid ${done ? u.color : '#e0d4ff'}`,
                  borderRadius:16, padding:20, cursor:'pointer',
                  textAlign:'left', transition:'all 0.2s',
                  boxShadow: done ? `0 4px 12px ${u.color}33` : '0 2px 8px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                  <div style={{ fontSize:32, marginBottom:8 }}>{u.emoji}</div>
                  <div style={{ fontWeight:700, color:'#1a1a2e', fontSize:14 }}>{u.title}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:6 }}>
                    <span style={{
                      fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:20,
                      background: u.level === 'N5' ? '#461E9622' : '#E6008C22',
                      color: u.level === 'N5' ? '#461E96' : '#E6008C'
                    }}>{u.level}</span>
                    {done && <span style={{ fontSize:11, color:u.color }}>✓ Done</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── INTRO ── */}
      {screen === 'intro' && unit && (
        <div style={{ maxWidth:480, margin:'0 auto', textAlign:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, marginBottom:24 }}>
            <Bubble text={bubble}/>
            <NekoCat mood={mood}/>
          </div>
          <div style={{
            background:'white', borderRadius:20, padding:32,
            boxShadow:'0 4px 24px rgba(70,30,150,0.12)', marginBottom:24
          }}>
            <div style={{ fontSize:48, marginBottom:12 }}>{unit.emoji}</div>
            <h2 style={{ fontSize:24, fontWeight:800, color:'#1a1a2e', marginBottom:8 }}>{unit.title}</h2>
            <p style={{ color:'#666', marginBottom:4 }}>
              {flashWords.length} words · {unit.level} level
            </p>
            <p style={{ color:'#888', fontSize:13 }}>
              Review flashcards, then take a quiz to test yourself!
            </p>
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button onClick={() => { setScreen('map'); say('にゃ！', 'idle') }} style={{
              flex:1, padding:'14px 0', borderRadius:12, border:'2px solid #e0d4ff',
              background:'white', color:'#461E96', fontWeight:700, fontSize:15, cursor:'pointer'
            }}>← Back</button>
            <button onClick={() => { setScreen('flashcard'); say('Let\'s go! にゃ！', 'excited') }} style={{
              flex:2, padding:'14px 0', borderRadius:12, border:'none',
              background:'linear-gradient(135deg,#461E96,#735CCC)',
              color:'white', fontWeight:700, fontSize:15, cursor:'pointer',
              boxShadow:'0 4px 12px rgba(70,30,150,0.4)'
            }}>Start Lesson →</button>
          </div>
        </div>
      )}

      {/* ── FLASHCARD ── */}
      {screen === 'flashcard' && flashWord && (
        <div style={{ maxWidth:480, margin:'0 auto', textAlign:'center' }}>
          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <button onClick={() => setScreen('map')} style={{
              background:'none', border:'none', color:'#461E96',
              fontWeight:700, fontSize:14, cursor:'pointer', padding:0
            }}>← Back</button>
            <div style={{ flex:1, height:8, background:'#e0d4ff', borderRadius:4 }}>
              <div style={{
                height:8, borderRadius:4, transition:'width 0.4s',
                background:'linear-gradient(90deg,#461E96,#735CCC)',
                width:`${((flashIdx+1)/flashWords.length)*100}%`
              }}/>
            </div>
            <span style={{ color:'#461E96', fontWeight:700, fontSize:14 }}>{flashIdx+1}/{flashWords.length}</span>
          </div>

          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, marginBottom:16 }}>
            <Bubble text={bubble}/>
            <NekoCat mood={mood}/>
          </div>

          <div style={{
            background:'white', borderRadius:20, padding:32,
            boxShadow:'0 4px 24px rgba(70,30,150,0.12)', marginBottom:20
          }}>
            <p style={{ fontSize:11, fontWeight:700, color:'#888', letterSpacing:2, marginBottom:12 }}>
              {unit?.title?.toUpperCase()} · {flashWord.level}
            </p>
            <div style={{ fontSize:52, fontWeight:900, color:'#1a1a2e', marginBottom:8, lineHeight:1.1 }}>
              {flashWord.japanese}
            </div>
            <div style={{ fontSize:18, color:'#461E96', marginBottom:12 }}>{flashWord.furigana}</div>
            <button onClick={() => speak(flashWord.furigana)} style={{
              background:'none', border:'none', color:'#00B4E6',
              fontWeight:600, fontSize:14, cursor:'pointer', marginBottom:16
            }}>🔊 Hear it</button>

            {showMeaning ? (
              <div style={{ animation:'fadeIn 0.3s ease' }}>
                <div style={{
                  background:'linear-gradient(135deg,#f8f4ff,#e8f4ff)',
                  borderRadius:12, padding:16, marginBottom:8
                }}>
                  <p style={{ fontSize:22, fontWeight:800, color:'#1a1a2e', margin:0 }}>{flashWord.english}</p>
                  <p style={{ fontSize:13, color:'#666', margin:'4px 0 0' }}>{flashWord.romaji}</p>
                </div>
                {flashWord.exampleJp && (
                  <p style={{ fontSize:13, color:'#888', fontStyle:'italic', margin:'8px 0 0' }}>
                    {flashWord.exampleJp}
                  </p>
                )}
              </div>
            ) : (
              <button onClick={handleShowMeaning} style={{
                width:'100%', padding:'14px 0', borderRadius:12,
                border:'2px solid #e0d4ff', background:'white',
                color:'#461E96', fontWeight:700, fontSize:15, cursor:'pointer'
              }}>Show meaning</button>
            )}
          </div>

          {showMeaning && (
            <button onClick={handleNextFlash} style={{
              width:'100%', padding:'16px 0', borderRadius:12, border:'none',
              background:'linear-gradient(135deg,#461E96,#735CCC)',
              color:'white', fontWeight:700, fontSize:16, cursor:'pointer',
              boxShadow:'0 4px 12px rgba(70,30,150,0.4)'
            }}>
              {flashIdx + 1 >= flashWords.length ? '🎯 Take Quiz →' : 'Next →'}
            </button>
          )}
        </div>
      )}

      {/* ── QUIZ ── */}
      {screen === 'quiz' && currentQ && (
        <div style={{ maxWidth:520, margin:'0 auto', textAlign:'center' }}>
          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            <span style={{ color:'#461E96', fontWeight:700, fontSize:14 }}>Question {qIdx+1}/{totalQ}</span>
            <div style={{ flex:1, height:8, background:'#e0d4ff', borderRadius:4 }}>
              <div style={{
                height:8, borderRadius:4, transition:'width 0.4s',
                background:'linear-gradient(90deg,#461E96,#735CCC)',
                width:`${((qIdx+1)/totalQ)*100}%`
              }}/>
            </div>
            <span style={{ color:'#00DC8C', fontWeight:700, fontSize:14 }}>⭐ {score}</span>
          </div>

          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, marginBottom:16 }}>
            <Bubble text={bubble}/>
            <NekoCat mood={mood}/>
          </div>

          {/* Word card */}
          <div style={{
            background:'white', borderRadius:20, padding:24,
            boxShadow:'0 4px 24px rgba(70,30,150,0.12)', marginBottom:20
          }}>
            <p style={{ fontSize:11, fontWeight:700, color:'#888', letterSpacing:2, marginBottom:8 }}>
              What does this mean?
            </p>
            <div style={{ fontSize:48, fontWeight:900, color:'#1a1a2e', marginBottom:6 }}>
              {currentQ.word.japanese}
            </div>
            <div style={{ fontSize:16, color:'#461E96' }}>{currentQ.word.furigana}</div>
            <button onClick={() => speak(currentQ.word.furigana)} style={{
              background:'none', border:'none', color:'#00B4E6',
              fontWeight:600, fontSize:13, cursor:'pointer', marginTop:8
            }}>🔊 Hear it</button>
          </div>

          {/* Options */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {currentQ.options.map((opt, i) => {
              const isSelected = selected === opt
              const isCorrect  = opt === currentQ.correct
              const answered   = selected !== null

              let bg = 'white'
              let border = '2px solid #e0d4ff'
              let color = '#1a1a2e'
              let shadow = '0 2px 8px rgba(0,0,0,0.06)'

              if (answered && isCorrect) {
                bg = '#e8fff5'; border = '2px solid #00DC8C'; color = '#00995E'; shadow = '0 4px 12px rgba(0,220,140,0.3)'
              } else if (answered && isSelected && !isCorrect) {
                bg = '#fff0f5'; border = '2px solid #E6008C'; color = '#C0006A'; shadow = '0 4px 12px rgba(230,0,140,0.2)'
              }

              return (
                <button key={i} onClick={() => handleAnswer(opt)} disabled={answered} style={{
                  background: bg, border, borderRadius:14, padding:'16px 12px',
                  color, fontWeight:600, fontSize:14, cursor: answered ? 'default' : 'pointer',
                  boxShadow: shadow, transition:'all 0.25s', textAlign:'center',
                  transform: answered && isCorrect ? 'scale(1.03)' : 'scale(1)'
                }}>
                  {answered && isCorrect && <span style={{ marginRight:6 }}>✅</span>}
                  {answered && isSelected && !isCorrect && <span style={{ marginRight:6 }}>❌</span>}
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {screen === 'result' && unit && (
        <div style={{ maxWidth:480, margin:'0 auto', textAlign:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, marginBottom:24 }}>
            <Bubble text={bubble}/>
            <NekoCat mood={mood}/>
          </div>

          <div style={{
            background:'white', borderRadius:20, padding:40,
            boxShadow:'0 4px 24px rgba(70,30,150,0.12)', marginBottom:24
          }}>
            <div style={{ fontSize:64, marginBottom:16 }}>
              {score / totalQ >= 0.8 ? '🎉' : score / totalQ >= 0.5 ? '👍' : '💪'}
            </div>
            <h2 style={{ fontSize:28, fontWeight:800, color:'#1a1a2e', margin:'0 0 8px' }}>
              {score}/{totalQ} Correct
            </h2>
            <div style={{
              fontSize:48, fontWeight:900, marginBottom:8,
              background:'linear-gradient(135deg,#461E96,#E6008C)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
            }}>
              {Math.round((score/totalQ)*100)}%
            </div>
            <p style={{ color:'#666', marginBottom:0 }}>
              {score / totalQ >= 0.8 ? 'Outstanding! You\'ve mastered this unit! 🌟' :
               score / totalQ >= 0.5 ? 'Good effort! Keep practicing to improve!' :
               'Don\'t give up! Review and try again!'}
            </p>
          </div>

          <div style={{ display:'flex', gap:12 }}>
            <button onClick={() => startUnit(unit)} style={{
              flex:1, padding:'14px 0', borderRadius:12, border:'2px solid #e0d4ff',
              background:'white', color:'#461E96', fontWeight:700, fontSize:15, cursor:'pointer'
            }}>🔄 Try Again</button>
            <button onClick={() => { setScreen('map'); say('にゃ！', 'idle') }} style={{
              flex:1, padding:'14px 0', borderRadius:12, border:'none',
              background:'linear-gradient(135deg,#461E96,#735CCC)',
              color:'white', fontWeight:700, fontSize:15, cursor:'pointer',
              boxShadow:'0 4px 12px rgba(70,30,150,0.4)'
            }}>📚 All Units</button>
          </div>
        </div>
      )}
    </div>
  )
}
