# Plan 006: Reduce screenshot payload

> **Executor instructions**: Follow this plan step by step. Run every verification
> command and confirm the expected result before moving on. Do not add unit tests,
> integration tests, smoke tests, or any new test framework; the project owner
> explicitly rejected test creation. If a STOP condition occurs, stop and report
> instead of improvising.
>
> **Drift check (run first)**:
> `git diff --stat 07e9aa3..HEAD -- index.html public src/styles.css README.md`
> If any in-scope file changed, compare the current state below against live code
> before proceeding.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: performance
- **Planned at**: commit `07e9aa3`, 2026-06-12

## Why this matters

The page loads large light/dark screenshot PNGs for the hero and screenshot band.
The theme switch code changes image sources at runtime, which can cause extra
downloads. Reducing and deferring screenshot payload improves the first visit,
especially on mobile, without changing product behavior.

## Current state

- `index.html:95` renders the hero screenshot.
- `index.html:97` and `index.html:98` declare light/dark hero sources.
- `index.html:141` renders the lower screenshot.
- `index.html:143` and `index.html:144` declare light/dark lower screenshot
  sources.
- `index.html:145` currently loads the lower screenshot eagerly.

## Commands You Will Need

| Purpose             | Command                                                                         | Expected on success |
| ------------------- | ------------------------------------------------------------------------------- | ------------------- |
| Build site          | `npm run check`                                                                 | exit 0              |
| Inspect asset sizes | `find public/assets/screenshots -type f -maxdepth 1 -print -exec ls -lh {} \\;` | sizes are visible   |

## Scope

**In scope**:

- `index.html`
- `public/assets/screenshots/*`
- `src/main.js` only if theme image switching needs source-set support
- `src/styles.css` only if layout dimensions need adjustment
- `README.md` only if documenting asset generation commands helps maintainers

**Out of scope**:

- Adding tests.
- Redesigning the page.
- Removing the screenshots entirely.
- Adding a build-time image pipeline unless it is already available.

## Git Workflow

- Branch: `docs/improve-deep-audit-20260612`
- Do not push or open a PR unless instructed.

## Steps

### Step 1: Measure current screenshot cost

Record the current file sizes for screenshot assets and identify which images
load on first paint in a local preview. Use browser devtools or a simple file
size listing.

**Verify**: note the baseline in the PR or implementation summary.

### Step 2: Add lighter variants

Create optimized variants for the screenshots. Prefer WebP or AVIF alongside the
existing PNG fallbacks if browser compatibility matters. Keep filenames explicit,
for example:

- `tabflow-home-light.webp`
- `tabflow-home-dark.webp`
- `tabflow-mapping-light.webp`
- `tabflow-mapping-dark.webp`

Do not remove the PNG originals unless the site and social sharing no longer
need them.

**Verify**: `npm run check` -> exit 0.

### Step 3: Defer below-the-fold screenshot loading

Add `loading="lazy"` and `decoding="async"` to the lower screenshot. Keep the
hero image eager if it remains above the fold, but consider `fetchpriority="high"`
only if measurement shows it helps.

**Verify**: local preview shows no layout jump.

### Step 4: Preserve theme switching

If using `picture` or `srcset`, update `src/main.js` so `data-theme-image`
continues to switch the correct light/dark source. Keep the implementation
small.

**Verify**: toggle the theme and confirm both screenshots update.

## Test Plan

No automated tests are to be added. Manually validate after implementation:

- Run `npm run check`.
- Preview the site on desktop and mobile widths.
- Toggle theme and confirm screenshots change without broken images.
- Compare network payload before and after.

## Done Criteria

- [ ] Screenshot payload is materially smaller or below-the-fold screenshots are
      deferred.
- [ ] Theme switching still swaps screenshot variants.
- [ ] Layout remains stable on desktop and mobile.
- [ ] `npm run check` exits 0.
- [ ] No tests were added.
- [ ] `plans/README.md` status row updated.

## STOP Conditions

- Optimized assets look visibly degraded.
- The chosen image format breaks supported browsers.
- The change requires adding a new image build dependency.

## Maintenance Notes

Store source screenshots separately if future design iterations need lossless
masters. Keep shipped assets optimized for the static site.
