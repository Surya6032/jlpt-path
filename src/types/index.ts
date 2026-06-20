export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'

export interface HiraganaItem {
  id: string; character: string; romaji: string; example: string; exampleMeaning: string
}

export interface KatakanaItem {
  id: string; character: string; romaji: string; example: string; exampleMeaning: string
}

export interface VocabWord {
  id: string; japanese: string; furigana: string; romaji: string; english: string
  level: 'N5' | 'N4'; category: string; example?: string; exampleEn?: string; mnemonic?: string
}

export interface KanjiItem {
  id: string
  kanji: string
  meaning: string
  onyomi: string
  kunyomi: string
  level: 'N5' | 'N4'
  exampleWord: string
  exampleReading: string
  exampleSentenceJp: string
  exampleSentenceEn: string
  saved?: boolean
  strokeCount?: number
  mnemonic?: string
}

export interface GrammarPoint {
  id: string
  title: string
  structure: string
  meaning: string
  level: 'N5' | 'N4'
  usageNotes: string
  examples: { jp: string; furigana?: string; en: string }[]
  commonMistakes?: string
  relatedPatterns?: string[]
  notes?: string
  pattern?: string
  explanation?: string
}

export interface ReadingPassage {
  id: string
  title: string
  level: 'N5' | 'N4'
  topic: string
  estimatedTime: number
  bodyJp: string
  bodyFurigana: string
  bodyEn: string
  vocabulary?: string[]
  questions: { question: string; options: string[]; answer: number }[]
}

export interface ListeningExercise {
  id: string
  title: string
  level: 'N5' | 'N4'
  topic: string
  audioSrc?: string
  transcript: string
  transcriptFurigana?: string
  translation: string
  questions: { question: string; options: string[]; answer: number }[]
}

// PronunciationItem matches the actual pronunciationItems data in misc.ts
export interface PronunciationItem {
  id: string
  title: string
  description: string
  examples: { jp: string; romaji: string; note: string }[]
}

export interface DailyPhrase {
  id: string; japanese: string; furigana: string; english: string; category: string
}

export interface QuizQuestion {
  id: string; type: 'vocab' | 'kanji' | 'grammar' | 'listening'
  question: string; options: string[]; answer: number; explanation?: string
}

export interface MockTest {
  id: string; title: string; level: 'N5' | 'N4'
  sections: { name: string; questions: QuizQuestion[] }[]
}

export interface SRSEntry {
  interval: number; easeFactor: number; nextReview: string; reps: number
}

export interface UserProgress {
  streak: number
  totalStudyMinutes: number
  lessonsCompleted: string[]
  vocabLearned: string[]
  kanjiLearned: string[]
  grammarMastered: string[]
  hiraganaProgress: number
  katakanaProgress: number
  n5Progress: number
  n4Progress: number
  weeklyGoalMinutes: number
  weeklyStudiedMinutes: number
  quizScores: { topic: string; score: number; date: string }[]
  achievements: string[]
  reviewQueue: string[]
  studyDates: string[]
  srsMap: Record<string, SRSEntry>
  dailyGoalXP: number
  xpToday: number
  xpTotal: number
  lastStudyDate: string
}
