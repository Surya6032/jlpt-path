# JLPT Path 🇯🇵

> Complete self-study platform for learning Japanese from zero to JLPT N4.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start learning.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **React Context** (progress store, localStorage persisted)
- **Browser Speech Synthesis API** (Japanese TTS for audio)

## Site Architecture

```
/                       → Landing page
/dashboard              → Learner dashboard + progress
/learn/hiragana         → Hiragana chart, quiz, flashcards
/learn/katakana         → Katakana chart, quiz, flashcards
/learn/pronunciation    → 10 pronunciation lessons
/learn/vocabulary       → 80 words, filters, flashcards
/learn/kanji            → 40 kanji, details, quiz
/learn/grammar          → 20 grammar points with quizzes
/learn/reading          → 5 passages with comprehension Q
/learn/listening        → 5 exercises with TTS audio
/quiz                   → Dynamic quiz engine
/mock-test              → N5 & N4 mock tests (3 sections each)
/analytics              → Full progress analytics
/review                 → Spaced review queue
/planner                → Daily plans + roadmap
/reference              → Search, phrases, pronunciation, tips
```

## Seed Data

| Content         | Count |
|----------------|-------|
| Hiragana       | 20    |
| Katakana       | 20    |
| N5 Vocabulary  | 50    |
| N4 Vocabulary  | 30    |
| N5 Kanji       | 20    |
| N4 Kanji       | 20    |
| N5 Grammar     | 10    |
| N4 Grammar     | 10    |
| Reading        | 5     |
| Listening      | 5     |
| Daily Phrases  | 10    |
| Pronunciation  | 10    |
| Mock Tests     | 2     |

## Features

- ✅ Interactive Hiragana / Katakana charts with click-to-hear
- ✅ Vocabulary list, flashcard, and quiz modes
- ✅ Kanji grid with full breakdown + quiz
- ✅ Grammar accordion with examples, notes, mini-quiz
- ✅ Reading passages with furigana toggle + comprehension Q
- ✅ Listening with browser TTS + slow/normal speed + transcript
- ✅ Dynamic quiz engine (vocab, kanji, grammar, mixed)
- ✅ N5 and N4 mock tests with section breakdown
- ✅ Progress analytics with bar charts
- ✅ Spaced review queue
- ✅ Daily study planner (15/30/60 min)
- ✅ Full learning roadmap Zero → N4
- ✅ Search across all content
- ✅ Daily phrases + pronunciation guide
- ✅ Study tips
- ✅ Dark mode / Light mode
- ✅ Mobile responsive
- ✅ Progress persisted in localStorage

## Expanding the Content

All data lives in `src/data/`. To add more:

- **Vocab**: add entries to `vocab.ts` → `vocabData`
- **Kanji**: add entries to `kanji.ts` → `kanjiData`
- **Grammar**: add entries to `grammar.ts` → `grammarData`
- **Reading/Listening**: add entries to `misc.ts`

The UI, quiz engine, and analytics automatically pick up new entries.
