# Sécurité MEMIA BPOS

MEMIA BPOS est local-first. Une instance neuve doit rester propre : pas de secret suivi par Git, pas de cache d’outil, pas d’export personnel non revu, pas de publication externe sans validation humaine.

## Règles dures

- Ne jamais commiter de mot de passe, clé, token, cookie, session ou fichier d'environnement réel.
- Ne jamais commiter de pièce d'identité, signature, document médical, document familial ou fichier bancaire.
- Ne jamais commiter de cache d'outil, historique de conversation privé ou sortie brute non revue.
- Ne jamais exposer le dépôt complet via un serveur web.
- Ne jamais automatiser une action externe sensible sans validation humaine explicite.

## Fichiers ignorés

La configuration `.gitignore` exclut notamment :

- `.env`, `.env.*`, sauf `.env.example` ;
- caches d'outils ;
- dépendances ;
- builds ;
- logs locaux ;
- archives distribuables générées.

## Données lourdes et sensibles

MEMIA peut référencer des fichiers externes, mais ne doit pas les absorber par défaut.

Bonne pratique :

```text
fichier externe sensible -> stockage externe contrôlé -> pointeur dans MEMIA -> synthèse non sensible
```

## Audit local

```bash
npm run audit:clean
```

L'audit vérifie les dossiers attendus et cherche des marqueurs fréquents de fuite : clés privées, fichiers d'environnement suivis, adresses email et caches.

Un contrôle sans anomalie ne prouve pas qu'un dépôt est publiable. Il réduit seulement le risque évident.
