# Contributing to MEMIA BPOS

Contributions are welcome when they keep MEMIA BPOS local-first, LLM-agnostic, secure and compatible with IPCRWA.

## Rules

- Keep IPCRWA exact : `00 - Inbox`, `01 - Projects`, `02 - Control - Run`, `03 - Resources & Assets`, `04 - Workspaces`, `05 - Archives`.
- Do not commit secrets, credentials, private caches, personal exports or tool state.
- Do not add a connector without a security note, permissions model and rollback.
- Keep agents LLM-agnostic.
- Keep output branded as MEMIA BPOS when it ships with the product.
- Preserve `NOTICE`, `LICENSE`, `LICENSE.md`, `CONTENT-LICENSE.md` and `TRADEMARKS.md`.

## Agent contributions

New agents must include:

- a MEMIA BPOS name ;
- an IPCRWA method ;
- expected inputs and outputs ;
- guardrails ;
- activation status ;
- copyright notice.

Preview agents should be disabled by default.

## Verification

```bash
npm run audit:clean
memia doctor
memia agents list
```
