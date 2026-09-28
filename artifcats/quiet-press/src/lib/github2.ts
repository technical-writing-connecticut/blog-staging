export type CommentIssue = {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  user: { login: string; avatar_url?: string };
  created_at: string;
  comments: number;
  labels: Array<{ name: string; color: string }>;
};

export const githubRepo = (import.meta.env.VITE_GITHUB_REPO as string | undefined)?.trim() ?? '';
export const approvedLabel = (import.meta.env.VITE_GITHUB_APPROVED_LABEL as string | undefined)?.trim() || 'approved';

export function editUrl(_slug: string) {
  if (!githubRepo) return '';
  return `https://github.com/${githubRepo}/edit/main/artifacts/quiet-press/src/data/posts.ts`;
}

export function commentsUrl(slug: string) {
  if (!githubRepo) return '';
  const title = encodeURIComponent(`Comment on “${slug.replaceAll('-', ' ')}”`);
  const body = encodeURIComponent(`<!-- Quiet Press comment for: ${slug} -->\n\n`);
  return `https://github.com/${githubRepo}/issues/new?title=${title}&body=${body}&labels=comment`;
}

export async function fetchApprovedComments(slug: string, signal?: AbortSignal): Promise<CommentIssue[]> {
  if (!githubRepo) return [];
  const query = encodeURIComponent(`repo:${githubRepo} is:issue is:open label:${approvedLabel} in:body "Quiet Press comment for: ${slug}"`);
  const response = await fetch(`https://api.github.com/search/issues?q=${query}&sort=created&order=desc`, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  });
  if (!response.ok) throw new Error('GitHub comments could not be loaded.');
  const payload = (await response.json()) as { items?: CommentIssue[] };
  return payload.items ?? [];
}

export async function fetchModerationIssues(signal?: AbortSignal): Promise<CommentIssue[]> {
  if (!githubRepo) return [];
  const query = encodeURIComponent(`repo:${githubRepo} is:issue is:open in:body "Quiet Press comment for:"`);
  const response = await fetch(`https://api.github.com/search/issues?q=${query}&sort=created&order=desc`, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  });
  if (!response.ok) throw new Error('The GitHub moderation queue could not be loaded.');
  const payload = (await response.json()) as { items?: CommentIssue[] };
  return payload.items ?? [];
}
