# Plan 002: Guard theme storage before download hydration

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving on. Do not add unit tests,
> integration tests, smoke tests, or any new test framework; the project owner
> explicitly rejected test creation. If a STOP condition occurs, stop and report
> instead of improvising.
>
> **Drift check (run first)**:
> `git diff --stat 07e9aa3..HEAD -- src/main.js index.html README.md`
> If any in-scope file changed, compare the current state below against live code
> before proceeding.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: reliability
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

Theme setup runs before release download hydration. If `localStorage` throws in a
privacy mode, restricted iframe, locked-down browser, or future embedded context,
the whole module can stop before `hydrateDownloads()` runs. The user then sees
fallback release links even though the GitHub release lookup could have worked.

## Current state

- `src/main.js:27` defines `storedTheme()`.
- `src/main.js:28` calls `localStorage.getItem(...)` directly.
- `src/main.js:58` calls `localStorage.setItem(...)` directly.
- `src/main.js:184` calls `setupTheme()`.
- `src/main.js:185` calls `hydrateDownloads()`.

## Commands You Will Need

| Purpose            | Command                        | Expected on success |
| ------------------ | ------------------------------ | ------------------- |
| Build site         | `npm run check`                | exit 0              |
| Audit dependencies | `npm audit --audit-level=high` | exit 0              |

## Scope

**In scope**:

- `src/main.js`
- `README.md` only if adding a short manual validation note is helpful

**Out of scope**:

- Adding tests.
- Reworking the theme UI.
- Changing the release download API.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Add safe storage helpers

Create small helper functions in `src/main.js` for theme storage access:

- `readStoredTheme()`
- `writeStoredTheme(theme)`

Wrap `localStorage.getItem` and `localStorage.setItem` in `try/catch`. Reads
should return `null` on failure. Writes should fail silently after an optional
debug-only console warning.

**Verify**: `npm run check` -> exit 0.

### Step 2: Use helpers in theme setup

Replace the direct reads and writes in `storedTheme()` and the theme toggle with
the safe helpers. Keep the existing light/dark validation and image swap logic.

**Verify**: `npm run check` -> exit 0.

### Step 3: Manually simulate blocked storage

In a browser console during local preview, temporarily monkey-patch storage
methods to throw before loading the page, or use a browser mode that blocks
storage. Confirm the page still calls `hydrateDownloads()` and updates download
links when GitHub responds.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Toggle light/dark theme in normal local preview.
- Reload and confirm the theme persists when storage works.
- Simulate storage failure and confirm the page still renders and the download
  section hydrates or falls back gracefully.

## Done Criteria

- [ ] Storage access failure cannot prevent download hydration.
- [ ] Existing theme behavior remains intact when storage works.
- [ ] `npm run check` exits 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- The browser environment does not allow a safe way to distinguish storage
  failure from unsupported storage.
- The implementation requires a new dependency.

## Maintenance Notes

Reuse the same helpers if future plans add release caching, so storage failure
handling stays consistent.
