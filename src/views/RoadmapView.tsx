"use client";

import { ChevronDown } from "lucide-react";
import { AUTHORED_COUNT, getPhase, PHASES, SCHEDULE, TOTAL_DAYS, TRIP_END, TRIP_START } from "@/data/curriculum";
import { formatThaiDate } from "@/lib/date";
import { useProgress } from "@/lib/progress/store";
import { isCompleted, isUnlocked, nextLessonDay } from "@/lib/progress/stats";
import { Badge, Card, cx, PageHeader, PageSkeleton, ProgressBar } from "@/components/ui";
import { LessonCard, type LessonStatus } from "@/components/learning/LessonCard";

export function RoadmapView() {
  const progress = useProgress();
  if (!progress) return <PageSkeleton />;
  const next = nextLessonDay(progress);
  const currentPhase = SCHEDULE[next - 1]?.phase ?? 1;

  return (
    <div>
      <PageHeader note="เส้นทาง 342 วัน สู่โทจิงิ 🗾"
        icon="🗺️"
        title="แผนการเรียน"
        subtitle={`${TOTAL_DAYS} บทเรียน วันละ 20 นาที · ${formatThaiDate(SCHEDULE[0].date)} → ทริปโทจิงิ ${formatThaiDate(TRIP_START, { day: "numeric", month: "short" })}–${formatThaiDate(TRIP_END)}`}
      />
      <Card className="p-4 mb-6 text-sm text-ink-soft">
        📚 บทเรียนเปิดตามลำดับ — ถ้าหยุดไปหลายวัน ไม่ต้องตามเรียนย้อนทุกวัน แค่เรียนบทถัดไปต่อได้เลย · เนื้อหาเต็มพร้อมแล้ว {AUTHORED_COUNT} บทแรก
        บทที่เหลือมีแผนการเรียนครบ และจะเพิ่มเนื้อหาให้ตามลำดับ
      </Card>
      <div className="space-y-4">
        {PHASES.map((phase) => {
          const lessons = SCHEDULE.filter((l) => l.phase === phase.id);
          if (!lessons.length) return null;
          const done = lessons.filter((l) => isCompleted(progress, l.dayNumber)).length;
          const open = phase.id === currentPhase;
          return (
            <details key={phase.id} open={open} className="group rounded-3xl bg-surface border border-line shadow-soft">
              <summary className="cursor-pointer list-none p-4 md:p-5 flex items-center gap-4">
                <span
                  className={cx(
                    "w-12 h-12 shrink-0 rounded-2xl grid place-items-center font-bold text-lg",
                    phase.color === "sakura" ? "bg-sakura-soft text-sakura-deep" : phase.color === "matcha" ? "bg-matcha-soft text-matcha-deep" : "bg-surface-2",
                  )}
                >
                  {phase.id}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-ink-soft">{phase.month}</p>
                  <p className="font-semibold">{phase.title}</p>
                  <p className="text-sm text-ink-soft truncate">{phase.objective}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <ProgressBar value={done} max={lessons.length} size="sm" tone="matcha" label={`เฟส ${phase.id}`} />
                    <span className="text-xs text-ink-soft whitespace-nowrap">
                      {done}/{lessons.length}
                    </span>
                  </div>
                </div>
                {open && <Badge tone="sakura">กำลังเรียน</Badge>}
                <ChevronDown className="shrink-0 transition group-open:rotate-180 text-ink-soft" />
              </summary>
              <div className="px-4 pb-4 md:px-5 md:pb-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {phase.topics.map((t) => (
                    <Badge key={t} tone="beige">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lessons.map((l) => {
                    const status: LessonStatus = isCompleted(progress, l.dayNumber)
                      ? "completed"
                      : progress.drafts[l.dayNumber]
                        ? "in-progress"
                        : isUnlocked(progress, l.dayNumber)
                          ? "available"
                          : "locked";
                    const r = progress.completedLessons[l.dayNumber];
                    return <LessonCard key={l.dayNumber} lesson={l} status={status} score={r ? `${r.score}/${r.total}` : undefined} />;
                  })}
                </div>
              </div>
            </details>
          );
        })}
      </div>
      <p className="mt-6 text-xs text-ink-soft">
        เป้าหมาย: ภาษาญี่ปุ่นพื้นฐานที่ใช้งานได้จริงระหว่างเที่ยว (ใกล้เคียงพื้นฐาน JLPT N5) — ไม่ใช่การรับรองผลสอบหรือความคล่องระดับเจ้าของภาษา · เฟส{" "}
        {getPhase(currentPhase).id} คือเฟสปัจจุบัน
      </p>
    </div>
  );
}
