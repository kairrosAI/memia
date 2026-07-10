// connectors/runtime/adapters/local-files.mjs
//
// Native verified adapter: scans a local folder and turns candidate files into
// MEMIA captures. Read-only. Never deletes, moves or shares a source file, and
// never performs an L5 action. Works out of the box against any readable folder.

import fs from "node:fs";
import path from "node:path";
import { makeCapture, IPCRWA } from "../capture.mjs";

export const id = "local-files";

const CAPTURE_EXTENSIONS = new Set([
  ".md", ".txt", ".markdown", ".pdf", ".json", ".csv",
  ".doc", ".docx", ".rtf", ".html", ".htm"
]);

function resolveTarget(config = {}) {
  const target = config.path || process.env.MEMIA_FILES_ROOT || "00 - Inbox/Captures";
  return path.resolve(process.cwd(), target);
}

function listCandidates(dir) {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (CAPTURE_EXTENSIONS.has(ext)) {
        let stat;
        try {
          stat = fs.statSync(full);
        } catch {
          continue;
        }
        out.push({
          name: entry.name,
          path: full,
          ext,
          size: stat.size,
          modified: stat.mtime.toISOString()
        });
      }
    }
  }
  return out.sort((a, b) => b.modified.localeCompare(a.modified));
}

export async function probe(config = {}) {
  const dir = resolveTarget(config);
  if (!fs.existsSync(dir)) {
    return { ok: false, status: "not_configured", message: `Folder not found: ${dir}` };
  }
  try {
    fs.accessSync(dir, fs.constants.R_OK);
  } catch {
    return { ok: false, status: "unreadable", message: `Folder not readable: ${dir}` };
  }
  const candidates = listCandidates(dir);
  return {
    ok: true,
    status: "ready",
    message: `Folder readable: ${dir}`,
    folder: dir,
    candidateCount: candidates.length
  };
}

export async function sample(config = {}, n = 5) {
  const dir = resolveTarget(config);
  const candidates = listCandidates(dir).slice(0, n);
  return {
    ok: true,
    folder: dir,
    count: candidates.length,
    items: candidates
  };
}

export async function dryRun(config = {}, n = 5) {
  const dir = resolveTarget(config);
  const candidates = listCandidates(dir).slice(0, n);
  const captures = candidates.map((file) =>
    makeCapture({
      source: id,
      type: "document",
      title: file.name,
      content: `Local file candidate (${file.ext}, ${file.size} bytes). Not imported in dry-run.`,
      author: null,
      date: file.modified,
      ipcrwa: IPCRWA.SURFACE_FILES
    })
  );
  return {
    ok: true,
    folder: dir,
    wouldCapture: captures.length,
    captures
  };
}

export default { id, probe, sample, dryRun };
