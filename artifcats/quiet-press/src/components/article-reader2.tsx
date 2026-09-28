import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { PostContent } from '@/components/post-content';
import { DateLabel } from '@/components/site-shell';
import type { Post } from '@/data/posts';
import { commentsUrl } from '@/lib/github';
import { useApprovedComments } from '@/hooks/use-comments';

type ArticleReaderProps = {
  post: Post;
  onBack?: () => void;
  showBackLink?: boolean;
  sectionId?: string;
};

export function ArticleReader({ post, onBack, showBackLink = Boolean(onBack), sectionId = 'reader' }: ArticleReaderProps) {
  const { comments, configured, isLoading, error } = useApprovedComments(post.slug);

  return (
    <section id={sectionId} className="scroll-mt-8">
      <header className="mx-auto max-w-[720px] border-b border-border px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        {showBackLink && onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="mb-16 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-muted-foreground transition-colors hover:text-primary"
            data-testid="button-back-index"
          >
            <ArrowLeft size={14} /> All notes
          </button>
        ) : showBackLink ? (
          <Link
            href="/"
            className="mb-16 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-muted-foreground transition-colors hover:text-primary"
            data-testid="link-back-index"
          >
            <ArrowLeft size={14} /> All notes
          </Link>
        ) : null}
        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{post.tags.join(' · ')}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime} minute read</span>
        </div>
        <h1 className="max-w-2xl font-editorial text-4xl leading-[1.08] tracking-[-.04em] sm:text-6xl">{post.title}</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{post.dek}</p>
        <p className="mt-6 text-xs text-muted-foreground">By {post.author} · <DateLabel date={post.publishedAt} /></p>
      </header>

      <div className="border-y border-border bg-card">
        <div className="mx-auto max-w-[720px] px-5 py-16 sm:px-8 sm:py-24">
          <PostContent content={post.content} markdown={post.markdown} />
          <div className="mt-20 border-t border-border pt-8">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[.16em] text-muted-foreground">
              <span>Filed under {post.tags.join(' / ')}</span>
              <span>Updated <DateLabel date={post.updatedAt} /></span>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[720px] px-5 py-16 sm:px-8" aria-labelledby="comments-heading">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-primary">The margin</p>
            <h2 id="comments-heading" className="font-editorial text-4xl tracking-[-.03em]">Leave a note</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">Comments live as GitHub Issues. Note that you must keep the `Quiet Press comment for: attention-is-a-place` text in the comment for it to enter moderation.

</p>
          </div>
          <MessageCircle size={21} strokeWidth={1.4} className="mt-1 shrink-0 text-primary" />
        </div>
        <div className="mt-8 border-y border-border py-5">
          {!configured ? (
            <p className="text-sm leading-6 text-muted-foreground">Comments are not configured for this edition. The editor can connect a public repository with <code className="inline-code">VITE_GITHUB_REPO</code>.</p>
          ) : (
            <a href={commentsUrl(post.slug)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold transition-colors hover:text-primary" data-testid="link-comment-github">
              Open a GitHub issue <ArrowUpRight size={14} />
            </a>
          )}
        </div>
        {configured && isLoading && <p className="mt-8 font-code text-xs text-muted-foreground" data-testid="status-comments-loading">loading approved notes...</p>}
        {configured && error && <p className="mt-8 text-sm text-destructive" data-testid="status-comments-error">{error}</p>}
        {configured && !isLoading && !error && comments.length === 0 && <p className="mt-8 text-sm text-muted-foreground" data-testid="status-comments-empty">No approved notes yet. This page is still open.</p>}
        {comments.length > 0 && (
          <div className="mt-8 space-y-7">
            {comments.map((comment) => (
              <article key={comment.number} className="border-l-2 border-accent pl-5" data-testid={`comment-${comment.number}`}>
                <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[.14em] text-muted-foreground">
                  <span className="font-semibold text-foreground">{comment.user.login}</span>
                  <DateLabel date={comment.created_at.slice(0, 10)} />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{comment.body || comment.title}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
