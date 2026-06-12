# Plan 009: Pin Node runtime contract

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving on. Do not add unit tests,
> integration tests, smoke tests, or any new test framework; the project owner
> explicitly rejected test creation. If a STOP condition occurs, stop and report
> instead of improvising.
>
> **Drift check (run first)**:
> `git diff --stat 07e9aa3..HEAD -- package.json .nvmrc README.md .github/workflows/release-tabflow-site.yml`
> If any in-scope file changed, compare the current state below against live code
> before proceeding.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: developer experience
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

The workflow uses Node 22, while the package does not declare an engine or local
runtime file. Vite 8 requires `^20.19.0 || >=22.12.0`, so contributors can
install dependencies with an older Node version and hit confusing failures.

## Current state

- `package.json:1` through `package.json:15` has no `engines` field.
- `.github/workflows/release-tabflow-site.yml:109` uses `node-version: 22`.
- `package-lock.json:810` records Vite's Node requirement.
- `README.md:11` through `README.md:13` says only `npm install` and
  `npm run dev`.

## Commands You Will Need

| Purpose              | Command                        | Expected on success |
| -------------------- | ------------------------------ | ------------------- |
| Install dependencies | `npm ci --no-audit`            | exit 0              |
| Build site           | `npm run check`                | exit 0              |
| Audit dependencies   | `npm audit --audit-level=high` | exit 0              |

## Scope

**In scope**:

- `package.json`
- `.nvmrc`
- `README.md`
- `.github/workflows/release-tabflow-site.yml` only if aligning on a precise
  version

**Out of scope**:

- Adding tests.
- Changing package manager.
- Upgrading Vite.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Declare the Node engine

Add a package engine that matches Vite and the workflow. Prefer the broad
compatible range:

```json
"engines": {
  "node": "^20.19.0 || >=22.12.0",
  "npm": ">=10"
}
```

If the project wants to standardize on Node 22 only, document that choice in the
README and `.nvmrc`.

**Verify**: `npm ci --no-audit` -> exit 0.

### Step 2: Add local runtime hint

Add `.nvmrc` with a supported runtime, such as `22`, or a precise LTS version if
the maintainer prefers reproducibility.

**Verify**: README and workflow agree with `.nvmrc`.

### Step 3: Update setup docs

Update README Development section to mention the required Node/npm baseline and
the supported package manager.

**Verify**: `npm run check` -> exit 0.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Confirm `node --version` satisfies the documented range.
- Run `npm ci --no-audit`.
- Run `npm run check`.

## Done Criteria

- [ ] Node version expectations are declared in `package.json`.
- [ ] Local setup docs match CI.
- [ ] `npm ci --no-audit` and `npm run check` exit 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- The repository must support Node versions older than Vite 8 allows.
- The team uses a runtime manager other than nvm and wants a different hint file.

## Maintenance Notes

When Vite or Node is upgraded, update `package.json`, `.nvmrc`, workflow, and
README together.
