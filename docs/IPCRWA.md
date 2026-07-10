# IPCRWA

IPCRWA est la carte de rangement MEMIA.

## Les huit destinations

| Destination | Usage | Exemple de contenu |
|---|---|---|
| `00 - Inbox/` | Captures brutes | Note vocale transcrite, lien, fichier déposé. |
| `01 - Projects/` | Chantiers actifs | Refonte, lancement, audit, création de livrable. |
| `02 - Control - Run/` | Exploitation continue | Routine hebdomadaire, suivi opérationnel, compte durable. |
| `03 - Resources & Assets/` | Sources durables | Méthode, doctrine, registre, template, asset. |
| `04 - Workspaces/` | Travail temporaire | Recherche, comparaison, transformation, POC. |
| `05 - Archives/` | Historique non actif | Projet clos, ancienne version, référence figée. |
| `_memia/` | Machine | Logs, états, index, manifestes, registres techniques. |
| `html/` | Lecture humaine | Rapport, synthèse, dashboard statique. |

## Question de routage

```text
Est-ce brut, actif, continu, durable, temporaire, historique, machine ou lisible ?
```

La réponse donne la destination.

## Règles de décision

- Brut : rester dans `00 - Inbox/` seulement le temps de qualifier.
- Actif avec fin : aller dans `01 - Projects/`.
- Continu sans fin naturelle : aller dans `02 - Control - Run/`.
- Référence réutilisable : aller dans `03 - Resources & Assets/`.
- Travail intermédiaire : aller dans `04 - Workspaces/`.
- Terminé ou non actif : aller dans `05 - Archives/`.
- État technique dérivé : aller dans `_memia/`.
- Sortie de lecture : aller dans `html/`.

