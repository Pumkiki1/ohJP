"use client";

import { BellRing, Download, Monitor, Moon, Printer, RotateCcw, Sun, Upload } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { todayISO } from "@/lib/date";
import { useSpeechStatus } from "@/lib/hooks";
import { updateSettings } from "@/lib/progress/actions";
import { importProgress, resetProgress, updateProgress, useProgress } from "@/lib/progress/store";
import { Button, Card, CardTitle, ConfirmDialog, cx, PageHeader, PageSkeleton } from "@/components/ui";
import { AudioButton } from "@/components/learning/AudioButton";

export function SettingsView() {
  const progress = useProgress();
  const speech = useSpeechStatus();
  const [confirmReset, setConfirmReset] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  if (!progress) return <PageSkeleton />;
  const s = progress.settings;

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nihongo-tochigi-progress-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ ok: true, text: "ส่งออกไฟล์ความก้าวหน้าแล้ว" });
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <PageHeader icon="⚙️" title="ตั้งค่า" />
      {message && (
        <div role="status" className={cx("rounded-2xl px-4 py-3 text-sm", message.ok ? "bg-matcha-soft text-matcha-deep" : "bg-danger-soft text-danger")}>
          {message.text}
        </div>
      )}

      <Card className="p-5">
        <CardTitle>ธีม</CardTitle>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="ธีม">
          {(
            [
              ["light", "สว่าง", Sun],
              ["dark", "มืด", Moon],
              ["system", "ตามเครื่อง", Monitor],
            ] as const
          ).map(([v, label, Icon]) => (
            <button
              key={v}
              role="radio"
              aria-checked={s.theme === v}
              onClick={() => updateProgress((p) => updateSettings(p, { theme: v }))}
              className={cx(
                "rounded-2xl border-2 p-3 flex flex-col items-center gap-1 text-sm font-medium",
                s.theme === v ? "border-sakura-deep bg-sakura-soft text-sakura-deep" : "border-line hover:bg-surface-2",
              )}
            >
              <Icon size={20} /> {label}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-5 space-y-3">
        <CardTitle icon={<BellRing size={18} />}>เป้าหมายและการเตือน</CardTitle>
        <label className="flex items-center justify-between gap-3">
          <span>เป้าหมายเวลาเรียนต่อวัน</span>
          <select
            value={s.dailyGoalMinutes}
            onChange={(e) => updateProgress((p) => updateSettings(p, { dailyGoalMinutes: Number(e.target.value) }))}
            className="h-10 rounded-xl border border-line bg-surface px-3"
          >
            {[10, 15, 20, 30, 45].map((m) => (
              <option key={m} value={m}>
                {m} นาที
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center justify-between gap-3">
          <span>เวลาที่อยากเรียนทุกวัน</span>
          <input
            type="time"
            value={s.reminderTime ?? ""}
            onChange={(e) => updateProgress((p) => updateSettings(p, { reminderTime: e.target.value || null }))}
            className="h-10 rounded-xl border border-line bg-surface px-3"
          />
        </label>
        <p className="text-xs text-ink-soft">
          ℹ️ การเตือนจะแสดงเป็นแถบข้อความบนหน้าแรกเมื่อเปิดแอปหลังเวลาที่ตั้งไว้และวันนั้นยังไม่ได้เรียน — แอปนี้ไม่ได้ส่งการแจ้งเตือน (push notification)
          ถ้าอยากได้การเตือนจริง แนะนำให้ตั้งนาฬิกาปลุกในมือถือไว้ด้วย
        </p>
        {s.reminderTime && (
          <Button variant="ghost" size="sm" onClick={() => updateProgress((p) => updateSettings(p, { reminderTime: null }))}>
            ปิดการเตือน
          </Button>
        )}
      </Card>

      <Card className="p-5 space-y-2">
        <CardTitle>เสียงภาษาญี่ปุ่น</CardTitle>
        <div className="flex items-center gap-3">
          <AudioButton text="こんにちは" />
          <p className="text-sm">
            {speech === "ready"
              ? "✅ พบเสียงภาษาญี่ปุ่น (ja-JP) — กดปุ่มเพื่อทดสอบ"
              : speech === "loading"
                ? "กำลังตรวจสอบเสียง…"
                : speech === "unsupported"
                  ? "❌ เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง"
                  : "⚠️ ไม่พบเสียงภาษาญี่ปุ่นในอุปกรณ์นี้ — ติดตั้งได้ที่การตั้งค่าภาษาของระบบ (เช่น Windows: Settings → Time & language → Speech) แล้วเปิดเบราว์เซอร์ใหม่"}
          </p>
        </div>
      </Card>

      <Card className="p-5 space-y-3">
        <CardTitle>ข้อมูลความก้าวหน้า</CardTitle>
        <p className="text-sm text-ink-soft">ความก้าวหน้าถูกบันทึกไว้ในเบราว์เซอร์นี้เท่านั้น สำรองไว้เป็นไฟล์เพื่อย้ายไปเครื่องอื่นได้</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportJson}>
            <Download size={16} /> ส่งออก (JSON)
          </Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>
            <Upload size={16} /> นำเข้าไฟล์
          </Button>
          <Link href="/vocabulary" className="inline-flex items-center gap-2 h-11 px-5 rounded-2xl border border-line text-[15px] font-semibold hover:bg-surface-2">
            <Printer size={16} /> พิมพ์คำศัพท์
          </Link>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const ok = importProgress(await f.text());
              setMessage(ok ? { ok: true, text: "นำเข้าความก้าวหน้าเรียบร้อย" } : { ok: false, text: "ไฟล์ไม่ถูกต้อง — ไม่ได้เปลี่ยนแปลงข้อมูลใด ๆ" });
              e.target.value = "";
            }}
          />
        </div>
        <div className="pt-3 border-t border-line">
          <Button variant="danger" onClick={() => setConfirmReset(true)}>
            <RotateCcw size={16} /> รีเซ็ตความก้าวหน้า
          </Button>
        </div>
      </Card>

      <ConfirmDialog
        open={confirmReset}
        title="รีเซ็ตความก้าวหน้าทั้งหมด?"
        confirmLabel="รีเซ็ต"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetProgress();
          setConfirmReset(false);
          setMessage({ ok: true, text: "รีเซ็ตแล้ว — กลับไปเริ่มที่ Day 2 (Day 1 ยังนับว่าเรียนแล้ว)" });
        }}
      >
        บทเรียนที่เรียนแล้ว คะแนน คิวทบทวน และคำโปรดจะถูกลบ และกู้คืนไม่ได้ (ยกเว้นคุณส่งออกไฟล์ไว้ก่อน) — ถ้าเข้าสู่ระบบอยู่ ข้อมูลในฐานข้อมูลจะถูกรีเซ็ตด้วย
      </ConfirmDialog>
    </div>
  );
}
