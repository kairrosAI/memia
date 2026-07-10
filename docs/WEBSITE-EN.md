# MEMIA.ai - Website and VPS guide

This guide explains how to publish the MEMIA BPOS public website on `memia.ai` without exposing the full repository or runtime folders.

## Principle

The public website is a static extract located in `site/`. It contains only pages, assets, public guides and files required for web rendering.

Never serve:

- the repository root;
- `_memia/`, `.git/`, `node_modules/`, raw `agents/catalog/`;
- `.env` files, logs, caches, runtime exports or local files;
- unverified internal archives.

## Site structure

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

## Public pages

- `/` : product homepage.
- `/install/` : npm, GitHub, ZIP and future Homebrew installation.
- `/docs/` : documentation hub.
- `/agents/` : core agents, board and specialized families.
- `/connectors/` : Gmail, WhatsApp, calendars, meetings, files and signals.
- `/security/` : trust, local-first, secrets, approvals.
- `/guides/fr/` : full French guide.
- `/guides/en/` : full English guide.

## Local preview

From the package root:

```bash
npm run site:check
npm run site:preview
```

Then open:

```text
http://127.0.0.1:8080
```

## Prepare the static release

Before deployment:

```bash
npm run audit:clean
npm run site:check
```

Check for local paths or sensitive strings:

```bash
rg -n "local-path|env-file|secret|token|password|private key" site
```

Check internal pages:

```bash
find site -name "*.html" -print
```

## VPS deployment

`site/deploy/deploy-vps.sh` is a template. It creates a dated release, syncs the `site/` folder to the VPS and switches the `current` symlink.

Expected variables:

```bash
export MEMIA_VPS_HOST="user@your-vps"
export MEMIA_VPS_ROOT="/var/www/memia.ai"
```

Deploy:

```bash
site/deploy/deploy-vps.sh
```

The script contains no secret. SSH keys, VPS access, DNS and certificates remain outside the repository.

## Nginx configuration

Copy `site/deploy/nginx-memia.ai.conf` on the VPS:

```bash
sudo cp nginx-memia.ai.conf /etc/nginx/sites-available/memia.ai
sudo ln -s /etc/nginx/sites-available/memia.ai /etc/nginx/sites-enabled/memia.ai
sudo nginx -t
sudo systemctl reload nginx
```

## SSL certificate

With Certbot:

```bash
sudo certbot --nginx -d memia.ai -d www.memia.ai
```

Then verify:

```bash
curl -I https://memia.ai/
curl -I https://memia.ai/install/
curl -I https://memia.ai/security/
curl -I https://memia.ai/sitemap.xml
```

Each URL should return `200 OK`, except `www.memia.ai`, which should redirect to `memia.ai`.

## Rollback

Deployment uses releases:

```text
/var/www/memia.ai/releases/20260707-210000/
/var/www/memia.ai/current -> /var/www/memia.ai/releases/20260707-210000/
```

To revert to the previous release:

```bash
sudo ln -sfn /var/www/memia.ai/releases/<previous-release> /var/www/memia.ai/current
sudo systemctl reload nginx
```

## SEO and trust

Each page should have:

- a unique title;
- a unique description;
- a canonical URL;
- Open Graph tags;
- clear H1/H2 structure;
- no technical jargon in the first viewport;
- CTAs to installation, documentation and security.

The site includes:

- `robots.txt`;
- `sitemap.xml`;
- `SoftwareApplication` JSON-LD on the homepage;
- dedicated installation, agents, connectors and security pages.

## Pre-publication checklist

- The VPS serves only `site/`.
- Logo assets are present.
- No local path appears in HTML.
- No secret appears in the site.
- Main pages work locally.
- Nginx responds over HTTPS.
- `www` redirects work.
- `sitemap.xml` is accessible.
- Rollback is tested.

## Updates

To update the website:

1. edit files in `site/`;
2. run `npm run site:check`;
3. deploy a new release;
4. test public URLs;
5. keep the previous release for rollback.
