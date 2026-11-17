/**
 * Content QA: checks every authored lesson, scenario and data reference.
 * Run: npx tsx scripts/validate-content.ts
 */
import { AUTHORED_LESSONS } from "../src/data/lessons";
import { SCHEDULE, TOTAL_DAYS } from "../src/data/curriculum";
import { TRAVEL_SCENARIOS } from "../src/data/travel";
import { getVocab, VOCABULARY } from "../src/data/vocabulary";
import { getKana } from "../src/data/kana";
import type { Exercise } from "../src/lib/types";

const errors: string[] = [];
const ids = new Set<string>();

function checkExercise(where: string, e: Exercise) {
  if (ids.has(e.id)) errors.push(`${where}: duplicate exercise id ${e.id}`);
  ids.add(e.id);
  if (!e.explanation) errors.push(`${where}/${e.id}: missing explanation`);
  if ("options" in e && "correctAnswer" in e && typeof e.correctAnswer === "string") {
    if (!e.options.includes(e.correctAnswer)) errors.push(`${where}/${e.id}: answer not in options`);
    if (new Set(e.options).size !== e.options.length) errors.push(`${where}/${e.id}: duplicate options ${e.options}`);
    if (e.options.length < 2) errors.push(`${where}/${e.id}: <2 options`);
  }
  if ((e.type === "listen" || e.type === "multiple-choice") && "optionsAreJapanese" in e && e.optionsAreJapanese) {
    const ans = getKana(e.correctAnswer);
    if (ans) {
      const clash = e.options.filter((o) => o !== e.correctAnswer && getKana(o)?.romaji.replace(/\s*\(.*\)/, "") === ans.romaji.replace(/\s*\(.*\)/, ""));
      if (clash.length) errors.push(`${where}/${e.id}: sound-alike options ${clash}`);
    }
  }
  if (e.type === "match" && new Set(e.pairs.map((p) => p.right)).size !== e.pairs.length) errors.push(`${where}/${e.id}: duplicate match rights`);
  if (e.type === "fill-blank" && !e.sentence.includes("___")) errors.push(`${where}/${e.id}: no blank`);
  if (e.reviewKey) {
    const [kind, id] = [e.reviewKey.split(":")[0], e.reviewKey.slice(e.reviewKey.indexOf(":") + 1)];
    if (kind === "kana" && !getKana(id)) errors.push(`${where}/${e.id}: unknown kana ${id}`);
    if (kind === "vocab" && !getVocab(id)) errors.push(`${where}/${e.id}: unknown vocab ${id}`);
  }
}

for (const l of AUTHORED_LESSONS) {
  const w = `Day ${l.dayNumber}`;
  if (l.exercises.length < 5) errors.push(`${w}: only ${l.exercises.length} exercises`);
  if (l.sections.length !== 4) errors.push(`${w}: sections ${l.sections.length}`);
  if (l.sections.reduce((a, s) => a + s.minutes, 0) !== 20) errors.push(`${w}: minutes != 20`);
  if (!l.objectives.length || !l.summary.length) errors.push(`${w}: missing objectives/summary`);
  l.vocabulary.forEach((v) => !getVocab(v) && errors.push(`${w}: unknown vocab ${v}`));
  l.reviewItems.forEach((k) => {
    const id = k.slice(k.indexOf(":") + 1);
    if (k.startsWith("vocab:") && !getVocab(id)) errors.push(`${w}: unknown review vocab ${id}`);
    if (k.startsWith("kana:") && !getKana(id)) errors.push(`${w}: unknown review kana ${id}`);
  });
  l.exercises.forEach((e) => checkExercise(w, e));
}
for (const s of TRAVEL_SCENARIOS) {
  s.practice.forEach((e) => checkExercise(`travel/${s.id}`, e));
  s.steps.forEach((st, i) => {
    if (st.choices && st.choices.filter((c) => c.correct).length !== 1) errors.push(`travel/${s.id} step ${i}: needs exactly 1 correct`);
  });
}
if (new Set(VOCABULARY.map((v) => v.id)).size !== VOCABULARY.length) errors.push("duplicate vocab ids");
if (SCHEDULE.length !== TOTAL_DAYS) errors.push("schedule length mismatch");
SCHEDULE.forEach((s) => {
  if (!s.title || !s.objectives.length) errors.push(`schedule day ${s.dayNumber} incomplete`);
  if (!s.authored && !s.outline?.plan.length) errors.push(`schedule day ${s.dayNumber} has no plan`);
});

console.log(`lessons=${AUTHORED_LESSONS.length} days=${TOTAL_DAYS} vocab=${VOCABULARY.length} scenarios=${TRAVEL_SCENARIOS.length}`);
console.log(`first=${SCHEDULE[0].date} last=${SCHEDULE[SCHEDULE.length - 1].date} day31="${SCHEDULE[30].title}" day46="${SCHEDULE[45].title}"`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("All content checks passed.");
