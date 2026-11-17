"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { Exercise } from "@/lib/types";
import { Badge, Button, Card, cx } from "@/components/ui";
import {
  ConversationInput,
  FillBlankInput,
  ListenInput,
  MatchInput,
  MultipleChoiceInput,
  OrderInput,
  ReadMeaningInput,
  TrueFalseInput,
  TypeInput,
} from "./inputs";

export const EXERCISE_TYPE_LABEL: Record<Exercise["type"], string> = {
  "multiple-choice": "เลือกคำตอบ",
  match: "จับคู่",
  "fill-blank": "เติมคำ",
  order: "เรียงประโยค",
  listen: "ฟังแล้วเลือก",
  "read-meaning": "อ่านแล้วแปล",
  type: "พิมพ์คำตอบ",
  "true-false": "ถูกหรือผิด",
  conversation: "บทสนทนา",
};

const PRAISE = ["ถูกต้อง! เก่งมาก 🎉", "เยี่ยมเลย! ✨", "ใช่แล้ว! 🌸", "สุดยอด! 💮", "ถูกต้องนะคะ! 👏"];
const ENCOURAGE = ["ยังไม่ถูก ไม่เป็นไรนะ 🌱", "เกือบแล้ว! ลองดูอีกนิด 💪", "ผิดได้ เพราะกำลังเรียนรู้ 🍵"];

export function correctAnswerLabel(e: Exercise): string {
  switch (e.type) {
    case "match":
      return e.pairs.map((p) => `${p.left} = ${p.right}`).join(" · ");
    case "order":
      return e.correctOrder.join(" ");
    case "true-false":
      return e.correctAnswer ? "ถูก" : "ผิด";
    default:
      return e.correctAnswer;
  }
}

function ExerciseInput({ exercise, locked, onSubmit }: { exercise: Exercise; locked: boolean; onSubmit: (c: boolean, l: string) => void }) {
  switch (exercise.type) {
    case "multiple-choice":
      return <MultipleChoiceInput exercise={exercise} locked={locked} onSubmit={onSubmit} />;
    case "read-meaning":
      return <ReadMeaningInput exercise={exercise} locked={locked} onSubmit={onSubmit} />;
    case "listen":
      return <ListenInput exercise={exercise} locked={locked} onSubmit={onSubmit} />;
    case "fill-blank":
      return <FillBlankInput exercise={exercise} locked={locked} onSubmit={onSubmit} />;
    case "conversation":
      return <ConversationInput exercise={exercise} locked={locked} onSubmit={onSubmit} />;
    case "true-false":
      return <TrueFalseInput exercise={exercise} locked={locked} onSubmit={onSubmit} />;
    case "type":
      return <TypeInput exercise={exercise} locked={locked} onSubmit={onSubmit} />;
    case "match":
      return <MatchInput exercise={exercise} locked={locked} onSubmit={onSubmit} />;
    case "order":
      return <OrderInput exercise={exercise} locked={locked} onSubmit={onSubmit} />;
  }
}

/**
 * One exercise with immediate feedback. Reports the FIRST attempt via
 * `onFirstAnswer` (that's what counts for the score); the learner may retry
 * as many times as they like afterwards.
 */
export function ExerciseCard({
  exercise,
  onFirstAnswer,
  onNext,
  nextLabel = "ข้อต่อไป",
  header,
}: {
  exercise: Exercise;
  onFirstAnswer: (correct: boolean) => void;
  onNext: () => void;
  nextLabel?: string;
  header?: React.ReactNode;
}) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ correct: boolean; label: string } | null>(null);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000));

  const submit = (correct: boolean, label: string) => {
    if (result) return;
    setResult({ correct, label });
    if (attempt === 0) onFirstAnswer(correct);
  };
  const retry = () => {
    setResult(null);
    setAttempt((a) => a + 1);
  };

  return (
    <Card className="p-5 md:p-7 animate-fade-up">
      <div className="flex items-center justify-between gap-2 mb-3">
        <Badge tone="beige">{EXERCISE_TYPE_LABEL[exercise.type]}</Badge>
        {header}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-4">{exercise.question}</h3>

      <ExerciseInput key={`${exercise.id}-${attempt}`} exercise={exercise} locked={Boolean(result)} onSubmit={submit} />

      {result && (
        <div
          role="status"
          aria-live="polite"
          className={cx(
            "mt-5 rounded-2xl p-4 animate-pop",
            result.correct ? "bg-matcha-soft text-matcha-deep" : "bg-danger-soft text-danger",
          )}
        >
          <p className="font-bold text-base">{(result.correct ? PRAISE : ENCOURAGE)[(seed + attempt) % (result.correct ? PRAISE.length : ENCOURAGE.length)]}</p>
          {!result.correct && (
            <p className="mt-1 text-ink">
              คำตอบที่ถูกคือ: <strong className="jp" lang="ja">{correctAnswerLabel(exercise)}</strong>
            </p>
          )}
          <p className="mt-1.5 text-sm text-ink">💡 {exercise.explanation}</p>
          {!result.correct && attempt === 0 && exercise.reviewKey && (
            <p className="mt-1.5 text-xs text-ink-soft">คำนี้จะถูกเพิ่มเข้า “คิวทบทวน” ให้อัตโนมัติ เพื่อให้ได้ฝึกซ้ำภายหลัง</p>
          )}
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            {!result.correct && (
              <Button
                variant="secondary"
                onClick={() => {
                  setSeed((s) => s + 1);
                  retry();
                }}
              >
                <RotateCcw size={16} /> ลองอีกครั้ง
              </Button>
            )}
            <Button onClick={onNext} autoFocus>
              {nextLabel} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
