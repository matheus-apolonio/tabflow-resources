# Release and Pages governance

## GitHub Pages

The public landing page is a static Vite build and lives in this repository.
It is deployed by `.github/workflows/pages.yml` whenever `main` receives a push.
The workflow runs `npm ci`, `npm run build`, and publishes `dist`.

This keeps the site independent from the Companion App and Browser Extension
repositories. No runtime data, app code, environment variables, or internal
logic is loaded from those projects.

## Repository access

Only users with write access to `matheus-apolonio/tabflow-resources` can change
the public site. For stronger governance, enable a branch rule on `main` that:

- requires pull requests before merging;
- restricts who can push to `main`;
- requires the GitHub Pages workflow to pass before merge.

## Release source code archives

GitHub automatically adds `Source code (zip)` and `Source code (tar.gz)` links to
every GitHub Release. Those generated links cannot be disabled per release.

The practical fix is to keep release tags pointing at a tiny placeholder commit
in this public resources repository instead of tagging either app repository.
The current release workflows already create releases in `tabflow-resources`;
the next hardening step is to ensure the placeholder commit contains only public
release metadata and never app source code or build internals.

If a release needs only binary assets, consumers should use the uploaded `.dmg`,
`.exe`, `.deb`, `.rpm`, or extension `.zip` files and ignore GitHub's generated
source archives.
