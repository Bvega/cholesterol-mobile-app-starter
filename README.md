# Cholesterol Plan (Mobile) — Expo + TypeScript

A **data-driven** mobile app starter that shows a weekly cholesterol-lowering meal plan (from JSON) and generates a shopping list for selected days.

## 0) Requirements
- Node.js (LTS recommended)
- Git
- Expo Go app on your phone (optional) or Android Studio / Xcode for emulators

## 1) Setup (automated)
```bash
npm install
npm run prepare
```

> `prepare` installs Husky git hooks (pre-commit auto-format via lint-staged).

## 2) Run
```bash
npm run start
```

## 3) What’s inside
- `src/data/plan_week_01.json` — **source of truth** plan
- `src/lib/shoppingList.ts` — shopping list generator (MVP: counts occurrences)
- `src/store/useAppStore.ts` — persisted state (text size, completions, shopping checks)
- `src/screens/*` — Week, Day, Meal, Shopping, Settings

## 4) MVP behavior
- Week screen shows the 7 days + plan tips
- Day screen shows meals + mark as done
- Shopping list selects days and groups items by category

## 5) Next best upgrade (best practice)
Right now, the plan meals are plain text descriptions.

**Next step:** convert each meal into structured `items[]` with:
- ingredientId
- quantity
- unit

Then the shopping list becomes exact (not “x#”).

## 6) GitHub workflow (recommended)
### Start git locally (Windows / Mac)
**PowerShell:**
```powershell
./scripts/init_git.ps1
```

**Bash:**
```bash
./scripts/init_git.sh
```

### Suggested commit milestones
1. `chore: init expo app with typescript`
2. `chore: add eslint prettier husky`
3. `feat: add navigation shell`
4. `feat: week calendar screen`
5. `feat: day detail screen with completion`
6. `feat: shopping list generator + grouping`
7. `feat: persistence for checks`

## 7) Notes
This repo is designed to be **simple, readable, and scalable**.
- Comments only where logic matters.
- Types are the contract.
- Plan data stays immutable + versioned.
