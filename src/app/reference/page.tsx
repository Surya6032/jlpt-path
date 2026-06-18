'use client'
import { useState } from 'react'
import { vocabData } from '@/data/vocab'
import { kanjiData } from '@/data/kanji'
import { grammarData } from '@/data/grammar'
import { dailyPhrases, pronunciationItems } from '@/data/misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Search, Volume2, BookOpen, Brain, Headphones } from 'lucide-react'

function playAudio(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.85
    window.speechSynthesis.speak(u)
  }
}

type Tab = 'search' | 'phrases' | 'pronunciation' | 'tips'

export default function ReferencePage() {
  const [tab, setTab] = useState<Tab>('search')
  const [query, setQuery] = useState('')

  const searchResults = query.trim().length < 2 ? [] : [
    ...vocabData.filter(v => v.japanese.includes(query) || v.english.toLowerCase().includes(query.toLowerCase()) || v.romaji.toLowerCase().includes(query.toLowerCase())).slice(0, 10).map(v => ({ type: 'vocab', data: v })),
    ...kanjiData.filter(k => k.kanji.includes(query) || k.meaning.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map(k => ({ type: 'kanji', data: k })),
    ...grammarData.filter(g => g.title.toLowerCase().includes(query.toLowerCase()) || g.meaning.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map(g => ({ type: 'grammar', data: g })),
  ]

  const studyTips = [
    { icon: '📅', title: 'Study a little every day', tip: 'Even 15 minutes daily beats 2 hours once a week. Consistency is everything in language learning.' },
    { icon: '🔊', title: 'Read aloud', tip: 'Always say what you are studying out loud. This builds pronunciation muscle memory and helps retention.' },
    { icon: '📝', title: 'Write what you learn', tip: 'Writing kanji and vocabulary by hand dramatically improves memory compared to passive reading.' },
    { icon: '🎧', title: 'Listen every day', tip: 'Exposure to natural Japanese speech (even 10 minutes a day) builds your ear for the language quickly.' },
    { icon: '🔁', title: 'Use spaced repetition', tip: 'Review items just before you forget them. The Review section is built for this — use it daily.' },
    { icon: '📖', title: 'Learn vocab in context', tip: 'Always study words with their example sentences. Context makes vocabulary stick 3× faster.' },
    { icon: '🎯', title: 'Focus on N5 first', tip: 'Don't rush to N4. A solid N5 foundation makes N4 dramatically easier to learn.' },
    { icon: '🧩', title: 'Learn grammar patterns as chunks', tip: 'Don't memorize grammar rules in isolation. Learn full example sentences as patterns you can reuse.' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          <BookOpen size={28} className="text-brand-indigo" /> Reference & Support
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Search across all content, browse daily phrases, pronunciation lessons, and study tips.</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['search','phrases','pronunciation','tips'] as Tab[]).map(t => (
          <Button key={t} variant={tab === t ? 'primary' : 'secondary'} size="sm" onClick={() => setTab(t)}>
            {t === 'search' ? '🔍 Search' : t === 'phrases' ? '💬 Daily Phrases' : t === 'pronunciation' ? '🎵 Pronunciation' : '💡 Study Tips'}
          </Button>
        ))}
      </div>

      {/* SEARCH */}
      {tab === 'search' && (
        <div>
          <div className="relative mb-6">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search vocabulary, kanji, grammar..." className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-indigo/20" autoFocus />
          </div>

          {query.length < 2 && (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <Search size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">Type at least 2 characters to search across vocabulary, kanji, and grammar.</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-3">
              {searchResults.map((r, i) => (
                <Card key={i}>
                  {r.type === 'vocab' && (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="jp text-xl font-bold text-gray-900 dark:text-white">{(r.data as any).japanese}</span>
                          <span className="text-sm text-gray-400">({(r.data as any).romaji})</span>
                          <Badge label={(r.data as any).level} variant="level" />
                          <Badge label="Vocab" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" />
                        </div>
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{(r.data as any).english}</div>
                        <div className="text-xs text-gray-400 mt-1 jp">{(r.data as any).exampleJp}</div>
                      </div>
                      <button onClick={() => playAudio((r.data as any).japanese)} className="p-1.5 text-gray-400 hover:text-brand-indigo"><Volume2 size={16} /></button>
                    </div>
                  )}
                  {r.type === 'kanji' && (
                    <div className="flex items-start gap-4">
                      <div className="jp text-4xl font-bold text-brand-indigo">{(r.data as any).kanji}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900 dark:text-white">{(r.data as any).meaning}</span>
                          <Badge label={(r.data as any).level} variant="level" />
                          <Badge label="Kanji" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">On: {(r.data as any).onyomi} · Kun: {(r.data as any).kunyomi}</div>
                        <div className="text-xs jp mt-1">{(r.data as any).exampleWord} ({(r.data as any).exampleReading})</div>
                      </div>
                    </div>
                  )}
                  {r.type === 'grammar' && (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 dark:text-white">{(r.data as any).title}</span>
                        <Badge label={(r.data as any).level} variant="level" />
                        <Badge label="Grammar" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">{(r.data as any).structure}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{(r.data as any).meaning}</div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {query.length >= 2 && searchResults.length === 0 && (
            <Card className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No results found for "{query}". Try a different term.</p>
            </Card>
          )}
        </div>
      )}

      {/* DAILY PHRASES */}
      {tab === 'phrases' && (
        <div className="space-y-3">
          {dailyPhrases.map(p => (
            <Card key={p.id} hover>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="jp text-xl font-bold text-gray-900 dark:text-white mb-1">{p.japanese}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">{p.romaji}</div>
                  <div className="text-sm font-semibold text-brand-indigo mb-2">{p.english}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2">{p.context}</div>
                </div>
                <button onClick={() => playAudio(p.japanese)} className="p-2 text-gray-400 hover:text-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl flex-shrink-0">
                  <Volume2 size={18} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* PRONUNCIATION */}
      {tab === 'pronunciation' && (
        <div className="space-y-4">
          {pronunciationItems.map(p => (
            <Card key={p.id}>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{p.description}</p>
              <div className="space-y-2">
                {p.examples.map((ex, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-2.5">
                    <button onClick={() => playAudio(ex.jp)} className="text-brand-indigo hover:text-indigo-700 flex-shrink-0"><Volume2 size={14} /></button>
                    <span className="jp font-bold text-gray-900 dark:text-white w-24">{ex.jp}</span>
                    <span className="text-sm text-brand-indigo font-mono">{ex.romaji}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{ex.note}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TIPS */}
      {tab === 'tips' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {studyTips.map((tip, i) => (
            <Card key={i} hover>
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.tip}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
