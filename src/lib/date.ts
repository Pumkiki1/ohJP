/**
 * Date helpers. All learning-day logic uses the learner's local calendar date
 * in Asia/Bangkok, represented as "YYYY-MM-DD" strings.
 */

export const TIME_ZONE = "Asia/Bangkok";

const isoFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function todayISO(now: Date = new Date()): string {
  return isoFormatter.format(now);
}

function toUTC(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function addDays(iso: string, n: number): string {
  const t = new Date(toUTC(iso) + n * 86400000);
  return t.toISOString().slice(0, 10);
}

/** b - a in days */
export function diffDays(a: string, b: string): number {
  return Math.round((toUTC(b) - toUTC(a)) / 86400000);
}

export function dayOfWeek(iso: string): number {
  return new Date(toUTC(iso)).getUTCDay();
}

/** Monday of the week containing iso */
export function startOfWeek(iso: string): string {
  const dow = dayOfWeek(iso); // 0 = Sun
  const offset = dow === 0 ? -6 : 1 - dow;
  return addDays(iso, offset);
}

export function formatThaiDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }): string {
  return new Intl.DateTimeFormat("th-TH", { ...opts, timeZone: "UTC" }).format(new Date(toUTC(iso)));
}

export function formatThaiWeekday(iso: string, style: "long" | "short" | "narrow" = "long"): string {
  return new Intl.DateTimeFormat("th-TH", { weekday: style, timeZone: "UTC" }).format(new Date(toUTC(iso)));
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

export function formatThaiMonth(key: string): string {
  return new Intl.DateTimeFormat("th-TH", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(toUTC(`${key}-01`)),
  );
}
