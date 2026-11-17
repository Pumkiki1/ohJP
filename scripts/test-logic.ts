/** Logic checks for progress rules. Run: npx tsx scripts/test-logic.ts */
import assert from "node:assert/strict";
import { completeLesson, mergeProgress, recordAnswer, reviewAnswer } from "../src/lib/progress/actions";
import { currentStreak, dueReviewItems, isUnlocked, lessonCompletedToday, longestStreak, nextLessonDay } from "../src/lib/progress/stats";
import { romajiToHiragana } from "../src/lib/romaji";
import { addDays } from "../src/lib/date";

// localStorage-free initial progress (store.ts is client-only; build the same seed here)
import { createInitialProgress } from "../src/lib/progress/store";

let p = createInitialProgress();
const T = "2026-11-17";
assert.equal(p.completedLessons[1].score, 5, "Day 1 seeded 5/5");
assert.equal(nextLessonDay(p), 2, "Day 2 next");
assert.ok(isUnlocked(p, 2) && !isUnlocked(p, 3), "Day 3 locked");
assert.equal(lessonCompletedToday(p, T), null, "seed not counted as today's lesson");
assert.equal(currentStreak(p, T), 1);

// complete day 2 today
p = completeLesson(p, { day: 2, score: 8, total: 10, reviewItems: ["kana:あ", "kana:い"], date: T });
assert.ok(isUnlocked(p, 3));
assert.equal(lessonCompletedToday(p, T), 2);
// revisit keeps original date and best score
p = completeLesson(p, { day: 2, score: 6, total: 10, reviewItems: [], date: addDays(T, 3) });
assert.equal(p.completedLessons[2].completedAt, T);
assert.equal(p.completedLessons[2].score, 8);
assert.equal(p.lessonScores[2].attempts, 2);

// streak: miss a day, lessons kept
p = { ...p, studyDates: ["2026-11-17", "2026-11-18", "2026-11-20"] };
assert.equal(currentStreak(p, "2026-11-20"), 1);
assert.equal(currentStreak(p, "2026-11-21"), 1, "yesterday keeps streak");
assert.equal(currentStreak(p, "2026-11-23"), 0);
assert.equal(longestStreak(p), 2);
assert.equal(nextLessonDay(p), 3, "missed days don't force catch-up");

// SRS
p = recordAnswer(p, { reviewKey: "kana:か", correct: false, date: T });
assert.equal(p.reviewItems["kana:か"].due, T, "wrong -> same day");
assert.ok(dueReviewItems(p, T).some((i) => i.key === "kana:か"));
p = reviewAnswer(p, "kana:か", true, T);
assert.equal(p.reviewItems["kana:か"].due, addDays(T, 1));
p = reviewAnswer(p, "kana:か", true, addDays(T, 1));
assert.equal(p.reviewItems["kana:か"].due, addDays(T, 4), "stage 2 -> +3 days");
p = reviewAnswer(p, "kana:か", false, addDays(T, 4));
assert.equal(p.reviewItems["kana:か"].stage, 0);

// sync merge: nothing learned on either side is lost
{
  const base = createInitialProgress();
  const phone = completeLesson(base, { day: 2, score: 7, total: 10, reviewItems: ["kana:あ"], date: T });
  const laptop = recordAnswer(
    completeLesson(completeLesson(base, { day: 2, score: 9, total: 10, reviewItems: [], date: addDays(T, 1) }), {
      day: 3,
      score: 8,
      total: 9,
      reviewItems: ["kana:か"],
      date: addDays(T, 1),
    }),
    { reviewKey: "kana:き", correct: false, date: addDays(T, 1) },
  );
  const m1 = mergeProgress({ ...phone, updatedAt: "2026-11-17T10:00:00Z" }, { ...laptop, updatedAt: "2026-11-18T10:00:00Z" });
  const m2 = mergeProgress({ ...laptop, updatedAt: "2026-11-18T10:00:00Z" }, { ...phone, updatedAt: "2026-11-17T10:00:00Z" });
  assert.deepEqual(m1.completedLessons, m2.completedLessons, "merge is order-independent");
  assert.equal(m1.completedLessons[2].completedAt, T, "earliest completion date kept");
  assert.equal(m1.completedLessons[2].score, 9, "best score kept");
  assert.ok(m1.completedLessons[3], "lesson from other device kept");
  assert.ok(m1.reviewItems["kana:あ"] && m1.reviewItems["kana:か"] && m1.reviewItems["kana:き"], "review items unioned");
  assert.deepEqual(m1.studyDates, [T, addDays(T, 1)]);
  assert.equal(nextLessonDay(m1), 4);
}

// romaji
assert.equal(romajiToHiragana("ohayou"), "おはよう");
assert.equal(romajiToHiragana("kitte"), "きって");
assert.equal(romajiToHiragana("konnichiwa"), "こんにちわ");
assert.equal(romajiToHiragana("shinkansen"), "しんかんせん");
assert.equal(romajiToHiragana("kyou"), "きょう");
console.log("All logic tests passed.");
