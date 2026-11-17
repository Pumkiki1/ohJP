"use client";

import { addDays, dayOfWeek, formatThaiWeekday, startOfWeek } from "@/lib/date";
import type { Progress } from "@/lib/types";
import { minutesOn } from "@/lib/progress/stats";
import { cx } from "@/components/ui";

/** Monday–Sunday strip showing which days the learner studied. */
export function DailyCalendar({ progress, today }: { progress: Progress; today: string }) {
  const start = startOfWeek(today);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const studied = new Set(progress.studyDates);
  return (
    <ol className="grid grid-cols-7 gap-1.5" aria-label="ปฏิทินการเรียนสัปดาห์นี้">
      {days.map((d) => {
        const done = studied.has(d);
        const isToday = d === today;
        const mins = minutesOn(progress, d);
        return (
          <li key={d} className="flex flex-col items-center gap-1">
            <span className={cx("text-xs", isToday ? "font-bold text-sakura-deep" : "text-ink-soft")}>{formatThaiWeekday(d, "narrow")}</span>
            <span
              className={cx(
                "w-9 h-9 md:w-10 md:h-10 rounded-full grid place-items-center text-sm font-semibold",
                done ? "bg-matcha text-[#24331a]" : isToday ? "border-2 border-sakura-deep text-sakura-deep" : d > today ? "bg-surface-2/50 text-ink-soft/60" : "bg-surface-2 text-ink-soft",
              )}
              title={`${d}${mins ? ` · ${mins} นาที` : ""}`}
              aria-label={`${formatThaiWeekday(d)} ${done ? "เรียนแล้ว" : "ยังไม่ได้เรียน"}`}
            >
              {done ? "✓" : Number(d.slice(8))}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Month heatmap for the progress page */
export function MonthHeatmap({ progress, monthKey }: { progress: Progress; monthKey: string }) {
  const first = `${monthKey}-01`;
  const [y, m] = monthKey.split("-").map(Number);
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const lead = (dayOfWeek(first) + 6) % 7; // Monday-first
  const cells: (string | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => addDays(first, i))];
  const weekdays = Array.from({ length: 7 }, (_, i) => formatThaiWeekday(addDays(startOfWeek(first), i), "narrow"));
  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5 mb-1">
        {weekdays.map((w, i) => (
          <span key={i} className="text-center text-xs text-ink-soft">
            {w}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const mins = minutesOn(progress, d);
          const level = mins === 0 ? 0 : mins < 10 ? 1 : mins < 20 ? 2 : 3;
          return (
            <span
              key={d}
              title={`${d}: ${mins} นาที`}
              className={cx(
                "aspect-square rounded-lg grid place-items-center text-[11px]",
                level === 0 && "bg-surface-2 text-ink-soft",
                level === 1 && "bg-matcha-soft text-matcha-deep",
                level === 2 && "bg-matcha/70 text-[#24331a]",
                level === 3 && "bg-matcha text-[#24331a] font-semibold",
              )}
            >
              {Number(d.slice(8))}
            </span>
          );
        })}
      </div>
    </div>
  );
}
