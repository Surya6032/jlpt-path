'use client'
import { useState, useMemo } from 'react'
import { vocabData } from '@/data/vocab'
import { grammarData } from '@/data/grammar'
import { kanjiData } from '@/data/kanji'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useProgress } from '@/store/progress'
import { Brain, RefreshCcw, Trophy, Clock, Zap } from 'lucide-react'

type QuizType = 'vocab-mc' | 'kanji-mc' | 'grammar-mc' | 'mixed'
type Level = 'N5' | 'N4' | 'All'

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5) }

function buildVocabQuestion(level: Level) {
  const pool = vocabData.filter(v => level === 'All' || v.level === level)
  const word = pool[Math.floor(Math.random() * pool.length)]
  const others = pool.filter(v => v.id !== word.id && v.english !== word.english).sort(() => Math.random() - 0.5).slice(0, 3)
  const options = shuffle([...others.map(v => v.english), word.english])
  return { prompt: word.japanese + ' (' + word.romaji + ')', options, answer: options.indexOf(word.english), explanation: word.exampleJp + ' — ' + word.exampleEn }
}

function buildKanjiQuestion(level: Level) {
  const pool = kanjiData.filter(k => level === 'All' || k.level === level)
  const kanji = pool[Math.floor(Math.random() * pool.length)]
  const others = pool.filter(k => k.id !== kanji.id && k.meaning !== kanji.meaning).sort(() => Math.random() - 0.5).slice(0, 3)
  const options = shuffle([...others.map(k => k.meaning), kanji.meaning])
  return { prompt: kanji.kanji, options, answer: options.indexOf(kanji.meaning), explanation: kanji.exampleWord + ' (' + kanji.exampleReading + ') — ' + kanji.exampleSentenceEn }
}

function buildGrammarQuestion() {
  const questions = [
    { prompt: 'Which particle marks the topic of a sentence?', options: ['を', 'は', 'に', 'で'], answer: 1, explanation: 'は marks the topic. It is pronounced "wa" when used as a particle.' },
    { prompt: 'To express "I want to eat", use:', options: ['食べたいです', '食べています', '食べましょう', '食べてください'], answer: 0, explanation: 'たい attaches to the verb stem to express desire.' },
    { prompt: '"Let's go!" in Japanese is:', options: ['行きたい', '行きます', '行きましょう', '行ってください'], answer: 2, explanation: 'ましょう attached to the verb stem is used for suggestions.' },
    { prompt: 'Which means "I must study"?', options: ['勉強してもいい', '勉強しなければならない', '勉強しています', '勉強したい'], answer: 1, explanation: 'なければならない expresses obligation.' },
  ]
  return questions[Math.floor(Math.random() * questions.length)]
}

export default function QuizPage() {
  const { addQuizScore } = useProgress()
  const [quizType, setQuizType] = useState<QuizType | null>(null)
  const [level, setLevel] = useState<Level>('N5')
  const [count, setCount] = useState(10)
  const [questions, setQuestions] = useState<any[]>([])
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const buildQuestions = (type: QuizType, n: number) => {
    const qs = []
    for (let i = 0; i < n; i++) {
      if (type === 'vocab-mc') qs.push(buildVocabQuestion(level))
      else if (type === 'kanji-mc') qs.push(buildKanjiQuestion(level))
      else if (type === 'grammar-mc') qs.push(buildGrammarQuestion())
      else {
        const r = Math.random()
        if (r < 0.4) qs.push(buildVocabQuestion(level))
        else if (r < 0.7) qs.push(buildKanjiQuestion(level))
        else qs.push(buildGrammarQuestion())
      }
    }
    return qs
  }

  const start = (type: QuizType) => {
    setQuizType(type)
    const qs = buildQuestions(type, count)
    setQuestions(qs)
    setIdx(0); setAnswers([]); setSelected(null); setDone(false)
  }

  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
  }

  const next = () => {
    const newAnswers = [...answers, selected ?? -1]
    setAnswers(newAnswers)
    if (idx + 1 >= questions.length) {
      setDone(true)
      const s = newAnswers.filter((a, i) => a === questions[i].answer).length
      const pct = Math.round((s / questions.length) * 100)
      addQuizScore(quizType || 'mixed', pct)
    } else {
      setIdx(i => i + 1)
      setSelected(null)
    }
  }

  const score = answers.filter((a, i) => a === questions[i]?.answer).length

  if (!quizType) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <Brain size={28} className="text-brand-indigo" /> Quiz Engine
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Test your knowledge of vocabulary, kanji, and grammar.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {([
            { type: 'vocab-mc' as QuizType, title: 'Vocabulary Quiz', desc: 'Multiple choice — Japanese → English', icon: '📚', color: 'indigo' },
            { type: 'kanji-mc' as QuizType, title: 'Kanji Quiz', desc: 'Identify kanji meanings', icon: '漢', color: 'purple' },
            { type: 'grammar-mc' as QuizType, title: 'Grammar Quiz', desc: 'Test grammar knowledge', icon: '文', color: 'blue' },
            { type: 'mixed' as QuizType, title: 'Mixed Quiz', desc: 'Random vocab + kanji + grammar', icon: '🎲', color: 'pink' },
          ]).map(q => (
            <Card key={q.type} hover onClick={() => start(q.type)} className="cursor-pointer">
              <div className="text-3xl mb-3 jp">{q.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{q.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{q.desc}</p>
              <Button size="sm">Start Quiz →</Button>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quiz Settings</h3>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Level</label>
              <div className="flex gap-2">
                {(['N5','N4','All'] as Level[]).map(l => (
                  <Button key={l} size="sm" variant={level === l ? 'primary' : 'secondary'} onClick={() => setLevel(l)}>{l}</Button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Questions</label>
              <div className="flex gap-2">
                {[5,10,20].map(n => (
                  <Button key={n} size="sm" variant={count === n ? 'primary' : 'secondary'} onClick={() => setCount(n)}>{n}</Button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="max-w-lg mx-auto px-4 py-10 animate-fade-in">
        <Card className="text-center">
          <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📖'}</div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Quiz Complete!</h2>
          <div className="text-5xl font-extrabold text-brand-indigo mb-1">{pct}%</div>
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-6">{score} / {questions.length} correct</div>
          <ProgressBar value={score} max={questions.length} showPercent={false} className="mb-6" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {pct >= 80 ? '🎉 Excellent! You have a strong grasp of this material.' : pct >= 60 ? '👍 Good work! Review the questions you missed and try again.' : '📚 Keep studying! Review the material and come back for another attempt.'}
          </p>

          {/* Wrong answers review */}
          <div className="text-left mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Review Missed Questions</h3>
            {answers.map((a, i) => a !== questions[i].answer && (
              <div key={i} className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-xl p-3 mb-2">
                <div className="jp text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{questions[i].prompt}</div>
                <div className="text-xs text-red-600 dark:text-red-400 mb-1">Your answer: {questions[i].options[a] || 'No answer'}</div>
                <div className="text-xs text-green-600 dark:text-green-400 mb-1">Correct: {questions[i].options[questions[i].answer]}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{questions[i].explanation}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={() => start(quizType!)}><RefreshCcw size={14} /> Try Again</Button>
            <Button variant="secondary" onClick={() => setQuizType(null)}>New Quiz</Button>
          </div>
        </Card>
      </div>
    )
  }

  const q = questions[idx]
  return (
    <div className="max-w-lg mx-auto px-4 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <Badge label={level} variant="level" />
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{idx + 1} / {questions.length}</span>
        <Button variant="ghost" size="sm" onClick={() => setQuizType(null)}>Exit</Button>
      </div>
      <ProgressBar value={idx} max={questions.length} showPercent={false} className="mb-6" />

      <Card>
        <div className="text-center mb-8">
          <div className="jp text-5xl font-bold text-gray-900 dark:text-white mb-2">{q.prompt}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choose the correct answer</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {q.options.map((opt: string, i: number) => (
            <button key={i} onClick={() => handleAnswer(i)}
              className={`py-3 px-4 rounded-xl font-semibold text-sm border-2 transition-all ${selected !== null ? i === q.answer ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : i === selected ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'border-gray-100 dark:border-gray-700 text-gray-400' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/10'}`}>
              {opt}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="animate-fade-in">
            <div className={`text-sm font-semibold mb-2 ${selected === q.answer ? 'text-green-600' : 'text-red-500'}`}>
              {selected === q.answer ? '✓ Correct!' : `✗ The answer was: ${q.options[q.answer]}`}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{q.explanation}</div>
            <Button onClick={next} className="w-full">{idx + 1 >= questions.length ? 'See Results' : 'Next Question →'}</Button>
          </div>
        )}
      </Card>
    </div>
  )
}
