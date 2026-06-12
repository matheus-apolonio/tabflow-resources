# Plan 004: Guard manual site publish to main

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving on. Do not add unit tests,
> integration tests, smoke tests, or any new test framework; the project owner
> explicitly rejected test creation. If a STOP condition occurs, stop and report
> instead of improvising.
>
> **Drift check (run first)**:
> `git diff --stat 07e9aa3..HEAD -- .github/workflows/release-tabflow-site.yml README.md`
> If any in-scope file changed, compare the current state below against live code
> before proceeding.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: MED
- **Depends on**: none
- **Category**: release safety
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

The workflow supports manual dispatch with a `force` flag, but there is no branch
guard. A manual run from a feature branch can publish GitHub Pages and create a
`site-*` tag pointing at that branch's `GITHUB_SHA`, bypassing the normal main
branch release path.

## Current state

- `.github/workflows/release-tabflow-site.yml:6` enables `workflow_dispatch`.
- `.github/workflows/release-tabflow-site.yml:67` reads the `force` input.
- `.github/workflows/release-tabflow-site.yml:154` publishes when
  `should_publish == 'true'`.
- `.github/workflows/release-tabflow-site.yml:178` tags `$GITHUB_SHA`.

## Commands You Will Need

| Purpose          | Command                                                  | Expected on success  |
| ---------------- | -------------------------------------------------------- | -------------------- |
| Build site       | `npm run check`                                          | exit 0               |
| Inspect workflow | `git diff -- .github/workflows/release-tabflow-site.yml` | publish is main-only |

## Scope

**In scope**:

- `.github/workflows/release-tabflow-site.yml`
- `README.md`

**Out of scope**:

- Adding tests.
- Changing scheduled release behavior on `main`.
- Removing manual dispatch entirely unless the maintainer prefers that.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Add a main-branch publish guard

Add an explicit main-branch condition to the workflow. Prefer a job-level guard
that blocks both build and publish for non-main refs, for example:

```yaml
if: github.ref == 'refs/heads/main' && needs.check-changes.outputs.should_publish == 'true'
```

Apply the guard consistently to jobs that upload Pages artifacts or deploy.

**Verify**: `git diff -- .github/workflows/release-tabflow-site.yml`.

### Step 2: Make non-main manual runs visible and harmless

Keep the `check-changes` job able to run on any ref if useful, but make its
summary explain that publication is main-only when `github.ref` is not
`refs/heads/main`.

**Verify**: workflow diff shows non-main dispatch cannot reach deploy or tag.

### Step 3: Document manual dispatch behavior

Update README's Release and publish section to state that manual `force` runs
are intended for `main` only and should not publish from feature branches.

**Verify**: `npm run check` -> exit 0.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Review the workflow conditions for scheduled and manual events.
- Trigger a manual run from a non-main branch only if safe in the repository and
  confirm it skips publish/tag.
- Trigger or observe the next main run and confirm deployment still works.

## Done Criteria

- [ ] Manual non-main dispatch cannot publish Pages.
- [ ] Manual non-main dispatch cannot create a `site-*` tag.
- [ ] README documents the main-only publish behavior.
- [ ] `npm run check` exits 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- The repository intentionally publishes preview Pages deployments from branches.
- Branch naming or default branch policy differs from `main`.

## Maintenance Notes

If preview deployments are needed later, implement them as a separate workflow
with different tags and environment names.
