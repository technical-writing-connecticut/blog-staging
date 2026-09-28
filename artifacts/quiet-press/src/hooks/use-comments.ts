import { useEffect, useState } from 'react';
import { fetchApprovedComments, fetchModerationIssues, githubRepo, type CommentIssue } from '@/lib/github';

export function useApprovedComments(slug: string) {
  const [comments, setComments] = useState<CommentIssue[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(githubRepo));
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    if (!githubRepo) {
      setIsLoading(false);
      return () => controller.abort();
    }
    setIsLoading(true);
    setError('');
    fetchApprovedComments(slug, controller.signal)
      .then(setComments)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return;
        setError(reason instanceof Error ? reason.message : 'Comments could not be loaded.');
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [slug]);

  return { comments, isLoading, error, configured: Boolean(githubRepo) };
}

export function useModerationIssues() {
  const [comments, setComments] = useState<CommentIssue[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(githubRepo));
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    if (!githubRepo) {
      setIsLoading(false);
      return () => controller.abort();
    }
    setIsLoading(true);
    setError('');
    fetchModerationIssues(controller.signal)
      .then(setComments)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return;
        setError(reason instanceof Error ? reason.message : 'The moderation queue could not be loaded.');
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

  return { comments, isLoading, error, configured: Boolean(githubRepo) };
}
