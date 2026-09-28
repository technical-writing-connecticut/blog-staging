# Quiet Press

Quiet Press is a light, text-first blog with a small GitHub-native editorial workflow and moderated reader notes.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `PORT=4173 BASE_PATH=/ pnpm --filter @workspace/quiet-press run dev` — run the static blog locally
- `PORT=4173 BASE_PATH=/ pnpm --filter @workspace/quiet-press run build` — build the GitHub Pages site
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/quiet-press/src/data/posts.ts` — static post manifest and article content
- `artifacts/quiet-press/src/lib/github.ts` — GitHub Pages comment and edit-link helpers
- `artifacts/quiet-press/src/pages/` — reader, editorial, and editor-preview routes
- `.github/workflows/deploy-pages.yml` — static GitHub Pages build and deployment
- `README.md` — local setup, GitHub Pages setup, and comment moderation instructions

## Architecture decisions

- The public site is static-first so it can run on GitHub Pages without a server or browser-side credentials.
- Posts are local typed content data; GitHub is the source of truth for edits to the manifest through the editorial links and commits.
- Comments use GitHub Issues as a moderation queue. Approved open issues are read through the public API and rendered as article notes.
- The local API contract remains available for future server-backed CMS work, but the GitHub Pages path does not depend on it.

## Product

- Browse a calm index of published essays.
- Read long-form posts with styled inline formatting, quotes, lists, and syntax-highlighted code blocks.
- Open a prefilled GitHub Issue to leave a note on an article.
- Review comment Issues in the editorial view and approve them by adding the configured GitHub label.
- Open source edit links from the editorial surface.

## User preferences

- Text is the focus: light theme, minimal interface, and especially polished typography and code blocks.
- The project should be runnable from GitHub Pages with simple GitHub-native comment moderation.

## Gotchas

- `VITE_GITHUB_REPO` must be set as `owner/repository` for edit links and comments to activate.
- `VITE_GITHUB_APPROVED_LABEL` defaults to `approved`; only open Issues carrying that label are public comments.
- GitHub Pages builds must set `BASE_PATH` to the repository path unless using a custom domain.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
