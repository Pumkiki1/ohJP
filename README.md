# にほんご Tochigi — เรียนญี่ปุ่นวันละ 20 นาที

A Japanese learning web app for a Thai absolute beginner preparing for a 5-day trip to Tochigi
(late October 2027). Study 20 minutes a day, from 17 Nov 2026 until the trip.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all 368 pages are static)
npm run lint
npm run typecheck
npm test           # progress / streak / spaced-repetition / romaji logic
npm run validate   # content QA: answers in options, ≥5 exercises, known vocab ids…
```

Works without any backend: progress is saved in the browser's `localStorage`
(export/import JSON from **ตั้งค่า**).

## Database & login (optional, Supabase)

Sign in to keep progress in a database and continue on any device.

1. Create a free project at [supabase.com](https://supabase.com).
2. **SQL Editor** → run [`supabase/schema.sql`](supabase/schema.sql) (creates `learner_progress`
   with Row Level Security, so each user can only read and write their own row).
3. Copy `.env.example` to `.env.local` and fill in the Project URL and Publishable (anon) key
   from **Project Settings → API**. Restart `npm run dev`.
4. Open **บัญชี & ซิงก์** (`/account`) to sign up / sign in with email + password.
   With Supabase's default settings, new accounts must confirm their email first.
   Under **Authentication → URL Configuration**, add your site URL.

How sync works (`src/lib/progress/sync.ts`):
- localStorage stays the working copy, so the app stays instant and works offline.
- On sign-in, when the tab regains focus, and ~1.5 s after each change, the database copy is
  fetched, **merged** (`mergeProgress`: lessons and review items are combined, best scores and
  earliest completion dates kept, nothing learned is lost) and saved back.
- Reset or import **replaces** the database copy instead of merging.
- Without the env vars the app runs in guest mode, and `/account` shows these setup steps.

## What's inside

| Page | Route | |
|---|---|---|
| หน้าแรก | `/` | today's lesson, daily goal ring, streak, week calendar, review CTA, trip countdown |
| แผนการเรียน | `/lessons` | 12 phases × 342 daily lessons, sequential unlocking |
| บทเรียน | `/lessons/[day]` | Learn → Understand → Practice → Review, pause/resume, completion screen |
| แบบฝึกหัด | `/practice` | lesson mix, kana quizzes, vocab, listening, typing, all-types |
| ทบทวน | `/review` | spaced repetition (same day → 1 → 3 → 7 → 14 → 30 days) |
| ตัวอักษร | `/kana` | hiragana & katakana charts, details, flashcards, quizzes |
| คำศัพท์ | `/vocabulary` | 216 words in 16 travel categories, search, favourites, print |
| เที่ยวญี่ปุ่น | `/travel` | 12 branching conversation simulations |
| ความก้าวหน้า | `/progress` | stats, weekly chart, monthly heatmap, mastery, weak topics |
| ตั้งค่า | `/settings` | theme, daily goal, in-app reminder, export/import, reset |

## Content status

- **Days 1–30 are fully authored** (Phase 1 hiragana + Phase 2 katakana, signs, menus).
  Day 1 is pre-completed (5/5); Day 2 is the next lesson.
- **Days 31–342** have a title, objective, topic and 20-minute plan. Their page shows a clear
  "กำลังจัดทำเนื้อหา" state with a review shortcut, rather than generated Japanese that hasn't been checked.
- Stroke order is shown only for あいうえお and アイウエオ, the characters whose guides were verified.
- Audio uses the browser's SpeechSynthesis with a `ja-JP` voice. If the device has no Japanese
  voice, buttons show as unavailable and listening exercises offer a text fallback.

## Structure

```
src/
  app/                 routes (thin server pages → client views)
  views/               page-level client components
  components/
    ui/                Button, Card, Badge, ProgressBar, ProgressRing, ConfirmDialog…
    learning/          LessonCard, KanaGrid, Flashcard, VocabularyCard, AudioButton,
                       DailyCalendar, ReviewQueue, ContentBlocks
    exercises/         ExerciseCard, ExerciseRunner (+ results), 9 input components
  data/                curriculum.ts, kana.ts, vocabulary.ts, grammar.ts, travel.ts,
    lessons/           phase1.ts, phase2.ts, builders.ts  ← add new phase files here
  lib/
    types.ts           Lesson, Exercise, Vocabulary, Progress…
    progress/          actions.ts (pure state transitions), store.ts (localStorage), stats.ts
    quiz.ts            runtime exercise generation from curated data
    date.ts            Asia/Bangkok calendar helpers
    romaji.ts          romaji → hiragana for typing exercises
scripts/               test-logic.ts, validate-content.ts
```

To add lessons, write a new `src/data/lessons/phaseN.ts` (use `buildKanaLesson` or a hand-written
`Lesson`), add it to `src/data/lessons/index.ts`, and run `npm run validate`. The schedule picks
authored lessons up automatically by `dayNumber`.

To move progress to a server later, replace `readStored`/`persist` in `src/lib/progress/store.ts`.
The rest of the app only uses `useProgress()` and `updateProgress()`.
