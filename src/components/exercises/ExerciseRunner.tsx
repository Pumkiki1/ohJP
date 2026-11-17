"use client";

import { CheckCircle2, CircleX, Lightbulb, Trophy } from "lucide-react";
import { type ReactNode, useState } from "react";
import type { Exercise } from "@/lib/types";
import { reviewKeyLabel } from "@/lib/quiz";
import { Badge, Card, ProgressBar } from "@/components/ui";
import { correctAnswerLabel, ExerciseCard } from "./ExerciseCard";

export type AnswerMap = Record<string, { correct: boolean; firstTryCorrect: boolean }>;

export interface RunnerResult {
  score: number;
  total: number;
  answers: AnswerMap;
}

/**
 * Plays a list of exercises in order, then shows a results summary.
 * Can resume from a saved state (`initialAnswers`).
 */
export function ExerciseRunner({
  exercises,
  initialAnswers = {},
  onAnswer,
  onFinish,
  finishSlot,
  title,
}: {
  exercises: Exercise[];
  initialAnswers?: AnswerMap;
  onAnswer?: (exercise: Exercise, correct: boolean, answers: AnswerMap, index: number) => void;
  onFinish?: (result: RunnerResult) => void;
  /** Rendered under the results (e.g. a "continue" button) */
  finishSlot?: ReactNode;
  title?: string;
}) {
  const firstUnanswered = exercises.findIndex((e) => !initialAnswers[e.id]);
  const [index, setIndex] = useState(firstUnanswered === -1 ? exercises.length : firstUnanswered);
  const [answers, setAnswers] = useState<AnswerMap>(initialAnswers);

  const done = index >= exercises.length;
  const answeredCount = Object.keys(answers).length;

  if (exercises.length === 0) {
    return (
      <Card className="p-6 text-center text-ink-soft">ยังไม่มีแบบฝึกหัดในชุดนี้</Card>
    );
  }

  if (done) {
    return (
      <ExerciseResults exercises={exercises} answers={answers}>
        {finishSlot}
      </ExerciseResults>
    );
  }

  const ex = exercises[index];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-ink-soft whitespace-nowrap">
          {title ? `${title} · ` : ""}ข้อ {index + 1}/{exercises.length}
        </span>
        <ProgressBar value={answeredCount} max={exercises.length} tone="matcha" size="sm" label="ความคืบหน้าแบบฝึกหัด" />
      </div>
      <ExerciseCard
        key={ex.id}
        exercise={ex}
        onFirstAnswer={(correct) => {
          const next = { ...answers, [ex.id]: { correct, firstTryCorrect: correct } };
          setAnswers(next);
          onAnswer?.(ex, correct, next, index);
        }}
        nextLabel={index === exercises.length - 1 ? "ดูผลคะแนน" : "ข้อต่อไป"}
        onNext={() => {
          const ni = index + 1;
          setIndex(ni);
          if (ni >= exercises.length) {
            const score = exercises.filter((e) => answers[e.id]?.firstTryCorrect).length;
            onFinish?.({ score, total: exercises.length, answers });
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}

export function ExerciseResults({ exercises, answers, children }: { exercises: Exercise[]; answers: AnswerMap; children?: ReactNode }) {
  const correct = exercises.filter((e) => answers[e.id]?.firstTryCorrect);
  const wrong = exercises.filter((e) => answers[e.id] && !answers[e.id].firstTryCorrect);
  const score = correct.length;
  const pct = Math.round((score / exercises.length) * 100);
  const topics = Array.from(new Set(wrong.map((e) => e.reviewKey).filter((k): k is string => Boolean(k))));
  const message =
    pct === 100 ? "เต็ม! สุดยอดมาก 🎉" : pct >= 80 ? "เก่งมาก! เกือบเต็มแล้ว ✨" : pct >= 50 ? "ดีมาก! ทบทวนอีกนิดก็คล่องแล้ว 🌸" : "ไม่เป็นไรเลย การผิดคือส่วนหนึ่งของการเรียน 🌱";

  return (
    <Card className="p-5 md:p-7 animate-pop space-y-5">
      <div className="text-center">
        <Trophy className="mx-auto text-sakura-deep" size={40} aria-hidden />
        <p className="mt-2 text-4xl font-bold">
          {score}/{exercises.length}
        </p>
        <p className="text-ink-soft">{message}</p>
        <div className="mt-3 flex justify-center gap-2">
          <Badge tone="matcha">
            <CheckCircle2 size={14} /> ถูก {correct.length} ข้อ
          </Badge>
          <Badge tone={wrong.length ? "danger" : "neutral"}>
            <CircleX size={14} /> ผิด {wrong.length} ข้อ
          </Badge>
        </div>
      </div>

      {wrong.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">คำอธิบายข้อที่ตอบผิด</h3>
          <ul className="space-y-2">
            {wrong.map((e) => (
              <li key={e.id} className="rounded-2xl bg-surface-2/70 p-3 text-sm">
                <p className="font-medium">{e.question}</p>
                <p className="mt-0.5">
                  ✅ <span className="jp" lang="ja">{correctAnswerLabel(e)}</span>
                </p>
                <p className="text-ink-soft mt-0.5">💡 {e.explanation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {topics.length > 0 && (
        <div className="rounded-2xl bg-sakura-soft/60 p-4">
          <h3 className="flex items-center gap-1.5 font-semibold text-sakura-deep mb-1">
            <Lightbulb size={18} /> แนะนำให้ทบทวน
          </h3>
          <ul className="text-sm space-y-0.5">
            {topics.map((t) => (
              <li key={t} className="jp" lang="ja">
                • {reviewKeyLabel(t)}
              </li>
            ))}
          </ul>
          <p className="text-xs text-ink-soft mt-2">ระบบเพิ่มรายการเหล่านี้เข้าคิวทบทวนให้แล้ว</p>
        </div>
      )}

      {children && <div className="flex flex-wrap justify-center gap-2 pt-1">{children}</div>}
    </Card>
  );
}
