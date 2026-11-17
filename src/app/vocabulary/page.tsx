import type { Metadata } from "next";
import { VocabularyView } from "@/views/VocabularyView";

export const metadata: Metadata = { title: "คลังคำศัพท์" };

export default function VocabularyPage() {
  return <VocabularyView />;
}
