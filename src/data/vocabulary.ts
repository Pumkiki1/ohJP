import type { Difficulty, Politeness, VocabCategory, Vocabulary } from "@/lib/types";

/**
 * Travel-focused vocabulary bank.
 * - `japanese` is how the word is normally written (kanji/katakana where common).
 * - `hiragana` is the reading when `japanese` contains kanji.
 * - Example sentences use spaces between phrases to help beginners read
 *   (real Japanese is written without spaces).
 */

export const VOCAB_CATEGORIES: { id: VocabCategory; label: string; icon: string }[] = [
  { id: "greetings", label: "คำทักทาย", icon: "👋" },
  { id: "self-intro", label: "แนะนำตัว", icon: "🙋" },
  { id: "numbers", label: "ตัวเลข", icon: "🔢" },
  { id: "time", label: "เวลาและวันที่", icon: "🕒" },
  { id: "food", label: "อาหารและเครื่องดื่ม", icon: "🍜" },
  { id: "restaurant", label: "ร้านอาหาร", icon: "🏮" },
  { id: "transport", label: "การเดินทาง", icon: "🚆" },
  { id: "station", label: "สถานีรถไฟ", icon: "🚉" },
  { id: "bus", label: "รถบัส", icon: "🚌" },
  { id: "hotel", label: "โรงแรม", icon: "🏨" },
  { id: "shopping", label: "ช้อปปิ้ง", icon: "🛍️" },
  { id: "directions", label: "ถามทาง", icon: "🧭" },
  { id: "weather", label: "สภาพอากาศ", icon: "⛅" },
  { id: "nature", label: "ธรรมชาติ", icon: "🍁" },
  { id: "emergency", label: "เหตุฉุกเฉิน", icon: "🆘" },
  { id: "travel", label: "ประโยคเที่ยวทั่วไป", icon: "🧳" },
];

interface Opts {
  hiragana?: string;
  ex?: [japanese: string, romaji: string, thai: string];
  note?: string;
  politeness?: Politeness;
  d?: Difficulty;
}

function v(
  id: string,
  japanese: string,
  romaji: string,
  thaiPronunciation: string,
  meaning: string,
  category: VocabCategory,
  o: Opts = {},
): Vocabulary {
  return {
    id,
    japanese,
    hiragana: o.hiragana,
    romaji,
    thaiPronunciation,
    meaning,
    category,
    difficulty: o.d ?? 1,
    politeness: o.politeness,
    note: o.note,
    example: o.ex ? { japanese: o.ex[0], romaji: o.ex[1], thai: o.ex[2] } : undefined,
  };
}

export const VOCABULARY: Vocabulary[] = [
  /* ----------------------------- Greetings ----------------------------- */
  v("konnichiwa", "こんにちは", "konnichiwa", "คนนิจิวะ", "สวัสดี (ช่วงกลางวัน)", "greetings", {
    note: "ตัวสุดท้าย は ในคำนี้อ่านว่า wa ไม่ใช่ ha",
    ex: ["こんにちは。いい てんきですね。", "Konnichiwa. Ii tenki desu ne.", "สวัสดีค่ะ อากาศดีนะคะ"],
  }),
  v("ohayou", "おはようございます", "ohayou gozaimasu", "โอฮาโย โกะไซมัส", "สวัสดีตอนเช้า", "greetings", {
    politeness: "polite",
    note: "แบบกันเองพูดแค่ おはよう",
    ex: ["おはようございます。", "Ohayou gozaimasu.", "อรุณสวัสดิ์ค่ะ"],
  }),
  v("konbanwa", "こんばんは", "konbanwa", "คมบังวะ", "สวัสดีตอนเย็น / ค่ำ", "greetings", {
    ex: ["こんばんは。ふたりです。", "Konbanwa. Futari desu.", "สวัสดีค่ะ มา 2 คนค่ะ"],
  }),
  v("arigatou", "ありがとう", "arigatou", "อาริงาโต", "ขอบคุณ (แบบกันเอง)", "greetings", {
    politeness: "casual",
    note: "กับพนักงานหรือคนไม่รู้จัก ควรใช้ ありがとうございます",
    ex: ["ありがとう!", "Arigatou!", "ขอบใจนะ!"],
  }),
  v("arigatou-gozaimasu", "ありがとうございます", "arigatou gozaimasu", "อาริงาโต โกะไซมัส", "ขอบคุณค่ะ/ครับ (สุภาพ)", "greetings", {
    politeness: "polite",
    ex: ["どうも ありがとうございます。", "Doumo arigatou gozaimasu.", "ขอบคุณมากค่ะ"],
  }),
  v("sumimasen", "すみません", "sumimasen", "สุมิมะเซ็น", "ขอโทษค่ะ / ขอโทษนะคะ (เรียกคน) / ขอบคุณที่ช่วย", "greetings", {
    politeness: "polite",
    note: "คำที่ใช้บ่อยที่สุดตอนเที่ยว: เรียกพนักงาน ขอทาง ขอความช่วยเหลือ",
    ex: ["すみません、メニューを ください。", "Sumimasen, menyuu o kudasai.", "ขอโทษค่ะ ขอเมนูหน่อยค่ะ"],
  }),
  v("hai", "はい", "hai", "ไฮ", "ใช่ / ค่ะ / ครับ", "greetings", {
    ex: ["はい、そうです。", "Hai, sou desu.", "ใช่ค่ะ ถูกต้องค่ะ"],
  }),
  v("iie", "いいえ", "iie", "อีเอะ", "ไม่ใช่ / ไม่", "greetings", {
    note: "ในชีวิตจริงคนญี่ปุ่นมักปฏิเสธอย่างนุ่มนวล เช่น だいじょうぶです",
    ex: ["いいえ、タイじんです。", "Iie, Taijin desu.", "ไม่ใช่ค่ะ เป็นคนไทยค่ะ"],
  }),
  v("sayounara", "さようなら", "sayounara", "ซาโยนาระ", "ลาก่อน (จากกันนาน)", "greetings", {
    note: "ในชีวิตประจำวันคนญี่ปุ่นไม่ค่อยใช้กับคนที่จะเจอกันอีกเร็ว ๆ นี้",
    ex: ["さようなら。また きます。", "Sayounara. Mata kimasu.", "ลาก่อนค่ะ แล้วจะมาอีกนะคะ"],
  }),
  v("oyasuminasai", "おやすみなさい", "oyasuminasai", "โอยาสุมินะไซ", "ราตรีสวัสดิ์", "greetings", {
    ex: ["おやすみなさい。", "Oyasuminasai.", "ราตรีสวัสดิ์ค่ะ"],
  }),
  v("gomennasai", "ごめんなさい", "gomennasai", "โกะเมนนะไซ", "ขอโทษ (เมื่อทำผิด)", "greetings", {
    note: "กับคนแปลกหน้า すみません ใช้ได้กว้างกว่า",
    ex: ["おそく なって ごめんなさい。", "Osoku natte gomennasai.", "ขอโทษที่มาสายนะคะ"],
    d: 2,
  }),
  v("douzo", "どうぞ", "douzo", "โดโซ", "เชิญค่ะ / นี่ค่ะ (ยื่นให้)", "greetings", {
    ex: ["どうぞ。", "Douzo.", "เชิญค่ะ"],
  }),
  v("itadakimasu", "いただきます", "itadakimasu", "อิตะดะคิมัส", "พูดก่อนเริ่มกินอาหาร", "greetings", {
    note: "มารยาทญี่ปุ่น: พนมมือเบา ๆ แล้วพูดก่อนกิน",
    ex: ["いただきます!", "Itadakimasu!", "(ก่อนกิน) ขอทานนะคะ!"],
  }),
  v("gochisousama", "ごちそうさまでした", "gochisousama deshita", "โกะจิโซซามะ เดชิตะ", "พูดหลังกินเสร็จ (ขอบคุณสำหรับอาหาร)", "greetings", {
    politeness: "polite",
    note: "พูดกับพนักงานตอนออกจากร้านก็ได้ คนญี่ปุ่นจะดีใจมาก",
    ex: ["ごちそうさまでした。おいしかったです。", "Gochisousama deshita. Oishikatta desu.", "ขอบคุณสำหรับอาหารค่ะ อร่อยมากค่ะ"],
  }),
  v("daijoubu", "大丈夫です", "daijoubu desu", "ไดโจบุ เดส", "ไม่เป็นไรค่ะ / โอเคค่ะ / ไม่ต้องค่ะ", "greetings", {
    hiragana: "だいじょうぶです",
    note: "ใช้ปฏิเสธอย่างสุภาพได้ เช่น ไม่รับถุง",
    ex: ["ふくろは だいじょうぶです。", "Fukuro wa daijoubu desu.", "ไม่รับถุงค่ะ (ไม่เป็นไรค่ะ)"],
  }),

  /* ---------------------------- Self-intro ----------------------------- */
  v("hajimemashite", "はじめまして", "hajimemashite", "ฮะจิเมะมะชิเตะ", "ยินดีที่ได้รู้จัก (พบกันครั้งแรก)", "self-intro", {
    ex: ["はじめまして。ミナです。", "Hajimemashite. Mina desu.", "ยินดีที่ได้รู้จักค่ะ ฉันชื่อมินาค่ะ"],
  }),
  v("watashi", "私", "watashi", "วะตะชิ", "ฉัน / ผม", "self-intro", {
    hiragana: "わたし",
    ex: ["わたしは タイじんです。", "Watashi wa Taijin desu.", "ฉันเป็นคนไทยค่ะ"],
  }),
  v("namae", "名前", "namae", "นะมะเอะ", "ชื่อ", "self-intro", {
    hiragana: "なまえ",
    ex: ["おなまえは?", "Onamae wa?", "ชื่ออะไรคะ?"],
  }),
  v("tai", "タイ", "Tai", "ไท", "ประเทศไทย", "self-intro", {
    ex: ["タイから きました。", "Tai kara kimashita.", "มาจากประเทศไทยค่ะ"],
  }),
  v("taijin", "タイ人", "Taijin", "ไทจิน", "คนไทย", "self-intro", {
    hiragana: "タイじん",
    note: "ชื่อประเทศ + 人 (じん) = คนของประเทศนั้น",
    ex: ["わたしは タイじんです。", "Watashi wa Taijin desu.", "ฉันเป็นคนไทยค่ะ"],
  }),
  v("nihon", "日本", "Nihon", "นิฮง", "ประเทศญี่ปุ่น", "self-intro", {
    hiragana: "にほん",
    ex: ["にほんは はじめてです。", "Nihon wa hajimete desu.", "มาญี่ปุ่นครั้งแรกค่ะ"],
  }),
  v("nihongo", "日本語", "nihongo", "นิฮงโงะ", "ภาษาญี่ปุ่น", "self-intro", {
    hiragana: "にほんご",
    ex: ["にほんごは すこし わかります。", "Nihongo wa sukoshi wakarimasu.", "เข้าใจภาษาญี่ปุ่นนิดหน่อยค่ะ"],
  }),
  v("sukoshi", "少し", "sukoshi", "สุโคะชิ", "นิดหน่อย", "self-intro", {
    hiragana: "すこし",
    ex: ["すこし だけ。", "Sukoshi dake.", "แค่นิดเดียวค่ะ"],
  }),
  v("yoroshiku", "よろしくお願いします", "yoroshiku onegaishimasu", "โยโรชิคุ โอะเนไงชิมัส", "ฝากเนื้อฝากตัวด้วย / ขอความกรุณาด้วย", "self-intro", {
    hiragana: "よろしくおねがいします",
    politeness: "polite",
    note: "ใช้ปิดท้ายการแนะนำตัว",
    ex: ["よろしく おねがいします。", "Yoroshiku onegaishimasu.", "ฝากตัวด้วยนะคะ"],
    d: 2,
  }),
  v("ryokou", "旅行", "ryokou", "เรียวโค", "การท่องเที่ยว", "self-intro", {
    hiragana: "りょこう",
    ex: ["りょこうで きました。", "Ryokou de kimashita.", "มาเที่ยวค่ะ"],
    d: 2,
  }),
  v("kara-kimashita", "から来ました", "kara kimashita", "คาระ คิมาชิตะ", "มาจาก...", "self-intro", {
    hiragana: "からきました",
    ex: ["バンコクから きました。", "Bankoku kara kimashita.", "มาจากกรุงเทพฯ ค่ะ"],
    d: 2,
  }),

  /* ------------------------------ Numbers ------------------------------ */
  v("ichi", "一", "ichi", "อิจิ", "1 (หนึ่ง)", "numbers", { hiragana: "いち", ex: ["いちばん", "ichiban", "อันดับหนึ่ง / ที่สุด"] }),
  v("ni", "二", "ni", "นิ", "2 (สอง)", "numbers", { hiragana: "に", ex: ["にばんせん", "nibansen", "ชานชาลาหมายเลข 2"] }),
  v("san", "三", "san", "ซัง", "3 (สาม)", "numbers", { hiragana: "さん", ex: ["さんびゃくえん", "sanbyaku en", "300 เยน"] }),
  v("yon", "四", "yon", "ยน", "4 (สี่)", "numbers", { hiragana: "よん", note: "อ่านว่า し (shi) ได้ด้วย แต่ よん ใช้บ่อยกว่าเพราะ し พ้องเสียงกับ “ความตาย”", ex: ["よんばんせん", "yonbansen", "ชานชาลาหมายเลข 4"] }),
  v("go", "五", "go", "โกะ", "5 (ห้า)", "numbers", { hiragana: "ご", ex: ["ごふん", "go fun", "5 นาที"] }),
  v("roku", "六", "roku", "โระคุ", "6 (หก)", "numbers", { hiragana: "ろく", ex: ["ろくじ", "rokuji", "6 โมง"] }),
  v("nana", "七", "nana", "นะนะ", "7 (เจ็ด)", "numbers", { hiragana: "なな", note: "อ่านว่า しち (shichi) ได้ด้วย", ex: ["ななじ", "nanaji", "7 โมง"] }),
  v("hachi", "八", "hachi", "ฮะจิ", "8 (แปด)", "numbers", { hiragana: "はち", ex: ["はちじ", "hachiji", "8 โมง"] }),
  v("kyuu", "九", "kyuu", "คิว", "9 (เก้า)", "numbers", { hiragana: "きゅう", note: "เวลา 9 โมง อ่านพิเศษว่า くじ (kuji) ไม่ใช่ きゅうじ", ex: ["きゅうばんせん", "kyuubansen", "ชานชาลาหมายเลข 9"] }),
  v("juu", "十", "juu", "จู", "10 (สิบ)", "numbers", { hiragana: "じゅう", ex: ["じゅうえん", "juu en", "10 เยน"] }),
  v("hyaku", "百", "hyaku", "เฮียะคุ", "100 (ร้อย)", "numbers", { hiragana: "ひゃく", ex: ["ひゃくえん", "hyaku en", "100 เยน"], d: 2 }),
  v("sen", "千", "sen", "เซ็น", "1,000 (พัน)", "numbers", { hiragana: "せん", ex: ["せんえん", "sen en", "1,000 เยน"], d: 2 }),
  v("man", "万", "man", "มัง", "10,000 (หมื่น)", "numbers", { hiragana: "まん", note: "ภาษาญี่ปุ่นนับเป็นหลักหมื่น: 1万 = 10,000", ex: ["いちまんえん", "ichiman en", "10,000 เยน"], d: 2 }),
  v("en", "円", "en", "เอ็น", "เยน (สกุลเงิน)", "numbers", { hiragana: "えん", ex: ["ごひゃくえんです。", "Gohyaku en desu.", "500 เยนค่ะ"] }),
  v("hitotsu", "一つ", "hitotsu", "ฮิโตะทสึ", "1 ชิ้น / 1 อัน", "numbers", { hiragana: "ひとつ", ex: ["これを ひとつ ください。", "Kore o hitotsu kudasai.", "ขออันนี้ 1 อันค่ะ"], d: 2 }),
  v("futatsu", "二つ", "futatsu", "ฟุตะทสึ", "2 ชิ้น / 2 อัน", "numbers", { hiragana: "ふたつ", ex: ["ビールを ふたつ ください。", "Biiru o futatsu kudasai.", "ขอเบียร์ 2 แก้วค่ะ"], d: 2 }),
  v("hitori", "一人", "hitori", "ฮิโตะริ", "1 คน", "numbers", { hiragana: "ひとり", ex: ["ひとりです。", "Hitori desu.", "มาคนเดียวค่ะ"] }),
  v("futari", "二人", "futari", "ฟุตะริ", "2 คน", "numbers", { hiragana: "ふたり", ex: ["ふたりです。", "Futari desu.", "มา 2 คนค่ะ"] }),

  /* ------------------------------- Time ------------------------------- */
  v("kyou", "今日", "kyou", "เคียว", "วันนี้", "time", { hiragana: "きょう", ex: ["きょうは さむいですね。", "Kyou wa samui desu ne.", "วันนี้หนาวนะคะ"] }),
  v("ashita", "明日", "ashita", "อะชิตะ", "พรุ่งนี้", "time", { hiragana: "あした", ex: ["あした にっこうに いきます。", "Ashita Nikkou ni ikimasu.", "พรุ่งนี้จะไปนิกโก้ค่ะ"] }),
  v("kinou", "昨日", "kinou", "คิโน", "เมื่อวาน", "time", { hiragana: "きのう", ex: ["きのう つきました。", "Kinou tsukimashita.", "มาถึงเมื่อวานค่ะ"], d: 2 }),
  v("ima", "今", "ima", "อิมะ", "ตอนนี้", "time", { hiragana: "いま", ex: ["いま なんじですか。", "Ima nanji desu ka.", "ตอนนี้กี่โมงคะ?"] }),
  v("nanji", "何時", "nanji", "นันจิ", "กี่โมง", "time", { hiragana: "なんじ", ex: ["なんじに でますか。", "Nanji ni demasu ka.", "ออกกี่โมงคะ?"] }),
  v("fun", "分", "fun / pun", "ฟุง / ปุง", "นาที", "time", { hiragana: "ふん", note: "บางตัวเลขเปลี่ยนเสียงเป็น ぷん เช่น いっぷん (1 นาที) じゅっぷん (10 นาที)", ex: ["ごふん まって ください。", "Go fun matte kudasai.", "กรุณารอ 5 นาทีค่ะ"], d: 2 }),
  v("han", "半", "han", "ฮัง", "ครึ่ง (เช่น ... โมงครึ่ง)", "time", { hiragana: "はん", ex: ["くじはん", "kuji han", "9 โมงครึ่ง"], d: 2 }),
  v("gozen", "午前", "gozen", "โกะเซ็น", "ช่วงเช้า (AM)", "time", { hiragana: "ごぜん", ex: ["ごぜん じゅうじ", "gozen juuji", "10 โมงเช้า"], d: 2 }),
  v("gogo", "午後", "gogo", "โกะโกะ", "ช่วงบ่าย (PM)", "time", { hiragana: "ごご", ex: ["ごご さんじ", "gogo sanji", "บ่าย 3 โมง"], d: 2 }),
  v("asa", "朝", "asa", "อะซะ", "ตอนเช้า", "time", { hiragana: "あさ", ex: ["あさごはん", "asagohan", "อาหารเช้า"] }),
  v("yoru", "夜", "yoru", "โยะรุ", "กลางคืน", "time", { hiragana: "よる", ex: ["よるごはん", "yorugohan", "อาหารเย็น"] }),
  v("getsuyoubi", "月曜日", "getsuyoubi", "เก็ตสึโยบิ", "วันจันทร์", "time", { hiragana: "げつようび", d: 2, ex: ["げつようびは やすみです。", "Getsuyoubi wa yasumi desu.", "วันจันทร์ปิดค่ะ"] }),
  v("kayoubi", "火曜日", "kayoubi", "คะโยบิ", "วันอังคาร", "time", { hiragana: "かようび", d: 2 }),
  v("suiyoubi", "水曜日", "suiyoubi", "ซุยโยบิ", "วันพุธ", "time", { hiragana: "すいようび", d: 2 }),
  v("mokuyoubi", "木曜日", "mokuyoubi", "โมะคุโยบิ", "วันพฤหัสบดี", "time", { hiragana: "もくようび", d: 2 }),
  v("kinyoubi", "金曜日", "kin'youbi", "คินโยบิ", "วันศุกร์", "time", { hiragana: "きんようび", d: 2 }),
  v("doyoubi", "土曜日", "doyoubi", "โดะโยบิ", "วันเสาร์", "time", { hiragana: "どようび", d: 2 }),
  v("nichiyoubi", "日曜日", "nichiyoubi", "นิจิโยบิ", "วันอาทิตย์", "time", { hiragana: "にちようび", d: 2 }),
  v("yasumi", "休み", "yasumi", "ยะสุมิ", "วันหยุด / ปิด (ร้าน)", "time", { hiragana: "やすみ", ex: ["きょうは やすみですか。", "Kyou wa yasumi desu ka.", "วันนี้ปิดไหมคะ?"], d: 2 }),

  /* ------------------------------- Food ------------------------------- */
  v("mizu", "水", "mizu", "มิซุ", "น้ำเปล่า", "food", { hiragana: "みず", ex: ["みずを ください。", "Mizu o kudasai.", "ขอน้ำเปล่าค่ะ"] }),
  v("ocha", "お茶", "ocha", "โอะฉะ", "ชา (ชาเขียว)", "food", { hiragana: "おちゃ", ex: ["おちゃを ください。", "Ocha o kudasai.", "ขอชาค่ะ"] }),
  v("koohii", "コーヒー", "koohii", "โคฮี", "กาแฟ", "food", { ex: ["ホットコーヒーを ください。", "Hotto koohii o kudasai.", "ขอกาแฟร้อนค่ะ"] }),
  v("biiru", "ビール", "biiru", "บีรุ", "เบียร์", "food", { ex: ["なまビールを ください。", "Nama biiru o kudasai.", "ขอเบียร์สดค่ะ"] }),
  v("gohan", "ご飯", "gohan", "โกะฮัง", "ข้าว / มื้ออาหาร", "food", { hiragana: "ごはん", ex: ["ごはんを たべます。", "Gohan o tabemasu.", "กินข้าวค่ะ"] }),
  v("raamen", "ラーメン", "raamen", "ราเมง", "ราเมง", "food", { ex: ["ラーメンを ひとつ ください。", "Raamen o hitotsu kudasai.", "ขอราเมง 1 ชามค่ะ"] }),
  v("soba", "そば", "soba", "โซะบะ", "โซบะ (บะหมี่โซบะ)", "food", { note: "นิกโก้ (日光) มีชื่อเสียงเรื่องโซบะ", ex: ["ざるそばを ください。", "Zarusoba o kudasai.", "ขอซารุโซบะค่ะ"] }),
  v("yuba", "ゆば", "yuba", "ยุบะ", "ยูบะ (ฟองเต้าหู้)", "food", { note: "ของขึ้นชื่อนิกโก้ ที่นิกโก้มักเขียนด้วยคันจิ 湯波 (ที่อื่นเขียน 湯葉)", ex: ["ゆばが たべたいです。", "Yuba ga tabetai desu.", "อยากกินยูบะค่ะ"], d: 2 }),
  v("gyouza", "餃子", "gyouza", "เกียวซะ", "เกี๊ยวซ่า", "food", { hiragana: "ぎょうざ", note: "เมืองอุตสึโนมิยะ (宇都宮) จังหวัดโทจิงิ ขึ้นชื่อเรื่องเกี๊ยวซ่ามาก", ex: ["ぎょうざを ふたつ ください。", "Gyouza o futatsu kudasai.", "ขอเกี๊ยวซ่า 2 ที่ค่ะ"] }),
  v("ichigo", "いちご", "ichigo", "อิจิโกะ", "สตรอว์เบอร์รี", "food", { note: "โทจิงิผลิตสตรอว์เบอร์รีมากที่สุดในญี่ปุ่น (เช่น とちおとめ)", ex: ["いちごが すきです。", "Ichigo ga suki desu.", "ชอบสตรอว์เบอร์รีค่ะ"] }),
  v("sushi", "寿司", "sushi", "ซุชิ", "ซูชิ", "food", { hiragana: "すし", ex: ["すしが すきです。", "Sushi ga suki desu.", "ชอบซูชิค่ะ"] }),
  v("sakana", "魚", "sakana", "ซะกะนะ", "ปลา", "food", { hiragana: "さかな", ex: ["さかなは たべられません。", "Sakana wa taberaremasen.", "กินปลาไม่ได้ค่ะ"], d: 2 }),
  v("niku", "肉", "niku", "นิคุ", "เนื้อสัตว์", "food", { hiragana: "にく", ex: ["にくは はいって いますか。", "Niku wa haitte imasu ka.", "มีเนื้อสัตว์ใส่อยู่ไหมคะ?"], d: 2 }),
  v("yasai", "野菜", "yasai", "ยะไซ", "ผัก", "food", { hiragana: "やさい" }),
  v("tamago", "卵", "tamago", "ทะมะโกะ", "ไข่", "food", { hiragana: "たまご" }),
  v("onigiri", "おにぎり", "onigiri", "โอะนิงิริ", "ข้าวปั้น", "food", { ex: ["おにぎりを ふたつ ください。", "Onigiri o futatsu kudasai.", "ขอข้าวปั้น 2 ก้อนค่ะ"] }),
  v("bentou", "弁当", "bentou", "เบ็นโต", "ข้าวกล่อง", "food", { hiragana: "べんとう", ex: ["おべんとうを あたためますか。", "Obentou o atatamemasu ka.", "(พนักงานถาม) อุ่นข้าวกล่องไหมคะ?"], d: 2 }),
  v("juusu", "ジュース", "juusu", "จูสุ", "น้ำผลไม้", "food", { ex: ["オレンジジュースを ください。", "Orenji juusu o kudasai.", "ขอน้ำส้มค่ะ"] }),
  v("karee", "カレー", "karee", "คะเร", "แกงกะหรี่", "food", { ex: ["カレーライスを ください。", "Karee raisu o kudasai.", "ขอข้าวแกงกะหรี่ค่ะ"] }),
  v("sarada", "サラダ", "sarada", "ซะระดะ", "สลัด", "food", {}),
  v("pan", "パン", "pan", "ปัง", "ขนมปัง", "food", { ex: ["パンを ふたつ ください。", "Pan o futatsu kudasai.", "ขอขนมปัง 2 ชิ้นค่ะ"] }),
  v("keeki", "ケーキ", "keeki", "เคคิ", "เค้ก", "food", {}),
  v("wain", "ワイン", "wain", "วะอิน", "ไวน์", "food", {}),
  v("hotto", "ホット", "hotto", "ฮตโตะ", "ร้อน (เครื่องดื่มร้อน)", "food", { note: "ในเมนูเครื่องดื่ม: ホット = ร้อน · アイス = เย็น/ใส่น้ำแข็ง", ex: ["ホットで おねがいします。", "Hotto de onegaishimasu.", "ขอแบบร้อนค่ะ"] }),
  v("aisu", "アイス", "aisu", "ไอสุ", "เย็น (ใส่น้ำแข็ง) / ไอศกรีม", "food", { ex: ["アイスコーヒーを ください。", "Aisu koohii o kudasai.", "ขอกาแฟเย็นค่ะ"] }),
  v("oishii", "美味しい", "oishii", "โออิชี", "อร่อย", "food", { hiragana: "おいしい", ex: ["とても おいしいです!", "Totemo oishii desu!", "อร่อยมากค่ะ!"] }),

  /* ----------------------------- Restaurant ---------------------------- */
  v("irasshaimase", "いらっしゃいませ", "irasshaimase", "อิรัชไชมะเซะ", "ยินดีต้อนรับ (พนักงานพูด)", "restaurant", { note: "ไม่ต้องตอบกลับคำนี้ ยิ้มหรือพยักหน้าก็พอ", ex: ["いらっしゃいませ!", "Irasshaimase!", "ยินดีต้อนรับค่ะ!"] }),
  v("nanmeisama", "何名様ですか", "nanmeisama desu ka", "นันเมซามะ เดส คะ", "มากี่ท่านคะ (พนักงานถาม)", "restaurant", { hiragana: "なんめいさまですか", d: 2, ex: ["なんめいさまですか。—ふたりです。", "Nanmeisama desu ka. — Futari desu.", "กี่ท่านคะ — 2 คนค่ะ"] }),
  v("menyuu", "メニュー", "menyuu", "เมะนิว", "เมนู", "restaurant", { ex: ["えいごの メニューは ありますか。", "Eigo no menyuu wa arimasu ka.", "มีเมนูภาษาอังกฤษไหมคะ?"] }),
  v("kore", "これ", "kore", "โคะเระ", "อันนี้", "restaurant", { ex: ["これは なんですか。", "Kore wa nan desu ka.", "อันนี้คืออะไรคะ?"] }),
  v("kudasai", "ください", "kudasai", "คุดะไซ", "ขอ... หน่อย (กรุณาให้)", "restaurant", { politeness: "polite", ex: ["これを ください。", "Kore o kudasai.", "ขออันนี้ค่ะ"] }),
  v("onegaishimasu", "お願いします", "onegaishimasu", "โอะเนไงชิมัส", "ขอ... ด้วยค่ะ / รบกวนด้วย", "restaurant", { hiragana: "おねがいします", politeness: "polite", ex: ["おかいけい おねがいします。", "Okaikei onegaishimasu.", "เช็กบิลด้วยค่ะ"] }),
  v("osusume", "おすすめ", "osusume", "โอะสุสุเมะ", "เมนูแนะนำ", "restaurant", { ex: ["おすすめは なんですか。", "Osusume wa nan desu ka.", "เมนูแนะนำคืออะไรคะ?"] }),
  v("okaikei", "お会計", "okaikei", "โอะไคเค", "การชำระเงิน / เช็กบิล", "restaurant", { hiragana: "おかいけい", ex: ["おかいけい おねがいします。", "Okaikei onegaishimasu.", "เช็กบิลด้วยค่ะ"] }),
  v("omizu", "お水", "omizu", "โอะมิซุ", "น้ำเปล่า (แบบสุภาพ)", "restaurant", { hiragana: "おみず", note: "ร้านอาหารญี่ปุ่นส่วนใหญ่ให้น้ำเปล่าฟรี", ex: ["おみず ください。", "Omizu kudasai.", "ขอน้ำเปล่าค่ะ"] }),
  v("karai", "辛い", "karai", "คะไร", "เผ็ด", "restaurant", { hiragana: "からい", ex: ["これは からいですか。", "Kore wa karai desu ka.", "อันนี้เผ็ดไหมคะ?"], d: 2 }),
  v("nuki", "抜き", "nuki", "นุคิ", "ไม่ใส่ ... (เอา ... ออก)", "restaurant", { hiragana: "ぬき", ex: ["わさびぬきで おねがいします。", "Wasabi nuki de onegaishimasu.", "ไม่ใส่วาซาบิค่ะ"], d: 3 }),
  v("hitori-desu", "一人です", "hitori desu", "ฮิโตะริ เดส", "มาคนเดียวค่ะ", "restaurant", { hiragana: "ひとりです" }),
  v("tabemasu", "食べます", "tabemasu", "ทะเบะมัส", "กิน", "restaurant", { hiragana: "たべます", ex: ["ここで たべます。", "Koko de tabemasu.", "ทานที่นี่ค่ะ"], d: 2 }),
  v("nomimasu", "飲みます", "nomimasu", "โนะมิมัส", "ดื่ม", "restaurant", { hiragana: "のみます", ex: ["おちゃを のみます。", "Ocha o nomimasu.", "ดื่มชาค่ะ"], d: 2 }),

  /* ----------------------------- Transport ---------------------------- */
  v("densha", "電車", "densha", "เด็นฉะ", "รถไฟ", "transport", { hiragana: "でんしゃ", ex: ["でんしゃで いきます。", "Densha de ikimasu.", "ไปด้วยรถไฟค่ะ"] }),
  v("eki", "駅", "eki", "เอะคิ", "สถานีรถไฟ", "transport", { hiragana: "えき", ex: ["えきは どこですか。", "Eki wa doko desu ka.", "สถานีรถไฟอยู่ที่ไหนคะ?"] }),
  v("shinkansen", "新幹線", "shinkansen", "ชินคันเซ็น", "รถไฟชินคันเซ็น", "transport", { hiragana: "しんかんせん", note: "จากโตเกียวไปอุตสึโนมิยะ (宇都宮) ใช้ชินคันเซ็นประมาณ 50 นาที", ex: ["しんかんせんで うつのみやに いきます。", "Shinkansen de Utsunomiya ni ikimasu.", "ไปอุตสึโนมิยะด้วยชินคันเซ็นค่ะ"], d: 2 }),
  v("takushii", "タクシー", "takushii", "ทะคุชี", "แท็กซี่", "transport", { ex: ["タクシーを よんで ください。", "Takushii o yonde kudasai.", "ช่วยเรียกแท็กซี่ให้หน่อยค่ะ"] }),
  v("kippu", "切符", "kippu", "คิปปุ", "ตั๋ว", "transport", { hiragana: "きっぷ", ex: ["きっぷは どこで かいますか。", "Kippu wa doko de kaimasu ka.", "ซื้อตั๋วได้ที่ไหนคะ?"] }),
  v("kuukou", "空港", "kuukou", "คูโค", "สนามบิน", "transport", { hiragana: "くうこう", ex: ["くうこうまで おねがいします。", "Kuukou made onegaishimasu.", "ไปสนามบินค่ะ"] }),
  v("norikae", "乗り換え", "norikae", "โนะริคะเอะ", "การเปลี่ยนสาย/ต่อรถ", "transport", { hiragana: "のりかえ", ex: ["どこで のりかえますか。", "Doko de norikaemasu ka.", "ต้องเปลี่ยนสายที่ไหนคะ?"], d: 2 }),
  v("yuki", "行き", "yuki", "ยุคิ", "ขบวนที่มุ่งหน้าไป...", "transport", { hiragana: "ゆき", note: "เช่น にっこうゆき = ขบวนไปนิกโก้", ex: ["にっこうゆきは なんばんせんですか。", "Nikkou yuki wa nanbansen desu ka.", "ขบวนไปนิกโก้อยู่ชานชาลาไหนคะ?"], d: 2 }),
  v("tsugi", "次", "tsugi", "ทสึงิ", "ถัดไป", "transport", { hiragana: "つぎ", ex: ["つぎの でんしゃは なんじですか。", "Tsugi no densha wa nanji desu ka.", "รถไฟขบวนถัดไปกี่โมงคะ?"] }),
  v("ikimasu", "行きます", "ikimasu", "อิคิมัส", "ไป", "transport", { hiragana: "いきます", ex: ["にっこうに いきます。", "Nikkou ni ikimasu.", "ไปนิกโก้ค่ะ"] }),
  v("ic-card", "ICカード", "ai shii kaado", "ไอชี คาโดะ", "บัตร IC (เช่น Suica / PASMO)", "transport", { ex: ["ICカードは つかえますか。", "Ai shii kaado wa tsukaemasu ka.", "ใช้บัตร IC ได้ไหมคะ?"], d: 2 }),

  /* ------------------------------ Station ----------------------------- */
  v("hoomu", "ホーム", "hoomu", "โฮมุ", "ชานชาลา", "station", { ex: ["ホームは どこですか。", "Hoomu wa doko desu ka.", "ชานชาลาอยู่ที่ไหนคะ?"] }),
  v("bansen", "番線", "bansen", "บังเซ็ง", "ชานชาลาหมายเลข...", "station", { hiragana: "ばんせん", ex: ["さんばんせん", "sanbansen", "ชานชาลาหมายเลข 3"], d: 2 }),
  v("kaisatsu", "改札", "kaisatsu", "ไคซัทสึ", "ประตูตรวจตั๋ว", "station", { hiragana: "かいさつ", ex: ["かいさつは どこですか。", "Kaisatsu wa doko desu ka.", "ประตูตรวจตั๋วอยู่ที่ไหนคะ?"], d: 2 }),
  v("deguchi", "出口", "deguchi", "เดะงุจิ", "ทางออก", "station", { hiragana: "でぐち", note: "ป้ายที่พบบ่อยมาก: 出口 = ทางออก", ex: ["にしぐちは どこですか。", "Nishiguchi wa doko desu ka.", "ทางออกฝั่งตะวันตกอยู่ที่ไหนคะ?"] }),
  v("iriguchi", "入口", "iriguchi", "อิริงุจิ", "ทางเข้า", "station", { hiragana: "いりぐち", note: "ป้ายที่พบบ่อยมาก: 入口 = ทางเข้า", ex: ["いりぐちは あちらです。", "Iriguchi wa achira desu.", "ทางเข้าอยู่ทางโน้นค่ะ"] }),
  v("kippu-uriba", "切符売り場", "kippu uriba", "คิปปุ อุริบะ", "จุดขายตั๋ว", "station", { hiragana: "きっぷうりば", ex: ["きっぷうりばは どこですか。", "Kippu uriba wa doko desu ka.", "ที่ขายตั๋วอยู่ไหนคะ?"], d: 2 }),
  v("jikokuhyou", "時刻表", "jikokuhyou", "จิโคะคุเฮียว", "ตารางเวลาเดินรถ", "station", { hiragana: "じこくひょう", d: 3 }),
  v("shuppatsu", "出発", "shuppatsu", "ชุปปะทสึ", "ออกเดินทาง", "station", { hiragana: "しゅっぱつ", d: 3 }),
  v("touchaku", "到着", "touchaku", "โทจะคุ", "มาถึง", "station", { hiragana: "とうちゃく", d: 3 }),
  v("tokkyuu", "特急", "tokkyuu", "ท็อกคิว", "รถไฟด่วนพิเศษ", "station", { hiragana: "とっきゅう", note: "รถไฟโทบุสาย Limited Express (เช่น Spacia) วิ่งจากโตเกียวไปนิกโก้", d: 3 }),
  v("shiteiseki", "指定席", "shiteiseki", "ชิเทเซะคิ", "ที่นั่งแบบจอง", "station", { hiragana: "していせき", d: 3, ex: ["していせきを おねがいします。", "Shiteiseki o onegaishimasu.", "ขอที่นั่งแบบจองค่ะ"] }),
  v("jiyuuseki", "自由席", "jiyuuseki", "จิยูเซะคิ", "ที่นั่งไม่จอง (นั่งได้อิสระ)", "station", { hiragana: "じゆうせき", d: 3 }),

  /* -------------------------------- Bus -------------------------------- */
  v("basu", "バス", "basu", "บะสุ", "รถบัส", "bus", { ex: ["このバスは けごんのたきに いきますか。", "Kono basu wa Kegon no taki ni ikimasu ka.", "รถบัสคันนี้ไปน้ำตกเคงงอนไหมคะ?"] }),
  v("basutei", "バス停", "basutei", "บะสุเท", "ป้ายรถบัส", "bus", { hiragana: "バスてい", ex: ["バスていは どこですか。", "Basutei wa doko desu ka.", "ป้ายรถบัสอยู่ที่ไหนคะ?"] }),
  v("untenshu", "運転手", "untenshu", "อุนเท็นชุ", "คนขับรถ", "bus", { hiragana: "うんてんしゅ", d: 2 }),
  v("unchin", "運賃", "unchin", "อุนจิน", "ค่าโดยสาร", "bus", { hiragana: "うんちん", d: 2, ex: ["うんちんは いくらですか。", "Unchin wa ikura desu ka.", "ค่าโดยสารเท่าไรคะ?"] }),
  v("seiriken", "整理券", "seiriken", "เซริเค็น", "บัตรคิว/บัตรเลขป้าย (หยิบตอนขึ้นรถบัส)", "bus", { hiragana: "せいりけん", note: "รถบัสต่างจังหวัดหลายสาย: ขึ้นประตูหลัง หยิบ 整理券 แล้วจ่ายตามเลขบนจอตอนลง", d: 3 }),
  v("orimasu", "降ります", "orimasu", "โอะริมัส", "ลง (จากรถ)", "bus", { hiragana: "おります", ex: ["つぎで おります。", "Tsugi de orimasu.", "จะลงป้ายหน้าค่ะ"], d: 2 }),
  v("norimasu", "乗ります", "norimasu", "โนะริมัส", "ขึ้น (รถ)", "bus", { hiragana: "のります", ex: ["バスに のります。", "Basu ni norimasu.", "ขึ้นรถบัสค่ะ"], d: 2 }),
  v("ryougaeki", "両替機", "ryougaeki", "เรียวงะเอะคิ", "เครื่องแลกเหรียญ (บนรถบัส)", "bus", { hiragana: "りょうがえき", d: 3 }),

  /* ------------------------------- Hotel ------------------------------- */
  v("hoteru", "ホテル", "hoteru", "โฮะเทะรุ", "โรงแรม", "hotel", { ex: ["ホテルは えきの ちかくです。", "Hoteru wa eki no chikaku desu.", "โรงแรมอยู่ใกล้สถานีค่ะ"] }),
  v("ryokan", "旅館", "ryokan", "เรียวกัง", "เรียวกัง (โรงแรมแบบญี่ปุ่น)", "hotel", { hiragana: "りょかん", note: "ส่วนใหญ่ต้องถอดรองเท้า และมักมีอาหารเย็น-เช้ารวม", d: 2 }),
  v("yoyaku", "予約", "yoyaku", "โยะยะคุ", "การจอง", "hotel", { hiragana: "よやく", ex: ["よやくして います。", "Yoyaku shite imasu.", "จองไว้แล้วค่ะ"] }),
  v("chekkuin", "チェックイン", "chekkuin", "เช็คคุอิน", "เช็กอิน", "hotel", { ex: ["チェックインを おねがいします。", "Chekkuin o onegaishimasu.", "ขอเช็กอินค่ะ"] }),
  v("chekkuauto", "チェックアウト", "chekkuauto", "เช็คคุอะอุโตะ", "เช็กเอาต์", "hotel", { ex: ["チェックアウトは なんじですか。", "Chekkuauto wa nanji desu ka.", "เช็กเอาต์กี่โมงคะ?"] }),
  v("heya", "部屋", "heya", "เฮะยะ", "ห้อง", "hotel", { hiragana: "へや", ex: ["へやは なんがいですか。", "Heya wa nangai desu ka.", "ห้องอยู่ชั้นไหนคะ?"] }),
  v("kagi", "鍵", "kagi", "คะงิ", "กุญแจ", "hotel", { hiragana: "かぎ" }),
  v("choushoku", "朝食", "choushoku", "โชโชะคุ", "อาหารเช้า", "hotel", { hiragana: "ちょうしょく", ex: ["ちょうしょくは なんじからですか。", "Choushoku wa nanji kara desu ka.", "อาหารเช้าเริ่มกี่โมงคะ?"], d: 2 }),
  v("nimotsu", "荷物", "nimotsu", "นิโมะทสึ", "สัมภาระ / กระเป๋า", "hotel", { hiragana: "にもつ", ex: ["にもつを あずけても いいですか。", "Nimotsu o azukete mo ii desu ka.", "ฝากกระเป๋าได้ไหมคะ?"], d: 2 }),
  v("onsen", "温泉", "onsen", "อนเซ็น", "บ่อน้ำพุร้อน", "hotel", { hiragana: "おんせん", note: "มารยาท: อาบน้ำล้างตัวก่อนลงบ่อ และห้ามนำผ้าขนหนูลงในน้ำ", ex: ["おんせんは なんじまでですか。", "Onsen wa nanji made desu ka.", "ออนเซ็นเปิดถึงกี่โมงคะ?"] }),
  v("wifi", "Wi-Fi", "waifai", "ไวไฟ", "ไวไฟ", "hotel", { hiragana: "ワイファイ", ex: ["Wi-Fiの パスワードは なんですか。", "Waifai no pasuwaado wa nan desu ka.", "รหัสไวไฟคืออะไรคะ?"] }),
  v("pasupooto", "パスポート", "pasupooto", "พะสุโปโตะ", "หนังสือเดินทาง", "hotel", { ex: ["パスポートを おねがいします。", "Pasupooto o onegaishimasu.", "(พนักงาน) ขอพาสปอร์ตด้วยค่ะ"] }),

  /* ------------------------------ Shopping ----------------------------- */
  v("ikura", "いくらですか", "ikura desu ka", "อิคุระ เดส คะ", "ราคาเท่าไรคะ?", "shopping", { ex: ["これは いくらですか。", "Kore wa ikura desu ka.", "อันนี้ราคาเท่าไรคะ?"] }),
  v("kaado", "カード", "kaado", "คาโดะ", "บัตร (เครดิต)", "shopping", { ex: ["カードで はらえますか。", "Kaado de haraemasu ka.", "จ่ายด้วยบัตรได้ไหมคะ?"] }),
  v("genkin", "現金", "genkin", "เก็งคิน", "เงินสด", "shopping", { hiragana: "げんきん", note: "ร้านเล็ก ๆ ในชนบทหลายร้านรับแต่เงินสด", ex: ["げんきんだけですか。", "Genkin dake desu ka.", "รับแต่เงินสดเหรอคะ?"], d: 2 }),
  v("menzei", "免税", "menzei", "เม็นเซ", "ปลอดภาษี (Tax-free)", "shopping", { hiragana: "めんぜい", ex: ["めんぜいは できますか。", "Menzei wa dekimasu ka.", "ทำ Tax-free ได้ไหมคะ?"], d: 2 }),
  v("fukuro", "袋", "fukuro", "ฟุคุโระ", "ถุง", "shopping", { hiragana: "ふくろ", note: "ถุงพลาสติกที่ญี่ปุ่นต้องจ่ายเงินเพิ่ม พนักงานจะถามว่าต้องการไหม", ex: ["ふくろは いりますか。", "Fukuro wa irimasu ka.", "(พนักงาน) รับถุงไหมคะ?"] }),
  v("reshiito", "レシート", "reshiito", "เระชีโตะ", "ใบเสร็จ", "shopping", {}),
  v("takai", "高い", "takai", "ทะไค", "แพง / สูง", "shopping", { hiragana: "たかい", ex: ["ちょっと たかいですね。", "Chotto takai desu ne.", "แพงนิดหน่อยนะคะ"] }),
  v("yasui", "安い", "yasui", "ยะซุย", "ถูก (ราคา)", "shopping", { hiragana: "やすい", ex: ["やすいですね!", "Yasui desu ne!", "ถูกจังเลย!"] }),
  v("omiyage", "お土産", "omiyage", "โอะมิยะเกะ", "ของฝาก", "shopping", { hiragana: "おみやげ", ex: ["おみやげを かいたいです。", "Omiyage o kaitai desu.", "อยากซื้อของฝากค่ะ"] }),
  v("konbini", "コンビニ", "konbini", "คมบินิ", "ร้านสะดวกซื้อ", "shopping", { ex: ["コンビニは どこですか。", "Konbini wa doko desu ka.", "ร้านสะดวกซื้ออยู่ที่ไหนคะ?"] }),
  v("kaimasu", "買います", "kaimasu", "คะอิมัส", "ซื้อ", "shopping", { hiragana: "かいます", ex: ["これを かいます。", "Kore o kaimasu.", "ซื้ออันนี้ค่ะ"], d: 2 }),
  v("mite-iru-dake", "見ているだけです", "mite iru dake desu", "มิเตะ อิรุ ดะเกะ เดส", "แค่ดูเฉย ๆ ค่ะ", "shopping", { hiragana: "みているだけです", d: 3, ex: ["みて いる だけです。", "Mite iru dake desu.", "แค่ดูเฉย ๆ ค่ะ"] }),

  /* ----------------------------- Directions ---------------------------- */
  v("doko", "どこ", "doko", "โดะโคะ", "ที่ไหน", "directions", { ex: ["トイレは どこですか。", "Toire wa doko desu ka.", "ห้องน้ำอยู่ที่ไหนคะ?"] }),
  v("migi", "右", "migi", "มิงิ", "ขวา", "directions", { hiragana: "みぎ", ex: ["みぎに まがって ください。", "Migi ni magatte kudasai.", "กรุณาเลี้ยวขวาค่ะ"] }),
  v("hidari", "左", "hidari", "ฮิดะริ", "ซ้าย", "directions", { hiragana: "ひだり", ex: ["ひだりに あります。", "Hidari ni arimasu.", "อยู่ทางซ้ายค่ะ"] }),
  v("massugu", "まっすぐ", "massugu", "มัสสุงุ", "ตรงไป", "directions", { ex: ["まっすぐ いって ください。", "Massugu itte kudasai.", "ตรงไปเลยค่ะ"] }),
  v("chikai", "近い", "chikai", "จิไค", "ใกล้", "directions", { hiragana: "ちかい", ex: ["えきから ちかいですか。", "Eki kara chikai desu ka.", "ใกล้สถานีไหมคะ?"] }),
  v("tooi", "遠い", "tooi", "โทอิ", "ไกล", "directions", { hiragana: "とおい", ex: ["ちょっと とおいです。", "Chotto tooi desu.", "ไกลนิดหน่อยค่ะ"] }),
  v("koko", "ここ", "koko", "โคะโคะ", "ที่นี่", "directions", { ex: ["ここは どこですか。", "Koko wa doko desu ka.", "ที่นี่คือที่ไหนคะ?"] }),
  v("soko", "そこ", "soko", "โซะโคะ", "ตรงนั้น (ใกล้ผู้ฟัง)", "directions", {}),
  v("asoko", "あそこ", "asoko", "อะโซะโคะ", "ตรงโน้น (ไกลทั้งคู่)", "directions", { ex: ["あそこです。", "Asoko desu.", "อยู่ตรงโน้นค่ะ"] }),
  v("mae", "前", "mae", "มะเอะ", "ด้านหน้า", "directions", { hiragana: "まえ", ex: ["えきの まえ", "eki no mae", "หน้าสถานี"] }),
  v("ushiro", "後ろ", "ushiro", "อุชิโระ", "ด้านหลัง", "directions", { hiragana: "うしろ", d: 2 }),
  v("chizu", "地図", "chizu", "จิซุ", "แผนที่", "directions", { hiragana: "ちず", ex: ["ちずで おしえて ください。", "Chizu de oshiete kudasai.", "ช่วยชี้ในแผนที่ให้หน่อยค่ะ"], d: 2 }),
  v("shingou", "信号", "shingou", "ชินโง", "สัญญาณไฟจราจร", "directions", { hiragana: "しんごう", ex: ["しんごうを みぎに まがって ください。", "Shingou o migi ni magatte kudasai.", "ถึงสัญญาณไฟแล้วเลี้ยวขวาค่ะ"], d: 2 }),
  v("aruite", "歩いて", "aruite", "อะรุอิเตะ", "เดินไป", "directions", { hiragana: "あるいて", ex: ["あるいて なんぷんですか。", "Aruite nanpun desu ka.", "เดินไปกี่นาทีคะ?"], d: 2 }),

  /* ------------------------------ Weather ------------------------------ */
  v("tenki", "天気", "tenki", "เท็งคิ", "สภาพอากาศ", "weather", { hiragana: "てんき", ex: ["いい てんきですね。", "Ii tenki desu ne.", "อากาศดีนะคะ"] }),
  v("hare", "晴れ", "hare", "ฮะเระ", "แดดออก / ท้องฟ้าแจ่มใส", "weather", { hiragana: "はれ" }),
  v("ame", "雨", "ame", "อะเมะ", "ฝน", "weather", { hiragana: "あめ", ex: ["あめが ふって います。", "Ame ga futte imasu.", "ฝนกำลังตกค่ะ"] }),
  v("kumori", "曇り", "kumori", "คุโมะริ", "ฟ้าครึ้ม / มีเมฆมาก", "weather", { hiragana: "くもり" }),
  v("samui", "寒い", "samui", "ซะมุย", "หนาว", "weather", { hiragana: "さむい", note: "ปลายตุลาคมที่โอคุนิกโก้ (奥日光) อาจหนาวใกล้ 0°C ตอนเช้า", ex: ["きょうは さむいですね。", "Kyou wa samui desu ne.", "วันนี้หนาวนะคะ"] }),
  v("suzushii", "涼しい", "suzushii", "สุซุชี", "เย็นสบาย", "weather", { hiragana: "すずしい", d: 2 }),
  v("atsui", "暑い", "atsui", "อะทสึย", "ร้อน (อากาศ)", "weather", { hiragana: "あつい" }),
  v("kasa", "傘", "kasa", "คะสะ", "ร่ม", "weather", { hiragana: "かさ", ex: ["かさを かして ください。", "Kasa o kashite kudasai.", "ขอยืมร่มหน่อยค่ะ"] }),

  /* ------------------------------- Nature ------------------------------ */
  v("yama", "山", "yama", "ยะมะ", "ภูเขา", "nature", { hiragana: "やま", ex: ["やまが きれいですね。", "Yama ga kirei desu ne.", "ภูเขาสวยนะคะ"] }),
  v("kawa", "川", "kawa", "คะวะ", "แม่น้ำ", "nature", { hiragana: "かわ" }),
  v("mizuumi", "湖", "mizuumi", "มิซุอุมิ", "ทะเลสาบ", "nature", { hiragana: "みずうみ", note: "ทะเลสาบชูเซนจิ = 中禅寺湖 (ちゅうぜんじこ)", d: 2 }),
  v("taki", "滝", "taki", "ทะคิ", "น้ำตก", "nature", { hiragana: "たき", note: "น้ำตกเคงงอน = 華厳の滝 (けごんのたき)", ex: ["たきは どこですか。", "Taki wa doko desu ka.", "น้ำตกอยู่ที่ไหนคะ?"] }),
  v("kouyou", "紅葉", "kouyou", "โคโย", "ใบไม้เปลี่ยนสี (ใบไม้แดง)", "nature", { hiragana: "こうよう", note: "ปลายตุลาคมเป็นช่วงใบไม้แดงที่นิกโก้", ex: ["こうようは いつが きれいですか。", "Kouyou wa itsu ga kirei desu ka.", "ใบไม้แดงสวยช่วงไหนคะ?"], d: 2 }),
  v("momiji", "もみじ", "momiji", "โมะมิจิ", "ใบเมเปิลแดง", "nature", { note: "เขียนเป็นคันจิว่า 紅葉 ได้เหมือนกัน", d: 2 }),
  v("hashi", "橋", "hashi", "ฮะชิ", "สะพาน", "nature", { hiragana: "はし", note: "สะพานชินเคียว = 神橋 (しんきょう) ระวัง はし ยังแปลว่า “ตะเกียบ” (箸) ได้ด้วย", d: 2 }),
  v("aki", "秋", "aki", "อะคิ", "ฤดูใบไม้ร่วง", "nature", { hiragana: "あき" }),
  v("keshiki", "景色", "keshiki", "เคะชิคิ", "ทิวทัศน์", "nature", { hiragana: "けしき", ex: ["けしきが すばらしいです。", "Keshiki ga subarashii desu.", "วิวสวยงามมากค่ะ"], d: 2 }),
  v("kirei", "きれい", "kirei", "คิเร", "สวย / สะอาด", "nature", { ex: ["きれいですね!", "Kirei desu ne!", "สวยจังเลย!"] }),

  /* ----------------------------- Emergency ----------------------------- */
  v("tasukete", "助けて", "tasukete", "ทะสุเคะเตะ", "ช่วยด้วย!", "emergency", { hiragana: "たすけて" }),
  v("keisatsu", "警察", "keisatsu", "เคซัทสึ", "ตำรวจ", "emergency", { hiragana: "けいさつ", note: "เบอร์ตำรวจญี่ปุ่น 110 / รถพยาบาลและดับเพลิง 119", d: 2 }),
  v("byouin", "病院", "byouin", "เบียวอิน", "โรงพยาบาล", "emergency", { hiragana: "びょういん", ex: ["びょういんに いきたいです。", "Byouin ni ikitai desu.", "อยากไปโรงพยาบาลค่ะ"], d: 2 }),
  v("kyuukyuusha", "救急車", "kyuukyuusha", "คิวคิวฉะ", "รถพยาบาล", "emergency", { hiragana: "きゅうきゅうしゃ", ex: ["きゅうきゅうしゃを よんで ください!", "Kyuukyuusha o yonde kudasai!", "ช่วยเรียกรถพยาบาลด้วยค่ะ!"], d: 3 }),
  v("itai", "痛い", "itai", "อิไต", "เจ็บ / ปวด", "emergency", { hiragana: "いたい", ex: ["あたまが いたいです。", "Atama ga itai desu.", "ปวดหัวค่ะ"] }),
  v("kusuri", "薬", "kusuri", "คุซุริ", "ยา", "emergency", { hiragana: "くすり", ex: ["くすりやは どこですか。", "Kusuriya wa doko desu ka.", "ร้านขายยาอยู่ที่ไหนคะ?"], d: 2 }),
  v("toire", "トイレ", "toire", "โทะอิเระ", "ห้องน้ำ", "emergency", { ex: ["トイレは どこですか。", "Toire wa doko desu ka.", "ห้องน้ำอยู่ที่ไหนคะ?"] }),
  v("mayoimashita", "道に迷いました", "michi ni mayoimashita", "มิจิ นิ มะโยอิมะชิตะ", "หลงทางแล้วค่ะ", "emergency", { hiragana: "みちにまよいました", d: 3 }),
  v("nakushimashita", "なくしました", "nakushimashita", "นะคุชิมะชิตะ", "ทำ ... หายแล้ว", "emergency", { ex: ["さいふを なくしました。", "Saifu o nakushimashita.", "ทำกระเป๋าสตางค์หายค่ะ"], d: 2 }),
  v("saifu", "財布", "saifu", "ไซฟุ", "กระเป๋าสตางค์", "emergency", { hiragana: "さいふ", d: 2 }),
  v("arerugii", "アレルギー", "arerugii", "อะเระรุงี", "ภูมิแพ้", "emergency", { ex: ["えびの アレルギーが あります。", "Ebi no arerugii ga arimasu.", "แพ้กุ้งค่ะ"], d: 2 }),
  v("eigo", "英語", "eigo", "เอโงะ", "ภาษาอังกฤษ", "emergency", { hiragana: "えいご", ex: ["えいごは だいじょうぶですか。", "Eigo wa daijoubu desu ka.", "พูดภาษาอังกฤษได้ไหมคะ?"] }),

  /* ------------------------------ Travel ------------------------------ */
  v("wakarimasen", "分かりません", "wakarimasen", "วะคะริมะเซ็น", "ไม่เข้าใจค่ะ", "travel", { hiragana: "わかりません", ex: ["すみません、わかりません。", "Sumimasen, wakarimasen.", "ขอโทษค่ะ ไม่เข้าใจค่ะ"] }),
  v("wakarimashita", "分かりました", "wakarimashita", "วะคะริมะชิตะ", "เข้าใจแล้วค่ะ", "travel", { hiragana: "わかりました" }),
  v("mou-ichido", "もう一度", "mou ichido", "โม อิจิโดะ", "อีกครั้ง", "travel", { hiragana: "もういちど", ex: ["もういちど おねがいします。", "Mou ichido onegaishimasu.", "ช่วยพูดอีกครั้งได้ไหมคะ"] }),
  v("yukkuri", "ゆっくり", "yukkuri", "ยุคคุริ", "ช้า ๆ", "travel", { ex: ["ゆっくり おねがいします。", "Yukkuri onegaishimasu.", "ช่วยพูดช้า ๆ หน่อยค่ะ"] }),
  v("shashin", "写真", "shashin", "ชะชิน", "รูปถ่าย", "travel", { hiragana: "しゃしん", ex: ["しゃしんを とっても いいですか。", "Shashin o tottemo ii desu ka.", "ถ่ายรูปได้ไหมคะ?"] }),
  v("nyuujouryou", "入場料", "nyuujouryou", "นิวโจเรียว", "ค่าเข้าชม", "travel", { hiragana: "にゅうじょうりょう", ex: ["にゅうじょうりょうは いくらですか。", "Nyuujouryou wa ikura desu ka.", "ค่าเข้าชมเท่าไรคะ?"], d: 3 }),
  v("nanji-made", "何時までですか", "nanji made desu ka", "นันจิ มะเดะ เดส คะ", "เปิดถึงกี่โมงคะ?", "travel", { hiragana: "なんじまでですか", ex: ["なんじまで あいて いますか。", "Nanji made aite imasu ka.", "เปิดถึงกี่โมงคะ?"], d: 2 }),
  v("arimasu-ka", "ありますか", "arimasu ka", "อะริมัส คะ", "มี ... ไหมคะ?", "travel", { ex: ["Wi-Fiは ありますか。", "Waifai wa arimasu ka.", "มีไวไฟไหมคะ?"] }),
  v("ii-desu-ka", "いいですか", "ii desu ka", "อี เดส คะ", "... ได้ไหมคะ? (ขออนุญาต)", "travel", { ex: ["ここに すわっても いいですか。", "Koko ni suwattemo ii desu ka.", "นั่งตรงนี้ได้ไหมคะ?"], d: 2 }),
  v("erebeetaa", "エレベーター", "erebeetaa", "เอะเระเบตา", "ลิฟต์", "travel", { ex: ["エレベーターは どこですか。", "Erebeetaa wa doko desu ka.", "ลิฟต์อยู่ที่ไหนคะ?"] }),
  v("otoko", "男", "otoko", "โอะโตะโคะ", "ผู้ชาย (ป้ายห้องน้ำ/ออนเซ็นชาย)", "travel", { hiragana: "おとこ", note: "ป้ายห้องน้ำและออนเซ็น: 男 = ชาย มักเป็นสีน้ำเงิน", d: 2 }),
  v("onna", "女", "onna", "อนนะ", "ผู้หญิง (ป้ายห้องน้ำ/ออนเซ็นหญิง)", "travel", { hiragana: "おんな", note: "ป้ายห้องน้ำและออนเซ็น: 女 = หญิง มักเป็นสีแดง", d: 2 }),
  v("kinen", "禁煙", "kin'en", "คินเอ็น", "ห้ามสูบบุหรี่", "travel", { hiragana: "きんえん", d: 3 }),
  v("chotto-matte", "ちょっと待ってください", "chotto matte kudasai", "ช็อตโตะ มัตเตะ คุดะไซ", "รอสักครู่นะคะ", "travel", { hiragana: "ちょっとまってください", d: 2 }),
];

const vocabIndex = new Map(VOCABULARY.map((w) => [w.id, w]));

export function getVocab(id: string): Vocabulary | undefined {
  return vocabIndex.get(id);
}

export function vocabByIds(ids: string[]): Vocabulary[] {
  return ids.map((id) => {
    const w = vocabIndex.get(id);
    if (!w) throw new Error(`Unknown vocabulary id: ${id}`);
    return w;
  });
}

export function categoryLabel(id: VocabCategory): string {
  return VOCAB_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
