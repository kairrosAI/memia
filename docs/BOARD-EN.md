# MEMIA BPOS Board

The MEMIA BPOS board is a multi-agent review used before high-risk or structural decisions: enabling a surface, scheduling a governed loop, adding a connector, publishing an output or performing a sensitive external action.

## Members

- **MEMIA Board Chair** frames the decision and synthesizes positions.
- **MEMIA Product Strategist** checks user value, onboarding and packaging.
- **MEMIA Architecture Lead** checks portability, MCP, local-first design and LLM agnosticism.
- **MEMIA Security Officer** checks secrets, permissions, scopes and L5 actions.
- **MEMIA Operations Lead** checks runbooks, monitoring, rollback and cadence.
- **MEMIA Data Privacy Steward** checks minimization, anonymization and retention.

## Commands

```bash
memia agents list board
memia agents show memia-board-chair
memia agents show memia-security-officer
```

## Conversational Use

```text
Run the MEMIA board on this surface activation. Give me the product, architecture, security, operations and privacy positions, then the recommendation and validation level.
```

## Expected Output

The board should produce a decision question, agent positions, risks, recommendation, L0-L5 level, IPCRWA trace and next action.

## Hard Rule

A board recommendation never authorizes an L5 action by itself. Sends, deletes, shares, payments, signatures, publications and permission changes still require explicit approval.

