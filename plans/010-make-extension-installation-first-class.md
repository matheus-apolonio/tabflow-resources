# Plan 010: Make extension installation first-class

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving on. Do not add unit tests,
> integration tests, smoke tests, or any new test framework; the project owner
> explicitly rejected test creation. If a STOP condition occurs, stop and report
> instead of improvising.
>
> **Drift check (run first)**:
> `git diff --stat 07e9aa3..HEAD -- index.html src/styles.css README.md`
> If any in-scope file changed, compare the current state below against live code
> before proceeding.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: product direction
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

The site explains that TabFlow requires both the desktop app and browser
extension, but all primary CTAs lead to app releases. Users can understand the
flow and still be left without a direct extension install path, which is
especially painful because the extension must be installed per browser profile.

## Current state

- `index.html:63` and `index.html:81` point download CTAs to app releases.
- `index.html:150` through `index.html:195` lists supported browsers.
- `index.html:198` through `index.html:220` describes the app-first,
  extension-per-profile install path.
- The page does not expose browser-store links, extension release links, or a
  clear fallback for sideloading.

## Commands You Will Need

| Purpose      | Command           | Expected on success  |
| ------------ | ----------------- | -------------------- |
| Build site   | `npm run check`   | exit 0               |
| Preview site | `npm run preview` | local preview starts |

## Scope

**In scope**:

- `index.html`
- `src/styles.css`
- `README.md` if store URLs or extension release source need documentation

**Out of scope**:

- Adding tests.
- Publishing the extension to stores.
- Changing extension code.
- Changing the desktop app release selector.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Decide the supported install destinations

Confirm the current extension distribution channels:

- Chrome Web Store or manual Chromium package.
- Firefox Add-ons or manual package.
- Edge Add-ons or Chromium-compatible fallback.
- Repository release page if store URLs are not ready.

Do not invent store URLs. Use only known published destinations or safe fallback
links.

**Verify**: record the chosen destinations in the implementation summary.

### Step 2: Add an extension install block

Add a first-class install block near the existing Install path section. It should
make the split explicit:

- Desktop app download CTA.
- Extension install CTA for browser profiles.
- Fallback link for all extension releases or manual install instructions.

Keep the page focused and avoid turning it into a marketing landing page.

**Verify**: `npm run check` -> exit 0.

### Step 3: Add lightweight styling

Use existing visual patterns from the page. Do not introduce a new card-heavy
style. Ensure text fits on mobile and CTAs remain clear.

**Verify**: preview desktop and mobile widths manually.

### Step 4: Document maintenance

If extension store URLs are added, document where they live and when maintainers
must update them.

**Verify**: README and site agree.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Preview the site on desktop and mobile.
- Click each app and extension CTA and confirm it goes to the intended
  destination.
- Confirm the install flow still communicates "desktop app first, extension per
  profile".

## Done Criteria

- [ ] Users have a clear extension installation path from the site.
- [ ] App download behavior remains intact.
- [ ] Mobile and desktop layouts remain readable.
- [ ] `npm run check` exits 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- Extension distribution URLs are unknown and cannot be safely inferred.
- The change requires modifying the browser extension repository in the same
  patch.

## Maintenance Notes

Keep extension install destinations synchronized with the extension repository's
release and store-publishing process.
