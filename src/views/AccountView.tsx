"use client";

import { Cloud, CloudOff, Database, LogIn, LogOut, RefreshCw, UserPlus } from "lucide-react";
import { useState } from "react";
import { signIn, signOut, signUp, syncNowManually, useSync, type SyncStatus } from "@/lib/progress/sync";
import { Badge, Button, Card, CardTitle, cx, PageHeader } from "@/components/ui";

export const SYNC_LABEL: Record<SyncStatus, { text: string; tone: "matcha" | "sakura" | "neutral" | "danger" | "beige" }> = {
  disabled: { text: "เก็บในเครื่องนี้", tone: "neutral" },
  "signed-out": { text: "ยังไม่ได้เข้าสู่ระบบ", tone: "beige" },
  syncing: { text: "กำลังซิงก์…", tone: "sakura" },
  synced: { text: "ซิงก์แล้ว", tone: "matcha" },
  offline: { text: "ออฟไลน์ — จะซิงก์เมื่อกลับมาออนไลน์", tone: "beige" },
  error: { text: "ซิงก์ไม่สำเร็จ", tone: "danger" },
};

export function AccountView() {
  const sync = useSync();
  return (
    <div className="space-y-5 max-w-xl">
      <PageHeader note="เรียนเครื่องไหนก็ไม่หาย ☁️" icon="☁️" title="บัญชีและการซิงก์" subtitle="เก็บความก้าวหน้าไว้ในฐานข้อมูล เพื่อเรียนต่อได้ทุกเครื่องและไม่หายแม้ล้างเบราว์เซอร์" />
      {sync.status === "disabled" ? <SetupGuide /> : sync.userId ? <SignedIn /> : <AuthForm />}
    </div>
  );
}

function SignedIn() {
  const sync = useSync();
  const label = SYNC_LABEL[sync.status];
  const [busy, setBusy] = useState(false);
  return (
    <Card className="p-5 space-y-4">
      <CardTitle icon={<Cloud size={18} />} action={<Badge tone={label.tone}>{label.text}</Badge>}>
        เข้าสู่ระบบแล้ว
      </CardTitle>
      <p>
        อีเมล: <strong>{sync.email}</strong>
      </p>
      <p className="text-sm text-ink-soft">
        {sync.lastSyncedAt
          ? `ซิงก์ล่าสุด: ${new Date(sync.lastSyncedAt).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}`
          : "ยังไม่ได้ซิงก์"}
      </p>
      {sync.error && <p className="text-sm rounded-2xl bg-danger-soft text-danger px-3 py-2">⚠️ {sync.error}</p>}
      <p className="text-sm text-ink-soft">
        ทุกครั้งที่เรียนหรือทำแบบฝึกหัด ระบบจะบันทึกลงฐานข้อมูลให้อัตโนมัติ ถ้าเรียนหลายเครื่อง ความก้าวหน้าจะถูกรวมกัน (ไม่มีบทเรียนที่เรียนแล้วหายไป)
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          disabled={busy || sync.status === "syncing"}
          onClick={async () => {
            setBusy(true);
            await syncNowManually();
            setBusy(false);
          }}
        >
          <RefreshCw size={16} className={cx(sync.status === "syncing" && "animate-spin")} /> ซิงก์ตอนนี้
        </Button>
        <Button
          variant="ghost"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            await signOut();
            setBusy(false);
          }}
        >
          <LogOut size={16} /> ออกจากระบบ
        </Button>
      </div>
      <p className="text-xs text-ink-soft">ออกจากระบบแล้ว ความก้าวหน้ายังอยู่ในเครื่องนี้ และยังอยู่ในฐานข้อมูลเมื่อกลับมาเข้าสู่ระบบ</p>
    </Card>
  );
}

function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const r = mode === "signin" ? await signIn(email.trim(), password) : await signUp(email.trim(), password);
    setMsg({ ok: r.ok, text: r.message });
    setBusy(false);
  };

  return (
    <Card className="p-5 space-y-4">
      <div className="inline-flex rounded-2xl bg-surface-2 p-1" role="tablist">
        {(
          [
            ["signin", "เข้าสู่ระบบ", LogIn],
            ["signup", "สมัครบัญชี", UserPlus],
          ] as const
        ).map(([m, label, Icon]) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m);
              setMsg(null);
            }}
            className={cx("px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-1.5", mode === m ? "bg-surface shadow-soft text-sakura-deep" : "text-ink-soft")}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="text-sm">อีเมล</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full h-12 rounded-2xl border-2 border-line bg-surface px-4 focus:border-sakura-deep outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm">รหัสผ่าน {mode === "signup" && <span className="text-ink-soft">(อย่างน้อย 6 ตัวอักษร)</span>}</span>
          <input
            type="password"
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full h-12 rounded-2xl border-2 border-line bg-surface px-4 focus:border-sakura-deep outline-none"
          />
        </label>
        {msg && (
          <p role="status" className={cx("text-sm rounded-2xl px-3 py-2", msg.ok ? "bg-matcha-soft text-matcha-deep" : "bg-danger-soft text-danger")}>
            {msg.text}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "กำลังดำเนินการ…" : mode === "signin" ? "เข้าสู่ระบบ" : "สมัครบัญชี"}
        </Button>
      </form>
      <p className="text-xs text-ink-soft">
        ความก้าวหน้าที่เรียนไว้ในเครื่องนี้จะถูกรวมเข้ากับบัญชีโดยอัตโนมัติเมื่อเข้าสู่ระบบ — ไม่ต้องเริ่มใหม่
      </p>
    </Card>
  );
}

function SetupGuide() {
  return (
    <Card className="p-5 space-y-3">
      <CardTitle icon={<Database size={18} />} action={<Badge tone="neutral"><CloudOff size={12} /> ยังไม่ได้เชื่อมต่อ</Badge>}>
        ตั้งค่าฐานข้อมูล (ครั้งเดียว)
      </CardTitle>
      <p className="text-sm">ตอนนี้ความก้าวหน้าถูกเก็บไว้ในเบราว์เซอร์นี้เท่านั้น ผู้ดูแลแอปตั้งค่าฐานข้อมูล Supabase ได้ดังนี้:</p>
      <ol className="text-sm space-y-1.5 list-decimal pl-5">
        <li>สร้างโปรเจกต์ฟรีที่ supabase.com</li>
        <li>
          เปิด SQL Editor แล้วรันไฟล์ <code className="bg-surface-2 px-1 rounded">supabase/schema.sql</code>
        </li>
        <li>
          คัดลอก Project URL และ Publishable key ไปใส่ในไฟล์ <code className="bg-surface-2 px-1 rounded">.env.local</code> (ดูตัวอย่างที่{" "}
          <code className="bg-surface-2 px-1 rounded">.env.example</code>)
        </li>
        <li>รีสตาร์ตแอป แล้วหน้านี้จะมีปุ่มสมัคร/เข้าสู่ระบบ</li>
      </ol>
    </Card>
  );
}
