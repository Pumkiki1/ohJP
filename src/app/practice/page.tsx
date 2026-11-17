import type { Metadata } from "next";
import { PracticeView } from "@/views/PracticeView";

export const metadata: Metadata = { title: "แบบฝึกหัด" };

export default function PracticePage() {
  return <PracticeView />;
}
