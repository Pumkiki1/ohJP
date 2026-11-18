"use client";

import { BookOpen, Clock, Flame, Target, Trophy, TrendingUp } from "lucide-react";
import { useState } from "react";
import { TOTAL_DAYS } from "@/data/curriculum";
import { addDays, formatThaiDate, formatThaiMonth, formatThaiWeekday, monthKey } from "@/lib/date";
import { useToday } from "@/lib/hooks";
import { useProgress } from "@/lib/progress/store";
import {
  completedCount,
  currentStreak,
  kanaMastery,
  longestStreak,
  minutesOn,
  nextLessonDay,
  quizAccuracy,
  totalStudyMinutes,
  vocabMastery,
  weakItems,
} from "@/lib/progress/stats";
import { reviewKeyLabel } from "@/lib/quiz";
import type { Progress } from "@/lib/types";
import { Badge, ButtonLink, Card, CardTitle, cx, JP, PageHeader, PageSkeleton, ProgressBar } from "@/components/ui";
import { MonthHeatmap } from "@/components/learning/DailyCalendar";

/** Single-series bar chart (minutes per day). One hue, values on hover + accessible table. */
function BarChart({ data, goal }: { data: { label: string; sub: string; value: number }[]; goal: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(goal, ...data.map((d) => d.value), 1);
  return (
    <figure>
      <div className="relative h-44 flex items-end gap-2 border-b border-line pt-6" aria-hidden>
        <div className="absolute inset-x-0 border-t border-dashed border-line" style={{ bottom: `${(goal / max) * 100}%` }}>
          <span className="absolute -top-5 right-0 text-[11px] text-ink-soft">เป้าหมาย {goal} นาที</span>
        </div>
        {data.map((d, i) => (
          <div
            key={d.sub}
            className="relative flex-1 h-full flex items-end justify-center"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            {hover === i && (
              <span className="absolute -top-1 z-10 whitespace-nowrap rounded-lg bg-ink text-bg text-xs px-2 py-1 shadow-soft">
                {d.sub}: {d.value} นาที
              </span>
            )}
            <div
              className={cx("w-full max-w-9 rounded-t-[4px] transition-all", d.value ? "bg-matcha-deep" : "bg-surface-2", hover === i && "brightness-110")}
              style={{ height: `${d.value ? Math.max(4, (d.value / max) * 100) : 2}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-1.5">
        {data.map((d) => (
          <span key={d.sub} className="flex-1 text-center text-xs text-ink-soft">
            {d.label}
          </span>
        ))}
      </div>
      <table className="sr-only">
        <caption>เวลาเรียนรายวัน (นาที)</caption>
        <tbody>
          {data.map((d) => (
            <tr key={d.sub}>
              <th>{d.sub}</th>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function weekData(p: Progress, today: string) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(today, i - 6);
    return { label: formatThaiWeekday(d, "short"), sub: formatThaiDate(d, { day: "numeric", month: "short" }), value: minutesOn(p, d) };
  });
}

export function ProgressView() {
  const progress = useProgress();
  const today = useToday();
  if (!progress || !today) return <PageSkeleton />;

  const done = completedCount(progress);
  const hira = kanaMastery(progress, "hiragana");
  const kata = kanaMastery(progress, "katakana");
  const vocab = vocabMastery(progress);
  const weak = weakItems(progress, 10);
  const week = weekData(progress, today);
  const weekTotal = week.reduce((a, d) => a + d.value, 0);
  const mk = monthKey(today);
  const monthDays = Object.entries(progress.studyLog).filter(([d]) => d.startsWith(mk));
  const monthMinutes = Math.round(monthDays.reduce((a, [, s]) => a + s, 0) / 60);

  const stats = [
    { icon: <Trophy size={18} />, label: "บทเรียนที่เรียนแล้ว", value: `${done}`, unit: `/ ${TOTAL_DAYS}` },
    { icon: <Flame size={18} />, label: "เรียนต่อเนื่องตอนนี้", value: `${currentStreak(progress, today)}`, unit: "วัน" },
    { icon: <TrendingUp size={18} />, label: "ต่อเนื่องนานที่สุด", value: `${longestStreak(progress)}`, unit: "วัน" },
    { icon: <Clock size={18} />, label: "เวลาเรียนทั้งหมด", value: `${totalStudyMinutes(progress)}`, unit: "นาที" },
    { icon: <Target size={18} />, label: "ความแม่นยำแบบฝึกหัด", value: `${quizAccuracy(progress)}%`, unit: `${progress.quizStats.total} ข้อ` },
    { icon: <BookOpen size={18} />, label: "บทถัดไป", value: `Day ${nextLessonDay(progress)}`, unit: "" },
  ];

  return (
    <div className="space-y-5">
      <PageHeader note="ดูสิ มาไกลแล้วนะ!" icon="📈" title="ความก้าวหน้า" subtitle="ดูว่าเรียนไปถึงไหนแล้ว และควรทบทวนอะไรต่อ" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="flex items-center gap-1.5 text-sm text-ink-soft">
              <span className="text-sakura-deep">{s.icon}</span>
              {s.label}
            </p>
            <p className="mt-1 text-2xl font-bold">
              {s.value} <span className="text-sm font-normal text-ink-soft">{s.unit}</span>
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <CardTitle icon={<Clock size={18} />} action={<Badge tone="matcha">รวม {weekTotal} นาที</Badge>}>
            เวลาเรียน 7 วันล่าสุด
          </CardTitle>
          <BarChart data={week} goal={progress.settings.dailyGoalMinutes} />
        </Card>
        <Card className="p-5">
          <CardTitle action={<Badge tone="matcha">{monthMinutes} นาที · {monthDays.length} วัน</Badge>}>{formatThaiMonth(mk)}</CardTitle>
          <div className="max-w-sm mx-auto">
            <MonthHeatmap progress={progress} monthKey={mk} />
          </div>
          <p className="mt-2 text-xs text-ink-soft">สีเข้มขึ้น = เรียนนานขึ้น (เกิน 20 นาที = เข้มสุด)</p>
        </Card>
      </div>

      <Card className="p-5 space-y-4">
        <CardTitle>ความชำนาญ</CardTitle>
        {[
          { label: "ฮิรางานะ", jp: "ひらがな", m: hira },
          { label: "คาตากานะ", jp: "カタカナ", m: kata },
          { label: "คำศัพท์", jp: "ことば", m: vocab },
        ].map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>
                {r.label} <JP className="text-ink-soft">{r.jp}</JP>
              </span>
              <span className="font-semibold">
                {r.m.learned}/{r.m.total} ({r.m.percent}%)
              </span>
            </div>
            <ProgressBar value={r.m.learned} max={r.m.total} tone="matcha" label={r.label} />
          </div>
        ))}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>ทั้งคอร์ส (ถึงทริปโทจิงิ)</span>
            <span className="font-semibold">
              {done}/{TOTAL_DAYS}
            </span>
          </div>
          <ProgressBar value={done} max={TOTAL_DAYS} label="ทั้งคอร์ส" />
        </div>
      </Card>

      <Card className="p-5">
        <CardTitle action={weak.length ? <ButtonLink href="/review" size="sm" variant="matcha">ไปทบทวน</ButtonLink> : undefined}>
          หัวข้อที่ควรฝึกเพิ่ม
        </CardTitle>
        {weak.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {weak.map((w) => (
              <li key={w.key} className="flex items-center justify-between gap-2 rounded-2xl bg-surface-2/60 px-3 py-2">
                <JP className="truncate">{reviewKeyLabel(w.key)}</JP>
                <Badge tone="danger">ผิด {w.wrongCount} ครั้ง</Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-ink-soft">ยังไม่มีจุดอ่อนที่ต้องกังวล 🌸 ทำแบบฝึกหัดต่อไปแล้วระบบจะบอกว่าควรฝึกอะไรเพิ่ม</p>
        )}
      </Card>
    </div>
  );
}
