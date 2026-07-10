# MEMIA.ai static site

This folder contains the public static website for MEMIA BPOS.

Deploy only this folder to the web server. Do not serve the repository root, runtime folders, source package internals or local configuration files.

## Preview

```bash
npm run site:check
npm run site:preview
```

Open:

```text
http://127.0.0.1:8080
```

## VPS deployment

```bash
export MEMIA_VPS_HOST="user@your-vps"
export MEMIA_VPS_ROOT="/var/www/memia.ai"
site/deploy/deploy-vps.sh
```

Then configure Nginx with `site/deploy/nginx-memia.ai.conf`.
