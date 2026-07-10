#!/usr/bin/env node

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const siteDir = path.join(root, "site");
const required = [
  "index.html",
  "install/index.html",
  "docs/index.html",
  "agents/index.html",
  "connectors/index.html",
  "security/index.html",
  "guides/fr/index.html",
  "guides/en/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "assets/css/main.css",
  "assets/logos/memia-logo-horizontal.png",
  "assets/logos/memia-monogram.png",
  "assets/logos/memia-favicon.png",
  "deploy/nginx-memia.ai.conf",
  "deploy/deploy-vps.sh"
];

const forbiddenPatterns = [
  /\/Users\//i,
  /file:\/\//i,
  /\.env/i,
  /private key/i,
  /password\s*=/i,
  /token\s*=/i,
  /secret\s*=/i,
  /memia-blank/i,
  /blank starter/i
];

async function exists(file) {
  try {
    await stat(path.join(siteDir, file));
    return true;
  } catch {
    return false;
  }
}

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

const missing = [];
for (const file of required) {
  if (!(await exists(file))) missing.push(file);
}

if (missing.length) {
  console.error("Missing site files:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const textFiles = (await listFiles(siteDir)).filter((file) =>
  /\.(html|css|js|txt|xml|md|conf|sh)$/i.test(file)
);

const violations = [];
for (const file of textFiles) {
  const body = await readFile(file, "utf8");
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(body)) {
      violations.push(`${path.relative(siteDir, file)} matches ${pattern}`);
    }
  }
}

if (violations.length) {
  console.error("Forbidden public-site strings detected:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`MEMIA site check passed (${textFiles.length} text files scanned).`);
