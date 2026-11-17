"use client";

import {
  BarChart3,
  BookMarked,
  BookOpen,
  Cloud,
  Home,
  Languages,
  Menu,
  PencilLine,
  Plane,
  RotateCcw,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, Suspense, useEffect, useState } from "react";
import { useToday } from "@/lib/hooks";
import { getStorageError, useProgress } from "@/lib/progress/store";
import { dueReviewItems } from "@/lib/progress/stats";
import { startSync, useSync } from "@/lib/progress/sync";
import { SYNC_LABEL } from "@/views/AccountView";
import { cx } from "@/components/ui";

const NAV = [
  { href: "/", label: "หน้าแรก", icon: Home },
  { href: "/lessons", label: "บทเรียน", icon: BookOpen },
  { href: "/practice", label: "แบบฝึกหัด", icon: PencilLine },
  { href: "/review", label: "ทบทวน", icon: RotateCcw },
  { href: "/kana", label: "ตัวอักษร", icon: Languages },
  { href: "/vocabulary", label: "คำศัพท์", icon: BookMarked },
  { href: "/travel", label: "เที่ยวญี่ปุ่น", icon: Plane },
  { href: "/progress", label: "ความก้าวหน้า", icon: BarChart3 },
  { href: "/account", label: "บัญชี & ซิงก์", icon: Cloud },
  { href: "/settings", label: "ตั้งค่า", icon: Settings },
] as const;

const MOBILE_PRIMARY = ["/", "/lessons", "/review", "/kana"];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function useThemeSync() {
  const progress = useProgress();
  const theme = progress?.settings.theme;
  useEffect(() => {
    if (!theme) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && mq.matches);
      document.documentElement.classList.toggle("dark", dark);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);
}

function useDueCount() {
  const progress = useProgress();
  const today = useToday();
  if (!progress || !today) return 0;
  return dueReviewItems(progress, today).length;
}

function DueBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="ml-auto min-w-5 h-5 px-1.5 rounded-full bg-sakura text-[11px] font-bold text-[#3a1a26] grid place-items-center">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function SideNav() {
  const pathname = usePathname();
  const due = useDueCount();
  return (
    <nav aria-label="เมนูหลัก" className="flex flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cx(
              "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[15px] font-medium transition",
              active ? "bg-sakura-soft text-sakura-deep" : "text-ink-soft hover:bg-surface-2 hover:text-ink",
            )}
          >
            <Icon size={19} aria-hidden />
            {label}
            {href === "/review" && <DueBadge count={due} />}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav() {
  const pathname = usePathname();
  const due = useDueCount();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  const primary = NAV.filter((n) => MOBILE_PRIMARY.includes(n.href));
  const moreActive = !MOBILE_PRIMARY.some((h) => isActive(pathname, h));
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="เมนูทั้งหมด">
          <button className="absolute inset-0 bg-black/30" aria-label="ปิดเมนู" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 rounded-t-3xl bg-surface p-4 pb-24 shadow-soft animate-fade-up">
            <div className="flex items-center justify-between mb-2 px-1">
              <p className="font-semibold">เมนูทั้งหมด</p>
              <button className="p-2 rounded-xl hover:bg-surface-2" onClick={() => setOpen(false)} aria-label="ปิด">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cx(
                    "flex flex-col items-center gap-1 rounded-2xl p-3 text-xs font-medium",
                    isActive(pathname, href) ? "bg-sakura-soft text-sakura-deep" : "bg-surface-2/60 text-ink",
                  )}
                >
                  <Icon size={22} aria-hidden />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <nav
        aria-label="เมนูหลัก"
        className="no-print fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-line bg-surface/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-5">
          {primary.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cx("relative flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium", active ? "text-sakura-deep" : "text-ink-soft")}
              >
                <Icon size={22} aria-hidden />
                {label}
                {href === "/review" && due > 0 && (
                  <span className="absolute top-1 right-[calc(50%-20px)] w-2.5 h-2.5 rounded-full bg-sakura" aria-label={`มี ${due} คำที่ต้องทบทวน`} />
                )}
              </Link>
            );
          })}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className={cx("flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium", moreActive || open ? "text-sakura-deep" : "text-ink-soft")}
          >
            <Menu size={22} aria-hidden />
            เพิ่มเติม
          </button>
        </div>
      </nav>
    </>
  );
}

function StorageWarning() {
  const progress = useProgress();
  const err = progress ? getStorageError() : null;
  if (!err) return null;
  return (
    <div role="alert" className="mb-4 rounded-2xl bg-danger-soft text-danger px-4 py-3 text-sm">
      ⚠️ {err}
    </div>
  );
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-2">
      <span className="grid place-items-center w-10 h-10 rounded-2xl bg-sakura-soft text-xl" aria-hidden>
        🌸
      </span>
      <span className="leading-tight">
        <span className="block font-bold text-ink jp">にほんご Tochigi</span>
        <span className="block text-xs text-ink-soft">เรียนญี่ปุ่นวันละ 20 นาที</span>
      </span>
    </Link>
  );
}

function SyncChip() {
  const sync = useSync();
  if (sync.status === "disabled") return null;
  const label = SYNC_LABEL[sync.status];
  return (
    <Link href="/account" className="mx-2 inline-flex items-center gap-1.5 text-xs text-ink-soft hover:text-ink">
      <span
        className={cx(
          "w-2 h-2 rounded-full",
          sync.status === "synced" ? "bg-matcha-deep" : sync.status === "error" ? "bg-danger" : sync.status === "syncing" ? "bg-sakura animate-pulse" : "bg-ink-soft/50",
        )}
        aria-hidden
      />
      {sync.status === "signed-out" ? "เข้าสู่ระบบเพื่อซิงก์" : label.text}
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  useThemeSync();
  useEffect(() => startSync(), []);
  return (
    <div className="min-h-dvh md:flex">
      <aside className="no-print hidden md:flex md:flex-col md:w-60 lg:w-64 shrink-0 sticky top-0 h-dvh border-r border-line bg-surface/60 p-4 gap-6">
        <Brand />
        <Suspense fallback={null}>
          <SideNav />
        </Suspense>
        <div className="mt-auto">
          <SyncChip />
        </div>
        <p className="px-2 text-xs text-ink-soft">
          เป้าหมาย: เที่ยวโทจิงิ 🍁
          <br />
          ปลายเดือนตุลาคม 2027
        </p>
      </aside>
      <div className="flex-1 min-w-0">
        <div className="md:hidden no-print px-4 pt-4">
          <Brand />
        </div>
        <main id="main" className="mx-auto max-w-5xl px-4 md:px-8 py-6 md:py-10 pb-28 md:pb-12">
          <StorageWarning />
          {children}
        </main>
      </div>
      <Suspense fallback={null}>
        <MobileNav />
      </Suspense>
    </div>
  );
}
