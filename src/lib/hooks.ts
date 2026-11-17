"use client";

import { useEffect, useSyncExternalStore } from "react";
import { todayISO } from "@/lib/date";
import { addStudySeconds } from "@/lib/progress/actions";
import { updateProgress } from "@/lib/progress/store";

/* ----------------------------- today (Bangkok) ---------------------------- */

let cachedToday: string | null = null;
function getToday() {
  const t = todayISO();
  if (t !== cachedToday) cachedToday = t;
  return cachedToday;
}
function subscribeToday(cb: () => void) {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
}

/** Today's date in Asia/Bangkok; null during server render. */
export function useToday(): string | null {
  return useSyncExternalStore(subscribeToday, getToday, () => null);
}

/* ------------------------------ study timer ------------------------------- */

const TICK_SECONDS = 15;

/** Adds real study time to today's log while the page is visible and `active` is true. */
export function useStudyTimer(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        updateProgress((p) => addStudySeconds(p, todayISO(), TICK_SECONDS));
      }
    }, TICK_SECONDS * 1000);
    return () => window.clearInterval(id);
  }, [active]);
}

/* ------------------------------ speech (TTS) ------------------------------ */

export type SpeechStatus = "loading" | "ready" | "no-voice" | "unsupported";

let voiceStatus: SpeechStatus = "loading";
let jaVoice: SpeechSynthesisVoice | null = null;
const speechListeners = new Set<() => void>();
let speechInit = false;

function refreshVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    voiceStatus = "unsupported";
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  const ja = voices.filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith("ja"));
  jaVoice = ja.find((v) => /google|kyoko|nanami|haruka|ayumi|o-ren/i.test(v.name)) ?? ja[0] ?? null;
  if (jaVoice) voiceStatus = "ready";
  else if (voices.length > 0) voiceStatus = "no-voice";
  speechListeners.forEach((l) => l());
}

function initSpeech() {
  if (speechInit || typeof window === "undefined") return;
  speechInit = true;
  if (!("speechSynthesis" in window)) {
    voiceStatus = "unsupported";
    return;
  }
  refreshVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", refreshVoices);
  // Some browsers never fire voiceschanged; settle after a short wait.
  window.setTimeout(() => {
    refreshVoices();
    if (voiceStatus === "loading") {
      voiceStatus = "no-voice";
      speechListeners.forEach((l) => l());
    }
  }, 2500);
}

function subscribeSpeech(cb: () => void) {
  initSpeech();
  speechListeners.add(cb);
  return () => {
    speechListeners.delete(cb);
  };
}

export function useSpeechStatus(): SpeechStatus {
  return useSyncExternalStore(
    subscribeSpeech,
    () => voiceStatus,
    () => "loading" as SpeechStatus,
  );
}

/** Speak Japanese text with a ja-JP voice. Returns false when no Japanese voice is available. */
export function speakJapanese(text: string, opts: { slow?: boolean; onEnd?: () => void } = {}): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !jaVoice) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/\s+/g, ""));
  u.lang = "ja-JP";
  u.voice = jaVoice;
  u.rate = opts.slow ? 0.6 : 0.9;
  if (opts.onEnd) {
    u.onend = opts.onEnd;
    u.onerror = opts.onEnd;
  }
  synth.speak(u);
  return true;
}
