# TabFlow Resources deep improvement plans

These plans were produced by the `$improve` skill in deep mode on 2026-06-12.
They are implementation handoffs, not source-code changes. The project owner
explicitly rejected adding unit tests, integration tests, smoke tests, or any new
test framework; every plan preserves that constraint and uses build checks plus
manual validation instead.

Base commit audited: `07e9aa3`

## Execution order

| Plan                                                                                                       | Priority | Effort | Category             | Status |
| ---------------------------------------------------------------------------------------------------------- | -------- | ------ | -------------------- | ------ |
| [001: Fix GitHub Pages asset paths](001-fix-github-pages-asset-paths.md)                                   | P1       | S      | correctness          | DONE   |
| [002: Guard theme storage before download hydration](002-guard-theme-storage-before-download-hydration.md) | P1       | S      | reliability          | DONE   |
| [003: Scope GitHub Actions permissions by job](003-scope-github-actions-permissions.md)                    | P1       | S      | security             | DONE   |
| [004: Guard manual site publish to main](004-guard-manual-site-publish-to-main.md)                         | P1       | S      | release safety       | DONE   |
| [005: Cache or narrow release lookup](005-cache-or-narrow-release-lookup.md)                               | P2       | M      | performance          | DONE   |
| [006: Reduce screenshot payload](006-reduce-screenshot-payload.md)                                         | P2       | M      | performance          | DONE   |
| [007: Document installer asset contract](007-document-installer-asset-contract.md)                         | P2       | S      | documentation        | DONE   |
| [008: Document manual pre-publish checklist](008-document-manual-pre-publish-checklist.md)                 | P2       | S      | documentation        | DONE   |
| [009: Pin Node runtime contract](009-pin-node-runtime-contract.md)                                         | P2       | S      | developer experience | DONE   |
| [010: Make extension installation first-class](010-make-extension-installation-first-class.md)             | P2       | M      | product direction    | DONE   |
| [011: Add start and format commands for the site](011-add-start-and-format-contract.md)                    | P2       | S      | developer experience | DONE   |

## Global executor notes

- Do not add tests of any kind.
- Run `npm run check` after source or documentation edits.
- Run `npm audit --audit-level=high` when dependency or release-safety changes
  are involved.
- Do not publish, tag, push, or open a PR unless explicitly instructed.
- Update the relevant status row here when a plan is completed.
