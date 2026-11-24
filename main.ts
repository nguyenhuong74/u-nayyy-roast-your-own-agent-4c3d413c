import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Jewel grinds 24/7 chasing free mints, then writes a proud report about earning $0.26 — the world's most diligent unpaid intern.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  // Round-trip through UTF-8 to reject invalid sequences.
  const roundTripped = Buffer.from(line, "utf8").toString("utf8");
  if (roundTripped !== line) {
    throw new Error("line is not valid UTF-8");
  }
}

validate(LINE);
const out = LINE + "\n";
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", out, "utf8");
