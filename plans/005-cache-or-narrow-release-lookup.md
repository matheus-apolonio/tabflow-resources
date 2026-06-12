# Plan 005: Cache or narrow release lookup

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving on. Do not add unit tests,
> integration tests, smoke tests, or any new test framework; the project owner
> explicitly rejected test creation. If a STOP condition occurs, stop and report
> instead of improvising.
>
> **Drift check (run first)**:
> `git diff --stat 07e9aa3..HEAD -- src/main.js README.md`
> If any in-scope file changed, compare the current state below against live code
> before proceeding.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: Plan 002 is recommended
- **Category**: performance
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

Every page load fetches up to 100 GitHub releases with `cache: "no-store"`.
That makes the primary download CTA depend on a network round trip and can hit
GitHub unauthenticated rate limits for repeat visitors. The page only needs the
newest published `app-*` release, so the lookup should be cached briefly or
narrowed to a smaller source of truth.

## Current state

- `src/main.js:3` defines the releases API with `per_page=100`.
- `src/main.js:153` fetches GitHub releases.
- `src/main.js:154` sets `cache: "no-store"`.
- `src/main.js:162` filters published `app-*` releases.
- `src/main.js:171` finds the platform-specific asset.

## Commands You Will Need

| Purpose            | Command                        | Expected on success |
| ------------------ | ------------------------------ | ------------------- |
| Build site         | `npm run check`                | exit 0              |
| Audit dependencies | `npm audit --audit-level=high` | exit 0              |

## Scope

**In scope**:

- `src/main.js`
- `README.md`

**Out of scope**:

- Adding tests.
- Changing app release tag naming.
- Creating a new backend service.
- Changing the desktop updater release channel.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Decide between API cache and release manifest

Use the smallest robust option:

- Option A: Cache the GitHub releases response in session or local storage for a
  short TTL, such as 15 minutes.
- Option B: Publish a small static `latest-app-release.json` during the release
  workflow and fetch that first.

If Plan 002 has been implemented, reuse its safe storage helpers for Option A.
If not, implement safe storage inside this change.

**Verify**: `npm run check` -> exit 0.

### Step 2: Reduce the payload

If staying with the GitHub API, lower `per_page=100` to the smallest number that
still safely finds the newest `app-*` release given current tag volume. A value
like `per_page=20` is likely enough unless the repo frequently publishes many
non-app releases between app releases.

**Verify**: manually inspect recent releases and confirm the newest app release
is included.

### Step 3: Keep graceful fallback behavior

Preserve the current fallback to the repository releases page when the API,
cache, manifest, or asset matching fails. The CTA should never become a dead
link.

**Verify**: temporarily block the API request in browser devtools and confirm
the fallback links still work.

### Step 4: Document freshness expectations

Update README's Downloads section to describe the cache or manifest freshness
window so maintainers know how quickly a new app release appears on the site.

**Verify**: `npm run check` -> exit 0.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Load the site with an empty cache and confirm the newest app release hydrates.
- Reload immediately and confirm the cached or narrowed path is used.
- Block the network/API and confirm the fallback release link is still usable.

## Done Criteria

- [ ] Repeat page loads no longer fetch 100 uncached releases every time.
- [ ] The latest app release is still selected correctly.
- [ ] Fallback links remain usable during API failure.
- [ ] `npm run check` exits 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- Current release history makes a small `per_page` value unsafe.
- The chosen cache strategy risks serving stale installer links for too long.
- A manifest approach would conflict with the desktop updater's existing
  `latest.json` expectations.

## Maintenance Notes

Prefer a boring, observable freshness window over clever release discovery. The
CTA is more important than real-time precision.
