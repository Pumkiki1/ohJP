"use client";

import { CheckCircle2, Clock, Lock, PlayCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ScheduledLesson } from "@/lib/types";
import { formatThaiDate } from "@/lib/date";
import { Badge, cx } from "@/components/ui";

export type LessonStatus = "completed" | "in-progress" | "available" | "locked";

const statusMeta: Record<LessonStatus, { label: string; tone: "matcha" | "sakura" | "beige" | "neutral"; icon: typeof Lock }> = {
  completed: { label: "เรียนแล้ว", tone: "matcha", icon: CheckCircle2 },
  "in-progress": { label: "เรียนค้างไว้", tone: "sakura", icon: PlayCircle },
  available: { label: "พร้อมเรียน", tone: "sakura", icon: Sparkles },
  locked: { label: "ยังล็อกอยู่", tone: "neutral", icon: Lock },
};

export function LessonCard({ lesson, status, score, compact }: { lesson: ScheduledLesson; status: LessonStatus; score?: string; compact?: boolean }) {
  const meta = statusMeta[status];
  const Icon = meta.icon;
  const content = (
    <div
      className={cx(
        "rounded-2xl border p-3.5 flex items-center gap-3 transition h-full",
        status === "locked" ? "border-line bg-surface/50 opacity-75" : "border-line bg-surface hover:border-sakura hover:shadow-soft",
        (status === "available" || status === "in-progress") && "ring-2 ring-sakura/60",
      )}
    >
      <div
        className={cx(
          "w-12 h-12 shrink-0 rounded-2xl grid place-items-center text-center leading-none",
          status === "completed" ? "bg-matcha-soft text-matcha-deep" : status === "locked" ? "bg-surface-2 text-ink-soft" : "bg-sakura-soft text-sakura-deep",
        )}
      >
        <span className="text-[10px] font-semibold">DAY</span>
        <span className="text-lg font-bold">{lesson.dayNumber}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold truncate">{lesson.title}</p>
        {!compact && <p className="text-xs text-ink-soft truncate">{lesson.subtitle}</p>}
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
          <Badge tone={meta.tone}>
            <Icon size={12} /> {meta.label}
          </Badge>
          {!lesson.authored && <Badge tone="beige">กำลังจัดทำเนื้อหา</Badge>}
          {score && <Badge tone="matcha">คะแนน {score}</Badge>}
          {!compact && (
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> {lesson.estimatedMinutes} นาที · {formatThaiDate(lesson.date, { day: "numeric", month: "short" })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
  if (status === "locked") return <div aria-label={`Day ${lesson.dayNumber} ยังล็อกอยู่`}>{content}</div>;
  return (
    <Link href={`/lessons/${lesson.dayNumber}`} className="block rounded-2xl">
      {content}
    </Link>
  );
}
