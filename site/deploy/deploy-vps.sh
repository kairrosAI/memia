#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${MEMIA_VPS_HOST:-}" ]]; then
  echo "Missing MEMIA_VPS_HOST, for example user@your-vps" >&2
  exit 1
fi

ROOT="${MEMIA_VPS_ROOT:-/var/www/memia.ai}"
RELEASE="$(date +%Y%m%d-%H%M%S)"
LOCAL_SITE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE_RELEASE="$ROOT/releases/$RELEASE"

echo "Deploying MEMIA.ai static site"
echo "Host: $MEMIA_VPS_HOST"
echo "Release: $REMOTE_RELEASE"

ssh "$MEMIA_VPS_HOST" "mkdir -p '$ROOT/releases'"
rsync -az --delete \
  --exclude 'deploy/' \
  --exclude '.DS_Store' \
  "$LOCAL_SITE/" "$MEMIA_VPS_HOST:$REMOTE_RELEASE/"

ssh "$MEMIA_VPS_HOST" "ln -sfn '$REMOTE_RELEASE' '$ROOT/current'"

echo "Release deployed."
echo "Configure Nginx with site/deploy/nginx-memia.ai.conf and test:"
echo "curl -I https://memia.ai/"
