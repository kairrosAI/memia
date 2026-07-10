# Structure MEMIA - IPCRWA

IPCRWA est le modèle de rangement canonique de MEMIA.

## Racine

| Dossier | Rôle | Règle |
|---|---|---|
| `00 - Inbox/` | Captures brutes | Zone d'entrée non durable. |
| `01 - Projets/` | Projets actifs | Chantiers avec fin, livrable ou décision identifiable. |
| `02 - Comptes - Run/` | Runs continus | Responsabilités durables, opérations, suivi régulier. |
| `03 - Ressources & Assets/` | Ressources durables | Doctrine, méthodes, registres, templates, assets et outils non sensibles. |
| `04 - Workspaces/` | Travail temporaire | Recherche, brouillon, comparaison, transformation, POC. |
| `05 - Archives/` | Archives décidées | Historique non actif, conservé pour lecture. |
| `_memia/` | Métadonnées machine | Logs, registres, états locaux et index dérivés. |
| `html/` | Livrables de lecture | HTML autonomes pour lecture humaine. |

## Interdits

- Ne pas créer de taxonomie parallèle à la racine.
- Ne pas utiliser `04 - Workspaces/` comme stockage durable.
- Ne pas utiliser `00 - Inbox/` comme mémoire.
- Ne pas stocker de secrets, pièces sensibles ou caches dans Git.
- Ne pas conserver de fichiers lourds sans pointeur et décision.

## Forme d'un projet

```text
01 - Projets/<domaine>/<code-projet>/
  README.md
  HANDOVER.md
  DECISIONS.md
  01 - Sources/
  02 - Notes/
  03 - Specs/
  04 - Livrables/
```

## Forme d'un run

```text
02 - Comptes - Run/<domaine>/<nom-run>/
  README.md
  HANDOVER.md
  DECISIONS.md
  logs/
  routines/
```

## Forme d'un workspace

```text
04 - Workspaces/<slug-date>/
  README.md
  inputs/
  outputs/
  notes.md
```

Un workspace doit être promu, archivé ou supprimé quand le travail est terminé.

