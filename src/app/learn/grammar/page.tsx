'use client'
import { useState } from 'react'
import { grammarData } from '@/data/grammar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useProgress } from '@/store/progress'
import { ChevronDown, ChevronUp, Volume2, CheckCircle } from 'lucide-react'

function playAudio(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.8
    window.speechSynthesis.speak(u)
  }
}

export default function GrammarPage() {
  const { progress, markGrammarMastered } = useProgress()
  const [level, setLevel] = useState<'All' | 'N5' | 'N4'>('All')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [quizId, setQuizId] = useState<string | null>(null)
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)

  const filtered = grammarData.filter(g => level === 'All' || g.level === level)

  const quizData: Record<string, { q: string; options: string[]; answer: number }> = {
    'g01': { q: 'Which is correct polite form for "I eat"?', options: ['食べるです', '食べます', '食べている', '食べた'], answer: 1 },
    'g02': { q: 'は is pronounced as:', options: ['ha', 'wa', 'ba', 'ya'], answer: 1 },
    'g04': { q: 'Which particle marks the direct object?', options: ['は', 'が', 'を', 'に'], answer: 2 },
    'g08': { q: 'To say "I want to go", use:', options: ['行きたい', '行きます', '行こう', '行った'], answer: 0 },
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Grammar — 文法</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">20 grammar points explained with examples, notes, and quizzes.</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['All','N5','N4'] as const).map(l => (
          <Button key={l} variant={level === l ? 'primary' : 'secondary'} size="sm" onClick={() => setLevel(l)}>{l}</Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(g => (
          <Card key={g.id} className={`transition-all ${expanded === g.id ? 'border-brand-indigo dark:border-indigo-600' : ''}`}>
            <button className="w-full text-left flex items-start justify-between gap-4" onClick={() => setExpanded(expanded === g.id ? null : g.id)}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <Badge label={g.level} variant="level" />
                  {progress.grammarMastered.includes(g.id) && <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1"><CheckCircle size={12} /> Mastered</span>}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{g.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded inline-block">{g.structure}</p>
              </div>
              <div className="text-gray-400 flex-shrink-0 mt-1">
                {expanded === g.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>

            {expanded === g.id && (
              <div className="mt-5 animate-fade-in space-y-5 pt-5 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Meaning</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{g.meaning}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Usage Notes</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{g.usageNotes}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Examples</h4>
                  <div className="space-y-3">
                    {g.examples.map((ex, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 flex items-start gap-3">
                        <div className="flex-1">
                          <div className="jp font-semibold text-gray-900 dark:text-white">{ex.jp}</div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{ex.furigana}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ex.en}</div>
                        </div>
                        <button onClick={() => playAudio(ex.jp)} className="p-1.5 text-gray-400 hover:text-brand-indigo rounded-lg">
                          <Volume2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">⚠ Common Mistakes</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-xl p-3">{g.commonMistakes}</p>
                </div>

                {/* Mini Quiz */}
                {quizData[g.id] && (
                  <div className="border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 bg-indigo-50/50 dark:bg-indigo-900/10">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-indigo mb-3">Quick Quiz</h4>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">{quizData[g.id].q}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quizData[g.id].options.map((opt, i) => (
                        <button key={i} onClick={() => quizId !== g.id && (setQuizId(g.id), setQuizAnswer(i))}
                          className={`py-2 px-3 rounded-lg text-sm font-medium border-2 transition-all ${quizId === g.id ? i === quizData[g.id].answer ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700' : i === quizAnswer ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600' : 'border-gray-100 dark:border-gray-700 text-gray-400' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/10'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    {quizId === g.id && (
                      <div className={`mt-2 text-sm font-semibold ${quizAnswer === quizData[g.id].answer ? 'text-green-600' : 'text-red-500'}`}>
                        {quizAnswer === quizData[g.id].answer ? '✓ Correct! Well done.' : `✗ The correct answer was: ${quizData[g.id].options[quizData[g.id].answer]}`}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {!progress.grammarMastered.includes(g.id)
                    ? <Button size="sm" onClick={() => markGrammarMastered(g.id)}>✓ Mark as Mastered</Button>
                    : <span className="text-sm text-green-600 dark:text-green-400 font-semibold flex items-center gap-1"><CheckCircle size={14} /> Mastered</span>
                  }
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
