# Workflow de capture

## Objectif

Transformer une entrée brute en information exploitable sans créer de vrac.

## Flux

```text
entrée -> capture -> qualification -> destination -> trace -> action éventuelle
```

## Étapes

1. Déposer l'entrée dans `00 - Inbox/Captures/`.
2. Créer une fiche à partir de `templates/CAPTURE.md`.
3. Qualifier le type, le risque et la destination probable.
4. Si le contenu est simple, router vers la bonne destination.
5. Si le contenu demande du travail, créer un workspace.
6. Produire une synthèse ou un livrable.
7. Promouvoir vers une source durable ou archiver.
8. Noter la décision.

## Quand créer un workspace

Créer un workspace seulement si la capture demande :

- recherche ;
- comparaison ;
- transformation de fichier ;
- brouillon structuré ;
- prototype ;
- décision avec plusieurs options.

## Quand ne pas créer de workspace

Ne pas créer de workspace pour :

- une note immédiatement classable ;
- une ressource déjà claire ;
- une archive évidente ;
- une capture à rejeter.

