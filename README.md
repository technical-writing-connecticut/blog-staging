# Quiet Press CMS

Quiet Press is a small, text-first blog that can run as a static GitHub Pages site.
Posts live in the frontend's local content data, and comments use public GitHub
Issues as a lightweight moderation queue.

## Run locally

```bash
pnpm install
BASE_PATH=/ PORT=4173 pnpm --filter @workspace/quiet-press run dev
```

The app is then available at `http://localhost:4173`.

## Publish on GitHub Pages

The included GitHub Actions workflow builds and publishes the static site when
the `main` branch changes. In the repository settings, set Pages to use
**GitHub Actions**.

The workflow automatically sets the repository name as the Vite base path.
If you use a custom domain, update the `BASE_PATH` value in
`.github/workflows/deploy-pages.yml` to `/`.

## GitHub-native comments

Set these Vite variables in the Pages workflow (or in a local `.env` file):

```bash
VITE_GITHUB_REPO=owner/repository
VITE_GITHUB_APPROVED_LABEL=approved
```

On an article, “Leave a comment” opens a pre-filled GitHub Issue. To approve a
comment, review the issue in GitHub and add the configured `approved` label.
Only approved, open issues are shown on the public article. Close or remove the
label to hide a comment. This uses GitHub's own moderation and identity system;
no access token is shipped to the browser.

## Editing posts

The editorial screen includes an “Edit in GitHub” link for the local post
manifest at `artifacts/quiet-press/src/data/posts.ts`. Update the post content
there, commit the change, and GitHub Actions rebuilds the site.
