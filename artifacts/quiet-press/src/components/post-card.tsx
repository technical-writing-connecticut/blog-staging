import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { ArrowRule, DateLabel } from '@/components/site-shell';
import type { Post } from '@/data/posts';

export function PostCard({ post, featured = false, onRead }: { post: Post; featured?: boolean; onRead?: (post: Post) => void }) {
  const title = <h2 className={`font-editorial tracking-[-.035em] text-foreground transition-colors duration-300 group-hover:text-primary ${featured ? 'max-w-3xl text-5xl leading-[.96] sm:text-7xl' : 'max-w-xl text-4xl leading-[.98]'}`}>{post.title}</h2>;
  const dek = <p className={`mt-4 max-w-2xl leading-7 text-muted-foreground ${featured ? 'text-lg' : 'text-[15px]'}`}>{post.dek}</p>;
  return (
    <article className={`group border-t border-border pt-5 ${featured ? 'pb-10' : 'pb-8'}`} data-testid={`card-post-${post.slug}`}>
      <div className="mb-5 flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[.16em] text-muted-foreground">
        <span>{post.tags[0]}</span>
        <span><DateLabel date={post.publishedAt} /> <span className="mx-1 text-border">/</span> {post.readTime} min read</span>
      </div>
      {onRead ? (
        <button type="button" onClick={() => onRead(post)} className="block w-full text-left" data-testid={`button-post-${post.slug}`}>
          {title}
          {dek}
        </button>
      ) : (
        <Link href={`/post/${post.slug}`} className="block" data-testid={`link-post-${post.slug}`}>
          {title}
          {dek}
        </Link>
      )}
      {onRead ? (
        <button type="button" onClick={() => onRead(post)} className="mt-7 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.17em] text-foreground" data-testid={`button-read-${post.slug}`}>
          <ArrowRule /> Read essay <ArrowUpRight size={13} strokeWidth={1.8} />
        </button>
      ) : (
        <Link href={`/post/${post.slug}`} className="mt-7 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.17em] text-foreground" data-testid={`link-read-${post.slug}`}>
          <ArrowRule /> Read essay <ArrowUpRight size={13} strokeWidth={1.8} />
        </Link>
      )}
    </article>
  );
}
