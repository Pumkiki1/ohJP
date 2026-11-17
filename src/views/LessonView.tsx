"use client";

import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Coffee, Lock, PartyPopper, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getLesson, getPhase, getScheduled } from "@/data/curriculum";
import { formatThaiDate } from "@/lib/date";
import { useStudyTimer, useToday } from "@/lib/hooks";
import { completeLesson, recordAnswer, saveDraft } from "@/lib/progress/actions";
import { updateProgress, useProgress } from "@/lib/progress/store";
import { isCompleted, isUnlocked, nextLessonDay } from "@/lib/progress/stats";
import type { Lesson, LessonOutline, Progress, SectionKind } from "@/lib/types";
import { todayISO } from "@/lib/date";
import { Badge, Button, ButtonLink, Card, cx, PageSkeleton, ProgressBar } from "@/components/ui";
import { ContentBlocks } from "@/components/learning/ContentBlocks";
import { AudioUnavailableNote } from "@/components/learning/AudioButton";
import { type AnswerMap, ExerciseRunner } from "@/components/exercises/ExerciseRunner";

const SECTION_META: Record<SectionKind, { label: string; emoji: string }> = {
  learn: { label: "เรียนรู้", emoji: "📖" },
  understand: { label: "ทำความเข้าใจ", emoji: "💡" },
  practice: { label: "ฝึกฝน", emoji: "✏️" },
  review: { label: "ทบทวน", emoji: "🔁" },
};

export function LessonView({ day }: { day: number }) {
  const progress = useProgress();
  const today = useToday();
  const scheduled = getScheduled(day);
  if (!progress || !today) return <PageSkeleton />;
  if (!scheduled) return <Card className="p-6">ไม่พบบทเรียนนี้</Card>;

  if (!isUnlocked(progress, day)) return <LockedState day={day} progress={progress} />;
  const lesson = getLesson(day);
  if (!lesson) return <UpcomingState outline={scheduled.outline!} date={scheduled.date} />;
  return <LessonPlayer key={day} lesson={lesson} progress={progress} />;
}

/* ------------------------------------------------------------------------ */

function LockedState({ day, progress }: { day: number; progress: Progress }) {
  const s = getScheduled(day)!;
  const next = nextLessonDay(progress);
  return (
    <Card className="p-6 md:p-10 text-center max-w-xl mx-auto">
      <Lock className="mx-auto text-ink-soft" size={40} />
      <p className="mt-3 text-sm text-ink-soft">Day {day}</p>
      <h1 className="text-2xl font-bold">{s.title}</h1>
      <p className="mt-2 text-ink-soft">บทนี้จะเปิดเมื่อเรียน Day {day - 1} เสร็จ — เรียนตามลำดับเพื่อให้เนื้อหาต่อเนื่องและไม่หนักเกินไป</p>
      <ButtonLink href={`/lessons/${next}`} className="mt-6">
        ไปบทที่ต้องเรียนต่อ (Day {next}) <ArrowRight size={16} />
      </ButtonLink>
    </Card>
  );
}

function UpcomingState({ outline, date }: { outline: LessonOutline; date: string }) {
  const phase = getPhase(outline.phase);
  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <Link href="/lessons" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft size={16} /> แผนการเรียน
      </Link>
      <Card className="p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge tone="sakura">Day {outline.dayNumber}</Badge>
          <Badge tone="beige">
            เฟส {phase.id}: {phase.title}
          </Badge>
          <Badge tone="neutral">กำหนดเรียน {formatThaiDate(date)}</Badge>
        </div>
        <h1 className="text-2xl font-bold">{outline.title}</h1>
        <div className="mt-4 rounded-2xl bg-sakura-soft/60 p-4 flex gap-3">
          <Sparkles className="text-sakura-deep shrink-0" />
          <p className="text-[15px]">
            <strong>บทเรียนนี้กำลังจัดทำเนื้อหา</strong> — เราตั้งใจเขียนภาษาญี่ปุ่นทุกคำให้ถูกต้องก่อนเปิดให้เรียน
            จึงยังไม่แสดงเนื้อหาที่ไม่ได้ตรวจสอบ ระหว่างนี้ใช้เวลา 20 นาทีทบทวนสิ่งที่เรียนมาแล้วได้เลย
          </p>
        </div>
        <h2 className="mt-6 font-semibold">เป้าหมายของบทนี้</h2>
        <ul className="mt-1 space-y-1">
          {outline.objectives.map((o) => (
            <li key={o}>• {o}</li>
          ))}
        </ul>
        <h2 className="mt-6 font-semibold">แผน 20 นาที</h2>
        <ol className="mt-2 space-y-2">
          {outline.plan.map((p) => (
            <li key={p.kind} className="flex gap-3 rounded-2xl bg-surface-2/60 p-3">
              <span className="text-xl">{SECTION_META[p.kind].emoji}</span>
              <div>
                <p className="font-semibold text-sm">
                  {SECTION_META[p.kind].label} · {p.minutes} นาที
                </p>
                <p className="text-sm text-ink-soft">{p.activity}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-2">
          <ButtonLink href="/review">
            <RotateCcw size={16} /> ทบทวน 20 นาทีแทน
          </ButtonLink>
          <ButtonLink href="/practice" variant="secondary">
            ไปหน้าแบบฝึกหัด
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function LessonPlayer({ lesson, progress }: { lesson: Lesson; progress: Progress }) {
  const router = useRouter();
  const alreadyCompleted = isCompleted(progress, lesson.dayNumber);
  const draft = alreadyCompleted ? undefined : progress.drafts[lesson.dayNumber];
  const [step, setStep] = useState(draft?.sectionIndex ?? 0);
  const [answers, setAnswers] = useState<AnswerMap>(draft?.answers ?? {});
  const [finished, setFinished] = useState<{ score: number; total: number } | null>(null);
  useStudyTimer(!finished);

  const sections = lesson.sections;
  const practiceIdx = sections.findIndex((s) => s.kind === "practice");
  const practiceDone = lesson.exercises.every((e) => answers[e.id]);
  const section = sections[step];
  const remaining = sections.slice(step).reduce((a, s) => a + s.minutes, 0);
  const isLast = step === sections.length - 1;
  const phase = getPhase(lesson.phase);

  const persistDraft = (sectionIndex: number, ans: AnswerMap) => {
    if (alreadyCompleted) return;
    updateProgress((p) => saveDraft(p, lesson.dayNumber, { sectionIndex, exerciseIndex: Object.keys(ans).length, answers: ans }, todayISO()));
  };

  const goTo = (i: number) => {
    setStep(i);
    persistDraft(i, answers);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finish = () => {
    const score = lesson.exercises.filter((e) => answers[e.id]?.firstTryCorrect).length;
    const total = lesson.exercises.length;
    updateProgress((p) => completeLesson(p, { day: lesson.dayNumber, score, total, reviewItems: lesson.reviewItems, date: todayISO() }));
    setFinished({ score, total });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (finished) return <LessonComplete lesson={lesson} score={finished.score} total={finished.total} />;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <Link href="/lessons" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink">
          <ArrowLeft size={16} /> แผนการเรียน
        </Link>
        {!alreadyCompleted && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              persistDraft(step, answers);
              router.push("/");
            }}
          >
            <Coffee size={16} /> พักไว้ก่อน
          </Button>
        )}
      </div>

      <header>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge tone="sakura">Day {lesson.dayNumber}</Badge>
          <Badge tone="beige">
            เฟส {phase.id}: {phase.title}
          </Badge>
          {alreadyCompleted && (
            <Badge tone="matcha">
              <CheckCircle2 size={12} /> เรียนแล้ว · โหมดทบทวน
            </Badge>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
        <p className="text-ink-soft">{lesson.subtitle}</p>
      </header>

      {/* Stepper */}
      <nav aria-label="ส่วนของบทเรียน" className="rounded-3xl bg-surface border border-line p-3 md:p-4 shadow-soft">
        <ol className="grid grid-cols-4 gap-2">
          {sections.map((s, i) => {
            const canJump = alreadyCompleted || i <= practiceIdx || practiceDone;
            return (
              <li key={s.kind}>
                <button
                  type="button"
                  disabled={!canJump}
                  onClick={() => goTo(i)}
                  aria-current={i === step ? "step" : undefined}
                  className={cx(
                    "w-full rounded-2xl px-2 py-2 text-center transition disabled:opacity-50",
                    i === step ? "bg-sakura-soft text-sakura-deep" : i < step ? "text-matcha-deep" : "text-ink-soft hover:bg-surface-2",
                  )}
                >
                  <span className="block text-lg" aria-hidden>
                    {i < step ? "✅" : SECTION_META[s.kind].emoji}
                  </span>
                  <span className="block text-xs md:text-sm font-semibold">{SECTION_META[s.kind].label}</span>
                  <span className="block text-[11px] opacity-80">{s.minutes} นาที</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar value={step + (section.kind === "practice" && practiceDone ? 1 : 0)} max={sections.length} size="sm" label="ความคืบหน้าบทเรียน" />
          <span className="text-xs text-ink-soft whitespace-nowrap inline-flex items-center gap-1">
            <Clock size={12} /> เหลือ ~{remaining} นาที
          </span>
        </div>
      </nav>

      {/* Objectives on first section */}
      {step === 0 && (
        <Card className="p-4 md:p-5 bg-matcha-soft/50">
          <p className="font-semibold mb-1">🎯 วันนี้จะได้เรียน</p>
          <ul className="text-[15px] space-y-0.5">
            {lesson.objectives.map((o) => (
              <li key={o}>• {o}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Section content */}
      <section aria-labelledby="section-title" className="space-y-4">
        <h2 id="section-title" className="text-xl font-bold flex items-center gap-2">
          <span aria-hidden>{SECTION_META[section.kind].emoji}</span>
          {SECTION_META[section.kind].label}: {section.title}
        </h2>
        {section.kind !== "practice" ? (
          <Card className="p-5 md:p-7">
            <ContentBlocks blocks={section.blocks} />
          </Card>
        ) : (
          <>
            <ContentBlocks blocks={section.blocks} />
            <AudioUnavailableNote />
            <ExerciseRunner
              exercises={lesson.exercises}
              initialAnswers={answers}
              onAnswer={(ex, correct, next) => {
                setAnswers(next);
                updateProgress((p) =>
                  saveDraftIf(recordAnswer(p, { reviewKey: ex.reviewKey, correct, date: todayISO() }), alreadyCompleted, lesson.dayNumber, step, next),
                );
              }}
              finishSlot={
                <Button onClick={() => goTo(step + 1)}>
                  ไปขั้นทบทวน <ArrowRight size={16} />
                </Button>
              }
            />
          </>
        )}
      </section>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-2 pt-2">
        <Button variant="secondary" onClick={() => goTo(step - 1)} disabled={step === 0}>
          <ArrowLeft size={16} /> ก่อนหน้า
        </Button>
        {isLast ? (
          <Button size="lg" onClick={finish} disabled={!practiceDone}>
            <PartyPopper size={18} /> จบบทเรียน
          </Button>
        ) : (
          <Button onClick={() => goTo(step + 1)} disabled={section.kind === "practice" && !practiceDone}>
            ถัดไป <ArrowRight size={16} />
          </Button>
        )}
      </div>
      {section.kind === "practice" && !practiceDone && (
        <p className="text-center text-xs text-ink-soft">ทำแบบฝึกหัดให้ครบทุกข้อก่อน จึงจะไปขั้นถัดไปได้</p>
      )}
    </div>
  );
}

function saveDraftIf(p: Progress, completed: boolean, day: number, sectionIndex: number, answers: AnswerMap): Progress {
  if (completed) return p;
  return saveDraft(p, day, { sectionIndex, exerciseIndex: Object.keys(answers).length, answers }, todayISO());
}

/* ------------------------------------------------------------------------ */

function LessonComplete({ lesson, score, total }: { lesson: Lesson; score: number; total: number }) {
  const nextDay = lesson.dayNumber + 1;
  const next = getScheduled(nextDay);
  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-pop">
      <Card className="p-6 md:p-10 text-center bg-sakura-soft/50 sakura-dots">
        <p className="text-5xl" aria-hidden>
          🎉
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-bold">เรียนจบ Day {lesson.dayNumber} แล้ว!</h1>
        <p className="mt-1 text-ink-soft">{lesson.title}</p>
        <p className="mt-4 text-4xl font-bold">
          {score}/{total}
        </p>
        <p className="text-sm text-ink-soft">คะแนนแบบฝึกหัด (นับจากการตอบครั้งแรก)</p>
      </Card>
      <Card className="p-5 md:p-6">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <BookOpen size={18} className="text-sakura-deep" /> สิ่งที่ควรจำจากวันนี้
        </h2>
        <ul className="space-y-1.5">
          {lesson.summary.map((s) => (
            <li key={s} className="flex gap-2">
              <CheckCircle2 size={18} className="text-matcha-deep shrink-0 mt-0.5" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">
          คำและตัวอักษรของบทนี้ถูกเพิ่มเข้าคิวทบทวนแล้ว (ทบทวนครั้งแรกพรุ่งนี้) ข้อที่ตอบผิดจะได้ทบทวนตั้งแต่วันนี้
        </p>
      </Card>
      <div className="flex flex-wrap justify-center gap-2">
        <ButtonLink href="/" variant="secondary">
          กลับหน้าแรก
        </ButtonLink>
        <ButtonLink href="/review" variant="matcha">
          <RotateCcw size={16} /> ทบทวนคำที่ผิด
        </ButtonLink>
        {next && (
          <ButtonLink href={`/lessons/${nextDay}`}>
            บทต่อไป: Day {nextDay} <ArrowRight size={16} />
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
