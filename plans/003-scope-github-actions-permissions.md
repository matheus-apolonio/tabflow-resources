# Plan 003: Scope GitHub Actions permissions by job

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
- **Category**: security
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

The release workflow grants `contents: write`, `pages: write`, and
`id-token: write` at workflow level. The build job runs third-party package
installation and a Vite build under those inherited write permissions even
though it only needs to read the repository and upload a Pages artifact. Scoping
permissions by job reduces blast radius if a dependency install, build step, or
future script is compromised.

## Current state

- `.github/workflows/release-tabflow-site.yml:14` declares workflow-level
  permissions.
- `.github/workflows/release-tabflow-site.yml:112` runs `npm ci --no-audit`.
- `.github/workflows/release-tabflow-site.yml:116` runs `npm run check`.
- `.github/workflows/release-tabflow-site.yml:160` deploys Pages.
- `.github/workflows/release-tabflow-site.yml:178` creates and pushes a tag.

## Commands You Will Need

| Purpose          | Command                                                  | Expected on success        |
| ---------------- | -------------------------------------------------------- | -------------------------- |
| Build site       | `npm run check`                                          | exit 0                     |
| Inspect workflow | `git diff -- .github/workflows/release-tabflow-site.yml` | permissions are job-scoped |

## Scope

**In scope**:

- `.github/workflows/release-tabflow-site.yml`
- `README.md` only if documenting the workflow security model helps maintainers

**Out of scope**:

- Adding tests.
- Changing the release cadence.
- Replacing GitHub Pages deployment.
- Changing action versions unless required by permissions behavior.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Remove broad workflow-level write permissions

Set the top-level permission block to the minimum default, such as:

```yaml
permissions:
  contents: read
```

Then grant each job only what it needs.

**Verify**: `git diff -- .github/workflows/release-tabflow-site.yml` and confirm
the top-level block is read-only.

### Step 2: Add job-level permissions

Use job-level permissions:

- `check-changes`: `contents: read`.
- `build`: `contents: read` and whatever artifact permission GitHub Pages upload
  requires.
- `publish`: `contents: write`, `pages: write`, and `id-token: write`.

If `actions/upload-pages-artifact` does not require a special permission beyond
read, keep build read-only.

**Verify**: workflow YAML remains valid and `npm run check` -> exit 0.

### Step 3: Confirm tag permissions stay with publish only

Keep tag creation in the `publish` job, where `contents: write` is justified.
Avoid giving the build job write permission just to simplify the workflow.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Review the workflow diff line by line.
- Trigger or observe the next scheduled workflow run.
- Confirm check, build, deploy, and tag steps complete with the narrowed
  permissions.

## Done Criteria

- [ ] Third-party install/build steps no longer inherit write permissions.
- [ ] Pages deploy and tag creation still have the permissions they require.
- [ ] `npm run check` exits 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- GitHub Pages upload or deploy requires a permission not documented in the
  current workflow.
- The repository has organization-level permission policy constraints that
  conflict with the planned split.

## Maintenance Notes

Keep future workflow steps under the least-privilege job that can perform them.
Avoid reintroducing broad top-level write permissions for convenience.
