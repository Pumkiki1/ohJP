import type { Metadata } from "next";
import { TravelListView } from "@/views/TravelView";

export const metadata: Metadata = { title: "เตรียมตัวเที่ยวญี่ปุ่น" };

export default function TravelPage() {
  return <TravelListView />;
}
