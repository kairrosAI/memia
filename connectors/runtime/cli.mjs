#!/usr/bin/env node
// connectors/runtime/cli.mjs
//
// MEMIA connector CLI. Commands:
//   list                 list every connector with its honest badge
//   explain <id>         print the full registry entry for a connector
//   probe <id>           run the adapter probe (native verified) or return an
//                        honest "scaffolded" status for branded connectors
//   sample <id>          fetch a small read-only sample (native verified only)
//   dry-run <id>         show what WOULD be captured, without importing
//
// Scaffolded / branded connectors never touch private infrastructure: their
// probe returns a "provide credentials to verify" status.

import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAllConnectors, findConnector, badgeFor } from "./registry.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(message = "") {
  process.stdout.write(`${message}\n`);
}

function jlog(value) {
  log(JSON.stringify(value, null, 2));
}

function fail(message, code = 2) {
  process.stderr.write(`connector: ${message}\n`);
  process.exit(code);
}

async function loadAdapter(entry) {
  const modulePath = path.resolve(__dirname, "adapters", path.basename(entry.adapter.module));
  const mod = await import(modulePath);
  return mod.default || mod;
}

function isVerified(entry) {
  return entry.supportLevel === "native" && entry.implementationStatus === "verified";
}

function parseConfig(rest) {
  // Accept `key=value` pairs after the id, e.g. `probe local-files path=docs`.
  const config = {};
  for (const token of rest) {
    const eq = token.indexOf("=");
    if (eq === -1) continue;
    config[token.slice(0, eq)] = token.slice(eq + 1);
  }
  return config;
}

function cmdList() {
  const connectors = loadAllConnectors();
  for (const entry of connectors) {
    log(`${entry.id}\t${entry.name}\t${entry.family}\t${entry.badge}`);
  }
  const verified = connectors.filter(isVerified).length;
  log("");
  log(`${connectors.length} connector(s) — ${verified} native verified, ${connectors.length - verified} scaffolded/gateway`);
}

function cmdExplain(id) {
  const entry = findConnector(id);
  if (!entry) fail(`unknown connector: ${id}`);
  log(`# ${entry.name} (${entry.id})`);
  log(`badge: ${badgeFor(entry)}`);
  log(`family: ${entry.family}`);
  log(`support level: ${entry.supportLevel}`);
  log(`status: ${entry.implementationStatus}`);
  log("");
  jlog(entry);
}

async function cmdProbe(id, rest) {
  const entry = findConnector(id);
  if (!entry) fail(`unknown connector: ${id}`);
  if (!isVerified(entry)) {
    jlog({
      id: entry.id,
      badge: badgeFor(entry),
      status: "scaffolded",
      ok: false,
      message: "scaffolded: provide credentials to verify. This connector ships a contract, not a running adapter.",
      secretRef: entry.adapter?.secretRef || null,
      nextProbeCommand: entry.nextProbeCommand || `memia connector probe ${entry.id}`,
      conditionsToVerify: entry.conditionsToVerify || []
    });
    return;
  }
  const adapter = await loadAdapter(entry);
  const result = await adapter.probe(parseConfig(rest));
  jlog({ id: entry.id, badge: badgeFor(entry), ...result });
}

async function cmdSample(id, rest) {
  const entry = findConnector(id);
  if (!entry) fail(`unknown connector: ${id}`);
  if (!isVerified(entry)) {
    jlog({
      id: entry.id,
      badge: badgeFor(entry),
      status: "scaffolded",
      ok: false,
      message: "scaffolded: sample requires a verified adapter and credentials."
    });
    return;
  }
  const adapter = await loadAdapter(entry);
  if (typeof adapter.sample !== "function") fail(`${id} has no sample()`);
  const result = await adapter.sample(parseConfig(rest));
  jlog({ id: entry.id, ...result });
}

async function cmdDryRun(id, rest) {
  const entry = findConnector(id);
  if (!entry) fail(`unknown connector: ${id}`);
  if (!isVerified(entry)) {
    jlog({
      id: entry.id,
      badge: badgeFor(entry),
      status: "scaffolded",
      ok: false,
      message: "scaffolded: dry-run requires a verified adapter and credentials."
    });
    return;
  }
  const adapter = await loadAdapter(entry);
  if (typeof adapter.dryRun !== "function") fail(`${id} has no dryRun()`);
  const result = await adapter.dryRun(parseConfig(rest));
  jlog({ id: entry.id, ...result });
}

function usage() {
  log(`MEMIA connectors

Usage:
  connector list
  connector explain <id>
  connector probe <id> [key=value ...]
  connector sample <id> [key=value ...]
  connector dry-run <id> [key=value ...]
`);
}

export async function main(argv = process.argv.slice(2)) {
  const command = argv[0];
  const id = argv[1];
  const rest = argv.slice(2);
  if (!command || command === "help" || command === "--help") return usage();
  if (command === "list") return cmdList();
  if (command === "explain") {
    if (!id) fail("missing connector id");
    return cmdExplain(id);
  }
  if (command === "probe") {
    if (!id) fail("missing connector id");
    return cmdProbe(id, rest);
  }
  if (command === "sample") {
    if (!id) fail("missing connector id");
    return cmdSample(id, rest);
  }
  if (command === "dry-run") {
    if (!id) fail("missing connector id");
    return cmdDryRun(id, rest);
  }
  return usage();
}

const invokedDirectly = process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((error) => fail(error.message, 1));
}
