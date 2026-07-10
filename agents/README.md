# MEMIA BPOS Agents

MEMIA BPOS includes 218 agent cards:

- 12 core operating agents in `agents/core/`;
- 6 board agents in `agents/board/`;
- 200 specialist agents in `agents/catalog/`.

The catalogue is part of the package. Each card defines the role, expected inputs, expected outputs, IPCRWA method and usage guardrails for one MEMIA agent.

## Commands

```bash
memia agents list
memia agents list social
memia agents list board
memia agents show memia-capture-author
memia agents show memia-security-officer
```

## Status

- `ready`: core agent available for the operating system.
- `board`: board agent available for product, architecture, security, operations and privacy reviews.
- `included`: specialist agent included in the MEMIA BPOS catalogue.

## Conversation Use

An assistant can call the catalogue by intent:

```text
Use the MEMIA Project Steward for this project and ask the MEMIA Risk Reviewer to challenge the plan before we start.
```

The assistant should select the relevant card, apply the method, write outputs into the proper IPCRWA destination and keep external actions gated by local permissions.

## Board

The MEMIA BPOS board is used when a decision needs several expert angles before action. It includes:

- `MEMIA Board Chair` for decision framing and synthesis;
- `MEMIA Security Officer` for secrets, permissions, scopes and action gates;
- `MEMIA Product Strategist` for user value, onboarding and roadmap;
- `MEMIA Architecture Lead` for portability, MCP, local-first design and LLM agnosticism;
- `MEMIA Operations Lead` for runbooks, monitoring, rollback and incident handling;
- `MEMIA Data Privacy Steward` for minimization, retention and anonymization.

Typical request:

```text
Run the MEMIA board on this connector activation plan. Give me the recommendation, risks, validation level and trace to write in DECISIONS.
```

## Full Catalogue

- `docs/AGENTS-CATALOG-FR.md`
- `docs/AGENTS-CATALOG-EN.md`
- `docs/BOARD-FR.md`
- `docs/BOARD-EN.md`

## Ownership

MEMIA BPOS agent cards, taxonomy, names, operating format, CLI and MCP interfaces are MEMIA BPOS product content.

Copyright (c) 2026 Kairros.
