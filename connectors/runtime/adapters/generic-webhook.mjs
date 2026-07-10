// connectors/runtime/adapters/generic-webhook.mjs
//
// Native verified adapter: declares the standard MEMIA inbound webhook contract
// and maps a sample payload into a MEMIA capture. Receive-only. It never opens a
// port and never makes an outbound request; probe only validates configuration
// and prints the contract plus a generated (deterministic) ingest path.

import crypto from "node:crypto";
import { makeCapture, IPCRWA } from "../capture.mjs";

export const id = "generic-webhook";

const INBOUND_CONTRACT = {
  method: "POST",
  contentType: "application/json",
  signatureHeader: "X-MEMIA-Signature",
  signatureScheme: "hmac_sha256",
  expectedFields: ["title", "content", "author", "occurred_at", "source_url"]
};

function ingestPath(config = {}) {
  // Deterministic, non-secret ingest path derived from the connector id and an
  // optional caller-provided channel name. No real server is required.
  const channel = config.channel || "default";
  const hash = crypto.createHash("sha256").update(`${id}:${channel}`).digest("hex").slice(0, 12);
  return `/webhooks/${id}/${hash}`;
}

export async function probe(config = {}) {
  const secretRef = config.secretRef || "env://MEMIA_CONNECTOR_WEBHOOK_SECRET";
  const hasSecret = Boolean(process.env.MEMIA_CONNECTOR_WEBHOOK_SECRET);
  return {
    ok: true,
    status: hasSecret ? "ready" : "config_only",
    message: hasSecret
      ? "Webhook secret present in environment. Inbound contract ready."
      : "No signing secret set yet. Inbound contract is defined; set the secretRef to verify signatures.",
    secretRef,
    ingestPath: ingestPath(config),
    contract: INBOUND_CONTRACT
  };
}

export async function sample(config = {}) {
  return {
    ok: true,
    ingestPath: ingestPath(config),
    contract: INBOUND_CONTRACT,
    examplePayload: {
      title: "Deploy finished",
      content: "Build 1421 deployed to staging.",
      author: "ci-bot",
      occurred_at: new Date().toISOString(),
      source_url: "https://example.invalid/build/1421"
    }
  };
}

export async function dryRun(config = {}, payload = null) {
  const event = payload || (await sample(config)).examplePayload;
  const capture = makeCapture({
    source: id,
    type: "signal",
    title: event.title || "Inbound event",
    content: event.content || "",
    author: event.author || null,
    date: event.occurred_at || null,
    ipcrwa: IPCRWA.SURFACE_SIGNALS
  });
  return {
    ok: true,
    ingestPath: ingestPath(config),
    mapped: capture
  };
}

export default { id, probe, sample, dryRun };
