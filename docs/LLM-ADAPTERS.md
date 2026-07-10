# MEMIA BPOS LLM Adapters

Guide bilingue pour brancher MEMIA BPOS à plusieurs moteurs IA.

Bilingual guide for connecting MEMIA BPOS to multiple AI engines.

## FR - Principe

MEMIA BPOS n'est pas un wrapper propriétaire autour d'un seul modèle. Le produit fournit :

- une structure IPCRWA ;
- une CLI `memia` ;
- un serveur MCP ;
- des agents MEMIA BPOS ;
- des règles de sécurité et de routage.

Le moteur LLM reste interchangeable : Claude, Cursor, Codex, OpenCode ou un autre assistant capable de lire des fichiers locaux, appeler une CLI ou consommer un serveur MCP.

## EN - Principle

MEMIA BPOS is not a proprietary wrapper around one model. The product provides:

- an IPCRWA structure;
- the `memia` CLI;
- an MCP server;
- MEMIA BPOS agents;
- security and routing rules.

The LLM engine is interchangeable: Claude, Cursor, Codex, OpenCode or any assistant that can read local files, call a CLI or consume an MCP server.

## FR - Architecture

```text
Utilisateur
  -> Claude / Cursor / Codex / OpenCode / autre moteur
  -> MEMIA BPOS CLI + MCP
  -> IPCRWA, agents, workspaces, livrables HTML, Git
```

Le moteur IA ne doit pas devenir la source de vérité. La source de vérité est l'instance MEMIA locale.

## EN - Architecture

```text
User
  -> Claude / Cursor / Codex / OpenCode / another engine
  -> MEMIA BPOS CLI + MCP
  -> IPCRWA, agents, workspaces, HTML outputs, Git
```

The AI engine should not become the source of truth. The local MEMIA instance is the source of truth.

## FR - Configuration locale

Copier l'exemple :

```bash
cp adapters/providers.example.json adapters/providers.local.json
```

Modifier `adapters/providers.local.json` localement.

Règles :

- ne jamais commiter de clés API ;
- préférer les variables d'environnement pour les secrets ;
- garder `providers.local.json` hors Git ;
- documenter seulement le type de fournisseur, pas la clé.

## EN - Local Configuration

Copy the example:

```bash
cp adapters/providers.example.json adapters/providers.local.json
```

Edit `adapters/providers.local.json` locally.

Rules:

- never commit API keys;
- prefer environment variables for secrets;
- keep `providers.local.json` out of Git;
- document only the provider type, never the key.

## FR - Claude

Usage recommandé :

```bash
memia status
memia agents list
memia agents show memia-project-steward
```

Puis demander à Claude de travailler dans le dossier MEMIA et de respecter IPCRWA. Pour les installations compatibles MCP, ajouter le serveur :

```bash
node mcp/server.mjs
```

## EN - Claude

Recommended usage:

```bash
memia status
memia agents list
memia agents show memia-project-steward
```

Then ask Claude to work inside the MEMIA folder and respect IPCRWA. For MCP-compatible setups, add the server:

```bash
node mcp/server.mjs
```

## FR - Cursor

Ouvrir le dossier MEMIA comme workspace Cursor. Les commandes utiles restent les mêmes :

```bash
memia new project "Nom du projet" --domain Product
memia sync
```

Cursor peut lire les agents dans `agents/` et les docs dans `docs/`. Le principe est de laisser MEMIA gérer le rangement et Git.

## EN - Cursor

Open the MEMIA folder as a Cursor workspace. The useful commands remain:

```bash
memia new project "Project name" --domain Product
memia sync
```

Cursor can read agents from `agents/` and docs from `docs/`. MEMIA should keep ownership of structure and Git flow.

## FR - Codex

Ouvrir le dépôt MEMIA dans Codex. Démarrer par :

```bash
memia in
memia status
```

À la fin d'une session :

```bash
memia out
```

Pour exposer les outils MEMIA à un client MCP :

```bash
node mcp/server.mjs
```

## EN - Codex

Open the MEMIA repository in Codex. Start with:

```bash
memia in
memia status
```

At the end of a session:

```bash
memia out
```

To expose MEMIA tools to an MCP client:

```bash
node mcp/server.mjs
```

## FR - OpenCode

OpenCode peut être branché comme moteur optionnel. Exemple :

```bash
memia providers
memia agents show memia-doc-writer
opencode
```

Mettre la clé du fournisseur dans l'environnement local, selon la documentation OpenCode et du provider choisi. MEMIA BPOS ne fournit pas de clé et ne stocke pas de secret.

## EN - OpenCode

OpenCode can be used as an optional engine. Example:

```bash
memia providers
memia agents show memia-doc-writer
opencode
```

Store the provider key in the local environment according to OpenCode and provider documentation. MEMIA BPOS does not provide keys and does not store secrets.

## FR - Contrat d'intégration

Quel que soit le moteur :

- lire `README.md`, `INSTALLATION.md` et `docs/DAILY-OPERATING-MODE.md` ;
- utiliser `memia new capture`, `memia new project`, `memia new run` et `memia new workspace` plutôt que créer des dossiers au hasard ;
- garder les sorties livrables dans `html/` ;
- mettre à jour `HANDOVER.md` et `DECISIONS.md` quand un projet change ;
- lancer `memia sync` avant de changer d'outil.

## EN - Integration Contract

Regardless of the engine:

- read `README.md`, `INSTALLATION.md` and `docs/DAILY-OPERATING-MODE.md`;
- use `memia new capture`, `memia new project`, `memia new run` and `memia new workspace` instead of creating random folders;
- keep deliverables in `html/`;
- update `HANDOVER.md` and `DECISIONS.md` when a project changes;
- run `memia sync` before switching tools.
