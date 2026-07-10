#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-$PWD}"
cd "$ROOT"

status=0

fail() {
  printf 'ERREUR: %s\n' "$1" >&2
  status=1
}

require_dir() {
  [ -d "$1" ] || fail "dossier manquant: $1"
}

require_dir "00 - Inbox"
require_dir "01 - Projets"
require_dir "02 - Comptes - Run"
require_dir "03 - Ressources & Assets"
require_dir "04 - Workspaces"
require_dir "05 - Archives"
require_dir "_memia"
require_dir "html"

if find . \( -path './.git' -o -path './node_modules' \) -prune -o -name '.env' -print | grep -q .; then
  fail "fichier .env détecté"
fi

if find . \( -path './.git' -o -path './node_modules' \) -prune -o \( -name '*.pem' -o -name '*.key' -o -name 'id_rsa' -o -name 'id_ed25519' \) -print | grep -q .; then
  fail "fichier de clé détecté"
fi

if find . \( -path './.git' -o -path './node_modules' \) -prune -o \( -name '.codex' -o -name '.claude' -o -name '.cursor' -o -name 'node_modules' -o -name '.venv' \) -print | grep -q .; then
  fail "cache ou dossier d'outil privé détecté"
fi

if find . \( -path './.git' -o -path './node_modules' \) -prune -o -name '.DS_Store' -print | grep -q .; then
  fail "métadonnées macOS .DS_Store détectées"
fi

if command -v rg >/dev/null 2>&1; then
  if rg -n --hidden -g '!/.git/**' -g '!node_modules/**' -g '!scripts/audit-clean.sh' 'BEGIN [A-Z ]*PRIVATE KEY' . >/tmp/memia-audit-private-key.$$ 2>/dev/null; then
    cat /tmp/memia-audit-private-key.$$
    rm -f /tmp/memia-audit-private-key.$$
    fail "bloc de clé privée détecté"
  fi
  rm -f /tmp/memia-audit-private-key.$$

  if rg -n --hidden -g '!/.git/**' -g '!node_modules/**' -g '!package-lock.json' -g '!scripts/audit-clean.sh' '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}' . >/tmp/memia-audit-email.$$ 2>/dev/null; then
    cat /tmp/memia-audit-email.$$
    rm -f /tmp/memia-audit-email.$$
    fail "adresse email détectée"
  fi
  rm -f /tmp/memia-audit-email.$$
else
  printf 'AVERTISSEMENT: rg absent, scan contenu limité.\n' >&2
fi

if [ "$status" -eq 0 ]; then
  echo "Contrôle terminé sans anomalie."
fi

exit "$status"
