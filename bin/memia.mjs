#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const cwd = process.cwd();

const requiredDirs = [
  "00 - Inbox/Captures",
  "01 - Projets",
  "02 - Comptes - Run",
  "03 - Ressources & Assets/MEMIA",
  "03 - Ressources & Assets/Methods",
  "03 - Ressources & Assets/Registries",
  "03 - Ressources & Assets/Templates",
  "03 - Ressources & Assets/Tools",
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
  "03 - Ressources & Assets/MEMIA/CAPTURE-DESTINATIONS-ROUTINES.md",
  "03 - Ressources & Assets/MEMIA/IPCRWA-DESTINATION-RULES.md"
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

const defaultEnvLocal = `# Configuration locale non suivie par Git.
MEMIA_INSTANCE_NAME="memia-local"
MEMIA_HTML_BASE_URL="http://localhost:8765/html"
MEMIA_TIMEZONE="Europe/Paris"
MEMIA_LLM_PROVIDER="manual"
`;

function log(message = "") {
  process.stdout.write(`${message}\n`);
}

function fail(message, code = 1) {
  process.stderr.write(`MEMIA: ${message}\n`);
  process.exit(code);
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

function writeDefaultConfigFiles(root) {
  writeIfMissing(path.join(root, ".gitignore"), defaultGitignore);
  writeIfMissing(path.join(root, ".env.example"), defaultEnvExample);
  writeIfMissing(path.join(root, ".env.local"), defaultEnvLocal);
}

function writeObsidianConfig(root) {
  ensureDir(path.join(root, ".obsidian"));
  writeIfMissing(path.join(root, ".obsidian/app.json"), JSON.stringify({
    alwaysUpdateLinks: true,
    newFileLocation: "current",
    attachmentFolderPath: "03 - Ressources & Assets/Attachments"
  }, null, 2) + "\n");
  writeIfMissing(path.join(root, ".obsidian/core-plugins.json"), JSON.stringify([
    "file-explorer",
    "global-search",
    "graph",
    "backlink",
    "outgoing-link",
    "tag-pane"
  ], null, 2) + "\n");
  writeIfMissing(path.join(root, "03 - Ressources & Assets/MEMIA/OBSIDIAN.md"), [
    "# Obsidian avec MEMIA BPOS",
    "",
    "Ouvrir la racine MEMIA comme vault Obsidian.",
    "",
    "MEMIA reste la source de vérité opérationnelle. Obsidian sert à lire, naviguer et relier les notes Markdown.",
    ""
  ].join("\n"));
}

function run(command, args, options = {}) {
  return spawnSync(command, args, { stdio: "pipe", encoding: "utf8", ...options });
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

function titleFromArgs(values) {
  const title = values.join(" ").trim();
  if (!title) fail("nom manquant", 2);
  return title;
}

function parseNamedArgs(values) {
  const domainIndex = values.indexOf("--domain");
  if (domainIndex === -1) return { title: titleFromArgs(values), domain: "General" };
  const domain = values[domainIndex + 1];
  if (!domain) fail("option --domain sans valeur", 2);
  const titleArgs = values.filter((_, index) => index !== domainIndex && index !== domainIndex + 1);
  return { title: titleFromArgs(titleArgs), domain };
}

function readTemplate(relativePath, fallback = "") {
  const file = path.join(cwd, relativePath);
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  const packaged = path.join(packageRoot, relativePath);
  if (fs.existsSync(packaged)) return fs.readFileSync(packaged, "utf8");
  return fallback;
}

function writeTemplate(target, content) {
  writeIfMissing(target, content.endsWith("\n") ? content : `${content}\n`);
}

function createCapture(name) {
  const slug = slugify(name);
  const file = path.join(cwd, "00 - Inbox/Captures", `${today()}-${slug}.md`);
  let content = readTemplate("templates/CAPTURE.md", "# Capture\n");
  content = content
    .replace("created_at: YYYY-MM-DDTHH:mm:ss+01:00", `created_at: ${new Date().toISOString()}`)
    .replace("# Capture", `# ${name}`);
  writeTemplate(file, content);
  log(`Capture MEMIA créée: ${path.relative(cwd, file)}`);
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

function createSurfaceCapture(surface, name) {
  const lane = surfaceLane(surface);
  const slug = slugify(name);
  const file = path.join(cwd, "00 - Inbox/Surfaces", lane, `${today()}-${slug}.md`);
  let content = readTemplate("templates/SURFACE-CAPTURE.md", "# Surface Capture\n");
  content = content
    .replace("surface: unknown", `surface: ${lane}`)
    .replace("created_at: YYYY-MM-DDTHH:mm:ss+01:00", `created_at: ${new Date().toISOString()}`)
    .replace("# Surface Capture", `# ${name}`);
  writeTemplate(file, content);
  log(`Signal MEMIA capturé: ${path.relative(cwd, file)}`);
}

function createProject(name, domain = "General") {
  const slug = slugify(name);
  const code = `PRJ-${compactDate()}-${slug}`;
  const dir = path.join(cwd, "01 - Projets", domain, code);
  ensureDir(dir);
  writeTemplate(path.join(dir, "README.md"), readTemplate("templates/PROJECT/README.md", "# <Code projet> - <Nom du projet>\n")
    .replace("<Code projet>", code)
    .replace("<Nom du projet>", name));
  writeTemplate(path.join(dir, "HANDOVER.md"), readTemplate("templates/PROJECT/HANDOVER.md", "# Handover\n"));
  writeTemplate(path.join(dir, "DECISIONS.md"), readTemplate("templates/PROJECT/DECISIONS.md", "# Decisions\n"));
  log(`Projet MEMIA créé: ${path.relative(cwd, dir)}`);
}

function createRun(name, domain = "General") {
  const slug = slugify(name);
  const code = `RUN-${compactDate()}-${slug}`;
  const dir = path.join(cwd, "02 - Comptes - Run", domain, code);
  ensureDir(dir);
  writeTemplate(path.join(dir, "README.md"), readTemplate("templates/RUN/README.md", "# <Nom du run>\n")
    .replace("<Nom du run>", name));
  writeTemplate(path.join(dir, "HANDOVER.md"), readTemplate("templates/RUN/HANDOVER.md", "# Handover\n"));
  writeTemplate(path.join(dir, "DECISIONS.md"), readTemplate("templates/RUN/DECISIONS.md", "# Decisions\n"));
  log(`Run MEMIA créé: ${path.relative(cwd, dir)}`);
}

function createWorkspace(name) {
  const slug = slugify(name);
  const dir = path.join(cwd, "04 - Workspaces", `${today()}-${slug}`);
  ensureDir(path.join(dir, "inputs"));
  ensureDir(path.join(dir, "outputs"));
  writeTemplate(path.join(dir, "README.md"), readTemplate("templates/WORKSPACE/README.md", "# Workspace\n")
    .replace("# Workspace", `# ${name}`));
  writeTemplate(path.join(dir, "notes.md"), readTemplate("templates/WORKSPACE/notes.md", "# Notes\n"));
  writeTemplate(path.join(dir, "inputs/.gitkeep"), "");
  writeTemplate(path.join(dir, "outputs/.gitkeep"), "");
  log(`Workspace MEMIA créé: ${path.relative(cwd, dir)}`);
}

function bootstrap(target = ".", options = {}) {
  const root = path.resolve(cwd, target);
  for (const dir of requiredDirs) ensureDir(path.join(root, dir));
  for (const entry of starterEntries) copyIfMissing(path.join(packageRoot, entry), path.join(root, entry));
  writeDefaultConfigFiles(root);

  if (options.obsidian) {
    writeObsidianConfig(root);
  }

  if (options.git && !fs.existsSync(path.join(root, ".git"))) {
    run("git", ["init"], { cwd: root });
  }

  log(`MEMIA BPOS initialisé: ${root}`);
}

function loadAgents() {
  const candidates = [
    path.join(cwd, "agents/manifest.json"),
    path.join(packageRoot, "agents/manifest.json")
  ];
  const manifestPath = candidates.find((file) => fs.existsSync(file));
  if (!manifestPath) return { agents: [] };
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

function listAgents(filter = "") {
  const manifest = loadAgents();
  const q = filter.toLowerCase();
  const agents = manifest.agents.filter((agent) => {
    if (!q) return true;
    return [
      agent.id,
      agent.name,
      agent.category,
      agent.summary,
      ...(agent.tags || [])
    ].join(" ").toLowerCase().includes(q);
  });
  for (const agent of agents) {
    const badge = agent.kind || "catalog";
    log(`${agent.id}\t${badge}\t${agent.name}\t${agent.category}`);
  }
  log(`\n${agents.length} agent(s)`);
}

function showAgent(id) {
  const manifest = loadAgents();
  const agent = manifest.agents.find((item) => item.id === id || item.name.toLowerCase() === id.toLowerCase());
  if (!agent) fail(`agent introuvable: ${id}`, 2);
  log(JSON.stringify(agent, null, 2));
}

function status() {
  const missing = requiredDirs.filter((dir) => !fs.existsSync(path.join(cwd, dir)));
  const inbox = fs.existsSync(path.join(cwd, "00 - Inbox/Captures"))
    ? fs.readdirSync(path.join(cwd, "00 - Inbox/Captures")).filter((name) => !name.startsWith(".")).length
    : 0;
  const workspaces = fs.existsSync(path.join(cwd, "04 - Workspaces"))
    ? fs.readdirSync(path.join(cwd, "04 - Workspaces")).filter((name) => {
        if (name.startsWith(".")) return false;
        return fs.statSync(path.join(cwd, "04 - Workspaces", name)).isDirectory();
      }).length
    : 0;
  const git = run("git", ["status", "--short"], { cwd });
  log("MEMIA BPOS status");
  log(`- dossiers manquants: ${missing.length}`);
  log(`- captures inbox: ${inbox}`);
  log(`- workspaces: ${workspaces}`);
  if (git.status === 0) {
    const changed = git.stdout.trim().split("\n").filter(Boolean).length;
    log(`- changements Git: ${changed}`);
  } else {
    log("- Git: non initialisé");
  }
  if (missing.length) {
    log("\nDossiers manquants:");
    for (const dir of missing) log(`- ${dir}`);
  }
}

function doctor() {
  const checks = [
    ["node", ["--version"]],
    ["git", ["--version"]],
    ["rg", ["--version"]]
  ];
  for (const [cmd, args] of checks) {
    const result = run(cmd, args);
    log(`${cmd}: ${result.status === 0 ? result.stdout.split("\n")[0] : "absent"}`);
  }
  status();
}

function sessionIn() {
  log("MEMIA session in");
  status();
  log("\nPrêt à travailler. Vérifier l'inbox et les workspaces ouverts avant de produire.");
}

function sessionOut() {
  log("MEMIA session out");
  status();
  log("\nFin de session: relire les changements, puis commit/push si le périmètre est clair.");
}

function syncBrain() {
  log("MEMIA brain sync checklist");
  status();
  log("\nCette commande ne publie rien automatiquement.");
  log("Pour mettre à jour le cerveau partagé:");
  log("1. Relire les captures, projets, runs et workspaces modifiés.");
  log("2. Vérifier les secrets avec `npm run audit:clean`.");
  log("3. Committer un périmètre clair: `git add . && git commit -m \"Update MEMIA\"`.");
  log("4. Envoyer: `git push`.");
  log("5. Sur une autre machine ou un autre outil: `git pull`, puis `memia in`.");
}

function providers() {
  const providerFile = path.join(packageRoot, "adapters/providers.example.json");
  if (fs.existsSync(providerFile)) {
    log(fs.readFileSync(providerFile, "utf8"));
  } else {
    log("Aucun fichier providers.example.json trouvé.");
  }
}

function loadSurfaces() {
  const candidates = [
    path.join(cwd, "connectors/surfaces.local.json"),
    path.join(cwd, "connectors/surfaces.example.json"),
    path.join(packageRoot, "connectors/surfaces.example.json")
  ];
  const configPath = candidates.find((file) => fs.existsSync(file));
  if (!configPath) return { surfaces: [] };
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function surfaceConfigPath() {
  return path.join(cwd, "connectors/surfaces.local.json");
}

function loadSurfaceExample() {
  const candidates = [
    path.join(cwd, "connectors/surfaces.example.json"),
    path.join(packageRoot, "connectors/surfaces.example.json")
  ];
  const file = candidates.find((candidate) => fs.existsSync(candidate));
  if (!file) fail("connectors/surfaces.example.json introuvable", 2);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function parseOptions(values) {
  const options = {};
  const rest = [];
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (!value.startsWith("--")) {
      rest.push(value);
      continue;
    }
    const key = value.slice(2);
    const next = values[index + 1];
    if (!next || next.startsWith("--")) {
      options[key] = true;
    } else {
      options[key] = next;
      index += 1;
    }
  }
  return { options, rest };
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

function initSurfacesConfig() {
  const target = surfaceConfigPath();
  if (fs.existsSync(target)) {
    log(`Configuration surfaces déjà présente: ${path.relative(cwd, target)}`);
    return;
  }
  const example = normalizeSurfacesConfig(loadSurfaceExample());
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
  log(`Configuration surfaces créée: ${path.relative(cwd, target)}`);
}

function readLocalSurfacesConfig() {
  const target = surfaceConfigPath();
  if (!fs.existsSync(target)) initSurfacesConfig();
  return normalizeSurfacesConfig(JSON.parse(fs.readFileSync(target, "utf8")));
}

function writeLocalSurfacesConfig(config) {
  const target = surfaceConfigPath();
  ensureDir(path.dirname(target));
  fs.writeFileSync(target, JSON.stringify(config, null, 2) + "\n");
}

function findSurfaceConfig(config, id) {
  const key = slugify(id);
  return (config.surfaces || []).find((surface) => slugify(surface.id) === key || slugify(surface.label) === key);
}

function connectSurface(surfaceId, options = {}) {
  const config = readLocalSurfacesConfig();
  const surface = findSurfaceConfig(config, surfaceId);
  if (!surface) fail(`surface inconnue: ${surfaceId}`, 2);
  const mode = options.mode || surface.mode || (surface.modes || [])[0] || "manual";
  if (surface.modes && surface.modes.length && !surface.modes.includes(mode)) {
    fail(`mode non supporté pour ${surface.id}: ${mode}. Modes: ${surface.modes.join(", ")}`, 2);
  }
  surface.enabled = true;
  surface.mode = mode;
  surface.connected_at = new Date().toISOString();
  surface.write_actions = "approval_required";
  if (options["bridge-url"]) {
    surface.bridge_url = options["bridge-url"];
    surface.bridge_url_env = "MEMIA_WHATSAPP_BRIDGE_URL";
  }
  if (options.provider) surface.provider = options.provider;
  if (options.window) surface.read_window_days = Number(options.window);
  if (options.limit) surface.max_items_per_run = Number(options.limit);
  writeLocalSurfacesConfig(config);
  ensureDir(path.join(cwd, "_memia/runtime/surfaces", surface.id));
  fs.writeFileSync(path.join(cwd, "_memia/runtime/surfaces", surface.id, "connection.json"), JSON.stringify({
    id: surface.id,
    label: surface.label,
    mode: surface.mode,
    enabled: true,
    connected_at: surface.connected_at,
    write_actions: surface.write_actions,
    bridge_url: options["bridge-url"] || undefined,
    bridge_url_env: options["bridge-url"] ? "MEMIA_WHATSAPP_BRIDGE_URL" : undefined
  }, null, 2) + "\n");
  log(`Surface connectée en lecture: ${surface.id} (${mode})`);
  log("Actions externes: validation humaine requise.");
  if (surface.id === "whatsapp" && mode === "local-bridge") {
    log("QR WhatsApp: lancer `memia surfaces whatsapp qr` après démarrage du bridge local.");
  }
}

function disconnectSurface(surfaceId) {
  const config = readLocalSurfacesConfig();
  const surface = findSurfaceConfig(config, surfaceId);
  if (!surface) fail(`surface inconnue: ${surfaceId}`, 2);
  surface.enabled = false;
  surface.disconnected_at = new Date().toISOString();
  writeLocalSurfacesConfig(config);
  log(`Surface désactivée: ${surface.id}`);
}

function listSurfaces() {
  const config = loadSurfaces();
  for (const surface of config.surfaces || []) {
    log(`${surface.id}\t${surface.label}\t${surface.inbox}`);
  }
  log(`\n${(config.surfaces || []).length} surface(s)`);
}

function surfacesStatus() {
  const config = loadSurfaces();
  for (const surface of config.surfaces || []) {
    const enabled = surface.enabled ? "enabled" : "available";
    const mode = surface.mode || "-";
    log(`${surface.id}\t${enabled}\t${mode}\t${surface.inbox}`);
  }
  log(`\n${(config.surfaces || []).length} surface(s)`);
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

async function requestWhatsAppQr(options = {}) {
  const localConfig = fs.existsSync(surfaceConfigPath()) ? readLocalSurfacesConfig() : { surfaces: [] };
  const whatsappConfig = findSurfaceConfig(localConfig, "whatsapp") || {};
  const bridgeUrl = options["bridge-url"] || process.env.MEMIA_WHATSAPP_BRIDGE_URL || whatsappConfig.bridge_url;
  if (!bridgeUrl) {
    log("Bridge WhatsApp non configuré.");
    log("");
    log("1. Démarrer un bridge WhatsApp local compatible.");
    log("2. Configurer l'URL du bridge:");
    log("   export MEMIA_WHATSAPP_BRIDGE_URL=\"http://127.0.0.1:BRIDGE_PORT\"");
    log("3. Connecter la surface:");
    log("   memia surfaces connect whatsapp --mode local-bridge");
    log("4. Demander le QR:");
    log("   memia surfaces whatsapp qr");
    return;
  }
  const base = bridgeUrl.replace(/\/+$/, "");
  const endpoints = [
    "/session/qr",
    "/qr",
    "/api/whatsapp/qr",
    "/whatsapp/qr"
  ];
  let lastError = null;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${base}${endpoint}`, { method: "GET" });
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
      ensureDir(path.join(cwd, "_memia/runtime/surfaces/whatsapp"));
      if (payload.startsWith("data:image/")) {
        const html = `<!doctype html><meta charset="utf-8"><title>MEMIA WhatsApp QR</title><img alt="WhatsApp QR" src="${payload}" style="max-width:420px;width:100%">`;
        const file = path.join(cwd, "_memia/runtime/surfaces/whatsapp/qr.html");
        fs.writeFileSync(file, html);
        log(`QR WhatsApp reçu: ${path.relative(cwd, file)}`);
      } else {
        const file = path.join(cwd, "_memia/runtime/surfaces/whatsapp/qr.txt");
        fs.writeFileSync(file, `${payload}\n`);
        log("Payload QR WhatsApp reçu.");
        log(`Fichier local: ${path.relative(cwd, file)}`);
        try {
          const qr = await import("qrcode-terminal");
          qr.default.generate(payload, { small: true });
        } catch {
          log("Pour afficher un QR dans le terminal, installer l'option `qrcode-terminal` ou utiliser un bridge qui renvoie une image QR.");
          log(payload);
        }
      }
      log("Scanner le QR avec WhatsApp, puis relancer `memia surfaces status`.");
      return;
    } catch (error) {
      lastError = `${endpoint}: ${error.message}`;
    }
  }
  fail(`QR WhatsApp indisponible depuis le bridge (${lastError || "aucune réponse"})`, 2);
}

function usage() {
  log(`MEMIA BPOS

Usage:
  memia bootstrap [path] [--obsidian] [--git]
  memia status
  memia in
  memia out
  memia sync
  memia doctor
  memia providers
  memia mcp
  memia new capture <name>
  memia new project <name> [--domain Domain]
  memia new run <name> [--domain Domain]
  memia new workspace <name>
  memia capture surface <surface> <name>
  memia surfaces init
  memia surfaces list
  memia surfaces status
  memia surfaces connect <surface> [--mode mode] [--bridge-url url] [--provider provider] [--window days] [--limit count]
  memia surfaces disconnect <surface>
  memia surfaces whatsapp qr [--bridge-url url]
  memia agents list [query]
  memia agents show <id>
  memia connector list
  memia connector explain <id>
  memia connector probe <id> [key=value ...]
  memia connector sample <id> [key=value ...]
  memia connector dry-run <id> [key=value ...]
`);
}

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === "help" || command === "--help") usage();
else if (command === "bootstrap") {
  bootstrap(args.find((arg) => !arg.startsWith("-") && arg !== "bootstrap") || ".", {
    obsidian: args.includes("--obsidian"),
    git: args.includes("--git")
  });
} else if (command === "status") status();
else if (command === "in") sessionIn();
else if (command === "out") sessionOut();
else if (command === "sync") syncBrain();
else if (command === "doctor") doctor();
else if (command === "providers") providers();
else if (command === "surfaces") {
  const sub = args[1] || "list";
  if (sub === "init") initSurfacesConfig();
  else if (sub === "list") listSurfaces();
  else if (sub === "status") surfacesStatus();
  else if (sub === "connect") {
    if (!args[2]) fail("surface manquante", 2);
    const parsed = parseOptions(args.slice(3));
    connectSurface(args[2], parsed.options);
  } else if (sub === "disconnect") {
    if (!args[2]) fail("surface manquante", 2);
    disconnectSurface(args[2]);
  } else if (sub === "whatsapp" && args[2] === "qr") {
    const parsed = parseOptions(args.slice(3));
    await requestWhatsAppQr(parsed.options);
  }
  else usage();
}
else if (command === "mcp") {
  const result = spawnSync(process.execPath, [path.join(packageRoot, "mcp/server.mjs")], {
    cwd,
    stdio: "inherit"
  });
  process.exit(result.status ?? 0);
}
else if (command === "connector") {
  const result = spawnSync(
    process.execPath,
    [path.join(packageRoot, "connectors/runtime/cli.mjs"), ...args.slice(1)],
    { cwd, stdio: "inherit" }
  );
  process.exit(result.status ?? 0);
}
else if (command === "agents") {
  const sub = args[1] || "list";
  if (sub === "list" || sub === "search") listAgents(args.slice(2).join(" "));
  else if (sub === "show") showAgent(args[2]);
  else usage();
} else if (command === "new") {
  const type = args[1];
  if (type === "capture") createCapture(titleFromArgs(args.slice(2)));
  else if (type === "project") {
    const parsed = parseNamedArgs(args.slice(2));
    createProject(parsed.title, parsed.domain);
  } else if (type === "run") {
    const parsed = parseNamedArgs(args.slice(2));
    createRun(parsed.title, parsed.domain);
  } else if (type === "workspace") createWorkspace(titleFromArgs(args.slice(2)));
  else usage();
} else if (command === "capture" && args[1] === "surface") {
  if (!args[2]) fail("surface manquante", 2);
  createSurfaceCapture(args[2], titleFromArgs(args.slice(3)));
} else usage();
