import type { Metadata } from "next";
import { SettingsView } from "@/views/SettingsView";

export const metadata: Metadata = { title: "ตั้งค่า" };

export default function SettingsPage() {
  return <SettingsView />;
}
