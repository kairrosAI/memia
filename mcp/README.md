# MEMIA BPOS MCP

MEMIA BPOS fournit un serveur MCP local en stdio. Il permet à Claude Desktop, Cursor, Codex, OpenCode ou tout autre client compatible de piloter une instance MEMIA sans dépendre d’un fournisseur LLM unique. Le client parle à l’assistant ; l’assistant appelle les outils MCP ; MEMIA écrit dans l’arborescence IPCRWA.

## 1. Rôle du serveur MCP

Le serveur MCP ne remplace pas l’assistant. Il expose les opérations sûres et structurées dont l’assistant a besoin : inspecter l’instance, créer un projet, déposer une capture, consulter le catalogue d’agents ou lister les surfaces. Il ne charge pas de clé LLM, ne publie rien à l’extérieur et ne contourne pas les validations humaines.

## 2. Démarrage

Depuis une installation locale :

```bash
npm install
npm run mcp
```

Avec le binaire :

```bash
memia mcp
```

Après publication npm, un client peut lancer :

```bash
npx @kairros/memia mcp
```

## 3. Configuration client

### Configuration générique

```json
{
  "mcpServers": {
    "memia": {
      "command": "npx",
      "args": ["@kairros/memia", "mcp"]
    }
  }
}
```

### Configuration locale

```json
{
  "mcpServers": {
    "memia": {
      "command": "node",
      "args": ["/chemin/vers/memia/mcp/server.mjs"]
    }
  }
}
```

### Racine de travail

La plupart des outils acceptent `root`. Si `root` est absent, le serveur utilise le dossier courant du processus. Pour un poste partagé, il vaut mieux passer explicitement le chemin de l’instance MEMIA dans chaque appel outil.

## 4. Outils exposés

| Outil | Entrées principales | Résultat | Usage typique |
|---|---|---|---|
| `memia_status` | `root?` | état des dossiers, Git, agents, surfaces | vérifier qu’une instance est prête |
| `memia_bootstrap` | `root?`, `obsidian?`, `git?` | arborescence créée ou complétée | installer MEMIA dans un nouveau dossier |
| `memia_create_item` | `root?`, `type`, `name`, `domain?` | capture, projet, run ou workspace créé | transformer une intention en structure |
| `memia_surface_capture` | `root?`, `surface`, `name` | capture déposée dans la surface | enregistrer un signal Gmail, WhatsApp, calendrier, fichier ou webhook |
| `memia_surfaces_list` | `root?` | liste des surfaces configurables | savoir quelles surfaces existent |
| `memia_surfaces_init` | `root?` | configuration locale créée | préparer le branchement des surfaces |
| `memia_surfaces_status` | `root?` | surfaces activées, modes et inbox | vérifier les branchements |
| `memia_surface_connect` | `root?`, `surface`, `mode?`, `bridge_url?`, `provider?`, `read_window_days?`, `max_items_per_run?` | surface activée en lecture | brancher Gmail, WhatsApp, calendriers, fichiers ou signaux |
| `memia_surface_disconnect` | `root?`, `surface` | surface désactivée | arrêter une surface |
| `memia_whatsapp_qr` | `root?`, `bridge_url?` | QR ou payload écrit dans le runtime local | connecter WhatsApp via bridge local |
| `memia_agents_list` | `root?`, `query?`, `limit?` | agents filtrés | choisir l’agent adapté à une intention |
| `memia_agent_show` | `root?`, `id` | fiche complète d’un agent | charger les consignes d’un agent |

## 5. Exemples d’appels

Créer une instance :

```json
{ "root": "./MEMIA", "git": true, "obsidian": true }
```

Créer un projet :

```json
{ "root": "./MEMIA", "type": "project", "name": "Refonte onboarding client", "domain": "Product" }
```

Déposer un signal Gmail :

```json
{ "root": "./MEMIA", "surface": "gmail", "name": "Réponse client à traiter" }
```

Chercher les agents de vente :

```json
{ "root": "./MEMIA", "query": "sales", "limit": 20 }
```

Initialiser et brancher une surface WhatsApp :

```json
{ "root": "./MEMIA" }
```

avec `memia_surfaces_init`, puis :

```json
{ "root": "./MEMIA", "surface": "whatsapp", "mode": "local-bridge", "bridge_url": "http://127.0.0.1:BRIDGE_PORT" }
```

avec `memia_surface_connect`, puis :

```json
{ "root": "./MEMIA" }
```

avec `memia_whatsapp_qr`.

## 6. Mode conversationnel

L’utilisateur n’a pas besoin de connaître les outils MCP. Il peut dire :

```text
Lance un nouveau projet pour refaire notre onboarding client. Prépare la structure MEMIA, les premières décisions, les risques et les surfaces à surveiller.
```

L’assistant choisit alors les appels MCP nécessaires : statut, création du projet, capture de signaux, consultation d’agents, puis mise à jour du handover.

## 7. Sécurité

Le serveur MCP reste local. Il n’embarque pas de clés LLM. Les secrets de connecteurs restent dans l’environnement local ou dans le coffre choisi. Les outils fournis par défaut écrivent dans le dossier MEMIA et ne réalisent pas d’action externe sensible. Si un connecteur futur ajoute l’envoi, la suppression, le partage ou une mutation externe, il doit imposer une validation explicite.

## 8. Dépannage

- **Le client ne voit pas le serveur** : vérifier le chemin du binaire, Node >= 20 et les permissions d’exécution.
- **Les outils écrivent au mauvais endroit** : passer `root` explicitement.
- **Un agent n’est pas trouvé** : appeler `memia_agents_list` avec une requête plus large, puis `memia_agent_show` avec l’identifiant exact.
- **Une surface n’apparaît pas** : vérifier `connectors/surfaces.local.json` et relancer le client MCP.
- **Obsidian n’affiche pas tout** : vérifier que l’instance a été créée avec `obsidian: true` ou relancer le bootstrap avec cette option.

## 9. Extension

Un intégrateur peut ajouter de nouveaux outils MCP tant qu’ils respectent les règles MEMIA : aucune clé dans Git, aucune mutation externe non validée, écritures structurées dans IPCRWA, logs techniques séparés des décisions humaines et résultats relisibles par un autre assistant.

## 10. Cycle d’usage recommandé

1. L’utilisateur formule une intention en langage naturel.
2. L’assistant vérifie l’état de l’instance avec `memia_status`.
3. Si nécessaire, il complète l’installation avec `memia_bootstrap`.
4. Il crée la bonne structure avec `memia_create_item`.
5. Il consulte les agents pertinents avec `memia_agents_list` et `memia_agent_show`.
6. Il dépose les signaux de surfaces avec `memia_surface_capture`.
7. Il met à jour les fichiers de reprise : README, HANDOVER, DECISIONS, captures ou notes.
8. Il demande validation pour toute action externe sensible.

Ce cycle est important : MCP ne doit pas devenir une boîte noire. L’assistant peut travailler vite, mais il doit garder une trace claire de ce qu’il a créé, pourquoi il l’a créé et ce qui reste ouvert.

## 11. Détail des outils

### `memia_status`

Inspecte l’instance. L’outil confirme la présence des dossiers IPCRWA, des surfaces, du catalogue agents et de l’état Git quand il est disponible.

Entrée type :

```json
{ "root": "./MEMIA" }
```

À utiliser au début d’une session, avant une installation, après une extraction ZIP et avant un diagnostic.

### `memia_bootstrap`

Crée ou complète une instance MEMIA. Il ne détruit pas les fichiers existants. Il ajoute les dossiers attendus, les templates, les fichiers de configuration et, si demandé, Git ou la configuration Obsidian.

Entrée type :

```json
{ "root": "./MEMIA", "git": true, "obsidian": true }
```

À utiliser pour une première installation, une réparation légère ou une mise à niveau structurelle.

### `memia_create_item`

Crée un objet MEMIA : capture, projet, run ou workspace. L’assistant doit choisir le type en fonction de l’intention, pas uniquement du mot utilisé par l’utilisateur.

Créer un projet :

```json
{ "root": "./MEMIA", "type": "project", "name": "Refonte onboarding client", "domain": "Product" }
```

Créer un workspace :

```json
{ "root": "./MEMIA", "type": "workspace", "name": "Comparaison fournisseurs" }
```

### `memia_surface_capture`

Dépose un signal venant d’une surface dans l’inbox correspondante. L’outil ne lit pas directement Gmail ou WhatsApp ; il crée la trace MEMIA du signal que le connecteur ou l’assistant a qualifié.

Entrée type :

```json
{ "root": "./MEMIA", "surface": "gmail", "name": "Réponse client à traiter" }
```

Surfaces acceptées : `gmail`, `email`, `whatsapp`, `calendar`, `calendars`, `meeting`, `meetings`, `file`, `files`, `signal`, `signals`, `webhook`.

### `memia_surfaces_list`

Liste les surfaces configurables. L’outil sert au diagnostic, à l’onboarding technique et à la vérification d’une installation.

Entrée type :

```json
{ "root": "./MEMIA" }
```

### `memia_surfaces_init`

Crée `connectors/surfaces.local.json` à partir de l’exemple du package. Le fichier local est ignoré par Git et peut contenir les modes, limites et URLs locales sans exposer de secrets dans le dépôt.

Entrée type :

```json
{ "root": "./MEMIA" }
```

### `memia_surfaces_status`

Affiche les surfaces, leur état, leur mode et leur inbox MEMIA.

Entrée type :

```json
{ "root": "./MEMIA" }
```

### `memia_surface_connect`

Active une surface en lecture contrôlée. L’outil écrit la configuration locale et un état runtime. Il ne lit pas la surface à lui seul et n’exécute aucune action externe.

Brancher Gmail :

```json
{ "root": "./MEMIA", "surface": "gmail", "mode": "oauth", "read_window_days": 7, "max_items_per_run": 50 }
```

Brancher WhatsApp via bridge local :

```json
{ "root": "./MEMIA", "surface": "whatsapp", "mode": "local-bridge", "bridge_url": "http://127.0.0.1:BRIDGE_PORT" }
```

### `memia_surface_disconnect`

Désactive une surface dans la configuration locale.

Entrée type :

```json
{ "root": "./MEMIA", "surface": "whatsapp" }
```

### `memia_whatsapp_qr`

Demande un QR au bridge WhatsApp local. MEMIA BPOS teste les endpoints compatibles, accepte un payload texte ou une image data URL, puis écrit le résultat dans `_memia/runtime/surfaces/whatsapp/`.

Entrée type :

```json
{ "root": "./MEMIA", "bridge_url": "http://127.0.0.1:BRIDGE_PORT" }
```

Endpoints acceptés côté bridge :

```text
GET /session/qr
GET /qr
GET /api/whatsapp/qr
GET /whatsapp/qr
```

Réponses acceptées :

```json
{ "qr": "payload-a-scanner" }
```

```json
{ "qrDataUrl": "data:image/png;base64,..." }
```

### `memia_agents_list`

Recherche dans le catalogue agents. L’assistant peut filtrer par catégorie, mot-clé, usage ou domaine.

Entrée type :

```json
{ "root": "./MEMIA", "query": "sales", "limit": 20 }
```

### `memia_agent_show`

Retourne la fiche complète d’un agent. L’assistant l’utilise quand il doit appliquer un rôle spécialisé avec ses entrées, sorties et garde-fous.

Entrée type :

```json
{ "root": "./MEMIA", "id": "memia-sales-call-prep-assistant" }
```

## 12. Intégration Claude Desktop

1. Installer MEMIA BPOS localement.
2. Vérifier que `node` fonctionne dans le terminal.
3. Ajouter le serveur dans la configuration MCP du client.
4. Redémarrer le client.
5. Demander : “appelle `memia_status` sur mon instance”.

Le point important est de garder un chemin stable vers le serveur ou d’utiliser `npx` après publication npm. En environnement multi-projets, demander explicitement à l’assistant de passer `root`.

## 13. Intégration Cursor

Cursor peut utiliser un serveur MCP selon sa configuration disponible. Le point important est de lancer le serveur depuis le dossier du package ou via `npx`, puis de passer `root` pour éviter d’écrire dans le repo courant par erreur.

Un workflow Cursor typique :

1. ouvrir le projet de travail ;
2. connecter le serveur MEMIA BPOS ;
3. demander un état avec `memia_status` ;
4. créer un workspace MEMIA pour les essais ;
5. promouvoir les décisions utiles vers le projet ou la ressource concernée.

## 14. Intégration Codex

Codex peut travailler directement dans le dossier MEMIA et utiliser le CLI. Quand MCP est disponible, la logique reste la même : l’assistant parle à MEMIA via outils, puis écrit les fichiers nécessaires.

Exemple conversationnel :

```text
Lance un projet pour refondre notre onboarding. Utilise MEMIA, crée le handover, note les décisions initiales et dis-moi quelles surfaces connecter.
```

## 15. Intégration OpenCode

OpenCode peut être branché si le client supporte les serveurs MCP stdio. Garder le même contrat : aucune clé dans le dépôt, racine explicite, tests avec `memia_status`.

## 16. Sécurité d’intégration

Le MCP doit être considéré comme une interface locale de structuration. Il peut écrire dans MEMIA, mais ne doit pas devenir un canal de publication externe sans couche d’approbation dédiée.

Contrôles minimaux :

- Node 20 ou plus ;
- racine MEMIA explicite ;
- secrets hors Git ;
- logs techniques séparés des décisions humaines ;
- aucune action externe sensible sans validation ;
- audit clean avant distribution.

## 17. Diagnostics supplémentaires

- **Le serveur démarre puis disparaît** : lancer la commande en terminal pour voir l’erreur réelle.
- **Le client garde une ancienne configuration** : fermer complètement le client, vérifier le fichier MCP, relancer.
- **Le mauvais dossier est modifié** : imposer `root` dans chaque appel outil.
- **Les agents semblent absents** : vérifier `agents/manifest.json`, puis appeler `memia_agents_list`.
- **Une surface n’est pas visible** : vérifier `connectors/surfaces.example.json`, puis la configuration locale.

## 18. Tests avant distribution

```bash
npm run audit:clean
node --check mcp/server.mjs
node bin/memia.mjs status
node bin/memia.mjs agents list | tail -1
node bin/memia.mjs surfaces list
```

Un package distribuable doit démarrer, auditer, lister les agents, lister les surfaces et créer une capture test sans dépendre d’un secret externe.
