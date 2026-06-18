export type JLPTLevel = 'N5' | 'N4' | 'Beginner'

export interface HiraganaItem {
  id: string
  character: string
  romaji: string
  example: string
  exampleMeaning: string
}

export interface KatakanaItem {
  id: string
  character: string
  romaji: string
  example: string
  exampleMeaning: string
}

export interface VocabWord {
  id: string
  japanese: string
  furigana: string
  romaji: string
  english: string
  level: JLPTLevel
  category: string
  exampleJp: string
  exampleEn: string
  learned: boolean
  weak: boolean
  saved: boolean
}

export interface KanjiItem {
  id: string
  kanji: string
  meaning: string
  onyomi: string
  kunyomi: string
  level: JLPTLevel
  exampleWord: string
  exampleReading: string
  exampleSentenceJp: string
  exampleSentenceEn: string
  saved: boolean
}

export interface GrammarPoint {
  id: string
  title: string
  structure: string
  meaning: string
  level: JLPTLevel
  usageNotes: string
  examples: { jp: string; furigana: string; en: string }[]
  commonMistakes: string
  relatedPatterns: string[]
}

export interface ReadingPassage {
  id: string
  title: string
  level: JLPTLevel
  topic: string
  estimatedTime: number
  bodyJp: string
  bodyFurigana: string
  bodyEn: string
  questions: { question: string; options: string[]; answer: number }[]
}

export interface ListeningExercise {
  id: string
  title: string
  level: JLPTLevel
  topic: string
  audioSrc: string
  transcript: string
  questions: { question: string; options: string[]; answer: number }[]
}

export interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'matching' | 'fill-blank' | 'listening' | 'reading'
  prompt: string
  options?: string[]
  answer: string | number
  explanation: string
  topic: string
  level: JLPTLevel
}

export interface MockTest {
  id: string
  title: string
  level: JLPTLevel
  sections: {
    name: string
    questions: QuizQuestion[]
    timeMinutes: number
  }[]
}

export interface DailyPhrase {
  id: string
  japanese: string
  furigana: string
  romaji: string
  english: string
  context: string
}

export interface PronunciationItem {
  id: string
  title: string
  description: string
  examples: { jp: string; romaji: string; note: string }[]
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
}
