"use client";

import { Check } from "lucide-react";
import type { KanaChar } from "@/lib/types";
import { cx, JP } from "@/components/ui";

const VOWEL_ORDER = ["a", "i", "u", "e", "o"];

function vowelOf(k: KanaChar): string {
  const r = k.romaji.replace(/\s*\(.*\)/, "");
  if (k.char === "ん" || k.char === "ン") return "n";
  return r.slice(-1);
}

/**
 * Grid of kana. Basic rows are laid out in the traditional a-i-u-e-o columns
 * (with gaps for や/わ rows); other groups are a simple wrapping grid.
 */
export function KanaGrid({
  chars,
  learned,
  onSelect,
  selected,
  layout = "gojuon",
}: {
  chars: KanaChar[];
  learned: (char: string) => boolean;
  onSelect: (k: KanaChar) => void;
  selected?: string | null;
  layout?: "gojuon" | "flow";
}) {
  const cell = (k: KanaChar | null, key: string) =>
    k ? (
      <button
        key={key}
        type="button"
        onClick={() => onSelect(k)}
        aria-pressed={selected === k.char}
        aria-label={`${k.char} อ่านว่า ${k.romaji}${learned(k.char) ? " (เรียนแล้ว)" : ""}`}
        className={cx(
          "relative rounded-2xl border p-2 pt-3 flex flex-col items-center transition hover:-translate-y-0.5",
          selected === k.char ? "border-sakura-deep bg-sakura-soft" : learned(k.char) ? "border-matcha/70 bg-matcha-soft/50" : "border-line bg-surface",
        )}
      >
        {learned(k.char) && <Check className="absolute top-1 right-1 text-matcha-deep" size={14} aria-hidden />}
        <JP className={cx("kana-display leading-none", k.char.length > 1 ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl")}>{k.char}</JP>
        <span className="text-xs text-ink-soft mt-1">{k.romaji.replace(/\s*\(.*\)/, "")}</span>
      </button>
    ) : (
      <div key={key} aria-hidden />
    );

  if (layout === "flow") {
    return (
      <div className={cx("grid gap-2", chars[0]?.group === "combo" ? "grid-cols-3 max-w-md" : "grid-cols-3 sm:grid-cols-5")}>
        {chars.map((k) => cell(k, k.char))}
      </div>
    );
  }

  const rows = new Map<string, KanaChar[]>();
  chars.forEach((k) => rows.set(k.row, [...(rows.get(k.row) ?? []), k]));
  return (
    <div className="space-y-2">
      {Array.from(rows.entries()).map(([row, list]) => {
        const special = row === "wa";
        const slots: (KanaChar | null)[] = special
          ? [list[0] ?? null, null, null, null, list[1] ?? null]
          : VOWEL_ORDER.map((v) => list.find((k) => vowelOf(k) === v) ?? null);
        const n = special ? list.find((k) => vowelOf(k) === "n") : undefined;
        return (
          <div key={row}>
            <div className="grid grid-cols-5 gap-2">{slots.map((k, i) => cell(k, `${row}-${i}`))}</div>
            {n && <div className="grid grid-cols-5 gap-2 mt-2">{cell(n, `${row}-n`)}</div>}
          </div>
        );
      })}
    </div>
  );
}
