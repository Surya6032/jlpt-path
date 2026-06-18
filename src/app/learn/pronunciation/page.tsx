'use client'
import { pronunciationItems } from '@/data/misc'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Volume2 } from 'lucide-react'

function playAudio(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.75
    window.speechSynthesis.speak(u)
  }
}

export default function PronunciationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <Badge label="Beginner" variant="level" className="mb-2" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Pronunciation Guide — 発音</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">10 essential pronunciation lessons covering vowels, consonants, pitch accent, and speaking tips.</p>
      </div>

      <div className="space-y-5">
        {pronunciationItems.map((p, i) => (
          <Card key={p.id}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center text-sm font-bold text-brand-indigo flex-shrink-0">{i + 1}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{p.description}</p>
              </div>
            </div>
            <div className="space-y-2 ml-12">
              {p.examples.map((ex, j) => (
                <div key={j} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-2.5 flex-wrap">
                  <button onClick={() => playAudio(ex.jp)} className="text-brand-indigo hover:text-indigo-700 flex-shrink-0 p-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                    <Volume2 size={15} />
                  </button>
                  <span className="jp font-bold text-gray-900 dark:text-white w-32 text-sm">{ex.jp}</span>
                  <span className="text-sm text-brand-indigo font-mono flex-shrink-0">{ex.romaji}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{ex.note}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">🎤 Shadowing Practice</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">The best way to improve your pronunciation is shadowing — repeating what you hear immediately as you listen. Try this with any audio in the Listening section.</p>
        <Button size="sm" onClick={() => window.location.href = '/learn/listening'}>Go to Listening Practice →</Button>
      </Card>
    </div>
  )
}
