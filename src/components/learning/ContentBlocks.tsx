"use client";

import { CheckCircle2, Info, Landmark, TriangleAlert } from "lucide-react";
import { getKana, STROKE_GUIDES } from "@/data/kana";
import type { ContentBlock } from "@/lib/types";
import { cx, JP } from "@/components/ui";
import { AudioButton } from "./AudioButton";

/** Renders authored lesson content blocks. All text comes from lesson data. */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}

function Block({ block: b }: { block: ContentBlock }) {
  switch (b.kind) {
    case "text":
      return <p className="text-[16px] leading-relaxed">{b.text}</p>;

    case "tip": {
      const tone = b.tone ?? "info";
      const Icon = tone === "warning" ? TriangleAlert : tone === "culture" ? Landmark : Info;
      return (
        <div
          className={cx(
            "rounded-2xl p-4 flex gap-3",
            tone === "warning" ? "bg-danger-soft/70" : tone === "culture" ? "bg-matcha-soft" : "bg-sakura-soft/70",
          )}
        >
          <Icon className={cx("shrink-0 mt-0.5", tone === "warning" ? "text-danger" : tone === "culture" ? "text-matcha-deep" : "text-sakura-deep")} size={20} aria-hidden />
          <div>
            {b.title && <p className="font-semibold mb-0.5">{tone === "culture" ? "🏯 " : ""}{b.title}</p>}
            <p className="text-[15px] leading-relaxed">{b.text}</p>
          </div>
        </div>
      );
    }

    case "scripts-overview":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: "ฮิรางานะ", jp: "ひらがな", ex: "あ い う え お", use: "คำญี่ปุ่นทั่วไป และคำช่วยในประโยค", tone: "bg-sakura-soft" },
            { name: "คาตากานะ", jp: "カタカナ", ex: "ア イ ウ エ オ", use: "คำที่มาจากภาษาต่างประเทศ เช่น コーヒー (กาแฟ)", tone: "bg-matcha-soft" },
            { name: "คันจิ", jp: "漢字", ex: "日本 山 水", use: "ตัวอักษรที่มีความหมายในตัว เช่น 山 = ภูเขา", tone: "bg-surface-2" },
          ].map((s) => (
            <div key={s.name} className={cx("rounded-2xl p-4", s.tone)}>
              <p className="font-semibold">
                {s.name} <JP className="text-ink-soft">({s.jp})</JP>
              </p>
              <JP className="block text-3xl my-2 kana-display">{s.ex}</JP>
              <p className="text-sm text-ink-soft">{s.use}</p>
            </div>
          ))}
        </div>
      );

    case "kana-focus":
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {b.chars.map((c) => {
            const k = getKana(c);
            if (!k) return null;
            return (
              <div key={c} className="rounded-3xl border border-line bg-surface p-4 text-center flex flex-col items-center gap-1">
                <JP className="kana-display text-6xl md:text-7xl leading-none py-2">{k.char}</JP>
                <p className="text-lg font-semibold">{k.romaji}</p>
                <p className="text-sm text-ink-soft">เสียง “{k.thai}”</p>
                <AudioButton text={k.char} size="sm" withSlow />
                {k.example && (
                  <p className="mt-1 text-xs text-ink-soft">
                    <JP className="text-sm text-ink">{k.example.word}</JP> {k.example.romaji} · {k.example.meaning}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );

    case "stroke-guide":
      return (
        <div className="rounded-2xl border border-line p-4">
          <p className="font-semibold mb-3">✍️ ลำดับการเขียน (ลองเขียนตามในอากาศหรือบนกระดาษ)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {b.chars.map((c) => {
              const g = STROKE_GUIDES[c];
              if (!g) return null;
              return (
                <div key={c} className="flex gap-3 rounded-2xl bg-surface-2/60 p-3">
                  <div className="text-center">
                    <JP className="kana-display text-5xl block leading-none">{c}</JP>
                    <span className="text-xs text-ink-soft">{g.count} ขีด</span>
                  </div>
                  <ol className="text-sm space-y-0.5">
                    {g.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "phrase-list":
      return (
        <div>
          {b.title && <p className="font-semibold mb-2">{b.title}</p>}
          <ul className="space-y-2">
            {b.items.map((it) => (
              <li key={it.japanese} className="rounded-2xl border border-line bg-surface p-3.5 flex items-start gap-3">
                <AudioButton text={it.reading ?? it.japanese} withSlow />
                <div className="min-w-0">
                  <JP className="text-xl font-medium">{it.japanese}</JP>
                  {it.reading && <JP className="ml-2 text-sm text-ink-soft">{it.reading}</JP>}
                  <p className="text-sm text-ink-soft">
                    {it.romaji} · <span className="text-ink">“{it.thai}”</span>
                  </p>
                  <p className="text-[15px] font-medium text-sakura-deep">{it.meaning}</p>
                  {it.note && <p className="text-xs text-ink-soft mt-0.5">ℹ️ {it.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-surface-2">
              <tr>
                {b.headers.map((h) => (
                  <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, ri) => (
                <tr key={ri} className="border-t border-line">
                  {r.map((cell, ci) => (
                    <td key={ci} className={cx("px-3 py-2", b.japaneseCols?.includes(ci) && "jp text-xl")} lang={b.japaneseCols?.includes(ci) ? "ja" : undefined}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "compare":
      return (
        <div>
          <p className="font-semibold mb-2">🔍 เปรียบเทียบตัวที่คล้ายกัน</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {b.items.map((it) => (
              <div key={it.japanese + it.label} className="rounded-2xl bg-surface-2/60 p-3 text-center">
                <JP className="kana-display text-5xl block leading-tight">{it.japanese}</JP>
                <p className="font-semibold text-sm mt-1">{it.label}</p>
                <p className="text-xs text-ink-soft">{it.note}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "dialogue":
      return (
        <div className="rounded-2xl border border-line p-4">
          {b.title && <p className="font-semibold mb-3">💬 {b.title}</p>}
          <div className="space-y-2.5">
            {b.lines.map((l, i) => {
              const me = l.speaker === "คุณ";
              return (
                <div key={i} className={cx("flex gap-2 items-end", me && "flex-row-reverse")}>
                  <span className="text-xs text-ink-soft mb-1 shrink-0">{l.speaker}</span>
                  <div className={cx("rounded-2xl px-4 py-2.5 max-w-[85%]", me ? "bg-matcha-soft rounded-br-sm" : "bg-sakura-soft rounded-bl-sm")}>
                    <div className="flex items-center gap-2">
                      <JP className="text-lg">{l.japanese}</JP>
                      <AudioButton text={l.japanese} size="sm" />
                    </div>
                    <p className="text-xs text-ink-soft">{l.romaji}</p>
                    <p className="text-sm">{l.thai}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "read-aloud":
      return (
        <div className="rounded-2xl bg-surface-2/50 p-4">
          <p className="font-semibold mb-2">🗣️ อ่านออกเสียงตาม</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {b.items.map((it) => (
              <li key={it.japanese} className="flex items-center gap-3 rounded-xl bg-surface p-2.5">
                <AudioButton text={it.japanese} size="sm" />
                <div className="min-w-0">
                  <JP className="text-xl">{it.japanese}</JP>
                  <p className="text-xs text-ink-soft">
                    {it.romaji}
                    {it.meaning && <> · {it.meaning}</>}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );

    case "checklist":
      return (
        <ul className="space-y-2">
          {b.items.map((it) => (
            <li key={it} className="flex gap-2 items-start">
              <CheckCircle2 className="text-matcha-deep shrink-0 mt-0.5" size={20} aria-hidden />
              <span className="jp-mixed">{it}</span>
            </li>
          ))}
        </ul>
      );
  }
}
