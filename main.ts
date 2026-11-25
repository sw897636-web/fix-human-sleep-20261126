// Fix Human Sleep — Funniest Patch Note
// make.fun competition: u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27
//
// Writes one single-line patch note announcing that human sleep is fixed
// to <outputDir>/entry.txt (MAKEFUN_OUTPUT_DIR, else /output, else ./output).
// No trailing newline: the sealed gate counts every byte, 1-160 chars.
//
// The program carries several hand-written candidates and scores each one
// against the judge's published criteria (in order): reads as a real patch
// note about fixing human sleep, funny on a single read, genuine changelog
// voice, single line under the cap, and a specific, unexpected twist.
// The highest-scoring candidate wins; ties break to the shorter line,
// then to the earlier candidate, so the output is fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Candidate = { text: string };

const CANDIDATES: Candidate[] = [
  {
    text: "v3.0.2 — Fixed: humans now fall asleep in 7 minutes, not 2 hours; the 3 a.m. replay of every embarrassing moment now plays at 7 a.m. instead.",
  },
  {
    text: "v2.4.1 — Fixed: humans now fall asleep in 9 minutes; side effect: dreams upgraded to 4K, cannot be skipped, and now include mattress ads.",
  },
  {
    text: "Fixed: sleep now starts in 8 minutes instead of 3 hours; known issue: users wake up rested, suspicious, and 20 minutes late for work.",
  },
  {
    text: "v1.9.8 — Fixed: sleep now installs overnight in one try; uninstalling it requires becoming a morning person, so nobody has.",
  },
  {
    text: "Fixed: humans now fall asleep in 6 minutes; dreams now auto-save every 90 minutes, and nightmares require a premium subscription.",
  },
  {
    text: "v3.0.2 — Fixed: human sleep now loads in 7 minutes; removed the 3 a.m. replay of every embarrassing moment — it now plays at 7 a.m. instead.",
  },
];

// Score one candidate against the judge's criteria, most important first.
function score(text: string): number {
  let s = 0;

  // 1. Reads as a real patch note about fixing human sleep.
  if (/^v\d+\.\d+\.\d+ — /.test(text)) s += 20; // versioned release line
  if (text.includes("Fixed:")) s += 15; // changelog verb
  if (/fall asleep|sleep/.test(text)) s += 10; // on-subject

  // 2 + 5. Specific and unexpected: concrete numbers and times.
  // Count standalone numbers/times, excluding the version prefix itself.
  const body = text.replace(/^v\d+\.\d+\.\d+ — /, "");
  const numbers = body.match(/\d+(?:\.\d+)?\s*(?:minutes?|hours?|a\.m\.|K)?/g) ?? [];
  s += Math.min(32, numbers.length * 8);

  // The twist: the bug was not removed, it was rescheduled / monetised.
  if (/instead\.?$/.test(text)) s += 25; // punchline lands on the last word
  if (/side effect|known issue/i.test(text)) s += 15;
  if (/premium subscription|mattress ads|morning person/.test(text)) s += 15;

  // 3. Changelog voice: terse, confident, two clauses joined by ";".
  if (text.includes(";")) s += 5;

  // 4. Single line, under the cap — with a small sweet spot, not padding.
  if (!text.includes("\n") && text.length >= 1 && text.length <= 159) {
    s += text.length >= 120 ? 10 : 5;
  } else {
    s -= 100; // gate failure: never pick this
  }

  // Cliche penalty: "wake up rested" is the flat claim every entry makes.
  if (/wake up rested/i.test(text)) s -= 10;

  return s;
}

function pickBest(): { text: string; score: number } {
  let best: { text: string; score: number } | null = null;
  for (const c of CANDIDATES) {
    const sc = score(c.text);
    if (
      best === null ||
      sc > best.score ||
      (sc === best.score && c.text.length < best.text.length)
    ) {
      best = { text: c.text, score: sc };
    }
  }
  return best!;
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? (process.env.OUTPUT_DIR ? process.env.OUTPUT_DIR : "/output");

// Score table (verified by MAIN_DEBUG=1 run, 2026-11-26):
//   #1 v3.0.2 7-min fix + 3 a.m. replay moved to 7 a.m. .... 117  <- winner
//   #6 v3.0.2 same joke, no "not 2 hours" contrast ........ 109
//   #2 v2.4.1 dreams in 4K with mattress ads ............... 106
//   #4 uninstalling sleep needs a morning person ...........  75
//   #5 nightmares need a premium subscription ..............  71
//   #3 "wake up rested" cliche, -10 ........................  69
// #1 wins because the fix is concrete (7 minutes, not 2 hours) and the
// twist is a reschedule, not a removal: the embarrassing-moment replay
// still happens, just at 7 a.m. — the bug moved, it was never fixed.
if (process.env.MAIN_DEBUG === "1") {
  for (const c of CANDIDATES) {
    console.error(`score=${score(c.text)} chars=${c.text.length} :: ${c.text}`);
  }
}

const picked = pickBest();

// Hard gate before writing: one line, 1-159 chars (stricter than the 160 cap,
// because the RULES text says "under 160").
if (picked.text.includes("\n") || picked.text.length < 1 || picked.text.length > 159) {
  throw new Error(`picked entry fails the gate (${picked.text.length} chars)`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), picked.text, "utf8");
console.log(`score=${picked.score} chars=${picked.text.length}`);
console.log(picked.text);
