import { COURSE_START, SCHEDULE, TOTAL_DAYS } from "@/data/curriculum";
import { HIRAGANA, KATAKANA } from "@/data/kana";
import { VOCABULARY } from "@/data/vocabulary";
import { addDays, diffDays } from "@/lib/date";
import type { Progress, ReviewItem } from "@/lib/types";
import { MASTERED_STAGE } from "./actions";

/** Derived, read-only statistics. */

export function isCompleted(p: Progress, day: number): boolean {
  return Boolean(p.completedLessons[day]);
}

/** Lessons unlock sequentially: a lesson opens when the previous one is completed. */
export function isUnlocked(p: Progress, day: number): boolean {
  return day === 1 || isCompleted(p, day - 1);
}

/** The next lesson the learner should take — never forces "catching up" on missed calendar days. */
export function nextLessonDay(p: Progress): number {
  for (let d = 1; d <= TOTAL_DAYS; d++) if (!isCompleted(p, d)) return d;
  return TOTAL_DAYS;
}

export function completedCount(p: Progress): number {
  return Object.keys(p.completedLessons).length;
}

/** Most recent lesson actually finished by the learner today (seeded progress excluded). */
export function lessonCompletedToday(p: Progress, today: string): number | null {
  const days = Object.entries(p.completedLessons)
    .filter(([, r]) => r.completedAt === today && !r.seeded)
    .map(([d]) => Number(d));
  return days.length ? Math.max(...days) : null;
}

function uniqueSorted(dates: string[]): string[] {
  return Array.from(new Set(dates)).sort();
}

/** Consecutive study days ending today (or yesterday, so the streak isn't "lost" before today's session). */
export function currentStreak(p: Progress, today: string): number {
  const set = new Set(p.studyDates);
  let cursor = set.has(today) ? today : addDays(today, -1);
  let n = 0;
  while (set.has(cursor)) {
    n++;
    cursor = addDays(cursor, -1);
  }
  return n;
}

export function longestStreak(p: Progress): number {
  const dates = uniqueSorted(p.studyDates);
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const d of dates) {
    run = prev && diffDays(prev, d) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

export function totalStudyMinutes(p: Progress): number {
  return Math.round(Object.values(p.studyLog).reduce((a, b) => a + b, 0) / 60);
}

export function minutesOn(p: Progress, date: string): number {
  return Math.round((p.studyLog[date] ?? 0) / 60);
}

export function quizAccuracy(p: Progress): number {
  return p.quizStats.total ? Math.round((p.quizStats.correct / p.quizStats.total) * 100) : 0;
}

export function dueReviewItems(p: Progress, today: string): ReviewItem[] {
  return Object.values(p.reviewItems)
    .filter((i) => i.stage < MASTERED_STAGE && i.due <= today)
    .sort((a, b) => b.wrongCount - a.wrongCount || a.stage - b.stage || a.due.localeCompare(b.due));
}

export function upcomingReviewItems(p: Progress, today: string): ReviewItem[] {
  return Object.values(p.reviewItems)
    .filter((i) => i.stage < MASTERED_STAGE && i.due > today)
    .sort((a, b) => a.due.localeCompare(b.due));
}

export function weakItems(p: Progress, limit = 8): ReviewItem[] {
  return Object.values(p.reviewItems)
    .filter((i) => i.wrongCount > 0 && i.stage < MASTERED_STAGE)
    .sort((a, b) => b.wrongCount - a.wrongCount)
    .slice(0, limit);
}

export function kanaMastery(p: Progress, script: "hiragana" | "katakana") {
  const list = (script === "hiragana" ? HIRAGANA : KATAKANA).filter((k) => k.group !== "special");
  const learned = list.filter((k) => p.kanaProgress[k.char]?.learned).length;
  return { learned, total: list.length, percent: Math.round((learned / list.length) * 100) };
}

export function vocabMastery(p: Progress) {
  const learned = VOCABULARY.filter((v) => p.vocabularyProgress[v.id]?.learned).length;
  return { learned, total: VOCABULARY.length, percent: Math.round((learned / VOCABULARY.length) * 100) };
}

/** Day number of the calendar (Day 1 = course start) */
export function calendarDay(today: string): number {
  return diffDays(COURSE_START, today) + 1;
}

export function levelLabel(p: Progress): { label: string; detail: string } {
  const next = nextLessonDay(p);
  const phase = SCHEDULE[next - 1]?.phase ?? 1;
  if (phase <= 1) return { label: "เริ่มต้น (Zero → ฮิรางานะ)", detail: "เฟส 1: พื้นฐาน" };
  if (phase === 2) return { label: "อ่านฮิรางานะได้", detail: "เฟส 2: คาตากานะ" };
  if (phase <= 4) return { label: "ผู้เริ่มต้น", detail: "เฟส 3–4: คำศัพท์และไวยากรณ์" };
  if (phase <= 8) return { label: "ผู้เริ่มต้น (ใช้งานได้)", detail: "เฟส 5–8: ภาษาเพื่อการเดินทาง" };
  return { label: "พร้อมเที่ยว (ใกล้ N5)", detail: "เฟส 9–12: ฝึกสนทนาและเตรียมทริป" };
}
