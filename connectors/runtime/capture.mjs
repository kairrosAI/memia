// connectors/runtime/capture.mjs
//
// Normalized MEMIA capture object shared by every native adapter.
// Fields follow the memia.capture.v1 data model: a source, a type, a title,
// content, an author, a date, and an IPCRWA destination (one of the eight
// MEMIA storage lanes). Adapters are read-only and never carry out L5 actions,
// so `mode` is always read_only and secrets are never embedded.

export const IPCRWA = {
  INBOX: "00 - Inbox/Captures",
  SURFACE_FILES: "00 - Inbox/Surfaces/Files",
  SURFACE_SIGNALS: "00 - Inbox/Surfaces/Signals",
  PROJETS: "01 - Projets",
  COMPTES_RUN: "02 - Comptes - Run",
  RESSOURCES: "03 - Ressources & Assets",
  WORKSPACES: "04 - Workspaces",
  ARCHIVES: "05 - Archives"
};

export function makeCapture({
  source,
  type,
  title,
  content = "",
  author = null,
  date = null,
  ipcrwa = IPCRWA.INBOX,
  risk = "L0"
}) {
  return {
    schema: "memia.capture.v1",
    source,
    type,
    title: title || "(untitled)",
    content,
    author,
    date: date || new Date().toISOString(),
    ipcrwa,
    risk_level: risk,
    mode: "read_only"
  };
}
