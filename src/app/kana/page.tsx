import type { Metadata } from "next";
import { KanaView } from "@/views/KanaView";

export const metadata: Metadata = { title: "ฮิรางานะ & คาตากานะ" };

export default function KanaPage() {
  return <KanaView />;
}
