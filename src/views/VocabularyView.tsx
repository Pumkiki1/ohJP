"use client";

import { Heart, Layers, LayoutGrid, Printer, Search } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { VOCAB_CATEGORIES, VOCABULARY } from "@/data/vocabulary";
import { todayISO } from "@/lib/date";
import { useStudyTimer } from "@/lib/hooks";
import { normalizeRomaji } from "@/lib/romaji";
import { recordAnswer, setLearned, toggleFavorite } from "@/lib/progress/actions";
import { updateProgress, useProgress } from "@/lib/progress/store";
import { vocabMastery } from "@/lib/progress/stats";
import type { VocabCategory, Vocabulary } from "@/lib/types";
import { Badge, Button, Card, cx, EmptyState, JP, PageHeader, PageSkeleton, ProgressBar } from "@/components/ui";
import { VocabularyCard } from "@/components/learning/VocabularyCard";
import { Flashcard } from "@/components/learning/Flashcard";

type StatusFilter = "all" | "favorite" | "learned" | "not-learned";

function matches(w: Vocabulary, q: string): boolean {
  if (!q) return true;
  const raw = q.trim().toLowerCase();
  const r = normalizeRomaji(raw);
  return (
    w.japanese.includes(raw) ||
    (w.hiragana ?? "").includes(raw) ||
    w.meaning.toLowerCase().includes(raw) ||
    w.thaiPronunciation.includes(raw) ||
    (r.length > 0 && normalizeRomaji(w.romaji).includes(r)) ||
    (w.example?.japanese.includes(raw) ?? false)
  );
}

/** Lower is better: exact match, then prefix, then substring. */
function rank(w: Vocabulary, q: string): number {
  const raw = q.trim().toLowerCase();
  if (!raw) return 0;
  const r = normalizeRomaji(raw);
  const fields = [w.japanese, w.hiragana ?? "", normalizeRomaji(w.romaji), w.meaning.toLowerCase()];
  if (fields.some((f) => f === raw || (r && f === r))) return 0;
  if (fields.some((f) => f.startsWith(raw) || (r && f.startsWith(r)))) return 1;
  return 2;
}

export function VocabularyView() {
  const progress = useProgress();
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query);
  const [category, setCategory] = useState<VocabCategory | "all">("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [view, setView] = useState<"cards" | "flash">("cards");
  useStudyTimer(view === "flash");
  if (!progress) return <PageSkeleton />;

  const fav = new Set(progress.favoriteVocabulary);
  const learned = (id: string) => Boolean(progress.vocabularyProgress[id]?.learned);
  const list = VOCABULARY.filter(
    (w) =>
      (category === "all" || w.category === category) &&
      (status === "all" ||
        (status === "favorite" && fav.has(w.id)) ||
        (status === "learned" && learned(w.id)) ||
        (status === "not-learned" && !learned(w.id))) &&
      matches(w, q),
  );
  if (q.trim()) list.sort((a, b) => rank(a, q) - rank(b, q));
  const m = vocabMastery(progress);

  return (
    <div className="space-y-5">
      <PageHeader note="เก็บคำที่ชอบไว้ใน ❤️"
        icon="📗"
        title="คลังคำศัพท์"
        subtitle={`${VOCABULARY.length} คำ/ประโยคสำหรับเที่ยวญี่ปุ่น · ค้นหาได้ทั้งภาษาไทย ญี่ปุ่น และโรมาจิ`}
        action={
          <div className="flex gap-2 no-print">
            <Button variant="secondary" size="sm" onClick={() => setView(view === "cards" ? "flash" : "cards")}>
              {view === "cards" ? <Layers size={16} /> : <LayoutGrid size={16} />} {view === "cards" ? "แฟลชการ์ด" : "การ์ดคำศัพท์"}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => window.print()}>
              <Printer size={16} /> พิมพ์
            </Button>
          </div>
        }
      />

      <Card className="p-4 space-y-3 no-print">
        <label className="relative block">
          <span className="sr-only">ค้นหาคำศัพท์</span>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" size={18} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหา เช่น ขอบคุณ, eki, えき, 駅"
            className="w-full h-12 rounded-2xl border-2 border-line bg-surface pl-10 pr-4 focus:border-sakura-deep outline-none"
          />
        </label>
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1" role="group" aria-label="หมวดหมู่">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            ทั้งหมด
          </Chip>
          {VOCAB_CATEGORIES.map((c) => (
            <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              {c.icon} {c.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="สถานะ">
          {(
            [
              ["all", "ทุกสถานะ"],
              ["favorite", "❤️ รายการโปรด"],
              ["learned", "✓ เรียนแล้ว"],
              ["not-learned", "ยังไม่ได้เรียน"],
            ] as [StatusFilter, string][]
          ).map(([s, label]) => (
            <Chip key={s} active={status === s} onClick={() => setStatus(s)} tone="matcha">
              {label}
            </Chip>
          ))}
          <span className="ml-auto text-sm text-ink-soft">พบ {list.length} คำ</span>
        </div>
        <div>
          <p className="text-xs text-ink-soft mb-1">
            เรียนแล้ว {m.learned}/{m.total} คำ
          </p>
          <ProgressBar value={m.learned} max={m.total} size="sm" tone="matcha" label="คำศัพท์ที่เรียนแล้ว" />
        </div>
      </Card>

      {list.length === 0 ? (
        <Card>
          <EmptyState icon={status === "favorite" ? <Heart /> : "🔍"} title={status === "favorite" ? "ยังไม่มีคำโปรด" : "ไม่พบคำที่ค้นหา"}>
            {status === "favorite" ? "แตะรูปหัวใจบนการ์ดคำศัพท์เพื่อเก็บคำที่อยากจำไว้ที่นี่" : "ลองพิมพ์คำอื่น หรือเปลี่ยนหมวดหมู่ดูนะ"}
          </EmptyState>
        </Card>
      ) : view === "flash" ? (
        <div className="max-w-md mx-auto">
          <Flashcard
            key={`${category}-${status}-${q}`}
            items={list.map((w) => ({
              id: w.id,
              front: w.japanese,
              audio: w.hiragana ?? w.japanese,
              back: (
                <div>
                  {w.hiragana && <JP className="block text-lg">{w.hiragana}</JP>}
                  <p className="text-ink-soft">
                    {w.romaji} · “{w.thaiPronunciation}”
                  </p>
                  <p className="text-xl font-bold text-sakura-deep mt-1">{w.meaning}</p>
                </div>
              ),
            }))}
            onKnown={(id, known) =>
              updateProgress((p) =>
                known ? setLearned(p, `vocab:${id}`, true, todayISO()) : recordAnswer(p, { reviewKey: `vocab:${id}`, correct: false, date: todayISO() }),
              )
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map((w) => (
            <VocabularyCard
              key={w.id}
              word={w}
              favorite={fav.has(w.id)}
              learned={learned(w.id)}
              onToggleFavorite={() => updateProgress((p) => toggleFavorite(p, w.id))}
              onToggleLearned={() => updateProgress((p) => setLearned(p, `vocab:${w.id}`, !learned(w.id), todayISO()))}
            />
          ))}
        </div>
      )}
      <p className="text-xs text-ink-soft">
        <Badge tone="matcha">สุภาพ</Badge> ใช้กับพนักงานและคนที่ไม่รู้จัก · <Badge tone="sakura">กันเอง</Badge> ใช้กับเพื่อนสนิท · ประโยคตัวอย่างเว้นวรรคเพื่อให้อ่านง่าย
        (ภาษาญี่ปุ่นจริงไม่เว้นวรรค)
      </p>
    </div>
  );
}

function Chip({ active, onClick, children, tone = "sakura" }: { active: boolean; onClick: () => void; children: React.ReactNode; tone?: "sakura" | "matcha" }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium border transition whitespace-nowrap",
        active ? (tone === "sakura" ? "bg-sakura-soft border-sakura text-sakura-deep" : "bg-matcha-soft border-matcha text-matcha-deep") : "border-line text-ink-soft hover:bg-surface-2",
      )}
    >
      {children}
    </button>
  );
}
