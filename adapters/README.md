# Adapters LLM

MEMIA BPOS est agnostique du moteur LLM.

La racine MEMIA contient la structure, les règles, les agents, les manifests et les livrables. Le LLM est une couche interchangeable.

## Moteurs ciblés

| Adapter | Usage |
|---|---|
| Claude | Travail agentique, rédaction, analyse longue. |
| Cursor | Travail codebase, édition, refactor et navigation repo. |
| Codex | Automatisation de développement, CLI, tests, patchs. |
| OpenCode | Option open source branchable avec clé utilisateur. |
| Manual | Usage sans LLM, par modèles et scripts locaux. |

## Principe

```text
MEMIA BPOS = mémoire + règles + structure + CLI + agents
LLM adapter = moteur choisi par l'utilisateur
```

Ne jamais stocker de clé API dans Git. Les clés vivent dans l'environnement local ou dans un gestionnaire de secrets.

