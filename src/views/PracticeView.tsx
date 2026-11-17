"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import { useState } from "react";
import { AUTHORED_LESSONS } from "@/data/lessons";
import { VOCABULARY } from "@/data/vocabulary";
import { todayISO } from "@/lib/date";
import { useStudyTimer } from "@/lib/hooks";
import { finishStudySession, recordAnswer } from "@/lib/progress/actions";
import { updateProgress, useProgress } from "@/lib/progress/store";
import { kanaQuiz, lessonMix, typingQuiz, vocabListen, vocabQuiz } from "@/lib/quiz";
import { shuffle } from "@/lib/random";
import type { Exercise, Progress } from "@/lib/types";
import { Badge, Button, Card, PageHeader, PageSkeleton } from "@/components/ui";
import { ExerciseRunner } from "@/components/exercises/ExerciseRunner";
import { AudioUnavailableNote } from "@/components/learning/AudioButton";

interface Mode {
  id: string;
  icon: string;
  title: string;
  desc: string;
  build: (p: Progress) => Exercise[];
}

function learnedVocab(p: Progress) {
  const learned = VOCABULARY.filter((v) => p.vocabularyProgress[v.id]?.learned);
  return learned.length >= 4 ? learned : VOCABULARY.filter((v) => v.difficulty === 1);
}

function learnedKana(p: Progress, script: "hiragana" | "katakana") {
  return Object.entries(p.kanaProgress)
    .filter(([c, r]) => r.learned && (script === "hiragana" ? /[぀-ゟ]/.test(c) : /[゠-ヿ]/.test(c)))
    .map(([c]) => c);
}

/** One exercise of each type, taken from authored lessons the learner has reached. */
function allTypes(p: Progress): Exercise[] {
  const reached = AUTHORED_LESSONS.filter((l) => l.dayNumber <= Math.max(2, Object.keys(p.completedLessons).length + 1));
  const pool = (reached.length ? reached : AUTHORED_LESSONS).flatMap((l) => l.exercises);
  const fallback = AUTHORED_LESSONS.flatMap((l) => l.exercises);
  const types: Exercise["type"][] = ["multiple-choice", "match", "fill-blank", "order", "listen", "read-meaning", "type", "true-false", "conversation"];
  return types
    .map((t) => shuffle(pool.filter((e) => e.type === t))[0] ?? shuffle(fallback.filter((e) => e.type === t))[0])
    .filter((e): e is Exercise => Boolean(e))
    .map((e) => ({ ...e, id: `all-${e.id}` }));
}

const MODES: Mode[] = [
  { id: "mix", icon: "📚", title: "ฝึกจากบทที่เรียนแล้ว", desc: "สุ่ม 10 ข้อจากบทเรียนที่เรียนจบแล้ว", build: (p) => lessonMix(p, 10) },
  {
    id: "hiragana",
    icon: "あ",
    title: "ควิซฮิรางานะแบบสุ่ม",
    desc: "อ่าน · เลือกตัว · ฟังเสียง (จากตัวที่เรียนแล้ว)",
    build: (p) => {
      const learned = learnedKana(p, "hiragana");
      return kanaQuiz("hiragana", 10, learned.length >= 4 ? learned : ["あ", "い", "う", "え", "お"]);
    },
  },
  {
    id: "katakana",
    icon: "ア",
    title: "ควิซคาตากานะแบบสุ่ม",
    desc: "ใช้ตัวที่เรียนแล้ว หรือทั้งหมดถ้ายังไม่ได้เริ่ม",
    build: (p) => {
      const learned = learnedKana(p, "katakana");
      return kanaQuiz("katakana", 10, learned.length >= 4 ? learned : undefined);
    },
  },
  { id: "vocab", icon: "🗂️", title: "คำศัพท์ ↔ ความหมาย", desc: "อ่านคำ เลือกความหมาย และกลับกัน", build: (p) => vocabQuiz(learnedVocab(p), 10) },
  {
    id: "listen",
    icon: "🎧",
    title: "ฟังแล้วเลือก",
    desc: "ฟังคำศัพท์ แล้วเลือกความหมาย (ต้องมีเสียงภาษาญี่ปุ่น)",
    build: (p) => shuffle(learnedVocab(p)).slice(0, 8).map((v, i) => vocabListen(v, `p${i}`)),
  },
  { id: "typing", icon: "⌨️", title: "พิมพ์ฮิรางานะ", desc: "พิมพ์โรมาจิ ระบบแปลงเป็นฮิรางานะให้", build: (p) => typingQuiz(learnedVocab(p), 6) },
  { id: "all", icon: "🎲", title: "รวมทุกรูปแบบ", desc: "ลองแบบฝึกหัดครบทุกประเภท ประเภทละ 1 ข้อ", build: allTypes },
];

export function PracticeView() {
  const progress = useProgress();
  const [session, setSession] = useState<{ mode: Mode; exercises: Exercise[]; key: number } | null>(null);
  useStudyTimer(Boolean(session));
  if (!progress) return <PageSkeleton />;

  if (session) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <Button variant="ghost" size="sm" onClick={() => setSession(null)}>
          <ArrowLeft size={16} /> เลือกแบบฝึกหัดอื่น
        </Button>
        <h1 className="text-2xl font-bold">
          {session.mode.icon} {session.mode.title}
        </h1>
        <AudioUnavailableNote />
        <ExerciseRunner
          key={session.key}
          exercises={session.exercises}
          onAnswer={(ex, correct) => updateProgress((p) => recordAnswer(p, { reviewKey: ex.reviewKey, correct, date: todayISO() }))}
          onFinish={() => updateProgress((p) => finishStudySession(p, todayISO()))}
          finishSlot={
            <>
              <Button variant="secondary" onClick={() => setSession(null)}>
                เลือกแบบฝึกหัดอื่น
              </Button>
              <Button onClick={() => setSession({ ...session, exercises: session.mode.build(progress), key: session.key + 1 })}>
                <RotateCcw size={16} /> ฝึกชุดใหม่
              </Button>
            </>
          }
        />
      </div>
    );
  }

  const hasLessons = Object.keys(progress.completedLessons).length > 0;
  return (
    <div>
      <PageHeader icon="✏️" title="แบบฝึกหัด" subtitle="ฝึกเพิ่มได้ตามใจ ตอบผิดได้ — ระบบจะเก็บไว้ให้ทบทวนภายหลัง" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODES.map((m) => {
          const disabled = m.id === "mix" && !hasLessons;
          return (
            <Card key={m.id} className="p-5 flex flex-col gap-2">
              <span className="text-3xl jp" aria-hidden>
                {m.icon}
              </span>
              <h2 className="font-semibold text-lg">{m.title}</h2>
              <p className="text-sm text-ink-soft flex-1">{m.desc}</p>
              {disabled && <Badge tone="neutral">เรียนจบบทแรกก่อนนะ</Badge>}
              <Button
                className="mt-2"
                disabled={disabled}
                onClick={() => {
                  const exercises = m.build(progress);
                  setSession({ mode: m, exercises, key: 0 });
                }}
              >
                เริ่มฝึก
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
