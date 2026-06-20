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
  id: string; character: string; meaning: string; onyomi: string; kunyomi: string
  level: 'N5' | 'N4'; strokeCount: number; example: string; exampleReading: string; exampleMeaning: string; mnemonic?: string
}
export interface GrammarPoint {
  id: string; pattern: string; meaning: string; level: 'N5' | 'N4'
  explanation: string; examples: { jp: string; en: string }[]; notes?: string
}
export interface ReadingPassage {
  id: string; title: string; level: 'N5' | 'N4'; text: string; translation: string
  vocabulary: string[]; questions: { q: string; options: string[]; answer: number }[]
}
export interface ListeningExercise {
  id: string; title: string; level: 'N5' | 'N4'; transcript: string
  translation: string; questions: { q: string; options: string[]; answer: number }[]
}
export interface QuizQuestion {
  id: string; type: 'vocab' | 'kanji' | 'grammar' | 'listening'
  question: string; options: string[]; answer: number; explanation?: string
}
export interface MockTest {
  id: string; title: string; level: 'N5' | 'N4'
  sections: { name: string; questions: QuizQuestion[] }[]
}
export interface DailyPhrase {
  id: string; japanese: string; furigana: string; english: string; category: string
}
export interface PronunciationItem {
  id: string; character: string; romaji: string; type: 'hiragana' | 'katakana'
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
