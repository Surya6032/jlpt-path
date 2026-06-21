# 🎌 JLPT Path

A personal Japanese language learning web app built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** — deployed on GitHub Pages.

Inspired by Duolingo's gamified learning style, JLPT Path guides you through JLPT N5 → N1 vocabulary, kanji, grammar, hiragana/katakana, listening, and reading — all in one place, built for one person: me.

---

## ✨ Features

### 📚 Lessons
- Flashcard-style lessons with a **3D animated cat mascot** that reacts to your answers
- **Ruby furigana** displayed above every kanji so you always know the reading
- Mnemonic memory hooks shown automatically when you get an answer wrong
- Example sentences with English translation shown after every answer
- Romaji toggle for early-stage learners
- Auto-advance timing: 2s on correct, 2.5s on wrong (enough time to absorb feedback)

### 🗂️ Vocabulary
- Full JLPT N5–N1 vocabulary list (1400+ words)
- Searchable and filterable by level and category
- Each word includes: Japanese, furigana, romaji, meaning, example sentence, and mnemonic
- Text-to-speech via Web Speech API — hear every word pronounced natively

### 🈳 Kanji
- Kanji browser organized by JLPT level
- Stroke order display for visual learners
- On'yomi and Kun'yomi readings

### 📝 Grammar
- Grammar points organized by JLPT level
- Pattern, explanation, and example sentences for each rule

### 🔤 Hiragana & Katakana
- Full character charts with pronunciation
- Practice mode to test recognition

### 🎧 Listening
- Listening comprehension exercises
- Pause/resume controls
- Answer reveal with explanation

### 🧠 Quiz
- Multiple choice quiz across all content types
- Immediate feedback with correct answer shown
- Mnemonic shown on wrong answers to reinforce memory

### 📊 Progress & Streak
- Daily study streak tracked and shown live in the navbar 🔥
- XP system — earn points for every correct answer
- Progress tracked per level and category
- Streak only increments when you **actually complete a study session** (not just by opening the app)

### 📅 Planner
- Weekly study planner to schedule your JLPT prep

### 🌙 Dark Mode
- Full dark mode support, toggled from the navbar

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Zustand (persisted to localStorage) |
| Animation | Framer Motion |
| TTS | Web Speech API |
| Deployment | GitHub Pages (static export) |

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Export static site (for GitHub Pages)
npm run export
```

Then open [http://localhost:3000](http://localhost:3000).

---

## 📦 Deployment

This app is deployed as a **static export** to GitHub Pages via GitHub Actions.

```bash
# Push to main — GitHub Actions will auto-build and deploy
git push origin main
```

The workflow runs `next build` → `next export` → deploys the `out/` folder to the `gh-pages` branch.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/        # Home dashboard with progress overview
│   ├── learn/
│   │   ├── lessons/      # Flashcard lesson system
│   │   ├── vocabulary/   # Full vocab browser
│   │   ├── kanji/        # Kanji browser
│   │   ├── grammar/      # Grammar points
│   │   ├── hiragana/     # Hiragana & katakana charts
│   │   ├── listening/    # Listening exercises
│   │   ├── quiz/         # Multiple choice quiz
│   │   ├── progress/     # XP and streak tracker
│   │   └── planner/      # Weekly study planner
├── components/
│   └── layout/
│       └── Navbar.tsx    # Top nav with live streak badge
├── data/
│   └── vocabulary.ts     # 1400+ word vocab dataset
└── store/
    └── progress.ts       # Zustand store — XP, streak, progress
```

---

## 🎯 JLPT Levels Covered

| Level | Target |
|---|---|
| N5 | Complete beginner — ~800 words |
| N4 | Elementary — ~1500 words |
| N3 | Intermediate — ~3750 words |
| N2 | Upper intermediate — ~6000 words |
| N1 | Advanced — ~10000 words |

---

## 🐱 Meet Nya

The 3D purple cat mascot who guides you through every lesson. She celebrates when you get answers right and commiserates when you don't. Her speech bubble adapts to your performance in real time.

---

*Built for personal JLPT study. Not affiliated with the Japan Language Proficiency Test organization.*
