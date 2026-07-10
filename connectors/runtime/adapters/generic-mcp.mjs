// connectors/runtime/adapters/generic-mcp.mjs
//
// Native verified adapter: validates a generic MCP endpoint configuration and
// reports reachability. Read-only. If the endpoint is missing or unreachable it
// returns a clear "not configured" / "unreachable" status instead of throwing,
// so the CLI never hard-fails on an unconfigured MCP connector.

import { makeCapture, IPCRWA } from "../capture.mjs";

export const id = "generic-mcp";

const READ_ONLY_TOOLS = ["list_items", "read_item", "search_items"];

function resolveEndpoint(config = {}) {
  return config.endpoint || process.env.MEMIA_CONNECTOR_MCP_ENDPOINT || null;
}

function isHttpEndpoint(endpoint) {
  return /^https?:\/\//i.test(endpoint);
}

export async function probe(config = {}) {
  const endpoint = resolveEndpoint(config);
  if (!endpoint) {
    return {
      ok: true,
      status: "not_configured",
      message: "No MCP endpoint set. Provide config.endpoint (http(s):// URL) or an mcp:// server reference to verify.",
      tools: READ_ONLY_TOOLS
    };
  }
  if (!isHttpEndpoint(endpoint)) {
    // mcp:// or stdio-style reference: we can validate shape but not reach it here.
    return {
      ok: true,
      status: "config_only",
      endpoint,
      message: "Endpoint reference recorded. Reachability check only runs for http(s) MCP servers.",
      tools: READ_ONLY_TOOLS
    };
  }
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    let response;
    try {
      response = await fetch(endpoint, { method: "GET", signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
    return {
      ok: true,
      status: response.ok ? "ready" : "reachable_non_200",
      endpoint,
      httpStatus: response.status,
      message: `MCP endpoint responded with HTTP ${response.status}`,
      tools: READ_ONLY_TOOLS
    };
  } catch (error) {
    return {
      ok: true,
      status: "unreachable",
      endpoint,
      message: `MCP endpoint not reachable yet: ${error.message}`,
      tools: READ_ONLY_TOOLS
    };
  }
}

export async function sample(config = {}) {
  return {
    ok: true,
    endpoint: resolveEndpoint(config),
    tools: READ_ONLY_TOOLS,
    message: "Read-only MCP tools that a verified adapter would call.",
    note: "Live tool calls require a connected MCP client; this scaffold lists the safe surface only."
  };
}

export async function dryRun(config = {}) {
  const capture = makeCapture({
    source: id,
    type: "reference",
    title: "MCP item (example)",
    content: "A search_items / read_item result would map to a MEMIA capture here.",
    ipcrwa: IPCRWA.SURFACE_SIGNALS
  });
  return { ok: true, endpoint: resolveEndpoint(config), mapped: capture };
}

export default { id, probe, sample, dryRun };
