/** Small deterministic PRNG so generated exercises are stable between renders. */
export function seededRandom(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    // mulberry32
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Pick `count` distinct distractors from `pool` that are not equal to `answer`. */
export function pickDistractors<T>(answer: T, pool: readonly T[], count: number, rand: () => number): T[] {
  const unique = Array.from(new Set(pool.filter((p) => p !== answer)));
  return shuffle(unique, rand).slice(0, count);
}

/** Build a shuffled option list containing the answer. */
export function makeOptions<T>(answer: T, pool: readonly T[], count: number, rand: () => number): T[] {
  return shuffle([answer, ...pickDistractors(answer, pool, count - 1, rand)], rand);
}
