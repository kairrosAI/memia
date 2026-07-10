# SECURITY — MEMIA connectors

MEMIA connectors bring outside signals into your local IPCRWA memory. They are
built to be safe by default. These rules apply to every connector, native or
scaffolded.

## Principles

- Secrets stay out of Git.
- Read-only by default.
- Dry-run before any import.
- Sample before any sync.
- An audit log entry for every connector run.
- Simple revocation.
- L5 actions are blocked without explicit human approval.

## Secrets

Connectors reference secrets. They never store the secret value in the registry
or in Git. Only reference forms are accepted:

```yaml
secretRef: env://MEMIA_CONNECTOR_EXAMPLE_TOKEN
secretRef: keychain://memia/connectors/example
secretRef: vault://memia/connectors/example
```

Never commit a raw token, a raw API key, a cookie value or a refresh-token
value into any file in this package. The pre-publish gate
(`scripts/audit-forbidden.mjs`) rejects non-placeholder secret assignments and
runs before publishing.

## Default mode

- Native verified connectors run read-only or receive-only out of the box.
- The generic REST connector performs HTTP GET only. It never issues a write.
- The local files connector reads and classifies. It never deletes, moves or
  shares a source file.
- The webhook connector receives events. It never makes an outbound request.

## L5 approval gate

The following actions are blocked by default and require an explicit human
approval each time:

- sending an external message;
- publishing;
- deleting;
- changing a permission;
- writing to a production CRM;
- making a payment;
- signing;
- submitting a form.

## Scaffolded connectors

A scaffolded connector ships a contract, an auth model, endpoints, MEMIA
mappings and these safety rules, but no running adapter. Its probe returns an
honest `scaffolded` status until you provide credentials and a verified adapter
passes probe plus dry-run. A scaffolded connector never touches private
infrastructure.
