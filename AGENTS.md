# AGENTS.md

See `agents.md` for project-level agent instructions (architecture rules, Node.js version, Husky hooks, mandatory checklist).

## Cursor Cloud specific instructions

### Overview

This is a **Playwright test automation framework** (TypeScript, ESM) — there is no application to build or run. All tests execute against external public sites/APIs:

| Project | Target | Command |
|---|---|---|
| `chrome` | `https://www.mvideo.ru/` (UI) | `npx playwright test --project=chrome` |
| `api` | `https://postman-echo.com` | `npx playwright test --project=api` |
| `fakestore` | `https://fakestoreapi.com` | `npx playwright test --project=fakestore` |

### Key commands

- **Lint:** `npm run lint`
- **Typecheck:** `npm run typecheck`
- **All tests (recommended):** `npx playwright test --project=chrome --project=api --project=fakestore`
- **UI only:** `npm run test:ui` (or `npx playwright test --project=chrome`)
- **API only:** `npm run test:api`

### Gotchas

- **Always use `--project=chrome`** for UI tests — never run the default `npm test` without specifying projects, as the `safari` (WebKit) project is also defined and WebKit is not installed in Cloud VMs.
- The `promo.spec.ts` test is fragile because it hardcodes a specific promotional banner name on the live mvideo.ru site. It may fail when the banner rotates — this is a known pre-existing issue, not an environment problem.
- Pre-existing lint errors (4) and typecheck errors (2) exist in the codebase in `AllPromotions.page.ts`, `MvideoHome.page.ts`, `scripts/run-chrome-spec.mjs`, and `tests/api/fakestore/post.products.spec.ts`. These are not caused by environment setup.
- The Husky pre-commit hook runs `lint-staged` + `typecheck` + optionally Playwright tests. Use `HUSKY_SKIP_PLAYWRIGHT=1 git commit ...` when committing non-test changes to avoid running the full suite on commit.
- No `.env` file is needed — `dotenv` is loaded but the config works without it.
