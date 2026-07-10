# MEMIA BPOS - Go-to-market guide

This document prepares the commercial launch, the `memia.ai` website, sales demos and field messaging for MEMIA BPOS.

## Positioning

MEMIA BPOS is the local-first system that gives AI assistants a reliable working memory.

Short message:

```text
Give your AI assistants a private working memory.
```

Long message:

```text
MEMIA BPOS turns conversations, meetings and important signals into clear projects, tracked decisions and next actions.
```

Technical message:

```text
A local-first, LLM-agnostic, MCP-compatible operating layer for projects, captures, decisions, agents and connectors.
```

## Commercial promise

In 15 minutes, a technical user can install MEMIA BPOS, create a first project, capture an important signal and make the work resumable by an AI assistant.

The promise is not “more files”. The promise is less lost context, fewer forgotten decisions, less dependency on a single tool and more control over sensitive actions.

## ICP

### Primary ICP

Builders, founders, ops leaders, consultants and technical teams already using Codex, Claude, Cursor, OpenCode, Git, Obsidian, MCP or automation tools.

### Secondary ICP

Consultants, integrators and agencies who want to install an agentic operating system for clients.

### Advanced ICP

Agentic teams that need local memory, connectors, a handover protocol and explicit action governance.

### Short-term anti-ICP

Non-technical users without onboarding, teams looking only for a fully hosted graphical SaaS, organizations requiring SSO/RBAC/admin console on day one.

## Segments and messages

| Segment | Core message | Demo angle |
| --- | --- | --- |
| Founder | Turn ideas, messages and decisions into resumable company memory | Founder project, decisions, follow-ups |
| Ops leader | Controlled surfaces that capture, route and prepare without opaque automation | Email or meeting to actions |
| Consultant | Install a complete operating method for clients | Client kit, handover, governance |
| Technical team | Local-first OS for agents: readable files, CLI, MCP, Git | Install, MCP, agents |
| Agentic team | Memory and guardrails between agents, tools and external actions | Agent + connector + approval |

## Pain points

- Context is scattered across chats, tickets, emails, meetings and files.
- Assistants forget decisions and the real project state.
- Switching LLMs or clients breaks continuity.
- Connectors create noise when they do not route.
- Automations are risky without guardrails.
- Teams want local-first memory without giving up agents and MCP.

## Value proposition

MEMIA BPOS creates operational memory that is:

- human-readable;
- assistant-maintainable;
- versionable;
- connectable;
- governed;
- portable across AI tools.

## 15-minute activation

```bash
npx @kairros/memia bootstrap ./MEMIA --git --obsidian
cd MEMIA
memia status
memia new project "First MEMIA case" --domain Ops
memia new capture "Decision or signal not to lose"
memia agents list
```

Then ask the assistant:

```text
Prepare the handover, initial decisions, risks and next action in MEMIA.
```

Success criteria: an instance exists, a project is resumable, a capture is qualified, no secret or external action has been triggered.

## Demo script

### 1. Problem

“Your problem is not only the AI model. Your problem is operational memory: where do decisions, captures, actions and handovers go when the conversation ends?”

### 2. Install

Show the one-command installation, then `memia status`.

### 3. First project

Create a project and show the structure: goal, decisions, handover, next actions.

### 4. Capture

Create a capture from a simple signal: email, meeting, message or note.

### 5. Assistant handover

Ask another assistant or a new session to resume the project from MEMIA memory.

### 6. Governance

Show that sensitive external actions stay blocked without explicit approval.

### 7. Close

“MEMIA BPOS turns AI chats into a durable, portable and governed working system.”

## Offers

### Starter Self-Serve

Public package, self-service installation, documentation, technical solo usage.

### Builder Onboarding

90-minute session: installation, MCP, first project, first capture, first agent.

### Consultant Kit

Client templates, workshop script, security checklist, delivery guide and repeatable structure.

### Team Pilot

Two-week pilot: 3 to 5 users, one read surface, one governed loop, one security review.

### Agentic Ops

4 to 6 week engagement: MCP, agents, surfaces, runbooks, L0-L5 governance, handovers and team standards.

### Enterprise Readiness

Architecture, security, privacy, internal distribution, support and compliance review.

## Objections and answers

### “Isn't this just folders?”

Folders are the storage layer. The value is the operating contract: captures, routing, projects, decisions, agents, connectors, MCP and approvals.

### “We already use Notion, Drive or Linear.”

MEMIA does not have to replace them. It creates the working memory that assistants can maintain, read and update.

### “Is it secure?”

The system is local-first. Secrets stay out of Git. Sensitive external actions remain blocked until explicit approval is given.

### “Is it too technical?”

Self-serve targets builders. Founders, consultants and teams can start with assisted onboarding.

### “Is `npx` ready?”

`npx` depends on npm publication. Before npm publication, GitHub and ZIP are the distribution paths.

### “Why not an agentic SaaS?”

MEMIA BPOS is the memory and governance layer. A SaaS can sit above it; memory should not depend on one vendor.

## Commercial pages to produce

- `/` : promise, transformation, CTA.
- `/install/` : 15-minute activation.
- `/agents/` : core agents, board, specialized families.
- `/connectors/` : governed surfaces.
- `/security/` : local-first, secrets, approvals.
- `/docs/` : technical portal.
- `/pricing/` : service packages if activated.
- `/demo/` : demo scenario.

## CTA

- “Create my MEMIA workspace”
- “Install with npm”
- “Read the documentation”
- “Plan a pilot”

## Proof metrics

- Time to create a resumable first project.
- Number of tracked decisions.
- Number of routed captures.
- Number of sensitive actions correctly blocked.
- Number of successful handovers between assistants.

## Tone

Calm, premium, concrete. Avoid magic claims. Show that MEMIA provides continuity, control and durable structure.
