# Règles de destination IPCRWA

## Principe

La destination d'un contenu MEMIA est toujours IPCRWA.

```text
00 - Inbox
01 - Projects
02 - Control - Run
03 - Resources & Assets
04 - Workspaces
05 - Archives
_memia
html
```

## Arbre de décision

| Question | Destination |
|---|---|
| Capture brute non traitée ? | `00 - Inbox/` |
| Projet actif avec fin ou livrable ? | `01 - Projects/` |
| Responsabilité continue ? | `02 - Control - Run/` |
| Doctrine, méthode, registre ou asset durable ? | `03 - Resources & Assets/` |
| Travail temporaire ? | `04 - Workspaces/` |
| Historique non actif ? | `05 - Archives/` |
| Log, index ou état technique ? | `_memia/` |
| Livrable de lecture ? | `html/` |

## Interdits

- Pas de taxonomie parallèle.
- Pas de source durable dans l'inbox.
- Pas de workspace permanent.
- Pas de fichier sensible dans Git.
- Pas de document lourd sans pointeur externe.

