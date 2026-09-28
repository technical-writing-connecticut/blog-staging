import { ArrowLeft, ArrowUpRight, ExternalLink, GitBranch, PencilLine } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { DateLabel, SiteShell } from '@/components/site-shell';
import { getPost } from '@/data/posts';
import { editUrl, githubRepo } from '@/lib/github';

export default function EditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);
  if (!post) return <SiteShell><main className="mx-auto max-w-2xl px-5 py-28"><p className="text-primary">404 / file not found</p><h1 className="mt-4 font-editorial text-6xl">No such note.</h1><Link href="/admin" className="mt-8 inline-flex border-b border-primary pb-1 text-sm" data-testid="link-back-editorial">Return to editorial</Link></main></SiteShell>;
  const source = post.markdown ?? `# ${post.title}\n\n${post.dek}\n\n_This preview reflects the local published manifest._`;
  return (
    <SiteShell>
      <main className="mx-auto max-w-[1050px] px-5 pb-20 pt-12 sm:px-8 sm:pt-20">
        <Link href="/admin" className="mb-14 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-muted-foreground transition-colors hover:text-primary" data-testid="link-back-editorial"><ArrowLeft size={14} /> Editorial desk</Link>
        <header className="border-b border-border pb-10">
          <div className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-primary"><PencilLine size={14} /> File preview</div>
          <h1 className="max-w-3xl font-editorial text-6xl leading-[.9] tracking-[-.045em] sm:text-8xl">{post.title}</h1>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[.14em] text-muted-foreground"><span>{post.status}</span><span className="text-border">/</span><span>Updated <DateLabel date={post.updatedAt} /></span><span className="text-border">/</span><span>{post.author}</span></div>
        </header>
        <section className="grid gap-10 py-12 lg:grid-cols-[1fr_290px]">
          <div>
            <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[.16em] text-muted-foreground"><span className="font-code">content/{post.slug}.md</span><span>read-only preview</span></div>
            <pre className="min-h-[280px] overflow-x-auto border border-[#2d3b38] bg-[#172421] p-6 font-code text-xs leading-[1.9] text-[#d7e0d4] sm:p-8">{source}</pre>
          </div>
          <aside className="h-fit border border-border bg-secondary/45 p-6">
            <GitBranch size={18} strokeWidth={1.5} className="mb-5 text-primary" />
            <h2 className="font-editorial text-2xl">Make an edit</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">The source of truth lives in GitHub. Open the file, make a change, and commit it to publish through Pages.</p>
            {githubRepo ? <a href={editUrl(post.slug)} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 bg-primary px-4 py-3 text-[10px] font-semibold uppercase tracking-[.15em] text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="link-edit-source">Edit source <ArrowUpRight size={14} /></a> : <p className="mt-7 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">Set <code className="inline-code">VITE_GITHUB_REPO</code> to activate the edit link.</p>}
            <Link href={`/post/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.15em] text-muted-foreground transition-colors hover:text-foreground" data-testid="link-view-article">View published article <ExternalLink size={13} /></Link>
          </aside>
        </section>
      </main>
    </SiteShell>
  );
}
