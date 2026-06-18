'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { UserProgress } from '@/types'

const defaultProgress: UserProgress = {
  streak: 3,
  totalStudyMinutes: 142,
  lessonsCompleted: ['h01','h02','h03','h04','h05','g01','g02','v001','v002','v003'],
  vocabLearned: ['v001','v002','v003','v004','v005','v006','v007','v008','v009','v010'],
  kanjiLearned: ['kj01','kj02','kj03'],
  grammarMastered: ['g01','g02'],
  hiraganaProgress: 25,
  katakanaProgress: 10,
  n5Progress: 18,
  n4Progress: 2,
  weeklyGoalMinutes: 150,
  weeklyStudiedMinutes: 87,
  quizScores: [
    { topic: 'Hiragana', score: 80, date: '2025-06-10' },
    { topic: 'Vocabulary N5', score: 70, date: '2025-06-12' },
    { topic: 'Grammar N5', score: 65, date: '2025-06-14' },
  ],
  achievements: ['first_lesson', 'first_quiz', 'streak_3'],
  reviewQueue: ['v011','v012','kj04','g03'],
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
  setHiraganaProgress: (p: number) => void
  setKatakanaProgress: (p: number) => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jlpt-path-progress')
      if (saved) return JSON.parse(saved)
    }
    return defaultProgress
  })

  useEffect(() => {
    localStorage.setItem('jlpt-path-progress', JSON.stringify(progress))
  }, [progress])

  const markLessonComplete = (id: string) =>
    setProgress(p => ({ ...p, lessonsCompleted: [...new Set([...p.lessonsCompleted, id])] }))

  const markVocabLearned = (id: string) =>
    setProgress(p => ({ ...p, vocabLearned: [...new Set([...p.vocabLearned, id])] }))

  const markKanjiLearned = (id: string) =>
    setProgress(p => ({ ...p, kanjiLearned: [...new Set([...p.kanjiLearned, id])] }))

  const markGrammarMastered = (id: string) =>
    setProgress(p => ({ ...p, grammarMastered: [...new Set([...p.grammarMastered, id])] }))

  const addQuizScore = (topic: string, score: number) =>
    setProgress(p => ({ ...p, quizScores: [...p.quizScores, { topic, score, date: new Date().toISOString().split('T')[0] }] }))

  const unlockAchievement = (id: string) =>
    setProgress(p => ({ ...p, achievements: [...new Set([...p.achievements, id])] }))

  const addStudyMinutes = (mins: number) =>
    setProgress(p => ({ ...p, totalStudyMinutes: p.totalStudyMinutes + mins, weeklyStudiedMinutes: p.weeklyStudiedMinutes + mins }))

  const setHiraganaProgress = (pct: number) =>
    setProgress(p => ({ ...p, hiraganaProgress: pct }))

  const setKatakanaProgress = (pct: number) =>
    setProgress(p => ({ ...p, katakanaProgress: pct }))

  return (
    <ProgressContext.Provider value={{
      progress, markLessonComplete, markVocabLearned, markKanjiLearned,
      markGrammarMastered, addQuizScore, unlockAchievement,
      addStudyMinutes, setHiraganaProgress, setKatakanaProgress
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
