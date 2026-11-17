"use client";

import { Check, Heart } from "lucide-react";
import type { Vocabulary } from "@/lib/types";
import { categoryLabel } from "@/data/vocabulary";
import { Badge, cx, JP } from "@/components/ui";
import { AudioButton } from "./AudioButton";

const politenessLabel = { polite: "สุภาพ", casual: "กันเอง", neutral: "ทั่วไป" } as const;

export function VocabularyCard({
  word,
  favorite,
  learned,
  onToggleFavorite,
  onToggleLearned,
}: {
  word: Vocabulary;
  favorite: boolean;
  learned: boolean;
  onToggleFavorite: () => void;
  onToggleLearned: () => void;
}) {
  return (
    <article className="print-break rounded-3xl border border-line bg-surface p-4 shadow-soft flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <AudioButton text={word.hiragana ?? word.japanese} withSlow className="mt-1" />
        <div className="min-w-0 flex-1">
          <JP className="text-2xl font-medium break-words">{word.japanese}</JP>
          {word.hiragana && <JP className="block text-sm text-ink-soft">{word.hiragana}</JP>}
          <p className="text-sm text-ink-soft">
            {word.romaji} · <span className="text-ink">“{word.thaiPronunciation}”</span>
          </p>
        </div>
        <div className="flex flex-col gap-1 no-print">
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-pressed={favorite}
            aria-label={favorite ? "เอาออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
            className={cx("w-9 h-9 grid place-items-center rounded-full transition", favorite ? "bg-sakura-soft text-sakura-deep" : "text-ink-soft hover:bg-surface-2")}
          >
            <Heart size={18} fill={favorite ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            onClick={onToggleLearned}
            aria-pressed={learned}
            aria-label={learned ? "ทำเครื่องหมายว่ายังไม่ได้เรียน" : "ทำเครื่องหมายว่าเรียนแล้ว"}
            className={cx("w-9 h-9 grid place-items-center rounded-full transition", learned ? "bg-matcha-soft text-matcha-deep" : "text-ink-soft hover:bg-surface-2")}
          >
            <Check size={18} />
          </button>
        </div>
      </div>
      <p className="text-[16px] font-semibold text-sakura-deep">{word.meaning}</p>
      {word.example && (
        <div className="rounded-2xl bg-surface-2/60 px-3 py-2 text-sm">
          <div className="flex items-center gap-2">
            <JP className="text-base">{word.example.japanese}</JP>
            <AudioButton text={word.example.japanese} size="sm" />
          </div>
          <p className="text-xs text-ink-soft">{word.example.romaji}</p>
          <p className="text-xs">{word.example.thai}</p>
        </div>
      )}
      {word.note && <p className="text-xs text-ink-soft">ℹ️ {word.note}</p>}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        <Badge tone="beige">{categoryLabel(word.category)}</Badge>
        {word.politeness && <Badge tone={word.politeness === "polite" ? "matcha" : "sakura"}>{politenessLabel[word.politeness]}</Badge>}
        {learned && <Badge tone="matcha">เรียนแล้ว</Badge>}
      </div>
    </article>
  );
}
