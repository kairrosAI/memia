# MEMIA BPOS Daily Operating Mode

Guide bilingue du fonctionnement quotidien.

Bilingual guide for the daily operating flow.

## FR - Principe

MEMIA BPOS fonctionne comme un cerveau local structuré. Tout élément doit avoir :

- une destination IPCRWA ;
- un état ;
- une prochaine action ;
- une trace de reprise.

Le flux standard :

```text
capturer -> qualifier -> router -> travailler -> promouvoir -> relire
```

## EN - Principle

MEMIA BPOS works as a structured local brain. Every item needs:

- an IPCRWA destination;
- a state;
- a next action;
- a handover trace.

Standard flow:

```text
capture -> qualify -> route -> work -> promote -> review
```

## FR - Début de session

```bash
memia in
memia status
```

Objectif :

- voir les captures en attente ;
- voir les workspaces ouverts ;
- vérifier l’état Git ;
- choisir le prochain travail.

## EN - Start a Session

```bash
memia in
memia status
```

Goal:

- review pending captures;
- review open workspaces;
- check Git state;
- choose the next piece of work.

## FR - Créer une capture

Une capture est une entrée brute : idée, note, fichier, lien, demande, extrait de conversation.

```bash
memia new capture "Idée de nouvelle offre"
```

La capture va dans :

```text
00 - Inbox/Captures/
```

Elle doit ensuite être qualifiée :

- type ;
- risque ;
- destination probable ;
- besoin ou non d’un workspace ;
- prochaine action.

## EN - Create a Capture

A capture is raw input: idea, note, file, link, request or conversation extract.

```bash
memia new capture "New offer idea"
```

The capture goes to:

```text
00 - Inbox/Captures/
```

It should then be qualified:

- type;
- risk;
- likely destination;
- workspace needed or not;
- next action.

## FR - Lancer un nouveau projet

Créer un projet quand il existe un objectif, une fin, une décision ou un livrable.

```bash
memia new project "Refonte onboarding" --domain Product
```

MEMIA crée :

```text
01 - Projets/Product/PRJ-YYYYMMDD-refonte-onboarding/
  README.md
  HANDOVER.md
  DECISIONS.md
```

Un projet doit toujours indiquer :

- objectif ;
- périmètre ;
- état ;
- prochaine action ;
- livrables ;
- décisions.

## EN - Start a New Project

Create a project when there is a goal, an end state, a decision or a deliverable.

```bash
memia new project "Onboarding redesign" --domain Product
```

MEMIA creates:

```text
01 - Projets/Product/PRJ-YYYYMMDD-onboarding-redesign/
  README.md
  HANDOVER.md
  DECISIONS.md
```

Every project should include:

- goal;
- scope;
- current state;
- next action;
- deliverables;
- decisions.

## FR - Créer un run

Créer un run quand le sujet n’a pas de fin naturelle : routine, compte, opération, suivi récurrent.

```bash
memia new run "Revue hebdomadaire pipeline" --domain Sales
```

Destination :

```text
02 - Comptes - Run/Sales/RUN-YYYYMMDD-revue-hebdomadaire-pipeline/
```

Un run doit être reprenable sans contexte oral.

## EN - Create a Run

Create a run when the topic has no natural end: routine, account, operation or recurring follow-up.

```bash
memia new run "Weekly pipeline review" --domain Sales
```

Destination:

```text
02 - Comptes - Run/Sales/RUN-YYYYMMDD-weekly-pipeline-review/
```

A run must be resumable without oral context.

## FR - Créer un workspace

Créer un workspace pour un travail temporaire : recherche, POC, comparaison, brouillon, transformation de fichier.

```bash
memia new workspace "Benchmark CRM"
```

Structure :

```text
04 - Workspaces/YYYY-MM-DD-benchmark-crm/
  inputs/
  outputs/
  README.md
  notes.md
```

Un workspace doit finir par :

- promotion vers un projet, run ou ressource ;
- archivage ;
- ou rejet documenté.

## EN - Create a Workspace

Create a workspace for temporary work: research, proof of concept, comparison, draft or file transformation.

```bash
memia new workspace "CRM benchmark"
```

Structure:

```text
04 - Workspaces/YYYY-MM-DD-crm-benchmark/
  inputs/
  outputs/
  README.md
  notes.md
```

A workspace must end with:

- promotion to a project, run or resource;
- archiving;
- or documented rejection.

## FR - Utiliser les agents

```bash
memia agents list
memia agents list marketing
memia agents show memia-social-draft
```

Les agents core pilotent le système MEMIA BPOS. Les agents spécialistes sont inclus dans le catalogue produit et peuvent être appelés par intention. Avant de brancher un agent sur un connecteur ou un canal externe, décider :

- propriétaire ;
- données manipulées ;
- permissions ;
- canaux autorisés ;
- rollback.

## EN - Use Agents

```bash
memia agents list
memia agents list marketing
memia agents show memia-social-draft
```

Core agents operate the MEMIA BPOS system. Specialist agents are included in the product catalogue and can be called by intent. Before connecting an agent to an external connector or channel, define:

- owner;
- data handled;
- permissions;
- allowed channels;
- rollback.

## FR - Mettre à jour le cerveau

Quand on change d’outil, de machine ou de session :

```bash
memia sync
npm run audit:clean
git status
git add .
git commit -m "Update MEMIA BPOS"
git push
```

Puis côté autre outil :

```bash
git pull
memia in
```

## EN - Update the Brain

When switching tool, machine or session:

```bash
memia sync
npm run audit:clean
git status
git add .
git commit -m "Update MEMIA BPOS"
git push
```

Then on the other tool:

```bash
git pull
memia in
```

## FR - Obsidian

MEMIA peut être ouvert comme vault Obsidian :

```bash
memia bootstrap ./MEMIA --obsidian
```

Ne pas déplacer les dossiers IPCRWA. Obsidian sert à naviguer, lire et relier.

## EN - Obsidian

MEMIA can be opened as an Obsidian vault:

```bash
memia bootstrap ./MEMIA --obsidian
```

Do not move IPCRWA folders. Obsidian is for reading, navigation and links.
