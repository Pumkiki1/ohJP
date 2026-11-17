import { addDays } from "@/lib/date";
import type { LessonDraft, MasteryRecord, Progress, ReviewItem, ReviewKind } from "@/lib/types";

/**
 * Pure state transitions for learner progress. Every function returns a new
 * Progress object and never mutates its input, so they are easy to test and
 * to move to a server later.
 */

/** Spaced-repetition schedule in days: same day, 1, 3, 7, 14, 30 */
export const REVIEW_INTERVALS = [0, 1, 3, 7, 14, 30] as const;
export const MASTERED_STAGE = REVIEW_INTERVALS.length; // 6

export function kindOfKey(key: string): ReviewKind {
  const k = key.split(":")[0];
  return k === "kana" || k === "grammar" ? k : "vocab";
}

function keyId(key: string): string {
  return key.slice(key.indexOf(":") + 1);
}

function bumpMastery(rec: MasteryRecord | undefined, correct: boolean): MasteryRecord {
  const r = rec ?? { learned: false, correct: 0, wrong: 0 };
  return { ...r, correct: r.correct + (correct ? 1 : 0), wrong: r.wrong + (correct ? 0 : 1) };
}

function withMastery(p: Progress, key: string, correct: boolean): Progress {
  const kind = kindOfKey(key);
  const id = keyId(key);
  if (kind === "kana") return { ...p, kanaProgress: { ...p.kanaProgress, [id]: bumpMastery(p.kanaProgress[id], correct) } };
  if (kind === "vocab")
    return { ...p, vocabularyProgress: { ...p.vocabularyProgress, [id]: bumpMastery(p.vocabularyProgress[id], correct) } };
  return p;
}

function addStudyDate(p: Progress, date: string): Progress {
  const studyDates = p.studyDates.includes(date) ? p.studyDates : [...p.studyDates, date].sort();
  return { ...p, studyDates, lastStudyDate: date };
}

/** Record an answer from a lesson or practice session. Wrong answers enter the review queue. */
export function recordAnswer(p: Progress, opts: { reviewKey?: string; correct: boolean; date: string }): Progress {
  let next: Progress = {
    ...p,
    quizStats: { correct: p.quizStats.correct + (opts.correct ? 1 : 0), total: p.quizStats.total + 1 },
  };
  if (!opts.reviewKey) return next;
  next = withMastery(next, opts.reviewKey, opts.correct);
  if (!opts.correct) {
    const existing = next.reviewItems[opts.reviewKey];
    const item: ReviewItem = {
      key: opts.reviewKey,
      kind: kindOfKey(opts.reviewKey),
      stage: 0,
      due: opts.date,
      wrongCount: (existing?.wrongCount ?? 0) + 1,
      correctCount: existing?.correctCount ?? 0,
      lastSeen: opts.date,
    };
    next = { ...next, reviewItems: { ...next.reviewItems, [opts.reviewKey]: item } };
  }
  return next;
}

/** Answer inside the review queue: move up or back to the start of the schedule. */
export function reviewAnswer(p: Progress, key: string, correct: boolean, date: string): Progress {
  const existing = p.reviewItems[key];
  const base: ReviewItem = existing ?? { key, kind: kindOfKey(key), stage: 0, due: date, wrongCount: 0, correctCount: 0 };
  let item: ReviewItem;
  if (correct) {
    const stage = Math.min(base.stage + 1, MASTERED_STAGE);
    const interval = stage >= MASTERED_STAGE ? 60 : REVIEW_INTERVALS[stage];
    item = { ...base, stage, due: addDays(date, Math.max(1, interval)), correctCount: base.correctCount + 1, lastSeen: date };
  } else {
    item = { ...base, stage: 0, due: date, wrongCount: base.wrongCount + 1, lastSeen: date };
  }
  const next = withMastery(
    { ...p, quizStats: { correct: p.quizStats.correct + (correct ? 1 : 0), total: p.quizStats.total + 1 } },
    key,
    correct,
  );
  return { ...next, reviewItems: { ...next.reviewItems, [key]: item } };
}

/** Add newly learned items to the review queue (first review tomorrow). Existing items are kept. */
export function addReviewItems(p: Progress, keys: string[], date: string): Progress {
  const reviewItems = { ...p.reviewItems };
  for (const key of keys) {
    if (reviewItems[key]) continue;
    reviewItems[key] = { key, kind: kindOfKey(key), stage: 1, due: addDays(date, 1), wrongCount: 0, correctCount: 0 };
  }
  return { ...p, reviewItems };
}

function markLearned(p: Progress, keys: string[]): Progress {
  const kanaProgress = { ...p.kanaProgress };
  const vocabularyProgress = { ...p.vocabularyProgress };
  for (const key of keys) {
    const id = keyId(key);
    const kind = kindOfKey(key);
    if (kind === "kana") kanaProgress[id] = { ...(kanaProgress[id] ?? { correct: 0, wrong: 0 }), learned: true };
    if (kind === "vocab") vocabularyProgress[id] = { ...(vocabularyProgress[id] ?? { correct: 0, wrong: 0 }), learned: true };
  }
  return { ...p, kanaProgress, vocabularyProgress };
}

export function completeLesson(
  p: Progress,
  opts: { day: number; score: number; total: number; reviewItems: string[]; date: string },
): Progress {
  const prevResult = p.completedLessons[opts.day];
  const prevScore = p.lessonScores[opts.day];
  const drafts = { ...p.drafts };
  delete drafts[opts.day];
  let next: Progress = {
    ...p,
    drafts,
    completedLessons: {
      ...p.completedLessons,
      // keep the original completion date when revisiting; never erase progress
      [opts.day]: prevResult
        ? { ...prevResult, score: Math.max(prevResult.score, opts.score), total: opts.total }
        : { completedAt: opts.date, score: opts.score, total: opts.total },
    },
    lessonScores: {
      ...p.lessonScores,
      [opts.day]: {
        best: Math.max(prevScore?.best ?? 0, opts.score),
        last: opts.score,
        total: opts.total,
        attempts: (prevScore?.attempts ?? 0) + 1,
      },
    },
  };
  next = addStudyDate(next, opts.date);
  next = markLearned(next, opts.reviewItems);
  next = addReviewItems(next, opts.reviewItems, opts.date);
  return next;
}

export function saveDraft(p: Progress, day: number, draft: Omit<LessonDraft, "updatedAt">, date: string): Progress {
  return { ...p, drafts: { ...p.drafts, [day]: { ...draft, updatedAt: date } } };
}

export function clearDraft(p: Progress, day: number): Progress {
  const drafts = { ...p.drafts };
  delete drafts[day];
  return { ...p, drafts };
}

export function finishStudySession(p: Progress, date: string): Progress {
  return addStudyDate(p, date);
}

export function addStudySeconds(p: Progress, date: string, seconds: number): Progress {
  return { ...p, studyLog: { ...p.studyLog, [date]: (p.studyLog[date] ?? 0) + seconds } };
}

export function toggleFavorite(p: Progress, vocabId: string): Progress {
  const has = p.favoriteVocabulary.includes(vocabId);
  return {
    ...p,
    favoriteVocabulary: has ? p.favoriteVocabulary.filter((v) => v !== vocabId) : [...p.favoriteVocabulary, vocabId],
  };
}

export function setLearned(p: Progress, key: string, learned: boolean, date: string): Progress {
  const kind = kindOfKey(key);
  const id = keyId(key);
  let next = p;
  if (kind === "kana") {
    next = { ...p, kanaProgress: { ...p.kanaProgress, [id]: { ...(p.kanaProgress[id] ?? { correct: 0, wrong: 0 }), learned } } };
  } else if (kind === "vocab") {
    next = {
      ...p,
      vocabularyProgress: { ...p.vocabularyProgress, [id]: { ...(p.vocabularyProgress[id] ?? { correct: 0, wrong: 0 }), learned } },
    };
  }
  return learned ? addReviewItems(next, [key], date) : next;
}

export function updateSettings(p: Progress, settings: Partial<Progress["settings"]>): Progress {
  return { ...p, settings: { ...p.settings, ...settings } };
}

/* -------------------------------------------------------------------------- */
/* Sync merge                                                                  */
/* -------------------------------------------------------------------------- */

function maxRecord<T>(a: Record<string, T>, b: Record<string, T>, pick: (x: T, y: T) => T): Record<string, T> {
  const out: Record<string, T> = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = k in out ? pick(out[k], v) : v;
  return out;
}

function mergeMastery(x: MasteryRecord, y: MasteryRecord): MasteryRecord {
  return { learned: x.learned || y.learned, correct: Math.max(x.correct, y.correct), wrong: Math.max(x.wrong, y.wrong) };
}

/**
 * Combine two copies of progress (e.g. this device + the database) so that
 * nothing learned on either side is lost. Commutative, so the result doesn't
 * depend on which side is "local".
 */
export function mergeProgress(a: Progress, b: Progress): Progress {
  const newer = (a.updatedAt ?? "") >= (b.updatedAt ?? "") ? a : b;
  const completedLessons = maxRecord(a.completedLessons, b.completedLessons, (x, y) => ({
    completedAt: x.completedAt <= y.completedAt ? x.completedAt : y.completedAt,
    score: Math.max(x.score, y.score),
    total: Math.max(x.total, y.total),
    seeded: Boolean(x.seeded && y.seeded) || undefined,
  }));
  const lessonScores = maxRecord(a.lessonScores, b.lessonScores, (x, y) => ({
    best: Math.max(x.best, y.best),
    last: x.attempts >= y.attempts ? x.last : y.last,
    total: Math.max(x.total, y.total),
    attempts: Math.max(x.attempts, y.attempts),
  }));
  // drafts for lessons that are now completed are obsolete
  const drafts = maxRecord(a.drafts, b.drafts, (x, y) => (x.updatedAt >= y.updatedAt ? x : y));
  for (const d of Object.keys(completedLessons)) delete drafts[Number(d)];
  const reviewItems = maxRecord(a.reviewItems, b.reviewItems, (x, y) => {
    const xs = x.lastSeen ?? "";
    const ys = y.lastSeen ?? "";
    const base = xs === ys ? (x.stage >= y.stage ? x : y) : xs > ys ? x : y;
    return { ...base, wrongCount: Math.max(x.wrongCount, y.wrongCount), correctCount: Math.max(x.correctCount, y.correctCount) };
  });
  const studyDates = Array.from(new Set([...a.studyDates, ...b.studyDates])).sort();
  return {
    ...newer,
    createdAt: a.createdAt <= b.createdAt ? a.createdAt : b.createdAt,
    completedLessons,
    lessonScores,
    drafts,
    studyLog: maxRecord(a.studyLog, b.studyLog, Math.max),
    studyDates,
    kanaProgress: maxRecord(a.kanaProgress, b.kanaProgress, mergeMastery),
    vocabularyProgress: maxRecord(a.vocabularyProgress, b.vocabularyProgress, mergeMastery),
    reviewItems,
    favoriteVocabulary: newer.favoriteVocabulary,
    quizStats: a.quizStats.total >= b.quizStats.total ? a.quizStats : b.quizStats,
    lastStudyDate: studyDates[studyDates.length - 1] ?? null,
    settings: newer.settings,
    updatedAt: newer.updatedAt,
  };
}
