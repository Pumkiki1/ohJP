"use client";

import { Snail, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { speakJapanese, useSpeechStatus } from "@/lib/hooks";
import { cx } from "@/components/ui";

const NO_AUDIO = "เบราว์เซอร์/อุปกรณ์นี้ไม่มีเสียงภาษาญี่ปุ่น — อ่านจากโรมาจิแทนได้";

export function AudioButton({
  text,
  size = "md",
  withSlow = false,
  label,
  className,
}: {
  text: string;
  size?: "sm" | "md" | "lg";
  withSlow?: boolean;
  label?: string;
  className?: string;
}) {
  const status = useSpeechStatus();
  const [playing, setPlaying] = useState<"normal" | "slow" | null>(null);
  const dim = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-14 h-14" : "w-10 h-10";
  const icon = size === "sm" ? 16 : size === "lg" ? 26 : 20;

  if (status !== "ready") {
    return (
      <span
        className={cx(dim, "inline-grid place-items-center rounded-full bg-surface-2 text-ink-soft/70 shrink-0", className)}
        title={status === "loading" ? "กำลังเตรียมเสียง…" : NO_AUDIO}
        aria-label={status === "loading" ? "กำลังเตรียมเสียง" : NO_AUDIO}
        role="img"
      >
        <VolumeX size={icon - 2} aria-hidden />
      </span>
    );
  }

  const play = (slow: boolean) => {
    setPlaying(slow ? "slow" : "normal");
    const ok = speakJapanese(text, { slow, onEnd: () => setPlaying(null) });
    if (!ok) setPlaying(null);
  };

  return (
    <span className={cx("inline-flex items-center gap-1 shrink-0", className)}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          play(false);
        }}
        className={cx(
          dim,
          "inline-grid place-items-center rounded-full bg-sakura-soft text-sakura-deep hover:brightness-95 transition",
          playing === "normal" && "ring-2 ring-sakura animate-pulse",
        )}
        aria-label={label ?? `ฟังเสียง: ${text}`}
        title="ฟังเสียง (กดซ้ำเพื่อฟังอีกครั้ง)"
      >
        <Volume2 size={icon} aria-hidden />
      </button>
      {withSlow && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            play(true);
          }}
          className={cx(
            size === "lg" ? "w-11 h-11" : "w-8 h-8",
            "inline-grid place-items-center rounded-full bg-surface-2 text-ink-soft hover:text-ink transition",
            playing === "slow" && "ring-2 ring-matcha animate-pulse",
          )}
          aria-label={`ฟังช้า ๆ: ${text}`}
          title="ฟังช้า ๆ"
        >
          <Snail size={size === "lg" ? 20 : 15} aria-hidden />
        </button>
      )}
    </span>
  );
}

/** Small inline notice shown where listening matters and audio is unavailable. */
export function AudioUnavailableNote() {
  const status = useSpeechStatus();
  if (status === "ready" || status === "loading") return null;
  return (
    <p className="text-xs text-ink-soft bg-surface-2 rounded-xl px-3 py-2">
      🔇 {status === "unsupported" ? "เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง" : "ไม่พบเสียงภาษาญี่ปุ่น (ja-JP) ในอุปกรณ์นี้"} — ใช้โรมาจิและคำอ่านภาษาไทยแทนได้
      (บน Windows/Android ติดตั้งเสียงภาษาญี่ปุ่นได้ในการตั้งค่าภาษา)
    </p>
  );
}
