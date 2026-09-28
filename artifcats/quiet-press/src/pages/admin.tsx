import { ArrowUpRight, Check, CircleHelp, FileText, GitPullRequest, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { DateLabel, SiteShell } from '@/components/site-shell';
import { posts } from '@/data/posts';
import { approvedLabel, editUrl, githubRepo } from '@/lib/github';
import { useModerationIssues } from '@/hooks/use-comments';

export default function AdminPage() {
  const { comments, configured, isLoading, error } = useModerationIssues();
  const published = posts.filter((post) => post.status === 'published');
  return (
    <SiteShell>
      <main className="mx-auto max-w-[1320px] px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:px-12">
        <header className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="reveal">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em] text-primary">Editorial desk / private view</p>
            <h1 className="max-w-3xl font-editorial text-[4.5rem] leading-[.88] tracking-[-.05em] sm:text-[7.2rem]">The quiet<br /><i>back room.</i></h1>
          </div>
          <p className="reveal reveal-delay-2 max-w-sm text-[15px] leading-7 text-muted-foreground">A static editorial surface for a repository-shaped publication. Drafts stay in the files; decisions stay close to the work.</p>
        </header>

        <section className="grid gap-10 py-14 lg:grid-cols-[1fr_390px]">
          <div>
            <div className="mb-7 flex items-end justify-between border-b border-border pb-4">
              <div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-primary">The shelf</p><h2 className="font-editorial text-4xl tracking-[-.03em]">Published notes</h2></div>
              <span className="font-code text-xs text-muted-foreground">{published.length.toString().padStart(2, '0')} files</span>
            </div>
            <div className="divide-y divide-border border-b border-border">
              {published.map((post, index) => (
                <article key={post.slug} className="group grid gap-4 py-6 sm:grid-cols-[45px_1fr_auto] sm:items-center" data-testid={`row-editorial-${post.slug}`}>
                  <span className="font-code text-xs text-primary">0{index + 1}</span>
                  <div><Link href={`/post/${post.slug}`} className="font-editorial text-2xl tracking-[-.02em] transition-colors hover:text-primary" data-testid={`link-preview-${post.slug}`}>{post.title}</Link><p className="mt-1 text-xs text-muted-foreground"><DateLabel date={post.updatedAt} /> · {post.readTime} min · {post.tags.join(', ')}</p></div>
                  {editUrl(post.slug) ? <a href={editUrl(post.slug)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.15em] text-muted-foreground transition-colors hover:text-primary" data-testid={`link-edit-${post.slug}`}>Edit on GitHub <ArrowUpRight size={13} /></a> : <Link href={`/admin/editor/${post.slug}`} className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.15em] text-muted-foreground transition-colors hover:text-primary" data-testid={`link-editor-${post.slug}`}>Open editor <ArrowUpRight size={13} /></Link>}
                </article>
              ))}
            </div>
          </div>

          <aside className="border border-border bg-secondary/45 p-7">
            <p className="mb-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-primary"><CircleHelp size={14} /> The GitHub workflow</p>
            <ol className="space-y-6">
              <li className="flex gap-4"><span className="font-code text-xs text-primary">01</span><p className="text-sm leading-6 text-muted-foreground">Edit the local post manifest in the repository, or open one of the file links below.</p></li>
              <li className="flex gap-4"><span className="font-code text-xs text-primary">02</span><p className="text-sm leading-6 text-muted-foreground">Commit the change to publish it through GitHub Pages. This screen reads from the local editorial manifest.</p></li>
              <li className="flex gap-4"><span className="font-code text-xs text-primary">03</span><p className="text-sm leading-6 text-muted-foreground">Review comment issues. Add the <code className="inline-code">{approvedLabel}</code> label to approve a note for the article.</p></li>
            </ol>
            <div className="mt-8 border-t border-border pt-6 text-xs leading-5 text-muted-foreground">
              {configured ? <p className="flex gap-2 text-foreground"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-primary" /> Connected to <strong className="font-code font-medium">{githubRepo}</strong></p> : <p data-testid="status-github-unconfigured">No repository configured. Add <code className="inline-code">VITE_GITHUB_REPO</code> to enable edit links and moderation.</p>}
            </div>
          </aside>
        </section>

        <section className="border-t border-border pt-14">
          <div className="mb-7 flex items-end justify-between"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Comment moderation</p><h2 className="font-editorial text-4xl tracking-[-.03em]">The open queue</h2></div><GitPullRequest size={21} strokeWidth={1.4} className="text-primary" /></div>
            {!configured ? <div className="border border-dashed border-border px-6 py-10 text-sm leading-6 text-muted-foreground" data-testid="status-moderation-config">Connect a public repository to use GitHub Issues as the moderation queue. No token is needed: submitted comment issues are read from the public API.</div> : error ? <div className="border border-destructive/40 px-6 py-10 text-sm text-destructive" data-testid="status-moderation-error">{error}</div> : isLoading ? <div className="grid gap-3 md:grid-cols-3" data-testid="status-moderation-loading">{[1, 2, 3].map((item) => <div key={item} className="h-28 animate-pulse bg-muted" />)}</div> : comments.length === 0 ? <div className="border border-dashed border-border px-6 py-10 text-sm leading-6 text-muted-foreground" data-testid="status-moderation-empty">The queue is clear. New GitHub Issues that start with the Quiet Press comment marker will appear here.</div> : <div className="grid gap-4 md:grid-cols-3">{comments.map((comment) => <a key={comment.number} href={comment.html_url} target="_blank" rel="noreferrer" className="group border border-border bg-card p-5 transition-transform hover:-translate-y-1" data-testid={`link-issue-${comment.number}`}><div className="flex items-center justify-between text-[10px] uppercase tracking-[.14em] text-muted-foreground"><span className="font-code">#{comment.number}</span><Check size={14} className="text-primary" /></div><p className="mt-5 font-editorial text-xl leading-tight tracking-[-.015em] transition-colors group-hover:text-primary">{comment.title}</p><p className="mt-4 text-[11px] text-muted-foreground">{comment.user.login} · {comment.comments} replies · {comment.labels.map((label) => label.name).join(', ') || 'needs review'}</p></a>)}</div>}
        </section>
        <div className="mt-14 flex items-center gap-2 text-[10px] uppercase tracking-[.16em] text-muted-foreground"><FileText size={14} className="text-primary" /> {posts.length} local content files in this edition</div>
      </main>
    </SiteShell>
  );
}
