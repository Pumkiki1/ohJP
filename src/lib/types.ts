/**
 * Core domain types for the Japanese-for-Tochigi learning app.
 * Content (curriculum, kana, vocabulary, travel dialogues) lives in src/data
 * and is typed against these definitions. UI components never hardcode lessons.
 */

export type Difficulty = 1 | 2 | 3;

export type Script = "hiragana" | "katakana";

/* ------------------------------------------------------------------ */
/* Kana                                                                 */
/* ------------------------------------------------------------------ */

export type KanaGroup = "basic" | "dakuten" | "handakuten" | "combo" | "special";

export interface KanaChar {
  /** The character itself, e.g. "あ" or "きゃ" */
  char: string;
  romaji: string;
  /** Thai approximation of the sound */
  thai: string;
  script: Script;
  group: KanaGroup;
  /** Row label used in the chart, e.g. "a", "ka" */
  row: string;
  /** Example word written so a beginner can read it */
  example?: { word: string; romaji: string; meaning: string };
  /** Short memory trick in Thai */
  mnemonic?: string;
  /** Verified writing guide (only provided where we are confident it is correct) */
  strokes?: { count: number; steps: string[] };
}

/* ------------------------------------------------------------------ */
/* Vocabulary                                                           */
/* ------------------------------------------------------------------ */

export type VocabCategory =
  | "greetings"
  | "self-intro"
  | "numbers"
  | "time"
  | "food"
  | "restaurant"
  | "transport"
  | "station"
  | "bus"
  | "hotel"
  | "shopping"
  | "directions"
  | "weather"
  | "nature"
  | "emergency"
  | "travel";

export type Politeness = "polite" | "casual" | "neutral";

export interface VocabExample {
  japanese: string;
  romaji: string;
  thai: string;
}

export interface Vocabulary {
  id: string;
  /** How it is normally written (may include kanji / katakana) */
  japanese: string;
  /** Hiragana/katakana reading, when different from `japanese` */
  hiragana?: string;
  romaji: string;
  thaiPronunciation: string;
  meaning: string;
  category: VocabCategory;
  difficulty: Difficulty;
  politeness?: Politeness;
  note?: string;
  example?: VocabExample;
}

/* ------------------------------------------------------------------ */
/* Exercises                                                            */
/* ------------------------------------------------------------------ */

interface ExerciseBase {
  id: string;
  /** Thai instruction / question shown to the learner */
  question: string;
  /** Why the correct answer is correct (Thai) */
  explanation: string;
  difficulty: Difficulty;
  /** Review key recorded when the learner gets this wrong, e.g. "kana:あ", "vocab:arigatou" */
  reviewKey?: string;
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: "multiple-choice";
  /** Optional big Japanese prompt shown above options */
  prompt?: string;
  promptIsJapanese?: boolean;
  options: string[];
  correctAnswer: string;
  optionsAreJapanese?: boolean;
}

export interface MatchExercise extends ExerciseBase {
  type: "match";
  pairs: { left: string; right: string }[];
  leftIsJapanese?: boolean;
}

export interface FillBlankExercise extends ExerciseBase {
  type: "fill-blank";
  /** Sentence containing "___" where the blank goes */
  sentence: string;
  translation: string;
  options: string[];
  correctAnswer: string;
}

export interface OrderExercise extends ExerciseBase {
  type: "order";
  /** Thai sentence to build */
  translation: string;
  /** Tiles in the correct order */
  correctOrder: string[];
  /** Optional distractor tiles */
  extraTiles?: string[];
}

export interface ListenExercise extends ExerciseBase {
  type: "listen";
  /** Japanese text spoken by TTS */
  audioText: string;
  options: string[];
  correctAnswer: string;
  optionsAreJapanese?: boolean;
}

export interface ReadMeaningExercise extends ExerciseBase {
  type: "read-meaning";
  japanese: string;
  reading?: string;
  options: string[];
  correctAnswer: string;
}

export interface TypeExercise extends ExerciseBase {
  type: "type";
  /** What to show (e.g. "ka" or a Thai meaning) */
  prompt: string;
  /** "kana": learner types romaji, auto-converted to hiragana. "romaji": types latin letters */
  inputMode: "kana" | "romaji";
  correctAnswer: string;
  acceptedAnswers?: string[];
}

export interface TrueFalseExercise extends ExerciseBase {
  type: "true-false";
  statement: string;
  statementJapanese?: string;
  correctAnswer: boolean;
}

export interface DialogueLine {
  speaker: string;
  japanese: string;
  romaji: string;
  thai: string;
}

export interface ConversationExercise extends ExerciseBase {
  type: "conversation";
  situation: string;
  lines: DialogueLine[];
  options: string[];
  correctAnswer: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | MatchExercise
  | FillBlankExercise
  | OrderExercise
  | ListenExercise
  | ReadMeaningExercise
  | TypeExercise
  | TrueFalseExercise
  | ConversationExercise;

export type ExerciseType = Exercise["type"];

/* ------------------------------------------------------------------ */
/* Lesson content blocks                                                */
/* ------------------------------------------------------------------ */

export type ContentBlock =
  | { kind: "text"; text: string }
  | { kind: "tip"; title?: string; text: string; tone?: "info" | "warning" | "culture" }
  | { kind: "kana-focus"; chars: string[]; script: Script }
  | {
      kind: "phrase-list";
      title?: string;
      items: { japanese: string; reading?: string; romaji: string; thai: string; meaning: string; note?: string }[];
    }
  | { kind: "table"; headers: string[]; rows: string[][]; japaneseCols?: number[] }
  | { kind: "compare"; items: { japanese: string; label: string; note: string }[] }
  | { kind: "dialogue"; title?: string; lines: DialogueLine[] }
  | { kind: "read-aloud"; items: { japanese: string; romaji: string; meaning?: string }[] }
  | { kind: "scripts-overview" }
  | { kind: "stroke-guide"; chars: string[] }
  | { kind: "checklist"; items: string[] };

export type SectionKind = "learn" | "understand" | "practice" | "review";

export interface LessonSection {
  kind: SectionKind;
  title: string;
  minutes: number;
  blocks: ContentBlock[];
}

export interface Lesson {
  id: string;
  dayNumber: number;
  title: string;
  subtitle: string;
  phase: number;
  topic: string;
  estimatedMinutes: number;
  objectives: string[];
  /** Vocabulary ids introduced in this lesson */
  vocabulary: string[];
  /** Grammar point ids introduced in this lesson */
  grammar: string[];
  /** Kana introduced in this lesson */
  kana?: string[];
  sections: LessonSection[];
  exercises: Exercise[];
  summary: string[];
  /** Keys added to the spaced-repetition queue when the lesson is completed */
  reviewItems: string[];
}

/** A scheduled lesson that has a plan but no authored content yet */
export interface LessonOutline {
  dayNumber: number;
  title: string;
  subtitle: string;
  phase: number;
  topic: string;
  estimatedMinutes: number;
  objectives: string[];
  plan: { kind: SectionKind; minutes: number; activity: string }[];
  isReviewDay: boolean;
}

export interface ScheduledLesson {
  dayNumber: number;
  /** YYYY-MM-DD in Asia/Bangkok */
  date: string;
  phase: number;
  title: string;
  subtitle: string;
  topic: string;
  estimatedMinutes: number;
  objectives: string[];
  authored: boolean;
  lesson?: Lesson;
  outline?: LessonOutline;
}

export interface Phase {
  id: number;
  month: string;
  /** YYYY-MM */
  monthKey: string;
  title: string;
  objective: string;
  topics: string[];
  color: "sakura" | "matcha" | "beige";
}

/* ------------------------------------------------------------------ */
/* Grammar                                                              */
/* ------------------------------------------------------------------ */

export interface GrammarPoint {
  id: string;
  pattern: string;
  title: string;
  explanation: string;
  example: VocabExample;
  /** Quick quiz used by the review queue */
  quiz: { question: string; options: string[]; correctAnswer: string; explanation: string };
}

/* ------------------------------------------------------------------ */
/* Travel simulations                                                   */
/* ------------------------------------------------------------------ */

export interface SimChoice {
  japanese: string;
  romaji: string;
  thai: string;
  correct: boolean;
  feedback: string;
}

export interface SimStep {
  /** Line said by the other person (staff, driver...) */
  npc?: DialogueLine & { reading?: string; thaiPronunciation?: string };
  /** What the learner should say next */
  prompt?: string;
  choices?: SimChoice[];
}

export interface TravelScenario {
  id: string;
  icon: string;
  title: string;
  situation: string;
  place?: string;
  usefulPhrases: { japanese: string; reading?: string; romaji: string; thaiPronunciation: string; thai: string }[];
  steps: SimStep[];
  practice: MultipleChoiceExercise[];
}

/* ------------------------------------------------------------------ */
/* Progress                                                             */
/* ------------------------------------------------------------------ */

export interface LessonResult {
  completedAt: string; // YYYY-MM-DD
  score: number;
  total: number;
  /** true for progress pre-loaded before the learner used the app */
  seeded?: boolean;
}

export interface LessonScoreHistory {
  best: number;
  last: number;
  total: number;
  attempts: number;
}

export interface LessonDraft {
  sectionIndex: number;
  exerciseIndex: number;
  answers: Record<string, { correct: boolean; firstTryCorrect: boolean }>;
  updatedAt: string;
}

export interface MasteryRecord {
  learned: boolean;
  correct: number;
  wrong: number;
}

export type ReviewKind = "kana" | "vocab" | "grammar";

export interface ReviewItem {
  key: string; // e.g. "kana:あ"
  kind: ReviewKind;
  /** 0..5 index into REVIEW_INTERVALS, 6 = mastered */
  stage: number;
  due: string; // YYYY-MM-DD
  wrongCount: number;
  correctCount: number;
  lastSeen?: string;
}

export interface Progress {
  version: 1;
  createdAt: string;
  completedLessons: Record<number, LessonResult>;
  lessonScores: Record<number, LessonScoreHistory>;
  drafts: Record<number, LessonDraft>;
  /** date -> seconds studied */
  studyLog: Record<string, number>;
  /** dates on which the learner finished a lesson or review session */
  studyDates: string[];
  kanaProgress: Record<string, MasteryRecord>;
  vocabularyProgress: Record<string, MasteryRecord>;
  reviewItems: Record<string, ReviewItem>;
  favoriteVocabulary: string[];
  quizStats: { correct: number; total: number };
  lastStudyDate: string | null;
  /** ISO timestamp of the last local change (used to resolve settings when syncing) */
  updatedAt?: string;
  settings: {
    theme: "light" | "dark" | "system";
    /** true once the learner picks a theme themselves; until then the app uses light */
    themeChosen?: boolean;
    reminderTime: string | null;
    dailyGoalMinutes: number;
  };
}
