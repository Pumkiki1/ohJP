import type { Lesson } from "@/lib/types";
import { buildKanaLesson, exId, section } from "./builders";

/**
 * Phase 1 — November 2026 — Japanese foundations (Days 1–14)
 */

const VOWELS = ["あ", "い", "う", "え", "お"];
const KA = ["か", "き", "く", "け", "こ"];
const SA = ["さ", "し", "す", "せ", "そ"];
const TA = ["た", "ち", "つ", "て", "と"];
const NA = ["な", "に", "ぬ", "ね", "の"];
const HA = ["は", "ひ", "ふ", "へ", "ほ"];
const MA = ["ま", "み", "む", "め", "も"];
const YA = ["や", "ゆ", "よ"];
const RA = ["ら", "り", "る", "れ", "ろ"];
const WA = ["わ", "を", "ん"];
export const HIRAGANA_BASIC_ORDER = [...VOWELS, ...KA, ...SA, ...TA, ...NA, ...HA, ...MA, ...YA, ...RA, ...WA];

/* ----------------------------------------------------------------------- */
/* Day 1 — Introduction to Japanese                                         */
/* ----------------------------------------------------------------------- */

const day1: Lesson = {
  id: "day-1",
  dayNumber: 1,
  title: "รู้จักภาษาญี่ปุ่น",
  subtitle: "ตัวอักษร 3 แบบ · สระ 5 เสียง · คำทักทาย 5 คำ",
  phase: 1,
  topic: "แนะนำภาษาญี่ปุ่น",
  estimatedMinutes: 20,
  objectives: [
    "เข้าใจว่าภาษาญี่ปุ่นมีตัวอักษร 3 แบบ",
    "รู้จักเสียงสระพื้นฐาน 5 เสียง: a i u e o",
    "จำคำทักทายที่ใช้บ่อย 5 คำ",
  ],
  vocabulary: ["konnichiwa", "arigatou", "sumimasen", "hai", "iie"],
  grammar: [],
  kana: [],
  sections: [
    section("learn", "ภาษาญี่ปุ่นมีตัวอักษร 3 แบบ", [
      {
        kind: "text",
        text: "ภาษาญี่ปุ่นใช้ตัวอักษร 3 ชุดผสมกันในประโยคเดียว ไม่ต้องกังวล! เราจะเริ่มจากชุดที่ง่ายที่สุดก่อน คือ ฮิรางานะ",
      },
      { kind: "scripts-overview" },
      {
        kind: "tip",
        title: "เรียนชุดไหนก่อน?",
        text: "เริ่มจาก ฮิรางานะ (ひらがな) เพราะใช้มากที่สุด และเป็นพื้นฐานของทุกอย่าง ต่อด้วย คาตากานะ ในเดือนธันวาคม แล้วค่อย ๆ รู้จักคันจิที่ใช้บ่อยตอนเที่ยว",
      },
    ]),
    section("understand", "เสียงสระ 5 เสียง และคำทักทาย", [
      {
        kind: "text",
        text: "ภาษาญี่ปุ่นมีสระพื้นฐานแค่ 5 เสียง และออกเสียง “สั้น ๆ” คล้ายสระไทย ทุกเสียงในภาษาญี่ปุ่นสร้างจากสระ 5 ตัวนี้",
      },
      {
        kind: "table",
        headers: ["ฮิรางานะ", "โรมาจิ", "เสียงไทย"],
        rows: [
          ["あ", "a", "อะ"],
          ["い", "i", "อิ"],
          ["う", "u", "อุ"],
          ["え", "e", "เอะ"],
          ["お", "o", "โอะ"],
        ],
        japaneseCols: [0],
      },
      {
        kind: "phrase-list",
        title: "คำทักทาย 5 คำแรก",
        items: [
          { japanese: "こんにちは", romaji: "konnichiwa", thai: "คนนิจิวะ", meaning: "สวัสดี", note: "ตัวท้าย は ในคำนี้อ่านว่า wa" },
          { japanese: "ありがとう", romaji: "arigatou", thai: "อาริงาโต", meaning: "ขอบคุณ", note: "แบบสุภาพ: ありがとうございます" },
          { japanese: "すみません", romaji: "sumimasen", thai: "สุมิมะเซ็น", meaning: "ขอโทษ / ขอเรียกพนักงาน / ขอความช่วยเหลือ" },
          { japanese: "はい", romaji: "hai", thai: "ไฮ", meaning: "ใช่ / ค่ะ" },
          { japanese: "いいえ", romaji: "iie", thai: "อีเอะ", meaning: "ไม่ใช่" },
        ],
      },
      {
        kind: "tip",
        tone: "culture",
        title: "すみません ใช้ได้ 3 แบบ",
        text: "1) ขอโทษเล็ก ๆ น้อย ๆ เช่น เดินชน  2) เรียกพนักงาน “すみません!” แทนการโบกมือ  3) ขอความช่วยเหลือหรือขอบคุณแบบเกรงใจ — เป็นคำที่ใช้บ่อยที่สุดตอนเที่ยว!",
      },
      {
        kind: "dialogue",
        title: "สถานการณ์จริง: ที่ร้านอาหาร",
        lines: [
          { speaker: "คุณ", japanese: "こんにちは。", romaji: "Konnichiwa.", thai: "สวัสดีค่ะ (ตอนเดินเข้าร้าน)" },
          { speaker: "คุณ", japanese: "すみません。", romaji: "Sumimasen.", thai: "ขอโทษนะคะ (เรียกพนักงาน)" },
          { speaker: "คุณ", japanese: "ありがとう。", romaji: "Arigatou.", thai: "ขอบคุณค่ะ (ตอนได้รับอาหาร)" },
        ],
      },
    ]),
    section("practice", "ฝึกทำแบบฝึกหัด", [
      { kind: "text", text: "ลองตอบคำถาม 5 ข้อ ตอบผิดไม่เป็นไร ระบบจะอธิบายให้ทันที" },
    ]),
    section("review", "สรุปบทเรียน", [
      {
        kind: "checklist",
        items: [
          "ภาษาญี่ปุ่นมี 3 ชุด: ฮิรางานะ · คาตากานะ · คันจิ",
          "สระ 5 เสียง: a (อะ) i (อิ) u (อุ) e (เอะ) o (โอะ)",
          "こんにちは สวัสดี · ありがとう ขอบคุณ · すみません ขอโทษ/เรียกพนักงาน",
          "はい ใช่ · いいえ ไม่ใช่",
        ],
      },
    ]),
  ],
  exercises: [
    {
      id: exId(1, 1),
      type: "multiple-choice",
      question: "あ อ่านว่าอะไร?",
      prompt: "あ",
      promptIsJapanese: true,
      options: ["a", "i", "u", "o"],
      correctAnswer: "a",
      explanation: "あ อ่านว่า “a” (อะ) เป็นสระตัวแรกของภาษาญี่ปุ่น",
      difficulty: 1,
      reviewKey: "kana:あ",
    },
    {
      id: exId(1, 2),
      type: "multiple-choice",
      question: "ありがとう หมายถึงอะไร?",
      prompt: "ありがとう",
      promptIsJapanese: true,
      options: ["ขอบคุณ", "สวัสดี", "ขอโทษ", "ใช่"],
      correctAnswer: "ขอบคุณ",
      explanation: "ありがとう (arigatou) = ขอบคุณ ถ้าอยากสุภาพขึ้นให้พูด ありがとうございます",
      difficulty: 1,
      reviewKey: "vocab:arigatou",
    },
    {
      id: exId(1, 3),
      type: "multiple-choice",
      question: "เรียกพนักงานร้านอาหารควรพูดว่าอะไร?",
      options: ["すみません", "ありがとう", "こんにちは", "いいえ"],
      optionsAreJapanese: true,
      correctAnswer: "すみません",
      explanation: "すみません (sumimasen) ใช้เรียกพนักงานได้อย่างสุภาพ ที่ญี่ปุ่นไม่นิยมโบกมือหรือดีดนิ้วเรียก",
      difficulty: 1,
      reviewKey: "vocab:sumimasen",
    },
    {
      id: exId(1, 4),
      type: "multiple-choice",
      question: "ตัวอักษรชุดไหนควรเรียนก่อน?",
      options: ["Hiragana", "Katakana", "Kanji"],
      correctAnswer: "Hiragana",
      explanation: "ฮิรางานะเป็นพื้นฐานของภาษาญี่ปุ่น ใช้มากที่สุด จึงควรเรียนก่อน",
      difficulty: 1,
    },
    {
      id: exId(1, 5),
      type: "multiple-choice",
      question: "お อ่านว่าอะไร?",
      prompt: "お",
      promptIsJapanese: true,
      options: ["a", "e", "o", "u"],
      correctAnswer: "o",
      explanation: "お อ่านว่า “o” (โอะ) สังเกตจุดเล็ก ๆ มุมขวาบน",
      difficulty: 1,
      reviewKey: "kana:お",
    },
  ],
  summary: [
    "ภาษาญี่ปุ่นมีตัวอักษร 3 ชุด เริ่มเรียนฮิรางานะก่อน",
    "สระ 5 เสียง: a i u e o",
    "คำทักทาย: こんにちは · ありがとう · すみません · はい · いいえ",
  ],
  reviewItems: ["vocab:konnichiwa", "vocab:arigatou", "vocab:sumimasen", "vocab:hai", "vocab:iie"],
};

/* ----------------------------------------------------------------------- */
/* Day 2 — Hiragana あ い う え お                                             */
/* ----------------------------------------------------------------------- */

const day2Base = buildKanaLesson({
  day: 2,
  phase: 1,
  title: "ฮิรางานะ: あ・い・う・え・お",
  subtitle: "ตัวอักษรชุดแรก 5 ตัว",
  topic: "Hiragana あ row",
  script: "hiragana",
  chars: VOWELS,
  known: [],
  objectives: [
    "จำหน้าตาฮิรางานะ 5 ตัวแรกได้",
    "จำเสียงอ่านของแต่ละตัวได้",
    "แยกตัวที่หน้าตาคล้ายกันได้ (あ กับ お)",
    "อ่านคำง่าย ๆ ที่ประกอบจาก 5 ตัวนี้ได้",
  ],
  intro:
    "เมื่อวานเรารู้จัก “เสียง” a i u e o แล้ว วันนี้มาดู “หน้าตา” ของตัวอักษรกัน! กดที่การ์ดแต่ละตัวเพื่อฟังเสียง แล้วลองพูดตามดัง ๆ",
  learnExtra: [
    {
      kind: "tip",
      title: "หลักการเขียนทั่วไป",
      text: "เขียนจาก “บนลงล่าง” และ “ซ้ายไปขวา” ไม่ต้องเขียนสวย แค่จำหน้าตาให้ได้ก่อนก็พอ",
    },
  ],
  compare: [
    { japanese: "あ", label: "a (อะ)", note: "ไม่มีจุดมุมขวาบน" },
    { japanese: "お", label: "o (โอะ)", note: "มีจุดเล็กมุมขวาบน" },
    { japanese: "う", label: "u (อุ)", note: "ล่างเป็นตะขอโค้ง" },
    { japanese: "え", label: "e (เอะ)", note: "ล่างเป็นเส้นซิกแซก" },
  ],
  understandExtra: [
    {
      kind: "tip",
      tone: "warning",
      title: "ข้อผิดพลาดที่พบบ่อย",
      text: "あ กับ お หน้าตาคล้ายกันมาก ให้ดูที่ “จุดมุมขวาบน” — มีจุด = お (o) ไม่มีจุด = あ (a) ส่วน う กับ え ด้านบนมีขีดเล็กเหมือนกัน ให้ดูที่ส่วนล่าง",
    },
  ],
  words: [
    { japanese: "あい", romaji: "ai", meaning: "ความรัก" },
    { japanese: "いえ", romaji: "ie", meaning: "บ้าน" },
    { japanese: "うえ", romaji: "ue", meaning: "ข้างบน" },
    { japanese: "あお", romaji: "ao", meaning: "สีน้ำเงิน / สีฟ้า" },
    { japanese: "いいえ", romaji: "iie", meaning: "ไม่ใช่" },
  ],
  vocabulary: ["iie"],
  summary: [
    "あ (a) · い (i) · う (u) · え (e) · お (o)",
    "あ กับ お ต่างกันที่จุดมุมขวาบน",
    "อ่านคำได้แล้ว: あい ความรัก · いえ บ้าน · うえ ข้างบน · あお สีน้ำเงิน",
  ],
});

const day2: Lesson = {
  ...day2Base,
  exercises: [
    {
      id: exId(2, 1),
      type: "multiple-choice",
      question: "จับคู่ あ กับเสียงอ่านที่ถูกต้อง",
      prompt: "あ",
      promptIsJapanese: true,
      options: ["a", "o", "i", "e"],
      correctAnswer: "a",
      explanation: "あ อ่านว่า “a” (อะ) — ไม่มีจุดมุมขวาบน ต่างจาก お",
      difficulty: 1,
      reviewKey: "kana:あ",
    },
    {
      id: exId(2, 2),
      type: "multiple-choice",
      question: "จับคู่ い กับเสียงอ่านที่ถูกต้อง",
      prompt: "い",
      promptIsJapanese: true,
      options: ["u", "i", "e", "a"],
      correctAnswer: "i",
      explanation: "い อ่านว่า “i” (อิ) — สองเส้นตั้งคู่กัน ซ้ายยาว ขวาสั้น",
      difficulty: 1,
      reviewKey: "kana:い",
    },
    {
      id: exId(2, 3),
      type: "multiple-choice",
      question: "ตัวไหนอ่านว่า “u”?",
      options: ["え", "う", "お", "い"],
      optionsAreJapanese: true,
      correctAnswer: "う",
      explanation: "う อ่านว่า “u” (อุ) — ขีดเล็กข้างบน + ตะขอโค้งข้างล่าง (え ข้างล่างเป็นซิกแซก)",
      difficulty: 1,
      reviewKey: "kana:う",
    },
    {
      id: exId(2, 4),
      type: "multiple-choice",
      question: "อ่านตัวอักษรนี้",
      prompt: "お",
      promptIsJapanese: true,
      options: ["a", "o", "u", "e"],
      correctAnswer: "o",
      explanation: "お อ่านว่า “o” (โอะ) — มีจุดเล็กมุมขวาบน ถ้าไม่มีจุดคือ あ",
      difficulty: 1,
      reviewKey: "kana:お",
    },
    {
      id: exId(2, 5),
      type: "multiple-choice",
      question: "เลือกตัวอักษรที่อ่านว่า “e”",
      options: ["う", "あ", "え", "お"],
      optionsAreJapanese: true,
      correctAnswer: "え",
      explanation: "え อ่านว่า “e” (เอะ) — ขีดเล็กข้างบน + เส้นซิกแซกข้างล่าง",
      difficulty: 1,
      reviewKey: "kana:え",
    },
    {
      id: exId(2, 6),
      type: "match",
      question: "จับคู่ตัวอักษรทั้ง 5 ตัวกับเสียงอ่าน",
      pairs: [
        { left: "あ", right: "a" },
        { left: "い", right: "i" },
        { left: "う", right: "u" },
        { left: "え", right: "e" },
        { left: "お", right: "o" },
      ],
      leftIsJapanese: true,
      explanation: "あ = a · い = i · う = u · え = e · お = o",
      difficulty: 1,
    },
    {
      id: exId(2, 7),
      type: "listen",
      question: "ฟังเสียง แล้วเลือกตัวอักษรที่ได้ยิน",
      audioText: "え",
      options: ["い", "え", "あ", "お"],
      optionsAreJapanese: true,
      correctAnswer: "え",
      explanation: "เสียงที่ได้ยินคือ “e” (เอะ) = え",
      difficulty: 2,
      reviewKey: "kana:え",
    },
    {
      id: exId(2, 8),
      type: "true-false",
      question: "ข้อความนี้ถูกหรือผิด?",
      statement: "あ กับ お คือตัวเดียวกัน",
      correctAnswer: false,
      explanation: "ไม่ใช่ตัวเดียวกัน — お มีจุดเล็กมุมขวาบนและอ่านว่า o ส่วน あ อ่านว่า a",
      difficulty: 1,
    },
    {
      id: exId(2, 9),
      type: "read-meaning",
      question: "อ่านคำนี้ แล้วเลือกความหมาย",
      japanese: "いえ",
      options: ["บ้าน", "ความรัก", "ข้างบน", "สีน้ำเงิน"],
      correctAnswer: "บ้าน",
      explanation: "いえ อ่านว่า “ie” (อิเอะ) แปลว่า บ้าน",
      difficulty: 2,
    },
    {
      id: exId(2, 10),
      type: "type",
      question: "พิมพ์เสียงอ่าน (โรมาจิ) ของคำนี้",
      prompt: "あお",
      inputMode: "romaji",
      correctAnswer: "ao",
      explanation: "あお = a + o → “ao” แปลว่า สีน้ำเงิน / สีฟ้า",
      difficulty: 2,
    },
  ],
};

/* ----------------------------------------------------------------------- */
/* Days 3–13 — Hiragana rows                                                */
/* ----------------------------------------------------------------------- */

const day3 = buildKanaLesson({
  day: 3,
  phase: 1,
  title: "ฮิรางานะ: か・き・く・け・こ",
  subtitle: "แถว K — พยัญชนะ k + สระ 5 ตัว",
  topic: "Hiragana か row",
  script: "hiragana",
  chars: KA,
  known: VOWELS,
  objectives: ["อ่านแถว か ได้ครบ 5 ตัว", "เข้าใจหลัก “พยัญชนะ + สระ”", "อ่านคำจริงที่ใช้ตัวที่เรียนแล้วได้"],
  intro:
    "ข่าวดี! ฮิรางานะเกือบทั้งหมดคือ “พยัญชนะ + สระ 5 ตัวเดิม” วันนี้คือพยัญชนะ k: ka ki ku ke ko — เสียงคล้าย ค แต่เบากว่าเล็กน้อย",
  learnExtra: [
    {
      kind: "table",
      headers: ["", "a", "i", "u", "e", "o"],
      rows: [
        ["สระ", "あ", "い", "う", "え", "お"],
        ["k", "か", "き", "く", "け", "こ"],
      ],
      japaneseCols: [1, 2, 3, 4, 5],
    },
  ],
  compare: [
    { japanese: "き", label: "ki", note: "มีขีดขวาง 2 เส้น" },
    { japanese: "こ", label: "ko", note: "สองเส้นนอน (แนวนอน)" },
    { japanese: "い", label: "i", note: "สองเส้นตั้ง (แนวตั้ง)" },
  ],
  words: [
    { japanese: "かお", romaji: "kao", meaning: "ใบหน้า" },
    { japanese: "えき", romaji: "eki", meaning: "สถานีรถไฟ" },
    { japanese: "あき", romaji: "aki", meaning: "ฤดูใบไม้ร่วง" },
    { japanese: "ここ", romaji: "koko", meaning: "ที่นี่" },
    { japanese: "いけ", romaji: "ike", meaning: "บ่อน้ำ" },
    { japanese: "あかい", romaji: "akai", meaning: "สีแดง" },
  ],
  vocabulary: ["koko"],
  summary: [
    "か ka · き ki · く ku · け ke · こ ko",
    "ฮิรางานะส่วนใหญ่ = พยัญชนะ + สระ",
    "คำสำคัญตอนเที่ยว: えき = สถานีรถไฟ · あき = ฤดูใบไม้ร่วง (ช่วงที่เราจะไปโทจิงิ!)",
  ],
});

const day4 = buildKanaLesson({
  day: 4,
  phase: 1,
  title: "ฮิรางานะ: さ・し・す・せ・そ",
  subtitle: "แถว S — ระวัง し อ่านว่า shi",
  topic: "Hiragana さ row",
  script: "hiragana",
  chars: SA,
  known: [...VOWELS, ...KA],
  objectives: ["อ่านแถว さ ได้ครบ", "จำได้ว่า し อ่านว่า shi (ไม่ใช่ si)", "แยก さ กับ き ได้"],
  intro: "แถว s: sa shi su se so — มีตัวพิเศษ 1 ตัวคือ し ที่อ่านว่า “shi” (ชิ) ไม่ใช่ “si”",
  learnExtra: [
    {
      kind: "tip",
      tone: "warning",
      title: "เสียงพิเศษ",
      text: "し = shi (ชิ) เหมือนในคำว่า すし (sushi) — ไม่มีเสียง “si” ในภาษาญี่ปุ่นแบบปกติ",
    },
  ],
  compare: [
    { japanese: "さ", label: "sa", note: "ขีดขวาง 1 เส้น" },
    { japanese: "き", label: "ki", note: "ขีดขวาง 2 เส้น" },
  ],
  words: [
    { japanese: "すし", romaji: "sushi", meaning: "ซูชิ" },
    { japanese: "かさ", romaji: "kasa", meaning: "ร่ม" },
    { japanese: "あさ", romaji: "asa", meaning: "ตอนเช้า" },
    { japanese: "いす", romaji: "isu", meaning: "เก้าอี้" },
    { japanese: "しお", romaji: "shio", meaning: "เกลือ" },
    { japanese: "すき", romaji: "suki", meaning: "ชอบ" },
    { japanese: "おかし", romaji: "okashi", meaning: "ขนม" },
  ],
  vocabulary: ["sushi", "kasa", "asa"],
});

const day5 = buildKanaLesson({
  day: 5,
  phase: 1,
  title: "ฮิรางานะ: た・ち・つ・て・と",
  subtitle: "แถว T — ระวัง ち (chi) และ つ (tsu)",
  topic: "Hiragana た row",
  script: "hiragana",
  chars: TA,
  known: [...VOWELS, ...KA, ...SA],
  objectives: ["อ่านแถว た ได้ครบ", "ออกเสียง ち (chi) และ つ (tsu) ได้", "แยก さ กับ ち และ し กับ つ ได้"],
  intro: "แถว t: ta chi tsu te to — มีเสียงพิเศษ 2 ตัว: ち อ่านว่า chi (จิ) และ つ อ่านว่า tsu (ทสึ)",
  learnExtra: [
    {
      kind: "tip",
      title: "ฝึกเสียง tsu",
      text: "つ (tsu) ไม่มีในภาษาไทย ให้ทำปากแบบ “ท” แล้วปล่อยลมเป็น “สึ” เร็ว ๆ → ทสึ เหมือนคำว่า “สึนามิ” (つなみ)",
    },
  ],
  compare: [
    { japanese: "さ", label: "sa", note: "โค้งล่างเปิดไปทางขวา" },
    { japanese: "ち", label: "chi", note: "โค้งล่างเปิดไปทางซ้าย" },
    { japanese: "し", label: "shi", note: "เส้นตั้ง หางตวัดขึ้นขวา" },
    { japanese: "つ", label: "tsu", note: "เส้นนอน โค้งลง" },
  ],
  words: [
    { japanese: "たこ", romaji: "tako", meaning: "ปลาหมึกยักษ์" },
    { japanese: "くつ", romaji: "kutsu", meaning: "รองเท้า" },
    { japanese: "そと", romaji: "soto", meaning: "ข้างนอก" },
    { japanese: "した", romaji: "shita", meaning: "ข้างล่าง" },
    { japanese: "ちかい", romaji: "chikai", meaning: "ใกล้" },
    { japanese: "つくえ", romaji: "tsukue", meaning: "โต๊ะ" },
  ],
  vocabulary: ["chikai"],
});

const day6 = buildKanaLesson({
  day: 6,
  phase: 1,
  title: "ฮิรางานะ: な・に・ぬ・ね・の",
  subtitle: "แถว N — เสียงง่าย เหมือน น",
  topic: "Hiragana な row",
  script: "hiragana",
  chars: NA,
  known: [...VOWELS, ...KA, ...SA, ...TA],
  objectives: ["อ่านแถว な ได้ครบ", "แยก な กับ た ได้", "อ่านชื่อสัตว์และอาหารง่าย ๆ ได้"],
  intro: "แถว n: na ni nu ne no — ออกเสียงตรงกับ “น” ของไทยเลย ง่ายมาก!",
  compare: [
    { japanese: "た", label: "ta", note: "ขวาเป็น こ" },
    { japanese: "な", label: "na", note: "ขวามีห่วงเล็กข้างล่าง" },
    { japanese: "ぬ", label: "nu", note: "มีห่วงปลาย" },
    { japanese: "の", label: "no", note: "วงเดียวจบ" },
  ],
  understandExtra: [
    {
      kind: "tip",
      title: "の ตัวสำคัญ",
      text: "の (no) จะได้เจอบ่อยมากเพราะใช้แปลว่า “ของ” เช่น わたしの = ของฉัน (เรียนจริงจังในเดือนกุมภาพันธ์)",
    },
  ],
  words: [
    { japanese: "いぬ", romaji: "inu", meaning: "สุนัข" },
    { japanese: "ねこ", romaji: "neko", meaning: "แมว" },
    { japanese: "なつ", romaji: "natsu", meaning: "ฤดูร้อน" },
    { japanese: "にく", romaji: "niku", meaning: "เนื้อสัตว์" },
    { japanese: "さかな", romaji: "sakana", meaning: "ปลา" },
    { japanese: "おかね", romaji: "okane", meaning: "เงิน" },
    { japanese: "きのこ", romaji: "kinoko", meaning: "เห็ด" },
  ],
  vocabulary: ["niku", "sakana"],
});

const day7 = buildKanaLesson({
  day: 7,
  phase: 1,
  title: "ทบทวน: あ ถึง の (25 ตัว)",
  subtitle: "วันทบทวน — ฝึกอ่านคำจริง",
  topic: "Basic reading practice",
  script: "hiragana",
  chars: [...VOWELS, ...KA, ...SA, ...TA, ...NA],
  drillChars: ["し", "つ", "ち", "さ", "き", "ぬ", "ね", "お", "あ", "け"],
  known: [],
  objectives: ["ทบทวน 25 ตัวที่เรียนมา", "แยกตัวที่หน้าตาคล้ายกันได้", "อ่านคำยาวขึ้นได้คล่องขึ้น"],
  intro:
    "เก่งมาก! สัปดาห์นี้เรียนไปแล้ว 25 ตัว วันนี้ไม่มีตัวใหม่ เราจะทบทวนและฝึกอ่านคำจริงกัน ลองกดฟังเสียงตัวที่ยังไม่มั่นใจ",
  compare: [
    { japanese: "さ", label: "sa", note: "โค้งเปิดขวา" },
    { japanese: "ち", label: "chi", note: "โค้งเปิดซ้าย" },
    { japanese: "あ", label: "a", note: "ไม่มีจุด" },
    { japanese: "お", label: "o", note: "มีจุด" },
  ],
  words: [
    { japanese: "さかな", romaji: "sakana", meaning: "ปลา" },
    { japanese: "おかね", romaji: "okane", meaning: "เงิน" },
    { japanese: "たかい", romaji: "takai", meaning: "แพง / สูง" },
    { japanese: "ちかてつ", romaji: "chikatetsu", meaning: "รถไฟใต้ดิน" },
    { japanese: "あたたかい", romaji: "atatakai", meaning: "อบอุ่น" },
    { japanese: "ちいさい", romaji: "chiisai", meaning: "เล็ก" },
  ],
  vocabulary: ["takai"],
  summary: [
    "ทบทวนครบ 5 แถว: あ か さ た な",
    "ตัวที่ต้องระวัง: さ/ち · し/つ · あ/お · ぬ/の",
    "อ่านคำ 3–5 พยางค์ได้แล้ว เช่น ちかてつ (รถไฟใต้ดิน)",
  ],
});

const day8 = buildKanaLesson({
  day: 8,
  phase: 1,
  title: "ฮิรางานะ: は・ひ・ふ・へ・ほ",
  subtitle: "แถว H — ふ อ่านว่า fu",
  topic: "Hiragana は row",
  script: "hiragana",
  chars: HA,
  known: [...VOWELS, ...KA, ...SA, ...TA, ...NA],
  objectives: ["อ่านแถว は ได้ครบ", "ออกเสียง ふ (fu) ได้", "รู้ว่า は ในคำว่า こんにちは อ่านว่า wa"],
  intro: "แถว h: ha hi fu he ho — ตัวพิเศษคือ ふ อ่านว่า “fu” โดยเป่าลมเบา ๆ ผ่านริมฝีปาก (ระหว่าง ฟ กับ ฮ)",
  learnExtra: [
    {
      kind: "tip",
      tone: "warning",
      title: "は อ่านว่า wa ได้ด้วย",
      text: "ปกติ は อ่านว่า ha แต่เมื่อเป็น “คำช่วย” (particle) จะอ่านว่า wa เช่น こんにちは (konnichiwa) — จะเรียนเรื่องนี้ละเอียดในเดือนกุมภาพันธ์",
    },
  ],
  compare: [
    { japanese: "は", label: "ha", note: "ขีดขวาง 1 เส้น" },
    { japanese: "ほ", label: "ho", note: "ขีดขวาง 2 เส้น" },
    { japanese: "け", label: "ke", note: "ไม่มีห่วงข้างล่าง" },
  ],
  words: [
    { japanese: "はな", romaji: "hana", meaning: "ดอกไม้" },
    { japanese: "ひと", romaji: "hito", meaning: "คน" },
    { japanese: "ふね", romaji: "fune", meaning: "เรือ" },
    { japanese: "ほし", romaji: "hoshi", meaning: "ดวงดาว" },
    { japanese: "ひとつ", romaji: "hitotsu", meaning: "1 ชิ้น" },
    { japanese: "ふたつ", romaji: "futatsu", meaning: "2 ชิ้น" },
    { japanese: "ひこうき", romaji: "hikouki", meaning: "เครื่องบิน", accept: ["hikoki", "hikooki"] },
  ],
  vocabulary: ["hitotsu", "futatsu"],
});

const day9 = buildKanaLesson({
  day: 9,
  phase: 1,
  title: "ฮิรางานะ: ま・み・む・め・も",
  subtitle: "แถว M — เสียงเหมือน ม",
  topic: "Hiragana ま row",
  script: "hiragana",
  chars: MA,
  known: [...VOWELS, ...KA, ...SA, ...TA, ...NA, ...HA],
  objectives: ["อ่านแถว ま ได้ครบ", "แยก ぬ กับ め และ ま กับ ほ ได้", "อ่านชื่ออาหารญี่ปุ่นได้มากขึ้น"],
  intro: "แถว m: ma mi mu me mo — ออกเสียงเหมือน “ม” ของไทย",
  compare: [
    { japanese: "ほ", label: "ho", note: "มีเส้นตั้งด้านซ้าย" },
    { japanese: "ま", label: "ma", note: "ไม่มีเส้นตั้งด้านซ้าย" },
    { japanese: "め", label: "me", note: "ไม่มีห่วงปลาย" },
    { japanese: "ぬ", label: "nu", note: "มีห่วงปลาย" },
  ],
  words: [
    { japanese: "さしみ", romaji: "sashimi", meaning: "ซาชิมิ (ปลาดิบ)" },
    { japanese: "なまえ", romaji: "namae", meaning: "ชื่อ" },
    { japanese: "まち", romaji: "machi", meaning: "เมือง" },
    { japanese: "もも", romaji: "momo", meaning: "ลูกพีช" },
    { japanese: "むし", romaji: "mushi", meaning: "แมลง" },
    { japanese: "あたま", romaji: "atama", meaning: "หัว / ศีรษะ" },
  ],
  vocabulary: ["namae"],
});

const day10 = buildKanaLesson({
  day: 10,
  phase: 1,
  title: "ฮิรางานะ: や・ゆ・よ + ら・り・る・れ・ろ",
  subtitle: "แถว Y และแถว R",
  topic: "Hiragana や row & ら row",
  script: "hiragana",
  chars: [...YA, ...RA],
  known: [...VOWELS, ...KA, ...SA, ...TA, ...NA, ...HA, ...MA],
  objectives: ["อ่านแถว や (3 ตัว) และ ら (5 ตัว) ได้", "ออกเสียง r แบบญี่ปุ่นได้", "แยก る กับ ろ ได้"],
  intro:
    "แถว y มีแค่ 3 ตัว: ya yu yo และแถว r: ra ri ru re ro — เสียง r ญี่ปุ่นอยู่ระหว่าง “ร” กับ “ล” ให้แตะลิ้นที่เพดานเบา ๆ ครั้งเดียว ไม่ต้องรัวลิ้น",
  compare: [
    { japanese: "る", label: "ru", note: "มีห่วงปลาย" },
    { japanese: "ろ", label: "ro", note: "ไม่มีห่วง" },
    { japanese: "よ", label: "yo", note: "ขีดขวาง 1 เส้น + ห่วงข้างล่าง" },
    { japanese: "ま", label: "ma", note: "ขีดขวาง 2 เส้น + ห่วงข้างล่าง" },
  ],
  words: [
    { japanese: "やま", romaji: "yama", meaning: "ภูเขา" },
    { japanese: "ゆき", romaji: "yuki", meaning: "หิมะ" },
    { japanese: "よる", romaji: "yoru", meaning: "กลางคืน" },
    { japanese: "そら", romaji: "sora", meaning: "ท้องฟ้า" },
    { japanese: "さくら", romaji: "sakura", meaning: "ดอกซากุระ" },
    { japanese: "くるま", romaji: "kuruma", meaning: "รถยนต์" },
    { japanese: "へや", romaji: "heya", meaning: "ห้อง" },
  ],
  vocabulary: ["yama", "yoru", "heya"],
});

const day11 = buildKanaLesson({
  day: 11,
  phase: 1,
  title: "ฮิรางานะ: わ・を・ん",
  subtitle: "ครบ 46 ตัวพื้นฐานแล้ว!",
  topic: "Hiragana わ row",
  script: "hiragana",
  chars: WA,
  drillChars: ["わ", "ん", "ね", "れ", "る", "ろ"],
  known: [...VOWELS, ...KA, ...SA, ...TA, ...NA, ...HA, ...MA, ...YA, ...RA],
  objectives: ["อ่าน わ を ん ได้", "รู้ว่า を ใช้เป็นคำช่วยและอ่านว่า o", "แยก ね れ わ ได้"],
  intro:
    "3 ตัวสุดท้าย! わ (wa) · を (o) · ん (n) — ん เป็นตัวเดียวที่เป็น “ตัวสะกด” ไม่มีสระของตัวเอง",
  learnExtra: [
    {
      kind: "tip",
      title: "を ใช้เป็นคำช่วยเท่านั้น",
      text: "を อ่านว่า “o” เหมือน お แต่ใช้เป็นคำช่วยบอกกรรม เช่น みずを ください (ขอน้ำค่ะ) ไม่ต้องกังวลตอนนี้ เราจะเรียนในเดือนกุมภาพันธ์",
    },
  ],
  compare: [
    { japanese: "ね", label: "ne", note: "ปลายม้วนเป็นห่วง" },
    { japanese: "れ", label: "re", note: "ปลายเตะออกไปขวา" },
    { japanese: "わ", label: "wa", note: "ปลายโค้งกลม" },
  ],
  words: [
    { japanese: "わたし", romaji: "watashi", meaning: "ฉัน" },
    { japanese: "ほん", romaji: "hon", meaning: "หนังสือ" },
    { japanese: "にほん", romaji: "nihon", meaning: "ประเทศญี่ปุ่น" },
    { japanese: "おんせん", romaji: "onsen", meaning: "บ่อน้ำพุร้อน" },
    { japanese: "てんき", romaji: "tenki", meaning: "สภาพอากาศ" },
    { japanese: "みかん", romaji: "mikan", meaning: "ส้มญี่ปุ่น" },
    { japanese: "かわ", romaji: "kawa", meaning: "แม่น้ำ" },
  ],
  vocabulary: ["watashi", "nihon", "onsen", "tenki"],
  summary: [
    "わ wa · を o (คำช่วย) · ん n",
    "แยก ね (ห่วง) · れ (เตะ) · わ (โค้งกลม)",
    "🎉 ยินดีด้วย! เรียนฮิรางานะพื้นฐานครบ 46 ตัวแล้ว",
  ],
});

const day12 = buildKanaLesson({
  day: 12,
  phase: 1,
  title: "เครื่องหมาย ゛ และ ゜ (เสียงขุ่น)",
  subtitle: "が・ざ・だ・ば・ぱ — ตัวใหม่ 25 ตัวจากกฎเดียว",
  topic: "Dakuten & Handakuten",
  script: "hiragana",
  chars: ["が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ", "だ", "ぢ", "づ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ", "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
  drillChars: ["が", "ご", "ざ", "じ", "ず", "だ", "で", "ば", "ぶ", "ぱ", "ぴ", "ぽ"],
  known: HIRAGANA_BASIC_ORDER,
  objectives: [
    "เข้าใจกฎ ゛ (ดะคุเต็น) และ ゜ (ฮันดะคุเต็น)",
    "เปลี่ยนเสียง k→g, s→z, t→d, h→b, h→p ได้",
    "อ่านคำที่มีเสียงขุ่นได้",
  ],
  intro:
    "ไม่ต้องจำตัวใหม่! แค่เติมเครื่องหมายเล็ก ๆ ที่มุมขวาบน เสียงก็เปลี่ยน: ゛ (สองขีด) ทำให้เสียง “ขุ่น/ก้อง” และ ゜ (วงกลม) ใช้กับแถว は ให้เป็นเสียง p",
  learnExtra: [
    {
      kind: "table",
      headers: ["แถวเดิม", "+ ゛ / ゜", "เสียงใหม่", "ตัวอย่าง"],
      rows: [
        ["か (k)", "が", "g (ก)", "がぎぐげご"],
        ["さ (s)", "ざ", "z (ซ ก้อง)", "ざじずぜぞ"],
        ["た (t)", "だ", "d (ด)", "だぢづでど"],
        ["は (h)", "ば", "b (บ)", "ばびぶべぼ"],
        ["は (h)", "ぱ", "p (ป)", "ぱぴぷぺぽ"],
      ],
      japaneseCols: [1, 3],
    },
    {
      kind: "tip",
      title: "ตัวที่เสียงซ้ำกัน",
      text: "じ กับ ぢ อ่านว่า ji เหมือนกัน และ ず กับ づ อ่านว่า zu เหมือนกัน — ส่วนใหญ่ใช้ じ และ ず ส่วน ぢ づ เจอน้อยมาก",
    },
  ],
  words: [
    { japanese: "ごはん", romaji: "gohan", meaning: "ข้าว / มื้ออาหาร" },
    { japanese: "みず", romaji: "mizu", meaning: "น้ำ" },
    { japanese: "でんわ", romaji: "denwa", meaning: "โทรศัพท์" },
    { japanese: "そば", romaji: "soba", meaning: "โซบะ" },
    { japanese: "えび", romaji: "ebi", meaning: "กุ้ง" },
    { japanese: "てんぷら", romaji: "tenpura", meaning: "เทมปุระ", accept: ["tempura"] },
    { japanese: "かんぱい", romaji: "kanpai", meaning: "ชนแก้ว!", accept: ["kampai"] },
  ],
  vocabulary: ["gohan", "mizu", "soba"],
  extraExercises: [
    {
      id: exId(12, 1),
      type: "multiple-choice",
      question: "เติม ゛ ที่ か จะได้เสียงอะไร?",
      prompt: "か → が",
      promptIsJapanese: true,
      options: ["ga", "ka", "pa", "ba"],
      correctAnswer: "ga",
      explanation: "゛ เปลี่ยน k เป็น g: か (ka) → が (ga)",
      difficulty: 1,
    },
    {
      id: exId(12, 2),
      type: "multiple-choice",
      question: "แถว は เติม ゜ (วงกลมเล็ก) จะได้เสียงอะไร?",
      options: ["p", "b", "f", "d"],
      correctAnswer: "p",
      explanation: "゜ ใช้กับแถว は เท่านั้น: は (ha) → ぱ (pa) ส่วน ゛ จะได้ ば (ba)",
      difficulty: 2,
    },
  ],
  summary: [
    "゛ : k→g · s→z · t→d · h→b",
    "゜ : h→p (ใช้กับแถว は เท่านั้น)",
    "じ = ぢ = ji · ず = づ = zu (ใช้ じ ず บ่อยกว่า)",
  ],
});

const day13 = buildKanaLesson({
  day: 13,
  phase: 1,
  title: "ตัวเล็ก ゃ ゅ ょ · っ และเสียงยาว",
  subtitle: "きょう · しゃしん · きって · おかあさん",
  topic: "Combination characters & small っ",
  script: "hiragana",
  chars: ["きゃ", "きゅ", "きょ", "しゃ", "しゅ", "しょ", "ちゃ", "ちゅ", "ちょ", "りょ", "っ"],
  drillChars: ["きょ", "しゃ", "しゅ", "しょ", "ちゃ", "ちょ", "りょ", "きゅ"],
  known: ["き", "し", "ち", "り", "や", "ゆ", "よ", "ひ", "み", "に"],
  objectives: ["อ่านตัวผสมเสียง (きゃ しゃ ちゃ …) ได้", "เข้าใจ っ ตัวเล็ก (เสียงกัก)", "อ่านเสียงยาวได้ เช่น おかあさん とうきょう"],
  intro:
    "ตัว ゃ ゅ ょ “ตัวเล็ก” จะรวมกับตัวหน้าเป็นพยางค์เดียว: き + ゃ = きゃ (kya) ไม่ใช่ ki-ya และ っ ตัวเล็ก หมายถึงให้ “หยุดค้าง” ครู่หนึ่งก่อนพยางค์ถัดไป",
  learnExtra: [
    {
      kind: "compare",
      items: [
        { japanese: "きや", label: "ki-ya (2 พยางค์)", note: "や ตัวใหญ่" },
        { japanese: "きゃ", label: "kya (1 พยางค์)", note: "ゃ ตัวเล็ก" },
        { japanese: "きて", label: "kite (มาสิ)", note: "ไม่มี っ" },
        { japanese: "きって", label: "kitte (แสตมป์)", note: "มี っ → หยุดค้าง" },
      ],
    },
    {
      kind: "tip",
      title: "เสียงยาว",
      text: "สระซ้ำกันอ่านยาว: おかあさん (o-kaa-san แม่) และ ou อ่านเป็น “โอ” ยาว: とうきょう = too-kyoo (โตเกียว) ความยาวของเสียงเปลี่ยนความหมายได้ จึงต้องลากเสียงให้ถูก",
    },
  ],
  words: [
    { japanese: "きょう", romaji: "kyou", meaning: "วันนี้", accept: ["kyo", "kyoo"] },
    { japanese: "しゃしん", romaji: "shashin", meaning: "รูปถ่าย" },
    { japanese: "おちゃ", romaji: "ocha", meaning: "ชา" },
    { japanese: "りょかん", romaji: "ryokan", meaning: "เรียวกัง (โรงแรมญี่ปุ่น)" },
    { japanese: "きって", romaji: "kitte", meaning: "แสตมป์" },
    { japanese: "ちょっと", romaji: "chotto", meaning: "นิดหน่อย / สักครู่" },
    { japanese: "とうきょう", romaji: "toukyou", meaning: "โตเกียว", accept: ["tokyo", "tookyoo", "toukyo"] },
  ],
  vocabulary: ["kyou", "shashin", "ocha", "ryokan"],
  extraExercises: [
    {
      id: exId(13, 1),
      type: "multiple-choice",
      question: "คำไหนแปลว่า “แสตมป์” (kitte)?",
      options: ["きって", "きて", "きつて", "きいて"],
      optionsAreJapanese: true,
      correctAnswer: "きって",
      explanation: "きって มี っ ตัวเล็ก = หยุดค้างก่อน te → ki-t-te ส่วน つ ตัวใหญ่ใน きつて จะอ่านว่า tsu",
      difficulty: 2,
    },
    {
      id: exId(13, 2),
      type: "true-false",
      question: "ข้อความนี้ถูกหรือผิด?",
      statement: "きゃ อ่านเป็น 2 พยางค์ว่า ki-ya",
      correctAnswer: false,
      explanation: "ゃ ตัวเล็กรวมกับ き เป็นพยางค์เดียว: きゃ = kya",
      difficulty: 1,
    },
  ],
  summary: [
    "ゃ ゅ ょ ตัวเล็ก + ตัวหน้า = 1 พยางค์: きゃ kya · しゅ shu · ちょ cho",
    "っ ตัวเล็ก = หยุดค้าง: きって kitte",
    "สระยาว: おかあさん · とうきょう (ou = โอ ยาว)",
  ],
});

/* ----------------------------------------------------------------------- */
/* Day 14 — Basic greetings                                                 */
/* ----------------------------------------------------------------------- */

const day14: Lesson = {
  id: "day-14",
  dayNumber: 14,
  title: "คำทักทายในชีวิตประจำวัน",
  subtitle: "เช้า · กลางวัน · เย็น · ขอบคุณ · ขอโทษ · ลาก่อน",
  phase: 1,
  topic: "Basic greetings",
  estimatedMinutes: 20,
  objectives: [
    "ทักทายตามช่วงเวลาได้ถูกต้อง",
    "แยกคำสุภาพกับคำกันเองได้",
    "รู้มารยาทการโค้งคำนับเบื้องต้น",
  ],
  vocabulary: ["ohayou", "konnichiwa", "konbanwa", "arigatou-gozaimasu", "sumimasen", "sayounara", "oyasuminasai", "hajimemashite"],
  grammar: [],
  sections: [
    section("learn", "ทักทายตามช่วงเวลา", [
      {
        kind: "text",
        text: "ตอนนี้เราอ่านฮิรางานะได้ครบแล้ว! มาอ่านคำทักทายด้วยตัวเองกัน ภาษาญี่ปุ่นมีคำทักทายแยกตามช่วงเวลาของวัน",
      },
      {
        kind: "phrase-list",
        items: [
          { japanese: "おはようございます", romaji: "ohayou gozaimasu", thai: "โอฮาโย โกะไซมัส", meaning: "สวัสดีตอนเช้า (ถึงประมาณ 10 โมง)" },
          { japanese: "こんにちは", romaji: "konnichiwa", thai: "คนนิจิวะ", meaning: "สวัสดี (กลางวัน)" },
          { japanese: "こんばんは", romaji: "konbanwa", thai: "คมบังวะ", meaning: "สวัสดีตอนเย็น / ค่ำ" },
          { japanese: "おやすみなさい", romaji: "oyasuminasai", thai: "โอยาสุมินะไซ", meaning: "ราตรีสวัสดิ์ (ก่อนนอน)" },
        ],
      },
    ]),
    section("understand", "สุภาพ vs กันเอง และมารยาท", [
      {
        kind: "table",
        headers: ["สุภาพ (ใช้กับพนักงาน/คนแปลกหน้า)", "กันเอง (ใช้กับเพื่อน)", "ความหมาย"],
        rows: [
          ["おはようございます", "おはよう", "สวัสดีตอนเช้า"],
          ["ありがとうございます", "ありがとう", "ขอบคุณ"],
          ["すみません", "ごめん", "ขอโทษ"],
        ],
        japaneseCols: [0, 1],
      },
      {
        kind: "tip",
        tone: "culture",
        title: "โค้งคำนับ (おじぎ)",
        text: "เวลาทักทายหรือขอบคุณ ให้ก้มศีรษะเล็กน้อยพร้อมพูด ไม่ต้องไหว้แบบไทย การโค้งเล็กน้อยก็สุภาพพอสำหรับนักท่องเที่ยว",
      },
      {
        kind: "phrase-list",
        title: "เพิ่มอีก 3 คำ",
        items: [
          { japanese: "はじめまして", romaji: "hajimemashite", thai: "ฮะจิเมะมะชิเตะ", meaning: "ยินดีที่ได้รู้จัก (เจอครั้งแรก)" },
          { japanese: "さようなら", romaji: "sayounara", thai: "ซาโยนาระ", meaning: "ลาก่อน (จากกันนาน)" },
          { japanese: "ありがとうございます", romaji: "arigatou gozaimasu", thai: "อาริงาโต โกะไซมัส", meaning: "ขอบคุณค่ะ (สุภาพ)" },
        ],
      },
      {
        kind: "dialogue",
        title: "ตอนเช้าที่โรงแรม",
        lines: [
          { speaker: "พนักงาน", japanese: "おはようございます。", romaji: "Ohayou gozaimasu.", thai: "อรุณสวัสดิ์ค่ะ" },
          { speaker: "คุณ", japanese: "おはようございます。", romaji: "Ohayou gozaimasu.", thai: "อรุณสวัสดิ์ค่ะ" },
          { speaker: "พนักงาน", japanese: "どうぞ。", romaji: "Douzo.", thai: "เชิญค่ะ" },
          { speaker: "คุณ", japanese: "ありがとうございます。", romaji: "Arigatou gozaimasu.", thai: "ขอบคุณค่ะ" },
        ],
      },
    ]),
    section("practice", "ฝึกทำแบบฝึกหัด", [{ kind: "text", text: "เลือกคำทักทายให้ถูกสถานการณ์" }]),
    section("review", "สรุปบทเรียน", [
      {
        kind: "checklist",
        items: [
          "เช้า: おはようございます · กลางวัน: こんにちは · เย็น: こんばんは",
          "ก่อนนอน: おやすみなさい · ครั้งแรก: はじめまして",
          "กับพนักงานใช้แบบสุภาพ: ありがとうございます",
          "🎉 จบเฟส 1 แล้ว! เดือนหน้าเริ่มคาตากานะ",
        ],
      },
    ]),
  ],
  exercises: [
    {
      id: exId(14, 1),
      type: "multiple-choice",
      question: "เดินลงไปกินอาหารเช้าที่โรงแรมตอน 8 โมง ควรทักทายว่าอะไร?",
      options: ["おはようございます", "こんばんは", "おやすみなさい", "さようなら"],
      optionsAreJapanese: true,
      correctAnswer: "おはようございます",
      explanation: "ตอนเช้าใช้ おはようございます (แบบสุภาพ) กับพนักงาน",
      difficulty: 1,
      reviewKey: "vocab:ohayou",
    },
    {
      id: exId(14, 2),
      type: "match",
      question: "จับคู่คำทักทายกับความหมาย",
      pairs: [
        { left: "こんばんは", right: "สวัสดีตอนเย็น" },
        { left: "おやすみなさい", right: "ราตรีสวัสดิ์" },
        { left: "はじめまして", right: "ยินดีที่ได้รู้จัก" },
        { left: "さようなら", right: "ลาก่อน" },
      ],
      leftIsJapanese: true,
      explanation: "こんばんは = สวัสดีตอนเย็น · おやすみなさい = ราตรีสวัสดิ์ · はじめまして = ยินดีที่ได้รู้จัก · さようなら = ลาก่อน",
      difficulty: 1,
    },
    {
      id: exId(14, 3),
      type: "listen",
      question: "ฟังแล้วเลือกความหมายที่ถูกต้อง",
      audioText: "こんばんは",
      options: ["สวัสดีตอนเย็น", "สวัสดีตอนเช้า", "ขอบคุณ", "ขอโทษ"],
      correctAnswer: "สวัสดีตอนเย็น",
      explanation: "こんばんは (konbanwa) = สวัสดีตอนเย็น",
      difficulty: 2,
      reviewKey: "vocab:konbanwa",
    },
    {
      id: exId(14, 4),
      type: "true-false",
      question: "ข้อความนี้ถูกหรือผิด?",
      statement: "ありがとう เหมาะจะพูดกับพนักงานโรงแรมมากกว่า ありがとうございます",
      correctAnswer: false,
      explanation: "กับพนักงานหรือคนแปลกหน้าควรใช้ ありがとうございます ซึ่งสุภาพกว่า ありがとう ใช้กับเพื่อน",
      difficulty: 1,
      reviewKey: "vocab:arigatou-gozaimasu",
    },
    {
      id: exId(14, 5),
      type: "conversation",
      question: "เลือกคำตอบที่เหมาะสม",
      situation: "พบไกด์ชาวญี่ปุ่นครั้งแรก ไกด์ทักทายคุณ",
      lines: [{ speaker: "ไกด์", japanese: "はじめまして。", romaji: "Hajimemashite.", thai: "ยินดีที่ได้รู้จักค่ะ" }],
      options: ["はじめまして。", "おやすみなさい。", "さようなら。"],
      correctAnswer: "はじめまして。",
      explanation: "เมื่อเจอกันครั้งแรก ตอบกลับด้วย はじめまして เหมือนกัน",
      difficulty: 1,
      reviewKey: "vocab:hajimemashite",
    },
    {
      id: exId(14, 6),
      type: "fill-blank",
      question: "เติมคำให้สมบูรณ์",
      sentence: "ありがとう___。",
      translation: "ขอบคุณค่ะ (สุภาพ)",
      options: ["ございます", "なさい", "まして", "ばんは"],
      correctAnswer: "ございます",
      explanation: "ありがとう + ございます = ありがとうございます (แบบสุภาพ)",
      difficulty: 2,
    },
    {
      id: exId(14, 7),
      type: "type",
      question: "พิมพ์คำว่า “ohayou” เป็นฮิรางานะ (พิมพ์โรมาจิแล้วระบบจะแปลงให้)",
      prompt: "ohayou → ?",
      inputMode: "kana",
      correctAnswer: "おはよう",
      explanation: "o-ha-yo-u = おはよう",
      difficulty: 3,
    },
  ],
  summary: [
    "おはようございます (เช้า) · こんにちは (กลางวัน) · こんばんは (เย็น)",
    "おやすみなさい (ก่อนนอน) · はじめまして (เจอครั้งแรก) · さようなら (ลาก่อน)",
    "ใช้แบบสุภาพกับพนักงาน และโค้งเล็กน้อย",
  ],
  reviewItems: [
    "vocab:ohayou",
    "vocab:konbanwa",
    "vocab:arigatou-gozaimasu",
    "vocab:sayounara",
    "vocab:oyasuminasai",
    "vocab:hajimemashite",
  ],
};

export const PHASE1_LESSONS: Lesson[] = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14];
