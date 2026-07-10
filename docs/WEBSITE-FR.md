# MEMIA.ai - Guide site et VPS

Ce guide décrit comment publier le site public MEMIA BPOS sur `memia.ai` sans exposer le dépôt complet ni les dossiers runtime.

## Principe

Le site public est un extrait statique situé dans `site/`. Il contient uniquement les pages, assets, guides publics et fichiers nécessaires à l'affichage web.

Ne jamais servir :

- la racine du dépôt ;
- les dossiers `_memia/`, `.git/`, `node_modules/`, `agents/catalog/` en brut ;
- les fichiers `.env`, logs, caches, exports de runtime ou fichiers locaux ;
- les archives internes non vérifiées.

## Structure du site

```text
site/
  index.html
  install/index.html
  docs/index.html
  agents/index.html
  connectors/index.html
  security/index.html
  guides/fr/index.html
  guides/en/index.html
  assets/css/main.css
  assets/js/site.js
  assets/logos/
  deploy/nginx-memia.ai.conf
  deploy/deploy-vps.sh
  robots.txt
  sitemap.xml
  404.html
```

## Pages publiques

- `/` : page d'accueil produit.
- `/install/` : installation npm, GitHub, ZIP, Homebrew futur.
- `/docs/` : hub documentaire.
- `/agents/` : agents cœur, board et familles spécialisées.
- `/connectors/` : surfaces Gmail, WhatsApp, calendriers, réunions, fichiers et signaux.
- `/security/` : confiance, local-first, secrets, validations.
- `/guides/fr/` : guide français complet.
- `/guides/en/` : English guide.

## Prévisualiser localement

Depuis la racine du package :

```bash
npm run site:check
npm run site:preview
```

Puis ouvrir :

```text
http://127.0.0.1:8080
```

## Préparer la release statique

Avant déploiement :

```bash
npm run audit:clean
npm run site:check
```

Vérifier l'absence de chemins locaux ou données sensibles :

```bash
rg -n "local-path|env-file|secret|token|password|private key" site
```

Vérifier les liens internes :

```bash
find site -name "*.html" -print
```

## Déploiement VPS

Le script `site/deploy/deploy-vps.sh` est un modèle. Il prépare une release datée, synchronise le dossier `site/` vers le VPS, puis bascule le lien symbolique `current`.

Variables attendues :

```bash
export MEMIA_VPS_HOST="user@your-vps"
export MEMIA_VPS_ROOT="/var/www/memia.ai"
```

Déploiement :

```bash
site/deploy/deploy-vps.sh
```

Le script n'embarque aucun secret. Les clés SSH, accès VPS, DNS et certificats restent gérés hors dépôt.

## Configuration Nginx

Copier `site/deploy/nginx-memia.ai.conf` sur le VPS :

```bash
sudo cp nginx-memia.ai.conf /etc/nginx/sites-available/memia.ai
sudo ln -s /etc/nginx/sites-available/memia.ai /etc/nginx/sites-enabled/memia.ai
sudo nginx -t
sudo systemctl reload nginx
```

## Certificat SSL

Avec Certbot :

```bash
sudo certbot --nginx -d memia.ai -d www.memia.ai
```

Puis vérifier :

```bash
curl -I https://memia.ai/
curl -I https://memia.ai/install/
curl -I https://memia.ai/security/
curl -I https://memia.ai/sitemap.xml
```

Chaque URL doit retourner `200 OK`, sauf `www.memia.ai` qui doit rediriger vers `memia.ai`.

## Rollback

Le déploiement utilise des releases :

```text
/var/www/memia.ai/releases/20260707-210000/
/var/www/memia.ai/current -> /var/www/memia.ai/releases/20260707-210000/
```

Pour revenir à la release précédente :

```bash
sudo ln -sfn /var/www/memia.ai/releases/<release-precedente> /var/www/memia.ai/current
sudo systemctl reload nginx
```

## SEO et confiance

Chaque page doit avoir :

- un titre unique ;
- une description unique ;
- une URL canonique ;
- Open Graph ;
- une structure H1/H2 claire ;
- aucun jargon technique dans le premier écran ;
- des CTA vers installation, documentation et sécurité.

Le site inclut :

- `robots.txt` ;
- `sitemap.xml` ;
- JSON-LD `SoftwareApplication` sur la page d'accueil ;
- pages spécialisées pour installation, agents, connecteurs et sécurité.

## Checklist avant publication

- Le site ne sert que `site/`.
- Les assets logo sont présents.
- Aucun chemin local n'apparaît dans le HTML.
- Aucun secret n'apparaît dans le site.
- Les pages principales répondent en local.
- Nginx répond avec HTTPS.
- Les redirections `www` fonctionnent.
- `sitemap.xml` est accessible.
- Le rollback est testé.

## Mise à jour

Pour mettre à jour le site :

1. modifier les fichiers dans `site/` ;
2. lancer `npm run site:check` ;
3. déployer une nouvelle release ;
4. tester les URLs publiques ;
5. conserver la release précédente pour rollback.
