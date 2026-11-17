"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getScenario, TRAVEL_SCENARIOS } from "@/data/travel";
import { todayISO } from "@/lib/date";
import { useStudyTimer } from "@/lib/hooks";
import { finishStudySession, recordAnswer } from "@/lib/progress/actions";
import { updateProgress, useProgress } from "@/lib/progress/store";
import { shuffle } from "@/lib/random";
import type { SimChoice, TravelScenario } from "@/lib/types";
import { Badge, Button, ButtonLink, Card, cx, JP, PageHeader, PageSkeleton } from "@/components/ui";
import { AudioButton, AudioUnavailableNote } from "@/components/learning/AudioButton";
import { ExerciseRunner } from "@/components/exercises/ExerciseRunner";

export function TravelListView() {
  return (
    <div>
      <PageHeader icon="🗾" title="เตรียมตัวเที่ยวญี่ปุ่น" subtitle="จำลองสถานการณ์จริงตอนเที่ยวโทจิงิ — เลือกคำตอบแล้วคุยต่อได้เลย" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRAVEL_SCENARIOS.map((s, i) => (
          <Link key={s.id} href={`/travel/${s.id}`} className="block rounded-3xl group">
            <Card className="p-5 h-full flex flex-col gap-2 group-hover:border-sakura transition">
              <div className="flex items-center justify-between">
                <span className="text-4xl" aria-hidden>
                  {s.icon}
                </span>
                <Badge tone="beige">สถานการณ์ {i + 1}</Badge>
              </div>
              <h2 className="font-semibold text-lg">{s.title}</h2>
              {s.place && (
                <p className="text-xs text-ink-soft inline-flex items-center gap-1">
                  <MapPin size={12} /> {s.place}
                </p>
              )}
              <p className="text-sm text-ink-soft flex-1">{s.situation}</p>
              <span className="text-sm font-semibold text-sakura-deep inline-flex items-center gap-1">
                เริ่มฝึก <ArrowRight size={14} />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

type Phase = "intro" | "sim" | "practice" | "done";

export function ScenarioView({ id }: { id: string }) {
  const progress = useProgress();
  const scenario = getScenario(id);
  const [phase, setPhase] = useState<Phase>("intro");
  useStudyTimer(phase !== "intro");
  if (!progress) return <PageSkeleton />;
  if (!scenario) return <Card className="p-6">ไม่พบสถานการณ์นี้</Card>;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Link href="/travel" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft size={16} /> สถานการณ์ทั้งหมด
      </Link>
      <header>
        <p className="text-4xl" aria-hidden>
          {scenario.icon}
        </p>
        <h1 className="text-2xl md:text-3xl font-bold">{scenario.title}</h1>
        {scenario.place && (
          <p className="text-sm text-ink-soft inline-flex items-center gap-1">
            <MapPin size={14} /> {scenario.place}
          </p>
        )}
      </header>
      <ol className="flex gap-2 text-xs font-semibold" aria-label="ขั้นตอน">
        {(["intro", "sim", "practice"] as Phase[]).map((p, i) => (
          <li
            key={p}
            className={cx(
              "flex-1 rounded-full px-3 py-1.5 text-center",
              phase === p ? "bg-sakura-soft text-sakura-deep" : ["intro", "sim", "practice", "done"].indexOf(phase) > i ? "bg-matcha-soft text-matcha-deep" : "bg-surface-2 text-ink-soft",
            )}
          >
            {i + 1}. {["ประโยคที่ใช้", "จำลองบทสนทนา", "แบบฝึกหัด"][i]}
          </li>
        ))}
      </ol>
      <AudioUnavailableNote />
      {phase === "intro" && <Intro scenario={scenario} onStart={() => setPhase("sim")} />}
      {phase === "sim" && <Simulation scenario={scenario} onDone={() => setPhase("practice")} />}
      {(phase === "practice" || phase === "done") && (
        <ExerciseRunner
          exercises={scenario.practice}
          onAnswer={(ex, correct) => updateProgress((p) => recordAnswer(p, { reviewKey: ex.reviewKey, correct, date: todayISO() }))}
          onFinish={() => {
            updateProgress((p) => finishStudySession(p, todayISO()));
            setPhase("done");
          }}
          finishSlot={
            <>
              <Button variant="secondary" onClick={() => setPhase("sim")}>
                <RotateCcw size={16} /> คุยอีกรอบ
              </Button>
              <ButtonLink href="/travel">สถานการณ์อื่น</ButtonLink>
            </>
          }
        />
      )}
    </div>
  );
}

function Intro({ scenario, onStart }: { scenario: TravelScenario; onStart: () => void }) {
  return (
    <div className="space-y-4">
      <Card className="p-5 bg-sakura-soft/50">
        <p className="font-semibold">📍 สถานการณ์</p>
        <p className="mt-1">{scenario.situation}</p>
      </Card>
      <Card className="p-5">
        <p className="font-semibold mb-3">💬 ประโยคที่ควรรู้</p>
        <ul className="space-y-2.5">
          {scenario.usefulPhrases.map((ph) => (
            <li key={ph.japanese} className="flex items-start gap-3 rounded-2xl border border-line p-3">
              <AudioButton text={ph.japanese} withSlow />
              <div className="min-w-0">
                <JP className="text-lg">{ph.japanese}</JP>
                {ph.reading && <JP className="block text-xs text-ink-soft">{ph.reading}</JP>}
                <p className="text-sm text-ink-soft">
                  {ph.romaji} · “{ph.thaiPronunciation}”
                </p>
                <p className="text-sm font-medium text-sakura-deep">{ph.thai}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <div className="flex justify-end">
        <Button size="lg" onClick={onStart}>
          เริ่มจำลองบทสนทนา <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}

interface LogEntry {
  who: "npc" | "me";
  speaker: string;
  japanese: string;
  romaji: string;
  thai: string;
  reading?: string;
}

function Simulation({ scenario, onDone }: { scenario: TravelScenario; onDone: () => void }) {
  const initial = () => {
    const log: LogEntry[] = [];
    let i = 0;
    while (i < scenario.steps.length && scenario.steps[i].npc) {
      const n = scenario.steps[i].npc!;
      log.push({ who: "npc", ...n });
      i++;
    }
    return { log, i };
  };
  const [state, setState] = useState(initial);
  const [feedback, setFeedback] = useState<SimChoice | null>(null);
  const [order, setOrder] = useState(() => scenario.steps.map((s) => (s.choices ? shuffle(s.choices) : [])));
  const step = scenario.steps[state.i];
  const finished = state.i >= scenario.steps.length;

  const choose = (c: SimChoice) => {
    setFeedback(c);
    if (!c.correct) return;
    const log = [...state.log, { who: "me" as const, speaker: "คุณ", japanese: c.japanese, romaji: c.romaji, thai: c.thai }];
    let i = state.i + 1;
    while (i < scenario.steps.length && scenario.steps[i].npc) {
      log.push({ who: "npc", ...scenario.steps[i].npc! });
      i++;
    }
    setState({ log, i });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5 space-y-3" aria-live="polite">
        {state.log.map((l, idx) => (
          <div key={idx} className={cx("flex gap-2 items-end animate-fade-up", l.who === "me" && "flex-row-reverse")}>
            <span className="text-xs text-ink-soft mb-1 shrink-0 max-w-16 text-center">{l.speaker}</span>
            <div className={cx("rounded-2xl px-4 py-2.5 max-w-[85%]", l.who === "me" ? "bg-matcha-soft rounded-br-sm" : "bg-sakura-soft rounded-bl-sm")}>
              <div className="flex items-center gap-2">
                <JP className="text-lg">{l.japanese}</JP>
                <AudioButton text={l.japanese} size="sm" />
              </div>
              {l.reading && l.reading !== l.japanese && <JP className="block text-xs text-ink-soft">{l.reading}</JP>}
              <p className="text-xs text-ink-soft">{l.romaji}</p>
              <p className="text-sm">{l.thai}</p>
            </div>
          </div>
        ))}
      </Card>

      {!finished && step?.choices && (
        <Card className="p-4 md:p-5">
          <p className="font-semibold mb-3">👉 {step.prompt}</p>
          <div className="space-y-2">
            {order[state.i].map((c) => {
              const picked = feedback?.japanese === c.japanese;
              return (
                <button
                  key={c.japanese}
                  type="button"
                  disabled={Boolean(feedback?.correct)}
                  onClick={() => choose(c)}
                  className={cx(
                    "w-full text-left rounded-2xl border-2 px-4 py-3 transition",
                    picked ? (c.correct ? "border-matcha bg-matcha-soft" : "border-danger bg-danger-soft animate-shake") : "border-line hover:border-sakura bg-surface",
                  )}
                >
                  <JP className="text-lg block">{c.japanese}</JP>
                  <span className="text-xs text-ink-soft">{c.romaji}</span>
                </button>
              );
            })}
          </div>
          {feedback && !feedback.correct && (
            <div role="status" className="mt-3 rounded-2xl bg-danger-soft p-3 text-sm">
              <p className="font-semibold text-danger">ยังไม่ใช่ ลองใหม่นะ 🌱</p>
              <p>
                ประโยคนี้แปลว่า “{feedback.thai}” — {feedback.feedback}
              </p>
            </div>
          )}
        </Card>
      )}

      {feedback?.correct && (
        <div role="status" className="rounded-2xl bg-matcha-soft text-matcha-deep p-3 text-sm animate-pop">
          <p className="font-semibold">ถูกต้อง! ✨</p>
          <p className="text-ink">{feedback.feedback}</p>
          {!finished && (
            <Button size="sm" className="mt-2" onClick={() => setFeedback(null)}>
              คุยต่อ <ArrowRight size={14} />
            </Button>
          )}
        </div>
      )}

      {finished && (
        <Card className="p-5 text-center space-y-3">
          <CheckCircle2 className="mx-auto text-matcha-deep" size={36} />
          <p className="font-semibold">จบบทสนทนาแล้ว เก่งมาก! 🎉</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setState(initial());
                setFeedback(null);
                setOrder(scenario.steps.map((s) => (s.choices ? shuffle(s.choices) : [])));
              }}
            >
              <RotateCcw size={16} /> คุยอีกรอบ
            </Button>
            <Button onClick={onDone}>
              ไปทำแบบฝึกหัด <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
