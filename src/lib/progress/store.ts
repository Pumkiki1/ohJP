"use client";

import { useSyncExternalStore } from "react";
import { COURSE_START, getLesson } from "@/data/curriculum";
import { addDays } from "@/lib/date";
import type { Progress } from "@/lib/types";
import { addReviewItems } from "./actions";

/**
 * LocalStorage-backed progress store. Swap `persist`/`readStored` for an API
 * call to move progress to a server later — the rest of the app only uses
 * `useProgress()` and `updateProgress()`.
 */

import { STORAGE_KEY } from "./constants";
export { STORAGE_KEY };

/** studyLog key for time studied before the learner started using the app */
export const SEED_LOG_KEY = "before-app";

export function createInitialProgress(): Progress {
  const base: Progress = {
    version: 1,
    createdAt: COURSE_START,
    completedLessons: {},
    lessonScores: {},
    drafts: {},
    studyLog: {},
    studyDates: [],
    kanaProgress: {},
    vocabularyProgress: {},
    reviewItems: {},
    favoriteVocabulary: [],
    quizStats: { correct: 0, total: 0 },
    lastStudyDate: null,
    settings: { theme: "light", reminderTime: null, dailyGoalMinutes: 20 },
  };

  // The learner already studied Day 1 on the course start date (score 5/5).
  const day1 = getLesson(1);
  const reviewKeys = day1?.reviewItems ?? [];
  const vocabularyProgress: Progress["vocabularyProgress"] = {};
  for (const key of reviewKeys) {
    if (key.startsWith("vocab:")) vocabularyProgress[key.slice(6)] = { learned: true, correct: 1, wrong: 0 };
  }
  const seeded: Progress = {
    ...base,
    completedLessons: { 1: { completedAt: COURSE_START, score: 5, total: 5, seeded: true } },
    lessonScores: { 1: { best: 5, last: 5, total: 5, attempts: 1 } },
    // Day 1 study time is counted in totals but not as "today" so today's goal starts fresh.
    studyLog: { [SEED_LOG_KEY]: 20 * 60 },
    studyDates: [COURSE_START],
    vocabularyProgress,
    quizStats: { correct: 5, total: 5 },
    lastStudyDate: COURSE_START,
  };
  const withQueue = addReviewItems(seeded, reviewKeys, COURSE_START);
  // first review of Day 1 items is the next day
  for (const k of reviewKeys) withQueue.reviewItems[k] = { ...withQueue.reviewItems[k], due: addDays(COURSE_START, 1) };
  return withQueue;
}

function isProgress(v: unknown): v is Progress {
  if (!v || typeof v !== "object") return false;
  const o = v as Partial<Progress>;
  return o.version === 1 && typeof o.completedLessons === "object" && Array.isArray(o.studyDates);
}

/** Light is the default; a saved theme only applies if the learner chose it. */
function withDefaultTheme(s: Progress["settings"]): Progress["settings"] {
  return s.themeChosen ? s : { ...s, theme: "light" };
}

/** Fill in fields that older saves may be missing. */
function migrate(p: Progress): Progress {
  const init = createInitialProgress();
  return {
    ...init,
    ...p,
    settings: withDefaultTheme({ ...init.settings, ...(p.settings ?? {}) }),
    quizStats: p.quizStats ?? init.quizStats,
  };
}

let state: Progress | null = null;
let loadError: string | null = null;
const listeners = new Set<() => void>();

function readStored(): Progress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialProgress();
    const parsed: unknown = JSON.parse(raw);
    if (isProgress(parsed)) return migrate(parsed);
    loadError = "ข้อมูลความก้าวหน้าที่บันทึกไว้อ่านไม่ได้ จึงเริ่มต้นใหม่ให้";
    return createInitialProgress();
  } catch {
    loadError = "เบราว์เซอร์ไม่อนุญาตให้อ่านข้อมูลที่บันทึกไว้ ความก้าวหน้าอาจไม่ถูกบันทึก";
    return createInitialProgress();
  }
}

/** The exact string this module last wrote, used to detect writes from elsewhere. */
let lastRaw: string | null = null;

function persist(p: Progress) {
  try {
    lastRaw = JSON.stringify(p);
    window.localStorage.setItem(STORAGE_KEY, lastRaw);
    loadError = null;
  } catch {
    loadError = "บันทึกความก้าวหน้าไม่สำเร็จ (พื้นที่เก็บข้อมูลของเบราว์เซอร์อาจเต็มหรือถูกปิดไว้)";
  }
}

/** If storage was changed by something else (another tab), start from that newer copy. */
function syncFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw && lastRaw !== null && raw !== lastRaw) state = readStored();
  } catch {
    /* storage unavailable: keep in-memory state */
  }
}

function ensureLoaded(): Progress {
  if (state === null) {
    state = readStored();
    persist(state);
  }
  return state;
}

function emit() {
  listeners.forEach((l) => l());
}

export function getProgress(): Progress {
  return ensureLoaded();
}

/* ---------------------------- change listeners ---------------------------- */

/**
 * "merge": a normal change — the database copy should be merged with it.
 * "replace": reset/import — the database copy should be overwritten.
 */
export type ChangeKind = "merge" | "replace";
const changeListeners = new Set<(kind: ChangeKind) => void>();

/** Notified on every learner-made change (used by database sync). */
export function onLocalChange(cb: (kind: ChangeKind) => void): () => void {
  changeListeners.add(cb);
  return () => changeListeners.delete(cb);
}

function commit(next: Progress, kind: ChangeKind | null) {
  state = next;
  persist(next);
  emit();
  if (kind) changeListeners.forEach((l) => l(kind));
}

const stamp = (p: Progress): Progress => ({ ...p, updatedAt: new Date().toISOString() });

export function updateProgress(fn: (p: Progress) => Progress) {
  syncFromStorage();
  commit(stamp(fn(ensureLoaded())), "merge");
}

export function replaceProgress(p: Progress) {
  commit(stamp(migrate(p)), "replace");
}

export function resetProgress() {
  commit(stamp(createInitialProgress()), "replace");
}

/** Merge a copy loaded from the database into local progress (no new local change). */
export function applyRemoteProgress(remote: Progress, merge: (a: Progress, b: Progress) => Progress): Progress {
  syncFromStorage();
  const merged = merge(ensureLoaded(), migrate(remote));
  commit(merged, null);
  return merged;
}

/** Validates data loaded from outside (database / file). */
export function parseProgress(v: unknown): Progress | null {
  return isProgress(v) ? migrate(v) : null;
}

export function importProgress(json: string): boolean {
  try {
    const parsed: unknown = JSON.parse(json);
    if (!isProgress(parsed)) return false;
    replaceProgress(parsed);
    return true;
  } catch {
    return false;
  }
}

export function getStorageError(): string | null {
  return loadError;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // keep tabs in sync
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = null;
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = () => null;

/** Returns null during server render / before hydration, then the learner's progress. */
export function useProgress(): Progress | null {
  return useSyncExternalStore(subscribe, ensureLoaded, getServerSnapshot);
}
