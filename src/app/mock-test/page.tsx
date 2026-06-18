'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useProgress } from '@/store/progress'
import { Clock, Trophy, ChevronRight, AlertTriangle } from 'lucide-react'

const n5Test = {
  id: 'mock-n5',
  title: 'JLPT N5 Mock Test',
  level: 'N5',
  totalMinutes: 25,
  sections: [
    {
      name: 'Section 1: Vocabulary',
      questions: [
        { prompt: '「学校」means:', options: ['Hospital', 'School', 'Station', 'Library'], answer: 1, explanation: '学校 (gakkou) = school' },
        { prompt: '「食べる」means:', options: ['To drink', 'To sleep', 'To eat', 'To walk'], answer: 2, explanation: '食べる (taberu) = to eat' },
        { prompt: '「大きい」means:', options: ['Small', 'Big', 'Fast', 'Old'], answer: 1, explanation: '大きい (ookii) = big' },
        { prompt: '「毎日」means:', options: ['Yesterday', 'Today', 'Every day', 'Tomorrow'], answer: 2, explanation: '毎日 (mainichi) = every day' },
        { prompt: '「友達」means:', options: ['Teacher', 'Family', 'Friend', 'Boss'], answer: 2, explanation: '友達 (tomodachi) = friend' },
      ]
    },
    {
      name: 'Section 2: Grammar',
      questions: [
        { prompt: 'Choose the correct particle: 私___学生です。', options: ['が', 'は', 'を', 'で'], answer: 1, explanation: 'は marks the topic: 私は学生です。' },
        { prompt: '"I go to school" — correct Japanese:', options: ['学校が行きます', '学校で行きます', '学校に行きます', '学校を行きます'], answer: 2, explanation: 'に is used to mark destination with 行く.' },
        { prompt: 'Polite form of 食べる (to eat):', options: ['食べます', '食べるです', '食べた', '食べている'], answer: 0, explanation: 'The ます form of 食べる is 食べます.' },
        { prompt: '"Let's study together" in Japanese:', options: ['勉強します', '勉強したい', '一緒に勉強しましょう', '勉強してください'], answer: 2, explanation: 'ましょう expresses suggestion.' },
        { prompt: 'Choose the correct sentence:', options: ['きのうにべんきょうします', 'きのうべんきょうしました', 'きのうべんきょうします', 'きのうがべんきょうした'], answer: 1, explanation: 'Past tense: べんきょうしました (studied).' },
      ]
    },
    {
      name: 'Section 3: Reading',
      questions: [
        { prompt: 'わたしは まいにち ろくじに おきます。
What time does the person wake up?', options: ['5:00', '6:00', '7:00', '8:00'], answer: 1, explanation: 'ろくじ = 6 o'clock.' },
        { prompt: 'きょうは いい てんきです。
What does this sentence say?', options: ['Today is rainy', 'Today is good weather', 'Yesterday was sunny', 'Tomorrow will be hot'], answer: 1, explanation: 'いいてんき = good weather.' },
        { prompt: 'あのみせは やすくて おいしいです。
What do we know about that shop?', options: ['Expensive and delicious', 'Cheap and delicious', 'Cheap and bad', 'Expensive and bad'], answer: 1, explanation: 'やすい = cheap, おいしい = delicious.' },
        { prompt: 'わたしは コーヒーが すきです。
What does the speaker like?', options: ['Tea', 'Juice', 'Coffee', 'Milk'], answer: 2, explanation: 'コーヒー = coffee; すき = to like.' },
        { prompt: 'えきは ここから とおいですか？
What is being asked?', options: ['Is the shop near here?', 'Is the station far from here?', 'Is the hospital close?', 'Where is the train?'], answer: 1, explanation: 'えき = station, とおい = far.' },
      ]
    },
  ]
}

const n4Test = {
  id: 'mock-n4',
  title: 'JLPT N4 Mock Test',
  level: 'N4',
  totalMinutes: 35,
  sections: [
    {
      name: 'Section 1: Vocabulary',
      questions: [
        { prompt: '「準備」means:', options: ['Preparation', 'Experience', 'Method', 'Reason'], answer: 0, explanation: '準備 (junbi) = preparation.' },
        { prompt: '「便利」means:', options: ['Dangerous', 'Convenient', 'Kind', 'Expensive'], answer: 1, explanation: '便利 (benri) = convenient.' },
        { prompt: '「続ける」means:', options: ['To decide', 'To collect', 'To continue', 'To change'], answer: 2, explanation: '続ける (tsuzukeru) = to continue.' },
        { prompt: '「旅行」means:', options: ['Trip', 'Company', 'Meeting', 'Report'], answer: 0, explanation: '旅行 (ryokou) = travel/trip.' },
        { prompt: '「医者」means:', options: ['Medicine', 'Doctor', 'Fever', 'Hospital'], answer: 1, explanation: '医者 (isha) = doctor.' },
      ]
    },
    {
      name: 'Section 2: Grammar',
      questions: [
        { prompt: '"If you study, you can pass." Correct form:', options: ['勉強すれば合格できます', '勉強したら合格できます', '勉強するなら合格できます', 'All are possible'], answer: 3, explanation: 'All three conditional forms are grammatically valid here.' },
        { prompt: '"I forgot my umbrella (regret)" — correct form:', options: ['かさを忘れています', 'かさを忘れていました', 'かさを忘れてしまいました', 'かさを忘れておきました'], answer: 2, explanation: 'てしまいました expresses regret/completion.' },
        { prompt: '"I became able to speak Japanese" — correct form:', options: ['日本語が話せるようになりました', '日本語が話せるようにしました', '日本語が話せると思います', '日本語が話せればいいです'], answer: 0, explanation: 'ようになる = gradual change / becoming able to.' },
        { prompt: '"I think it will rain tomorrow":', options: ['明日は雨が降ります', '明日は雨が降ると思います', '明日は雨が降ったら', '明日は雨が降れば'], answer: 1, explanation: 'と思います = I think that ~.' },
        { prompt: '"You must take the medicine" — correct form:', options: ['薬を飲んでもいい', '薬を飲まなくてもいい', '薬を飲まなければなりません', '薬を飲んでおきます'], answer: 2, explanation: 'なければなりません = must / have to.' },
      ]
    },
    {
      name: 'Section 3: Reading',
      questions: [
        { prompt: '最近、テレワークを導入する会社が増えています。
What is increasing recently?', options: ['Workers' salaries', 'Companies introducing remote work', 'Overtime work', 'Long commutes'], answer: 1, explanation: 'テレワーク = remote work; 増えています = is increasing.' },
        { prompt: '来週の土曜日に映画を見に行く予定です。
When is the planned event?', options: ['This Saturday', 'Next Saturday', 'Last Saturday', 'Every Saturday'], answer: 1, explanation: '来週 = next week.' },
        { prompt: 'ホテルはもう予約しました。
What has already been done?', options: ['The ticket was bought', 'The suitcase was packed', 'The hotel was reserved', 'The restaurant was booked'], answer: 2, explanation: '予約しました = made a reservation.' },
        { prompt: '仕事が終わっても上司が帰るまで待つ人もいます。
Why do some people wait?', options: ['They have more work to do', 'They missed the last train', 'They wait until their boss leaves', 'They enjoy the office'], answer: 2, explanation: '上司が帰るまで待つ = wait until the boss leaves.' },
        { prompt: '理由を教えてください。
What is being requested?', options: ['Please tell me the way', 'Please tell me the reason', 'Please tell me the price', 'Please tell me the time'], answer: 1, explanation: '理由 (riyuu) = reason.' },
      ]
    },
  ]
}

export default function MockTestPage() {
  const { addQuizScore } = useProgress()
  const [testLevel, setTestLevel] = useState<'N5' | 'N4' | null>(null)
  const [sectionIdx, setSectionIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)

  const test = testLevel === 'N5' ? n5Test : testLevel === 'N4' ? n4Test : null
  const section = test?.sections[sectionIdx]
  const question = section?.questions[qIdx]

  const totalQuestions = test?.sections.reduce((s, sec) => s + sec.questions.length, 0) || 0
  const answeredSoFar = Object.keys(answers).length

  const getKey = () => `${sectionIdx}-${qIdx}`

  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
  }

  const next = () => {
    const key = getKey()
    const newAnswers = { ...answers, [key]: selected ?? -1 }
    setAnswers(newAnswers)

    if (qIdx + 1 < (section?.questions.length || 0)) {
      setQIdx(q => q + 1)
      setSelected(null)
    } else if (sectionIdx + 1 < (test?.sections.length || 0)) {
      setSectionIdx(s => s + 1)
      setQIdx(0)
      setSelected(null)
    } else {
      // Done
      setDone(true)
      const total = test!.sections.reduce((s, sec) => s + sec.questions.length, 0)
      let correct = 0
      test!.sections.forEach((sec, si) => {
        sec.questions.forEach((q, qi) => {
          const k = `${si}-${qi}`
          const ans = si === sectionIdx && qi === qIdx ? (selected ?? -1) : newAnswers[k] ?? -1
          if (ans === q.answer) correct++
        })
      })
      addQuizScore(`Mock ${testLevel}`, Math.round((correct / total) * 100))
    }
  }

  const computeScore = () => {
    if (!test) return { correct: 0, total: 0, bySection: [] }
    let correct = 0
    const total = test.sections.reduce((s, sec) => s + sec.questions.length, 0)
    const bySection = test.sections.map((sec, si) => {
      let sCorrect = 0
      sec.questions.forEach((q, qi) => {
        const k = `${si}-${qi}`
        if ((answers[k] ?? -1) === q.answer) sCorrect++
      })
      correct += sCorrect
      return { name: sec.name, correct: sCorrect, total: sec.questions.length }
    })
    return { correct, total, bySection }
  }

  // Landing
  if (!testLevel) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <Trophy size={28} className="text-brand-indigo" /> Mock Tests
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Simulate real JLPT test conditions. Each test includes vocabulary, grammar, and reading sections.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[n5Test, n4Test].map(t => (
            <Card key={t.id} hover onClick={() => { setTestLevel(t.level as 'N5'|'N4'); setStarted(false); setDone(false); setAnswers({}); setSectionIdx(0); setQIdx(0); setSelected(null) }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-2xl jp font-bold text-brand-indigo">{t.level}</div>
                <div>
                  <Badge label={t.level} variant="level" />
                  <h3 className="font-bold text-gray-900 dark:text-white mt-1">{t.title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-2">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{t.sections.length}</div>
                  <div className="text-xs text-gray-500">Sections</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-2">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{t.sections.reduce((s, sec) => s + sec.questions.length, 0)}</div>
                  <div className="text-xs text-gray-500">Questions</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-2">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{t.totalMinutes} min</div>
                  <div className="text-xs text-gray-500">Estimated</div>
                </div>
              </div>
              <Button className="w-full">Start {t.level} Mock Test →</Button>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10 animate-fade-in">
        <Card className="text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{test!.title}</h2>
          <div className="flex justify-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><Clock size={14} />{test!.totalMinutes} min</span>
            <span>{totalQuestions} questions</span>
            <span>{test!.sections.length} sections</span>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2 text-yellow-700 dark:text-yellow-400 font-semibold text-sm">
              <AlertTriangle size={16} /> Instructions
            </div>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li>Complete all sections in order</li>
              <li>You cannot go back to previous questions</li>
              <li>Review your answers at the end</li>
              <li>Aim for 60%+ to pass</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setTestLevel(null)} className="flex-1">← Back</Button>
            <Button onClick={() => setStarted(true)} className="flex-1">Begin Test</Button>
          </div>
        </Card>
      </div>
    )
  }

  if (done) {
    const { correct, total, bySection } = computeScore()
    const pct = Math.round((correct / total) * 100)
    return (
      <div className="max-w-lg mx-auto px-4 py-10 animate-fade-in">
        <Card>
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">{pct >= 60 ? '🏆' : '📚'}</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Test Complete!</h2>
            <div className="text-5xl font-extrabold text-brand-indigo">{pct}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{correct} / {total} correct</div>
            <div className={`mt-2 text-sm font-semibold ${pct >= 60 ? 'text-green-600' : 'text-red-500'}`}>
              {pct >= 60 ? `✓ PASS — You are ${testLevel} ready!` : '✗ Keep studying and try again'}
            </div>
          </div>
          <ProgressBar value={correct} max={total} showPercent={false} className="mb-6" />

          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Section Breakdown</h3>
          <div className="space-y-3 mb-6">
            {bySection.map(s => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{s.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{s.correct}/{s.total}</span>
                </div>
                <ProgressBar value={s.correct} max={s.total} showPercent={false} />
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => { setDone(false); setStarted(false); setAnswers({}); setSectionIdx(0); setQIdx(0); setSelected(null) }} className="flex-1">Retake Test</Button>
            <Button onClick={() => setTestLevel(null)} className="flex-1">All Tests</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <Badge label={testLevel!} variant="level" />
        <span className="text-sm text-gray-500 dark:text-gray-400">{answeredSoFar + 1} / {totalQuestions}</span>
      </div>
      <ProgressBar value={answeredSoFar} max={totalQuestions} showPercent={false} className="mb-4" />

      <div className="text-xs font-semibold uppercase tracking-wider text-brand-indigo mb-4">{section?.name}</div>

      <Card>
        <div className="jp text-lg font-semibold text-gray-900 dark:text-white mb-6 whitespace-pre-line">{question?.prompt}</div>
        <div className="space-y-2">
          {question?.options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)}
              className={`w-full py-3 px-4 rounded-xl text-sm text-left font-medium border-2 transition-all ${selected !== null ? i === question.answer ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : i === selected ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'border-gray-100 dark:border-gray-700 text-gray-400' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-indigo hover:bg-indigo-50 dark:hover:bg-indigo-900/10'}`}>
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="mt-4 animate-fade-in">
            <div className={`text-sm font-semibold mb-1 ${selected === question!.answer ? 'text-green-600' : 'text-red-500'}`}>
              {selected === question!.answer ? '✓ Correct!' : `✗ Answer: ${question!.options[question!.answer]}`}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{question!.explanation}</div>
            <Button onClick={next} className="w-full">
              {qIdx + 1 < (section?.questions.length || 0) || sectionIdx + 1 < (test?.sections.length || 0) ? 'Next →' : 'Finish Test'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
