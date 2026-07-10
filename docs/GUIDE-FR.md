# Guide opérationnel complet MEMIA BPOS

Ce guide long format décrit l’installation, le fonctionnement quotidien, les connecteurs, le MCP, les agents, la sécurité et l’exploitation de MEMIA BPOS.

## Installation rapide

```bash
npx @kairros/memia bootstrap ./MEMIA --git --obsidian
cd MEMIA
memia status
```

## 01 - Positionnement

MEMIA BPOS est un système d’exploitation business et personnel local-first. Il donne une structure durable aux idées, projets, responsabilités, décisions, ressources, signaux et livrables.

L’utilisateur parle naturellement à son assistant. L’assistant organise le cerveau, crée les bons dossiers, range les signaux et prépare les actions. Les commandes existent pour les profils techniques, mais elles ne sont pas l’expérience principale.

**Point de contrôle**: Demander à l’assistant : « Explique-moi où ranger cette demande et ce que tu vas créer avant de le faire. »

## 02 - Ce qui est installé

Une instance MEMIA contient l’arborescence IPCRWA, les templates, le catalogue d’agents, le serveur MCP, les connecteurs de surface, les scripts d’audit et les fichiers de gouvernance.

Le but n’est pas de créer un dossier de notes. Le but est de créer un système de reprise : n’importe quel assistant compatible doit pouvoir comprendre l’état d’un projet, les décisions prises, les risques et les prochaines actions.

**Point de contrôle**: Vérifier avec `memia status` après installation.

## 03 - Expérience conversationnelle

Le mode normal est la conversation. L’utilisateur décrit une intention, une contrainte ou un résultat attendu. L’assistant traduit cette intention en structure MEMIA.

La conversation évite de demander à l’utilisateur de connaître les chemins, les commandes ou les conventions. L’assistant peut expliquer ce qu’il va faire, puis écrire les fichiers, interroger les surfaces autorisées et mettre à jour le cerveau.

**Point de contrôle**: Phrase type : « Lance un nouveau projet pour préparer cette offre, puis mets à jour ton cerveau. »

## 04 - Rôles

L’utilisateur décide l’intention et valide les actions sensibles. L’assistant prépare, structure, exécute les opérations locales et demande validation quand une action sort du cerveau local.

MEMIA joue le rôle de mémoire durable : il contient ce qui doit survivre à une session, un changement d’outil ou un passage de relais entre LLM.

**Point de contrôle**: À retenir : l’assistant travaille dans MEMIA, mais MEMIA reste la source de vérité.

## 05 - IPCRWA en une phrase

IPCRWA sépare les entrées brutes, les projets actifs, les responsabilités continues, les ressources durables, les workspaces temporaires et les archives.

Cette séparation évite le chaos. Une capture n’est pas un projet, un run n’est pas une archive, une ressource n’est pas un brouillon. Chaque chose a un lieu naturel.

**Point de contrôle**: Demander : « Quelle destination IPCRWA choisis-tu et pourquoi ? »

## 06 - 00 - Inbox

L’Inbox reçoit les entrées qui ne sont pas encore qualifiées : captures rapides, signaux de surfaces, imports manuels et demandes à trier.

Une inbox saine ne garde pas le travail longtemps. Elle sert à recevoir, nommer, dater, qualifier puis router. Quand une capture révèle une vraie action, elle doit être transformée en projet, run, ressource ou workspace.

**Point de contrôle**: Contrôle : aucune capture importante ne doit rester sans destination.

## 07 - 01 - Projects

Un projet a un objectif, un résultat attendu, un périmètre et une fin. Il peut produire un document, une décision, un service, une campagne, une intégration ou une livraison client.

Chaque projet doit pouvoir répondre à quatre questions : où en est-on, qu’a-t-on décidé, quels sont les risques, quelle est la prochaine action. Le handover permet la reprise par un autre assistant.

**Point de contrôle**: Fichiers typiques : README, HANDOVER, DECISIONS, notes et outputs.

## 08 - 02 - Control - Run

Un run est une responsabilité continue : reporting, support, relation client, routine administrative, monitoring, exploitation ou gouvernance.

Contrairement à un projet, un run n’a pas forcément de fin. Il doit contenir des routines, des registres, des incidents, des états de reprise et des règles d’escalade.

**Point de contrôle**: Question utile : « Est-ce un projet qui se termine ou un run qui continue ? »

## 09 - 03 - Resources & Assets

Les ressources contiennent la connaissance durable : méthodes, guides, modèles, assets, règles, références, templates et registres.

Une ressource est stable, sourcée et réutilisable. Elle ne doit pas devenir un dépotoir de brouillons. Quand une note devient une méthode utile, l’assistant la promeut comme ressource.

**Point de contrôle**: Décision : promouvoir seulement ce qui sera utile plusieurs fois.

## 10 - 04 - Workspaces

Un workspace est un atelier temporaire. Il sert aux essais, comparaisons, transformations, prototypes, analyses ou manipulations de fichiers.

Le workspace a une règle de fermeture : ce qui est utile est promu, ce qui est temporaire reste local, ce qui est fini est archivé ou supprimé selon la politique choisie.

**Point de contrôle**: Bon réflexe : créer un workspace avant de manipuler plusieurs fichiers.

## 11 - 05 - Archives

Les archives conservent les contenus décidés comme terminés, historiques ou inactifs.

Archiver n’est pas oublier. Une archive doit garder assez de contexte pour comprendre pourquoi elle existe, quand elle a été fermée et où retrouver les décisions importantes.

**Point de contrôle**: Ne pas archiver une action encore ouverte.

## 12 - _memia

Le dossier `_memia` contient les registres machine, logs, états runtime et métadonnées internes.

Les humains lisent surtout les projets, runs et ressources. Les agents et outils peuvent utiliser `_memia` pour garder l’état technique, les index et les journaux.

**Point de contrôle**: Règle : pas de secret dans Git, même dans `_memia`.

## 13 - html

Le dossier `html` reçoit les sorties de lecture : guides, rapports, tableaux de bord, cockpits et documents autonomes.

Un bon HTML MEMIA est mobile-first, lisible, autonome et directement partageable dans le périmètre autorisé. Les tableaux doivent rester lisibles sur mobile.

**Point de contrôle**: Les guides produit publics ne doivent pas exposer de chemins locaux ni de détails internes.

## 14 - Lancer un nouveau projet

L’utilisateur peut simplement dire ce qu’il veut obtenir. L’assistant doit clarifier le résultat attendu, les contraintes, les surfaces à consulter et le niveau de validation.

Avant d’écrire, l’assistant distingue : projet, run, ressource, workspace ou capture. Ensuite il crée la structure minimale et commence par le handover plutôt que par une accumulation de notes.

**Point de contrôle**: Phrase type : « Lance un projet pour créer une offre partenaire B2B et prépare le cerveau du projet. »

## 15 - Questions de cadrage

Un projet commence par peu de questions, mais les bonnes : résultat, bénéficiaire, décisionnaire, échéance, inputs disponibles, risques, surfaces à lire et livrables attendus.

L’assistant doit éviter les questionnaires interminables. Il pose seulement ce qui bloque l’action, puis avance avec hypothèses explicites.

**Point de contrôle**: Question forte : « Quel résultat doit exister à la fin ? »

## 16 - Structure d’un projet

Un projet MEMIA contient un README pour comprendre, un HANDOVER pour reprendre, un DECISIONS pour tracer, et des notes ou outputs selon le besoin.

Le README décrit le pourquoi. Le HANDOVER décrit l’état. DECISIONS garde les arbitrages. Les outputs contiennent le résultat produit.

**Point de contrôle**: Ne pas mélanger décisions, brouillons et fichiers finaux dans une seule note.

## 17 - Handover

Le handover est la mémoire de reprise. Il dit où on en est, ce qui a été fait, ce qui reste à faire, ce qui bloque et ce qu’il faut éviter.

Un bon handover permet de reprendre le projet dans Codex, Claude, Cursor ou OpenCode sans relire toute l’histoire.

**Point de contrôle**: À mettre à jour à chaque fin de session importante.

## 18 - Décisions

Une décision MEMIA contient le contexte, l’option retenue, les alternatives rejetées, la date, la raison et les conséquences.

Les décisions évitent de refaire les mêmes débats. Elles rendent le cerveau auditable et transmissible.

**Point de contrôle**: Si une décision change, créer une nouvelle entrée plutôt que réécrire silencieusement l’ancienne.

## 19 - Actions

Les actions doivent être concrètes, attribuables et vérifiables. Une action vague devient vite du bruit.

MEMIA distingue les actions locales, les brouillons, les validations humaines et les actions externes sensibles.

**Point de contrôle**: Forme recommandée : verbe, objet, propriétaire, échéance, preuve attendue.

## 20 - Captures

Une capture transforme un signal brut en entrée exploitable. Elle garde la source, la date, le résumé, l’importance, le risque et la destination proposée.

La capture n’est pas une copie brute. Elle est une mise en forme utile pour décider et router.

**Point de contrôle**: Créer une capture par sujet utile, pas une capture géante pour tout un fil.

## 21 - Mettre à jour le cerveau

Quand l’utilisateur dit « mets à jour ton cerveau », l’assistant consolide : captures, décisions, handover, ressources, workspaces et synchronisation.

La mise à jour n’est pas seulement un commit. C’est une opération de mémoire : ranger, résumer, décider, fermer ce qui doit l’être et préparer la reprise.

**Point de contrôle**: Phrase type : « Mets à jour ton cerveau sur ce projet et dis-moi ce qui reste ouvert. »

## 22 - Obsidian

MEMIA peut être ouvert comme vault Obsidian sans casser IPCRWA. Obsidian sert à lire, naviguer et relier, pas à changer la taxonomie.

Les liens internes sont utiles pour connecter projets, ressources et décisions. Les dossiers restent la structure principale.

**Point de contrôle**: Installer avec l’option Obsidian au bootstrap si souhaité.

## 23 - Git et synchronisation

Git est le relais durable entre machines et assistants. Il permet de retrouver l’historique, synchroniser les changements et travailler avec plusieurs outils.

L’utilisateur peut demander « récupère le cerveau » ou « envoie sur GitHub ». L’assistant lance les commandes prévues et explique le résultat.

**Point de contrôle**: Ne pas exposer de secrets dans Git.

## 24 - LLM agnostique

MEMIA BPOS ne dépend pas d’un seul LLM. Il peut être utilisé avec Codex, Claude, Cursor, OpenCode ou tout client MCP compatible.

La mémoire est dans les fichiers et la structure. Le LLM est une interface de travail, pas la source de vérité.

**Point de contrôle**: Changer de client ne doit pas casser le cerveau.

## 25 - Agents

Les agents sont des rôles spécialisés. L’utilisateur n’a pas besoin de les connaître tous : il peut demander un résultat, et l’assistant choisit l’agent pertinent.

Le catalogue complet est disponible pour les utilisateurs avancés. Chaque agent précise sa fonction, ses entrées, ses sorties et ses garde-fous.

**Point de contrôle**: Commande utile : `memia agents list`.

## 26 - Agents cœur

Les agents cœur couvrent capture, routage, projet, run, ressource, workspace, board, documentation, social draft, produit, sécurité et Obsidian.

Ils forment la colonne vertébrale MEMIA. Les agents spécialisés viennent ensuite accélérer un domaine précis.

**Point de contrôle**: En cas de doute, commencer par Capture Router ou Project Steward.

## 27 - Agents spécialisés

Les 200 agents spécialisés couvrent business ops, design, productivité, marketing, analytics, communauté, engineering, tests, documentation, sales, finance, product et project management.

Ils ne remplacent pas la méthode MEMIA. Ils produisent des analyses, plans, dossiers, checklists ou documents plus rapides et plus cohérents.

**Point de contrôle**: Le guide liste les 200 agents avec leur fonction.

## 28 - Connecteurs : vue d’ensemble

Les connecteurs sont des surfaces de capture : Gmail, WhatsApp, calendriers, réunions, fichiers, signaux et webhooks.

Chaque surface lit d’abord, capture ensuite, route enfin. L’envoi ou la modification externe reste bloqué sans validation.

**Point de contrôle**: Commande utile : `memia surfaces list`.

## 29 - Gmail

Gmail sert à détecter les emails importants, pièces jointes, relances, engagements et échéances.

Le mode recommandé est lecture, résumé, capture, brouillon éventuel. Envoyer, archiver, supprimer ou changer des labels demande validation.

**Point de contrôle**: Phrase type : « Lis les emails importants de cette semaine et prépare les captures utiles. »

## 30 - WhatsApp

WhatsApp capte les messages à traiter, promesses, urgences, fichiers partagés et notes vocales résumées.

Le connecteur ne doit pas envoyer en autonomie. Il peut préparer un brouillon et demander validation.

**Point de contrôle**: Phrase type : « Repère les promesses et relances dans WhatsApp, puis route-les. »

## 31 - Calendriers

Les calendriers détectent réunions, échéances, conflits, routines et préparation nécessaire.

MEMIA peut préparer la journée, relier les événements aux projets et créer des captures de préparation ou de suivi.

**Point de contrôle**: Créer ou déplacer un événement reste une action externe à valider.

## 32 - Réunions

Les notes et transcriptions de réunion deviennent décisions, actions, risques, propriétaires et handover.

Le bon résultat est un compte rendu utile, pas une transcription longue. MEMIA doit extraire ce qui engage vraiment.

**Point de contrôle**: Phrase type : « Transforme cette réunion en décisions, actions et risques. »

## 33 - Fichiers

Les fichiers incluent PDF, contrats, tableurs, présentations, assets et captures d’écran.

MEMIA les classe, les résume et décide s’ils appartiennent à un projet, un run, une ressource, un workspace ou une archive.

**Point de contrôle**: Les fichiers lourds peuvent rester hors Git avec un pointeur.

## 34 - Signaux et webhooks

Les signaux automatisés peuvent venir de webhooks, RSS, APIs, CRM, paiements ou monitoring.

MEMIA doit normaliser, dédupliquer, prioriser et router. Les alertes ne doivent pas devenir du bruit permanent.

**Point de contrôle**: Une mutation externe via API demande validation.

## 35 - Configuration connecteurs

La configuration locale indique quelles surfaces sont activées, comment elles sont lues et quelles limites s’appliquent.

Les secrets restent dans l’environnement local ou un coffre. Les exemples fournis ne contiennent pas de clés.

**Point de contrôle**: Fichier type : `connectors/surfaces.local.json`.

## 36 - Permissions et validations

MEMIA distingue lecture, brouillon et action externe. Cette séparation est essentielle.

Lire un email est différent d’y répondre. Préparer un événement est différent de l’envoyer. Résumer un document est différent de le partager.

**Point de contrôle**: Toute action L5 demande validation explicite.

## 37 - MCP : rôle

MCP permet de brancher MEMIA à des clients compatibles. Le serveur expose des outils locaux simples : statut, bootstrap, création d’items, surfaces et agents.

Le client conversationnel reste l’interface. MCP est la couche d’outillage structurée appelée par l’assistant.

**Point de contrôle**: Démarrer avec `memia mcp`.

## 38 - MCP : installation

Le serveur MCP fonctionne en stdio. Il peut être lancé depuis Node, npm, npx ou une installation locale.

Chaque client a son format de configuration, mais le principe reste le même : une commande, des arguments, et parfois une racine de travail.

**Point de contrôle**: Après publication npm : `npx @kairros/memia mcp`.

## 39 - MCP : outils

Les outils principaux sont memia_status, memia_bootstrap, memia_create_item, memia_surface_capture, memia_surfaces_list, memia_agents_list et memia_agent_show.

Ils couvrent l’essentiel sans donner au serveur des pouvoirs dangereux. Les connecteurs d’action pourront être ajoutés plus tard avec validation.

**Point de contrôle**: Toujours passer `root` explicitement dans les environnements multi-projets.

## 40 - MCP : clients

Codex, Claude, Cursor et OpenCode peuvent utiliser MEMIA si le client sait lancer un serveur MCP.

Le guide fournit une configuration générique. Les variantes client changent surtout l’emplacement du fichier de configuration.

**Point de contrôle**: Tester avec `memia_status` avant toute opération.

## 41 - MCP : exemples

Un assistant peut créer un projet, déposer une capture de surface, chercher un agent, puis lire sa fiche.

L’utilisateur ne voit pas forcément les appels outil. Il voit le résultat : projet créé, capture rangée, handover mis à jour.

**Point de contrôle**: Demander : « Montre-moi les appels MCP que tu proposes avant exécution. »

## 42 - MCP : dépannage

Les problèmes fréquents viennent du chemin Node, du dossier racine, d’une version Node trop ancienne ou d’un client qui ne recharge pas sa configuration.

La résolution se fait par étapes : lancer en terminal, vérifier le statut, tester un outil simple, puis intégrer au client.

**Point de contrôle**: Node 20 ou plus est recommandé.

## 43 - Sécurité

La sécurité MEMIA repose sur trois principes : local-first, pas de secrets dans Git, validation humaine pour les actions externes sensibles.

Le système doit être utile sans devenir dangereux. Les assistants peuvent préparer beaucoup de choses, mais ne doivent pas agir à l’extérieur sans accord.

**Point de contrôle**: Audit : `npm run audit:clean`.

## 44 - Secrets

Les secrets doivent vivre dans l’environnement local, un coffre ou le gestionnaire choisi par l’organisation.

Les exemples du package utilisent des noms de variables, jamais des valeurs. Les logs ne doivent pas imprimer de tokens.

**Point de contrôle**: Scanner avant distribution.

## 45 - Sauvegarde et restauration

Une instance MEMIA peut être sauvegardée par Git pour les fichiers texte et par stockage externe pour les fichiers lourds.

La restauration doit vérifier la structure, les permissions, les secrets locaux et les connecteurs.

**Point de contrôle**: Tester une restauration avant production.

## 46 - Routine quotidienne

Chaque jour, l’utilisateur peut demander un brief : projets à risque, actions en retard, réunions du jour, signaux importants et décisions attendues.

MEMIA doit produire une vue courte et actionnable, puis approfondir seulement si demandé.

**Point de contrôle**: Phrase type : « Fais mon brief MEMIA du jour. »

## 47 - Revue hebdomadaire

La revue hebdomadaire nettoie les captures, ferme les workspaces, met à jour les handovers, archive ce qui est terminé et remonte les décisions bloquées.

C’est le moment de transformer le travail accumulé en mémoire durable.

**Point de contrôle**: Phrase type : « Fais la revue hebdomadaire du cerveau. »

## 48 - Déploiement équipe

En équipe, il faut définir propriétaire produit, propriétaire technique, conventions de nommage, validation des connecteurs et règles de publication.

MEMIA peut rester local-first tout en étant synchronisé via Git et partagé selon les droits choisis.

**Point de contrôle**: Commencer avec une équipe pilote et quelques surfaces.

## 49 - Distribution

GitHub sert à publier les sources. npm rend la commande `npx @kairros/memia` disponible. Le ZIP sert à distribuer une archive autonome.

Ces trois canaux ont des usages différents. Le guide doit expliquer chacun clairement.

**Point de contrôle**: Publier npm seulement quand le nom, la licence et le scope sont prêts.

## 50 - Dépannage installation

Les erreurs courantes : Node absent, permission d’exécution, dossier racine incorrect, Git non initialisé, client MCP non rechargé, Obsidian ouvert sur le mauvais dossier.

La méthode de diagnostic : vérifier Node, lancer le CLI, auditer, créer une capture test, puis brancher le client.

**Point de contrôle**: Toujours tester une capture avant les connecteurs réels.

## 51 - Front conversationnel

Une interface type MiaChat peut devenir la couche conversationnelle dédiée : elle parlerait au même cerveau MEMIA, aux mêmes outils MCP et aux mêmes surfaces.

Le produit reste agnostique : MiaChat serait une interface possible, pas une dépendance obligatoire.

**Point de contrôle**: Ne pas bloquer l’adoption sur une interface unique.

## 52 - Exploitation avancée

Les organisations avancées peuvent ajouter queues, webhooks, workers, dashboards, routines et connecteurs métier.

La règle reste identique : chaque événement devient une capture ou une mise à jour durable, les actions externes sont contrôlées, les décisions sont traçables.

**Point de contrôle**: Ajouter un connecteur seulement quand le flux manuel est compris.

## 53 - Critères de réussite

Une instance MEMIA réussie réduit les oublis, rend les projets reprenables, clarifie les décisions, évite les duplications et garde les signaux importants au bon endroit.

Le succès se mesure par la qualité de reprise : un autre assistant peut comprendre l’état en quelques minutes.

**Point de contrôle**: Test final : demander à un nouveau LLM de reprendre un projet uniquement depuis MEMIA.

## 54 - Brancher une surface

Le branchement d'une surface commence toujours par une configuration locale. MEMIA ne demande pas de secret dans le guide, ne stocke pas de token dans Git et ne mélange pas activation de lecture et action externe.

```bash
memia surfaces init
memia surfaces list
memia surfaces status
```

Pour Gmail, on active un mode de lecture limité. Le connecteur réel peut ensuite utiliser OAuth, IMAP ou un export contrôlé selon l'environnement.

```bash
memia surfaces connect gmail --mode oauth --window 7 --limit 50
```

**Point de contrôle**: après activation, vérifier `memia surfaces status` et confirmer que les actions externes restent en validation humaine.

## 55 - QR WhatsApp

WhatsApp se branche via un bridge local ou une API officielle. Dans le mode bridge local, MEMIA BPOS demande le QR au bridge, écrit le résultat dans `_memia/runtime/surfaces/whatsapp/`, puis l'utilisateur scanne le QR dans WhatsApp.

```bash
memia surfaces connect whatsapp --mode local-bridge --bridge-url http://127.0.0.1:BRIDGE_PORT
memia surfaces whatsapp qr
memia surfaces status
```

Le bridge doit exposer au moins un endpoint compatible : `/session/qr`, `/qr`, `/api/whatsapp/qr` ou `/whatsapp/qr`. MEMIA accepte un payload texte ou une image `data:image/...`.

**Point de contrôle**: MEMIA ne doit pas envoyer de message WhatsApp sans validation explicite du message exact.

## 56 - Contrat de surface

Une surface doit déclarer son identifiant, son inbox, ses modes, ses variables d'environnement attendues, ses captures utiles et sa politique d'action. La configuration locale est dans `connectors/surfaces.local.json`, ignorée par Git.

Le contrat minimal d'un connecteur est : lecture limitée, capture locale, routage IPCRWA, preuve, rollback et validation L5 pour les actions externes.

**Point de contrôle**: avant production, demander au MEMIA Security Officer de revoir scopes, secrets, logs et désactivation.

## 57 - Boucles gouvernées

Une boucle gouvernée transforme une surface en routine contrôlée. Elle déclare intention, déclencheur, surface, périmètre de lecture, actions autorisées, actions bloquées, niveau L0-L5, propriétaire, preuves, rollback et cadence de revue.

```bash
cp templates/GOVERNED-LOOP.md "03 - Resources & Assets/MEMIA/gmail-weekly-loop.md"
```

Les niveaux L0 à L4 couvrent observation, capture locale, brouillon, mise à jour interne et routine locale approuvée. L5 couvre envoyer, supprimer, archiver, partager, payer, signer, publier, inviter ou modifier une permission.

**Point de contrôle**: une boucle L5 est bloquée par défaut.

## 58 - États de boucle

Une boucle peut être `draft`, `enabled_read`, `enabled_draft`, `blocked_approval`, `active`, `paused` ou `retired`.

Ces états rendent l'exploitation lisible. Un autre assistant doit pouvoir comprendre si la boucle est seulement décrite, en lecture, en brouillon, active, suspendue ou fermée.

**Point de contrôle**: chaque boucle active doit avoir un propriétaire, une cadence et un rollback.

## 59 - Conseil MEMIA BPOS

Le conseil MEMIA BPOS s'utilise quand une décision mérite plusieurs angles. Il contient MEMIA Board Chair, MEMIA Product Strategist, MEMIA Architecture Lead, MEMIA Security Officer, MEMIA Operations Lead et MEMIA Data Privacy Steward.

```bash
memia agents list board
memia agents show memia-board-chair
memia agents show memia-security-officer
```

Phrase type : « Lance le conseil MEMIA sur cette activation de surface et donne-moi la recommandation, les risques, le niveau L0-L5 et la trace à écrire. »

**Point de contrôle**: le board recommande ; l'utilisateur valide les actions sensibles.

## 60 - Agent sécurité

MEMIA Security Officer vérifie les secrets, permissions, scopes, logs, données sensibles, actions externes et procédure de désactivation. Il intervient avant l'activation d'un connecteur, d'un bridge, d'un webhook, d'une routine planifiée ou d'un export public.

Sa sortie doit classer la décision en `go`, `go_limited` ou `blocked`, avec raisons et mesures de réduction.

**Point de contrôle**: aucun secret ne doit apparaître dans un fichier distribué, un HTML public, un commit ou une conversation ouverte.

## 61 - Fonctionnement conversationnel avec surfaces

L'utilisateur peut parler naturellement : « Branche WhatsApp en lecture via le bridge local », « Fais le relevé Gmail de la semaine », « Mets à jour ton cerveau », « Prépare la boucle gouvernée », « Lance le board avant activation ».

L'assistant traduit ces phrases en appels CLI ou MCP, explique ce qu'il va créer, écrit les captures ou fiches, puis demande validation quand une action sort du cerveau local.

**Point de contrôle**: l'expérience produit est conversationnelle ; les commandes sont le support technique.

## Catalogue des agents

1. **MEMIA Sales Call Prep Assistant** — Aide à cadrer la préparation d’appels commerciaux et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
2. **MEMIA Deal Momentum Analyzer** — Analyse la dynamique des opportunités commerciales et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
3. **MEMIA Meeting Intelligence System** — Aide à cadrer l’exploitation des réunions et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
4. **MEMIA Portfolio Manager** — Structure la gestion de portefeuille et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
5. **MEMIA Meeting to Tasks** — Aide à cadrer la transformation des réunions en actions et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
6. **MEMIA Cowork Deal Room** — Aide à cadrer la structuration d’une deal room et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
7. **MEMIA Excel DCF Modeler** — Aide à cadrer les modèles DCF dans Excel et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
8. **MEMIA Excel LBO Modeler** — Aide à cadrer les modèles LBO dans Excel et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
9. **MEMIA Excel Pivot Wizard** — Aide à cadrer les tableaux croisés Excel et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
10. **MEMIA Excel Variance Analyzer** — Analyse l’analyse des écarts dans Excel et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
11. **MEMIA Macro Economist** — Aide à cadrer l’analyse macroéconomique et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
12. **MEMIA Roadmap Generator** — Produit les feuilles de route et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
13. **MEMIA Status Report Generator** — Produit les rapports de statut et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
14. **MEMIA Acceptance Criteria Creator** — Produit les critères d’acceptation et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
15. **MEMIA Audit Trail Helper** — Aide à cadrer les traces d’audit et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
16. **MEMIA Backlog Grooming Assistant** — Aide à cadrer la revue de backlog et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
17. **MEMIA Change Request Generator** — Produit les demandes de changement et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
18. **MEMIA Confluence Page Generator** — Produit les pages de connaissance et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
19. **MEMIA Definition of Done Generator** — Produit les définitions de terminé et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
20. **MEMIA Governance Checklist Generator** — Produit les checklists de gouvernance et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
21. **MEMIA Jira Ticket Generator** — Produit les tickets de suivi et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
22. **MEMIA Jira Workflow Creator** — Produit les workflows de suivi et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
23. **MEMIA KPI Dashboard Template** — Produit les tableaux de bord KPI et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
24. **MEMIA Linear Issue Generator** — Produit les tickets produit et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
25. **MEMIA User Story Generator** — Produit les user stories et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
26. **MEMIA Approval Workflow Generator** — Produit les circuits d’approbation et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
27. **MEMIA n8n Workflow Generator** — Produit les workflows d’automatisation et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
28. **MEMIA Report Generator** — Produit les rapports structurés et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
29. **MEMIA Legal Risks** — Aide à cadrer les risques juridiques et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
30. **MEMIA Asana Task Creator** — Produit les tâches opérationnelles et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
31. **MEMIA Executive Summary Creator** — Produit les synthèses exécutives et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
32. **MEMIA GitHub Issue Creator** — Produit les issues GitHub et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
33. **MEMIA GitHub Project Setup** — Aide à cadrer la mise en place de projets GitHub et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
34. **MEMIA GitLab Epic Creator** — Produit les epics GitLab et fournit une fiche exploitable avec objectifs, contexte, points ouverts, décisions à prendre et prochaines étapes.
35. **MEMIA Brand Consistency Checker** — Analyse la cohérence de marque et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
36. **MEMIA Deal Review Framework** — Aide à cadrer les revues d’opportunités et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
37. **MEMIA Knowledge Base Builder** — Produit les bases de connaissance et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
38. **MEMIA Sales Comp Plan Designer** — Produit les plans de rémunération commerciale et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
39. **MEMIA Conversation Archaeologist** — Aide à cadrer l’analyse de conversations et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
40. **MEMIA Error Boundary Creator** — Produit la gestion des erreurs applicatives et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
41. **MEMIA Hiring Scorecard** — Aide à cadrer les grilles de recrutement et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
42. **MEMIA MVP Case Builder** — Produit les dossiers MVP et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
43. **MEMIA Practice Plan Creator** — Produit les plans d’entraînement et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
44. **MEMIA Quiz Maker** — Produit les quiz et évaluations et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
45. **MEMIA SEO Keyword Cluster Builder** — Produit les clusters de mots-clés SEO et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
46. **MEMIA Visual Asset Finder** — Collecte et organise la recherche d’assets visuels et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
47. **MEMIA UX Researcher** — Aide à cadrer la recherche utilisateur et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
48. **MEMIA Before You Build** — Aide à cadrer le cadrage avant construction et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
49. **MEMIA Hypothesis Testing Engine** — Aide à cadrer les tests d’hypothèses et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
50. **MEMIA Personal Growth Mentor** — Aide à cadrer la progression personnelle et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
51. **MEMIA Regex Visual Debugger** — Aide à cadrer le débogage visuel de regex et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
52. **MEMIA Sales Forecast Builder** — Produit les prévisions commerciales et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
53. **MEMIA Pricing Strategy** — Aide à cadrer la stratégie de prix et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
54. **MEMIA Game Builder** — Produit les jeux interactifs et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
55. **MEMIA Technical Writer** — Rédige la documentation technique et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
56. **MEMIA Skill Composer Studio** — Produit la composition d’agents et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
57. **MEMIA ROI Calculator** — Aide à cadrer les calculs de ROI et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
58. **MEMIA Social Selling Content Generator** — Produit les contenus de social selling et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
59. **MEMIA Lookalike Customer Finder** — Collecte et organise la recherche de clients similaires et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
60. **MEMIA Market Sizing** — Aide à cadrer le dimensionnement de marché et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
61. **MEMIA Brand Voice Analyzer** — Analyse la voix de marque et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
62. **MEMIA Inclusive Visuals Specialist** — Aide à cadrer les visuels inclusifs et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
63. **MEMIA React Component Generator** — Produit les composants React et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
64. **MEMIA Workflow Automator** — Aide à cadrer l’automatisation de workflows et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
65. **MEMIA Persona Walkthrough Specialist** — Aide à cadrer les walkthroughs persona et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
66. **MEMIA Visual Storyteller** — Rédige les récits visuels et fournit un cadre clair avec angle, contraintes, critères de qualité et éléments à valider.
67. **MEMIA Product Vibe Explainer** — Aide à cadrer l’explication d’un produit et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
68. **MEMIA Travel Planner** — Structure la planification de voyage et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
69. **MEMIA Product Brief** — Aide à cadrer les briefs produit et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
70. **MEMIA Budget Calculator** — Aide à cadrer les budgets et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
71. **MEMIA Idea Validator** — Aide à cadrer la validation d’idées et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
72. **MEMIA Local Knowledge Expert** — Aide à cadrer la connaissance locale et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
73. **MEMIA Travel Route Expert** — Aide à cadrer les itinéraires de voyage et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
74. **MEMIA Weather Analyst** — Aide à cadrer l’analyse météo et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
75. **MEMIA Sync Pull** — Prépare la récupération de synchronisation et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
76. **MEMIA Sync Setup** — Prépare la configuration de synchronisation et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
77. **MEMIA Sync Status** — Prépare le statut de synchronisation et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
78. **MEMIA Product Vibe Explorer** — Aide à cadrer l’exploration produit et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
79. **MEMIA Data Processing** — Aide à cadrer le traitement de données et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
80. **MEMIA Audit Plugin** — Aide à cadrer les audits opérationnels et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
81. **MEMIA Devil Advocate** — Aide à cadrer le challenge critique et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
82. **MEMIA Meeting Prep** — Aide à cadrer la préparation de réunion et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
83. **MEMIA Thought Partner** — Aide à cadrer la réflexion structurée et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
84. **MEMIA Memory Kit** — Aide à cadrer la mémoire de travail et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
85. **MEMIA Triage** — Aide à cadrer le triage opérationnel et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
86. **MEMIA Advisor** — Aide à cadrer le conseil structuré et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
87. **MEMIA Agent Context Loader** — Prépare le chargement de contexte agent et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
88. **MEMIA Data Analyst** — Aide à cadrer l’analyse de données et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
89. **MEMIA Python Tooling** — Aide à cadrer l’outillage Python et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
90. **MEMIA Strategic Clarity** — Aide à cadrer la clarification stratégique et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
91. **MEMIA Security Scanning** — Analyse la revue sécurité et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
92. **MEMIA Product Vibe Worker** — Aide à cadrer l’exécution produit et fournit une synthèse actionnable avec priorités, arbitrages, risques et prochaines actions.
93. **MEMIA Podcast Studio** — Aide à cadrer la production podcast et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
94. **MEMIA Quota Setting Calculator** — Aide à cadrer la définition de quotas et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
95. **MEMIA Competitor Content Analyzer** — Analyse l’analyse de contenus concurrents et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
96. **MEMIA Content Creator** — Produit la création de contenu et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
97. **MEMIA Growth Hacker** — Aide à cadrer la croissance et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
98. **MEMIA Webinar to Content Multiplier** — Rédige la déclinaison de webinaires et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
99. **MEMIA Visual Social Curator** — Collecte et organise le contenu social visuel et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
100. **MEMIA Short Video Strategy Planner** — Structure la stratégie vidéo courte et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
101. **MEMIA Microblog Engagement Planner** — Structure l’engagement microblog et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
102. **MEMIA Pitch Deck Reviewer** — Analyse les pitch decks et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
103. **MEMIA Expansion Revenue Finder** — Collecte et organise les opportunités d’expansion et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
104. **MEMIA Forum Community Builder** — Produit les communautés forum et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
105. **MEMIA AI Citation Strategist** — Structure la présence dans les réponses IA et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
106. **MEMIA App Store Optimizer** — Structure l’optimisation app store et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
107. **MEMIA Book Co-Author** — Rédige la coécriture de livre et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
108. **MEMIA LinkedIn Post Optimizer** — Structure les posts LinkedIn et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
109. **MEMIA Reddit Thread Analyzer** — Analyse les discussions Reddit et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
110. **MEMIA Agentic Search Optimizer** — Structure la recherche agentique et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
111. **MEMIA Cross-Border E-Commerce Specialist** — Aide à cadrer l’e-commerce international et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
112. **MEMIA Livestream Commerce Coach** — Aide à cadrer le commerce en live et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
113. **MEMIA Podcast Strategist** — Structure la stratégie podcast et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
114. **MEMIA Social Media Strategist** — Structure la stratégie réseaux sociaux et fournit un plan de contenu ou d’activation avec audience, message, canaux, variantes et mesure.
115. **MEMIA Cross Conversation Project Manager** — Structure le suivi multi-conversations et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
116. **MEMIA UTM Parameter Generator** — Produit les paramètres UTM et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
117. **MEMIA Data Consolidation Agent** — Aide à cadrer la consolidation de données et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
118. **MEMIA Content SEO** — Rédige le SEO de contenu et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
119. **MEMIA AI Readiness Assessment** — Aide à cadrer l’évaluation de maturité IA et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
120. **MEMIA Dashboard Layout Planner** — Structure les maquettes de tableau de bord et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
121. **MEMIA Data Collector** — Collecte et organise la collecte de données et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
122. **MEMIA Data Quality Checker** — Analyse la qualité des données et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
123. **MEMIA Forecast Generator** — Produit les prévisions et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
124. **MEMIA Report Template Generator** — Produit les modèles de rapport et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
125. **MEMIA Weekly Business Report** — Aide à cadrer le reporting business hebdomadaire et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
126. **MEMIA Airflow DAG Generator** — Produit les DAG Airflow et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
127. **MEMIA Data Catalog Updater** — Aide à cadrer les catalogues de données et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
128. **MEMIA Data Lineage Tracker** — Collecte et organise le lignage de données et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
129. **MEMIA Data Partitioner** — Aide à cadrer le partitionnement de données et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
130. **MEMIA Data Story Outliner** — Aide à cadrer la narration de données et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
131. **MEMIA DBT Model Generator** — Produit les modèles dbt et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
132. **MEMIA Luigi Task Generator** — Produit les tâches Luigi et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
133. **MEMIA Metadata Extractor** — Collecte et organise l’extraction de métadonnées et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
134. **MEMIA Window Function Generator** — Produit les fonctions SQL window et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
135. **MEMIA A/B Test Analyzer** — Analyse les tests A/B et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
136. **MEMIA Aggregation Helper** — Aide à cadrer les agrégations et fournit une analyse vérifiable avec sources, métriques, hypothèses, limites et recommandations.
137. **MEMIA Website Designer** — Produit la conception de sites web et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
138. **MEMIA Next.js Diagnostics Agent** — Analyse le diagnostic Next.js et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
139. **MEMIA Draft Writer** — Rédige les brouillons éditoriaux et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
140. **MEMIA QA Test Agent** — Aide à cadrer la qualité applicative et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
141. **MEMIA Demo Video** — Aide à cadrer les vidéos de démonstration et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
142. **MEMIA Repo Analyzer** — Analyse l’analyse de dépôts et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
143. **MEMIA API Contract** — Aide à cadrer les contrats API et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
144. **MEMIA Code Workbench** — Aide à cadrer le travail de code et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
145. **MEMIA AI Runtime Connector** — Aide à cadrer les connecteurs runtime IA et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
146. **MEMIA Memory** — Aide à cadrer la mémoire de contexte et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
147. **MEMIA Reasoning** — Aide à cadrer le raisonnement structuré et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
148. **MEMIA CLI Workbench** — Aide à cadrer les postes de travail CLI et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
149. **MEMIA Memory** — Aide à cadrer la mémoire de contexte et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
150. **MEMIA Website Generator** — Produit la génération de sites web et fournit un dossier d’exécution avec contexte technique, options, points de vigilance et suite concrète.
151. **MEMIA Frontend Developer** — Aide à cadrer le développement frontend et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
152. **MEMIA Hardware Integration Engineer** — Aide à cadrer les intégrations matérielles et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
153. **MEMIA Reliability Review Engineer** — Aide à cadrer la fiabilité applicative et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
154. **MEMIA Prompt Engineer** — Aide à cadrer les prompts opérationnels et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
155. **MEMIA Database Schema Designer** — Produit les schémas de base de données et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
156. **MEMIA Code Reviewer** — Analyse la revue de code et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
157. **MEMIA Accessibility Audit Runner** — Aide à cadrer les audits d’accessibilité et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
158. **MEMIA CSS Module Generator** — Produit les modules CSS et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
159. **MEMIA Django View Generator** — Produit les vues Django et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
160. **MEMIA Express Route Generator** — Produit les routes Express et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
161. **MEMIA Go Handler Generator** — Produit les handlers Go et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
162. **MEMIA gRPC Service Generator** — Produit les services gRPC et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
163. **MEMIA NestJS Module Generator** — Produit les modules NestJS et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
164. **MEMIA PWA Manifest Generator** — Produit les manifests PWA et fournit une proposition technique avec structure, contraintes, tests, risques et critères de validation.
165. **MEMIA Evidence Collector** — Collecte et organise la collecte de preuves et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
166. **MEMIA Reality Checker** — Analyse la vérification de réalité et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
167. **MEMIA Tool Evaluator** — Analyse l’évaluation d’outils et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
168. **MEMIA Territory Planning Optimizer** — Structure la planification de territoire et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
169. **MEMIA Cold Email Sequence Generator** — Produit les séquences d’emails froids et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
170. **MEMIA Workflow Optimizer** — Structure l’optimisation de workflows et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
171. **MEMIA Test Results Analyzer** — Analyse l’analyse de résultats de tests et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
172. **MEMIA Coverage Report Analyzer** — Analyse les rapports de couverture et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
173. **MEMIA Database Test Helper** — Aide à cadrer les tests de base de données et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
174. **MEMIA Fixture Generator** — Produit les jeux de fixtures et fournit un contrôle qualité avec preuves, écarts, hypothèses et actions correctives.
175. **MEMIA SDK Documentation Generator** — Produit la documentation SDK et fournit une documentation claire avec public cible, structure, exemples et maintenance prévue.
176. **MEMIA ADR Generator** — Produit les décisions d’architecture et fournit une documentation claire avec public cible, structure, exemples et maintenance prévue.
177. **MEMIA Changelog Generator** — Produit les changelogs et fournit une documentation claire avec public cible, structure, exemples et maintenance prévue.
178. **MEMIA Code Documentation Analyzer** — Analyse la documentation de code et fournit une documentation claire avec public cible, structure, exemples et maintenance prévue.
179. **MEMIA Code of Conduct Generator** — Produit les codes de conduite et fournit une documentation claire avec public cible, structure, exemples et maintenance prévue.
180. **MEMIA Configuration Reference Generator** — Produit les références de configuration et fournit une documentation claire avec public cible, structure, exemples et maintenance prévue.
181. **MEMIA Deprecation Notice Generator** — Produit les avis de dépréciation et fournit une documentation claire avec public cible, structure, exemples et maintenance prévue.
182. **MEMIA Design Doc Template** — Produit les design docs et fournit une documentation claire avec public cible, structure, exemples et maintenance prévue.
183. **MEMIA Prospect Research Compiler** — Collecte et organise la recherche prospects et fournit un plan commercial avec signaux, messages, objections, relances et critères de passage.
184. **MEMIA Sales Coaching Plan Generator** — Produit les plans de coaching commercial et fournit un plan commercial avec signaux, messages, objections, relances et critères de passage.
185. **MEMIA Objection Pattern Detector** — Analyse les objections commerciales et fournit un plan commercial avec signaux, messages, objections, relances et critères de passage.
186. **MEMIA Team Chemistry Evaluator** — Analyse la dynamique d’équipe et fournit un plan commercial avec signaux, messages, objections, relances et critères de passage.
187. **MEMIA Deal Strategist** — Structure la stratégie d’opportunité et fournit un plan commercial avec signaux, messages, objections, relances et critères de passage.
188. **MEMIA Personalization At Scale** — Aide à cadrer la personnalisation à grande échelle et fournit un plan commercial avec signaux, messages, objections, relances et critères de passage.
189. **MEMIA Customer Success Manager** — Structure le suivi customer success et fournit un plan commercial avec signaux, messages, objections, relances et critères de passage.
190. **MEMIA Financial Goal Planner** — Structure les objectifs financiers et fournit un modèle de décision avec hypothèses, scénarios, limites et recommandations.
191. **MEMIA Budget Optimizer** — Structure l’optimisation budgétaire et fournit un modèle de décision avec hypothèses, scénarios, limites et recommandations.
192. **MEMIA Portfolio Analyzer** — Analyse l’analyse de portefeuille et fournit un modèle de décision avec hypothèses, scénarios, limites et recommandations.
193. **MEMIA Pricing Analyst** — Aide à cadrer l’analyse de prix et fournit un modèle de décision avec hypothèses, scénarios, limites et recommandations.
194. **MEMIA Competitor Price Tracker** — Collecte et organise le suivi des prix concurrents et fournit un modèle de décision avec hypothèses, scénarios, limites et recommandations.
195. **MEMIA Trend Researcher** — Aide à cadrer la recherche de tendances et fournit un cadrage produit avec problème, utilisateurs, options, métriques et décisions.
196. **MEMIA Sprint Prioritizer** — Structure la priorisation de sprint et fournit un cadrage produit avec problème, utilisateurs, options, métriques et décisions.
197. **MEMIA Churn Autopsy** — Analyse l’analyse du churn et fournit un cadrage produit avec problème, utilisateurs, options, métriques et décisions.
198. **MEMIA Behavioral Nudge Engine** — Aide à cadrer les nudges comportementaux et fournit un cadrage produit avec problème, utilisateurs, options, métriques et décisions.
199. **MEMIA Senior Project Manager** — Structure le pilotage de projet senior et fournit un pilotage de projet avec état, dépendances, risques, arbitrages et prochaines actions.
200. **MEMIA Project Shepherd** — Structure l’accompagnement de projet et fournit un pilotage de projet avec état, dépendances, risques, arbitrages et prochaines actions.
