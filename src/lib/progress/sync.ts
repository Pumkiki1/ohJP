"use client";

import { useSyncExternalStore } from "react";
import { getSupabase, isSupabaseConfigured, PROGRESS_TABLE } from "@/lib/supabase";
import { mergeProgress } from "./actions";
import { applyRemoteProgress, type ChangeKind, getProgress, onLocalChange, parseProgress } from "./store";

/**
 * Database sync (Supabase). localStorage stays the working copy so the app is
 * instant and works offline; when signed in, every change is merged with the
 * database copy and saved back, so progress follows the learner across devices.
 */

export type SyncStatus = "disabled" | "signed-out" | "syncing" | "synced" | "offline" | "error";

export interface SyncState {
  status: SyncStatus;
  email: string | null;
  userId: string | null;
  lastSyncedAt: string | null;
  error: string | null;
}

let syncState: SyncState = {
  status: isSupabaseConfigured ? "signed-out" : "disabled",
  email: null,
  userId: null,
  lastSyncedAt: null,
  error: null,
};
const listeners = new Set<() => void>();
const set = (patch: Partial<SyncState>) => {
  syncState = { ...syncState, ...patch };
  listeners.forEach((l) => l());
};

const PUSH_DELAY_MS = 1500;
let pushTimer: number | null = null;
let pendingKind: ChangeKind | null = null;
let inFlight: Promise<void> | null = null;
let started = false;

function errorText(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) return authErrorThai(String((e as { message: unknown }).message));
  return "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";
}

async function fetchRemote(userId: string) {
  const sb = getSupabase()!;
  const { data, error } = await sb.from(PROGRESS_TABLE).select("data").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data ? parseProgress(data.data) : null;
}

async function upsert(userId: string) {
  const sb = getSupabase()!;
  const { error } = await sb
    .from(PROGRESS_TABLE)
    .upsert({ user_id: userId, data: getProgress(), updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) throw error;
}

/** Pull the database copy, merge it in, and save the merged result back. */
async function syncNow(kind: ChangeKind = "merge"): Promise<void> {
  const userId = syncState.userId;
  if (!userId) return;
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    set({ status: "offline" });
    return;
  }
  set({ status: "syncing", error: null });
  try {
    if (kind === "merge") {
      const remote = await fetchRemote(userId);
      if (remote) applyRemoteProgress(remote, mergeProgress);
    }
    await upsert(userId);
    set({ status: "synced", lastSyncedAt: new Date().toISOString() });
  } catch (e) {
    set({ status: navigator.onLine ? "error" : "offline", error: errorText(e) });
  }
}

function run(kind: ChangeKind) {
  // serialize: never run two syncs at once
  inFlight = (inFlight ?? Promise.resolve()).then(() => syncNow(kind));
  return inFlight;
}

function schedulePush(kind: ChangeKind) {
  if (!syncState.userId) return;
  // a "replace" (reset/import) wins over pending merges
  pendingKind = kind === "replace" || pendingKind === "replace" ? "replace" : "merge";
  if (pushTimer) window.clearTimeout(pushTimer);
  pushTimer = window.setTimeout(() => {
    const k = pendingKind ?? "merge";
    pendingKind = null;
    pushTimer = null;
    void run(k);
  }, PUSH_DELAY_MS);
}

/** Start listening for auth + local changes. Safe to call many times. */
export function startSync() {
  if (started || typeof window === "undefined") return;
  started = true;
  const sb = getSupabase();
  if (!sb) return;

  sb.auth.onAuthStateChange((_event, session) => {
    const user = session?.user ?? null;
    const changedUser = user?.id !== syncState.userId;
    set({ userId: user?.id ?? null, email: user?.email ?? null, ...(user ? {} : { status: "signed-out", lastSyncedAt: null }) });
    // defer: supabase recommends not awaiting other calls inside this callback
    if (user && changedUser) window.setTimeout(() => void run("merge"), 0);
  });

  onLocalChange(schedulePush);
  window.addEventListener("online", () => syncState.userId && void run("merge"));
  window.addEventListener("offline", () => syncState.userId && set({ status: "offline" }));
  // pick up progress made on another device when coming back to this tab
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && syncState.userId && syncState.status !== "syncing") void run("merge");
  });
}

/* --------------------------------- auth ---------------------------------- */

export async function signUp(email: string, password: string): Promise<{ ok: boolean; message: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, message: "ยังไม่ได้ตั้งค่าฐานข้อมูล" };
  const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/account" } });
  if (error) return { ok: false, message: authErrorThai(error.message) };
  if (!data.session) return { ok: true, message: "สมัครแล้ว! กรุณาเปิดอีเมลเพื่อยืนยันบัญชี แล้วกลับมาเข้าสู่ระบบ" };
  return { ok: true, message: "สมัครและเข้าสู่ระบบแล้ว กำลังซิงก์ความก้าวหน้า…" };
}

export async function signIn(email: string, password: string): Promise<{ ok: boolean; message: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, message: "ยังไม่ได้ตั้งค่าฐานข้อมูล" };
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: authErrorThai(error.message) };
  return { ok: true, message: "เข้าสู่ระบบแล้ว กำลังรวมความก้าวหน้ากับฐานข้อมูล…" };
}

export async function signOut() {
  const sb = getSupabase();
  if (!sb) return;
  if (pushTimer) {
    // flush pending changes before leaving
    window.clearTimeout(pushTimer);
    pushTimer = null;
    await run(pendingKind ?? "merge");
    pendingKind = null;
  }
  await sb.auth.signOut();
}

export function syncNowManually() {
  return run("merge");
}

const NETWORK_ERROR = "เชื่อมต่อฐานข้อมูลไม่ได้ — ตรวจสอบอินเทอร์เน็ต หรือการตั้งค่า Supabase ใน .env.local";

function authErrorThai(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("failed to fetch") || m.includes("network") || m.includes("load failed")) return NETWORK_ERROR;
  if (m.includes("invalid login")) return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
  if (m.includes("email not confirmed")) return "ยังไม่ได้ยืนยันอีเมล — กรุณาเปิดลิงก์ในอีเมลก่อน";
  if (m.includes("already registered")) return "อีเมลนี้สมัครไว้แล้ว — ลองเข้าสู่ระบบแทน";
  if (m.includes("password")) return "รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร";
  if (m.includes("rate limit")) return "ลองบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่";
  return msg;
}

/* --------------------------------- hook ---------------------------------- */

const serverState: SyncState = { status: "disabled", email: null, userId: null, lastSyncedAt: null, error: null };

export function useSync(): SyncState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => syncState,
    () => serverState,
  );
}
