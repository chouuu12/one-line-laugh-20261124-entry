// The One-Line Laugh — make.fun entry.
// Writes one funny line to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set). Node 22, standard library only.
// No network, no input, the same bytes on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My smart fridge texted me that we are out of milk, then asked why I keep buying ice cream at 2 a.m.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE + "\n", "utf8");

// Fail fast: the file must hold exactly the one funny line, nothing else.
const written = readFileSync(outFile, "utf8");
if (written !== LINE + "\n") {
  throw new Error("entry.txt does not hold exactly the one funny line");
}
if (LINE.length > 200) {
  throw new Error("line is over the 200-character limit");
}
// Single sentence: ends with one terminal period and holds no
// sentence break (a terminator followed by a space and a capital).
if (!/[.]$/.test(LINE) || /[.?!]\s+[A-Z]/.test(LINE)) {
  throw new Error("line is not a single sentence");
}
