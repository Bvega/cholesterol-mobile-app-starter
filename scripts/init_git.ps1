# Run from repo root in PowerShell
if (-not (Test-Path "package.json")) {
  Write-Host "Run this from the project root (where package.json is)." -ForegroundColor Red
  exit 1
}

git init

git add .
git commit -m "chore: init expo app with typescript"

git branch -M main

Write-Host "" 
Write-Host "Next (optional):" -ForegroundColor Cyan
Write-Host "  git checkout -b dev"
Write-Host "  git push -u origin main"
