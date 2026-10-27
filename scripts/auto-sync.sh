#!/usr/bin/env bash
# ==============================================================================
# TechCloudX Academy - Automated Git Sync Script (Bash / Linux / CI)
# ==============================================================================
# Usage:
#   ./scripts/auto-sync.sh "feat: add user authentication API"
# ==============================================================================

set -euo pipefail

COMMIT_MSG="${1:-chore: automated sync update}"

echo ""
echo "========================================================"
echo "    TechCloudX Academy - Automated Git Sync (Bash)     "
echo "========================================================"
echo ""

# Find repository root
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || true)
if [ -z "$REPO_ROOT" ]; then
    echo "[ERROR] Current directory is not inside a valid Git repository." >&2
    exit 1
fi

cd "$REPO_ROOT"

# Step 1: Stage all changes
echo "[1/3] Staging all working directory changes..."
git add .

# Step 2: Check for changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo "[INFO] Working tree is clean. No staged changes to commit."
    exit 0
fi

echo ""
echo "[Staged Changes Summary]"
git status --short

# Step 3: Commit changes
echo ""
echo "[2/3] Committing changes with message: '$COMMIT_MSG'..."
git commit -m "$COMMIT_MSG"

# Step 4: Push to origin main
echo ""
echo "[3/3] Pushing commits to origin/main..."
git push origin main

echo ""
echo "========================================================"
echo " [SUCCESS] TechCloudX Academy changes synced to origin/main!"
echo "========================================================"
echo ""
