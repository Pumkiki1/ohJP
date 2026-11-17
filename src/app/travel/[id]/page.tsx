import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getScenario, TRAVEL_SCENARIOS } from "@/data/travel";
import { ScenarioView } from "@/views/TravelView";
import { PageSkeleton } from "@/components/ui";

type Params = PageProps<"/travel/[id]">["params"];

export function generateStaticParams() {
  return TRAVEL_SCENARIOS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/travel/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getScenario(id)?.title ?? "เตรียมตัวเที่ยว" };
}

async function Scenario({ params }: { params: Params }) {
  const { id } = await params;
  if (!getScenario(id)) notFound();
  return <ScenarioView id={id} />;
}

export default function ScenarioPage({ params }: PageProps<"/travel/[id]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Scenario params={params} />
    </Suspense>
  );
}
