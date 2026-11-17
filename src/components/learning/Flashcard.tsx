"use client";

import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button, cx, JP } from "@/components/ui";
import { AudioButton } from "./AudioButton";

export interface FlashcardItem {
  id: string;
  front: string;
  audio?: string;
  back: ReactNode;
}

/** Tap-to-flip flashcard deck. Front is Japanese; back shows reading & meaning. */
export function Flashcard({ items, onKnown }: { items: FlashcardItem[]; onKnown?: (id: string, known: boolean) => void }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  if (!items.length) return null;
  const item = items[i % items.length];
  const go = (d: number) => {
    setFlipped(false);
    setI((x) => (x + d + items.length) % items.length);
  };
  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-ink-soft">
        การ์ด {(i % items.length) + 1} / {items.length} · แตะการ์ดเพื่อพลิก
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cx(
          "w-full min-h-64 rounded-3xl border border-line shadow-soft p-6 flex flex-col items-center justify-center gap-3 transition-colors",
          flipped ? "bg-matcha-soft/60" : "bg-surface sakura-dots",
        )}
        aria-label={flipped ? "ด้านหลังการ์ด แตะเพื่อพลิกกลับ" : "ด้านหน้าการ์ด แตะเพื่อดูคำตอบ"}
      >
        <JP className={cx("kana-display leading-none", item.front.length <= 2 ? "text-8xl" : "text-5xl")}>{item.front}</JP>
        {flipped ? <div className="animate-pop text-center">{item.back}</div> : <span className="text-sm text-ink-soft">นึกคำตอบในใจก่อน แล้วแตะเพื่อเฉลย</span>}
      </button>
      <div className="flex items-center justify-between gap-2">
        <Button variant="secondary" onClick={() => go(-1)} aria-label="การ์ดก่อนหน้า">
          <ChevronLeft size={18} />
        </Button>
        {item.audio && <AudioButton text={item.audio} withSlow />}
        {onKnown && flipped ? (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onKnown(item.id, false);
                go(1);
              }}
            >
              <RefreshCw size={14} /> ยังจำไม่ได้
            </Button>
            <Button
              variant="matcha"
              size="sm"
              onClick={() => {
                onKnown(item.id, true);
                go(1);
              }}
            >
              จำได้แล้ว
            </Button>
          </div>
        ) : (
          <span />
        )}
        <Button variant="secondary" onClick={() => go(1)} aria-label="การ์ดถัดไป">
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}
