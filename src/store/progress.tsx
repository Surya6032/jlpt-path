'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { UserProgress } from '@/types'

const TODAY = new Date().toISOString().split('T')[0]

const defaultProgress: UserProgress = {
  streak: 0,
  totalStudyMinutes: 0,
  lessonsCompleted: [],
  vocabLearned: [],
  kanjiLearned: [],
  grammarMastered: [],
  hiraganaProgress: 0,
  katakanaProgress: 0,
  n5Progress: 0,
  n4Progress: 0,
  weeklyGoalMinutes: 150,
  weeklyStudiedMinutes: 0,
  quizScores: [],
  achievements: [],
  reviewQueue: [],
  studyDates: [],
  srsMap: {},
  dailyGoalXP: 50,
  xpToday: 0,
  xpTotal: 0,
  lastStudyDate: '',
}

interface ProgressContextType {
  progress: UserProgress
  markLessonComplete: (id: string) => void
  markVocabLearned: (id: string) => void
  markKanjiLearned: (id: string) => void
  markGrammarMastered: (id: string) => void
  addQuizScore: (topic: string, score: number) => void
  unlockAchievement: (id: string) => void
  addStudyMinutes: (mins: number) => void
  addXP: (xp: number) => void
  setHiraganaProgress: (p: number) => void
  setKatakanaProgress: (p: number) => void
  recordStudyDay: () => void
  updateSRS: (id: string, correct: boolean) => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

function calcStreak(dates: string[]): number {
  if (!dates.length) return 0
  const sorted = [...new Set(dates)].sort().reverse()
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0
  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const curr = new Date(sorted[i])
    const diff = Math.round((prev.getTime() - curr.getTime()) / 86400000)
    if (diff === 1) streak++
    else break
  }
  return streak
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jlpt-path-progress-v2')
      if (saved) return JSON.parse(saved)
    }
    return defaultProgress
  })

  useEffect(() => {
    localStorage.setItem('jlpt-path-progress-v2', JSON.stringify(progress))
  }, [progress])

  const recordStudyDay = () => setProgress(p => {
    const dates = [...new Set([...(p.studyDates || []), TODAY])]
    return { ...p, studyDates: dates, streak: calcStreak(dates), lastStudyDate: TODAY }
  })

  const markLessonComplete = (id: string) =>
    setProgress(p => ({ ...p, lessonsCompleted: [...new Set([...p.lessonsCompleted, id])] }))

  const markVocabLearned = (id: string) =>
    setProgress(p => ({ ...p, vocabLearned: [...new Set([...p.vocabLearned, id])] }))

  const markKanjiLearned = (id: string) =>
    setProgress(p => ({ ...p, kanjiLearned: [...new Set([...p.kanjiLearned, id])] }))

  const markGrammarMastered = (id: string) =>
    setProgress(p => ({ ...p, grammarMastered: [...new Set([...p.grammarMastered, id])] }))

  const addQuizScore = (topic: string, score: number) =>
    setProgress(p => ({ ...p, quizScores: [...p.quizScores, { topic, score, date: TODAY }] }))

  const unlockAchievement = (id: string) =>
    setProgress(p => ({ ...p, achievements: [...new Set([...p.achievements, id])] }))

  const addStudyMinutes = (mins: number) =>
    setProgress(p => ({
      ...p,
      totalStudyMinutes: p.totalStudyMinutes + mins,
      weeklyStudiedMinutes: p.weeklyStudiedMinutes + mins,
    }))

  const addXP = (xp: number) =>
    setProgress(p => ({
      ...p,
      xpToday: (p.xpToday || 0) + xp,
      xpTotal: (p.xpTotal || 0) + xp,
    }))

  const setHiraganaProgress = (pct: number) =>
    setProgress(p => ({ ...p, hiraganaProgress: pct }))

  const setKatakanaProgress = (pct: number) =>
    setProgress(p => ({ ...p, katakanaProgress: pct }))

  // SM-2 spaced repetition
  const updateSRS = (id: string, correct: boolean) =>
    setProgress(p => {
      const map = { ...(p.srsMap || {}) }
      const entry = map[id] || { interval: 1, easeFactor: 2.5, nextReview: TODAY, reps: 0 }
      let { interval, easeFactor, reps } = entry
      if (correct) {
        reps += 1
        if (reps === 1) interval = 1
        else if (reps === 2) interval = 6
        else interval = Math.round(interval * easeFactor)
        easeFactor = Math.max(1.3, easeFactor + 0.1)
      } else {
        reps = 0; interval = 1; easeFactor = Math.max(1.3, easeFactor - 0.2)
      }
      const nextDate = new Date(Date.now() + interval * 86400000).toISOString().split('T')[0]
      map[id] = { interval, easeFactor, nextReview: nextDate, reps }
      const reviewQueue = Object.entries(map)
        .filter(([, v]) => v.nextReview <= TODAY)
        .map(([k]) => k)
      return { ...p, srsMap: map, reviewQueue }
    })

  return (
    <ProgressContext.Provider value={{
      progress, markLessonComplete, markVocabLearned, markKanjiLearned,
      markGrammarMastered, addQuizScore, unlockAchievement, addStudyMinutes,
      addXP, setHiraganaProgress, setKatakanaProgress, recordStudyDay, updateSRS
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
