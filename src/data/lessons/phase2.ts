import type { Lesson } from "@/lib/types";
import { buildKanaLesson, exId, section } from "./builders";

/**
 * Phase 2 — December 2026 — Katakana (Days 15–30 fully authored)
 */

const A = ["ア", "イ", "ウ", "エ", "オ"];
const KA = ["カ", "キ", "ク", "ケ", "コ"];
const SA = ["サ", "シ", "ス", "セ", "ソ"];
const TA = ["タ", "チ", "ツ", "テ", "ト"];
const NA = ["ナ", "ニ", "ヌ", "ネ", "ノ"];
const HA = ["ハ", "ヒ", "フ", "ヘ", "ホ"];
const MA = ["マ", "ミ", "ム", "メ", "モ"];
const YA = ["ヤ", "ユ", "ヨ"];
const RA = ["ラ", "リ", "ル", "レ", "ロ"];
const WA = ["ワ", "ヲ", "ン"];
const BASIC = [...A, ...KA, ...SA, ...TA, ...NA, ...HA, ...MA, ...YA, ...RA, ...WA];

const day15 = buildKanaLesson({
  day: 15,
  phase: 2,
  title: "เริ่มคาตากานะ: ア・イ・ウ・エ・オ",
  subtitle: "ตัวอักษรสำหรับคำต่างประเทศ + เครื่องหมายลากเสียง ー",
  topic: "Basic Katakana",
  script: "katakana",
  chars: [...A, "ー"],
  drillChars: A,
  known: [],
  objectives: ["รู้ว่าคาตากานะใช้ทำอะไร", "อ่าน ア イ ウ エ オ ได้", "เข้าใจเครื่องหมายลากเสียง ー"],
  intro:
    "คาตากานะ (カタカナ) มีเสียงเหมือนฮิรางานะทุกตัว! แค่หน้าตาเป็นเส้นตรงและเหลี่ยมกว่า ใช้เขียน “คำที่มาจากภาษาต่างประเทศ” เช่น コーヒー (กาแฟ) ホテル (โรงแรม) และชื่อคนต่างชาติ — ตอนเที่ยวจะเห็นบนเมนูและป้ายเยอะมาก",
  learnExtra: [
    {
      kind: "tip",
      title: "ー = ลากเสียงยาว",
      text: "ในคาตากานะ เสียงยาวใช้ขีด ー แทนการเขียนสระซ้ำ เช่น コーヒー = ko-o-hi-i (โคฮี) ถ้าเขียนแนวตั้ง ขีดนี้จะเป็นแนวตั้ง",
    },
  ],
  compare: [
    { japanese: "あ", label: "ฮิรางานะ a", note: "โค้งมน" },
    { japanese: "ア", label: "คาตากานะ a", note: "เส้นตรง เหลี่ยม" },
    { japanese: "う", label: "ฮิรางานะ u", note: "ตะขอโค้ง" },
    { japanese: "ウ", label: "คาตากานะ u", note: "มีหลังคาเหลี่ยม" },
  ],
  words: [],
  extraExercises: [
    {
      id: exId(15, 1),
      type: "multiple-choice",
      question: "คาตากานะส่วนใหญ่ใช้เขียนคำประเภทไหน?",
      options: ["คำที่มาจากภาษาต่างประเทศ", "คำช่วยในประโยค", "ชื่อวัดและศาลเจ้า", "ตัวเลข"],
      correctAnswer: "คำที่มาจากภาษาต่างประเทศ",
      explanation: "คาตากานะใช้กับคำยืมจากภาษาต่างประเทศ ชื่อคนต่างชาติ และชื่อแบรนด์ เช่น ホテル (hotel)",
      difficulty: 1,
    },
    {
      id: exId(15, 2),
      type: "true-false",
      question: "ข้อความนี้ถูกหรือผิด?",
      statement: "ア (คาตากานะ) กับ あ (ฮิรางานะ) อ่านออกเสียงเหมือนกัน",
      correctAnswer: true,
      explanation: "ถูกต้อง! ทั้งสองอ่านว่า a — คาตากานะมีเสียงตรงกับฮิรางานะทุกตัว",
      difficulty: 1,
    },
  ],
  summary: [
    "คาตากานะ = เสียงเดียวกับฮิรางานะ แต่ใช้กับคำต่างประเทศ",
    "ア a · イ i · ウ u · エ e · オ o",
    "ー = ลากเสียงสระตัวหน้าให้ยาว",
  ],
});

const day16 = buildKanaLesson({
  day: 16,
  phase: 2,
  title: "คาตากานะ: カ・キ・ク・ケ・コ",
  subtitle: "หลายตัวหน้าตาคล้ายฮิรางานะ",
  topic: "Basic Katakana",
  script: "katakana",
  chars: KA,
  known: A,
  objectives: ["อ่านแถว カ ได้", "เชื่อมโยงกับฮิรางานะ か き こ", "อ่านคำยืมง่าย ๆ ได้"],
  intro: "ข่าวดี! カ キ コ หน้าตาคล้าย か き こ มาก แค่เป็นเส้นตรงขึ้น",
  compare: [
    { japanese: "か", label: "ka (ฮิรางานะ)", note: "มีขีดเล็กด้านขวา" },
    { japanese: "カ", label: "ka (คาตากานะ)", note: "ไม่มีขีดเล็ก" },
    { japanese: "ク", label: "ku", note: "ขีดสั้นด้านบน + เส้นโค้งลง" },
    { japanese: "ケ", label: "ke", note: "มีเส้นตั้งแยกออกมา" },
  ],
  words: [
    { japanese: "ケーキ", romaji: "keeki", meaning: "เค้ก", accept: ["keki"] },
    { japanese: "ココア", romaji: "kokoa", meaning: "โกโก้" },
    { japanese: "イカ", romaji: "ika", meaning: "ปลาหมึก" },
    { japanese: "カカオ", romaji: "kakao", meaning: "โกโก้ (เมล็ด)" },
    { japanese: "エコ", romaji: "eko", meaning: "รักษ์โลก (eco)" },
  ],
  vocabulary: ["keeki"],
});

const day17 = buildKanaLesson({
  day: 17,
  phase: 2,
  title: "คาตากานะ: サ・シ・ス・セ・ソ",
  subtitle: "ระวัง シ (shi) กับ ソ (so)",
  topic: "Basic Katakana",
  script: "katakana",
  chars: SA,
  known: [...A, ...KA],
  objectives: ["อ่านแถว サ ได้", "เริ่มจำความต่างของ シ และ ソ", "อ่านคำยืมเกี่ยวกับอาหารได้"],
  intro: "แถว サ: sa shi su se so — セ หน้าตาเหมือน せ ส่วน シ และ ソ ต้องระวัง จะเจอคู่ปรับ ツ และ ン ในบทถัด ๆ ไป",
  compare: [
    { japanese: "シ", label: "shi", note: "2 จุดเรียงลงด้านซ้าย เส้นลากขึ้น" },
    { japanese: "ソ", label: "so", note: "1 ขีดด้านซ้าย เส้นยาวลากลง" },
    { japanese: "セ", label: "se", note: "เหมือน せ" },
  ],
  words: [
    { japanese: "アイス", romaji: "aisu", meaning: "ไอศกรีม / เย็น" },
    { japanese: "スキー", romaji: "sukii", meaning: "สกี", accept: ["suki"] },
    { japanese: "ソース", romaji: "soosu", meaning: "ซอส", accept: ["sosu"] },
    { japanese: "シーソー", romaji: "shiisoo", meaning: "ไม้กระดก", accept: ["shiso"] },
    { japanese: "ケース", romaji: "keesu", meaning: "กล่อง / เคส", accept: ["kesu"] },
  ],
  vocabulary: ["aisu"],
});

const day18 = buildKanaLesson({
  day: 18,
  phase: 2,
  title: "คาตากานะ: タ・チ・ツ・テ・ト",
  subtitle: "คู่ปรับตลอดกาล シ กับ ツ",
  topic: "Katakana pronunciation",
  script: "katakana",
  chars: TA,
  known: [...A, ...KA, ...SA],
  objectives: ["อ่านแถว タ ได้", "แยก シ กับ ツ ได้อย่างมั่นใจ", "อ่านคำว่า タクシー ได้"],
  intro: "แถว タ: ta chi tsu te to — ตัวที่เจอบ่อยตอนเที่ยวคือ タクシー (แท็กซี่) และ トイレ (ห้องน้ำ)",
  compare: [
    { japanese: "シ", label: "shi", note: "จุดอยู่ด้านซ้าย · เส้นยาวลากจากล่างขึ้นบน" },
    { japanese: "ツ", label: "tsu", note: "จุดอยู่ด้านบน · เส้นยาวลากจากบนลงล่าง" },
  ],
  understandExtra: [
    {
      kind: "tip",
      tone: "warning",
      title: "เทคนิคแยก シ / ツ",
      text: "シ “ยิ้ม” มองขึ้นด้านข้าง (จุดเรียงแนวตั้งด้านซ้าย) · ツ “มองลงมา” (จุดเรียงแนวนอนด้านบน) ลองดูว่าหางยาวชี้ขึ้น (シ) หรือชี้ลง (ツ)",
    },
  ],
  words: [
    { japanese: "タクシー", romaji: "takushii", meaning: "แท็กซี่", accept: ["takushi"] },
    { japanese: "テキスト", romaji: "tekisuto", meaning: "หนังสือเรียน (text)" },
    { japanese: "スーツ", romaji: "suutsu", meaning: "ชุดสูท", accept: ["sutsu"] },
    { japanese: "トースト", romaji: "toosuto", meaning: "ขนมปังปิ้ง", accept: ["tosuto"] },
    { japanese: "ツアー", romaji: "tsuaa", meaning: "ทัวร์", accept: ["tsua"] },
  ],
  vocabulary: ["takushii"],
  extraExercises: [
    {
      id: exId(18, 1),
      type: "multiple-choice",
      question: "ตัวไหนคือ “tsu”?",
      options: ["ツ", "シ", "ソ", "ン"],
      optionsAreJapanese: true,
      correctAnswer: "ツ",
      explanation: "ツ (tsu) มีจุดเรียงอยู่ด้านบน และเส้นยาวลากจากบนลงล่าง ส่วน シ (shi) จุดอยู่ด้านซ้าย",
      difficulty: 2,
      reviewKey: "kana:ツ",
    },
  ],
});

const day19 = buildKanaLesson({
  day: 19,
  phase: 2,
  title: "คาตากานะ: ナ・ニ・ヌ・ネ・ノ",
  subtitle: "แถว N — มีตัวที่ง่ายมากอย่าง ニ และ ノ",
  topic: "Basic Katakana",
  script: "katakana",
  chars: NA,
  known: [...A, ...KA, ...SA, ...TA],
  objectives: ["อ่านแถว ナ ได้", "แยก ヌ กับ ス ได้", "อ่านคำกีฬาและของใช้ได้"],
  intro: "แถว ナ: na ni nu ne no — ニ คือสองขีดเหมือนเลข 二 และ ノ คือขีดเฉียงเส้นเดียว",
  compare: [
    { japanese: "ス", label: "su", note: "ไม่มีขีดตัดตรงกลาง" },
    { japanese: "ヌ", label: "nu", note: "มีขีดเฉียงตัดตรงกลาง" },
  ],
  words: [
    { japanese: "テニス", romaji: "tenisu", meaning: "เทนนิส" },
    { japanese: "ネクタイ", romaji: "nekutai", meaning: "เนกไท" },
    { japanese: "ノート", romaji: "nooto", meaning: "สมุดโน้ต", accept: ["noto"] },
    { japanese: "カヌー", romaji: "kanuu", meaning: "เรือแคนู", accept: ["kanu"] },
    { japanese: "ツナ", romaji: "tsuna", meaning: "ปลาทูน่า" },
  ],
});

const day20 = buildKanaLesson({
  day: 20,
  phase: 2,
  title: "ทบทวนคาตากานะ: ア ถึง ノ",
  subtitle: "วันทบทวน — อ่านคำยืมให้คล่อง",
  topic: "Reading practice",
  script: "katakana",
  chars: [...A, ...KA, ...SA, ...TA, ...NA],
  drillChars: ["シ", "ツ", "ソ", "ス", "ヌ", "ク", "ケ", "チ", "テ", "ネ"],
  known: [],
  objectives: ["ทบทวนคาตากานะ 25 ตัว", "อ่านคำยืมยาว ๆ ได้", "แยกตัวที่คล้ายกันได้"],
  intro: "ครึ่งทางของคาตากานะแล้ว! วันนี้ทบทวนและฝึกอ่านคำยาว ๆ ที่เจอได้จริงตอนเที่ยว",
  compare: [
    { japanese: "シ", label: "shi", note: "จุดซ้าย" },
    { japanese: "ツ", label: "tsu", note: "จุดบน" },
    { japanese: "ス", label: "su", note: "ไม่มีขีดตัด" },
    { japanese: "ヌ", label: "nu", note: "มีขีดตัด" },
  ],
  words: [
    { japanese: "スーツケース", romaji: "suutsukeesu", meaning: "กระเป๋าเดินทาง", accept: ["sutsukesu"] },
    { japanese: "スケート", romaji: "sukeeto", meaning: "สเก็ต", accept: ["sketo", "suketo"] },
    { japanese: "ココナツ", romaji: "kokonatsu", meaning: "มะพร้าว" },
    { japanese: "タクシー", romaji: "takushii", meaning: "แท็กซี่", accept: ["takushi"] },
    { japanese: "ノート", romaji: "nooto", meaning: "สมุดโน้ต", accept: ["noto"] },
    { japanese: "ネクタイ", romaji: "nekutai", meaning: "เนกไท" },
  ],
  summary: ["ทบทวน 5 แถว: ア カ サ タ ナ", "คู่ที่ต้องระวัง: シ/ツ · ス/ヌ · ク/ケ", "อ่านได้แล้ว: スーツケース (กระเป๋าเดินทาง)"],
});

const day21 = buildKanaLesson({
  day: 21,
  phase: 2,
  title: "คาตากานะ: ハ・ヒ・フ・ヘ・ホ",
  subtitle: "ヘ เหมือน へ ทุกประการ",
  topic: "Basic Katakana",
  script: "katakana",
  chars: HA,
  known: [...A, ...KA, ...SA, ...TA, ...NA],
  objectives: ["อ่านแถว ハ ได้", "อ่าน コーヒー ได้", "เข้าใจเสียง フ (fu)"],
  intro: "แถว ハ: ha hi fu he ho — フ ใช้แทนเสียง f ในคำต่างประเทศด้วย และ ヘ หน้าตาแทบเหมือนฮิรางานะ へ",
  compare: [
    { japanese: "ヘ", label: "he (คาตากานะ)", note: "เกือบเหมือน へ" },
    { japanese: "フ", label: "fu", note: "เส้นนอนแล้วโค้งลง" },
    { japanese: "ワ", label: "wa (บทหลัง)", note: "มีขีดตั้งสั้นด้านซ้าย" },
  ],
  words: [
    { japanese: "コーヒー", romaji: "koohii", meaning: "กาแฟ", accept: ["kohi", "koohi"] },
    { japanese: "ヒーター", romaji: "hiitaa", meaning: "ฮีตเตอร์", accept: ["hita"] },
    { japanese: "ハート", romaji: "haato", meaning: "หัวใจ (รูปหัวใจ)", accept: ["hato"] },
    { japanese: "ソフト", romaji: "sofuto", meaning: "ซอฟต์ / นุ่ม" },
    { japanese: "ホース", romaji: "hoosu", meaning: "สายยาง", accept: ["hosu"] },
  ],
  vocabulary: ["koohii"],
});

const day22 = buildKanaLesson({
  day: 22,
  phase: 2,
  title: "คาตากานะ: マ・ミ・ム・メ・モ",
  subtitle: "ホーム = ชานชาลารถไฟ",
  topic: "Foreign loanwords",
  script: "katakana",
  chars: MA,
  known: [...A, ...KA, ...SA, ...TA, ...NA, ...HA],
  objectives: ["อ่านแถว マ ได้", "แยก マ กับ ア ได้", "รู้คำว่า ホーム (ชานชาลา)"],
  intro: "แถว マ: ma mi mu me mo — ミ คือสามขีดเฉียง ส่วน モ หน้าตาคล้าย も",
  compare: [
    { japanese: "ア", label: "a", note: "เส้นโค้งลงยาว" },
    { japanese: "マ", label: "ma", note: "มีขีดสั้นข้างล่างแทน" },
    { japanese: "ム", label: "mu", note: "สามเหลี่ยมมีหาง" },
    { japanese: "メ", label: "me", note: "กากบาทเฉียง" },
  ],
  words: [
    { japanese: "ハム", romaji: "hamu", meaning: "แฮม" },
    { japanese: "メモ", romaji: "memo", meaning: "บันทึกช่วยจำ" },
    { japanese: "マスク", romaji: "masuku", meaning: "หน้ากากอนามัย" },
    { japanese: "ホーム", romaji: "hoomu", meaning: "ชานชาลา", accept: ["homu"] },
    { japanese: "チーム", romaji: "chiimu", meaning: "ทีม", accept: ["chimu"] },
  ],
  vocabulary: ["hoomu"],
});

const day23 = buildKanaLesson({
  day: 23,
  phase: 2,
  title: "คาตากานะ: ヤ・ユ・ヨ + ラ・リ・ル・レ・ロ",
  subtitle: "ホテル · トイレ · カレー",
  topic: "Foreign loanwords",
  script: "katakana",
  chars: [...YA, ...RA],
  known: [...A, ...KA, ...SA, ...TA, ...NA, ...HA, ...MA],
  objectives: ["อ่านแถว ヤ และ ラ ได้", "อ่านคำว่า ホテル และ トイレ ได้", "แยก ロ กับคันจิ 口 ได้"],
  intro: "สองแถวนี้มีคำสำคัญมากสำหรับการเที่ยว: ホテル (โรงแรม) และ トイレ (ห้องน้ำ)!",
  compare: [
    { japanese: "ロ", label: "ro (คาตากานะ)", note: "สี่เหลี่ยมเล็ก" },
    { japanese: "ユ", label: "yu", note: "ด้านซ้ายเปิด" },
    { japanese: "ヨ", label: "yo", note: "ด้านซ้ายเปิด มีขีดกลาง" },
    { japanese: "リ", label: "ri", note: "เหมือน り" },
  ],
  words: [
    { japanese: "ホテル", romaji: "hoteru", meaning: "โรงแรม" },
    { japanese: "トイレ", romaji: "toire", meaning: "ห้องน้ำ" },
    { japanese: "カレー", romaji: "karee", meaning: "แกงกะหรี่", accept: ["kare"] },
    { japanese: "メール", romaji: "meeru", meaning: "อีเมล", accept: ["meru"] },
    { japanese: "クリーム", romaji: "kuriimu", meaning: "ครีม", accept: ["kurimu"] },
    { japanese: "タイヤ", romaji: "taiya", meaning: "ยางรถ" },
  ],
  vocabulary: ["hoteru", "toire", "karee"],
});

const day24 = buildKanaLesson({
  day: 24,
  phase: 2,
  title: "คาตากานะ: ワ・ヲ・ン",
  subtitle: "ครบคาตากานะพื้นฐาน 46 ตัว! + คู่ปรับ ソ กับ ン",
  topic: "Basic Katakana",
  script: "katakana",
  chars: WA,
  drillChars: ["ワ", "ン", "ソ", "シ", "ツ", "ウ"],
  known: BASIC.filter((c) => !WA.includes(c)),
  objectives: ["อ่าน ワ ン ได้", "แยก ソ กับ ン ได้", "อ่านคำว่า ラーメン ได้"],
  intro: "3 ตัวสุดท้าย: ワ (wa) · ヲ (o — แทบไม่ใช้) · ン (n) — ต้องระวัง ン กับ ソ ที่หน้าตาคล้ายกันมาก",
  compare: [
    { japanese: "ソ", label: "so", note: "ขีดสั้นเกือบตั้ง · เส้นยาวลากจากบนลงล่าง" },
    { japanese: "ン", label: "n", note: "ขีดสั้นเกือบนอน · เส้นยาวลากจากล่างขึ้นบน" },
    { japanese: "ワ", label: "wa", note: "ไม่มีจุดบน" },
    { japanese: "ウ", label: "u", note: "มีขีดบน" },
  ],
  words: [
    { japanese: "ワイン", romaji: "wain", meaning: "ไวน์" },
    { japanese: "ラーメン", romaji: "raamen", meaning: "ราเมง", accept: ["ramen"] },
    { japanese: "レモン", romaji: "remon", meaning: "มะนาวเลมอน" },
    { japanese: "メロン", romaji: "meron", meaning: "เมลอน" },
    { japanese: "リモコン", romaji: "rimokon", meaning: "รีโมต" },
  ],
  vocabulary: ["raamen", "wain"],
  summary: ["ワ wa · ヲ o (แทบไม่ใช้) · ン n", "ソ (so) ลากลง · ン (n) ลากขึ้น", "🎉 อ่านคาตากานะพื้นฐานครบ 46 ตัวแล้ว!"],
});

const day25 = buildKanaLesson({
  day: 25,
  phase: 2,
  title: "คาตากานะ ゛ และ ゜",
  subtitle: "バス · ビール · パン — กฎเดียวกับฮิรางานะ",
  topic: "Katakana dakuten",
  script: "katakana",
  chars: ["ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ"],
  drillChars: ["ガ", "ゴ", "ジ", "ズ", "ダ", "デ", "ド", "バ", "ビ", "ブ", "パ", "ピ"],
  known: BASIC,
  objectives: ["ใช้กฎ ゛ ゜ กับคาตากานะได้", "อ่าน バス ビール パン ได้", "อ่านคำยืมที่มีเสียงขุ่นได้"],
  intro: "กฎเหมือนฮิรางานะทุกอย่าง: ゛ ทำให้ k→g s→z t→d h→b และ ゜ ทำให้ h→p",
  learnExtra: [
    {
      kind: "table",
      headers: ["เดิม", "ใหม่", "เสียง"],
      rows: [
        ["カ", "ガ", "ga"],
        ["サ", "ザ", "za"],
        ["タ", "ダ", "da"],
        ["ハ", "バ", "ba"],
        ["ハ", "パ", "pa"],
      ],
      japaneseCols: [0, 1],
    },
  ],
  words: [
    { japanese: "バス", romaji: "basu", meaning: "รถบัส" },
    { japanese: "ビール", romaji: "biiru", meaning: "เบียร์", accept: ["biru"] },
    { japanese: "パン", romaji: "pan", meaning: "ขนมปัง" },
    { japanese: "ピザ", romaji: "piza", meaning: "พิซซ่า" },
    { japanese: "デパート", romaji: "depaato", meaning: "ห้างสรรพสินค้า", accept: ["depato"] },
    { japanese: "ガイド", romaji: "gaido", meaning: "ไกด์" },
    { japanese: "ゲーム", romaji: "geemu", meaning: "เกม", accept: ["gemu"] },
  ],
  vocabulary: ["basu", "biiru", "pan"],
});

const day26 = buildKanaLesson({
  day: 26,
  phase: 2,
  title: "คาตากานะตัวเล็ก ッ ャ ュ ョ",
  subtitle: "メニュー · ジュース · ショップ",
  topic: "Katakana combinations",
  script: "katakana",
  chars: ["キャ", "シャ", "シュ", "ショ", "チャ", "チョ", "ジュ", "ニュ", "ッ"],
  drillChars: ["キャ", "シャ", "シュ", "ショ", "チョ", "ジュ", "ニュ"],
  known: ["キ", "シ", "チ", "ニ", "ジ", "ヤ", "ユ", "ヨ"],
  objectives: ["อ่านตัวผสมคาตากานะได้", "อ่าน メニュー ได้", "เข้าใจ ッ ในคำยืม"],
  intro: "หลักการเหมือนฮิรางานะ: ตัวเล็ก ャ ュ ョ รวมกับตัวหน้าเป็นพยางค์เดียว และ ッ ตัวเล็กคือหยุดค้าง",
  learnExtra: [
    {
      kind: "tip",
      title: "รู้ไว้: ตัวผสมพิเศษของคาตากานะ",
      text: "คาตากานะมีตัวผสมพิเศษสำหรับเสียงต่างประเทศ เช่น ティ (ti) ใน パーティー (party) และ ファ (fa) ใน ファミリー (family) ยังไม่ต้องจำ แค่รู้ว่ามีอยู่",
    },
  ],
  words: [
    { japanese: "メニュー", romaji: "menyuu", meaning: "เมนู", accept: ["menyu", "menu"] },
    { japanese: "ジュース", romaji: "juusu", meaning: "น้ำผลไม้", accept: ["jusu"] },
    { japanese: "ショップ", romaji: "shoppu", meaning: "ร้านค้า" },
    { japanese: "ベッド", romaji: "beddo", meaning: "เตียง" },
    { japanese: "カップ", romaji: "kappu", meaning: "ถ้วย" },
    { japanese: "チョコレート", romaji: "chokoreeto", meaning: "ช็อกโกแลต", accept: ["chokoreto"] },
  ],
  vocabulary: ["menyuu", "juusu"],
});

/* ------------------------- Day 27 — comparison -------------------------- */

const day27: Lesson = {
  id: "day-27",
  dayNumber: 27,
  title: "ฮิรางานะ vs คาตากานะ",
  subtitle: "แยกตัวที่หน้าตาคล้ายกันให้ขาด",
  phase: 2,
  topic: "Hiragana and Katakana comparison",
  estimatedMinutes: 20,
  objectives: ["รู้ว่าเมื่อไรใช้ฮิรางานะ / คาตากานะ", "แยกคู่ที่คล้ายกันได้ (シ/ツ ソ/ン)", "ไม่สับสนคาตากานะกับคันจิที่หน้าตาเหมือนกัน"],
  vocabulary: [],
  grammar: [],
  kana: [],
  sections: [
    section("learn", "เมื่อไรใช้แบบไหน?", [
      {
        kind: "table",
        headers: ["ฮิรางานะ", "คาตากานะ"],
        rows: [
          ["คำญี่ปุ่นแท้ เช่น すし みず", "คำต่างประเทศ เช่น コーヒー ホテル"],
          ["คำช่วยในประโยค เช่น は を の", "ชื่อคนต่างชาติ เช่น タイ (ไทย)"],
          ["ส่วนท้ายคำกริยา", "เสียงเลียนแบบ / เน้นคำ"],
        ],
      },
      {
        kind: "text",
        text: "ในประโยคจริงจะเห็นทั้งสองแบบปนกัน เช่น コーヒーを ください (ขอกาแฟค่ะ) — コーヒー เป็นคาตากานะ ส่วน を ください เป็นฮิรางานะ",
      },
    ]),
    section("understand", "คู่ที่หน้าตาคล้ายกัน", [
      {
        kind: "compare",
        items: [
          { japanese: "シ", label: "shi", note: "จุดซ้าย หางลากขึ้น" },
          { japanese: "ツ", label: "tsu", note: "จุดบน หางลากลง" },
          { japanese: "ソ", label: "so", note: "ขีดตั้ง หางลากลง" },
          { japanese: "ン", label: "n", note: "ขีดนอน หางลากขึ้น" },
        ],
      },
      {
        kind: "compare",
        items: [
          { japanese: "へ", label: "he (ฮิรางานะ)", note: "แทบเหมือนกัน" },
          { japanese: "ヘ", label: "he (คาตากานะ)", note: "ดูจากคำรอบข้าง" },
          { japanese: "り", label: "ri (ฮิรางานะ)", note: "เส้นโค้งกว่า" },
          { japanese: "リ", label: "ri (คาตากานะ)", note: "เส้นตรงกว่า" },
        ],
      },
      {
        kind: "tip",
        tone: "warning",
        title: "คาตากานะ vs คันจิหน้าตาเหมือนกัน",
        text: "บางตัวหน้าตาเหมือนคันจิ: カ (ka) กับ 力 (แรง) · ロ (ro) กับ 口 (ปาก) · エ (e) กับ 工 (ช่าง) · ニ (ni) กับ 二 (สอง) — ดูจากคำรอบข้าง ถ้าอยู่ในคำต่างประเทศคือคาตากานะ เช่น 出口 (ทางออก) คือคันจิ 口 ไม่ใช่ ロ",
      },
    ]),
    section("practice", "ฝึกแยกตัวอักษร", [{ kind: "text", text: "ดูให้ดี ๆ ทีละตัว ไม่ต้องรีบ!" }]),
    section("review", "สรุปบทเรียน", [
      {
        kind: "checklist",
        items: [
          "ฮิรางานะ = คำญี่ปุ่น + คำช่วย · คาตากานะ = คำต่างประเทศ",
          "シ (จุดซ้าย) / ツ (จุดบน) · ソ (ลากลง) / ン (ลากขึ้น)",
          "ระวังคาตากานะที่หน้าเหมือนคันจิ: ロ/口 · カ/力 · エ/工 · ニ/二",
        ],
      },
    ]),
  ],
  exercises: [
    {
      id: exId(27, 1),
      type: "multiple-choice",
      question: "ข้อใดเป็นคาตากานะทั้งหมด?",
      options: ["コーヒー", "すし", "みず", "ください"],
      optionsAreJapanese: true,
      correctAnswer: "コーヒー",
      explanation: "コーヒー (กาแฟ) เป็นคำยืมจึงเขียนด้วยคาตากานะ ส่วนตัวเลือกอื่นเป็นฮิรางานะ",
      difficulty: 1,
    },
    {
      id: exId(27, 2),
      type: "multiple-choice",
      question: "ตัวไหนอ่านว่า “shi”?",
      options: ["シ", "ツ", "ソ", "ン"],
      optionsAreJapanese: true,
      correctAnswer: "シ",
      explanation: "シ (shi) จุดเรียงอยู่ด้านซ้าย หางลากขึ้น",
      difficulty: 2,
      reviewKey: "kana:シ",
    },
    {
      id: exId(27, 3),
      type: "multiple-choice",
      question: "ตัวไหนอ่านว่า “n”?",
      options: ["ソ", "ン", "シ", "ツ"],
      optionsAreJapanese: true,
      correctAnswer: "ン",
      explanation: "ン (n) ขีดสั้นเกือบนอน หางลากจากล่างขึ้นบน ส่วน ソ (so) หางลากลง",
      difficulty: 2,
      reviewKey: "kana:ン",
    },
    {
      id: exId(27, 4),
      type: "match",
      question: "จับคู่ฮิรางานะกับคาตากานะที่อ่านเหมือนกัน",
      pairs: [
        { left: "か", right: "カ" },
        { left: "せ", right: "セ" },
        { left: "も", right: "モ" },
        { left: "や", right: "ヤ" },
      ],
      leftIsJapanese: true,
      explanation: "か=カ (ka) · せ=セ (se) · も=モ (mo) · や=ヤ (ya)",
      difficulty: 1,
    },
    {
      id: exId(27, 5),
      type: "true-false",
      question: "ข้อความนี้ถูกหรือผิด?",
      statement: "ป้าย 出口 (ทางออก) ตัวท้ายคือคาตากานะ ロ",
      correctAnswer: false,
      explanation: "ตัวท้ายของ 出口 คือคันจิ 口 (ปาก/ทางผ่าน) อ่านว่า guchi ไม่ใช่คาตากานะ ロ",
      difficulty: 3,
    },
    {
      id: exId(27, 6),
      type: "read-meaning",
      question: "อ่านคำนี้ แล้วเลือกความหมาย",
      japanese: "ソース",
      options: ["ซอส", "ห้องน้ำ", "ไวน์", "หนังสือ"],
      correctAnswer: "ซอส",
      explanation: "ソース (soosu) = ซอส ตัวแรกคือ ソ (so) ไม่ใช่ ン",
      difficulty: 2,
      reviewKey: "kana:ソ",
    },
    {
      id: exId(27, 7),
      type: "multiple-choice",
      question: "ประโยค コーヒーを ください มีตัวอักษรกี่แบบ?",
      options: ["2 แบบ (คาตากานะ + ฮิรางานะ)", "1 แบบ (คาตากานะ)", "1 แบบ (ฮิรางานะ)", "3 แบบ (รวมคันจิ)"],
      correctAnswer: "2 แบบ (คาตากานะ + ฮิรางานะ)",
      explanation: "コーヒー เป็นคาตากานะ ส่วน を ください เป็นฮิรางานะ",
      difficulty: 2,
    },
  ],
  summary: ["ฮิรางานะ = คำญี่ปุ่น · คาตากานะ = คำต่างประเทศ", "แยก シ/ツ และ ソ/ン ได้แล้ว"],
  reviewItems: ["kana:シ", "kana:ツ", "kana:ソ", "kana:ン"],
};

/* ---------------------- Day 28 — Food & drink words ---------------------- */

const day28: Lesson = {
  id: "day-28",
  dayNumber: 28,
  title: "คำศัพท์อาหารและเครื่องดื่ม (คาตากานะ)",
  subtitle: "コーヒー · ビール · ラーメン · ホット/アイス",
  phase: 2,
  topic: "Food and drink vocabulary",
  estimatedMinutes: 20,
  objectives: ["อ่านชื่ออาหารและเครื่องดื่มคาตากานะได้", "สั่งเครื่องดื่มร้อน/เย็นได้", "ใช้ “... を ください” ขอของได้"],
  vocabulary: ["koohii", "biiru", "juusu", "raamen", "karee", "sarada", "pan", "keeki", "hotto", "aisu", "kudasai"],
  grammar: [],
  sections: [
    section("learn", "เมนูที่เจอบ่อย", [
      {
        kind: "phrase-list",
        title: "เครื่องดื่ม",
        items: [
          { japanese: "コーヒー", romaji: "koohii", thai: "โคฮี", meaning: "กาแฟ" },
          { japanese: "ビール", romaji: "biiru", thai: "บีรุ", meaning: "เบียร์" },
          { japanese: "ジュース", romaji: "juusu", thai: "จูสุ", meaning: "น้ำผลไม้" },
          { japanese: "ホット", romaji: "hotto", thai: "ฮตโตะ", meaning: "ร้อน (เครื่องดื่ม)" },
          { japanese: "アイス", romaji: "aisu", thai: "ไอสุ", meaning: "เย็น / ใส่น้ำแข็ง" },
        ],
      },
      {
        kind: "phrase-list",
        title: "อาหาร",
        items: [
          { japanese: "ラーメン", romaji: "raamen", thai: "ราเมง", meaning: "ราเมง" },
          { japanese: "カレー", romaji: "karee", thai: "คะเร", meaning: "แกงกะหรี่" },
          { japanese: "サラダ", romaji: "sarada", thai: "ซะระดะ", meaning: "สลัด" },
          { japanese: "パン", romaji: "pan", thai: "ปัง", meaning: "ขนมปัง" },
          { japanese: "ケーキ", romaji: "keeki", thai: "เคคิ", meaning: "เค้ก" },
        ],
      },
    ]),
    section("understand", "ขอของด้วย を ください", [
      {
        kind: "text",
        text: "รูปประโยคที่ใช้ได้ทันที: [ของที่ต้องการ] を ください = ขอ [ของ] ค่ะ  (を อ่านว่า o)",
      },
      {
        kind: "read-aloud",
        items: [
          { japanese: "コーヒーを ください。", romaji: "Koohii o kudasai.", meaning: "ขอกาแฟค่ะ" },
          { japanese: "アイスコーヒーを ください。", romaji: "Aisu koohii o kudasai.", meaning: "ขอกาแฟเย็นค่ะ" },
          { japanese: "ビールを ください。", romaji: "Biiru o kudasai.", meaning: "ขอเบียร์ค่ะ" },
        ],
      },
      {
        kind: "tip",
        tone: "culture",
        title: "ขีด ー สำคัญ!",
        text: "ビール (biiru เบียร์) ถ้าออกเสียงสั้นเป็น ビル (biru) จะแปลว่า “ตึก” — ลากเสียงยาวให้ถูกนะ",
      },
    ]),
    section("practice", "ฝึกสั่งเครื่องดื่ม", [{ kind: "text", text: "ลองอ่านเมนูและสั่งของกัน" }]),
    section("review", "สรุปบทเรียน", [
      {
        kind: "checklist",
        items: [
          "เครื่องดื่ม: コーヒー ビール ジュース · ホット (ร้อน) / アイス (เย็น)",
          "อาหาร: ラーメン カレー サラダ パン ケーキ",
          "ขอของ: ___ を ください",
        ],
      },
    ]),
  ],
  exercises: [
    {
      id: exId(28, 1),
      type: "match",
      question: "จับคู่คำกับความหมาย",
      pairs: [
        { left: "コーヒー", right: "กาแฟ" },
        { left: "ビール", right: "เบียร์" },
        { left: "カレー", right: "แกงกะหรี่" },
        { left: "パン", right: "ขนมปัง" },
      ],
      leftIsJapanese: true,
      explanation: "コーヒー กาแฟ · ビール เบียร์ · カレー แกงกะหรี่ · パン ขนมปัง",
      difficulty: 1,
    },
    {
      id: exId(28, 2),
      type: "multiple-choice",
      question: "อยากได้กาแฟ “เย็น” ต้องเลือกเมนูไหน?",
      options: ["アイスコーヒー", "ホットコーヒー", "コーヒーケーキ", "ジュース"],
      optionsAreJapanese: true,
      correctAnswer: "アイスコーヒー",
      explanation: "アイス = เย็น/ใส่น้ำแข็ง ส่วน ホット = ร้อน",
      difficulty: 1,
      reviewKey: "vocab:aisu",
    },
    {
      id: exId(28, 3),
      type: "fill-blank",
      question: "เติมคำให้ถูกต้อง",
      sentence: "ラーメンを ___。",
      translation: "ขอราเมงค่ะ",
      options: ["ください", "ありがとう", "すみません", "こんにちは"],
      correctAnswer: "ください",
      explanation: "___ を ください = ขอ ___ ค่ะ",
      difficulty: 1,
      reviewKey: "vocab:kudasai",
    },
    {
      id: exId(28, 4),
      type: "order",
      question: "เรียงคำให้เป็นประโยค",
      translation: "ขอเบียร์ค่ะ",
      correctOrder: ["ビール", "を", "ください"],
      extraTiles: ["は"],
      explanation: "ビール (เบียร์) + を + ください = ビールを ください",
      difficulty: 2,
    },
    {
      id: exId(28, 5),
      type: "listen",
      question: "ฟังแล้วเลือกอาหารที่ได้ยิน",
      audioText: "サラダ",
      options: ["サラダ", "カレー", "ケーキ", "ラーメン"],
      optionsAreJapanese: true,
      correctAnswer: "サラダ",
      explanation: "เสียงที่ได้ยินคือ sarada = サラダ (สลัด)",
      difficulty: 2,
      reviewKey: "vocab:sarada",
    },
    {
      id: exId(28, 6),
      type: "true-false",
      question: "ข้อความนี้ถูกหรือผิด?",
      statement: "ビール (biiru) กับ ビル (biru) มีความหมายเหมือนกัน",
      correctAnswer: false,
      explanation: "ビール = เบียร์ แต่ ビル = ตึก ความยาวของเสียงเปลี่ยนความหมาย",
      difficulty: 2,
      reviewKey: "vocab:biiru",
    },
  ],
  summary: ["อ่านชื่ออาหาร/เครื่องดื่มคาตากานะได้", "ホット = ร้อน · アイス = เย็น", "ขอของ: ___ を ください"],
  reviewItems: ["vocab:koohii", "vocab:biiru", "vocab:juusu", "vocab:raamen", "vocab:karee", "vocab:hotto", "vocab:aisu", "vocab:kudasai"],
};

/* -------------------------- Day 29 — Common signs ------------------------ */

const day29: Lesson = {
  id: "day-29",
  dayNumber: 29,
  title: "ป้ายที่เจอบ่อยในญี่ปุ่น",
  subtitle: "トイレ · 入口 · 出口 · 男 · 女",
  phase: 2,
  topic: "Common Japanese signs",
  estimatedMinutes: 20,
  objectives: ["อ่านป้ายคาตากานะที่สำคัญได้", "จำคันจิบนป้าย 入口 出口 男 女 ได้", "หาห้องน้ำและทางออกได้เอง"],
  vocabulary: ["toire", "erebeetaa", "konbini", "iriguchi", "deguchi", "otoko", "onna", "kinen"],
  grammar: [],
  sections: [
    section("learn", "ป้ายคาตากานะ", [
      {
        kind: "phrase-list",
        items: [
          { japanese: "トイレ", romaji: "toire", thai: "โทะอิเระ", meaning: "ห้องน้ำ" },
          { japanese: "エレベーター", romaji: "erebeetaa", thai: "เอะเระเบตา", meaning: "ลิฟต์" },
          { japanese: "コンビニ", romaji: "konbini", thai: "คมบินิ", meaning: "ร้านสะดวกซื้อ" },
          { japanese: "タクシー", romaji: "takushii", thai: "ทะคุชี", meaning: "แท็กซี่" },
          { japanese: "バス", romaji: "basu", thai: "บะสุ", meaning: "รถบัส" },
        ],
      },
    ]),
    section("understand", "คันจิแรกของเรา: ป้ายสำคัญ", [
      {
        kind: "text",
        text: "คันจิคือตัวอักษรที่ “มีความหมายในตัว” ไม่ต้องจำวิธีเขียนตอนนี้ แค่จำหน้าตาให้ได้เมื่อเห็นบนป้าย",
      },
      {
        kind: "table",
        headers: ["ป้าย", "อ่านว่า", "ความหมาย", "ตัวช่วยจำ"],
        rows: [
          ["入口", "いりぐち iriguchi", "ทางเข้า", "入 = เข้า (เหมือนคนก้าวเข้าไป)"],
          ["出口", "でぐち deguchi", "ทางออก", "出 = ออก (เหมือนต้นไม้งอกออกมา)"],
          ["男", "おとこ otoko", "ผู้ชาย", "田 (นา) + 力 (แรง) = คนทำนา"],
          ["女", "おんな onna", "ผู้หญิง", "เหมือนผู้หญิงนั่งไขว่ห้าง"],
          ["禁煙", "きんえん kin'en", "ห้ามสูบบุหรี่", "เจอบ่อยในร้านอาหาร"],
        ],
        japaneseCols: [0],
      },
      {
        kind: "tip",
        tone: "culture",
        title: "ออนเซ็นและห้องน้ำ",
        text: "ที่ออนเซ็นจะมีผ้าม่านเขียน 男 (ชาย มักสีน้ำเงิน) และ 女 (หญิง มักสีแดง) — ต้องดูให้ดีก่อนเข้า! บางที่สลับฝั่งกันระหว่างวัน",
      },
    ]),
    section("practice", "ฝึกอ่านป้าย", [{ kind: "text", text: "ลองนึกภาพว่ากำลังเดินอยู่ในสถานีรถไฟที่โทจิงิ" }]),
    section("review", "สรุปบทเรียน", [
      {
        kind: "checklist",
        items: [
          "トイレ ห้องน้ำ · エレベーター ลิฟต์ · コンビニ ร้านสะดวกซื้อ",
          "入口 ทางเข้า · 出口 ทางออก",
          "男 ชาย · 女 หญิง · 禁煙 ห้ามสูบบุหรี่",
        ],
      },
    ]),
  ],
  exercises: [
    {
      id: exId(29, 1),
      type: "multiple-choice",
      question: "อยากออกจากสถานี ต้องเดินตามป้ายไหน?",
      options: ["出口", "入口", "男", "女"],
      optionsAreJapanese: true,
      correctAnswer: "出口",
      explanation: "出口 (deguchi) = ทางออก ส่วน 入口 (iriguchi) = ทางเข้า",
      difficulty: 1,
      reviewKey: "vocab:deguchi",
    },
    {
      id: exId(29, 2),
      type: "multiple-choice",
      question: "คุณเป็นผู้หญิง ควรเข้าออนเซ็นที่ม่านเขียนว่าอะไร?",
      options: ["女", "男", "出口", "禁煙"],
      optionsAreJapanese: true,
      correctAnswer: "女",
      explanation: "女 (onna) = ผู้หญิง · 男 (otoko) = ผู้ชาย",
      difficulty: 1,
      reviewKey: "vocab:onna",
    },
    {
      id: exId(29, 3),
      type: "match",
      question: "จับคู่ป้ายกับความหมาย",
      pairs: [
        { left: "トイレ", right: "ห้องน้ำ" },
        { left: "入口", right: "ทางเข้า" },
        { left: "男", right: "ผู้ชาย" },
        { left: "コンビニ", right: "ร้านสะดวกซื้อ" },
      ],
      leftIsJapanese: true,
      explanation: "トイレ ห้องน้ำ · 入口 ทางเข้า · 男 ผู้ชาย · コンビニ ร้านสะดวกซื้อ",
      difficulty: 1,
    },
    {
      id: exId(29, 4),
      type: "read-meaning",
      question: "ป้ายนี้แปลว่าอะไร?",
      japanese: "エレベーター",
      options: ["ลิฟต์", "บันไดเลื่อน", "ทางออก", "ห้องน้ำ"],
      correctAnswer: "ลิฟต์",
      explanation: "エレベーター (erebeetaa) = ลิฟต์ (elevator)",
      difficulty: 2,
      reviewKey: "vocab:erebeetaa",
    },
    {
      id: exId(29, 5),
      type: "true-false",
      question: "ข้อความนี้ถูกหรือผิด?",
      statement: "ป้าย 禁煙 หมายความว่า สูบบุหรี่ได้",
      correctAnswer: false,
      explanation: "禁煙 (kin'en) = ห้ามสูบบุหรี่ (禁 = ห้าม)",
      difficulty: 2,
      reviewKey: "vocab:kinen",
    },
    {
      id: exId(29, 6),
      type: "conversation",
      question: "เลือกคำถามที่เหมาะสม",
      situation: "อยู่ที่สถานี อยากเข้าห้องน้ำแต่หาไม่เจอ จึงถามพนักงาน",
      lines: [{ speaker: "พนักงาน", japanese: "はい、どうぞ。", romaji: "Hai, douzo.", thai: "ค่ะ เชิญค่ะ (พร้อมฟัง)" }],
      options: ["すみません、トイレは どこですか。", "トイレを ください。", "トイレ、ありがとう。"],
      correctAnswer: "すみません、トイレは どこですか。",
      explanation: "___ は どこですか = ___ อยู่ที่ไหนคะ? ประโยคนี้ใช้ถามหาสถานที่ได้ทุกที่",
      difficulty: 2,
      reviewKey: "vocab:toire",
    },
  ],
  summary: ["อ่านป้ายสำคัญ: トイレ 入口 出口 男 女 禁煙", "ถามหา: ___ は どこですか"],
  reviewItems: ["vocab:toire", "vocab:iriguchi", "vocab:deguchi", "vocab:otoko", "vocab:onna", "vocab:erebeetaa"],
};

/* --------------------- Day 30 — Menu reading challenge -------------------- */

const day30: Lesson = {
  id: "day-30",
  dayNumber: 30,
  title: "ภารกิจ: อ่านเมนูคาเฟ่",
  subtitle: "อ่านเมนู ราคา และสั่งเครื่องดื่มเอง",
  phase: 2,
  topic: "Reading practice",
  estimatedMinutes: 20,
  objectives: ["อ่านเมนูคาตากานะจริงได้", "เข้าใจสัญลักษณ์ 円 (เยน)", "สั่งเครื่องดื่มและขนมด้วยตัวเอง"],
  vocabulary: ["en", "menyuu", "koohii", "keeki", "hotto", "aisu"],
  grammar: [],
  sections: [
    section("learn", "เมนูคาเฟ่ที่นิกโก้", [
      {
        kind: "text",
        text: "นี่คือตัวอย่างเมนูคาเฟ่ ราคาในญี่ปุ่นมักเขียนเป็นตัวเลขอารบิก ตามด้วย 円 (えん en = เยน)",
      },
      {
        kind: "table",
        headers: ["メニュー", "อ่านว่า", "ราคา"],
        rows: [
          ["ホットコーヒー", "hotto koohii", "450円"],
          ["アイスコーヒー", "aisu koohii", "500円"],
          ["オレンジジュース", "orenji juusu", "400円"],
          ["チーズケーキ", "chiizu keeki", "550円"],
          ["トースト", "toosuto", "350円"],
        ],
        japaneseCols: [0, 2],
      },
    ]),
    section("understand", "ประโยคสั่งของ", [
      {
        kind: "read-aloud",
        items: [
          { japanese: "すみません、メニューを ください。", romaji: "Sumimasen, menyuu o kudasai.", meaning: "ขอเมนูหน่อยค่ะ" },
          { japanese: "チーズケーキを ください。", romaji: "Chiizu keeki o kudasai.", meaning: "ขอชีสเค้กค่ะ" },
          { japanese: "ホットコーヒーを ください。", romaji: "Hotto koohii o kudasai.", meaning: "ขอกาแฟร้อนค่ะ" },
        ],
      },
      {
        kind: "dialogue",
        title: "ที่เคาน์เตอร์",
        lines: [
          { speaker: "พนักงาน", japanese: "いらっしゃいませ。", romaji: "Irasshaimase.", thai: "ยินดีต้อนรับค่ะ" },
          { speaker: "คุณ", japanese: "アイスコーヒーを ください。", romaji: "Aisu koohii o kudasai.", thai: "ขอกาแฟเย็นค่ะ" },
          { speaker: "พนักงาน", japanese: "500円です。", romaji: "Gohyaku en desu.", thai: "500 เยนค่ะ" },
          { speaker: "คุณ", japanese: "はい。", romaji: "Hai.", thai: "ค่ะ (ยื่นเงิน)" },
        ],
      },
      {
        kind: "tip",
        tone: "culture",
        title: "ถาดใส่เงิน",
        text: "ที่ร้านในญี่ปุ่นมักวางเงินบน “ถาดเล็ก ๆ” หน้าแคชเชียร์ ไม่ยื่นเงินใส่มือโดยตรง",
      },
    ]),
    section("practice", "ภารกิจอ่านเมนู", [{ kind: "text", text: "ดูเมนูด้านบน แล้วตอบคำถาม" }]),
    section("review", "สรุปเดือนธันวาคม", [
      {
        kind: "checklist",
        items: [
          "อ่านคาตากานะครบ + ตัวขุ่น + ตัวเล็ก",
          "อ่านเมนูและราคา (円 = เยน) ได้",
          "สั่งของด้วย ___ を ください",
          "🎉 ยินดีด้วย! ครบ 30 วันแรกแล้ว",
        ],
      },
    ]),
  ],
  exercises: [
    {
      id: exId(30, 1),
      type: "multiple-choice",
      question: "จากเมนู アイスコーヒー ราคาเท่าไร?",
      options: ["500 เยน", "450 เยน", "400 เยน", "550 เยน"],
      correctAnswer: "500 เยน",
      explanation: "アイスコーヒー (กาแฟเย็น) = 500円",
      difficulty: 1,
    },
    {
      id: exId(30, 2),
      type: "read-meaning",
      question: "เมนูนี้คืออะไร?",
      japanese: "チーズケーキ",
      options: ["ชีสเค้ก", "ขนมปังปิ้ง", "น้ำส้ม", "กาแฟร้อน"],
      correctAnswer: "ชีสเค้ก",
      explanation: "チーズ (chiizu ชีส) + ケーキ (keeki เค้ก) = ชีสเค้ก",
      difficulty: 2,
    },
    {
      id: exId(30, 3),
      type: "multiple-choice",
      question: "สัญลักษณ์ 円 หมายถึงอะไร?",
      prompt: "円",
      promptIsJapanese: true,
      options: ["เยน (สกุลเงิน)", "ร้าน", "ชิ้น", "แก้ว"],
      correctAnswer: "เยน (สกุลเงิน)",
      explanation: "円 อ่านว่า えん (en) = เยน",
      difficulty: 1,
      reviewKey: "vocab:en",
    },
    {
      id: exId(30, 4),
      type: "order",
      question: "เรียงคำเพื่อสั่งขนมปังปิ้ง",
      translation: "ขอขนมปังปิ้งค่ะ",
      correctOrder: ["トースト", "を", "ください"],
      extraTiles: ["です"],
      explanation: "トースト (ขนมปังปิ้ง) + を + ください",
      difficulty: 2,
    },
    {
      id: exId(30, 5),
      type: "conversation",
      question: "พนักงานบอกราคา คุณควรเข้าใจว่าอะไร?",
      situation: "สั่งกาแฟร้อนแล้วพนักงานพูดว่า",
      lines: [{ speaker: "พนักงาน", japanese: "450円です。", romaji: "Yonhyaku gojuu en desu.", thai: "?" }],
      options: ["ราคา 450 เยน", "รอ 450 วินาที", "โต๊ะหมายเลข 450"],
      correctAnswer: "ราคา 450 เยน",
      explanation: "___円です = ราคา ___ เยน",
      difficulty: 2,
    },
    {
      id: exId(30, 6),
      type: "listen",
      question: "ฟังแล้วเลือกเมนูที่ลูกค้าสั่ง",
      audioText: "オレンジジュースを ください",
      options: ["オレンジジュース", "ホットコーヒー", "トースト", "チーズケーキ"],
      optionsAreJapanese: true,
      correctAnswer: "オレンジジュース",
      explanation: "ได้ยิน “orenji juusu o kudasai” = ขอน้ำส้มค่ะ",
      difficulty: 2,
    },
  ],
  summary: ["อ่านเมนูคาเฟ่ได้", "円 = เยน", "สั่งเองได้: ___ を ください"],
  reviewItems: ["vocab:en", "vocab:menyuu"],
};

export const PHASE2_LESSONS: Lesson[] = [
  day15,
  day16,
  day17,
  day18,
  day19,
  day20,
  day21,
  day22,
  day23,
  day24,
  day25,
  day26,
  day27,
  day28,
  day29,
  day30,
];
