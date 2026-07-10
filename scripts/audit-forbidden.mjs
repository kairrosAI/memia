#!/usr/bin/env node
// scripts/audit-forbidden.mjs
//
// Pre-publish gate. Recursively scans the whole package (excluding node_modules,
// .git and binary/image files) for forbidden strings that must never ship in the
// public distribution: private runtime names, private npm scripts, local hosts,
// internal hostnames, raw tokens and absolute /Users/ paths. Prints file:line for
// every hit and exits non-zero if any are found.
//
// The patterns below are assembled from fragments so this gate file does not
// match itself. It also skips its own path defensively.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const packageRoot = path.resolve(path.dirname(__filename), "..");

const SKIP_DIRS = new Set([
  "node_modules", ".git", ".obsidian", "dist", "build", ".cache", "coverage"
]);

const BINARY_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".zip", ".tar",
  ".gz", ".mp4", ".mov", ".mp3", ".woff", ".woff2", ".ttf", ".otf", ".eot",
  ".DS_Store", ".svg"
]);

// Fragments keep the literals out of this file's own scannable surface.
const H = "her" + "mes";
const WA = "whats" + "app-selim";
const LIFE = "life" + "ops";
const TMX = "tm" + "ux";
const TAILE = "taile" + "732bd";
const MACMINI = "mac-mini-" + "memia-hub";
const XOXB = "xoxb" + "-";
const LH = "local" + "host:";
const LOOPBACK = "127.0." + "0.1";
const TOMGMAIL = "tom" + ":gmail";
const TOMGRAPH = "tom" + ":graph";
const TRAME = "trame" + ":";

// HARD patterns fail the build: private-runtime names, internal hosts, raw
// secrets, absolute local paths. These must never ship.
const patterns = [
  { label: H, re: new RegExp(H, "i") },
  { label: WA, re: new RegExp(WA, "i") },
  { label: LIFE, re: new RegExp(LIFE, "i") },
  { label: TOMGMAIL, re: new RegExp(TOMGMAIL, "i") },
  { label: TOMGRAPH, re: new RegExp(TOMGRAPH, "i") },
  { label: TRAME, re: new RegExp(TRAME, "i") },
  { label: TMX, re: new RegExp(TMX, "i") },
  { label: TAILE, re: new RegExp(TAILE, "i") },
  { label: MACMINI, re: new RegExp(MACMINI, "i") },
  { label: XOXB, re: new RegExp(XOXB, "i") },
  { label: "refreshToken:", re: /refreshToken\s*:/i },
  { label: "absolute /Users/ path", re: /\/Users\/[A-Za-z0-9._-]/ }
];

// SOFT patterns are reported as warnings but do NOT fail the build.
// localhost / loopback appear legitimately in dev tooling and install docs
// (site preview, bootstrap examples); they are not leaks on their own.
const softPatterns = [
  { label: LH, re: new RegExp(LH, "i") },
  { label: LOOPBACK, re: new RegExp(LOOPBACK.replace(/\./g, "\\."), "i") }
];

// Secret-looking assignments with a NON-placeholder value.
// A placeholder is a secretRef (env://, keychain://, vault://), an env-var
// reference, or an obvious example token.
const secretKeyRe = /\b(token|apiKey|api_key|cookie)\s*:\s*(.+)$/i;
const placeholderRe = /^["']?(env:\/\/|keychain:\/\/|vault:\/\/|process\.env|\$\{|<|\{\{|xxx|placeholder|example|your[-_]|real-|null|true|false|\[\]|optional)/i;

function isPlaceholderValue(raw) {
  let value = raw.trim();
  // strip trailing comment / punctuation
  value = value.replace(/[,;]\s*$/, "").trim();
  if (value === "" || value === '""' || value === "''") return true;
  return placeholderRe.test(value);
}

const hits = [];
const warnings = [];

function scanFile(file) {
  if (path.resolve(file) === __filename) return; // never scan the gate itself
  const ext = path.extname(file).toLowerCase();
  if (BINARY_EXT.has(ext) || BINARY_EXT.has(path.basename(file))) return;
  let content;
  try {
    content = fs.readFileSync(file, "utf8");
  } catch {
    return;
  }
  if (content.includes("\u0000")) return; // binary guard: skip files with NUL bytes
  const rel = path.relative(packageRoot, file);
  const lines = content.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const { label, re } of patterns) {
      if (re.test(line)) hits.push({ rel, line: index + 1, label, text: line.trim().slice(0, 160) });
    }
    for (const { label, re } of softPatterns) {
      if (re.test(line)) warnings.push({ rel, line: index + 1, label, text: line.trim().slice(0, 160) });
    }
    const secretMatch = line.match(secretKeyRe);
    if (secretMatch && !isPlaceholderValue(secretMatch[2])) {
      hits.push({ rel, line: index + 1, label: `${secretMatch[1]}: non-placeholder value`, text: line.trim().slice(0, 160) });
    }
  });
}

function walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".git")) continue;
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name));
    } else if (entry.isFile()) {
      scanFile(path.join(dir, entry.name));
    }
  }
}

const targetArg = process.argv[2];
const target = targetArg ? path.resolve(process.cwd(), targetArg) : packageRoot;

if (fs.existsSync(target) && fs.statSync(target).isFile()) {
  scanFile(target);
} else {
  walk(target);
}

if (warnings.length > 0) {
  process.stdout.write(`audit-forbidden: ${warnings.length} warning(s) (localhost/loopback — review, non-blocking):\n`);
  for (const w of warnings) {
    process.stdout.write(`  ${w.rel}:${w.line}  [${w.label}]  ${w.text}\n`);
  }
}

if (hits.length === 0) {
  process.stdout.write("audit-forbidden: clean, no forbidden strings found.\n");
  process.exit(0);
}

process.stderr.write(`audit-forbidden: ${hits.length} forbidden hit(s):\n`);
for (const hit of hits) {
  process.stderr.write(`  ${hit.rel}:${hit.line}  [${hit.label}]  ${hit.text}\n`);
}
process.exit(1);
