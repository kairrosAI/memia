# Capture, destinations et routines

## Contrat

```text
capture simple -> état -> destination -> log
capture avec travail -> état -> workspace -> destination -> action -> log
```

## États

```text
raw
classified
routed
researched
proposed
approved
shipped
archived
rejected
```

## Routines minimales

| Routine | Fréquence | Sortie |
|---|---:|---|
| `capture-review` | quotidienne | captures classées |
| `workspace-review` | hebdomadaire | workspaces fermés ou promus |
| `project-handover-review` | hebdomadaire | handovers à jour |
| `security-audit` | hebdomadaire | résultat du contrôle de sécurité |
| `archive-review` | mensuelle | projets clos archivés |

Ces routines sont manuelles dans l’installation de départ. Toute automatisation doit être ajoutée séparément avec décision, test et rollback.
