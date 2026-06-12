# Plan 011: Add start and format commands for the site

> **Executor instructions**: Do not add tests. Keep the change to npm command metadata, formatter configuration, README documentation, and the generated lockfile.
>
> **Drift check (run first)**: `git diff --stat 07e9aa3..HEAD -- package.json package-lock.json README.md plans/README.md`

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: developer experience
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

The other TabFlow repos expose `npm start` and formatter commands, but the resources site only exposes `dev`, `build`, `preview`, and `check`. The owner wants to run `npm start` and formatting across all three repositories. Adding the same command shape here makes local validation consistent without introducing tests.

## Current state

- `package.json` has no `start`, `format`, or `format:write` scripts.
- `README.md` tells contributors to run `npm run dev`.
- No test framework exists in this repository, and the owner explicitly does not want tests added.

## Commands you will need

| Purpose | Command                                             | Expected on success            |
| ------- | --------------------------------------------------- | ------------------------------ |
| Install | `npm install --save-dev prettier@latest --no-audit` | exit 0                         |
| Format  | `npm run format`                                    | exit 0                         |
| Build   | `npm run check`                                     | exit 0                         |
| Audit   | `npm audit --audit-level=high`                      | exit 0, 0 high vulnerabilities |

## Scope

**In scope**

- `package.json`
- `package-lock.json`
- `README.md`
- `plans/README.md`

**Out of scope**

- Adding lint or test frameworks.
- Changing site behavior or content.

## Steps

1. Add `prettier` as a dev dependency.
2. Add `start`, `format`, and `format:write` scripts. `start` should delegate to the existing Vite dev command.
3. Update `check` so it formats and then builds.
4. Document `npm start` and the quality commands in the README.

## Done criteria

- [ ] `npm start` exists.
- [ ] `npm run format` exists and exits 0.
- [ ] `npm run check` exits 0.
- [ ] `npm audit --audit-level=high` exits 0.
- [ ] No tests were added.

## Maintenance notes

Keep this repository's command surface aligned with the app and extension repos: npm only, `npm start` for local development, and formatting through Prettier.
