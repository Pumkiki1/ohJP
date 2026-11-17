import type { SimChoice, SimStep, TravelScenario } from "@/lib/types";

/**
 * Travel conversation simulations. Prices shown in dialogues are examples for
 * practice only — always check real prices on site.
 * Learner name in dialogues: ミナ (Mina) — replace with your own name when practising.
 */

const ok = (japanese: string, romaji: string, thai: string, feedback: string): SimChoice => ({ japanese, romaji, thai, correct: true, feedback });
const no = (japanese: string, romaji: string, thai: string, feedback: string): SimChoice => ({ japanese, romaji, thai, correct: false, feedback });
const npc = (speaker: string, japanese: string, romaji: string, thai: string, reading?: string): SimStep["npc"] => ({ speaker, japanese, romaji, thai, reading });

export const TRAVEL_SCENARIOS: TravelScenario[] = [
  {
    id: "airport",
    icon: "✈️",
    title: "มาถึงสนามบิน",
    place: "สนามบินนาริตะ / ฮาเนดะ",
    situation: "เพิ่งลงเครื่อง อยากหาสถานีรถไฟเพื่อเดินทางต่อ จึงเดินไปที่เคาน์เตอร์ประชาสัมพันธ์",
    usefulPhrases: [
      { japanese: "えきは どこですか。", romaji: "Eki wa doko desu ka.", thaiPronunciation: "เอะคิ วะ โดะโคะ เดส คะ", thai: "สถานีรถไฟอยู่ที่ไหนคะ?" },
      { japanese: "もういちど おねがいします。", romaji: "Mou ichido onegaishimasu.", thaiPronunciation: "โม อิจิโดะ โอะเนไงชิมัส", thai: "ช่วยพูดอีกครั้งได้ไหมคะ" },
      { japanese: "えいごは だいじょうぶですか。", romaji: "Eigo wa daijoubu desu ka.", thaiPronunciation: "เอโงะ วะ ไดโจบุ เดส คะ", thai: "พูดภาษาอังกฤษได้ไหมคะ?" },
    ],
    steps: [
      { npc: npc("พนักงาน", "こんにちは。どう されましたか。", "Konnichiwa. Dou saremashita ka.", "สวัสดีค่ะ มีอะไรให้ช่วยไหมคะ?") },
      {
        prompt: "ถามว่าสถานีรถไฟอยู่ที่ไหน",
        choices: [
          ok("すみません、えきは どこですか。", "Sumimasen, eki wa doko desu ka.", "ขอโทษค่ะ สถานีรถไฟอยู่ที่ไหนคะ?", "ถูกต้อง! ___は どこですか ใช้ถามหาสถานที่ได้ทุกที่"),
          no("えきを ください。", "Eki o kudasai.", "ขอสถานีค่ะ", "ください ใช้ขอ “สิ่งของ” ถ้าถามหาสถานที่ให้ใช้ ___は どこですか"),
          no("さようなら。", "Sayounara.", "ลาก่อน", "さようなら ใช้ตอนจากกัน ยังไม่ได้ถามอะไรเลยนะ"),
        ],
      },
      { npc: npc("พนักงาน", "えきは ちかです。あちらの エレベーターで どうぞ。", "Eki wa chika desu. Achira no erebeetaa de douzo.", "สถานีอยู่ชั้นใต้ดินค่ะ เชิญใช้ลิฟต์ทางโน้นค่ะ", "えきは ちかです。あちらの エレベーターで どうぞ。") },
      {
        prompt: "ขอบคุณพนักงาน",
        choices: [
          ok("ありがとうございます。", "Arigatou gozaimasu.", "ขอบคุณค่ะ", "เยี่ยม! ใช้แบบสุภาพกับพนักงาน"),
          no("いいえ。", "Iie.", "ไม่ใช่", "いいえ แปลว่า “ไม่ใช่” ตอนนี้ควรขอบคุณ"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-airport-1",
        type: "multiple-choice",
        question: "พนักงานพูดว่า えきは ちかです — สถานีอยู่ที่ไหน?",
        options: ["ชั้นใต้ดิน", "ชั้นบนสุด", "นอกสนามบิน", "ใกล้ห้องน้ำ"],
        correctAnswer: "ชั้นใต้ดิน",
        explanation: "ちか (地下) = ใต้ดิน",
        difficulty: 2,
      },
      {
        id: "tr-airport-2",
        type: "multiple-choice",
        question: "ไม่ได้ยินที่พนักงานพูด ควรพูดว่าอะไร?",
        options: ["もういちど おねがいします。", "ごちそうさまでした。", "はじめまして。", "おやすみなさい。"],
        optionsAreJapanese: true,
        correctAnswer: "もういちど おねがいします。",
        explanation: "もういちど おねがいします = ช่วยพูดอีกครั้งค่ะ",
        difficulty: 1,
      },
    ],
  },
  {
    id: "directions",
    icon: "🧭",
    title: "ถามทาง",
    place: "ถนนในเมืองนิกโก้",
    situation: "กำลังเดินหาศาลเจ้านิกโก้โทโชงู (東照宮) จึงถามทางคุณป้าที่เดินผ่านมา",
    usefulPhrases: [
      { japanese: "とうしょうぐうは どこですか。", reading: "東照宮は どこですか。", romaji: "Toushouguu wa doko desu ka.", thaiPronunciation: "โทโชงู วะ โดะโคะ เดส คะ", thai: "ศาลเจ้าโทโชงูอยู่ที่ไหนคะ?" },
      { japanese: "あるいて なんぷんですか。", romaji: "Aruite nanpun desu ka.", thaiPronunciation: "อะรุอิเตะ นัมปุง เดส คะ", thai: "เดินไปกี่นาทีคะ?" },
      { japanese: "ちずで おしえて ください。", romaji: "Chizu de oshiete kudasai.", thaiPronunciation: "จิซุ เดะ โอะชิเอะเตะ คุดะไซ", thai: "ช่วยชี้ในแผนที่ให้หน่อยค่ะ" },
    ],
    steps: [
      {
        prompt: "เรียกและถามทางไปโทโชงู",
        choices: [
          ok("すみません、とうしょうぐうは どこですか。", "Sumimasen, Toushouguu wa doko desu ka.", "ขอโทษค่ะ โทโชงูอยู่ที่ไหนคะ?", "ถูกต้อง! เริ่มด้วย すみません เพื่อเรียกอย่างสุภาพ"),
          no("とうしょうぐうです。", "Toushouguu desu.", "โทโชงูค่ะ", "ประโยคนี้แค่บอกชื่อสถานที่ ยังไม่ได้ถาม ต้องเติม ___は どこですか"),
        ],
      },
      { npc: npc("คุณป้า", "この みちを まっすぐ いって、はしを わたって ください。", "Kono michi o massugu itte, hashi o watatte kudasai.", "เดินตรงไปตามถนนนี้ แล้วข้ามสะพานไปค่ะ") },
      {
        prompt: "ถามว่าเดินไปกี่นาที",
        choices: [
          ok("あるいて なんぷんですか。", "Aruite nanpun desu ka.", "เดินไปกี่นาทีคะ?", "ใช่เลย! なんぷん = กี่นาที"),
          no("なんじですか。", "Nanji desu ka.", "กี่โมงคะ?", "なんじ = กี่โมง (เวลา) ถ้าถามระยะเวลาเดินใช้ なんぷん"),
        ],
      },
      { npc: npc("คุณป้า", "じゅっぷん ぐらいですよ。", "Juppun gurai desu yo.", "ประมาณ 10 นาทีค่ะ") },
      {
        prompt: "ขอบคุณ",
        choices: [
          ok("ありがとうございます!", "Arigatou gozaimasu!", "ขอบคุณมากค่ะ!", "สมบูรณ์แบบ!"),
          no("すみません、わかりません。", "Sumimasen, wakarimasen.", "ขอโทษค่ะ ไม่เข้าใจ", "คุณป้าตอบชัดเจนแล้ว ตอนนี้ควรขอบคุณ"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-dir-1",
        type: "multiple-choice",
        question: "まっすぐ いって ください แปลว่าอะไร?",
        options: ["กรุณาเดินตรงไป", "กรุณาเลี้ยวขวา", "กรุณารอสักครู่", "กรุณาข้ามสะพาน"],
        correctAnswer: "กรุณาเดินตรงไป",
        explanation: "まっすぐ = ตรงไป · いって ください = กรุณาไป",
        difficulty: 1,
      },
      {
        id: "tr-dir-2",
        type: "multiple-choice",
        question: "じゅっぷん ぐらい หมายถึง?",
        options: ["ประมาณ 10 นาที", "10 โมง", "10 เยน", "10 คน"],
        correctAnswer: "ประมาณ 10 นาที",
        explanation: "じゅっぷん = 10 นาที · ぐらい = ประมาณ",
        difficulty: 2,
      },
    ],
  },
  {
    id: "train-ticket",
    icon: "🎫",
    title: "ซื้อตั๋วรถไฟ",
    place: "สถานีอาซากุสะ (รถไฟโทบุ)",
    situation: "จะนั่งรถไฟด่วนโทบุจากอาซากุสะไปนิกโก้ ซื้อตั๋วที่เคาน์เตอร์",
    usefulPhrases: [
      { japanese: "にっこうまで おとな ひとり おねがいします。", reading: "日光まで 大人 一人 お願いします。", romaji: "Nikkou made otona hitori onegaishimasu.", thaiPronunciation: "นิกโก มะเดะ โอะโตะนะ ฮิโตะริ โอะเนไงชิมัส", thai: "ผู้ใหญ่ 1 คน ไปนิกโก้ค่ะ" },
      { japanese: "とっきゅうで おねがいします。", romaji: "Tokkyuu de onegaishimasu.", thaiPronunciation: "ท็อกคิว เดะ โอะเนไงชิมัส", thai: "ขอแบบรถด่วนพิเศษค่ะ" },
      { japanese: "なんじに でますか。", romaji: "Nanji ni demasu ka.", thaiPronunciation: "นันจิ นิ เดะมัส คะ", thai: "ออกกี่โมงคะ?" },
    ],
    steps: [
      { npc: npc("พนักงาน", "いらっしゃいませ。", "Irasshaimase.", "ยินดีต้อนรับค่ะ") },
      {
        prompt: "ขอตั๋วผู้ใหญ่ 1 ใบไปนิกโก้",
        choices: [
          ok("にっこうまで おとな ひとり おねがいします。", "Nikkou made otona hitori onegaishimasu.", "ผู้ใหญ่ 1 คน ไปนิกโก้ค่ะ", "ถูกต้อง! まで = ถึง · おとな = ผู้ใหญ่"),
          no("にっこうは どこですか。", "Nikkou wa doko desu ka.", "นิกโก้อยู่ที่ไหนคะ?", "ประโยคนี้ถามตำแหน่ง ถ้าจะซื้อตั๋วให้บอกปลายทาง + จำนวนคน"),
        ],
      },
      { npc: npc("พนักงาน", "とっきゅうですか。", "Tokkyuu desu ka.", "รถด่วนพิเศษไหมคะ?", "特急ですか。") },
      {
        prompt: "ตอบว่าใช่ ขอรถด่วนพิเศษ",
        choices: [
          ok("はい、おねがいします。", "Hai, onegaishimasu.", "ค่ะ รบกวนด้วยค่ะ", "เยี่ยม! はい + おねがいします ใช้ตอบรับได้สุภาพ"),
          no("いいえ、ありがとう。", "Iie, arigatou.", "ไม่ค่ะ ขอบคุณ", "แบบนี้จะเป็นการปฏิเสธรถด่วน"),
        ],
      },
      { npc: npc("พนักงาน", "じゅうじの とっきゅうです。さんばんせんから でます。", "Juuji no tokkyuu desu. Sanbansen kara demasu.", "รถด่วน 10 โมงค่ะ ออกจากชานชาลา 3 ค่ะ") },
      {
        prompt: "ทวนข้อมูลเพื่อยืนยัน",
        choices: [
          ok("さんばんせんですね。ありがとうございます。", "Sanbansen desu ne. Arigatou gozaimasu.", "ชานชาลา 3 นะคะ ขอบคุณค่ะ", "ดีมาก! การทวนด้วย ~ですね ช่วยยืนยันว่าเข้าใจถูก"),
          no("じゅうばんせんですね。", "Juubansen desu ne.", "ชานชาลา 10 นะคะ", "พนักงานบอก じゅうじ (10 โมง) และ さんばんせん (ชานชาลา 3)"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-ticket-1",
        type: "multiple-choice",
        question: "おとな ひとり หมายถึงอะไร?",
        options: ["ผู้ใหญ่ 1 คน", "เด็ก 1 คน", "ผู้ใหญ่ 2 คน", "ที่นั่ง 1 ที่"],
        correctAnswer: "ผู้ใหญ่ 1 คน",
        explanation: "おとな = ผู้ใหญ่ · ひとり = 1 คน (こども = เด็ก)",
        difficulty: 1,
      },
      {
        id: "tr-ticket-2",
        type: "multiple-choice",
        question: "さんばんせんから でます — รถไฟออกจากที่ไหน?",
        options: ["ชานชาลา 3", "ชานชาลา 10", "ทางออก 3", "ตู้ที่ 3"],
        correctAnswer: "ชานชาลา 3",
        explanation: "さん (3) + ばんせん (ชานชาลา)",
        difficulty: 2,
      },
    ],
  },
  {
    id: "platform",
    icon: "🚉",
    title: "ถามชานชาลา",
    place: "สถานีอุตสึโนมิยะ",
    situation: "จะต่อรถไฟสายนิกโก้ (JR) แต่ไม่แน่ใจว่าชานชาลาไหน",
    usefulPhrases: [
      { japanese: "にっこうゆきは なんばんせんですか。", reading: "日光行きは 何番線ですか。", romaji: "Nikkou yuki wa nanbansen desu ka.", thaiPronunciation: "นิกโก ยุคิ วะ นัมบังเซ็ง เดส คะ", thai: "ขบวนไปนิกโก้อยู่ชานชาลาไหนคะ?" },
      { japanese: "この でんしゃは にっこうに いきますか。", romaji: "Kono densha wa Nikkou ni ikimasu ka.", thaiPronunciation: "โคะโนะ เด็นฉะ วะ นิกโก นิ อิคิมัส คะ", thai: "รถไฟขบวนนี้ไปนิกโก้ไหมคะ?" },
    ],
    steps: [
      {
        prompt: "ถามพนักงานสถานีว่าขบวนไปนิกโก้อยู่ชานชาลาไหน",
        choices: [
          ok("すみません、にっこうゆきは なんばんせんですか。", "Sumimasen, Nikkou yuki wa nanbansen desu ka.", "ขอโทษค่ะ ขบวนไปนิกโก้ชานชาลาไหนคะ?", "ถูกต้อง! ~ゆき = ขบวนที่มุ่งหน้าไป · なんばんせん = ชานชาลาไหน"),
          no("にっこうを ください。", "Nikkou o kudasai.", "ขอนิกโก้ค่ะ", "ください ใช้ขอของ ไม่ใช่ถามข้อมูล"),
        ],
      },
      { npc: npc("พนักงาน", "ごばんせんです。", "Gobansen desu.", "ชานชาลา 5 ค่ะ", "5番線です。") },
      {
        prompt: "ถึงชานชาลาแล้ว ถามผู้โดยสารข้าง ๆ ให้แน่ใจ",
        choices: [
          ok("この でんしゃは にっこうに いきますか。", "Kono densha wa Nikkou ni ikimasu ka.", "รถไฟขบวนนี้ไปนิกโก้ไหมคะ?", "ดีมาก! ถามยืนยันก่อนขึ้นรถเสมอ"),
          no("この でんしゃは いくらですか。", "Kono densha wa ikura desu ka.", "รถไฟขบวนนี้ราคาเท่าไร?", "ตอนนี้อยากรู้ว่ารถไปนิกโก้ไหม ไม่ใช่ราคา"),
        ],
      },
      { npc: npc("ผู้โดยสาร", "はい、いきますよ。", "Hai, ikimasu yo.", "ค่ะ ไปค่ะ") },
      {
        prompt: "ขอบคุณ",
        choices: [
          ok("ありがとうございます。", "Arigatou gozaimasu.", "ขอบคุณค่ะ", "เยี่ยม!"),
          no("ごめんなさい。", "Gomennasai.", "ขอโทษ (ที่ทำผิด)", "ไม่ได้ทำผิดอะไร ควรขอบคุณ"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-plat-1",
        type: "multiple-choice",
        question: "なんばんせん แปลว่าอะไร?",
        options: ["ชานชาลาไหน", "กี่โมง", "กี่บาท", "กี่คน"],
        correctAnswer: "ชานชาลาไหน",
        explanation: "なん (อะไร/เท่าไร) + ばんせん (ชานชาลา)",
        difficulty: 1,
      },
      {
        id: "tr-plat-2",
        type: "multiple-choice",
        question: "ป้าย 日光行き (にっこうゆき) หมายถึง?",
        options: ["ขบวนที่ไปนิกโก้", "ทางออกนิกโก้", "ขบวนที่มาจากนิกโก้", "ร้านค้านิกโก้"],
        correctAnswer: "ขบวนที่ไปนิกโก้",
        explanation: "~行き (ゆき) = มุ่งหน้าไป ~",
        difficulty: 2,
      },
    ],
  },
  {
    id: "bus",
    icon: "🚌",
    title: "นั่งรถบัส",
    place: "ป้ายรถบัสหน้าสถานีโทบุนิกโก้",
    situation: "จะนั่งรถบัสไปน้ำตกเคงงอน (華厳の滝) ถามคนขับก่อนขึ้น",
    usefulPhrases: [
      { japanese: "この バスは けごんのたきに いきますか。", reading: "このバスは 華厳の滝に 行きますか。", romaji: "Kono basu wa Kegon no taki ni ikimasu ka.", thaiPronunciation: "โคะโนะ บะสุ วะ เคงงน โนะ ทะคิ นิ อิคิมัส คะ", thai: "รถบัสคันนี้ไปน้ำตกเคงงอนไหมคะ?" },
      { japanese: "ついたら おしえて ください。", romaji: "Tsuitara oshiete kudasai.", thaiPronunciation: "ทสึอิตะระ โอะชิเอะเตะ คุดะไซ", thai: "ถึงแล้วช่วยบอกด้วยนะคะ" },
      { japanese: "ICカードは つかえますか。", romaji: "Ai shii kaado wa tsukaemasu ka.", thaiPronunciation: "ไอชี คาโดะ วะ ทสึคะเอะมัส คะ", thai: "ใช้บัตร IC ได้ไหมคะ?" },
    ],
    steps: [
      {
        prompt: "ถามคนขับว่ารถไปน้ำตกเคงงอนไหม",
        choices: [
          ok("すみません、この バスは けごんのたきに いきますか。", "Sumimasen, kono basu wa Kegon no taki ni ikimasu ka.", "ขอโทษค่ะ รถคันนี้ไปน้ำตกเคงงอนไหมคะ?", "ถูกต้อง! [สถานที่] に いきますか = ไป [สถานที่] ไหม"),
          no("けごんのたきは いくらですか。", "Kegon no taki wa ikura desu ka.", "น้ำตกเคงงอนราคาเท่าไร?", "ยังไม่รู้เลยว่ารถไปไหม ถามเส้นทางก่อน"),
        ],
      },
      { npc: npc("คนขับ", "はい、いきます。せいりけんを とって ください。", "Hai, ikimasu. Seiriken o totte kudasai.", "ไปครับ กรุณาหยิบบัตรเลขป้ายด้วยครับ", "はい、行きます。整理券を 取って ください。") },
      {
        prompt: "ขอให้คนขับบอกเมื่อถึง",
        choices: [
          ok("ついたら おしえて ください。", "Tsuitara oshiete kudasai.", "ถึงแล้วช่วยบอกด้วยนะคะ", "ดีมาก! ประโยคนี้ช่วยได้เยอะเวลานั่งรถบัสในที่ไม่คุ้นเคย"),
          no("おりません。", "Orimasen.", "ไม่ลงค่ะ", "おりません = ไม่ลงรถ ซึ่งไม่ใช่สิ่งที่อยากพูด"),
        ],
      },
      { npc: npc("คนขับ", "はい、わかりました。", "Hai, wakarimashita.", "ได้ครับ เข้าใจแล้วครับ") },
    ],
    practice: [
      {
        id: "tr-bus-1",
        type: "multiple-choice",
        question: "整理券 (せいりけん) คืออะไร?",
        options: ["บัตรเลขป้าย หยิบตอนขึ้นรถ", "ตั๋วเครื่องบิน", "ใบเสร็จ", "บัตรเข้าชม"],
        correctAnswer: "บัตรเลขป้าย หยิบตอนขึ้นรถ",
        explanation: "整理券 บอกว่าขึ้นจากป้ายไหน ใช้คำนวณค่าโดยสารตอนลง (ถ้าใช้บัตร IC อาจไม่ต้องหยิบ)",
        difficulty: 2,
      },
      {
        id: "tr-bus-2",
        type: "multiple-choice",
        question: "อยากลงป้ายหน้า ควรพูดว่า?",
        options: ["つぎで おります。", "つぎで のります。", "つぎは いくらですか。", "つぎに いきません。"],
        optionsAreJapanese: true,
        correctAnswer: "つぎで おります。",
        explanation: "おります = ลงจากรถ · のります = ขึ้นรถ (ปกติกดกริ่งก็ได้)",
        difficulty: 2,
      },
    ],
  },
  {
    id: "hotel",
    icon: "🏨",
    title: "เช็กอินโรงแรม",
    place: "เรียวกังริมทะเลสาบชูเซนจิ",
    situation: "มาถึงเรียวกังตอนบ่าย 3 โมง ต้องการเช็กอิน",
    usefulPhrases: [
      { japanese: "チェックインを おねがいします。", romaji: "Chekkuin o onegaishimasu.", thaiPronunciation: "เช็คคุอิน โอะ โอะเนไงชิมัส", thai: "ขอเช็กอินค่ะ" },
      { japanese: "よやくして います。", reading: "予約して います。", romaji: "Yoyaku shite imasu.", thaiPronunciation: "โยะยะคุ ชิเตะ อิมัส", thai: "จองไว้แล้วค่ะ" },
      { japanese: "ちょうしょくは なんじからですか。", reading: "朝食は 何時からですか。", romaji: "Choushoku wa nanji kara desu ka.", thaiPronunciation: "โชโชะคุ วะ นันจิ คะระ เดส คะ", thai: "อาหารเช้าเริ่มกี่โมงคะ?" },
    ],
    steps: [
      { npc: npc("พนักงาน", "いらっしゃいませ。", "Irasshaimase.", "ยินดีต้อนรับค่ะ") },
      {
        prompt: "บอกว่าต้องการเช็กอินและจองไว้แล้ว",
        choices: [
          ok("チェックインを おねがいします。よやくして います。", "Chekkuin o onegaishimasu. Yoyaku shite imasu.", "ขอเช็กอินค่ะ จองไว้แล้วค่ะ", "สมบูรณ์แบบ!"),
          no("チェックアウトを おねがいします。", "Chekkuauto o onegaishimasu.", "ขอเช็กเอาต์ค่ะ", "เพิ่งมาถึง ต้องเป็น チェックイン"),
        ],
      },
      { npc: npc("พนักงาน", "おなまえを おねがいします。", "Onamae o onegaishimasu.", "ขอชื่อด้วยค่ะ", "お名前を お願いします。") },
      {
        prompt: "บอกชื่อของคุณ",
        choices: [
          ok("ミナです。", "Mina desu.", "มินาค่ะ", "ถูกต้อง! ชื่อ + です (ฝึกเปลี่ยนเป็นชื่อตัวเองด้วยนะ)"),
          no("おなまえです。", "Onamae desu.", "ชื่อค่ะ", "おなまえ แปลว่า “ชื่อ” ต้องบอกชื่อจริงของตัวเอง + です"),
        ],
      },
      { npc: npc("พนักงาน", "パスポートを おねがいします。", "Pasupooto o onegaishimasu.", "ขอพาสปอร์ตด้วยค่ะ") },
      {
        prompt: "ยื่นพาสปอร์ตให้",
        choices: [
          ok("はい、どうぞ。", "Hai, douzo.", "ค่ะ นี่ค่ะ", "เยี่ยม! どうぞ ใช้ตอนยื่นของให้"),
          no("いただきます。", "Itadakimasu.", "(พูดก่อนกิน)", "いただきます ใช้ก่อนกินอาหาร"),
        ],
      },
      { npc: npc("พนักงาน", "ちょうしょくは しちじからです。", "Choushoku wa shichiji kara desu.", "อาหารเช้าเริ่ม 7 โมงค่ะ", "朝食は 7時からです。") },
      {
        prompt: "ตอบรับว่าเข้าใจ",
        choices: [
          ok("わかりました。ありがとうございます。", "Wakarimashita. Arigatou gozaimasu.", "เข้าใจแล้วค่ะ ขอบคุณค่ะ", "สมบูรณ์แบบ!"),
          no("わかりません。", "Wakarimasen.", "ไม่เข้าใจค่ะ", "ถ้าไม่เข้าใจจริงก็พูดได้ แต่ข้อมูลนี้คือ “อาหารเช้า 7 โมง”"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-hotel-1",
        type: "multiple-choice",
        question: "ちょうしょくは しちじからです หมายถึง?",
        options: ["อาหารเช้าเริ่ม 7 โมง", "อาหารเย็นเริ่ม 7 โมง", "เช็กเอาต์ 7 โมง", "ออนเซ็นปิด 7 โมง"],
        correctAnswer: "อาหารเช้าเริ่ม 7 โมง",
        explanation: "ちょうしょく = อาหารเช้า · しちじ = 7 โมง · から = ตั้งแต่",
        difficulty: 2,
      },
      {
        id: "tr-hotel-2",
        type: "multiple-choice",
        question: "อยากฝากกระเป๋าหลังเช็กเอาต์ ควรพูดว่า?",
        options: ["にもつを あずけても いいですか。", "にもつを ください。", "にもつは どこですか。", "にもつを たべます。"],
        optionsAreJapanese: true,
        correctAnswer: "にもつを あずけても いいですか。",
        explanation: "にもつ = กระเป๋า · あずけても いいですか = ฝากได้ไหม",
        difficulty: 3,
      },
    ],
  },
  {
    id: "restaurant",
    icon: "🍜",
    title: "สั่งอาหารที่ร้าน",
    place: "ร้านโซบะในนิกโก้",
    situation: "มากับเพื่อน 2 คน เข้าร้านโซบะท้องถิ่น",
    usefulPhrases: [
      { japanese: "ふたりです。", reading: "二人です。", romaji: "Futari desu.", thaiPronunciation: "ฟุตะริ เดส", thai: "มา 2 คนค่ะ" },
      { japanese: "ざるそばを ふたつ ください。", romaji: "Zarusoba o futatsu kudasai.", thaiPronunciation: "ซะรุโซะบะ โอะ ฟุตะทสึ คุดะไซ", thai: "ขอซารุโซบะ 2 ที่ค่ะ" },
      { japanese: "おみず ください。", reading: "お水 ください。", romaji: "Omizu kudasai.", thaiPronunciation: "โอะมิซุ คุดะไซ", thai: "ขอน้ำเปล่าค่ะ" },
    ],
    steps: [
      { npc: npc("พนักงาน", "いらっしゃいませ。なんめいさまですか。", "Irasshaimase. Nanmeisama desu ka.", "ยินดีต้อนรับค่ะ กี่ท่านคะ?", "いらっしゃいませ。何名様ですか。") },
      {
        prompt: "บอกว่ามา 2 คน",
        choices: [
          ok("ふたりです。", "Futari desu.", "2 คนค่ะ", "ถูกต้อง! ふたり = 2 คน (นับคนพิเศษ)"),
          no("ふたつです。", "Futatsu desu.", "2 ชิ้นค่ะ", "ふたつ ใช้นับสิ่งของ นับคนใช้ ふたり"),
          no("にです。", "Ni desu.", "สองค่ะ", "พอเข้าใจได้ แต่นับคนควรใช้ ふたり"),
        ],
      },
      { npc: npc("พนักงาน", "こちらへ どうぞ。", "Kochira e douzo.", "เชิญทางนี้ค่ะ") },
      {
        prompt: "เรียกพนักงานแล้วสั่งซารุโซบะ 2 ที่",
        choices: [
          ok("すみません、ざるそばを ふたつ ください。", "Sumimasen, zarusoba o futatsu kudasai.", "ขอโทษค่ะ ขอซารุโซบะ 2 ที่ค่ะ", "เยี่ยม! อาหาร + を + จำนวน + ください"),
          no("ざるそばは どこですか。", "Zarusoba wa doko desu ka.", "ซารุโซบะอยู่ที่ไหนคะ?", "ถามตำแหน่ง ไม่ใช่การสั่ง ใช้ を ください"),
        ],
      },
      { npc: npc("พนักงาน", "かしこまりました。", "Kashikomarimashita.", "รับทราบค่ะ (แบบสุภาพมาก)") },
    ],
    practice: [
      {
        id: "tr-rest-1",
        type: "multiple-choice",
        question: "なんめいさまですか — พนักงานถามอะไร?",
        options: ["มากี่ท่าน", "จะสั่งอะไร", "จ่ายด้วยอะไร", "ชื่ออะไร"],
        correctAnswer: "มากี่ท่าน",
        explanation: "なんめいさま = กี่ท่าน (สุภาพมาก)",
        difficulty: 1,
      },
      {
        id: "tr-rest-2",
        type: "multiple-choice",
        question: "かしこまりました แปลว่าอะไร?",
        options: ["รับทราบค่ะ", "ขอโทษค่ะ", "ยินดีต้อนรับ", "ไม่มีค่ะ"],
        correctAnswer: "รับทราบค่ะ",
        explanation: "かしこまりました = รับทราบ (พนักงานใช้กับลูกค้า)",
        difficulty: 2,
      },
    ],
  },
  {
    id: "menu",
    icon: "📖",
    title: "ขอเมนูและเมนูแนะนำ",
    place: "ร้านอาหารยูบะในนิกโก้",
    situation: "นั่งที่โต๊ะแล้วแต่ยังไม่มีเมนู อยากลองเมนูขึ้นชื่อของร้าน",
    usefulPhrases: [
      { japanese: "メニューを ください。", romaji: "Menyuu o kudasai.", thaiPronunciation: "เมะนิว โอะ คุดะไซ", thai: "ขอเมนูค่ะ" },
      { japanese: "えいごの メニューは ありますか。", romaji: "Eigo no menyuu wa arimasu ka.", thaiPronunciation: "เอโงะ โนะ เมะนิว วะ อะริมัส คะ", thai: "มีเมนูภาษาอังกฤษไหมคะ?" },
      { japanese: "おすすめは なんですか。", romaji: "Osusume wa nan desu ka.", thaiPronunciation: "โอะสุสุเมะ วะ นัน เดส คะ", thai: "เมนูแนะนำคืออะไรคะ?" },
    ],
    steps: [
      {
        prompt: "เรียกพนักงานขอเมนู",
        choices: [
          ok("すみません、メニューを ください。", "Sumimasen, menyuu o kudasai.", "ขอโทษค่ะ ขอเมนูค่ะ", "ถูกต้อง!"),
          no("メニューです。", "Menyuu desu.", "เมนูค่ะ", "ต้องใช้ を ください เพื่อขอ"),
        ],
      },
      { npc: npc("พนักงาน", "はい、どうぞ。", "Hai, douzo.", "ค่ะ เชิญค่ะ") },
      {
        prompt: "ถามว่ามีเมนูภาษาอังกฤษไหม",
        choices: [
          ok("えいごの メニューは ありますか。", "Eigo no menyuu wa arimasu ka.", "มีเมนูภาษาอังกฤษไหมคะ?", "ดีมาก! ~は ありますか = มี ~ ไหม"),
          no("えいごを ください。", "Eigo o kudasai.", "ขอภาษาอังกฤษค่ะ", "ฟังแปลก ๆ ให้ถามว่า “มีเมนูภาษาอังกฤษไหม”"),
        ],
      },
      { npc: npc("พนักงาน", "すみません、にほんごだけです。", "Sumimasen, nihongo dake desu.", "ขอโทษค่ะ มีแต่ภาษาญี่ปุ่นค่ะ") },
      {
        prompt: "ไม่เป็นไร ถามเมนูแนะนำแทน",
        choices: [
          ok("だいじょうぶです。おすすめは なんですか。", "Daijoubu desu. Osusume wa nan desu ka.", "ไม่เป็นไรค่ะ เมนูแนะนำคืออะไรคะ?", "ยอดเยี่ยม! ถามเมนูแนะนำเป็นวิธีที่ดีมากเวลาอ่านเมนูไม่ออก"),
          no("さようなら。", "Sayounara.", "ลาก่อน", "ยังไม่ต้องยอมแพ้! ลองถามเมนูแนะนำ"),
        ],
      },
      { npc: npc("พนักงาน", "ゆばそばが おすすめです。", "Yuba soba ga osusume desu.", "แนะนำโซบะยูบะค่ะ") },
      {
        prompt: "สั่งเมนูที่แนะนำ",
        choices: [
          ok("じゃあ、それを ください。", "Jaa, sore o kudasai.", "งั้นขออันนั้นค่ะ", "เยี่ยม! それ = อันนั้น (สิ่งที่อีกฝ่ายพูดถึง)"),
          no("それは どこですか。", "Sore wa doko desu ka.", "อันนั้นอยู่ที่ไหน?", "อยากสั่ง ต้องใช้ を ください"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-menu-1",
        type: "multiple-choice",
        question: "にほんごだけです หมายถึง?",
        options: ["มีแต่ภาษาญี่ปุ่น", "ภาษาญี่ปุ่นยาก", "พูดญี่ปุ่นเก่ง", "ไม่มีภาษาญี่ปุ่น"],
        correctAnswer: "มีแต่ภาษาญี่ปุ่น",
        explanation: "だけ = เท่านั้น",
        difficulty: 2,
      },
      {
        id: "tr-menu-2",
        type: "multiple-choice",
        question: "おすすめ แปลว่า?",
        options: ["เมนูแนะนำ", "เช็กบิล", "เมนูเด็ก", "ของหวาน"],
        correctAnswer: "เมนูแนะนำ",
        explanation: "おすすめ = สิ่งที่แนะนำ",
        difficulty: 1,
      },
    ],
  },
  {
    id: "prices",
    icon: "💴",
    title: "เช็กบิลและจ่ายเงิน",
    place: "ร้านอาหารท้องถิ่น",
    situation: "กินเสร็จแล้ว อยากจ่ายเงิน และอยากรู้ว่าจ่ายบัตรได้ไหม (ราคาเป็นตัวอย่าง)",
    usefulPhrases: [
      { japanese: "おかいけい おねがいします。", reading: "お会計 お願いします。", romaji: "Okaikei onegaishimasu.", thaiPronunciation: "โอะไคเค โอะเนไงชิมัส", thai: "เช็กบิลด้วยค่ะ" },
      { japanese: "カードで はらえますか。", romaji: "Kaado de haraemasu ka.", thaiPronunciation: "คาโดะ เดะ ฮะระเอะมัส คะ", thai: "จ่ายด้วยบัตรได้ไหมคะ?" },
      { japanese: "ごちそうさまでした。", romaji: "Gochisousama deshita.", thaiPronunciation: "โกะจิโซซามะ เดชิตะ", thai: "ขอบคุณสำหรับอาหารค่ะ" },
    ],
    steps: [
      {
        prompt: "ขอเช็กบิล",
        choices: [
          ok("すみません、おかいけい おねがいします。", "Sumimasen, okaikei onegaishimasu.", "ขอโทษค่ะ เช็กบิลด้วยค่ะ", "ถูกต้อง! (บางร้านให้ถือบิลไปจ่ายที่แคชเชียร์หน้าร้าน)"),
          no("いくらですか。", "Ikura desu ka.", "ราคาเท่าไร?", "ใช้ได้ แต่ おかいけい おねがいします เป็นวิธีขอเช็กบิลที่ชัดกว่า"),
        ],
      },
      { npc: npc("พนักงาน", "せんにひゃくえんです。", "Sen nihyaku en desu.", "1,200 เยนค่ะ", "1,200円です。") },
      {
        prompt: "ถามว่าจ่ายบัตรได้ไหม",
        choices: [
          ok("カードで はらえますか。", "Kaado de haraemasu ka.", "จ่ายด้วยบัตรได้ไหมคะ?", "ดีมาก! で = ด้วย (วิธีการ)"),
          no("カードを ください。", "Kaado o kudasai.", "ขอบัตรหน่อยค่ะ", "แบบนี้คือขอบัตรจากพนักงาน ไม่ใช่ถามวิธีจ่าย"),
        ],
      },
      { npc: npc("พนักงาน", "すみません、げんきんだけです。", "Sumimasen, genkin dake desu.", "ขอโทษค่ะ รับแต่เงินสดค่ะ", "すみません、現金だけです。") },
      {
        prompt: "ตอบรับและจ่ายเงินสด แล้วกล่าวขอบคุณตอนออกจากร้าน",
        choices: [
          ok("わかりました。…ごちそうさまでした。", "Wakarimashita. … Gochisousama deshita.", "เข้าใจแล้วค่ะ …ขอบคุณสำหรับอาหารค่ะ", "สมบูรณ์แบบ! ごちそうさまでした ทำให้พนักงานยิ้มได้แน่นอน"),
          no("いただきます。", "Itadakimasu.", "(พูดก่อนกิน)", "いただきます พูดก่อนกิน ตอนออกจากร้านใช้ ごちそうさまでした"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-price-1",
        type: "multiple-choice",
        question: "せんにひゃくえん คือเท่าไร?",
        options: ["1,200 เยน", "2,100 เยน", "1,002 เยน", "12,000 เยน"],
        correctAnswer: "1,200 เยน",
        explanation: "せん (1,000) + にひゃく (200) = 1,200",
        difficulty: 2,
      },
      {
        id: "tr-price-2",
        type: "multiple-choice",
        question: "げんきんだけです หมายถึง?",
        options: ["รับแต่เงินสด", "รับแต่บัตร", "ฟรี", "ราคาถูก"],
        correctAnswer: "รับแต่เงินสด",
        explanation: "げんきん = เงินสด · だけ = เท่านั้น",
        difficulty: 2,
      },
    ],
  },
  {
    id: "shopping",
    icon: "🏪",
    title: "ซื้อของที่ร้านสะดวกซื้อ",
    place: "คอนบินิใกล้โรงแรม",
    situation: "ซื้อข้าวกล่องและน้ำ พนักงานแคชเชียร์จะถามคำถามหลายข้อ",
    usefulPhrases: [
      { japanese: "ふくろは だいじょうぶです。", reading: "袋は 大丈夫です。", romaji: "Fukuro wa daijoubu desu.", thaiPronunciation: "ฟุคุโระ วะ ไดโจบุ เดส", thai: "ไม่รับถุงค่ะ" },
      { japanese: "あたためて ください。", reading: "温めて ください。", romaji: "Atatamete kudasai.", thaiPronunciation: "อะตะตะเมะเตะ คุดะไซ", thai: "ช่วยอุ่นให้หน่อยค่ะ" },
      { japanese: "はい、おねがいします。", romaji: "Hai, onegaishimasu.", thaiPronunciation: "ไฮ โอะเนไงชิมัส", thai: "ค่ะ รบกวนด้วยค่ะ" },
    ],
    steps: [
      { npc: npc("พนักงาน", "おべんとうは あたためますか。", "Obentou wa atatamemasu ka.", "จะอุ่นข้าวกล่องไหมคะ?", "お弁当は 温めますか。") },
      {
        prompt: "ตอบว่าอยากให้อุ่น",
        choices: [
          ok("はい、おねがいします。", "Hai, onegaishimasu.", "ค่ะ รบกวนด้วยค่ะ", "ถูกต้อง! はい、おねがいします ใช้ตอบรับข้อเสนอได้ทุกอย่าง"),
          no("いいえ、ありがとう。", "Iie, arigatou.", "ไม่ค่ะ ขอบคุณ", "แบบนี้คือปฏิเสธ ข้าวกล่องจะเย็นนะ"),
        ],
      },
      { npc: npc("พนักงาน", "ふくろは ごりようですか。", "Fukuro wa goriyou desu ka.", "รับถุงไหมคะ?", "袋は ご利用ですか。") },
      {
        prompt: "ปฏิเสธถุงอย่างสุภาพ (มีกระเป๋าผ้าแล้ว)",
        choices: [
          ok("だいじょうぶです。", "Daijoubu desu.", "ไม่เป็นไรค่ะ (ไม่รับ)", "เยี่ยม! だいじょうぶです เป็นวิธีปฏิเสธที่สุภาพและเป็นธรรมชาติที่สุด"),
          no("はい、だいじょうぶ。", "Hai, daijoubu.", "ค่ะ โอเค", "อาจทำให้สับสนว่ารับหรือไม่รับ ให้พูดแค่ だいじょうぶです พร้อมโบกมือเบา ๆ"),
        ],
      },
      { npc: npc("พนักงาน", "ポイントカードは おもちですか。", "Pointo kaado wa omochi desu ka.", "มีบัตรสะสมแต้มไหมคะ?", "ポイントカードは お持ちですか。") },
      {
        prompt: "ตอบว่าไม่มี",
        choices: [
          ok("いいえ、ありません。", "Iie, arimasen.", "ไม่มีค่ะ", "ถูกต้อง!"),
          no("はい、ください。", "Hai, kudasai.", "ค่ะ ขอด้วย", "พนักงานถามว่า “มีไหม” ไม่ได้เสนอให้"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-shop-1",
        type: "multiple-choice",
        question: "あたためますか — พนักงานถามอะไร?",
        options: ["อุ่นไหม", "ใส่ถุงไหม", "จ่ายบัตรไหม", "เอาตะเกียบไหม"],
        correctAnswer: "อุ่นไหม",
        explanation: "あたためる = อุ่น",
        difficulty: 2,
      },
      {
        id: "tr-shop-2",
        type: "multiple-choice",
        question: "วิธีปฏิเสธที่สุภาพที่สุดคือ?",
        options: ["だいじょうぶです。", "いりません!", "だめです。", "ありがとう。"],
        optionsAreJapanese: true,
        correctAnswer: "だいじょうぶです。",
        explanation: "だいじょうぶです นุ่มนวลกว่า いりません (ไม่ต้องการ)",
        difficulty: 2,
      },
    ],
  },
  {
    id: "attraction",
    icon: "⛩️",
    title: "เที่ยวสถานที่ท่องเที่ยว",
    place: "ศาลเจ้านิกโก้โทโชงู",
    situation: "ที่จุดขายบัตรเข้าชม อยากรู้ค่าเข้าชม เวลาปิด และถ่ายรูปได้ไหม (ราคาเป็นตัวอย่าง)",
    usefulPhrases: [
      { japanese: "にゅうじょうりょうは いくらですか。", reading: "入場料は いくらですか。", romaji: "Nyuujouryou wa ikura desu ka.", thaiPronunciation: "นิวโจเรียว วะ อิคุระ เดส คะ", thai: "ค่าเข้าชมเท่าไรคะ?" },
      { japanese: "なんじまで ですか。", reading: "何時まで ですか。", romaji: "Nanji made desu ka.", thaiPronunciation: "นันจิ มะเดะ เดส คะ", thai: "เปิดถึงกี่โมงคะ?" },
      { japanese: "しゃしんを とっても いいですか。", reading: "写真を 撮っても いいですか。", romaji: "Shashin o tottemo ii desu ka.", thaiPronunciation: "ชะชิน โอะ ท็อตเตะโมะ อี เดส คะ", thai: "ถ่ายรูปได้ไหมคะ?" },
    ],
    steps: [
      {
        prompt: "ถามค่าเข้าชม",
        choices: [
          ok("すみません、にゅうじょうりょうは いくらですか。", "Sumimasen, nyuujouryou wa ikura desu ka.", "ขอโทษค่ะ ค่าเข้าชมเท่าไรคะ?", "ถูกต้อง! にゅうじょうりょう = ค่าเข้าชม"),
          no("にゅうじょうりょうを たべます。", "Nyuujouryou o tabemasu.", "กินค่าเข้าชม", "たべます = กิน ใช้ผิดความหมาย"),
        ],
      },
      { npc: npc("พนักงาน", "おとな せんさんびゃくえんです。", "Otona sen sanbyaku en desu.", "ผู้ใหญ่ 1,300 เยนค่ะ", "大人 1,300円です。") },
      {
        prompt: "ถามว่าเปิดถึงกี่โมง",
        choices: [
          ok("なんじまで ですか。", "Nanji made desu ka.", "เปิดถึงกี่โมงคะ?", "ดีมาก! まで = ถึง"),
          no("なんじから ですか。", "Nanji kara desu ka.", "เปิดตั้งแต่กี่โมงคะ?", "から = ตั้งแต่ ถ้าอยากรู้เวลาปิดใช้ まで"),
        ],
      },
      { npc: npc("พนักงาน", "ごご ごじまでです。", "Gogo goji made desu.", "ถึง 5 โมงเย็นค่ะ", "午後5時までです。") },
      {
        prompt: "ถามว่าถ่ายรูปได้ไหม",
        choices: [
          ok("しゃしんを とっても いいですか。", "Shashin o tottemo ii desu ka.", "ถ่ายรูปได้ไหมคะ?", "เยี่ยม! ~ても いいですか = ~ได้ไหม (ขออนุญาต)"),
          no("しゃしんを ください。", "Shashin o kudasai.", "ขอรูปหน่อยค่ะ", "แบบนี้คือขอรูป ไม่ใช่ขออนุญาตถ่าย"),
        ],
      },
      { npc: npc("พนักงาน", "そとは だいじょうぶですが、なかは だめです。", "Soto wa daijoubu desu ga, naka wa dame desu.", "ข้างนอกได้ค่ะ แต่ข้างในห้ามค่ะ") },
      {
        prompt: "ตอบรับ",
        choices: [
          ok("わかりました。ありがとうございます。", "Wakarimashita. Arigatou gozaimasu.", "เข้าใจแล้วค่ะ ขอบคุณค่ะ", "สมบูรณ์แบบ! เคารพกฎของสถานที่ศักดิ์สิทธิ์"),
          no("だいじょうぶです。", "Daijoubu desu.", "ไม่เป็นไรค่ะ", "ควรตอบว่าเข้าใจแล้ว わかりました"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-attr-1",
        type: "multiple-choice",
        question: "なかは だめです หมายถึง?",
        options: ["ข้างในห้าม", "ข้างในฟรี", "ข้างนอกห้าม", "ปิดแล้ว"],
        correctAnswer: "ข้างในห้าม",
        explanation: "なか = ข้างใน · だめ = ไม่ได้/ห้าม",
        difficulty: 2,
      },
      {
        id: "tr-attr-2",
        type: "multiple-choice",
        question: "なんじまで vs なんじから ต่างกันอย่างไร?",
        options: ["まで = ถึงกี่โมง · から = ตั้งแต่กี่โมง", "เหมือนกัน", "まで = ตั้งแต่ · から = ถึง", "ใช้กับราคา"],
        correctAnswer: "まで = ถึงกี่โมง · から = ตั้งแต่กี่โมง",
        explanation: "まで = ถึง (สิ้นสุด) · から = ตั้งแต่ (เริ่มต้น)",
        difficulty: 2,
      },
    ],
  },
  {
    id: "help",
    icon: "🆘",
    title: "ขอความช่วยเหลือ",
    place: "หน้าสถานีโทจิงิ",
    situation: "ทำกระเป๋าสตางค์หาย ต้องขอความช่วยเหลือจากคนแถวนั้น",
    usefulPhrases: [
      { japanese: "たすけて ください。", reading: "助けて ください。", romaji: "Tasukete kudasai.", thaiPronunciation: "ทะสุเคะเตะ คุดะไซ", thai: "ช่วยด้วยค่ะ" },
      { japanese: "さいふを なくしました。", reading: "財布を なくしました。", romaji: "Saifu o nakushimashita.", thaiPronunciation: "ไซฟุ โอะ นะคุชิมะชิตะ", thai: "ทำกระเป๋าสตางค์หายค่ะ" },
      { japanese: "こうばんは どこですか。", reading: "交番は どこですか。", romaji: "Kouban wa doko desu ka.", thaiPronunciation: "โคบัง วะ โดะโคะ เดส คะ", thai: "ป้อมตำรวจอยู่ที่ไหนคะ?" },
    ],
    steps: [
      {
        prompt: "เรียกคนเพื่อขอความช่วยเหลือ",
        choices: [
          ok("すみません、たすけて ください。", "Sumimasen, tasukete kudasai.", "ขอโทษค่ะ ช่วยหน่อยค่ะ", "ถูกต้อง! สุภาพและชัดเจน"),
          no("こんばんは。", "Konbanwa.", "สวัสดีตอนเย็น", "ทักทายได้ แต่ควรบอกว่าต้องการความช่วยเหลือ"),
        ],
      },
      { npc: npc("คนท้องถิ่น", "どう しましたか。", "Dou shimashita ka.", "เกิดอะไรขึ้นคะ?") },
      {
        prompt: "บอกว่าทำกระเป๋าสตางค์หาย",
        choices: [
          ok("さいふを なくしました。", "Saifu o nakushimashita.", "ทำกระเป๋าสตางค์หายค่ะ", "ดีมาก! [ของ] を なくしました = ทำ [ของ] หาย"),
          no("さいふを ください。", "Saifu o kudasai.", "ขอกระเป๋าสตางค์หน่อย", "แบบนี้คือขอกระเป๋าจากเขา"),
        ],
      },
      { npc: npc("คนท้องถิ่น", "こうばんに いきましょう。あそこです。", "Kouban ni ikimashou. Asoko desu.", "ไปป้อมตำรวจกันค่ะ อยู่ตรงโน้นค่ะ", "交番に 行きましょう。あそこです。") },
      {
        prompt: "ขอบคุณอย่างสุภาพ",
        choices: [
          ok("ほんとうに ありがとうございます。", "Hontou ni arigatou gozaimasu.", "ขอบคุณจริง ๆ ค่ะ", "สมบูรณ์แบบ! ほんとうに = จริง ๆ"),
          no("さようなら。", "Sayounara.", "ลาก่อน", "เขากำลังพาไปป้อมตำรวจ ควรขอบคุณ"),
        ],
      },
    ],
    practice: [
      {
        id: "tr-help-1",
        type: "multiple-choice",
        question: "こうばん (交番) คืออะไร?",
        options: ["ป้อมตำรวจ", "โรงพยาบาล", "สถานีรถไฟ", "ร้านขายยา"],
        correctAnswer: "ป้อมตำรวจ",
        explanation: "こうばん = ป้อมตำรวจเล็ก ๆ ที่มีอยู่ทั่วเมือง ช่วยเรื่องของหายและถามทาง",
        difficulty: 2,
      },
      {
        id: "tr-help-2",
        type: "multiple-choice",
        question: "เบอร์โทรฉุกเฉินเรียกรถพยาบาลในญี่ปุ่นคือ?",
        options: ["119", "110", "191", "911"],
        correctAnswer: "119",
        explanation: "119 = รถพยาบาล/ดับเพลิง · 110 = ตำรวจ",
        difficulty: 1,
      },
    ],
  },
];

export function getScenario(id: string): TravelScenario | undefined {
  return TRAVEL_SCENARIOS.find((s) => s.id === id);
}
