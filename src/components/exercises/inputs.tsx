"use client";

import { Check, RotateCcw, X } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import type {
  ConversationExercise,
  Exercise,
  FillBlankExercise,
  ListenExercise,
  MatchExercise,
  MultipleChoiceExercise,
  OrderExercise,
  ReadMeaningExercise,
  TrueFalseExercise,
  TypeExercise,
} from "@/lib/types";
import { normalizeKana, normalizeRomaji, romajiToHiragana } from "@/lib/romaji";
import { shuffle } from "@/lib/random";
import { useSpeechStatus } from "@/lib/hooks";
import { AudioButton } from "@/components/learning/AudioButton";
import { Button, cx, JP } from "@/components/ui";

/** Shared contract for all exercise input components */
export interface InputProps<E extends Exercise> {
  exercise: E;
  /** true once an answer has been checked (show correct/incorrect styling) */
  locked: boolean;
  onSubmit: (correct: boolean, answerLabel: string) => void;
}

const optionBase =
  "w-full text-left rounded-2xl border-2 px-4 py-3 transition flex items-center gap-3 min-h-14 disabled:cursor-default";

function optionState(opt: string, selected: string | null, correct: string, locked: boolean) {
  if (locked) {
    if (opt === correct) return "border-matcha bg-matcha-soft text-matcha-deep";
    if (opt === selected) return "border-danger bg-danger-soft text-danger";
    return "border-line bg-surface opacity-60";
  }
  return opt === selected ? "border-sakura-deep bg-sakura-soft" : "border-line bg-surface hover:border-sakura";
}

/* -------------------------------------------------------------------------- */
/* Option list — used by multiple-choice, listen, read-meaning, fill-blank,     */
/* conversation                                                                  */
/* -------------------------------------------------------------------------- */

function OptionList({
  options,
  correct,
  japanese,
  locked,
  onSubmit,
  onSelect,
}: {
  options: string[];
  correct: string;
  japanese?: boolean;
  locked: boolean;
  onSubmit: (correct: boolean, label: string) => void;
  onSelect?: (opt: string | null) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const check = () => selected && onSubmit(selected === correct, selected);
  const big = japanese && options.every((o) => o.length <= 2);
  return (
    <div>
      <div className={cx("grid gap-2.5", big ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-2")} role="radiogroup">
        {options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={selected === opt}
            disabled={locked}
            onClick={() => {
              setSelected(opt);
              onSelect?.(opt);
            }}
            className={cx(optionBase, optionState(opt, selected, correct, locked), big && "justify-center")}
          >
            {!big && (
              <span className="w-7 h-7 shrink-0 grid place-items-center rounded-lg bg-surface-2 text-xs font-bold text-ink-soft">
                {i + 1}
              </span>
            )}
            <span className={cx(japanese && "jp", big ? "text-4xl kana-display" : japanese ? "text-lg" : "text-[15px]")} lang={japanese ? "ja" : undefined}>
              {opt}
            </span>
            {locked && opt === correct && <Check className="ml-auto shrink-0" size={20} aria-label="คำตอบที่ถูก" />}
            {locked && opt === selected && opt !== correct && <X className="ml-auto shrink-0" size={20} aria-label="คำตอบที่เลือก" />}
          </button>
        ))}
      </div>
      {!locked && (
        <div className="mt-4 flex justify-end">
          <Button onClick={check} disabled={!selected}>
            ตรวจคำตอบ
          </Button>
        </div>
      )}
    </div>
  );
}

export function MultipleChoiceInput({ exercise: e, locked, onSubmit }: InputProps<MultipleChoiceExercise>) {
  return (
    <div className="space-y-5">
      {e.prompt && (
        <div className="flex items-center justify-center gap-3 py-2">
          {e.promptIsJapanese ? (
            <>
              <JP className={cx("kana-display text-ink", e.prompt.length <= 3 ? "text-7xl" : "text-4xl")}>{e.prompt}</JP>
              <AudioButton text={e.prompt} />
            </>
          ) : (
            <span className="text-2xl font-semibold">{e.prompt}</span>
          )}
        </div>
      )}
      <OptionList options={e.options} correct={e.correctAnswer} japanese={e.optionsAreJapanese} locked={locked} onSubmit={onSubmit} />
    </div>
  );
}

export function ReadMeaningInput({ exercise: e, locked, onSubmit }: InputProps<ReadMeaningExercise>) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-1 py-2">
        <div className="flex items-center gap-3">
          <JP className="text-4xl md:text-5xl font-medium">{e.japanese}</JP>
          <AudioButton text={e.reading ?? e.japanese} />
        </div>
        {e.reading && locked && <JP className="text-ink-soft">{e.reading}</JP>}
      </div>
      <OptionList options={e.options} correct={e.correctAnswer} locked={locked} onSubmit={onSubmit} />
    </div>
  );
}

export function ListenInput({ exercise: e, locked, onSubmit }: InputProps<ListenExercise>) {
  const status = useSpeechStatus();
  const [revealed, setRevealed] = useState(false);
  const noAudio = status === "no-voice" || status === "unsupported";
  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-3 py-2">
        {noAudio ? (
          <div className="text-center space-y-2">
            <p className="text-sm text-ink-soft">🔇 อุปกรณ์นี้ไม่มีเสียงภาษาญี่ปุ่น จึงฟังไม่ได้ — ฝึกแบบอ่านแทน</p>
            {revealed || locked ? (
              <JP className="text-4xl">{e.audioText}</JP>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => setRevealed(true)}>
                แสดงข้อความแทนเสียง
              </Button>
            )}
          </div>
        ) : (
          <>
            <AudioButton text={e.audioText} size="lg" withSlow label="เล่นเสียงโจทย์" />
            <p className="text-xs text-ink-soft">กดฟังได้หลายครั้ง · ปุ่มหอยทาก = ฟังช้า</p>
            {locked && <JP className="text-2xl">{e.audioText}</JP>}
          </>
        )}
      </div>
      <OptionList options={e.options} correct={e.correctAnswer} japanese={e.optionsAreJapanese} locked={locked} onSubmit={onSubmit} />
    </div>
  );
}

export function FillBlankInput({ exercise: e, locked, onSubmit }: InputProps<FillBlankExercise>) {
  const [sel, setSel] = useState<string | null>(null);
  const [before, after] = e.sentence.split("___");
  return (
    <div className="space-y-5">
      <div className="text-center py-2">
        <p className="text-2xl md:text-3xl jp" lang="ja">
          {before}
          <span
            className={cx(
              "inline-block min-w-16 mx-1 px-2 border-b-4 rounded-sm",
              locked ? (sel === e.correctAnswer ? "border-matcha text-matcha-deep" : "border-danger text-danger") : "border-sakura text-sakura-deep",
            )}
          >
            {sel ?? " "}
          </span>
          {after}
        </p>
        <p className="mt-2 text-sm text-ink-soft">“{e.translation}”</p>
      </div>
      <OptionList options={e.options} correct={e.correctAnswer} japanese locked={locked} onSubmit={onSubmit} onSelect={setSel} />
    </div>
  );
}

export function ConversationInput({ exercise: e, locked, onSubmit }: InputProps<ConversationExercise>) {
  return (
    <div className="space-y-4">
      <p className="text-sm rounded-2xl bg-surface-2 px-4 py-2.5">📍 {e.situation}</p>
      <div className="space-y-2">
        {e.lines.map((l, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-xs font-semibold text-ink-soft mt-3 w-16 shrink-0 text-right">{l.speaker}</span>
            <div className="rounded-2xl rounded-tl-sm bg-sakura-soft px-4 py-2.5">
              <div className="flex items-center gap-2">
                <JP className="text-lg">{l.japanese}</JP>
                <AudioButton text={l.japanese} size="sm" />
              </div>
              <p className="text-xs text-ink-soft">{l.romaji}</p>
              {l.thai !== "?" && <p className="text-xs text-ink-soft">{l.thai}</p>}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm font-medium">คุณจะตอบว่า…</p>
      <OptionList
        options={e.options}
        correct={e.correctAnswer}
        japanese={e.options.some((o) => /[぀-ヿ]/.test(o))}
        locked={locked}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export function TrueFalseInput({ exercise: e, locked, onSubmit }: InputProps<TrueFalseExercise>) {
  const [sel, setSel] = useState<boolean | null>(null);
  const opts: [boolean, string, ReactNode][] = [
    [true, "ถูก", <Check key="t" size={22} />],
    [false, "ผิด", <X key="f" size={22} />],
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center gap-2 py-3 text-center">
        <p className="text-xl md:text-2xl font-medium">{e.statement}</p>
        {e.statementJapanese && <AudioButton text={e.statementJapanese} size="sm" />}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {opts.map(([val, label, icon]) => (
          <button
            key={label}
            type="button"
            disabled={locked}
            onClick={() => {
              setSel(val);
              onSubmit(val === e.correctAnswer, label);
            }}
            className={cx(
              optionBase,
              "justify-center text-lg font-semibold",
              locked
                ? val === e.correctAnswer
                  ? "border-matcha bg-matcha-soft text-matcha-deep"
                  : sel === val
                    ? "border-danger bg-danger-soft text-danger"
                    : "border-line opacity-60"
                : "border-line bg-surface hover:border-sakura",
            )}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TypeInput({ exercise: e, locked, onSubmit }: InputProps<TypeExercise>) {
  const [value, setValue] = useState("");
  const kana = e.inputMode === "kana";
  const converted = kana ? romajiToHiragana(value) : value;
  const check = () => {
    if (!value.trim()) return;
    const answers = [e.correctAnswer, ...(e.acceptedAnswers ?? [])];
    const ok = kana
      ? answers.some((a) => normalizeKana(a) === normalizeKana(converted))
      : answers.some((a) => normalizeRomaji(a) === normalizeRomaji(value));
    onSubmit(ok, kana ? converted : value);
  };
  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <JP className="text-4xl md:text-5xl">{e.prompt}</JP>
      </div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          check();
        }}
        className="space-y-3"
      >
        <label className="block text-sm text-ink-soft" htmlFor={`type-${e.id}`}>
          {kana ? "พิมพ์เป็นโรมาจิ เช่น ohayou แล้วระบบจะแปลงเป็นฮิรางานะให้" : "พิมพ์เสียงอ่านเป็นตัวอักษรภาษาอังกฤษ (โรมาจิ)"}
        </label>
        <input
          id={`type-${e.id}`}
          value={value}
          disabled={locked}
          onChange={(ev) => setValue(ev.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="w-full h-14 rounded-2xl border-2 border-line bg-surface px-4 text-xl focus:border-sakura-deep outline-none"
          placeholder={kana ? "เช่น ohayou" : "เช่น ao"}
        />
        {kana && (
          <p className="text-center text-3xl min-h-12 jp" lang="ja" aria-live="polite">
            {converted || <span className="text-ink-soft text-base">ตัวอักษรจะแสดงตรงนี้</span>}
          </p>
        )}
        {!locked && (
          <div className="flex justify-end">
            <Button type="submit" disabled={!value.trim()}>
              ตรวจคำตอบ
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export function MatchInput({ exercise: e, locked, onSubmit }: InputProps<MatchExercise>) {
  const rights = useMemo(() => shuffle(e.pairs.map((p) => p.right)), [e.pairs]);
  const [left, setLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    if (!wrong) return;
    const t = window.setTimeout(() => setWrong(null), 450);
    return () => window.clearTimeout(t);
  }, [wrong]);

  const pick = (r: string) => {
    if (!left || locked) return;
    const pair = e.pairs.find((p) => p.left === left);
    if (pair?.right === r) {
      const next = { ...matched, [left]: r };
      setMatched(next);
      setLeft(null);
      if (Object.keys(next).length === e.pairs.length) {
        onSubmit(mistakes === 0, mistakes === 0 ? "จับคู่ถูกทั้งหมด" : `จับคู่ผิด ${mistakes} ครั้ง`);
      }
    } else {
      setWrong(r);
      setMistakes((n) => n + 1);
    }
  };
  const usedRights = new Set(Object.values(matched));

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-soft text-center">แตะคำฝั่งซ้าย แล้วแตะคำตอบฝั่งขวาที่คู่กัน</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {e.pairs.map((p) => (
            <button
              key={p.left}
              type="button"
              disabled={Boolean(matched[p.left]) || locked}
              onClick={() => setLeft(p.left)}
              className={cx(
                optionBase,
                "justify-center",
                matched[p.left]
                  ? "border-matcha bg-matcha-soft text-matcha-deep"
                  : left === p.left
                    ? "border-sakura-deep bg-sakura-soft"
                    : "border-line bg-surface hover:border-sakura",
              )}
            >
              <span lang={e.leftIsJapanese ? "ja" : undefined} className={cx(e.leftIsJapanese && "jp", e.leftIsJapanese && p.left.length <= 2 ? "text-3xl kana-display" : "text-lg")}>
                {p.left}
              </span>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rights.map((r) => (
            <button
              key={r}
              type="button"
              disabled={usedRights.has(r) || locked}
              onClick={() => pick(r)}
              className={cx(
                optionBase,
                "justify-center",
                usedRights.has(r)
                  ? "border-matcha bg-matcha-soft text-matcha-deep"
                  : wrong === r
                    ? "border-danger bg-danger-soft animate-shake"
                    : "border-line bg-surface hover:border-sakura",
                !left && !usedRights.has(r) && "opacity-80",
              )}
            >
              <span className={cx(/[぀-ヿ]/.test(r) && "jp text-xl")}>{r}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrderInput({ exercise: e, locked, onSubmit }: InputProps<OrderExercise>) {
  const tiles = useMemo(
    () => shuffle([...e.correctOrder, ...(e.extraTiles ?? [])].map((t, i) => ({ id: `${i}-${t}`, text: t }))),
    [e.correctOrder, e.extraTiles],
  );
  const [answer, setAnswer] = useState<string[]>([]);
  const used = new Set(answer);
  const text = (id: string) => tiles.find((t) => t.id === id)?.text ?? "";
  const check = () => {
    const built = answer.map(text);
    onSubmit(built.join("") === e.correctOrder.join(""), built.join(" "));
  };
  return (
    <div className="space-y-4">
      <p className="text-center text-lg">“{e.translation}”</p>
      <div className="min-h-16 rounded-2xl border-2 border-dashed border-line bg-surface-2/50 p-2 flex flex-wrap gap-2 items-center" aria-label="คำตอบของคุณ">
        {answer.length === 0 && <span className="text-sm text-ink-soft px-2">แตะคำด้านล่างเพื่อเรียงประโยค</span>}
        {answer.map((id) => (
          <button
            key={id}
            type="button"
            disabled={locked}
            onClick={() => setAnswer((a) => a.filter((x) => x !== id))}
            className="rounded-xl bg-surface border border-line px-3 py-2 text-xl jp shadow-soft"
            lang="ja"
          >
            {text(id)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {tiles.map((t) => (
          <button
            key={t.id}
            type="button"
            disabled={used.has(t.id) || locked}
            onClick={() => setAnswer((a) => [...a, t.id])}
            className={cx(
              "rounded-xl border-2 px-3 py-2 text-xl jp transition",
              used.has(t.id) ? "border-transparent bg-surface-2 text-transparent" : "border-line bg-surface hover:border-sakura",
            )}
            lang="ja"
          >
            {t.text}
          </button>
        ))}
      </div>
      {!locked && (
        <div className="flex justify-between">
          <Button variant="ghost" size="sm" onClick={() => setAnswer([])} disabled={!answer.length}>
            <RotateCcw size={16} /> ล้าง
          </Button>
          <Button onClick={check} disabled={!answer.length}>
            ตรวจคำตอบ
          </Button>
        </div>
      )}
    </div>
  );
}
