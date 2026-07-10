# Mode de fonctionnement MEMIA

MEMIA est un système de maîtrise personnel ou professionnel : il sert à capter, qualifier, structurer, décider et retrouver.

Il n'est pas un simple dossier de stockage.

## Cycle standard

```text
capture simple -> état -> destination -> trace
capture avec travail -> état -> workspace -> destination -> action -> trace
```

## États de capture

| État | Signification |
|---|---|
| `raw` | Entrée brute non traitée. |
| `classified` | Nature, risque et destination probable identifiés. |
| `routed` | Destination IPCRWA proposée ou appliquée. |
| `researched` | Travail intermédiaire réalisé dans un workspace. |
| `proposed` | En attente de validation humaine. |
| `approved` | Validation obtenue. |
| `shipped` | Livrable ou action finalisée. |
| `archived` | Conservé pour historique. |
| `rejected` | Écarté avec raison documentée. |

## Règle de destination

La destination est toujours IPCRWA.

| Question | Destination |
|---|---|
| Est-ce une entrée brute ? | `00 - Inbox/` |
| Est-ce un chantier avec fin ? | `01 - Projets/` |
| Est-ce une responsabilité continue ? | `02 - Comptes - Run/` |
| Est-ce une référence durable ? | `03 - Ressources & Assets/` |
| Est-ce un travail temporaire ? | `04 - Workspaces/` |
| Est-ce historique ou non actif ? | `05 - Archives/` |
| Est-ce un état machine ou un log ? | `_memia/` |
| Est-ce une sortie de lecture ? | `html/` |

## Promotion

Une capture ou un workspace devient durable seulement si une promotion explicite existe :

1. lire le contenu ;
2. supprimer le bruit ;
3. réécrire ou synthétiser ;
4. choisir une destination IPCRWA ;
5. créer ou mettre à jour la trace durable ;
6. conserver un pointeur vers les fichiers externes si nécessaire.

## Garde-fous

- Les actions externes, suppressions, paiements, signatures, changements de permission et publications doivent être validés manuellement.
- Les secrets restent hors Git.
- Les documents lourds ou sensibles restent dans un coffre ou stockage externe ; MEMIA garde un pointeur et une synthèse.
- Les logs et index sont dérivés ; la source de vérité reste dans les fichiers canoniques.

