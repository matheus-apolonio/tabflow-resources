# TabFlow Resources

Public website and release resource host for TabFlow.

The site is published to GitHub Pages at:

https://matheus-apolonio.github.io/tabflow-resources/

## Development

Use Node.js `>=24.0.0` with npm. The release workflow currently
uses Node 24. Static asset paths in `index.html` should be relative or
Vite-resolved because the site is served from the `/tabflow-resources/` GitHub
Pages base.

```bash
npm install
npm start
```

## Quality

```bash
npm run format
npm run check
npm audit --audit-level=high
```

## Downloads

The download button does not depend on a site redeploy after a new app release. On each page load,
`src/main.js` queries a small GitHub releases page, filters published `app-*` releases, chooses the
newest app version, and then selects the matching installer for the visitor's platform. Successful
release lookups are cached in browser storage for 15 minutes; if the cache or GitHub API is
unavailable, the site falls back to the repository releases page.

Direct installer links depend on release asset names:

| Platform | Accepted assets                                     |
| -------- | --------------------------------------------------- |
| macOS    | `TabFlow-App-*.dmg`                                 |
| Windows  | `TabFlow-App-*Setup.exe`, `TabFlow-App-*.msi`       |
| Linux    | `tabflow-app_*_amd64.deb`, `TabFlow-App-*.AppImage` |

If no asset matches the visitor's platform, the website intentionally links to the latest app
release page instead.

## Manual pre-publish verification

Before forcing a manual publish, complete these manual checks:

- Run `npm run check`.
- Run `npm audit --audit-level=high`.
- Run `npm run preview` and confirm the favicon, brand icon, browser icons, screenshots, and theme
  switching render correctly.
- Confirm the download CTA resolves to the newest `app-*` release or the safe releases-page
  fallback.
- Confirm the release workflow will publish from `main`.

The project owner explicitly does not require automated tests for this repository.

## Release and publish

`.github/workflows/release-tabflow-site.yml` runs daily and can also be started manually from
`main`.

It compares the current commit with the latest `site-*` tag. If the site has already been
published from the same commit, it skips. Otherwise it builds the static site, publishes it to
GitHub Pages, and creates a new `site-YYYY.MMDD.N` tag pointing at the published source commit.
Manual `force` runs are publish-capable only on `main`; feature-branch dispatches must not deploy
Pages or create `site-*` tags.

The website intentionally does not create a GitHub Release. The desktop updater uses
`https://github.com/matheus-apolonio/tabflow-resources/releases/latest/download/latest.json`, so
website deploys must not become the repository's latest release.
