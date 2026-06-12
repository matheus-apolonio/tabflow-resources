# Plan 001: Fix GitHub Pages asset paths

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving on. Do not add unit tests,
> integration tests, smoke tests, or any new test framework; the project owner
> explicitly rejected test creation. If a STOP condition occurs, stop and report
> instead of improvising.
>
> **Drift check (run first)**:
> `git diff --stat 07e9aa3..HEAD -- index.html vite.config.js README.md`
> If any in-scope file changed, compare the current state below against live code
> before proceeding.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: correctness
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

The Vite site is configured for GitHub Pages under `/tabflow-resources/`, but
several image references are absolute from the domain root. On GitHub Pages those
requests resolve to `https://matheus-apolonio.github.io/assets/...` instead of
`https://matheus-apolonio.github.io/tabflow-resources/assets/...`, so the
published page can show broken favicon, brand, and browser icons.

## Current state

- `vite.config.js:4` sets `base: "/tabflow-resources/"`.
- `index.html:13` uses `<link rel="icon" href="/assets/app/tabflow-icon.png" ...>`.
- `index.html:45` uses `<img src="/assets/app/tabflow-icon.png" ...>`.
- `index.html:161`, `166`, `171`, `176`, `181`, `186`, and `191` use
  `/assets/browser-icons/*.svg`.
- Screenshot images already use relative `assets/...` paths.

## Commands You Will Need

| Purpose              | Command                        | Expected on success             |
| -------------------- | ------------------------------ | ------------------------------- | ---------- |
| Build site           | `npm run check`                | exit 0                          |
| Inspect build output | `rg -n 'src="/assets           | href="/assets' dist/index.html` | no matches |
| Audit dependencies   | `npm audit --audit-level=high` | exit 0                          |

## Scope

**In scope**:

- `index.html`
- `vite.config.js` only if a Vite-native asset strategy requires it
- `README.md` only if documenting the asset path rule helps future edits

**Out of scope**:

- Adding tests.
- Changing published domains or repository names.
- Replacing the icon assets.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Replace root-absolute asset paths

Change the root-absolute image and icon paths in `index.html` to a Pages-safe
form. The smallest compatible fix is to use relative paths, for example:

- `href="assets/app/tabflow-icon.png"`
- `src="assets/app/tabflow-icon.png"`
- `src="assets/browser-icons/chrome.svg"`

Keep the absolute Open Graph image URL unchanged because it is intentionally a
canonical external URL for social crawlers.

**Verify**: `npm run check` -> exit 0.

### Step 2: Inspect the generated HTML

After building, inspect `dist/index.html` and confirm that the root-absolute
asset paths are gone.

**Verify**: `rg -n 'src="/assets|href="/assets' dist/index.html` -> no matches.

### Step 3: Document the rule if needed

If future editors are likely to reintroduce the bug, add one README sentence
under Development explaining that in-page static assets should be relative or
Vite-resolved because the site is served from the `/tabflow-resources/` base.

**Verify**: `npm run check` -> exit 0.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Run `npm run check`.
- Run `npm run preview` and open the preview URL.
- Confirm the favicon, brand icon, and browser icons load in the browser network
  panel with `/tabflow-resources/assets/...` or otherwise base-correct URLs.

## Done Criteria

- [ ] Published asset URLs are compatible with the configured GitHub Pages base.
- [ ] No root-absolute `/assets/...` icon/image references remain in generated
      HTML.
- [ ] `npm run check` exits 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- Vite rewrites the chosen path form into an unexpected broken URL.
- A CDN or custom domain migration is required to make the paths correct.

## Maintenance Notes

Use the current GitHub Pages base as the source of truth. If the site later moves
to a custom domain root, revisit this plan's asset-path guidance.
