import type { Metadata } from "next";
import { RoadmapView } from "@/views/RoadmapView";

export const metadata: Metadata = { title: "แผนการเรียน" };

export default function LessonsPage() {
  return <RoadmapView />;
}
