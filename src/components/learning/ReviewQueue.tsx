"use client";

import { CalendarClock } from "lucide-react";
import { formatThaiDate } from "@/lib/date";
import type { ReviewItem } from "@/lib/types";
import { reviewKeyLabel } from "@/lib/quiz";
import { REVIEW_INTERVALS } from "@/lib/progress/actions";
import { Badge, JP } from "@/components/ui";

const STAGE_LABEL = ["วันนี้", "1 วัน", "3 วัน", "7 วัน", "14 วัน", "30 วัน", "จำได้แล้ว"];

export function StageDots({ stage }: { stage: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`ระดับความจำ ${stage}/${REVIEW_INTERVALS.length}`}>
      {REVIEW_INTERVALS.map((_, i) => (
        <span key={i} className={`w-1.5 h-3 rounded-full ${i < stage ? "bg-matcha" : "bg-surface-2"}`} />
      ))}
    </span>
  );
}

/** List of review items with their spaced-repetition stage and next due date. */
export function ReviewQueue({ items, today, emptyText }: { items: ReviewItem[]; today: string; emptyText: string }) {
  if (!items.length) return <p className="text-sm text-ink-soft py-3">{emptyText}</p>;
  return (
    <ul className="divide-y divide-line">
      {items.map((i) => (
        <li key={i.key} className="py-2.5 flex items-center gap-3">
          <JP className="flex-1 min-w-0 truncate">{reviewKeyLabel(i.key)}</JP>
          {i.wrongCount > 0 && <Badge tone="danger">ผิด {i.wrongCount}</Badge>}
          <StageDots stage={i.stage} />
          <span className="text-xs text-ink-soft w-24 text-right inline-flex items-center justify-end gap-1">
            <CalendarClock size={12} />
            {i.due <= today ? "ถึงรอบแล้ว" : formatThaiDate(i.due, { day: "numeric", month: "short" })}
          </span>
        </li>
      ))}
    </ul>
  );
}

export { STAGE_LABEL };
