// connectors/runtime/adapters/generic-rest.mjs
//
// Native verified adapter: read-only HTTP GET against a user-provided JSON
// endpoint. probe() performs a real GET using global fetch and returns the HTTP
// status. sample() fetches and shows the first records. It never issues a write
// request and never performs an L5 action.

import { makeCapture, IPCRWA } from "../capture.mjs";

export const id = "generic-rest";

function resolveUrl(config = {}) {
  return config.url || process.env.MEMIA_CONNECTOR_REST_URL || null;
}

function authHeaders(config = {}) {
  const token = process.env.MEMIA_CONNECTOR_REST_TOKEN;
  if (!token) return {};
  const scheme = config.authScheme || "Bearer";
  return { Authorization: `${scheme} ${token}` };
}

async function getJson(url, config, timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", ...authHeaders(config) },
      signal: controller.signal
    });
    let body = null;
    const text = await response.text();
    try {
      body = JSON.parse(text);
    } catch {
      body = text.slice(0, 500);
    }
    return { status: response.status, ok: response.ok, body };
  } finally {
    clearTimeout(timer);
  }
}

function extractRecords(body) {
  if (Array.isArray(body)) return body;
  if (body && Array.isArray(body.data)) return body.data;
  if (body && Array.isArray(body.results)) return body.results;
  if (body && Array.isArray(body.items)) return body.items;
  if (body && typeof body === "object") return [body];
  return [];
}

export async function probe(config = {}) {
  const url = resolveUrl(config);
  if (!url) {
    return {
      ok: false,
      status: "not_configured",
      message: "Set config.url (or MEMIA_CONNECTOR_REST_URL) to a public read-only JSON endpoint."
    };
  }
  try {
    const result = await getJson(url, config);
    return {
      ok: result.ok,
      status: result.ok ? "ready" : "http_error",
      httpStatus: result.status,
      url,
      message: `GET ${url} returned HTTP ${result.status}`
    };
  } catch (error) {
    return { ok: false, status: "unreachable", url, message: error.message };
  }
}

export async function sample(config = {}, n = 5) {
  const url = resolveUrl(config);
  if (!url) {
    return { ok: false, status: "not_configured", message: "Set config.url first." };
  }
  const result = await getJson(url, config);
  const records = extractRecords(result.body).slice(0, n);
  return { ok: result.ok, httpStatus: result.status, url, count: records.length, items: records };
}

export async function dryRun(config = {}, n = 5) {
  const sampled = await sample(config, n);
  if (!sampled.ok) return sampled;
  const captures = sampled.items.map((record, index) =>
    makeCapture({
      source: id,
      type: "record",
      title: record.title || record.name || record.id || `record ${index + 1}`,
      content: JSON.stringify(record).slice(0, 500),
      ipcrwa: IPCRWA.SURFACE_SIGNALS
    })
  );
  return { ok: true, url: sampled.url, wouldCapture: captures.length, captures };
}

export default { id, probe, sample, dryRun };
