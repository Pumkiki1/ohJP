import { AUTHORED_LESSONS } from "@/data/lessons";
import { ALL_KANA, getKana, HIRAGANA, isQuizzableKana, KATAKANA } from "@/data/kana";
import { getGrammar } from "@/data/grammar";
import { getVocab, VOCABULARY } from "@/data/vocabulary";
import { makeOptions, shuffle } from "@/lib/random";
import type { Exercise, KanaChar, Progress, Script, Vocabulary } from "@/lib/types";
import { kindOfKey } from "@/lib/progress/actions";

/**
 * Builds exercises at runtime from curated data (kana table, vocabulary bank,
 * grammar points, authored lessons). Used by Practice, Review and Kana pages.
 */

function kanaPool(script: Script): KanaChar[] {
  return (script === "hiragana" ? HIRAGANA : KATAKANA).filter(isQuizzableKana);
}

function kanaExplain(k: KanaChar) {
  return `${k.char} อ่านว่า “${k.romaji}” (${k.thai})${k.mnemonic ? ` — ${k.mnemonic}` : ""}`;
}

export function kanaRecognition(k: KanaChar, idSuffix = ""): Exercise {
  const pool = kanaPool(k.script);
  const sameGroup = pool.filter((x) => x.group === k.group);
  return {
    id: `kana-${k.char}-${idSuffix}`,
    type: "multiple-choice",
    question: "ตัวอักษรนี้อ่านว่าอะไร?",
    prompt: k.char,
    promptIsJapanese: true,
    options: makeOptions(k.romaji, (sameGroup.length >= 4 ? sameGroup : pool).map((x) => x.romaji), 4, Math.random),
    correctAnswer: k.romaji,
    explanation: kanaExplain(k),
    difficulty: 1,
    reviewKey: `kana:${k.char}`,
  };
}

export function kanaReverse(k: KanaChar, idSuffix = ""): Exercise {
  const pool = kanaPool(k.script).filter((x) => x.group === k.group || k.group === "basic");
  return {
    id: `kanar-${k.char}-${idSuffix}`,
    type: "multiple-choice",
    question: `ตัวไหนอ่านว่า “${k.romaji}”?`,
    options: makeOptions(k.char, pool.map((x) => x.char), 4, Math.random),
    optionsAreJapanese: true,
    correctAnswer: k.char,
    explanation: kanaExplain(k),
    difficulty: 1,
    reviewKey: `kana:${k.char}`,
  };
}

export function kanaListen(k: KanaChar, idSuffix = ""): Exercise {
  const pool = kanaPool(k.script);
  return {
    id: `kanal-${k.char}-${idSuffix}`,
    type: "listen",
    question: "ฟังเสียง แล้วเลือกตัวอักษรที่ได้ยิน",
    audioText: k.char,
    options: makeOptions(k.char, pool.map((x) => x.char), 4, Math.random),
    optionsAreJapanese: true,
    correctAnswer: k.char,
    explanation: kanaExplain(k),
    difficulty: 2,
    reviewKey: `kana:${k.char}`,
  };
}

/** Random kana quiz from a set of characters (defaults to all basic of the script). */
export function kanaQuiz(script: Script, count = 10, chars?: string[]): Exercise[] {
  const pool = chars?.length
    ? chars.map((c) => getKana(c)).filter((k): k is KanaChar => Boolean(k && isQuizzableKana(k)))
    : kanaPool(script).filter((k) => k.group === "basic");
  const picked = shuffle(pool).slice(0, count);
  return picked.map((k, i) => {
    const r = i % 5;
    if (r === 3) return kanaReverse(k, String(i));
    if (r === 4) return kanaListen(k, String(i));
    return kanaRecognition(k, String(i));
  });
}

function vocabLabel(v: Vocabulary) {
  return `${v.japanese}${v.hiragana ? ` (${v.hiragana})` : ""} = ${v.meaning} · ${v.romaji}`;
}

export function vocabMeaning(v: Vocabulary, idSuffix = ""): Exercise {
  const same = VOCABULARY.filter((x) => x.category === v.category && x.meaning !== v.meaning);
  const pool = (same.length >= 3 ? same : VOCABULARY).map((x) => x.meaning);
  return {
    id: `vm-${v.id}-${idSuffix}`,
    type: "read-meaning",
    question: "คำนี้แปลว่าอะไร?",
    japanese: v.japanese,
    reading: v.hiragana,
    options: makeOptions(v.meaning, pool, 4, Math.random),
    correctAnswer: v.meaning,
    explanation: vocabLabel(v) + (v.note ? ` — ${v.note}` : ""),
    difficulty: v.difficulty,
    reviewKey: `vocab:${v.id}`,
  };
}

export function vocabReverse(v: Vocabulary, idSuffix = ""): Exercise {
  const same = VOCABULARY.filter((x) => x.category === v.category && x.japanese !== v.japanese);
  const pool = (same.length >= 3 ? same : VOCABULARY).map((x) => x.japanese);
  return {
    id: `vr-${v.id}-${idSuffix}`,
    type: "multiple-choice",
    question: `“${v.meaning}” ภาษาญี่ปุ่นพูดว่าอย่างไร?`,
    options: makeOptions(v.japanese, pool, 4, Math.random),
    optionsAreJapanese: true,
    correctAnswer: v.japanese,
    explanation: vocabLabel(v),
    difficulty: v.difficulty,
    reviewKey: `vocab:${v.id}`,
  };
}

export function vocabListen(v: Vocabulary, idSuffix = ""): Exercise {
  const same = VOCABULARY.filter((x) => x.category === v.category && x.meaning !== v.meaning);
  const pool = (same.length >= 3 ? same : VOCABULARY).map((x) => x.meaning);
  return {
    id: `vl-${v.id}-${idSuffix}`,
    type: "listen",
    question: "ฟังแล้วเลือกความหมาย",
    audioText: v.hiragana ?? v.japanese,
    options: makeOptions(v.meaning, pool, 4, Math.random),
    correctAnswer: v.meaning,
    explanation: vocabLabel(v),
    difficulty: 2,
    reviewKey: `vocab:${v.id}`,
  };
}

const HIRAGANA_ONLY = /^[ぁ-ゖー]+$/;

/** Typing exercises: learner sees the meaning + romaji and types hiragana. */
export function vocabTyping(v: Vocabulary, idSuffix = ""): Exercise | null {
  const kana = (v.hiragana ?? v.japanese).replace(/\s/g, "");
  if (!HIRAGANA_ONLY.test(kana)) return null;
  return {
    id: `vt-${v.id}-${idSuffix}`,
    type: "type",
    question: `พิมพ์คำว่า “${v.meaning}” เป็นฮิรางานะ (พิมพ์โรมาจิแล้วระบบแปลงให้)`,
    prompt: v.romaji,
    inputMode: "kana",
    correctAnswer: kana,
    explanation: vocabLabel(v),
    difficulty: 3,
    reviewKey: `vocab:${v.id}`,
  };
}

export function vocabQuiz(words: Vocabulary[], count = 10): Exercise[] {
  const picked = shuffle(words).slice(0, count);
  return picked.map((v, i) => {
    const r = i % 4;
    if (r === 1) return vocabReverse(v, String(i));
    if (r === 2) return vocabListen(v, String(i));
    return vocabMeaning(v, String(i));
  });
}

export function typingQuiz(words: Vocabulary[], count = 8): Exercise[] {
  return shuffle(words)
    .map((v, i) => vocabTyping(v, String(i)))
    .filter((e): e is Exercise => e !== null)
    .slice(0, count);
}

/** Mixed exercises taken from lessons the learner has completed. */
export function lessonMix(p: Progress, count = 10): Exercise[] {
  const done = AUTHORED_LESSONS.filter((l) => p.completedLessons[l.dayNumber]);
  const all = done.flatMap((l) => l.exercises.map((e) => ({ ...e, id: `mix-${e.id}` })));
  return shuffle(all).slice(0, count);
}

/** One exercise for a review-queue key. Returns null if the key no longer exists in the data. */
export function reviewExercise(key: string, idx: number): Exercise | null {
  const kind = kindOfKey(key);
  const id = key.slice(key.indexOf(":") + 1);
  if (kind === "kana") {
    const k = getKana(id);
    if (!k) return null;
    return idx % 3 === 2 ? kanaListen(k, `rv${idx}`) : idx % 3 === 1 ? kanaReverse(k, `rv${idx}`) : kanaRecognition(k, `rv${idx}`);
  }
  if (kind === "vocab") {
    const v = getVocab(id);
    if (!v) return null;
    return idx % 3 === 1 ? vocabReverse(v, `rv${idx}`) : idx % 3 === 2 ? vocabListen(v, `rv${idx}`) : vocabMeaning(v, `rv${idx}`);
  }
  const g = getGrammar(id);
  if (!g) return null;
  return {
    id: `gr-${g.id}-${idx}`,
    type: "multiple-choice",
    question: g.quiz.question,
    options: shuffle(g.quiz.options),
    optionsAreJapanese: true,
    correctAnswer: g.quiz.correctAnswer,
    explanation: `${g.pattern}: ${g.quiz.explanation}`,
    difficulty: 2,
    reviewKey: key,
  };
}

/** Human-readable label for a review key (used in "topics to review"). */
export function reviewKeyLabel(key: string): string {
  const kind = kindOfKey(key);
  const id = key.slice(key.indexOf(":") + 1);
  if (kind === "kana") {
    const k = getKana(id);
    return k ? `${k.char} (${k.romaji}) — ${k.script === "hiragana" ? "ฮิรางานะ" : "คาตากานะ"}` : id;
  }
  if (kind === "vocab") {
    const v = getVocab(id);
    return v ? `${v.japanese} — ${v.meaning}` : id;
  }
  const g = getGrammar(id);
  return g ? `${g.pattern} — ${g.title}` : id;
}

export function allKanaChars(): string[] {
  return ALL_KANA.map((k) => k.char);
}
