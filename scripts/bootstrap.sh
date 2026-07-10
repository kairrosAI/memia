#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-$PWD}"

mkdir -p "$ROOT/00 - Inbox/Captures"
mkdir -p "$ROOT/00 - Inbox/Surfaces/Gmail"
mkdir -p "$ROOT/00 - Inbox/Surfaces/WhatsApp"
mkdir -p "$ROOT/00 - Inbox/Surfaces/Calendars"
mkdir -p "$ROOT/00 - Inbox/Surfaces/Meetings"
mkdir -p "$ROOT/00 - Inbox/Surfaces/Files"
mkdir -p "$ROOT/00 - Inbox/Surfaces/Signals"
mkdir -p "$ROOT/01 - Projects"
mkdir -p "$ROOT/02 - Control - Run"
mkdir -p "$ROOT/03 - Resources & Assets/MEMIA"
mkdir -p "$ROOT/03 - Resources & Assets/Methods"
mkdir -p "$ROOT/03 - Resources & Assets/Registries"
mkdir -p "$ROOT/03 - Resources & Assets/Templates"
mkdir -p "$ROOT/03 - Resources & Assets/Tools"
mkdir -p "$ROOT/04 - Workspaces"
mkdir -p "$ROOT/05 - Archives"
mkdir -p "$ROOT/_memia/registry"
mkdir -p "$ROOT/_memia/logs"
mkdir -p "$ROOT/_memia/runtime"
mkdir -p "$ROOT/_memia/templates"
mkdir -p "$ROOT/html/assets/memia/logos"
mkdir -p "$ROOT/agents/core"
mkdir -p "$ROOT/agents/board"
mkdir -p "$ROOT/agents/catalog"
mkdir -p "$ROOT/connectors"
mkdir -p "$ROOT/governance"

touch "$ROOT/00 - Inbox/Captures/.gitkeep"
touch "$ROOT/00 - Inbox/Surfaces/Gmail/.gitkeep"
touch "$ROOT/00 - Inbox/Surfaces/WhatsApp/.gitkeep"
touch "$ROOT/00 - Inbox/Surfaces/Calendars/.gitkeep"
touch "$ROOT/00 - Inbox/Surfaces/Meetings/.gitkeep"
touch "$ROOT/00 - Inbox/Surfaces/Files/.gitkeep"
touch "$ROOT/00 - Inbox/Surfaces/Signals/.gitkeep"
touch "$ROOT/01 - Projects/.gitkeep"
touch "$ROOT/02 - Control - Run/.gitkeep"
touch "$ROOT/03 - Resources & Assets/MEMIA/.gitkeep"
touch "$ROOT/03 - Resources & Assets/Methods/.gitkeep"
touch "$ROOT/03 - Resources & Assets/Registries/.gitkeep"
touch "$ROOT/03 - Resources & Assets/Templates/.gitkeep"
touch "$ROOT/03 - Resources & Assets/Tools/.gitkeep"
touch "$ROOT/04 - Workspaces/.gitkeep"
touch "$ROOT/05 - Archives/.gitkeep"
touch "$ROOT/_memia/registry/.gitkeep"
touch "$ROOT/_memia/logs/.gitkeep"
touch "$ROOT/_memia/runtime/.gitkeep"
touch "$ROOT/_memia/templates/.gitkeep"
touch "$ROOT/html/.gitkeep"
touch "$ROOT/agents/core/.gitkeep"
touch "$ROOT/agents/board/.gitkeep"
touch "$ROOT/agents/catalog/.gitkeep"
touch "$ROOT/connectors/.gitkeep"
touch "$ROOT/governance/.gitkeep"

if [ ! -f "$ROOT/.gitignore" ]; then
  cat > "$ROOT/.gitignore" <<'EOF'
# Environnements locaux
.env
.env.*
!.env.example

# Dépendances et builds
node_modules/
dist/
build/
.cache/
coverage/

# Caches d'outils
.codex/
.claude/
.cursor/
.venv/
__pycache__/

# Système
.DS_Store
Thumbs.db

# Logs et états locaux
*.log
connectors/*.local.json
_memia/logs/**/*.jsonl
_memia/logs/**/*.log
_memia/runtime/**
!_memia/runtime/.gitkeep

# Archives générées
*.zip
*.tar
*.tar.gz
EOF
fi

if [ ! -f "$ROOT/.env.example" ]; then
  cat > "$ROOT/.env.example" <<'EOF'
MEMIA_INSTANCE_NAME="memia-local"
MEMIA_HTML_BASE_URL="http://localhost:8765/html"
MEMIA_TIMEZONE="Europe/Paris"
MEMIA_LLM_PROVIDER="manual"
EOF
fi

if [ ! -f "$ROOT/.env.local" ]; then
  {
    echo '# Configuration locale non suivie par Git.'
    echo 'MEMIA_INSTANCE_NAME="memia-local"'
    echo 'MEMIA_HTML_BASE_URL="http://localhost:8765/html"'
    echo 'MEMIA_TIMEZONE="Europe/Paris"'
    echo 'MEMIA_LLM_PROVIDER="manual"'
  } > "$ROOT/.env.local"
fi

echo "MEMIA BPOS initialisé dans $ROOT"
