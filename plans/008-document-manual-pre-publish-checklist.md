# Plan 008: Document manual pre-publish checklist

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving on. Do not add unit tests,
> integration tests, smoke tests, or any new test framework; the project owner
> explicitly rejected test creation. If a STOP condition occurs, stop and report
> instead of improvising.
>
> **Drift check (run first)**:
> `git diff --stat 07e9aa3..HEAD -- README.md package.json .github/workflows/release-tabflow-site.yml`
> If any in-scope file changed, compare the current state below against live code
> before proceeding.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: documentation
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

This repository intentionally has no automated tests, and the owner explicitly
rejected adding any. That makes a short manual pre-publish checklist important so
release safety does not depend on memory.

## Current state

- `package.json:10` defines `check` as `npm run build`.
- `.github/workflows/release-tabflow-site.yml:116` runs `npm run check`.
- `README.md:16` through `README.md:20` documents only the build command.
- `README.md:28` through `README.md:38` describes release publishing but not
  manual visual/download verification.

## Commands You Will Need

| Purpose            | Command                        | Expected on success  |
| ------------------ | ------------------------------ | -------------------- |
| Build site         | `npm run check`                | exit 0               |
| Preview site       | `npm run preview`              | local preview starts |
| Audit dependencies | `npm audit --audit-level=high` | exit 0               |

## Scope

**In scope**:

- `README.md`

**Out of scope**:

- Adding tests.
- Adding CI jobs.
- Changing build scripts.
- Adding screenshot automation.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Add a manual verification section

Add a README section such as "Manual pre-publish verification" with a concise
checklist:

- Run `npm run check`.
- Run `npm audit --audit-level=high`.
- Run `npm run preview`.
- Confirm favicon, brand icon, browser icons, screenshots, and theme switching.
- Confirm the download CTA resolves to the newest `app-*` release or a safe
  fallback.
- Confirm the release workflow will publish from `main`.

Make clear that this is manual verification, not an automated test suite.

**Verify**: `npm run check` -> exit 0.

### Step 2: Cross-link the release section

In the Release and publish section, mention that maintainers should complete the
manual checklist before forcing a manual publish.

**Verify**: README reads coherently without duplicating instructions.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Read the README from top to bottom and confirm a new contributor can publish
  safely without hidden knowledge.

## Done Criteria

- [ ] README includes a manual pre-publish checklist.
- [ ] The checklist does not ask for automated tests.
- [ ] `npm run check` exits 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- The maintainer wants release verification to live outside the README.
- The manual checklist conflicts with another repository's release process.

## Maintenance Notes

Keep the checklist short enough that maintainers actually run it before manual
publishes.
