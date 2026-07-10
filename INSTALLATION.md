# Installation MEMIA BPOS

Ce document décrit l’installation technique de MEMIA BPOS pour un utilisateur capable d’utiliser Node, Git et un client LLM compatible.

## Prérequis

- Node.js 20 ou plus.
- Git si l’instance doit être versionnée.
- Un terminal local.
- Optionnel : Obsidian, Claude Desktop, Cursor, Codex, OpenCode ou un autre client MCP.

## Installation via npm

```bash
npx @kairros/memia bootstrap ./MEMIA --git --obsidian
cd MEMIA
memia status
```

Cette commande sera disponible après publication du package npm.

## Installation via GitHub

```bash
git clone <repository-url> memia
cd memia
npm install
npm run audit:clean
node bin/memia.mjs bootstrap ../MEMIA --git --obsidian
```

## Installation via ZIP

Décompresser l’archive, entrer dans le dossier `memia`, puis lancer :

```bash
npm install
npm run audit:clean
node bin/memia.mjs bootstrap ../MEMIA --git --obsidian
```

## Brancher un client MCP

Voir `mcp/README.md`. Le principe : le client lance `memia mcp` ou `npx @kairros/memia mcp`, puis l’assistant appelle les outils locaux.

## Brancher les surfaces

Voir `connectors/README.md`. Les surfaces se branchent par commandes et stockent leur configuration dans un fichier local ignoré par Git.

```bash
memia surfaces init
memia surfaces status
```

Exemple Gmail :

```bash
memia surfaces connect gmail --mode oauth --window 7 --limit 50
```

Exemple WhatsApp via bridge local :

```bash
memia surfaces connect whatsapp --mode local-bridge --bridge-url http://127.0.0.1:BRIDGE_PORT
memia surfaces whatsapp qr
```

Le QR WhatsApp vient d’un bridge local compatible. MEMIA BPOS le demande au bridge, l’écrit dans le runtime local, puis l’utilisateur le scanne dans WhatsApp. Aucun message sortant n’est envoyé sans validation explicite.

## Boucles gouvernées

Après branchement, une surface peut être utilisée dans une boucle gouvernée. Le format est fourni dans `governance/GOVERNED-LOOPS.md` et le template dans `templates/GOVERNED-LOOP.md`.

```bash
cp templates/GOVERNED-LOOP.md "03 - Ressources & Assets/MEMIA/gmail-weekly-loop.md"
```

Une boucle déclare son intention, son déclencheur, son niveau L0-L5, ses actions autorisées, ses actions bloquées, ses preuves et son rollback.

## Conseil MEMIA

Le conseil MEMIA BPOS contient six agents : Board Chair, Product Strategist, Architecture Lead, Security Officer, Operations Lead et Data Privacy Steward.

```bash
memia agents list board
memia agents show memia-security-officer
```

Utiliser le conseil avant une activation de surface, une routine planifiée, un nouveau scope, un export public ou une action externe sensible.

## Vérification

```bash
memia status
memia agents list | tail -1
memia surfaces list
memia surfaces status
npm run audit:clean
```

## Premier usage

Demander à l’assistant :

```text
Lance un nouveau projet pour mon sujet prioritaire. Crée la structure MEMIA, prépare le handover, note les décisions initiales et dis-moi quelles surfaces peuvent être utiles.
```
