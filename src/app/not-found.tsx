import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <p className="text-5xl">🗺️</p>
      <h1 className="mt-3 text-2xl font-bold">ไม่พบหน้านี้</h1>
      <p className="text-ink-soft mt-1">หลงทางเหรอ? ไม่เป็นไร — みちに まよいました!</p>
      <Link href="/" className="mt-6 inline-flex h-11 items-center rounded-2xl bg-sakura-deep px-5 font-semibold text-white">
        กลับหน้าแรก
      </Link>
    </div>
  );
}
