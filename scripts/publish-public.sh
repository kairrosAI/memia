#!/usr/bin/env bash
# publish-public.sh — prepare (and, only with --confirm, execute) the public
# release of MEMIA BPOS Community to a standalone GitHub repo.
#
# SAFE BY DEFAULT: with no flag it runs the leak gate + site check, builds a
# clean staging copy and a fresh git commit, then PRINTS the push command and
# stops. It performs NO network action. Publication is an explicit, deliberate
# step (L5): re-run with --confirm to actually create the repo and push.
#
#   bash scripts/publish-public.sh            # dry run, no push (default)
#   bash scripts/publish-public.sh --confirm  # create repo + push (L5)
#
set -euo pipefail

REPO_SLUG="kairrosAI/memia"
PKG_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STAGE_DIR="${TMPDIR:-/tmp}/memia-publish-$$"
CONFIRM="no"
[ "${1:-}" = "--confirm" ] && CONFIRM="yes"

echo "==> 1/5 Leak gate (audit:forbidden)"
node "$PKG_DIR/scripts/audit-forbidden.mjs"

echo "==> 2/5 Site check"
node "$PKG_DIR/scripts/site-check.mjs"

echo "==> 3/5 Build clean staging copy at $STAGE_DIR"
rm -rf "$STAGE_DIR"
mkdir -p "$STAGE_DIR"
# Copy the package, excluding local-only and generated content.
rsync -a \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude "data" \
  --exclude ".DS_Store" \
  --exclude "scripts/publish-public.sh" \
  "$PKG_DIR"/ "$STAGE_DIR"/

echo "==> 4/5 Fresh git commit in staging"
cd "$STAGE_DIR"
git init -q
git add -A
git -c user.name="Kairros" -c user.email="release@memia.ai" commit -q \
  -m "MEMIA BPOS Community — initial public release"

# Final safety re-scan of the staged tree.
node "$STAGE_DIR/scripts/audit-forbidden.mjs"

if [ "$CONFIRM" != "yes" ]; then
  echo ""
  echo "==> 5/5 DRY RUN complete. Nothing was pushed."
  echo "    Staged clean repo: $STAGE_DIR"
  echo "    To publish for real, review the staging dir, then run:"
  echo ""
  echo "      cd \"$STAGE_DIR\" && gh repo create $REPO_SLUG --public --source . --remote origin --push"
  echo ""
  echo "    (or re-run: bash scripts/publish-public.sh --confirm)"
  exit 0
fi

echo "==> 5/5 --confirm set: creating repo and pushing (L5 publication)"
command -v gh >/dev/null 2>&1 || { echo "ERROR: gh CLI not found."; exit 1; }
gh repo create "$REPO_SLUG" --public --source "$STAGE_DIR" --remote origin --push
echo "Published: https://github.com/$REPO_SLUG"
