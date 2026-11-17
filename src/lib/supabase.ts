"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase browser client. The app works without it (guest mode, localStorage only);
 * set the two env vars in .env.local to enable login + database sync.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const PROGRESS_TABLE = "learner_progress";

export const isSupabaseConfigured = Boolean(url && key);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured || typeof window === "undefined") return null;
  if (!client) {
    client = createClient(url!, key!, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: "nihongo-tochigi:auth" },
    });
  }
  return client;
}
