import { getKana, isQuizzableKana, kanaByChars, STROKE_GUIDES } from "@/data/kana";
import { makeOptions, seededRandom, shuffle } from "@/lib/random";
import type { ContentBlock, Exercise, KanaChar, Lesson, LessonSection, Script } from "@/lib/types";

/**
 * Helpers that turn compact, hand-written lesson specs into full Lesson objects.
 * All Japanese shown to the learner comes from curated data (kana table + the
 * words listed in each spec) — nothing is machine-invented at runtime.
 */

export interface ReadingWord {
  japanese: string;
  romaji: string;
  meaning: string;
  /** Extra accepted romaji spellings for typing exercises */
  accept?: string[];
}

export interface KanaLessonSpec {
  day: number;
  phase: number;
  title: string;
  subtitle: string;
  topic: string;
  script: Script;
  /** New characters in this lesson */
  chars: string[];
  /** Characters of the same script learned before (used for distractors & review) */
  known: string[];
  objectives: string[];
  intro: string;
  /** Extra blocks for the Learn section (after the character cards) */
  learnExtra?: ContentBlock[];
  /** Similar-looking pairs to compare in the Understand section */
  compare?: { japanese: string; label: string; note: string }[];
  understandExtra?: ContentBlock[];
  /** Words the learner can already read with the characters learned so far */
  words: ReadingWord[];
  vocabulary?: string[];
  extraExercises?: Exercise[];
  summary?: string[];
  /** Override the set of characters drilled by generated exercises */
  drillChars?: string[];
}

export function section(kind: LessonSection["kind"], title: string, blocks: ContentBlock[], minutes = 5): LessonSection {
  return { kind, title, minutes, blocks };
}

function kanaExplanation(k: KanaChar): string {
  const base = `${k.char} อ่านว่า “${k.romaji}” (${k.thai})`;
  return k.mnemonic ? `${base} — จำง่าย ๆ: ${k.mnemonic}` : base;
}

/** Generate a balanced set of kana exercises from curated kana data. */
export function generateKanaExercises(
  day: number,
  drill: string[],
  known: string[],
  words: ReadingWord[],
): Exercise[] {
  const rand = seededRandom(day * 7919);
  const chars = kanaByChars(drill).filter((k) => k.group !== "special");
  // exclude sound-alikes (を/ぢ/づ…) so a distractor can never also be a correct answer
  const poolChars = kanaByChars(Array.from(new Set([...drill, ...known]))).filter(isQuizzableKana);
  const romajiPool = poolChars.map((k) => k.romaji);
  const charPool = poolChars.map((k) => k.char);
  const ex: Exercise[] = [];
  let n = 0;
  const id = () => `d${day}-g${++n}`;

  // 1. Match characters ↔ sounds
  const matchSet = chars.slice(0, 5);
  if (matchSet.length >= 3) {
    ex.push({
      id: id(),
      type: "match",
      question: "จับคู่ตัวอักษรกับเสียงอ่านให้ถูกต้อง",
      pairs: matchSet.map((k) => ({ left: k.char, right: k.romaji })),
      leftIsJapanese: true,
      explanation: matchSet.map((k) => `${k.char} = ${k.romaji}`).join(" · "),
      difficulty: 1,
    });
  }

  // 2. Recognition: character → sound (one per character, max 4)
  const order = shuffle(chars, rand);
  order.slice(0, 4).forEach((k) => {
    ex.push({
      id: id(),
      type: "multiple-choice",
      question: "ตัวอักษรนี้อ่านว่าอะไร?",
      prompt: k.char,
      promptIsJapanese: true,
      options: makeOptions(k.romaji, romajiPool, Math.min(4, romajiPool.length), rand),
      correctAnswer: k.romaji,
      explanation: kanaExplanation(k),
      difficulty: 1,
      reviewKey: `kana:${k.char}`,
    });
  });

  // 3. Reverse: sound → character
  const rev = order.slice(-2);
  rev.forEach((k) => {
    ex.push({
      id: id(),
      type: "multiple-choice",
      question: `ตัวไหนอ่านว่า “${k.romaji}”?`,
      options: makeOptions(k.char, charPool, Math.min(4, charPool.length), rand),
      optionsAreJapanese: true,
      correctAnswer: k.char,
      explanation: kanaExplanation(k),
      difficulty: 1,
      reviewKey: `kana:${k.char}`,
    });
  });

  // 4. Listening
  const listenK = order[Math.floor(rand() * order.length)];
  ex.push({
    id: id(),
    type: "listen",
    question: "ฟังเสียง แล้วเลือกตัวอักษรที่ได้ยิน",
    audioText: listenK.char,
    options: makeOptions(listenK.char, charPool, Math.min(4, charPool.length), rand),
    optionsAreJapanese: true,
    correctAnswer: listenK.char,
    explanation: kanaExplanation(listenK),
    difficulty: 2,
    reviewKey: `kana:${listenK.char}`,
  });

  // 5. True / false
  const tfK = order[0];
  const wrongRomaji = makeOptions(tfK.romaji, romajiPool, 2, rand).find((r) => r !== tfK.romaji) ?? tfK.romaji;
  const tfTrue = rand() > 0.5 || wrongRomaji === tfK.romaji;
  ex.push({
    id: id(),
    type: "true-false",
    question: "ข้อความนี้ถูกหรือผิด?",
    statement: `${tfK.char} อ่านว่า “${tfTrue ? tfK.romaji : wrongRomaji}”`,
    statementJapanese: tfK.char,
    correctAnswer: tfTrue,
    explanation: kanaExplanation(tfK),
    difficulty: 1,
    reviewKey: `kana:${tfK.char}`,
  });

  // 6. Read words
  if (words.length >= 2) {
    const w = words[Math.floor(rand() * words.length)];
    ex.push({
      id: id(),
      type: "read-meaning",
      question: "อ่านคำนี้ แล้วเลือกความหมาย",
      japanese: w.japanese,
      options: makeOptions(w.meaning, words.map((x) => x.meaning), Math.min(4, words.length), rand),
      correctAnswer: w.meaning,
      explanation: `${w.japanese} อ่านว่า “${w.romaji}” แปลว่า ${w.meaning}`,
      difficulty: 2,
    });
    const t = words.find((x) => x !== w) ?? w;
    ex.push({
      id: id(),
      type: "type",
      question: "พิมพ์เสียงอ่าน (โรมาจิ) ของคำนี้",
      prompt: t.japanese,
      inputMode: "romaji",
      correctAnswer: t.romaji,
      acceptedAnswers: t.accept,
      explanation: `${t.japanese} อ่านว่า “${t.romaji}” แปลว่า ${t.meaning}`,
      difficulty: 2,
    });
  }
  return ex;
}

export function buildKanaLesson(spec: KanaLessonSpec): Lesson {
  const chars = kanaByChars(spec.chars);
  const stroke = spec.chars.filter((c) => STROKE_GUIDES[c]);

  const learn: ContentBlock[] = [
    { kind: "text", text: spec.intro },
    { kind: "kana-focus", chars: spec.chars, script: spec.script },
    ...(stroke.length ? [{ kind: "stroke-guide", chars: stroke } as ContentBlock] : []),
    ...(spec.learnExtra ?? []),
  ];

  const understand: ContentBlock[] = [
    {
      kind: "table",
      headers: ["ตัวอักษร", "โรมาจิ", "เสียงไทย", "ตัวช่วยจำ"],
      rows: chars.map((k) => [k.char, k.romaji, k.thai, k.mnemonic ?? "-"]),
      japaneseCols: [0],
    },
    ...(spec.compare?.length ? [{ kind: "compare", items: spec.compare } as ContentBlock] : []),
    ...(spec.understandExtra ?? []),
    ...(spec.words.length
      ? [
          {
            kind: "read-aloud",
            items: spec.words.map((w) => ({ japanese: w.japanese, romaji: w.romaji, meaning: w.meaning })),
          } as ContentBlock,
        ]
      : []),
  ];

  const practice: ContentBlock[] = [
    { kind: "text", text: "ถึงเวลาฝึกแล้ว! ตอบผิดได้ไม่เป็นไร ระบบจะอธิบายและให้ลองใหม่ คำที่ตอบผิดจะถูกเก็บไว้ทบทวนภายหลัง" },
  ];

  const summary = spec.summary ?? [
    `วันนี้เรียน ${spec.chars.length} ตัว: ${chars.map((k) => `${k.char} (${k.romaji})`).join(" ")}`,
    "อ่านออกเสียงซ้ำวันละ 1–2 รอบจะช่วยให้จำได้เร็วขึ้น",
  ];

  const review: ContentBlock[] = [
    { kind: "checklist", items: summary },
    {
      kind: "read-aloud",
      items: [...chars]
        .sort((a, b) => a.romaji.localeCompare(b.romaji))
        .map((k) => ({ japanese: k.char, romaji: k.romaji })),
    },
    { kind: "tip", title: "ทบทวนแบบสลับลำดับ", text: "ลองปิดโรมาจิแล้วอ่านตัวอักษรด้านบนแบบสุ่ม ถ้าอ่านได้ครบ แปลว่าพร้อมไปบทต่อไปแล้ว!" },
  ];

  const exercises = [
    ...generateKanaExercises(spec.day, spec.drillChars ?? spec.chars, spec.known, spec.words),
    ...(spec.extraExercises ?? []),
  ];

  return {
    id: `day-${spec.day}`,
    dayNumber: spec.day,
    title: spec.title,
    subtitle: spec.subtitle,
    phase: spec.phase,
    topic: spec.topic,
    estimatedMinutes: 20,
    objectives: spec.objectives,
    vocabulary: spec.vocabulary ?? [],
    grammar: [],
    kana: spec.chars,
    sections: [
      section("learn", "ตัวอักษรใหม่วันนี้", learn),
      section("understand", "ตารางเสียง · ตัวที่คล้ายกัน · ฝึกอ่าน", understand),
      section("practice", "แบบฝึกหัด", practice),
      section("review", "สรุปบทเรียน", review),
    ],
    exercises,
    summary,
    reviewItems: [
      ...spec.chars.filter((c) => getKana(c)?.group !== "special").map((c) => `kana:${c}`),
      ...(spec.vocabulary ?? []).map((id) => `vocab:${id}`),
    ],
  };
}

/** Utility for hand-written exercise ids */
export function exId(day: number, n: number): string {
  return `d${day}-e${n}`;
}
