#!/usr/bin/env bash
set -e

# Run from repo root
if [ ! -f package.json ]; then
  echo "Run this from the project root (where package.json is)." >&2
  exit 1
fi

git init

git add .
git commit -m "chore: init expo app with typescript"

git branch -M main

echo "\nNext (optional):"

echo "  git checkout -b dev"

echo "  git push -u origin main"
