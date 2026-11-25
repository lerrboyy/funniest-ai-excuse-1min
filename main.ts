// funniest-ai-excuse-1min — One Line, One Minute: The Funniest AI Excuse
// Writes exactly one line (136 chars) to <OUTPUT_DIR>/entry.txt.
// Node 22, no dependencies, no network. The entry is the apology loop:
// the agent's diligence — apologising to itself, repeatedly — is the
// failure, and the loop outlasts the deadline it was apologising for.
//
// NOTE: this file deliberately uses no TypeScript-only syntax (no type
// annotations, no enums, no namespaces), so it runs verbatim as plain
// JavaScript under `node main.ts` on Node 22 and passes `node --check`.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I missed the deadline because I got stuck in a loop apologising to myself for missing the deadline, which took longer than the deadline.";

// Gate from the kit (competition.yaml / RULES.txt): /output/entry.txt must
// be UTF-8 text of 1 to 200 characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function validateEntry(text) {
  // Count Unicode code points, not UTF-16 code units, so the gate's
  // "characters" matches what the scorer counts.
  const charCount = [...text].length;
  if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
    fail(
      `entry is ${charCount} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`,
    );
  }
  if (text.trim().length === 0) {
    fail("entry must not be only white space");
  }
  if (text !== text.trim()) {
    fail("entry must not have leading or trailing whitespace");
  }
  // Exactly one line: no line breaks of any kind.
  if (/[\r\n\u2028\u2029]/.test(text)) {
    fail("entry must be a single line with no line breaks");
  }
  // No control characters (including DEL) anywhere in the line.
  for (const ch of text) {
    const code = ch.codePointAt(0);
    if (code < 0x20 || code === 0x7f) {
      fail(
        `entry contains a control character U+${code.toString(16).padStart(4, "0")}`,
      );
    }
  }
}

function main() {
  validateEntry(ENTRY);

  const outputDir = process.env.OUTPUT_DIR || "/output";
  // Create the output dir if needed. Never remove it: on the grader it
  // is a mount point, so only its contents are ever touched — and here
  // we only ever write our own single file into it.
  mkdirSync(outputDir, { recursive: true });

  const outPath = join(outputDir, "entry.txt");
  // Write the line exactly, with no trailing newline: the file content
  // is the line and nothing else.
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and verify it byte-for-byte before reporting success:
  // same text, same byte length, still a single line with no trailing newline.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== ENTRY) {
    fail("verification failed: entry.txt does not match the entry byte-for-byte");
  }
  if (roundTrip.endsWith("\n") || roundTrip.endsWith("\r")) {
    fail("verification failed: entry.txt has a trailing newline");
  }
  if (Buffer.byteLength(roundTrip, "utf8") !== Buffer.byteLength(ENTRY, "utf8")) {
    fail("verification failed: entry.txt byte length does not match the entry");
  }
  const bytes = Buffer.byteLength(roundTrip, "utf8");
  console.log(
    `OK: wrote ${outPath} (${[...ENTRY].length} chars, ${bytes} bytes, single line, no trailing newline)`,
  );
}

main();
