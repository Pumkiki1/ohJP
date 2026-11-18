"use client";

import { ArrowLeft, Check, Layers, ListChecks, Shuffle, Table2, X } from "lucide-react";
import { useState } from "react";
import { HIRAGANA, KATAKANA, STROKE_GUIDES } from "@/data/kana";
import { todayISO } from "@/lib/date";
import { useStudyTimer, useToday } from "@/lib/hooks";
import { finishStudySession, recordAnswer, reviewAnswer, setLearned } from "@/lib/progress/actions";
import { updateProgress, useProgress } from "@/lib/progress/store";
import { dueReviewItems, kanaMastery } from "@/lib/progress/stats";
import { kanaQuiz } from "@/lib/quiz";
import { shuffle } from "@/lib/random";
import type { Exercise, KanaChar, KanaGroup, Script } from "@/lib/types";
import { Badge, Button, Card, cx, JP, PageHeader, PageSkeleton, ProgressBar } from "@/components/ui";
import { AudioButton, AudioUnavailableNote } from "@/components/learning/AudioButton";
import { KanaGrid } from "@/components/learning/KanaGrid";
import { Flashcard } from "@/components/learning/Flashcard";
import { ExerciseRunner } from "@/components/exercises/ExerciseRunner";

const GROUPS: { id: KanaGroup; title: string; desc: string; layout: "gojuon" | "flow" }[] = [
  { id: "basic", title: "ตัวพื้นฐาน", desc: "46 ตัวหลัก เรียงตามแถว a-i-u-e-o", layout: "gojuon" },
  { id: "dakuten", title: "เสียงขุ่น ゛ (ดะคุเต็น)", desc: "k→g · s→z · t→d · h→b", layout: "gojuon" },
  { id: "handakuten", title: "เสียง p ゜ (ฮันดะคุเต็น)", desc: "h→p", layout: "gojuon" },
  { id: "combo", title: "ตัวผสม (ゃ ゅ ょ ตัวเล็ก)", desc: "ตัวหน้า + ตัวเล็ก = 1 พยางค์", layout: "flow" },
  { id: "special", title: "เครื่องหมายพิเศษ", desc: "っ/ッ ตัวเล็ก และ ー ลากเสียงยาว", layout: "flow" },
];

type Mode = "chart" | "flash" | "quiz";

export function KanaView() {
  const progress = useProgress();
  const today = useToday();
  const [script, setScript] = useState<Script>("hiragana");
  const [mode, setMode] = useState<Mode>("chart");
  const [selected, setSelected] = useState<KanaChar | null>(null);
  const [quiz, setQuiz] = useState<{ exercises: Exercise[]; review: boolean; key: number } | null>(null);
  const [deckSeed, setDeckSeed] = useState(0);
  useStudyTimer(mode !== "chart" || Boolean(selected));
  if (!progress || !today) return <PageSkeleton />;

  const list = script === "hiragana" ? HIRAGANA : KATAKANA;
  const isLearned = (c: string) => Boolean(progress.kanaProgress[c]?.learned);
  const mastery = kanaMastery(progress, script);
  const dueKana = dueReviewItems(progress, today).filter((i) => i.kind === "kana" && list.some((k) => `kana:${k.char}` === i.key));

  const startQuiz = (review: boolean) => {
    const chars = review
      ? dueKana.map((i) => i.key.slice(5))
      : list.filter((k) => k.group === "basic" && isLearned(k.char)).map((k) => k.char);
    const exercises = kanaQuiz(script, 10, chars.length >= 4 ? chars : undefined);
    setQuiz({ exercises, review, key: Date.now() });
  };

  const deckSource = list.filter((k) => k.group !== "special");
  const learnedDeck = deckSource.filter((k) => isLearned(k.char));
  const deck = shuffle(learnedDeck.length >= 5 ? learnedDeck : deckSource.filter((k) => k.group === "basic"), () => ((deckSeed * 9301 + 49297) % 233280) / 233280);

  return (
    <div className="space-y-5">
      <PageHeader note="あいうえお — ลองเขียนตามด้วยนะ" icon="🔤" title="ฝึกตัวอักษร" subtitle="ฮิรางานะและคาตากานะ — แตะตัวอักษรเพื่อดูรายละเอียดและฟังเสียง" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-2xl bg-surface-2 p-1" role="tablist" aria-label="ระบบตัวอักษร">
          {(["hiragana", "katakana"] as Script[]).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={script === s}
              onClick={() => {
                setScript(s);
                setSelected(null);
                setQuiz(null);
              }}
              className={cx("px-4 py-2 rounded-xl text-sm font-semibold transition", script === s ? "bg-surface shadow-soft text-sakura-deep" : "text-ink-soft")}
            >
              <JP>{s === "hiragana" ? "ひらがな" : "カタカナ"}</JP> {s === "hiragana" ? "ฮิรางานะ" : "คาตากานะ"}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-2xl bg-surface-2 p-1" role="tablist" aria-label="โหมด">
          {(
            [
              ["chart", "ตาราง", Table2],
              ["flash", "แฟลชการ์ด", Layers],
              ["quiz", "ควิซ", ListChecks],
            ] as const
          ).map(([m, label, Icon]) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                setQuiz(null);
              }}
              className={cx("px-3 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-1.5 transition", mode === m ? "bg-surface shadow-soft text-sakura-deep" : "text-ink-soft")}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-4 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-48">
          <p className="text-sm mb-1">
            เรียนแล้ว <strong>{mastery.learned}</strong> / {mastery.total} ตัว
          </p>
          <ProgressBar value={mastery.learned} max={mastery.total} tone="matcha" label="ความคืบหน้าตัวอักษร" />
        </div>
        <Badge tone={dueKana.length ? "sakura" : "neutral"}>ถึงรอบทบทวน {dueKana.length} ตัว</Badge>
      </Card>

      {mode === "chart" && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
          <div className="space-y-6">
            {GROUPS.map((g) => {
              const chars = list.filter((k) => k.group === g.id);
              if (!chars.length) return null;
              return (
                <section key={g.id}>
                  <h2 className="font-semibold">{g.title}</h2>
                  <p className="text-sm text-ink-soft mb-2">{g.desc}</p>
                  <KanaGrid chars={chars} learned={isLearned} onSelect={setSelected} selected={selected?.char} layout={g.layout} />
                </section>
              );
            })}
          </div>
          <div className="lg:sticky lg:top-6">
            {selected ? (
              <KanaDetail
                k={selected}
                learned={isLearned(selected.char)}
                onClose={() => setSelected(null)}
                onToggle={() => updateProgress((p) => setLearned(p, `kana:${selected.char}`, !isLearned(selected.char), todayISO()))}
              />
            ) : (
              <Card className="p-5 text-sm text-ink-soft hidden lg:block">👈 แตะตัวอักษรเพื่อดูวิธีอ่าน ตัวอย่างคำ ตัวช่วยจำ และฟังเสียง</Card>
            )}
          </div>
        </div>
      )}

      {mode === "flash" && (
        <div className="max-w-md mx-auto space-y-3">
          <Flashcard
            key={`${script}-${deckSeed}`}
            items={deck.map((k) => ({
              id: k.char,
              front: k.char,
              audio: k.char,
              back: (
                <div>
                  <p className="text-3xl font-bold">{k.romaji}</p>
                  <p className="text-ink-soft">เสียง “{k.thai}”</p>
                  {k.example && (
                    <p className="text-sm mt-1">
                      <JP>{k.example.word}</JP> · {k.example.meaning}
                    </p>
                  )}
                </div>
              ),
            }))}
            onKnown={(char, known) => {
              const date = todayISO();
              updateProgress((p) => {
                const key = `kana:${char}`;
                return p.reviewItems[key] ? reviewAnswer(p, key, known, date) : known ? p : recordAnswer(p, { reviewKey: key, correct: false, date });
              });
            }}
          />
          <div className="text-center">
            <Button variant="ghost" size="sm" onClick={() => setDeckSeed((s) => s + 1)}>
              <Shuffle size={16} /> สับการ์ดใหม่
            </Button>
          </div>
          <p className="text-xs text-center text-ink-soft">“ยังจำไม่ได้” จะเพิ่มตัวนั้นเข้าคิวทบทวน · การ์ดใช้ตัวที่เรียนแล้ว (หรือตัวพื้นฐานถ้ายังเรียนไม่ถึง 5 ตัว)</p>
        </div>
      )}

      {mode === "quiz" && !quiz && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <Card className="p-5 flex flex-col gap-2">
            <span className="text-3xl">🎲</span>
            <h2 className="font-semibold">ควิซตัวอักษรแบบสุ่ม</h2>
            <p className="text-sm text-ink-soft flex-1">10 ข้อ: อ่านตัวอักษร · เลือกตัวจากเสียง · ฟังแล้วเลือก</p>
            <Button onClick={() => startQuiz(false)}>เริ่มควิซ</Button>
          </Card>
          <Card className="p-5 flex flex-col gap-2">
            <span className="text-3xl">📅</span>
            <h2 className="font-semibold">ทบทวนตัวอักษรประจำวัน</h2>
            <p className="text-sm text-ink-soft flex-1">ตัวที่ถึงรอบทบทวนวันนี้ ({dueKana.length} ตัว)</p>
            <Button variant="matcha" onClick={() => startQuiz(true)} disabled={dueKana.length === 0}>
              ทบทวนวันนี้
            </Button>
          </Card>
        </div>
      )}

      {mode === "quiz" && quiz && (
        <div className="max-w-3xl mx-auto space-y-3">
          <Button variant="ghost" size="sm" onClick={() => setQuiz(null)}>
            <ArrowLeft size={16} /> กลับ
          </Button>
          <AudioUnavailableNote />
          <ExerciseRunner
            key={quiz.key}
            exercises={quiz.exercises}
            onAnswer={(ex, correct) => {
              const date = todayISO();
              updateProgress((p) =>
                quiz.review && ex.reviewKey ? reviewAnswer(p, ex.reviewKey, correct, date) : recordAnswer(p, { reviewKey: ex.reviewKey, correct, date }),
              );
            }}
            onFinish={() => updateProgress((p) => finishStudySession(p, todayISO()))}
            finishSlot={
              <Button onClick={() => startQuiz(quiz.review)}>
                <Shuffle size={16} /> ควิซชุดใหม่
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}

function KanaDetail({ k, learned, onClose, onToggle }: { k: KanaChar; learned: boolean; onClose: () => void; onToggle: () => void }) {
  const stroke = STROKE_GUIDES[k.char];
  return (
    <Card className="p-5 animate-pop space-y-3" aria-live="polite">
      <div className="flex justify-between items-start">
        <Badge tone="beige">{k.script === "hiragana" ? "ฮิรางานะ" : "คาตากานะ"}</Badge>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-2" aria-label="ปิดรายละเอียด">
          <X size={18} />
        </button>
      </div>
      <div className="text-center">
        <JP className="kana-display text-8xl leading-none block py-2">{k.char}</JP>
        <p className="text-2xl font-bold">{k.romaji}</p>
        <p className="text-ink-soft">เสียงไทย: “{k.thai}”</p>
        <div className="mt-2 flex justify-center">
          <AudioButton text={k.char} withSlow size="lg" />
        </div>
      </div>
      {k.example && (
        <div className="rounded-2xl bg-surface-2/60 p-3 flex items-center gap-3">
          <AudioButton text={k.example.word} size="sm" />
          <div>
            <JP className="text-xl">{k.example.word}</JP>
            <p className="text-sm text-ink-soft">
              {k.example.romaji} · {k.example.meaning}
            </p>
          </div>
        </div>
      )}
      {k.mnemonic && <p className="text-sm rounded-2xl bg-sakura-soft/60 p-3">💡 {k.mnemonic}</p>}
      {stroke ? (
        <div className="text-sm">
          <p className="font-semibold">✍️ ลำดับการเขียน ({stroke.count} ขีด)</p>
          <ol className="mt-1 space-y-0.5">
            {stroke.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="text-xs text-ink-soft">✍️ หลักทั่วไป: เขียนจากบนลงล่าง ซ้ายไปขวา (ลำดับขีดละเอียดจะเพิ่มเมื่อตรวจสอบแล้ว)</p>
      )}
      <Button variant={learned ? "secondary" : "matcha"} className="w-full" onClick={onToggle}>
        <Check size={16} /> {learned ? "เรียนแล้ว (แตะเพื่อยกเลิก)" : "ทำเครื่องหมายว่าเรียนแล้ว"}
      </Button>
    </Card>
  );
}
