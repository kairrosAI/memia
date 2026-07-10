# MEMIA BPOS

Donnez une mémoire fiable à vos assistants IA.

MEMIA BPOS, Business and Personal Operating System, transforme conversations, réunions, messages, fichiers et signaux importants en projets clairs, décisions tracées, prochaines actions et handovers reprenables. C'est une couche local-first pour travailler avec Codex, Claude, Cursor, OpenCode ou tout client compatible MCP sans dépendre d'un seul fournisseur de LLM.

## Pourquoi MEMIA BPOS

Les assistants IA sont puissants, mais le travail se perd vite entre chats, emails, réunions, documents et outils. MEMIA BPOS crée un système de reprise : ce qui compte est capturé, qualifié, rangé, gouverné et rendu lisible par le prochain assistant.

Ce que MEMIA BPOS apporte :

- une structure opérationnelle IPCRWA pour organiser inbox, projets, runs, ressources, workspaces et archives ;
- une CLI pour installer, vérifier, créer des captures et piloter le système ;
- un serveur MCP pour exposer les outils MEMIA aux clients compatibles ;
- un catalogue d'agents MEMIA pour cadrer les workflows courants ;
- un conseil board et un agent sécurité pour les décisions sensibles ;
- des connecteurs de surfaces pour Gmail, WhatsApp, calendriers, réunions, fichiers et signaux ;
- une gouvernance L0-L5 pour distinguer lecture, préparation, écriture interne et actions externes ;
- une logique portable entre LLM, éditeurs, assistants et environnements de travail.

## Installer

Après publication npm :

```bash
npx @kairros/memia bootstrap ./MEMIA --git --obsidian
cd MEMIA
memia status
```

Avant publication npm, installer depuis GitHub ou depuis l'archive ZIP :

```bash
npm install -g git+https://github.com/kairros-ai/memia.git
memia bootstrap ./MEMIA --git --obsidian
```

ou :

```bash
unzip memia-2026-07-07.zip
cd memia
npm install
npm link
memia bootstrap ../MEMIA --git --obsidian
```

## Démarrage en 15 minutes

1. Installez MEMIA BPOS avec npm, GitHub ou ZIP.
2. Lancez `memia status` pour vérifier la structure.
3. Créez un premier projet avec `memia new project "Premier projet" --domain Ops`.
4. Ajoutez une capture avec `memia new capture "Décision ou signal à ne pas perdre"`.
5. Ouvrez votre assistant IA et dites : “Lance ce projet dans MEMIA, prépare le handover, les décisions initiales, les risques et la prochaine action.”
6. Demandez ensuite : “Mets à jour la mémoire MEMIA avec ce qui vient d'être décidé.”

Le mode naturel reste conversationnel. Les commandes existent pour automatiser et vérifier ; l'utilisateur peut simplement parler avec son assistant.

## Workflows clés

- Lancer un nouveau projet avec objectif, contexte, risques, décisions et prochaines actions.
- Transformer une réunion en captures, décisions et plan d'action.
- Router un email, un message ou un fichier vers le bon espace de travail.
- Préparer un handover lisible par un autre assistant.
- Brancher une surface en lecture contrôlée puis valider toute action sensible.
- Travailler avec plusieurs assistants sans perdre l'état du projet.
- Utiliser le conseil board pour challenger produit, architecture, sécurité, opérations et go-to-market.

## Connecteurs et surfaces

MEMIA BPOS peut structurer des signaux provenant de surfaces de travail :

- Gmail et autres boîtes email ;
- WhatsApp via bridge local et QR code ;
- calendriers ;
- réunions et transcriptions ;
- fichiers locaux, Drive, SharePoint ou équivalent ;
- webhooks et signaux applicatifs.

Les connecteurs suivent le même modèle : lire, capturer, qualifier, router, préparer. Les actions externes sensibles restent bloquées tant qu'une validation explicite n'est pas donnée.

## Agents inclus

Le package inclut :

- des agents cœur pour capture, projet, run, ressources, sécurité et synthèse ;
- un conseil board MEMIA BPOS ;
- un catalogue complet d'agents spécialisés pour couvrir produit, ventes, opérations, finance, contenu, recherche, data, engineering, juridique, sécurité, support et stratégie.

Voir :

- `agents/README.md`
- `docs/AGENTS-CATALOG-FR.md`
- `docs/AGENTS-CATALOG-EN.md`
- `docs/BOARD-FR.md`
- `docs/BOARD-EN.md`

## Documentation

- `INSTALLATION.md` : installation locale.
- `OPERATING-MODE.md` : mode de fonctionnement quotidien.
- `docs/GUIDE-FR.md` : guide opérationnel complet en français.
- `docs/GUIDE-EN.md` : complete operating guide in English.
- `docs/WHY-MEMIA-FR.md` : positionnement produit et bénéfices.
- `docs/GO-TO-MARKET-FR.md` : message, offres, objections et démo commerciale.
- `docs/GO-TO-MARKET-EN.md` : English GTM guide.
- `connectors/README.md` : surfaces et connecteurs.
- `mcp/README.md` : configuration MCP.
- `governance/GOVERNED-LOOPS.md` : boucles gouvernées L0-L5.
- `docs/DISTRIBUTION.md` : GitHub, npm, Homebrew, ZIP et site public.
- `site/` : site statique prêt pour `memia.ai`.

## Site public

Le dossier `site/` contient un site statique autonome pour `memia.ai`. Il doit être déployé comme extrait public, séparé de la racine du dépôt et du runtime MEMIA.

```bash
npm run site:check
cd site
python3 -m http.server 8080
```

Voir `docs/WEBSITE-FR.md` et `docs/WEBSITE-EN.md` pour la publication sur VPS, Nginx, SSL, rollback et vérifications.

## Principes de sécurité

- Les données restent dans l'instance contrôlée par l'utilisateur.
- Les secrets ne vont pas dans Git.
- Les fichiers lourds ou sensibles peuvent être référencés par pointeur plutôt que copiés.
- Les connecteurs sont déclarés et audités.
- Les actions externes sensibles demandent une validation explicite.
- Le site public ne doit jamais servir le dépôt complet ni les dossiers runtime.

## Licence et marque

Le code est distribué sous licence Apache-2.0. La marque MEMIA, les logos, le nom MEMIA BPOS et les contenus de marque restent protégés. Voir `LICENSE`, `NOTICE`, `CONTENT-LICENSE.md` et `TRADEMARKS.md`.

Copyright (c) 2026 Kairros.
