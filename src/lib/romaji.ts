/**
 * Minimal romaji → hiragana converter for typing exercises
 * (learners without a Japanese keyboard can type "ohayou" → おはよう).
 */

const TABLE: Record<string, string> = {
  a: "あ", i: "い", u: "う", e: "え", o: "お",
  ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ",
  sa: "さ", si: "し", shi: "し", su: "す", se: "せ", so: "そ",
  ta: "た", ti: "ち", chi: "ち", tu: "つ", tsu: "つ", te: "て", to: "と",
  na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の",
  ha: "は", hi: "ひ", fu: "ふ", hu: "ふ", he: "へ", ho: "ほ",
  ma: "ま", mi: "み", mu: "む", me: "め", mo: "も",
  ya: "や", yu: "ゆ", yo: "よ",
  ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ",
  wa: "わ", wo: "を", nn: "ん", "n'": "ん",
  ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご",
  za: "ざ", ji: "じ", zi: "じ", zu: "ず", ze: "ぜ", zo: "ぞ",
  da: "だ", di: "ぢ", du: "づ", de: "で", do: "ど",
  ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ",
  pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",
  kya: "きゃ", kyu: "きゅ", kyo: "きょ",
  sha: "しゃ", shu: "しゅ", sho: "しょ", sya: "しゃ", syu: "しゅ", syo: "しょ",
  cha: "ちゃ", chu: "ちゅ", cho: "ちょ", tya: "ちゃ", tyu: "ちゅ", tyo: "ちょ",
  nya: "にゃ", nyu: "にゅ", nyo: "にょ",
  hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ",
  mya: "みゃ", myu: "みゅ", myo: "みょ",
  rya: "りゃ", ryu: "りゅ", ryo: "りょ",
  gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ",
  ja: "じゃ", ju: "じゅ", jo: "じょ", jya: "じゃ", jyu: "じゅ", jyo: "じょ",
  bya: "びゃ", byu: "びゅ", byo: "びょ",
  pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ",
  "-": "ー",
};

const VOWELS = "aiueo";

export function romajiToHiragana(input: string): string {
  const s = input.toLowerCase();
  let out = "";
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    // small っ: doubled consonant (not n)
    if (i + 1 < s.length && c === s[i + 1] && /[bcdfghjkmpqrstvwxyz]/.test(c)) {
      out += "っ";
      i += 1;
      continue;
    }
    // ん before a consonant (or at end)
    if (c === "n") {
      const next = s[i + 1];
      if (next === undefined) {
        out += "ん";
        i += 1;
        continue;
      }
      if (next === "'" ) {
        out += "ん";
        i += 2;
        continue;
      }
      if (next === "n") {
        // "nn" + vowel → ん + な行 (konnichiwa → こんにちわ); otherwise "nn" → ん
        const after = s[i + 2];
        out += "ん";
        i += after !== undefined && (VOWELS.includes(after) || after === "y") ? 1 : 2;
        continue;
      }
      if (!VOWELS.includes(next) && next !== "y") {
        out += "ん";
        i += 1;
        continue;
      }
    }
    let matched = false;
    for (const len of [3, 2, 1]) {
      const chunk = s.slice(i, i + len);
      if (TABLE[chunk]) {
        out += TABLE[chunk];
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // keep partially typed characters (e.g. "k" while typing "ka")
      out += s[i];
      i += 1;
    }
  }
  return out;
}

/** Normalise romaji for answer comparison (case, spaces, apostrophes, macrons). */
export function normalizeRomaji(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[\s'’\-.,!?。、]/g, "")
    .trim();
}

export function normalizeKana(s: string): string {
  return s.replace(/[\s。、!?！？]/g, "").trim();
}
