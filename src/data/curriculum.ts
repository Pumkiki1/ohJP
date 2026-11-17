import { addDays, diffDays, monthKey } from "@/lib/date";
import type { Lesson, LessonOutline, Phase, ScheduledLesson } from "@/lib/types";
import { AUTHORED_LESSONS } from "./lessons";

/**
 * Full roadmap: 17 Nov 2026 → day before the Tochigi trip (late Oct 2027).
 * One lesson per calendar day. Lessons without authored content get a clear
 * outline (title, objective, 20-minute plan) instead of invented Japanese.
 */

export const COURSE_START = "2026-11-17";
/** Planned trip: 5 days / 4 nights in Tochigi */
export const TRIP_START = "2027-10-25";
export const TRIP_END = "2027-10-29";
export const COURSE_END = addDays(TRIP_START, -1);
export const TOTAL_DAYS = diffDays(COURSE_START, COURSE_END) + 1;
export const DAILY_MINUTES = 20;

type Topic = [title: string, objective: string];

interface PhaseDef extends Phase {
  outlineTopics: Topic[];
}

export const PHASES: PhaseDef[] = [
  {
    id: 1,
    month: "พฤศจิกายน 2569",
    monthKey: "2026-11",
    title: "พื้นฐานภาษาญี่ปุ่น",
    objective: "เข้าใจระบบตัวอักษรและอ่านฮิรางานะได้ครบ",
    topics: ["ตัวอักษร 3 แบบ", "เสียงสระ", "ฮิรางานะทุกแถว", "ฝึกอ่าน", "คำทักทาย"],
    color: "sakura",
    outlineTopics: [],
  },
  {
    id: 2,
    month: "ธันวาคม 2569",
    monthKey: "2026-12",
    title: "คาตากานะ",
    objective: "อ่านคาตากานะและคำยืมจากภาษาต่างประเทศได้",
    topics: ["คาตากานะพื้นฐาน", "คำยืม", "อาหารและเครื่องดื่ม", "ป้ายต่าง ๆ", "เปรียบเทียบ 2 ระบบ"],
    color: "matcha",
    outlineTopics: [
      ["ชื่อประเทศและเมืองในคาตากานะ", "อ่านชื่อประเทศ เมือง และสถานที่ที่เขียนด้วยคาตากานะได้"],
      ["คำยืมในร้านสะดวกซื้อ", "อ่านชื่อสินค้าคาตากานะในคอนบินิได้"],
      ["คำยืมในโรงแรม", "อ่านคำคาตากานะที่เจอในโรงแรม เช่น フロント ロビー タオル"],
      ["เขียนชื่อตัวเองเป็นคาตากานะ", "เขียนและอ่านชื่อตัวเองเป็นคาตากานะได้"],
      ["ฝึกอ่านคาตากานะเร็วขึ้น", "อ่านคำคาตากานะยาว ๆ ได้คล่องขึ้น"],
      ["ทบทวนฮิรางานะ + คาตากานะ", "อ่านประโยคที่มีทั้งสองระบบปนกันได้"],
    ],
  },
  {
    id: 3,
    month: "มกราคม 2570",
    monthKey: "2027-01",
    title: "คำศัพท์พื้นฐาน",
    objective: "สร้างคลังคำศัพท์ที่ใช้ได้จริงตอนเที่ยว",
    topics: ["แนะนำตัว", "ตัวเลข", "วันและเดือน", "เวลา", "ครอบครัว", "สถานที่", "อาหาร", "คำคุณศัพท์"],
    color: "beige",
    outlineTopics: [
      ["ทบทวนคำทักทาย", "ทักทายได้คล่องตามสถานการณ์"],
      ["แนะนำตัวเอง", "แนะนำชื่อ สัญชาติ และบอกว่ามาเที่ยวได้"],
      ["ตัวเลข 1–10", "นับเลข 1–10 และเข้าใจเมื่อได้ยิน"],
      ["ตัวเลข 11–100", "อ่านและฟังตัวเลขถึง 100 ได้"],
      ["ตัวเลขหลักร้อย-หมื่น และราคา", "อ่านราคาสินค้าเป็นเยนได้"],
      ["วันในสัปดาห์", "บอกวันจันทร์–อาทิตย์ได้"],
      ["เดือนและวันที่", "บอกวันที่และเดือนได้ เช่น じゅうがつ (ตุลาคม)"],
      ["บอกเวลา", "ถามและบอกเวลาเป็นชั่วโมงและนาทีได้"],
      ["ครอบครัว", "พูดถึงสมาชิกในครอบครัวแบบง่าย"],
      ["สถานที่ในเมือง", "รู้จักคำเรียกสถานที่ เช่น えき コンビニ びょういん"],
      ["อาหารและเครื่องดื่ม", "จำชื่ออาหารญี่ปุ่นที่พบบ่อย"],
      ["คำคุณศัพท์พื้นฐาน", "ใช้คำอย่าง おいしい たかい やすい ได้"],
    ],
  },
  {
    id: 4,
    month: "กุมภาพันธ์ 2570",
    monthKey: "2027-02",
    title: "ไวยากรณ์พื้นฐาน",
    objective: "สร้างประโยคง่าย ๆ ได้ด้วยตัวเอง",
    topics: ["โครงสร้างประโยค", "は が を に で の", "です / ます", "ประโยคคำถาม か", "ประโยคปฏิเสธ"],
    color: "sakura",
    outlineTopics: [
      ["โครงสร้างประโยคภาษาญี่ปุ่น", "เข้าใจว่ากริยาอยู่ท้ายประโยค (ประธาน-กรรม-กริยา)"],
      ["A は B です", "บอกว่า A คือ B ได้ เช่น わたしは タイじんです"],
      ["คำถามด้วย か", "เปลี่ยนประโยคบอกเล่าเป็นคำถามได้"],
      ["ปฏิเสธ じゃありません", "บอกว่า “ไม่ใช่” ได้อย่างสุภาพ"],
      ["คำช่วย の (ของ)", "บอกความเป็นเจ้าของได้"],
      ["กริยา ~ます", "ใช้กริยารูปสุภาพ เช่น たべます いきます"],
      ["คำช่วย を (กรรม)", "บอกสิ่งที่กระทำ เช่น みずを のみます"],
      ["คำช่วย に (ไปที่/เวลา)", "บอกจุดหมายและเวลาได้"],
      ["คำช่วย で (ที่/โดย)", "บอกสถานที่ทำกิจกรรมและพาหนะได้"],
      ["คำช่วย が", "ใช้ が กับ すき あります ได้"],
      ["ปฏิเสธ ~ません", "บอกว่าไม่ทำสิ่งใดสิ่งหนึ่ง"],
      ["あります / ありません", "ถามว่ามีของไหม และตอบได้"],
    ],
  },
  {
    id: 5,
    month: "มีนาคม 2570",
    monthKey: "2027-03",
    title: "สถานที่และการถามทาง",
    objective: "ถามทางและเข้าใจคำตอบง่าย ๆ ได้",
    topics: ["ถามว่าอยู่ที่ไหน", "ซ้าย ขวา ตรงไป", "ใกล้ ไกล", "ตำแหน่ง", "สถานที่ในญี่ปุ่น"],
    color: "matcha",
    outlineTopics: [
      ["ここ・そこ・あそこ", "ชี้ตำแหน่งที่นี่ ที่นั่น ที่โน่นได้"],
      ["___は どこですか", "ถามหาสถานที่ได้ทุกที่"],
      ["ซ้าย · ขวา", "เข้าใจ みぎ และ ひだり"],
      ["ตรงไป · เลี้ยว", "เข้าใจคำบอกทาง まっすぐ まがって"],
      ["ใกล้ · ไกล", "ถามว่าไกลไหม เดินกี่นาที"],
      ["คำบอกตำแหน่ง", "ใช้ まえ うしろ となり ちかく ได้"],
      ["ถามทางจริง", "ถามทางคนในพื้นที่อย่างสุภาพ"],
      ["ฟังคำตอบเรื่องทาง", "จับใจความคำตอบที่มีทิศทางได้"],
      ["สถานที่ในญี่ปุ่น", "รู้จักชื่อสถานที่สำคัญ เช่น えき じんじゃ おてら"],
    ],
  },
  {
    id: 6,
    month: "เมษายน 2570",
    monthKey: "2027-04",
    title: "ร้านอาหารญี่ปุ่น",
    objective: "เข้าร้าน สั่งอาหาร และจ่ายเงินได้เอง",
    topics: ["เข้าร้าน", "อ่านเมนู", "สั่งอาหาร", "เมนูแนะนำ", "จ่ายเงิน", "มารยาท"],
    color: "beige",
    outlineTopics: [
      ["เข้าร้านอาหาร", "ตอบคำถาม “กี่ท่าน” และทักทายได้"],
      ["ขอโต๊ะ / ที่นั่ง", "ขอที่นั่งเคาน์เตอร์ โต๊ะ หรือห้องปลอดบุหรี่"],
      ["อ่านเมนูง่าย ๆ", "อ่านคำที่เจอบ่อยบนเมนูญี่ปุ่น"],
      ["สั่งอาหาร", "สั่งอาหารพร้อมจำนวนได้"],
      ["ขอเมนูแนะนำ", "ถาม おすすめは なんですか"],
      ["ถามวัตถุดิบ", "ถามว่ามีเนื้อ/กุ้ง/ของที่แพ้ไหม"],
      ["เช็กบิล", "ขอเช็กบิลอย่างสุภาพ"],
      ["จ่ายเงิน", "ถามว่าจ่ายบัตรได้ไหม และเข้าใจราคา"],
      ["บอกความชอบ", "บอกว่าชอบ/ไม่ชอบ/กินไม่ได้"],
      ["มารยาทบนโต๊ะอาหาร", "รู้มารยาท いただきます ごちそうさま และการใช้ตะเกียบ"],
    ],
  },
  {
    id: 7,
    month: "พฤษภาคม 2570",
    monthKey: "2027-05",
    title: "การเดินทาง",
    objective: "ใช้รถไฟและรถบัสในญี่ปุ่นได้",
    topics: ["สถานีรถไฟ", "ซื้อตั๋ว", "ชานชาลา", "เปลี่ยนสาย", "รถบัส", "ประกาศ"],
    color: "sakura",
    outlineTopics: [
      ["ในสถานีรถไฟ", "รู้จักคำสำคัญในสถานี"],
      ["ซื้อตั๋ว", "ซื้อตั๋วที่เคาน์เตอร์หรือเครื่องได้"],
      ["สายรถไฟ", "อ่านชื่อสายและทิศทาง ~ゆき ได้"],
      ["ชานชาลา", "ถามและเข้าใจหมายเลขชานชาลา ~ばんせん"],
      ["เวลารถออก", "ถามเวลารถไฟขบวนถัดไป"],
      ["เปลี่ยนสาย", "ถามว่าเปลี่ยนสายที่ไหน"],
      ["ป้ายรถบัส", "หาป้ายรถบัสและถามว่าไปไหม"],
      ["ค่าโดยสารรถบัส", "เข้าใจระบบ 整理券 และจ่ายค่ารถ"],
      ["ถามคนขับ", "ขอให้คนขับบอกเมื่อถึงป้าย"],
      ["ประกาศบนรถไฟ", "จับใจความประกาศง่าย ๆ เช่น つぎは"],
    ],
  },
  {
    id: 8,
    month: "มิถุนายน 2570",
    monthKey: "2027-06",
    title: "โรงแรมและการช้อปปิ้ง",
    objective: "เช็กอิน เช็กเอาต์ และซื้อของได้",
    topics: ["จองโรงแรม", "เช็กอิน/เช็กเอาต์", "อาหารเช้า", "ถามราคา", "วิธีจ่ายเงิน", "Tax-free"],
    color: "matcha",
    outlineTopics: [
      ["จองโรงแรม", "เข้าใจคำที่ใช้ตอนจองห้อง"],
      ["เช็กอิน", "เช็กอินด้วยประโยคง่าย ๆ"],
      ["เช็กเอาต์", "เช็กเอาต์และฝากกระเป๋าได้"],
      ["ถามเรื่องอาหารเช้า", "ถามเวลาและสถานที่อาหารเช้า"],
      ["สิ่งอำนวยความสะดวกในห้อง", "ถามเรื่องไวไฟ ผ้าขนหนู ออนเซ็น"],
      ["ถามราคา", "ถามราคาและเข้าใจตัวเลขที่ได้ยิน"],
      ["ประโยคช้อปปิ้ง", "บอกว่าแค่ดู / ขออันนี้ / มีสีอื่นไหม"],
      ["วิธีจ่ายเงิน", "ถามเรื่องบัตร เงินสด IC card"],
      ["Tax-free เบื้องต้น", "ขอ Tax-free และเข้าใจขั้นตอน"],
    ],
  },
  {
    id: 9,
    month: "กรกฎาคม 2570",
    monthKey: "2027-07",
    title: "การฟังและการพูด",
    objective: "ฟังบทสนทนาสั้น ๆ และตอบได้เป็นธรรมชาติ",
    topics: ["ฟังบทสนทนา", "คำถามที่พบบ่อย", "ตอบอย่างเป็นธรรมชาติ", "การออกเสียง", "สำนวนที่ใช้บ่อย"],
    color: "beige",
    outlineTopics: [
      ["ฟังบทสนทนาสั้น", "จับใจความบทสนทนา 2–3 ประโยค"],
      ["คำถามที่พนักงานถามบ่อย", "เข้าใจคำถามอย่าง ふくろは いりますか"],
      ["ตอบอย่างเป็นธรรมชาติ", "ใช้ はい/だいじょうぶです/おねがいします ให้เหมาะสม"],
      ["ฝึกออกเสียงยาว-สั้น", "ออกเสียงสระยาวและ っ ให้ถูก"],
      ["บทสนทนาสั้น", "สนทนาไปมาได้ 3–4 รอบ"],
      ["สำนวนที่ใช้บ่อย", "ใช้ そうですね ちょっと… ได้"],
      ["ฟังตัวเลขและราคา", "ฟังราคาและเวลาได้แม่นขึ้น"],
      ["ฝึกฟังรวม", "ฝึกฟังหลายสถานการณ์ต่อเนื่อง"],
    ],
  },
  {
    id: 10,
    month: "สิงหาคม 2570",
    monthKey: "2027-08",
    title: "จำลองสถานการณ์เที่ยว",
    objective: "สนทนาในสถานการณ์เที่ยวจริงได้ต่อเนื่อง",
    topics: ["ร้านอาหาร", "สถานีรถไฟ", "โรงแรม", "ช้อปปิ้ง", "ถามทาง", "ขอความช่วยเหลือ"],
    color: "sakura",
    outlineTopics: [
      ["จำลอง: ร้านอาหาร", "สนทนาตั้งแต่เข้าร้านจนจ่ายเงิน"],
      ["จำลอง: สถานีรถไฟ", "ซื้อตั๋วและหาชานชาลาได้เอง"],
      ["จำลอง: โรงแรม", "เช็กอินและถามข้อมูลได้"],
      ["จำลอง: ช้อปปิ้ง", "ซื้อของและจ่ายเงินได้"],
      ["จำลอง: ถามทาง", "ถามทางและทำตามคำตอบได้"],
      ["จำลอง: ขอความช่วยเหลือ", "ขอให้คนช่วยเมื่อมีปัญหา"],
      ["เข้าใจคำตอบที่พบบ่อย", "รู้ความหมายคำตอบอย่าง しょうしょう おまちください"],
    ],
  },
  {
    id: 11,
    month: "กันยายน 2570",
    monthKey: "2027-09",
    title: "เตรียมเที่ยวโทจิงิ",
    objective: "ใช้ภาษาญี่ปุ่นกับสถานที่จริงในโทจิงิได้",
    topics: ["นิกโก้", "ทะเลสาบชูเซนจิ", "น้ำตกเคงงอน", "เซนโจกาฮาระ", "คุระโนะมาจิ", "อาชิคางะ", "อาหารท้องถิ่น"],
    color: "matcha",
    outlineTopics: [
      ["ศาลเจ้านิกโก้โทโชงู (日光東照宮)", "ถามค่าเข้าชมและเวลาเปิด-ปิด"],
      ["สะพานชินเคียว (神橋)", "อ่านป้ายและถามทางไปสะพาน"],
      ["ทะเลสาบชูเซนจิ (中禅寺湖)", "ถามเรื่องรถบัสขึ้นเขาและป้ายรถ"],
      ["น้ำตกเคงงอน (華厳の滝)", "ถามวิธีไปและเรื่องลิฟต์ชมวิว"],
      ["ทุ่งเซนโจกาฮาระ (戦場ヶ原)", "ถามเส้นทางเดินและเวลาที่ใช้"],
      ["ฟาร์มวาคายามะ (若山農場)", "ถามเรื่องทางเข้าและการถ่ายรูป"],
      ["คุระโนะมาจิ เมืองโทจิงิ (蔵の街)", "ถามเรื่องสถานที่เดินเล่นและร้านค้า"],
      ["แม่น้ำอุซุมะ (巴波川)", "ถามเรื่องการล่องเรือ"],
      ["ภูเขาโอฮิระ (太平山)", "ถามเรื่องวิวและใบไม้แดง"],
      ["อาชิคางะ (足利)", "ถามเรื่องสถานที่ท่องเที่ยวในอาชิคางะ"],
      ["ถามเรื่องใบไม้แดง (紅葉)", "ถามว่าใบไม้แดงสวยที่ไหน ช่วงไหน"],
      ["สั่งโซบะ", "สั่งโซบะแบบร้อน/เย็นได้"],
      ["สั่งยูบะ (湯波)", "สั่งอาหารยูบะของนิกโก้ได้"],
      ["ไปอิซากายะท้องถิ่น", "สั่งเครื่องดื่มและกับแกล้มได้"],
      ["ขอคำแนะนำจากคนท้องถิ่น", "ถามร้านหรือที่เที่ยวที่แนะนำ"],
    ],
  },
  {
    id: 12,
    month: "ตุลาคม 2570",
    monthKey: "2027-10",
    title: "เตรียมตัวก่อนเดินทาง",
    objective: "ทบทวนทุกอย่างให้พร้อมสำหรับทริปจริง",
    topics: ["คำศัพท์เอาตัวรอด", "ประโยคสำคัญ", "ทบทวนการฟัง", "Roleplay", "ประโยคฉุกเฉิน", "ภารกิจสุดท้าย"],
    color: "sakura",
    outlineTopics: [
      ["คำศัพท์เอาตัวรอด", "ทบทวนคำที่ต้องใช้แน่นอนในทริป"],
      ["ประโยคสำคัญ 20 ประโยค", "พูดประโยคสำคัญได้โดยไม่ต้องดู"],
      ["ทบทวนการฟัง", "ฟังและตอบคำถามที่พบบ่อยได้"],
      ["Roleplay: ร้านอาหาร", "สั่งอาหารที่ร้านท้องถิ่นได้ราบรื่น"],
      ["Roleplay: รถไฟและรถบัส", "เดินทางจากโตเกียวถึงนิกโก้ได้เอง"],
      ["Roleplay: โรงแรม", "เช็กอิน-เช็กเอาต์ได้มั่นใจ"],
      ["ประโยคฉุกเฉิน", "ขอความช่วยเหลือ บอกอาการป่วย ของหาย"],
      ["ภารกิจสุดท้าย: ทริปโทจิงิ", "จำลองทริป 5 วัน 4 คืนแบบครบวงจร"],
    ],
  },
];

const authoredByDay = new Map<number, Lesson>(AUTHORED_LESSONS.map((l) => [l.dayNumber, l]));

function phaseForDate(iso: string): PhaseDef {
  const key = monthKey(iso);
  return PHASES.find((p) => p.monthKey === key) ?? PHASES[PHASES.length - 1];
}

function makeOutline(day: number, phase: PhaseDef, topic: Topic, part: number, totalParts: number, isReview: boolean): LessonOutline {
  if (isReview) {
    return {
      dayNumber: day,
      title: `ทบทวนประจำสัปดาห์ — ${phase.title}`,
      subtitle: "รวมคำที่ยังจำไม่ได้ + แบบทดสอบสั้น",
      phase: phase.id,
      topic: "ทบทวน",
      estimatedMinutes: 20,
      objectives: ["ทบทวนเนื้อหา 6 วันที่ผ่านมา", "เก็บคำที่ยังจำไม่ได้ให้แม่นขึ้น", "วัดผลตัวเองแบบไม่กดดัน"],
      plan: [
        { kind: "learn", minutes: 5, activity: "ดูสรุปสิ่งที่เรียนในสัปดาห์นี้" },
        { kind: "understand", minutes: 5, activity: "อ่านออกเสียงคำและประโยคสำคัญอีกครั้ง" },
        { kind: "practice", minutes: 5, activity: "แบบทดสอบทบทวน 10 ข้อ (สุ่มจากสัปดาห์นี้)" },
        { kind: "review", minutes: 5, activity: "จัดคิวทบทวนคำที่ตอบผิด" },
      ],
      isReviewDay: true,
    };
  }
  const [title, objective] = topic;
  const suffix = totalParts > 1 ? ` (ตอนที่ ${part}/${totalParts})` : "";
  return {
    dayNumber: day,
    title: `${title}${suffix}`,
    subtitle: phase.title,
    phase: phase.id,
    topic: title,
    estimatedMinutes: 20,
    objectives: [objective, "ฝึกออกเสียงพร้อมเสียงอ่าน", "ทำแบบฝึกหัดอย่างน้อย 5 ข้อ"],
    plan: [
      { kind: "learn", minutes: 5, activity: `เรียนรู้: ${title} — คำศัพท์/รูปประโยคใหม่ 3–5 อย่าง อธิบายเป็นภาษาไทย` },
      { kind: "understand", minutes: 5, activity: "ดูตัวอย่างประโยค ตารางเปรียบเทียบ และฝึกอ่านออกเสียง" },
      { kind: "practice", minutes: 5, activity: "แบบฝึกหัด: เลือกคำตอบ จับคู่ ฟังเสียง เรียงประโยค" },
      { kind: "review", minutes: 5, activity: "สรุปบทเรียน และเพิ่มคำใหม่เข้าคิวทบทวน" },
    ],
    isReviewDay: false,
  };
}

function buildSchedule(): ScheduledLesson[] {
  const out: ScheduledLesson[] = [];
  // group remaining (unauthored) days by phase so topics spread evenly over each month
  const daysByPhase = new Map<number, number[]>();
  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const date = addDays(COURSE_START, day - 1);
    const phase = phaseForDate(date);
    if (!authoredByDay.has(day)) {
      const arr = daysByPhase.get(phase.id) ?? [];
      arr.push(day);
      daysByPhase.set(phase.id, arr);
    }
  }

  const outlines = new Map<number, LessonOutline>();
  for (const phase of PHASES) {
    const days = daysByPhase.get(phase.id) ?? [];
    if (!days.length || !phase.outlineTopics.length) continue;
    // every 7th day is a review day
    const lessonDays = days.filter((_, i) => (i + 1) % 7 !== 0);
    const reviewDays = new Set(days.filter((_, i) => (i + 1) % 7 === 0));
    const topics = phase.outlineTopics;
    const base = Math.floor(lessonDays.length / topics.length);
    const extra = lessonDays.length % topics.length;
    let cursor = 0;
    topics.forEach((topic, ti) => {
      const parts = Math.max(1, base + (ti < extra ? 1 : 0));
      for (let p = 1; p <= parts && cursor < lessonDays.length; p++) {
        const d = lessonDays[cursor++];
        outlines.set(d, makeOutline(d, phase, topic, p, parts, false));
      }
    });
    // any leftover days (more topics than days is handled above) → reinforcement
    while (cursor < lessonDays.length) {
      const d = lessonDays[cursor++];
      outlines.set(d, makeOutline(d, phase, topics[topics.length - 1], 1, 1, false));
    }
    reviewDays.forEach((d) => outlines.set(d, makeOutline(d, phase, topics[0], 1, 1, true)));
  }

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const date = addDays(COURSE_START, day - 1);
    const phase = phaseForDate(date);
    const lesson = authoredByDay.get(day);
    if (lesson) {
      out.push({
        dayNumber: day,
        date,
        phase: lesson.phase,
        title: lesson.title,
        subtitle: lesson.subtitle,
        topic: lesson.topic,
        estimatedMinutes: lesson.estimatedMinutes,
        objectives: lesson.objectives,
        authored: true,
        lesson,
      });
    } else {
      const outline = outlines.get(day) ?? makeOutline(day, phase, ["ทบทวน", "ทบทวนเนื้อหาที่ผ่านมา"], 1, 1, true);
      out.push({
        dayNumber: day,
        date,
        phase: phase.id,
        title: outline.title,
        subtitle: outline.subtitle,
        topic: outline.topic,
        estimatedMinutes: outline.estimatedMinutes,
        objectives: outline.objectives,
        authored: false,
        outline,
      });
    }
  }
  return out;
}

export const SCHEDULE: ScheduledLesson[] = buildSchedule();

export function getScheduled(day: number): ScheduledLesson | undefined {
  return SCHEDULE[day - 1];
}

export function getPhase(id: number): PhaseDef {
  return PHASES.find((p) => p.id === id) ?? PHASES[0];
}

export function getLesson(day: number): Lesson | undefined {
  return authoredByDay.get(day);
}

export const AUTHORED_COUNT = AUTHORED_LESSONS.length;
