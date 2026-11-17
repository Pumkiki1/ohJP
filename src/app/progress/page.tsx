import type { Metadata } from "next";
import { ProgressView } from "@/views/ProgressView";

export const metadata: Metadata = { title: "ความก้าวหน้า" };

export default function ProgressPage() {
  return <ProgressView />;
}
