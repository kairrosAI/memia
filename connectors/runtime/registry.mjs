// connectors/runtime/registry.mjs
//
// Loads and validates the MEMIA connector registries.
//
// YAML approach (chosen to run with ZERO new dependencies):
// The package already depends on `zod` but not on a YAML library. Rather than
// add a heavy parser or duplicate every registry as a JSON sidecar, this module
// ships a tiny, indentation-based YAML *subset* reader. It supports exactly the
// shapes the registries use: block mappings, block sequences, sequences of
// mappings, nested maps/lists, quoted and bare scalars, booleans, integers and
// full-line `#` comments. It intentionally does NOT support anchors, flow
// collections, multi-line scalars or inline comments — the registries are
// authored to stay inside that subset. Parsed output is then validated with zod.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const registryDir = path.resolve(__dirname, "..", "registry");

// ---------------------------------------------------------------------------
// Minimal YAML subset parser
// ---------------------------------------------------------------------------

function indentOf(line) {
  return line.length - line.replace(/^\s+/, "").length;
}

function parseScalar(raw) {
  const s = raw.trim();
  if (s === "") return null;
  if (s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1);
  if (s.startsWith("'") && s.endsWith("'")) return s.slice(1, -1);
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null" || s === "~") return null;
  if (/^-?\d+$/.test(s)) return Number.parseInt(s, 10);
  if (/^-?\d+\.\d+$/.test(s)) return Number.parseFloat(s);
  return s;
}

export function parseYaml(text) {
  const lines = [];
  for (const rawLine of text.split(/\r?\n/)) {
    if (rawLine.trim() === "") continue;
    if (rawLine.trimStart().startsWith("#")) continue;
    lines.push(rawLine.replace(/\s+$/, ""));
  }

  let i = 0;

  function parseNode() {
    const line = lines[i];
    const indent = indentOf(line);
    if (line.slice(indent).startsWith("- ") || line.slice(indent) === "-") {
      return parseSeq(indent);
    }
    return parseMap(indent);
  }

  function parseMap(indent) {
    const obj = {};
    while (i < lines.length) {
      const line = lines[i];
      const ind = indentOf(line);
      if (ind !== indent) break;
      const content = line.slice(indent);
      if (content.startsWith("- ")) break; // belongs to a parent sequence
      const match = content.match(/^([^:]+):(.*)$/);
      if (!match) {
        i += 1;
        continue;
      }
      const key = match[1].trim();
      const rest = match[2].trim();
      i += 1;
      if (rest === "") {
        if (i < lines.length && indentOf(lines[i]) > indent) {
          obj[key] = parseNode();
        } else {
          obj[key] = null;
        }
      } else {
        obj[key] = parseScalar(rest);
      }
    }
    return obj;
  }

  function parseSeq(indent) {
    const arr = [];
    while (i < lines.length) {
      const line = lines[i];
      const ind = indentOf(line);
      if (ind !== indent) break;
      const content = line.slice(indent);
      if (!content.startsWith("- ")) break;
      const after = content.slice(2);
      const itemIndent = indent + 2;
      const asMap = after.match(/^([^:]+):(.*)$/);
      if (asMap && !after.startsWith('"') && !after.startsWith("'")) {
        // Sequence item that is itself a mapping. Re-align this line to the
        // item indent so parseMap reads the first key plus its siblings.
        lines[i] = " ".repeat(itemIndent) + after;
        arr.push(parseMap(itemIndent));
      } else {
        arr.push(parseScalar(after));
        i += 1;
      }
    }
    return arr;
  }

  if (lines.length === 0) return {};
  return parseNode();
}

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const governanceSchema = z.object({
  defaultMode: z.string(),
  l5RequiresApproval: z.boolean().optional(),
  auditLog: z.boolean().optional()
});

const capabilitiesSchema = z.object({
  read: z.array(z.string()).optional().default([]),
  write: z.array(z.string()).optional().default([]),
  forbidden: z.array(z.string()).optional().default([])
});

const nativeConnectorSchema = z.object({
  id: z.string(),
  name: z.string(),
  family: z.string(),
  supportLevel: z.literal("native"),
  implementationStatus: z.literal("verified"),
  adapter: z.object({
    type: z.string(),
    module: z.string(),
    configHint: z.string().optional()
  }),
  auth: z.object({ secretRef: z.string() }).optional(),
  capabilities: capabilitiesSchema,
  sync: z.record(z.string(), z.any()).optional(),
  governance: governanceSchema
});

const scaffoldConnectorSchema = z.object({
  id: z.string(),
  name: z.string(),
  family: z.string(),
  supportLevel: z.enum(["native", "gateway", "mcp"]),
  implementationStatus: z.literal("scaffolded"),
  adapter: z.record(z.string(), z.any()),
  reads: z.array(z.string()).optional().default([]),
  writes: z.array(z.string()).optional().default([]),
  mapping: z.record(z.string(), z.string()).optional().default({}),
  conditionsToVerify: z.array(z.string()).optional().default([]),
  nextProbeCommand: z.string().optional()
});

const nativeFileSchema = z.object({
  schema: z.string(),
  updatedAt: z.any().optional(),
  principles: z.array(z.string()).optional(),
  connectors: z.array(nativeConnectorSchema)
});

const scaffoldFileSchema = z.object({
  schema: z.string(),
  updatedAt: z.any().optional(),
  statusRule: z.string().optional(),
  defaultGovernance: z.record(z.string(), z.any()).optional(),
  publicProbe: z.string().optional(),
  connectors: z.array(scaffoldConnectorSchema)
});

// ---------------------------------------------------------------------------
// Loaders
// ---------------------------------------------------------------------------

function readYamlFile(file) {
  if (!fs.existsSync(file)) return null;
  return parseYaml(fs.readFileSync(file, "utf8"));
}

export function loadNativeRegistry() {
  const parsed = readYamlFile(path.join(registryDir, "native-connectors.yaml"));
  if (!parsed) return { schema: null, connectors: [] };
  return nativeFileSchema.parse(parsed);
}

export function loadScaffoldRegistry() {
  const parsed = readYamlFile(path.join(registryDir, "scaffold-connectors.yaml"));
  if (!parsed) return { schema: null, connectors: [] };
  return scaffoldFileSchema.parse(parsed);
}

export function badgeFor(entry) {
  if (entry.supportLevel === "native" && entry.implementationStatus === "verified") {
    return "Native verified";
  }
  if (entry.supportLevel === "native" && entry.implementationStatus === "scaffolded") {
    return "Native scaffolded";
  }
  if (entry.supportLevel === "mcp") return "Via assistant";
  return "Gateway";
}

export function loadAllConnectors() {
  const native = loadNativeRegistry();
  const scaffold = loadScaffoldRegistry();
  const entries = [];
  for (const c of native.connectors) {
    entries.push({ ...c, kind: "native", badge: badgeFor(c) });
  }
  for (const c of scaffold.connectors) {
    entries.push({ ...c, kind: "scaffold", badge: badgeFor(c) });
  }
  return entries;
}

export function findConnector(id) {
  return loadAllConnectors().find((c) => c.id === id);
}
