# MEMIA connectors

Connectors bring outside signals into your local IPCRWA memory. A connector
reads from a surface (files, an API, a webhook, an MCP server, a mailbox, a
chat) and turns what it reads into MEMIA **captures** that land in
`00 - Inbox/` before routing.

MEMIA is deliberately lean but honest: only connectors that actually run
out of the box are marked verified. Everything branded is shipped as a
contract you finish wiring, or connected through the MEMIA Cloud.

## Support levels

| Badge | Meaning |
|---|---|
| **Native verified** | A real adapter ships in this package and its probe runs out of the box, with no private infrastructure and no credentials required to start. |
| **Native scaffolded** | The connector contract, auth model, endpoints, mappings and safety rules ship here, but the running adapter is not verified yet. Provide credentials to promote it. |
| **Gateway** | Connectable through a standard protocol (REST, webhook, Graph, IMAP, feed) once you configure access. |
| **Via assistant** | A guided, autonomous connection flow driven by the connector assistant. Not yet packaged as code. |

The registries live in `connectors/registry/`:

- `native-connectors.yaml` — the native **verified** connectors only.
- `scaffold-connectors.yaml` — the branded / managed connectors, each honest
  about being `scaffolded` (gateway or native-scaffolded).

## Free vs Cloud

- **Free / self-host (this package):** the four generic connectors are native
  verified and run today — **local files**, **generic webhook**, **generic
  REST**, **generic MCP**. With these you can ingest folders, inbound events,
  any read-only JSON API, and any MCP server. No branded connector is claimed
  as verified.
- **MEMIA Cloud:** the managed, branded connectors (Slack, Notion, GitHub,
  Google Drive, Salesforce, Gmail, Outlook, WhatsApp, and the rest) ship as
  contracts here and are run and maintained for you in MEMIA Cloud. In the free
  package they stay `scaffolded` until you supply credentials and a verified
  adapter.

## CLI

```bash
# list every connector with its honest badge
memia connector list

# show the full registry entry for one connector
memia connector explain local-files

# probe a native verified connector (runs out of the box)
memia connector probe local-files path="00 - Inbox/Captures"

# read a small read-only sample
memia connector sample generic-rest url="https://api.example.com/items"

# show what WOULD be captured, without importing anything
memia connector dry-run local-files path="docs"
```

The same commands are available directly:

```bash
node connectors/runtime/cli.mjs list
node connectors/runtime/cli.mjs probe generic-webhook
```

Probing a scaffolded / branded connector never touches private
infrastructure. It returns an honest status:

```json
{ "id": "slack", "badge": "Gateway", "status": "scaffolded",
  "message": "scaffolded: provide credentials to verify." }
```

## Capture data model

Every adapter returns normalized `memia.capture.v1` objects:

| Field | Meaning |
|---|---|
| `source` | connector id |
| `type` | document, message, signal, record, reference, meeting … |
| `title` | short title |
| `content` | extracted text or a summary |
| `author` | author if known |
| `date` | ISO timestamp |
| `ipcrwa` | destination lane (one of the eight IPCRWA lanes, default `00 - Inbox/`) |
| `risk_level` | starts at `L0` |
| `mode` | always `read_only` for adapters |

Adapters are read-only and never perform an L5 action.

## Create a connector — 6 steps

1. **Declare** the connector in a registry: `native-connectors.yaml` if you will
   ship a verified adapter, otherwise `scaffold-connectors.yaml`.
2. **Define auth** as a `secretRef` only (`env://`, `keychain://`, `vault://`).
   Never write a secret value into a file.
3. **Write the adapter** in `connectors/runtime/adapters/<id>.mjs` exporting
   `probe`, `sample` and `dryRun`. Keep it read-only; block every L5 action.
4. **Map** each read object to a MEMIA capture type (`mapping:` in the registry
   and `makeCapture(...)` in the adapter).
5. **Verify** with `memia connector probe <id>` and `memia connector dry-run
   <id>`. Only then set `implementationStatus: verified`.
6. **Gate** before publishing: run `node scripts/audit-forbidden.mjs` and make
   sure it is clean.

See `connectors/SECURITY.md` for the full security contract.
