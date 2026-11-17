import type { GrammarPoint } from "@/lib/types";

/**
 * Beginner grammar points (Phase 4). Explanations are intentionally short and
 * compare with Thai. Used by grammar lessons and by the review queue.
 */
export const GRAMMAR: GrammarPoint[] = [
  {
    id: "wa-desu",
    pattern: "A は B です",
    title: "A คือ B",
    explanation: "は (อ่านว่า wa) บอกหัวข้อ · です ทำให้สุภาพ เหมือน “ค่ะ/ครับ” ท้ายประโยค",
    example: { japanese: "わたしは タイじんです。", romaji: "Watashi wa Taijin desu.", thai: "ฉันเป็นคนไทยค่ะ" },
    quiz: {
      question: "เติมคำ: わたし ___ タイじんです。",
      options: ["は", "を", "で", "に"],
      correctAnswer: "は",
      explanation: "A は B です = A คือ B · は อ่านว่า wa",
    },
  },
  {
    id: "ka",
    pattern: "~ですか",
    title: "ประโยคคำถาม",
    explanation: "เติม か ท้ายประโยค = เป็นคำถาม เหมือน “ไหม/หรือ” ในภาษาไทย ไม่ต้องสลับคำ",
    example: { japanese: "これは いくらですか。", romaji: "Kore wa ikura desu ka.", thai: "อันนี้ราคาเท่าไรคะ?" },
    quiz: {
      question: "ข้อใดเป็นประโยคคำถาม?",
      options: ["えきは どこですか。", "えきは あそこです。", "えきです。", "えきに いきます。"],
      correctAnswer: "えきは どこですか。",
      explanation: "ประโยคที่ลงท้ายด้วย か คือคำถาม",
    },
  },
  {
    id: "no",
    pattern: "A の B",
    title: "B ของ A",
    explanation: "の เชื่อมคำนาม เหมือน “ของ” แต่ลำดับกลับกับไทย: わたしの かばん = กระเป๋า “ของฉัน”",
    example: { japanese: "わたしの なまえは ミナです。", romaji: "Watashi no namae wa Mina desu.", thai: "ชื่อของฉันคือมินาค่ะ" },
    quiz: {
      question: "“ตั๋วของฉัน” พูดว่าอย่างไร?",
      options: ["わたしの きっぷ", "きっぷの わたし", "わたしは きっぷ", "わたしを きっぷ"],
      correctAnswer: "わたしの きっぷ",
      explanation: "A の B = B ของ A → わたしの きっぷ",
    },
  },
  {
    id: "o",
    pattern: "~を + กริยา",
    title: "を บอกกรรม",
    explanation: "を (อ่านว่า o) วางหลังสิ่งที่ถูกกระทำ เช่น みずを のみます = ดื่ม “น้ำ”",
    example: { japanese: "コーヒーを のみます。", romaji: "Koohii o nomimasu.", thai: "ดื่มกาแฟค่ะ" },
    quiz: {
      question: "เติมคำ: ラーメン ___ たべます。",
      options: ["を", "は", "に", "の"],
      correctAnswer: "を",
      explanation: "สิ่งที่กิน (กรรม) ตามด้วย を",
    },
  },
  {
    id: "ni-place",
    pattern: "~に いきます",
    title: "に บอกจุดหมาย",
    explanation: "に วางหลังสถานที่ที่จะไป เหมือน “ไปที่ ...”",
    example: { japanese: "にっこうに いきます。", romaji: "Nikkou ni ikimasu.", thai: "ไปนิกโก้ค่ะ" },
    quiz: {
      question: "เติมคำ: えき ___ いきます。",
      options: ["に", "を", "の", "が"],
      correctAnswer: "に",
      explanation: "จุดหมายที่จะไป ใช้ に",
    },
  },
  {
    id: "de",
    pattern: "~で",
    title: "で บอกสถานที่ทำ / วิธีการ",
    explanation: "で = “ที่” (ทำกิจกรรม) หรือ “โดย” (พาหนะ/วิธี) เช่น バスで いきます = ไปโดยรถบัส",
    example: { japanese: "カードで はらえますか。", romaji: "Kaado de haraemasu ka.", thai: "จ่ายด้วยบัตรได้ไหมคะ?" },
    quiz: {
      question: "เติมคำ: バス ___ いきます。(ไปโดยรถบัส)",
      options: ["で", "を", "は", "の"],
      correctAnswer: "で",
      explanation: "พาหนะ/วิธีการ ใช้ で",
    },
  },
  {
    id: "masen",
    pattern: "~ません",
    title: "ปฏิเสธรูปสุภาพ",
    explanation: "เปลี่ยน ~ます เป็น ~ません = ไม่ทำ เช่น たべます (กิน) → たべません (ไม่กิน)",
    example: { japanese: "にくを たべません。", romaji: "Niku o tabemasen.", thai: "ไม่กินเนื้อสัตว์ค่ะ" },
    quiz: {
      question: "“ไม่ดื่ม” พูดว่าอย่างไร?",
      options: ["のみません", "のみます", "のみましょう", "のみたい"],
      correctAnswer: "のみません",
      explanation: "~ます → ~ません เป็นรูปปฏิเสธ",
    },
  },
  {
    id: "arimasu",
    pattern: "~は ありますか",
    title: "มี ... ไหม",
    explanation: "ใช้ถามว่ามีของหรือบริการไหม ตอบ はい、あります (มี) / いいえ、ありません (ไม่มี)",
    example: { japanese: "えいごの メニューは ありますか。", romaji: "Eigo no menyuu wa arimasu ka.", thai: "มีเมนูภาษาอังกฤษไหมคะ?" },
    quiz: {
      question: "ตอบว่า “ไม่มี” อย่างสุภาพ",
      options: ["ありません", "あります", "いりません", "わかりません"],
      correctAnswer: "ありません",
      explanation: "あります = มี · ありません = ไม่มี",
    },
  },
];

const grammarIndex = new Map(GRAMMAR.map((g) => [g.id, g]));
export function getGrammar(id: string): GrammarPoint | undefined {
  return grammarIndex.get(id);
}
