import { ArticleReader } from '@/components/article-reader';
import { SiteShell } from '@/components/site-shell';
import { posts } from '@/data/posts';

export default function Home() {
  return (
    <SiteShell>
      <main>
        {posts.map((post) => (
          <ArticleReader key={post.slug} post={post} showBackLink={false} sectionId={`article-${post.slug}`} />
        ))}
      </main>
    </SiteShell>
  );
}
