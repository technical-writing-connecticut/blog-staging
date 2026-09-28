import { Link, useParams } from 'wouter';
import { ArticleReader } from '@/components/article-reader';
import { SiteShell } from '@/components/site-shell';
import { getPost } from '@/data/posts';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);
  if (!post) return <SiteShell><main className="mx-auto max-w-2xl px-5 py-28"><p className="text-primary">404 / note not found</p><h1 className="mt-4 font-editorial text-6xl">This page is elsewhere.</h1><Link href="/" className="mt-8 inline-flex border-b border-primary pb-1 text-sm" data-testid="link-back-home">Return to the index</Link></main></SiteShell>;
  return <PostReader post={post} />;
}

function PostReader({ post }: { post: NonNullable<ReturnType<typeof getPost>> }) {
  return (
    <SiteShell>
      <ArticleReader post={post} />
    </SiteShell>
  );
}
