import type { Lesson } from "@/lib/types";
import { PHASE1_LESSONS } from "./phase1";
import { PHASE2_LESSONS } from "./phase2";

/** All fully-authored lessons. Add new phase files here as content is written. */
export const AUTHORED_LESSONS: Lesson[] = [...PHASE1_LESSONS, ...PHASE2_LESSONS];
