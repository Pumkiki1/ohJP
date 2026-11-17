import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getScheduled, TOTAL_DAYS } from "@/data/curriculum";
import { LessonView } from "@/views/LessonView";
import { PageSkeleton } from "@/components/ui";

type Params = PageProps<"/lessons/[day]">["params"];

export function generateStaticParams() {
  return Array.from({ length: TOTAL_DAYS }, (_, i) => ({ day: String(i + 1) }));
}

export async function generateMetadata({ params }: PageProps<"/lessons/[day]">): Promise<Metadata> {
  const { day } = await params;
  const s = getScheduled(Number(day));
  return { title: s ? `Day ${s.dayNumber}: ${s.title}` : "บทเรียน" };
}

async function Lesson({ params }: { params: Params }) {
  const { day } = await params;
  const n = Number(day);
  if (!Number.isInteger(n) || !getScheduled(n)) notFound();
  return <LessonView day={n} />;
}

export default function LessonPage({ params }: PageProps<"/lessons/[day]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Lesson params={params} />
    </Suspense>
  );
}
