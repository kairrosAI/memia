# MEMIA BPOS - Guide go-to-market

Ce document prépare le lancement commercial, la page `memia.ai`, les démos et les conversations sales de MEMIA BPOS.

## Positionnement

MEMIA BPOS est le système local-first qui donne une mémoire de travail fiable aux assistants IA.

Phrase courte :

```text
Donnez une mémoire fiable à vos assistants IA.
```

Phrase longue :

```text
MEMIA BPOS transforme vos conversations, réunions et signaux importants en projets clairs, décisions tracées et actions prêtes à reprendre.
```

Version technique :

```text
Une couche local-first, LLM-agnostic et compatible MCP pour structurer projets, captures, décisions, agents et connecteurs.
```

## Promesse commerciale

En 15 minutes, un utilisateur technique peut installer MEMIA BPOS, créer un premier projet, capturer un signal important et rendre le travail reprenable par son assistant IA.

La promesse n'est pas “plus de fichiers”. La promesse est : moins de contexte perdu, moins de décisions oubliées, moins de dépendance à un seul outil et plus de contrôle sur les actions sensibles.

## ICP

### ICP primaire

Builders, fondateurs, ops leaders, consultants et équipes techniques qui utilisent déjà Codex, Claude, Cursor, OpenCode, Git, Obsidian, MCP ou des automatisations.

### ICP secondaire

Consultants, intégrateurs et agences qui veulent installer un système opératoire agentique chez leurs clients.

### ICP avancé

Équipes agentiques qui ont besoin d'une mémoire locale, de connecteurs, d'un protocole de reprise et de validations d'actions.

### Anti-ICP court terme

Utilisateurs non techniques sans accompagnement, équipes qui cherchent un SaaS clé en main uniquement graphique, organisations exigeant SSO/RBAC/console admin dès le premier jour.

## Segments et messages

| Segment | Message principal | Angle de démo |
| --- | --- | --- |
| Fondateur | Transformez idées, messages et décisions en mémoire d'entreprise reprenable | Projet founder, décisions, relances |
| Ops leader | Des surfaces contrôlées qui capturent, routent et préparent sans automatisation opaque | Email ou réunion vers actions |
| Consultant | Installez une méthode opératoire complète chez un client | Kit client, handover, gouvernance |
| Équipe technique | OS local-first pour agents : fichiers lisibles, CLI, MCP, Git | Installation, MCP, agents |
| Équipe agentique | Couche mémoire et garde-fous entre agents, outils et actions externes | Agent + connecteur + validation |

## Pain points

- Le contexte se disperse entre chats, tickets, emails, réunions et fichiers.
- Les assistants oublient les décisions et l'état réel.
- Changer de LLM ou de client casse la continuité.
- Les connecteurs créent du bruit s'ils ne routent pas.
- Les automatisations sont dangereuses sans garde-fous.
- Les équipes veulent du local-first sans renoncer aux agents et à MCP.

## Proposition de valeur

MEMIA BPOS crée une mémoire opératoire :

- lisible par les humains ;
- maintenable par les assistants ;
- versionnable ;
- connectable ;
- gouvernée ;
- portable entre outils IA.

## Activation en 15 minutes

```bash
npx @kairros/memia bootstrap ./MEMIA --git --obsidian
cd MEMIA
memia status
memia new project "Premier cas MEMIA" --domain Ops
memia new capture "Décision ou signal à ne pas perdre"
memia agents list
```

Puis demander à l'assistant :

```text
Prépare le handover, les décisions initiales, les risques et la prochaine action dans MEMIA.
```

Critère de succès : une instance existe, un projet est reprenable, une capture est qualifiée, aucun secret ni action externe n'a été engagé.

## Script de démo

### 1. Problème

“Votre problème n'est pas seulement le modèle IA. Votre problème est la mémoire opérationnelle : où vont les décisions, les captures, les actions et les handovers quand la conversation se termine ?”

### 2. Installation

Montrer l'installation en une commande, puis `memia status`.

### 3. Premier projet

Créer un projet et montrer la structure : objectif, décisions, handover, prochaines actions.

### 4. Capture

Créer une capture depuis un signal simple : email, réunion, message ou note.

### 5. Reprise par assistant

Demander à un autre assistant ou à une nouvelle session de reprendre le projet depuis la mémoire MEMIA.

### 6. Gouvernance

Montrer qu'une action externe sensible reste bloquée sans validation explicite.

### 7. Close

“MEMIA BPOS transforme vos chats IA en système de travail durable, portable et gouverné.”

## Offres

### Starter Self-Serve

Package public, installation autonome, documentation, usage solo technique.

### Builder Onboarding

Session de 90 minutes : installation, MCP, premier projet, première capture, premier agent.

### Consultant Kit

Templates client, script d'atelier, checklist sécurité, guide de livraison et structure réplicable.

### Team Pilot

Pilote de deux semaines : 3 à 5 utilisateurs, une surface en lecture, une boucle gouvernée, une revue sécurité.

### Agentic Ops

Mission de 4 à 6 semaines : MCP, agents, surfaces, runbooks, gouvernance L0-L5, handovers et standards d'équipe.

### Enterprise Readiness

Revue architecture, sécurité, privacy, distribution interne, support et conformité.

## Objections et réponses

### “C'est juste des dossiers.”

Les dossiers sont le support. La valeur est le contrat d'exploitation : captures, routage, projets, décisions, agents, connecteurs, MCP et validations.

### “On a déjà Notion, Drive ou Linear.”

MEMIA ne remplace pas tout. Il crée la mémoire de travail que les assistants peuvent maintenir, relire et mettre à jour.

### “Est-ce sécurisé ?”

Le système est local-first. Les secrets restent hors Git. Les actions externes sensibles sont bloquées tant qu'une validation explicite n'a pas été donnée.

### “C'est trop technique.”

Le self-serve vise les builders. Les dirigeants, consultants et équipes peuvent passer par un onboarding assisté.

### “Est-ce prêt pour `npx` ?”

`npx` dépend de la publication npm. Avant publication, l'installation GitHub et l'archive ZIP restent les chemins de distribution.

### “Pourquoi pas un SaaS agentique ?”

MEMIA BPOS est la couche mémoire et gouvernance. Un SaaS peut venir au-dessus ; la mémoire ne doit pas dépendre d'un seul fournisseur.

## Pages commerciales à produire

- `/` : promesse, transformation, CTA.
- `/install/` : activation en 15 minutes.
- `/agents/` : agents cœur, board, familles spécialisées.
- `/connectors/` : surfaces gouvernées.
- `/security/` : local-first, secrets, validations.
- `/docs/` : portail technique.
- `/pricing/` : offres de service si activées.
- `/demo/` : scénario de démo.

## CTA

- “Créer mon espace MEMIA”
- “Installer avec npm”
- “Voir la documentation”
- “Planifier un pilote”

## Métriques de preuve

- Temps pour créer un premier projet reprenable.
- Nombre de décisions retrouvables.
- Nombre de captures routées.
- Nombre d'actions sensibles correctement bloquées.
- Nombre de reprises réussies entre assistants.

## Ton

Sobre, premium, concret. Éviter les promesses magiques. Montrer que MEMIA donne de la continuité, de la maîtrise et une structure durable.
