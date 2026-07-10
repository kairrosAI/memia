# Maintenance

## Routine hebdomadaire

1. Vider ou qualifier `00 - Inbox/`.
2. Fermer les workspaces terminés.
3. Mettre à jour les handovers des projets actifs.
4. Archiver les projets clos.
5. Vérifier les fichiers lourds ou sensibles.
6. Lancer `npm run audit:clean`.

## Routine mensuelle

1. Revoir `01 - Projets/` et `02 - Comptes - Run/`.
2. Supprimer les workspaces obsolètes.
3. Consolider les méthodes utiles dans `03 - Ressources & Assets/`.
4. Vérifier que `html/` ne remplace pas les sources canoniques.
5. Mettre à jour les règles de sécurité si des intégrations sont ajoutées.

## Critères de santé

- Peu de captures brutes anciennes.
- Workspaces courts et bornés.
- Projets avec handover lisible.
- Runs avec décision et état de reprise.
- Ressources réutilisables et non redondantes.
- Aucun secret dans Git.

