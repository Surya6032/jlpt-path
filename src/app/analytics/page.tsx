'use client'
import { useProgress } from '@/store/progress'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { BarChart2, Flame, BookOpen, Brain, Clock, Star, TrendingUp, CheckCircle } from 'lucide-react'
import { vocabData } from '@/data/vocab'
import { kanjiData } from '@/data/kanji'
import { grammarData } from '@/data/grammar'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const mockWeek = [25, 40, 15, 0, 55, 30, 20]

export default function AnalyticsPage() {
  const { progress } = useProgress()

  const n5vocab = vocabData.filter(v => v.level === 'N5').length
  const n4vocab = vocabData.filter(v => v.level === 'N4').length
  const n5kanji = kanjiData.filter(k => k.level === 'N5').length
  const n4kanji = kanjiData.filter(k => k.level === 'N4').length
  const n5gram = grammarData.filter(g => g.level === 'N5').length
  const n4gram = grammarData.filter(g => g.level === 'N4').length

  const learnedN5vocab = progress.vocabLearned.filter(id => vocabData.find(v => v.id === id && v.level === 'N5')).length
  const learnedN4vocab = progress.vocabLearned.filter(id => vocabData.find(v => v.id === id && v.level === 'N4')).length
  const learnedN5kanji = progress.kanjiLearned.filter(id => kanjiData.find(k => k.id === id && k.level === 'N5')).length
  const learnedN4kanji = progress.kanjiLearned.filter(id => kanjiData.find(k => k.id === id && k.level === 'N4')).length

  const avgQuizScore = progress.quizScores.length > 0
    ? Math.round(progress.quizScores.reduce((s, q) => s + q.score, 0) / progress.quizScores.length)
    : 0

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          <BarChart2 size={28} className="text-brand-indigo" /> Progress Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Your complete study history and performance breakdown.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Flame, val: progress.streak, label: 'Day Streak', color: 'text-orange-500' },
          { icon: Clock, val: progress.totalStudyMinutes, label: 'Study Minutes', color: 'text-blue-500' },
          { icon: BookOpen, val: progress.vocabLearned.length, label: 'Words Learned', color: 'text-indigo-500' },
          { icon: Star, val: avgQuizScore + '%', label: 'Avg Quiz Score', color: 'text-yellow-500' },
        ].map(s => (
          <Card key={s.label} className="text-center">
            <s.icon size={22} className={s.color + ' mx-auto mb-2'} />
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.val}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Vocabulary progress */}
        <Card>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-brand-indigo" /> Vocabulary Progress
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-700 dark:text-gray-300 font-medium">N5 Vocabulary</span>
                <span className="text-gray-500 dark:text-gray-400">{learnedN5vocab}/{n5vocab}</span>
              </div>
              <ProgressBar value={learnedN5vocab} max={n5vocab} showPercent={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-700 dark:text-gray-300 font-medium">N4 Vocabulary</span>
                <span className="text-gray-500 dark:text-gray-400">{learnedN4vocab}/{n4vocab}</span>
              </div>
              <ProgressBar value={learnedN4vocab} max={n4vocab} showPercent={false} colorOverride="bg-purple-500" />
            </div>
          </div>
        </Card>

        {/* Kanji progress */}
        <Card>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="jp font-bold text-brand-indigo">漢</span> Kanji Progress
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-700 dark:text-gray-300 font-medium">N5 Kanji</span>
                <span className="text-gray-500 dark:text-gray-400">{learnedN5kanji}/{n5kanji}</span>
              </div>
              <ProgressBar value={learnedN5kanji} max={n5kanji} showPercent={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-700 dark:text-gray-300 font-medium">N4 Kanji</span>
                <span className="text-gray-500 dark:text-gray-400">{learnedN4kanji}/{n4kanji}</span>
              </div>
              <ProgressBar value={learnedN4kanji} max={n4kanji} showPercent={false} colorOverride="bg-purple-500" />
            </div>
          </div>
        </Card>

        {/* Grammar progress */}
        <Card>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Brain size={18} className="text-brand-indigo" /> Grammar Progress
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-700 dark:text-gray-300 font-medium">N5 Grammar</span>
                <span className="text-gray-500 dark:text-gray-400">{progress.grammarMastered.filter(id => grammarData.find(g => g.id === id && g.level === 'N5')).length}/{n5gram}</span>
              </div>
              <ProgressBar value={progress.grammarMastered.filter(id => grammarData.find(g => g.id === id && g.level === 'N5')).length} max={n5gram} showPercent={false} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-700 dark:text-gray-300 font-medium">N4 Grammar</span>
                <span className="text-gray-500 dark:text-gray-400">{progress.grammarMastered.filter(id => grammarData.find(g => g.id === id && g.level === 'N4')).length}/{n4gram}</span>
              </div>
              <ProgressBar value={progress.grammarMastered.filter(id => grammarData.find(g => g.id === id && g.level === 'N4')).length} max={n4gram} showPercent={false} colorOverride="bg-purple-500" />
            </div>
          </div>
        </Card>

        {/* Writing systems */}
        <Card>
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="jp font-bold text-brand-indigo">あ</span> Writing Systems
          </h2>
          <div className="space-y-4">
            <ProgressBar value={progress.hiraganaProgress} label="Hiragana" />
            <ProgressBar value={progress.katakanaProgress} label="Katakana" colorOverride="bg-purple-500" />
          </div>
        </Card>
      </div>

      {/* Weekly activity chart */}
      <Card className="mb-6">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-brand-indigo" /> Weekly Study Activity
        </h2>
        <div className="flex items-end gap-3 h-32">
          {weekDays.map((day, i) => {
            const h = mockWeek[i]
            const maxH = Math.max(...mockWeek)
            const barH = maxH > 0 ? Math.round((h / maxH) * 100) : 0
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{h > 0 ? h + 'm' : ''}</div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-t-lg overflow-hidden flex items-end" style={{ height: '80px' }}>
                  <div
                    className="w-full bg-brand-indigo rounded-t-lg transition-all"
                    style={{ height: `${barH}%`, minHeight: h > 0 ? '4px' : '0' }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{day}</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Quiz history */}
      <Card className="mb-6">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star size={18} className="text-brand-indigo" /> Quiz History
        </h2>
        {progress.quizScores.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No quiz scores yet. Take a quiz to see your history here.</p>
        ) : (
          <div className="space-y-3">
            {progress.quizScores.slice(-8).reverse().map((s, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{s.topic}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{s.date}</div>
                </div>
                <div className="flex items-center gap-3 flex-1 max-w-[200px]">
                  <ProgressBar value={s.score} showPercent={false} className="flex-1" colorOverride={s.score >= 80 ? 'bg-green-500' : s.score >= 60 ? 'bg-indigo-500' : 'bg-red-400'} />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 w-10 text-right">{s.score}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Achievements */}
      <Card>
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle size={18} className="text-brand-indigo" /> Achievements
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { id: 'first_lesson', label: 'First Lesson', icon: '📚', desc: 'Complete your first lesson' },
            { id: 'first_quiz', label: 'First Quiz', icon: '🧠', desc: 'Take your first quiz' },
            { id: 'streak_3', label: '3-Day Streak', icon: '🔥', desc: 'Study 3 days in a row' },
            { id: 'vocab_50', label: 'Vocab Champion', icon: '📖', desc: 'Learn 50 words' },
            { id: 'n5_grammar', label: 'N5 Grammar Done', icon: '✍️', desc: 'Master all N5 grammar' },
            { id: 'mock_test', label: 'Mock Test Complete', icon: '🏆', desc: 'Finish a mock test' },
          ].map(a => (
            <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${progress.achievements.includes(a.id) ? 'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-100 dark:border-gray-700 opacity-40'}`}>
              <span className="text-2xl">{a.icon}</span>
              <div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{a.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{a.desc}</div>
              </div>
              {progress.achievements.includes(a.id) && <CheckCircle size={16} className="text-green-500 ml-auto flex-shrink-0" />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
