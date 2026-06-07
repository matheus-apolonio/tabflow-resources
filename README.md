# TabFlow Resources

Public website and release resource host for TabFlow.

The site is published to GitHub Pages at:

https://matheus-apolonio.github.io/tabflow-resources/

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run check
```

## Downloads

The download button does not depend on a site redeploy after a new app release. On each page load,
`src/main.js` queries GitHub releases, filters published `app-*` releases, chooses the newest app
version, and then selects the matching installer for the visitor's platform.

## Release and publish

`.github/workflows/release-tabflow-site.yml` runs daily and can also be started manually.

It compares the current commit with the latest `site-*` tag. If the site has already been
published from the same commit, it skips. Otherwise it builds the static site, publishes it to
GitHub Pages, and creates a new `site-YYYY.MMDD.N` tag pointing at the published source commit.

The website intentionally does not create a GitHub Release. The desktop updater uses
`https://github.com/matheus-apolonio/tabflow-resources/releases/latest/download/latest.json`, so
website deploys must not become the repository's latest release.
