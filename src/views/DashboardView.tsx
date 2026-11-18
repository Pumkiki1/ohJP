"use client";

import { ArrowRight, BellRing, BookOpen, CalendarDays, Clock, Flame, Plane, RotateCcw, Target, Trophy } from "lucide-react";
import Link from "next/link";
import { getPhase, getScheduled, SCHEDULE, TOTAL_DAYS, TRIP_START } from "@/data/curriculum";
import { diffDays, formatThaiDate } from "@/lib/date";
import { useToday } from "@/lib/hooks";
import { useProgress } from "@/lib/progress/store";
import {
  calendarDay,
  completedCount,
  currentStreak,
  dueReviewItems,
  isCompleted,
  lessonCompletedToday,
  levelLabel,
  minutesOn,
  nextLessonDay,
  totalStudyMinutes,
} from "@/lib/progress/stats";
import { Badge, ButtonLink, Card, CardTitle, HandNote, JP, PageSkeleton, ProgressBar, ProgressRing, TitleBlock } from "@/components/ui";
import { TochigiSketch } from "@/components/illustrations/TochigiSketch";
import { DailyCalendar } from "@/components/learning/DailyCalendar";
import { LessonCard } from "@/components/learning/LessonCard";

const MESSAGES = [
  "ทีละนิดก็ไปถึงได้ — วันละ 20 นาทีพอแล้ว 🍵",
  "ทุกตัวอักษรที่จำได้ คือก้าวหนึ่งสู่โทจิงิ 🍁",
  "ไม่ต้องรีบ ไม่ต้องเพอร์เฟกต์ แค่มาเรียนต่อก็เก่งแล้ว 🌸",
  "หยุดไปบ้างไม่เป็นไร กลับมาเรียนต่อได้เสมอ 💮",
  "ผิดได้ เพราะกำลังเรียนรู้ ✨",
  "นึกภาพตัวเองสั่งโซบะที่นิกโก้เป็นภาษาญี่ปุ่นสิ! 🍜",
];

function greeting() {
  const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Bangkok" }).format(new Date()));
  if (h < 11) return { jp: "おはようございます!", th: "อรุณสวัสดิ์" };
  if (h < 17) return { jp: "こんにちは!", th: "สวัสดี" };
  return { jp: "こんばんは!", th: "สวัสดีตอนเย็น" };
}

export function DashboardView() {
  const progress = useProgress();
  const today = useToday();
  if (!progress || !today) return <PageSkeleton />;

  const next = nextLessonDay(progress);
  const doneToday = lessonCompletedToday(progress, today);
  const focusDay = doneToday ?? next;
  const focus = getScheduled(focusDay)!;
  const draft = progress.drafts[focusDay];
  const completedFocus = isCompleted(progress, focusDay);
  const todayMinutes = minutesOn(progress, today);
  const goal = progress.settings.dailyGoalMinutes;
  const streak = currentStreak(progress, today);
  const done = completedCount(progress);
  const due = dueReviewItems(progress, today);
  const level = levelLabel(progress);
  const phase = getPhase(getScheduled(next)?.phase ?? 1);
  const g = greeting();
  const daysToTrip = diffDays(today, TRIP_START);
  const message = MESSAGES[calendarDay(today) % MESSAGES.length];
  const upcoming = SCHEDULE.slice(next, next + 4);
  const studiedToday = progress.studyDates.includes(today);
  const reminder = progress.settings.reminderTime;
  const nowHM = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Bangkok" }).format(new Date());
  const showReminder = reminder && !studiedToday && nowHM >= reminder;

  const status = completedFocus ? "เรียนแล้ว ✓" : draft ? "เรียนค้างไว้" : "ยังไม่เริ่ม";
  const cta = completedFocus ? "ทบทวนบทเรียน" : draft ? "เรียนต่อจากที่ค้างไว้" : "เริ่มเรียนวันนี้";

  return (
    <div className="space-y-6">
      {/* Greeting — sketchbook hero */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-6 lg:gap-8 items-center">
        <div>
          <HandNote className="text-lg md:text-xl">ร่างไว้ทีละนิด วันละ 20 นาที ✏️</HandNote>
          <p className="mt-2 text-sm text-ink-soft">
            <CalendarDays size={14} className="inline -mt-0.5 mr-1" />
            {formatThaiDate(today, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
          <h1 className="mt-1 text-3xl md:text-4xl font-bold leading-tight">
            <JP className="font-[family-name:var(--font-display)]">{g.jp}</JP>
            <br />
            วันนี้มา<span className="squiggle text-sakura-deep">เรียนญี่ปุ่น</span>
            <span className="whitespace-nowrap">กันเถอะ 🌸</span>
          </h1>
          <p className="mt-3 text-ink-soft text-[15px]">{message}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="sakura">
              <BookOpen size={12} /> บทเรียน Day {next}
            </Badge>
            <Badge tone="matcha">
              <Target size={12} /> ระดับ: {level.label}
            </Badge>
            <Badge tone="beige">{level.detail}</Badge>
          </div>
        </div>
        <figure className="sheet rounded-xl overflow-hidden">
          <div className="px-3 pt-3">
            <TochigiSketch className="w-full h-auto" />
          </div>
          <TitleBlock
            items={[
              { label: "โปรเจกต์", value: "ทริปโทจิงิ 🍁" },
              { label: "บทเรียน", value: `Day ${next} / ${TOTAL_DAYS}` },
              { label: "เป้าหมาย", value: `${goal} นาที/วัน` },
              { label: "ถึงทริป", value: daysToTrip > 0 ? `อีก ${daysToTrip} วัน` : "ถึงแล้ว! ✈️" },
            ]}
          />
        </figure>
      </section>

      {showReminder && (
        <div role="status" className="rounded-2xl bg-matcha-soft text-matcha-deep px-4 py-3 flex items-center gap-2">
          <BellRing size={18} /> ถึงเวลาเรียนที่ตั้งไว้ ({reminder} น.) แล้ว — วันนี้ยังไม่ได้เรียน มาเรียนสัก 20 นาทีกันนะ
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today's lesson */}
        <section className="sheet rounded-xl lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 flex-1">
          <CardTitle icon={<BookOpen size={18} />} action={<Badge tone={completedFocus ? "matcha" : draft ? "sakura" : "neutral"}>{status}</Badge>}>
            บทเรียนวันนี้
          </CardTitle>
          <p className="text-sm text-sakura-deep font-semibold">
            Day {focus.dayNumber} · เฟส {focus.phase}: {getPhase(focus.phase).title}
          </p>
          <h2 className="text-xl md:text-2xl font-bold mt-1">{focus.title}</h2>
          <p className="text-ink-soft">{focus.subtitle}</p>
          <ul className="mt-3 space-y-1 text-[15px]">
            {focus.objectives.slice(0, 3).map((o) => (
              <li key={o}>• {o}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ButtonLink href={`/lessons/${focus.dayNumber}`} size="lg">
              {completedFocus ? <RotateCcw size={18} /> : <ArrowRight size={18} />} {cta}
            </ButtonLink>
            <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
              <Clock size={14} /> ประมาณ {focus.estimatedMinutes} นาที
            </span>
          </div>
          {doneToday && next !== doneToday && (
            <p className="mt-4 text-sm text-ink-soft">
              เรียนบทของวันนี้เสร็จแล้ว 🎉 พักได้เลย หรือถ้ายังมีแรง{" "}
              <Link href={`/lessons/${next}`} className="text-sakura-deep font-semibold underline underline-offset-2">
                เรียน Day {next} ล่วงหน้า
              </Link>
            </p>
          )}
          </div>
          <TitleBlock
            items={[
              { label: "แผ่นที่", value: `Day ${focus.dayNumber}` },
              { label: "เฟส", value: `${focus.phase} · ${getPhase(focus.phase).title}` },
              { label: "เวลา", value: `~${focus.estimatedMinutes} นาที` },
              { label: "สถานะ", value: status },
            ]}
          />
        </section>

        {/* Daily goal */}
        <Card className="p-5 md:p-6 flex flex-col items-center text-center">
          <CardTitle icon={<Target size={18} />}>เป้าหมายวันนี้</CardTitle>
          <ProgressRing value={todayMinutes} max={goal} size={128} label={`เรียนวันนี้ ${todayMinutes} จาก ${goal} นาที`}>
            <div>
              <p className="text-3xl font-bold">{todayMinutes}</p>
              <p className="text-xs text-ink-soft">/ {goal} นาที</p>
            </div>
          </ProgressRing>
          <p className="mt-3 text-sm text-ink-soft">
            {todayMinutes >= goal ? "ครบเป้าหมายแล้ว! เยี่ยมมาก 🎉" : "เวลาจะนับอัตโนมัติขณะเรียนและฝึก"}
          </p>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: <Flame size={18} />, label: "เรียนต่อเนื่อง", value: `${streak} วัน` },
          { icon: <Trophy size={18} />, label: "บทเรียนที่เรียนแล้ว", value: `${done} บท` },
          { icon: <Clock size={18} />, label: "เวลาเรียนทั้งหมด", value: `${totalStudyMinutes(progress)} นาที` },
          { icon: <RotateCcw size={18} />, label: "รอทบทวนวันนี้", value: `${due.length} คำ` },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="flex items-center gap-1.5 text-sm text-ink-soft">
              <span className="text-sakura-deep">{s.icon}</span>
              {s.label}
            </p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Review CTA + week */}
        <Card className="p-5 md:p-6 space-y-4">
          <CardTitle icon={<CalendarDays size={18} />}>สัปดาห์นี้</CardTitle>
          <DailyCalendar progress={progress} today={today} />
          <div className="rounded-2xl bg-surface-2/60 p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold">ทบทวนคำที่ยังจำไม่ได้</p>
              <p className="text-sm text-ink-soft">
                {due.length ? `มี ${due.length} รายการถึงรอบทบทวนแล้ว` : "ยังไม่มีคำที่ถึงรอบทบทวน เยี่ยมมาก!"}
              </p>
            </div>
            <ButtonLink href="/review" variant={due.length ? "matcha" : "secondary"}>
              <RotateCcw size={16} /> ทบทวนคำที่ยังจำไม่ได้
            </ButtonLink>
          </div>
        </Card>

        {/* Course progress */}
        <Card className="p-5 md:p-6 space-y-4">
          <CardTitle icon={<Plane size={18} />}>เส้นทางสู่โทจิงิ 🍁</CardTitle>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span>ความคืบหน้าทั้งคอร์ส</span>
              <span className="font-semibold">
                {done}/{TOTAL_DAYS} บท
              </span>
            </div>
            <ProgressBar value={done} max={TOTAL_DAYS} label="ความคืบหน้าทั้งคอร์ส" />
          </div>
          <p className="text-sm">
            ตอนนี้อยู่ <strong>เฟส {phase.id}: {phase.title}</strong> — {phase.objective}
          </p>
          <div>
            <p className="text-sm font-semibold mb-2">หัวข้อถัดไป</p>
            <div className="space-y-2">
              {upcoming.map((l) => (
                <LessonCard key={l.dayNumber} lesson={l} status="locked" compact />
              ))}
            </div>
          </div>
          <Link href="/lessons" className="inline-flex items-center gap-1 text-sm font-semibold text-sakura-deep">
            ดูแผนการเรียนทั้งหมด <ArrowRight size={14} />
          </Link>
        </Card>
      </div>
    </div>
  );
}
