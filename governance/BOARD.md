# MEMIA BPOS Board

Le board MEMIA BPOS est un conseil d’agents utilisé pour les décisions qui dépassent une simple capture ou une note locale. Il évite qu’un assistant active une intégration, automatise une routine ou publie un livrable sans regarder le produit, la technique, la sécurité, l’exploitation et la confidentialité.

## Agents du board

| Agent | Rôle |
|---|---|
| MEMIA Board Chair | cadre la décision, distribue les avis et synthétise la recommandation |
| MEMIA Security Officer | vérifie secrets, scopes, permissions, actions L5 et rollback |
| MEMIA Product Strategist | vérifie valeur utilisateur, onboarding, clarté produit et roadmap |
| MEMIA Architecture Lead | vérifie portabilité, MCP, local-first, LLM agnostic et contrats |
| MEMIA Operations Lead | vérifie runbook, monitoring, cadence, incident et désactivation |
| MEMIA Data Privacy Steward | vérifie minimisation, conservation, anonymisation et séparation des données |

## Quand lancer le board

- activation d’une nouvelle surface ;
- changement de scope OAuth, token, webhook ou bridge ;
- routine planifiée ou worker permanent ;
- action externe sensible ;
- publication publique ;
- décision structurante de produit ou architecture ;
- incident ou doute sur une fuite de données.

## Sortie attendue

```markdown
# MEMIA Board Review

## Decision Question

## Context

## Agent Positions

## Risks

## Recommendation

## Validation Level

## Trace To Write

## Next Action
```

## Règle de décision

Le board ne remplace pas l’utilisateur. Il produit une recommandation. Si la décision implique une action L5, l’action reste bloquée jusqu’à validation explicite.

## Commandes

```bash
memia agents list board
memia agents show memia-board-chair
memia agents show memia-security-officer
```

