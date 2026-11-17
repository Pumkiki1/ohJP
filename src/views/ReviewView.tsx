"use client";

import { ArrowLeft, BookOpen, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { todayISO } from "@/lib/date";
import { useStudyTimer, useToday } from "@/lib/hooks";
import { finishStudySession, MASTERED_STAGE, REVIEW_INTERVALS, reviewAnswer } from "@/lib/progress/actions";
import { updateProgress, useProgress } from "@/lib/progress/store";
import { dueReviewItems, upcomingReviewItems, weakItems } from "@/lib/progress/stats";
import { reviewExercise } from "@/lib/quiz";
import type { Exercise } from "@/lib/types";
import { Badge, Button, ButtonLink, Card, CardTitle, EmptyState, PageHeader, PageSkeleton } from "@/components/ui";
import { ExerciseRunner } from "@/components/exercises/ExerciseRunner";
import { AudioUnavailableNote } from "@/components/learning/AudioButton";
import { ReviewQueue } from "@/components/learning/ReviewQueue";

const SESSION_SIZE = 15;

export function ReviewView() {
  const progress = useProgress();
  const today = useToday();
  const [session, setSession] = useState<{ exercises: Exercise[]; keys: Record<string, string> } | null>(null);
  useStudyTimer(Boolean(session));
  if (!progress || !today) return <PageSkeleton />;

  const due = dueReviewItems(progress, today);
  const upcoming = upcomingReviewItems(progress, today);
  const weak = weakItems(progress);
  const mastered = Object.values(progress.reviewItems).filter((i) => i.stage >= MASTERED_STAGE).length;

  const start = (keys: string[]) => {
    const exercises: Exercise[] = [];
    const map: Record<string, string> = {};
    keys.slice(0, SESSION_SIZE).forEach((k, idx) => {
      const ex = reviewExercise(k, idx);
      if (ex) {
        exercises.push(ex);
        map[ex.id] = k;
      }
    });
    setSession({ exercises, keys: map });
  };

  if (session) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <Button variant="ghost" size="sm" onClick={() => setSession(null)}>
          <ArrowLeft size={16} /> กลับหน้าทบทวน
        </Button>
        <h1 className="text-2xl font-bold">🔁 ทบทวนคำที่ยังจำไม่ได้</h1>
        <AudioUnavailableNote />
        <ExerciseRunner
          exercises={session.exercises}
          onAnswer={(ex, correct) => {
            const key = session.keys[ex.id];
            if (key) updateProgress((p) => reviewAnswer(p, key, correct, todayISO()));
          }}
          onFinish={() => updateProgress((p) => finishStudySession(p, todayISO()))}
          finishSlot={
            <Button onClick={() => setSession(null)}>
              <RotateCcw size={16} /> กลับหน้าทบทวน
            </Button>
          }
        />
        <p className="text-xs text-ink-soft text-center">
          ตอบถูก → เลื่อนไปทบทวนรอบถัดไป (1 → 3 → 7 → 14 → 30 วัน) · ตอบผิด → กลับมาทบทวนใหม่วันนี้
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader icon="🔁" title="ทบทวน" subtitle="ระบบทบทวนแบบเว้นระยะ: คำที่ตอบผิดบ่อยจะได้ทบทวนก่อน" />

      <Card className="p-5 md:p-6 bg-sakura-soft/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-ink-soft">ถึงรอบทบทวนวันนี้</p>
            <p className="text-4xl font-bold">{due.length} รายการ</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge tone="danger">ยังจำไม่ได้ {weak.length}</Badge>
              <Badge tone="beige">รอรอบถัดไป {upcoming.length}</Badge>
              <Badge tone="matcha">จำได้แล้ว {mastered}</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button size="lg" onClick={() => start(due.map((d) => d.key))} disabled={!due.length}>
              <RotateCcw size={18} /> ทบทวนคำที่ยังจำไม่ได้
            </Button>
            {!due.length && (upcoming.length > 0 || weak.length > 0) && (
              <Button variant="secondary" onClick={() => start([...weak, ...upcoming].map((d) => d.key))}>
                <Sparkles size={16} /> ทบทวนล่วงหน้า
              </Button>
            )}
          </div>
        </div>
        {due.length > SESSION_SIZE && <p className="mt-3 text-xs text-ink-soft">ทบทวนครั้งละ {SESSION_SIZE} ข้อ เพื่อไม่ให้หนักเกินไป</p>}
      </Card>

      {!due.length && !upcoming.length ? (
        <Card>
          <EmptyState icon="🍵" title="ยังไม่มีคำในคิวทบทวน">
            เมื่อเรียนจบบทเรียนหรือตอบผิดในแบบฝึกหัด คำต่าง ๆ จะเข้ามาอยู่ที่นี่โดยอัตโนมัติ
          </EmptyState>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card className="p-5">
            <CardTitle icon={<RotateCcw size={18} />}>ถึงรอบแล้ว (เรียงจากที่ผิดบ่อย)</CardTitle>
            <ReviewQueue items={due.slice(0, 30)} today={today} emptyText="ไม่มีรายการที่ถึงรอบ เยี่ยมมาก! 🎉" />
          </Card>
          <Card className="p-5">
            <CardTitle icon={<BookOpen size={18} />}>รอบทบทวนถัดไป</CardTitle>
            <ReviewQueue items={upcoming.slice(0, 30)} today={today} emptyText="ยังไม่มีรายการ" />
          </Card>
        </div>
      )}

      <Card className="p-5 text-sm text-ink-soft space-y-2">
        <p className="font-semibold text-ink">ระบบทบทวนทำงานอย่างไร?</p>
        <p>
          ทุกคำมี “ระดับความจำ” {REVIEW_INTERVALS.length} ขั้น: ทบทวนวันนี้ → อีก 1 วัน → 3 วัน → 7 วัน → 14 วัน → 30 วัน ตอบถูกจะเลื่อนขั้น
          ตอบผิดจะกลับไปเริ่มใหม่ (ไม่เป็นไรเลย นี่คือวิธีที่สมองจำได้ดีที่สุด)
        </p>
        <p>
          อยากทบทวนทั้งบทเรียน? เปิด{" "}
          <Link href="/lessons" className="text-sakura-deep font-semibold underline underline-offset-2">
            แผนการเรียน
          </Link>{" "}
          แล้วเลือกบทที่เรียนแล้วได้เสมอ (ความก้าวหน้าเดิมไม่หาย)
        </p>
        <ButtonLink href="/practice" variant="secondary" size="sm">
          ไปฝึกแบบฝึกหัดเพิ่ม
        </ButtonLink>
      </Card>
    </div>
  );
}
