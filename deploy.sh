#!/usr/bin/env bash
#
# Deploy script for csad-web (csad.fedpolyado.edu.ng).
#
# Run this ON THE SERVER, from inside the cloned repo:
#   cd ~/csad-web && ./deploy.sh
#
# It pulls the latest commit on $BRANCH, rebuilds, and (if not already done)
# symlinks the subdomain's public_html at dist/. Safe to re-run any time —
# it's idempotent and refuses to run twice at once.
#
# To point it at a specific document root instead of auto-detecting:
#   DOC_ROOT=/home/<user>/domains/csad.fedpolyado.edu.ng/public_html ./deploy.sh

set -euo pipefail

BRANCH="main"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOC_ROOT="${DOC_ROOT:-$(find /home/*/domains/csad.fedpolyado.edu.ng -maxdepth 1 -name public_html 2>/dev/null | head -n1)}"
LOG_FILE="$HOME/csad-web-deploy.log"
LOCK_FILE="/tmp/csad-web-deploy.lock"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
fail() { log "ERROR: $*"; exit 1; }

exec 200>"$LOCK_FILE"
flock -n 200 || fail "Another deploy is already running."

cd "$REPO_DIR"
log "== Deploy started (repo: $REPO_DIR) =="

log "Fetching origin/$BRANCH..."
git fetch origin "$BRANCH" || fail "git fetch failed"
git reset --hard "origin/$BRANCH" || fail "git reset failed"
COMMIT=$(git rev-parse --short HEAD)
log "Now at commit $COMMIT"

log "Installing dependencies (npm ci)..."
npm ci || fail "npm ci failed"

log "Building..."
npm run build || fail "build failed"

if [ -z "$DOC_ROOT" ]; then
    log "WARNING: could not detect DOC_ROOT. Set it manually, e.g.:"
    log "  DOC_ROOT=/home/<user>/domains/csad.fedpolyado.edu.ng/public_html ./deploy.sh"
elif [ -L "$DOC_ROOT" ] && [ "$(readlink -f "$DOC_ROOT")" = "$(readlink -f "$REPO_DIR/dist")" ]; then
    log "public_html is already symlinked to dist/ — nothing more to do."
else
    log "Pointing $DOC_ROOT at $REPO_DIR/dist ..."
    rm -rf "$DOC_ROOT"
    ln -s "$REPO_DIR/dist" "$DOC_ROOT"
fi

log "Deploy complete. Now serving commit $COMMIT."
log "== Done =="
