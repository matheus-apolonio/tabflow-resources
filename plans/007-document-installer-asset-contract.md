# Plan 007: Document installer asset contract

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving on. Do not add unit tests,
> integration tests, smoke tests, or any new test framework; the project owner
> explicitly rejected test creation. If a STOP condition occurs, stop and report
> instead of improvising.
>
> **Drift check (run first)**:
> `git diff --stat 07e9aa3..HEAD -- README.md src/main.js`
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

The download selector depends on exact installer asset names, but the README only
says that the site selects the matching installer. If the app release workflow
changes asset names, the website silently falls back to the release page instead
of direct downloads.

## Current state

- `src/main.js:6` defines platform asset matchers.
- `src/main.js:10` expects macOS `TabFlow-App-*.dmg`.
- `src/main.js:15` expects Windows `TabFlow-App-*Setup.exe` or
  `TabFlow-App-*.msi`.
- `src/main.js:20` expects Linux `tabflow-app_*_amd64.deb` or
  `TabFlow-App-*.AppImage`.
- `README.md:24` through `README.md:26` describe direct installer selection but
  do not list the contract.

## Commands You Will Need

| Purpose    | Command         | Expected on success |
| ---------- | --------------- | ------------------- |
| Build site | `npm run check` | exit 0              |

## Scope

**In scope**:

- `README.md`
- `src/main.js` only if naming comments in code are useful

**Out of scope**:

- Adding tests.
- Changing installer names.
- Changing the app release workflow.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Add a README asset-name table

Under Downloads, document the direct-download asset naming contract:

| Platform | Accepted assets                                     |
| -------- | --------------------------------------------------- |
| macOS    | `TabFlow-App-*.dmg`                                 |
| Windows  | `TabFlow-App-*Setup.exe`, `TabFlow-App-*.msi`       |
| Linux    | `tabflow-app_*_amd64.deb`, `TabFlow-App-*.AppImage` |

Mention that if no matching asset exists, the website intentionally links to the
latest app release page.

**Verify**: `npm run check` -> exit 0.

### Step 2: Cross-check against app release outputs

Compare the documented names with the companion app release workflow before
publishing. If the workflow produces additional supported assets, update the
site selector and README together.

**Verify**: record any mismatch in the implementation summary.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Inspect the latest app release assets.
- Confirm each documented pattern matches at least one current artifact or is an
  intended future artifact.

## Done Criteria

- [ ] README documents direct installer asset names.
- [ ] README documents fallback behavior when no matching asset exists.
- [ ] `npm run check` exits 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- Companion app release assets no longer match the website's current patterns.
- The supported installer matrix is still undecided.

## Maintenance Notes

When release artifact names change, update `src/main.js` and README in the same
patch.
