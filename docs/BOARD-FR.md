# Conseil MEMIA BPOS

Le conseil MEMIA BPOS est une revue multi-agents pour les décisions à risque ou structurantes. Il sert à obtenir une recommandation avant d’activer une surface, de planifier une boucle, d’ajouter un connecteur, de publier un livrable ou d’exécuter une action externe sensible.

## Composition

- **MEMIA Board Chair** : cadre la décision et synthétise les avis.
- **MEMIA Product Strategist** : vérifie la valeur utilisateur, l’onboarding et le packaging.
- **MEMIA Architecture Lead** : vérifie la portabilité, MCP, local-first et l’agnosticisme LLM.
- **MEMIA Security Officer** : vérifie secrets, permissions, scopes et actions L5.
- **MEMIA Operations Lead** : vérifie runbook, monitoring, rollback et cadence.
- **MEMIA Data Privacy Steward** : vérifie minimisation, anonymisation et conservation.

## Commandes

```bash
memia agents list board
memia agents show memia-board-chair
memia agents show memia-security-officer
```

## Usage conversationnel

```text
Lance le conseil MEMIA sur cette activation de surface. Donne-moi les avis produit, architecture, sécurité, opérations et privacy, puis la recommandation et le niveau de validation.
```

## Sortie attendue

Le board doit produire une question de décision, les positions des agents, les risques, la recommandation, le niveau L0-L5, la trace à écrire dans IPCRWA et la prochaine action.

## Règle dure

Une recommandation de board n’autorise jamais une action L5 par elle-même. Les envois, suppressions, partages, paiements, signatures, publications et modifications de permissions restent soumis à validation explicite.

