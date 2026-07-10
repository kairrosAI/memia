#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");

const requiredDirs = [
  "00 - Inbox/Captures",
  "01 - Projects",
  "02 - Control - Run",
  "03 - Resources & Assets/MEMIA",
  "03 - Resources & Assets/Methods",
  "03 - Resources & Assets/Registries",
  "03 - Resources & Assets/Templates",
  "03 - Resources & Assets/Tools",
  "04 - Workspaces",
  "05 - Archives",
  "_memia/registry",
  "_memia/logs",
  "_memia/runtime",
  "_memia/templates",
  "00 - Inbox/Surfaces/Gmail",
  "00 - Inbox/Surfaces/WhatsApp",
  "00 - Inbox/Surfaces/Calendars",
  "00 - Inbox/Surfaces/Meetings",
  "00 - Inbox/Surfaces/Files",
  "00 - Inbox/Surfaces/Signals",
  "html/assets/memia/logos",
  "agents/core",
  "agents/board",
  "agents/catalog",
  "governance",
  "connectors",
  "adapters"
];

const starterEntries = [
  ".env.example",
  ".gitignore",
  "BRAND.md",
  "CONTENT-LICENSE.md",
  "CONTRIBUTING.md",
  "INSTALLATION.md",
  "LICENSE",
  "LICENSE.md",
  "NOTICE",
  "OPERATING-MODE.md",
  "README.md",
  "SECURITY.md",
  "STRUCTURE.md",
  "TRADEMARKS.md",
  "_memia/README.md",
  "adapters",
  "agents",
  "connectors",
  "docs",
  "html",
  "mcp",
  "package.json",
  "scripts",
  "templates",
  "03 - Resources & Assets/MEMIA/CAPTURE-DESTINATIONS-ROUTINES.md",
  "03 - Resources & Assets/MEMIA/IPCRWA-DESTINATION-RULES.md"
];

const defaultGitignore = `# Environnements locaux
.env
.env.*
!.env.example

# Dépendances et builds
node_modules/
dist/
build/
.cache/
coverage/

# Caches d'outils
.codex/
.claude/
.cursor/
.venv/
__pycache__/

# Système
.DS_Store
Thumbs.db

# Logs et états locaux
*.log
connectors/*.local.json
_memia/logs/**/*.jsonl
_memia/logs/**/*.log
_memia/runtime/**
!_memia/runtime/.gitkeep

# Archives générées
*.zip
*.tar
*.tar.gz
`;

const defaultEnvExample = `MEMIA_INSTANCE_NAME="memia-local"
MEMIA_HTML_BASE_URL="http://localhost:8765/html"
MEMIA_TIMEZONE="Europe/Paris"
MEMIA_LLM_PROVIDER="manual"
`;

const defaultEnvLocal = `# MEMIA BPOS - configuration locale non suivie par Git.
MEMIA_INSTANCE_NAME="memia-local"
MEMIA_HTML_BASE_URL="http://localhost:8765/html"
MEMIA_TIMEZONE="Europe/Paris"
MEMIA_LLM_PROVIDER="manual"
`;

function resolveRoot(root) {
  return path.resolve(root || process.cwd());
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeIfMissing(file, content) {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, content);
  }
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function compactDate() {
  return today().replaceAll("-", "");
}

function readTemplate(base, relativePath, fallback = "") {
  const local = path.join(base, relativePath);
  if (fs.existsSync(local)) return fs.readFileSync(local, "utf8");
  const packaged = path.join(packageRoot, relativePath);
  if (fs.existsSync(packaged)) return fs.readFileSync(packaged, "utf8");
  return fallback;
}

function createItem(root, type, name, domain = "General") {
  const base = resolveRoot(root);
  const slug = slugify(name);
  if (!slug) throw new Error("nom invalide");

  if (type === "capture") {
    const file = path.join(base, "00 - Inbox/Captures", `${today()}-${slug}.md`);
    let content = readTemplate(base, "templates/CAPTURE.md", "# Capture\n");
    content = content
      .replace("created_at: YYYY-MM-DDTHH:mm:ss+01:00", `created_at: ${new Date().toISOString()}`)
      .replace("# Capture", `# ${name}`);
    writeIfMissing(file, content.endsWith("\n") ? content : `${content}\n`);
    return { type, path: path.relative(base, file) };
  }

  if (type === "project") {
    const code = `PRJ-${compactDate()}-${slug}`;
    const dir = path.join(base, "01 - Projects", domain, code);
    ensureDir(dir);
    writeIfMissing(path.join(dir, "README.md"), readTemplate(base, "templates/PROJECT/README.md", "# <Code projet> - <Nom du projet>\n").replace("<Code projet>", code).replace("<Nom du projet>", name));
    writeIfMissing(path.join(dir, "HANDOVER.md"), readTemplate(base, "templates/PROJECT/HANDOVER.md", "# Handover\n"));
    writeIfMissing(path.join(dir, "DECISIONS.md"), readTemplate(base, "templates/PROJECT/DECISIONS.md", "# Decisions\n"));
    return { type, path: path.relative(base, dir) };
  }

  if (type === "run") {
    const code = `RUN-${compactDate()}-${slug}`;
    const dir = path.join(base, "02 - Control - Run", domain, code);
    ensureDir(dir);
    writeIfMissing(path.join(dir, "README.md"), readTemplate(base, "templates/RUN/README.md", "# <Nom du run>\n").replace("<Nom du run>", name));
    writeIfMissing(path.join(dir, "HANDOVER.md"), readTemplate(base, "templates/RUN/HANDOVER.md", "# Handover\n"));
    writeIfMissing(path.join(dir, "DECISIONS.md"), readTemplate(base, "templates/RUN/DECISIONS.md", "# Decisions\n"));
    return { type, path: path.relative(base, dir) };
  }

  if (type === "workspace") {
    const dir = path.join(base, "04 - Workspaces", `${today()}-${slug}`);
    ensureDir(path.join(dir, "inputs"));
    ensureDir(path.join(dir, "outputs"));
    writeIfMissing(path.join(dir, "README.md"), readTemplate(base, "templates/WORKSPACE/README.md", "# Workspace\n").replace("# Workspace", `# ${name}`));
    writeIfMissing(path.join(dir, "notes.md"), readTemplate(base, "templates/WORKSPACE/notes.md", "# Notes\n"));
    writeIfMissing(path.join(dir, "inputs/.gitkeep"), "");
    writeIfMissing(path.join(dir, "outputs/.gitkeep"), "");
    return { type, path: path.relative(base, dir) };
  }

  throw new Error(`type non supporté: ${type}`);
}

function surfaceLane(surface) {
  const key = slugify(surface);
  const lanes = {
    gmail: "Gmail",
    email: "Gmail",
    mail: "Gmail",
    whatsapp: "WhatsApp",
    calendar: "Calendars",
    calendars: "Calendars",
    calendrier: "Calendars",
    meeting: "Meetings",
    meetings: "Meetings",
    reunion: "Meetings",
    file: "Files",
    files: "Files",
    document: "Files",
    signal: "Signals",
    signals: "Signals",
    webhook: "Signals"
  };
  return lanes[key] || "Signals";
}

function createSurfaceCapture(root, surface, name) {
  const base = resolveRoot(root);
  const lane = surfaceLane(surface);
  const slug = slugify(name);
  if (!slug) throw new Error("nom invalide");
  const file = path.join(base, "00 - Inbox/Surfaces", lane, `${today()}-${slug}.md`);
  let content = readTemplate(base, "templates/SURFACE-CAPTURE.md", "# Surface Capture\n");
  content = content
    .replace("surface: unknown", `surface: ${lane}`)
    .replace("created_at: YYYY-MM-DDTHH:mm:ss+01:00", `created_at: ${new Date().toISOString()}`)
    .replace("# Surface Capture", `# ${name}`);
  writeIfMissing(file, content.endsWith("\n") ? content : `${content}\n`);
  return { surface: lane, path: path.relative(base, file) };
}

function copyIfMissing(source, target) {
  if (!fs.existsSync(source)) return;
  if (path.resolve(source) === path.resolve(target)) return;
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    ensureDir(target);
    for (const entry of fs.readdirSync(source)) {
      copyIfMissing(path.join(source, entry), path.join(target, entry));
    }
    return;
  }
  if (!fs.existsSync(target)) {
    ensureDir(path.dirname(target));
    fs.copyFileSync(source, target);
  }
}

function readJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeDefaultConfigFiles(base) {
  writeIfMissing(path.join(base, ".gitignore"), defaultGitignore);
  writeIfMissing(path.join(base, ".env.example"), defaultEnvExample);
  writeIfMissing(path.join(base, ".env.local"), defaultEnvLocal);
}

function writeObsidianConfig(base) {
  ensureDir(path.join(base, ".obsidian"));
  writeIfMissing(path.join(base, ".obsidian/app.json"), JSON.stringify({
    alwaysUpdateLinks: true,
    newFileLocation: "current",
    attachmentFolderPath: "03 - Resources & Assets/Attachments"
  }, null, 2) + "\n");
  writeIfMissing(path.join(base, ".obsidian/core-plugins.json"), JSON.stringify([
    "file-explorer",
    "global-search",
    "graph",
    "backlink",
    "outgoing-link",
    "tag-pane"
  ], null, 2) + "\n");
  writeIfMissing(path.join(base, "03 - Resources & Assets/MEMIA/OBSIDIAN.md"), [
    "# Obsidian avec MEMIA BPOS",
    "",
    "Ouvrir la racine MEMIA comme vault Obsidian.",
    "",
    "MEMIA reste la source de vérité opérationnelle. Obsidian sert à lire, naviguer et relier les notes Markdown.",
    ""
  ].join("\n"));
}

function manifest(root) {
  return readJson(path.join(resolveRoot(root), "agents/manifest.json"), readJson(path.join(packageRoot, "agents/manifest.json"), { agents: [] }));
}

function surfaces(root) {
  const base = resolveRoot(root || packageRoot);
  const candidates = [
    path.join(base, "connectors/surfaces.local.json"),
    path.join(base, "connectors/surfaces.example.json"),
    path.join(packageRoot, "connectors/surfaces.example.json")
  ];
  const file = candidates.find((candidate) => fs.existsSync(candidate));
  return file ? readJson(file, { surfaces: [] }) : { surfaces: [] };
}

function surfaceConfigPath(root) {
  return path.join(resolveRoot(root), "connectors/surfaces.local.json");
}

function normalizeSurfacesConfig(config) {
  if (Array.isArray(config.surfaces)) return config;
  if (config.surfaces && typeof config.surfaces === "object") {
    return {
      ...config,
      surfaces: Object.entries(config.surfaces).map(([id, value]) => ({ id, ...value }))
    };
  }
  return { product: "MEMIA BPOS", version: 1, surfaces: [] };
}

function loadSurfaceExample(root) {
  const base = resolveRoot(root || packageRoot);
  const candidates = [
    path.join(base, "connectors/surfaces.example.json"),
    path.join(packageRoot, "connectors/surfaces.example.json")
  ];
  const file = candidates.find((candidate) => fs.existsSync(candidate));
  if (!file) return { product: "MEMIA BPOS", version: 1, surfaces: [] };
  return normalizeSurfacesConfig(readJson(file, { surfaces: [] }));
}

function initSurfacesConfig(root) {
  const base = resolveRoot(root);
  const target = surfaceConfigPath(base);
  if (fs.existsSync(target)) return { path: path.relative(base, target), created: false };
  const example = loadSurfaceExample(base);
  const local = {
    product: "MEMIA BPOS",
    version: example.version || 1,
    principle: example.principle,
    generated_at: new Date().toISOString(),
    surfaces: (example.surfaces || []).map((surface) => ({
      ...surface,
      enabled: false,
      mode: null,
      read_window_days: 7,
      max_items_per_run: 50,
      write_actions: "approval_required",
      connected_at: null,
      notes: "Configurer localement les variables d'environnement. Ne jamais écrire de secret dans ce fichier."
    }))
  };
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, JSON.stringify(local, null, 2) + "\n");
  return { path: path.relative(base, target), created: true };
}

function readLocalSurfacesConfig(root) {
  const base = resolveRoot(root);
  const target = surfaceConfigPath(base);
  if (!fs.existsSync(target)) initSurfacesConfig(base);
  return normalizeSurfacesConfig(readJson(target, { surfaces: [] }));
}

function writeLocalSurfacesConfig(root, config) {
  const base = resolveRoot(root);
  const target = surfaceConfigPath(base);
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, JSON.stringify(config, null, 2) + "\n");
}

function findSurfaceConfig(config, id) {
  const key = slugify(id);
  return (config.surfaces || []).find((surface) => slugify(surface.id) === key || slugify(surface.label) === key);
}

function connectSurface(root, surfaceId, options = {}) {
  const base = resolveRoot(root);
  const config = readLocalSurfacesConfig(base);
  const surface = findSurfaceConfig(config, surfaceId);
  if (!surface) return { error: "surface_inconnue", surface: surfaceId };
  const mode = options.mode || surface.mode || (surface.modes || [])[0] || "manual";
  if (surface.modes && surface.modes.length && !surface.modes.includes(mode)) {
    return { error: "mode_non_supporte", surface: surface.id, mode, supported_modes: surface.modes };
  }
  surface.enabled = true;
  surface.mode = mode;
  surface.connected_at = new Date().toISOString();
  surface.write_actions = "approval_required";
  if (options.bridge_url) {
    surface.bridge_url = options.bridge_url;
    surface.bridge_url_env = "MEMIA_WHATSAPP_BRIDGE_URL";
  }
  if (options.provider) surface.provider = options.provider;
  if (options.read_window_days) surface.read_window_days = options.read_window_days;
  if (options.max_items_per_run) surface.max_items_per_run = options.max_items_per_run;
  writeLocalSurfacesConfig(base, config);
  ensureDir(path.join(base, "_memia/runtime/surfaces", surface.id));
  fs.writeFileSync(path.join(base, "_memia/runtime/surfaces", surface.id, "connection.json"), JSON.stringify({
    id: surface.id,
    label: surface.label,
    mode: surface.mode,
    enabled: true,
    connected_at: surface.connected_at,
    write_actions: surface.write_actions,
    bridge_url: options.bridge_url || undefined,
    bridge_url_env: options.bridge_url ? "MEMIA_WHATSAPP_BRIDGE_URL" : undefined
  }, null, 2) + "\n");
  return { surface: surface.id, enabled: true, mode, write_actions: surface.write_actions };
}

function disconnectSurface(root, surfaceId) {
  const base = resolveRoot(root);
  const config = readLocalSurfacesConfig(base);
  const surface = findSurfaceConfig(config, surfaceId);
  if (!surface) return { error: "surface_inconnue", surface: surfaceId };
  surface.enabled = false;
  surface.disconnected_at = new Date().toISOString();
  writeLocalSurfacesConfig(base, config);
  return { surface: surface.id, enabled: false };
}

function surfacesStatus(root) {
  const config = surfaces(root);
  return {
    count: (config.surfaces || []).length,
    surfaces: (config.surfaces || []).map((surface) => ({
      id: surface.id,
      label: surface.label,
      enabled: Boolean(surface.enabled),
      mode: surface.mode || null,
      inbox: surface.inbox,
      write_actions: surface.write_actions || "approval_required"
    }))
  };
}

function extractQrPayload(value) {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return extractQrPayload(JSON.parse(value));
    } catch {
      return value.trim() || null;
    }
  }
  if (value.qr) return value.qr;
  if (value.qrText) return value.qrText;
  if (value.qr_code) return value.qr_code;
  if (value.code) return value.code;
  if (value.payload) return value.payload;
  if (value.dataUrl) return value.dataUrl;
  if (value.qrDataUrl) return value.qrDataUrl;
  if (value.image) return value.image;
  if (value.data) return extractQrPayload(value.data);
  return null;
}

async function requestWhatsAppQr(root, bridgeUrl) {
  const baseRoot = resolveRoot(root);
  const localConfig = fs.existsSync(surfaceConfigPath(baseRoot)) ? readLocalSurfacesConfig(baseRoot) : { surfaces: [] };
  const whatsappConfig = findSurfaceConfig(localConfig, "whatsapp") || {};
  const url = bridgeUrl || process.env.MEMIA_WHATSAPP_BRIDGE_URL || whatsappConfig.bridge_url;
  if (!url) {
    return {
      status: "bridge_missing",
      next: [
        "Démarrer un bridge WhatsApp local compatible.",
        "Configurer MEMIA_WHATSAPP_BRIDGE_URL ou appeler memia_surface_connect avec bridge_url.",
        "Relancer memia_whatsapp_qr."
      ]
    };
  }
  const bridge = url.replace(/\/+$/, "");
  const endpoints = ["/session/qr", "/qr", "/api/whatsapp/qr", "/whatsapp/qr"];
  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${bridge}${endpoint}`, { method: "GET" });
      if (!response.ok) {
        lastError = `${endpoint}: HTTP ${response.status}`;
        continue;
      }
      const text = await response.text();
      const payload = extractQrPayload(text);
      if (!payload) {
        lastError = `${endpoint}: réponse sans QR exploitable`;
        continue;
      }
      ensureDir(path.join(baseRoot, "_memia/runtime/surfaces/whatsapp"));
      if (payload.startsWith("data:image/")) {
        const file = path.join(baseRoot, "_memia/runtime/surfaces/whatsapp/qr.html");
        fs.writeFileSync(file, `<!doctype html><meta charset="utf-8"><title>MEMIA WhatsApp QR</title><img alt="WhatsApp QR" src="${payload}" style="max-width:420px;width:100%">`);
        return { status: "qr_received", type: "data_url", path: path.relative(baseRoot, file) };
      }
      const file = path.join(baseRoot, "_memia/runtime/surfaces/whatsapp/qr.txt");
      fs.writeFileSync(file, `${payload}\n`);
      return { status: "qr_received", type: "payload", path: path.relative(baseRoot, file), payload };
    } catch (error) {
      lastError = `${endpoint}: ${error.message}`;
    }
  }
  return { status: "qr_unavailable", error: lastError };
}

function status(root) {
  const base = resolveRoot(root);
  const missing = requiredDirs.filter((dir) => !fs.existsSync(path.join(base, dir)));
  const capturesDir = path.join(base, "00 - Inbox/Captures");
  const workspacesDir = path.join(base, "04 - Workspaces");
  const captures = fs.existsSync(capturesDir)
    ? fs.readdirSync(capturesDir).filter((name) => !name.startsWith(".")).length
    : 0;
  const workspaces = fs.existsSync(workspacesDir)
    ? fs.readdirSync(workspacesDir).filter((name) => {
        if (name.startsWith(".")) return false;
        return fs.statSync(path.join(workspacesDir, name)).isDirectory();
      }).length
    : 0;
  const git = spawnSync("git", ["status", "--short"], { cwd: base, encoding: "utf8" });
  return {
    root: base,
    product: "MEMIA BPOS",
    required_dirs: requiredDirs.length,
    missing_dirs: missing,
    captures,
    workspaces,
    git_changes: git.status === 0 ? git.stdout.trim().split("\n").filter(Boolean).length : null,
    git_available: git.status === 0
  };
}

function bootstrap(root, options = {}) {
  const base = resolveRoot(root);
  for (const dir of requiredDirs) ensureDir(path.join(base, dir));
  for (const entry of starterEntries) copyIfMissing(path.join(packageRoot, entry), path.join(base, entry));
  writeDefaultConfigFiles(base);
  if (options.obsidian) {
    writeObsidianConfig(base);
  }
  if (options.git && !fs.existsSync(path.join(base, ".git"))) {
    spawnSync("git", ["init"], { cwd: base, stdio: "ignore" });
  }
  return status(base);
}

function textResult(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  return { content: [{ type: "text", text }] };
}

const server = new McpServer({
  name: "memia",
  version: "0.1.0"
});

server.registerTool("memia_status", {
  title: "MEMIA BPOS status",
  description: "Inspecte une instance MEMIA BPOS locale.",
  inputSchema: {
    root: z.string().optional().describe("Chemin de l'instance MEMIA BPOS. Défaut: dossier courant.")
  }
}, async ({ root }) => textResult(status(root)));

server.registerTool("memia_bootstrap", {
  title: "MEMIA BPOS bootstrap",
  description: "Crée ou complète l'arborescence IPCRWA d'une instance MEMIA BPOS.",
  inputSchema: {
    root: z.string().optional().describe("Chemin cible. Défaut: dossier courant."),
    obsidian: z.boolean().optional().describe("Ajoute une configuration Obsidian minimale."),
    git: z.boolean().optional().describe("Initialise Git si aucun dépôt n'existe.")
  }
}, async ({ root, obsidian = false, git = false }) => textResult(bootstrap(root, { obsidian, git })));

server.registerTool("memia_agents_list", {
  title: "MEMIA BPOS agents list",
  description: "Liste les agents MEMIA BPOS intégrés au package.",
  inputSchema: {
    root: z.string().optional(),
    query: z.string().optional(),
    limit: z.number().int().min(1).max(250).optional()
  }
}, async ({ root, query = "", limit = 50 }) => {
  const q = query.toLowerCase();
  const agents = manifest(root).agents
    .filter((agent) => !q || [
      agent.id,
      agent.name,
      agent.category,
      agent.summary,
      ...(agent.tags || [])
    ].join(" ").toLowerCase().includes(q))
    .slice(0, limit)
    .map((agent) => ({
      id: agent.id,
      name: agent.name,
      category: agent.category,
      status: agent.kind || "catalog",
      summary: agent.summary,
      file: agent.file
    }));
  return textResult({ count: agents.length, agents });
});

server.registerTool("memia_surfaces_list", {
  title: "MEMIA BPOS surfaces list",
  description: "Liste les surfaces de capture configurables.",
  inputSchema: {
    root: z.string().optional()
  }
}, async ({ root }) => textResult(surfaces(root)));

server.registerTool("memia_surfaces_init", {
  title: "MEMIA BPOS surfaces init",
  description: "Crée la configuration locale des surfaces à partir de l'exemple du package.",
  inputSchema: {
    root: z.string().optional()
  }
}, async ({ root }) => textResult(initSurfacesConfig(root)));

server.registerTool("memia_surfaces_status", {
  title: "MEMIA BPOS surfaces status",
  description: "Affiche l'état des surfaces MEMIA BPOS configurées localement.",
  inputSchema: {
    root: z.string().optional()
  }
}, async ({ root }) => textResult(surfacesStatus(root)));

server.registerTool("memia_surface_connect", {
  title: "MEMIA BPOS surface connect",
  description: "Active une surface en lecture contrôlée et écrit son état local.",
  inputSchema: {
    root: z.string().optional(),
    surface: z.string().min(1),
    mode: z.string().optional(),
    bridge_url: z.string().optional(),
    provider: z.string().optional(),
    read_window_days: z.number().int().min(1).max(365).optional(),
    max_items_per_run: z.number().int().min(1).max(10000).optional()
  }
}, async ({ root, surface, mode, bridge_url, provider, read_window_days, max_items_per_run }) => textResult(connectSurface(root, surface, {
  mode,
  bridge_url,
  provider,
  read_window_days,
  max_items_per_run
})));

server.registerTool("memia_surface_disconnect", {
  title: "MEMIA BPOS surface disconnect",
  description: "Désactive une surface dans la configuration locale MEMIA BPOS.",
  inputSchema: {
    root: z.string().optional(),
    surface: z.string().min(1)
  }
}, async ({ root, surface }) => textResult(disconnectSurface(root, surface)));

server.registerTool("memia_whatsapp_qr", {
  title: "MEMIA BPOS WhatsApp QR",
  description: "Demande un QR WhatsApp à un bridge local compatible et écrit le résultat dans le runtime local.",
  inputSchema: {
    root: z.string().optional(),
    bridge_url: z.string().optional()
  }
}, async ({ root, bridge_url }) => textResult(await requestWhatsAppQr(root, bridge_url)));

server.registerTool("memia_create_item", {
  title: "MEMIA BPOS create item",
  description: "Crée une capture, un projet, un run ou un workspace MEMIA BPOS.",
  inputSchema: {
    root: z.string().optional(),
    type: z.enum(["capture", "project", "run", "workspace"]),
    name: z.string().min(1),
    domain: z.string().optional().describe("Domaine IPCRWA pour project/run. Défaut: General.")
  }
}, async ({ root, type, name, domain = "General" }) => textResult(createItem(root, type, name, domain)));

server.registerTool("memia_surface_capture", {
  title: "MEMIA BPOS surface capture",
  description: "Dépose un signal issu d'une surface connectée dans l'inbox MEMIA BPOS.",
  inputSchema: {
    root: z.string().optional(),
    surface: z.enum(["gmail", "email", "whatsapp", "calendar", "calendars", "meeting", "meetings", "file", "files", "signal", "signals", "webhook"]),
    name: z.string().min(1)
  }
}, async ({ root, surface, name }) => textResult(createSurfaceCapture(root, surface, name)));

server.registerTool("memia_agent_show", {
  title: "MEMIA BPOS agent show",
  description: "Affiche la fiche complète d'un agent MEMIA BPOS.",
  inputSchema: {
    root: z.string().optional(),
    id: z.string().describe("Identifiant ou nom exact de l'agent.")
  }
}, async ({ root, id }) => {
  const agent = manifest(root).agents.find((item) => item.id === id || item.name.toLowerCase() === id.toLowerCase());
  if (!agent) return textResult({ error: "agent_introuvable", id });
  const base = resolveRoot(root || packageRoot);
  const file = agent.file ? path.join(base, agent.file) : null;
  return textResult({
    ...agent,
    body: file && fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null
  });
});

const transport = new StdioServerTransport();
await server.connect(transport);
