# MEMIA BPOS Governed Loops

Une boucle gouvernée est une routine MEMIA BPOS qui peut lire un signal, le qualifier, préparer une action et demander validation quand le niveau de risque l’exige. Elle sert à transformer des surfaces comme Gmail, WhatsApp, calendriers, fichiers ou webhooks en mémoire utile sans créer d’automatisation opaque.

## 1. Définition

Une boucle gouvernée possède toujours :

- une intention ;
- un déclencheur ;
- une surface ;
- un périmètre de lecture ;
- une règle de capture ;
- une règle de routage IPCRWA ;
- un niveau de validation ;
- un propriétaire ;
- une preuve attendue ;
- un rollback ;
- une cadence de revue.

Le principe est simple : la boucle lit et prépare, mais ne sort pas du cerveau local sans validation explicite.

## 2. Niveaux de validation

| Niveau | Nom | Autorisé par défaut | Exemples |
|---|---|---|---|
| L0 | Observation | Oui | lire un état local, compter des fichiers, afficher un statut |
| L1 | Capture locale | Oui | créer une capture, résumer un signal, écrire une note |
| L2 | Brouillon | Oui, si local | préparer un email, un message, une tâche ou un événement sans l’envoyer |
| L3 | Mise à jour interne | Selon règle | modifier un handover, une décision, un registre ou un board interne |
| L4 | Routine locale planifiée | Avec propriétaire | lancer un relevé quotidien ou hebdomadaire en lecture |
| L5 | Action externe sensible | Non | envoyer, supprimer, archiver, partager, payer, signer, publier, inviter, modifier une permission |

Toute action L5 doit être bloquée tant qu’une validation humaine explicite n’est pas donnée.

## 3. États d’une boucle

| État | Signification |
|---|---|
| `draft` | la boucle est décrite mais pas activée |
| `enabled_read` | la boucle lit une surface dans un périmètre limité |
| `enabled_draft` | la boucle prépare des brouillons sans action externe |
| `blocked_approval` | la boucle attend une validation humaine |
| `active` | la boucle fonctionne selon sa cadence approuvée |
| `paused` | la boucle est arrêtée temporairement |
| `retired` | la boucle est fermée et conservée pour historique |

## 4. Format de boucle

Chaque boucle doit tenir dans une fiche lisible.

```yaml
id: loop-example
name: Daily Gmail Signal Review
status: draft
owner: operations
surface: gmail
trigger: daily 08:30
validation_level: L4
allowed_actions:
  - read threads in the approved window
  - create MEMIA captures
  - draft replies without sending
blocked_actions:
  - send email
  - archive or delete email
  - change labels
evidence:
  - capture file
  - handover update
  - decision entry if scope changes
rollback:
  - disable the loop
  - remove local credentials
  - mark pending captures as paused
review_cadence: weekly
```

## 5. Exemple Gmail

**Intention** : détecter les emails importants de la semaine et créer les captures utiles.

**Surface** : Gmail.

**Périmètre** : sept jours, maximum cinquante threads, lecture seulement.

**Actions autorisées** : résumer, extraire engagements, créer captures, préparer brouillons.

**Actions bloquées** : envoyer, archiver, supprimer, modifier labels, transférer une pièce jointe.

**Commande de préparation** :

```bash
memia surfaces init
memia surfaces connect gmail --mode oauth --window 7 --limit 50
memia surfaces status
```

**Phrase utilisateur** :

```text
Lis les signaux Gmail importants de cette semaine, crée les captures MEMIA utiles, puis dis-moi ce qui demande validation.
```

## 6. Exemple WhatsApp

**Intention** : repérer les promesses, urgences et suivis dans WhatsApp.

**Surface** : WhatsApp.

**Périmètre** : bridge local, lecture limitée, aucun envoi automatique.

**Commandes de préparation** :

```bash
memia surfaces init
memia surfaces connect whatsapp --mode local-bridge --bridge-url http://127.0.0.1:BRIDGE_PORT
memia surfaces whatsapp qr
memia surfaces status
```

Le QR est fourni par un bridge WhatsApp local compatible. MEMIA BPOS ne génère pas une session WhatsApp à lui seul : il demande au bridge le payload ou l’image QR, l’écrit dans le runtime local, puis l’utilisateur scanne le QR dans WhatsApp.

**Actions bloquées** : envoyer un message, exporter des contacts, transférer un fichier, supprimer un fil.

## 7. Exemple calendrier

**Intention** : préparer la journée et détecter conflits, réunions sans préparation et échéances.

**Surface** : calendriers.

**Périmètre** : lecture des événements à venir, par défaut sept jours.

**Actions autorisées** : créer captures de préparation, relier événements à projets/runs, rédiger brouillons de suivi.

**Actions bloquées** : créer, déplacer, supprimer un événement, inviter un participant.

## 8. Exemple webhook

**Intention** : transformer des événements applicatifs en signaux MEMIA.

**Surface** : signals.

**Périmètre** : événements signés, normalisés, dédupliqués.

**Actions autorisées** : créer captures, mettre à jour un board interne, ouvrir un incident interne.

**Actions bloquées** : appeler une API externe de correction, fermer un incident source, changer un statut client.

## 9. Board de validation

Activer le board quand :

- une surface touche des données personnelles ;
- un connecteur demande un nouveau secret ou un nouveau scope ;
- une routine devient planifiée ;
- une action externe pourrait partir automatiquement ;
- un export public ou distribué est préparé.

Phrase type :

```text
Run the MEMIA board on this governed loop. I need the product, architecture, security, operations and privacy positions before activation.
```

## 10. EN - Governed Loops

A governed loop is a MEMIA BPOS routine with a declared intent, trigger, surface, read scope, IPCRWA routing rule, approval level, owner, evidence and rollback. It may read and prepare; it must not perform external sensitive actions without explicit human approval.

Use L0-L4 for local observation, capture, drafts, internal updates and approved scheduled routines. Use L5 for sends, deletes, external shares, payments, signatures, publications, permission changes and other sensitive external mutations. L5 is blocked by default.

