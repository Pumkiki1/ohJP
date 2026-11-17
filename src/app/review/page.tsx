import type { Metadata } from "next";
import { ReviewView } from "@/views/ReviewView";

export const metadata: Metadata = { title: "ทบทวน" };

export default function ReviewPage() {
  return <ReviewView />;
}
