import { getPostBySlug } from '@/lib/posts';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://agentic-1e6a75f7.vercel.app';
  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      url: `${site}/posts/${params.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: post?.excerpt,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return <div><p>Post not found.</p><Link href="/">Go home</Link></div>;
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://agentic-1e6a75f7.vercel.app';
  const url = `${site}/posts/${post.slug}`;

  return (
    <article>
      <h1 style={{ marginBottom: 0 }}>{post.title}</h1>
      <small style={{ color: '#6b7280' }}>{new Date(post.publishedAt).toLocaleString()}</small>
      <p style={{ marginTop: 16 }}>{post.content}</p>

      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`} target="_blank">Share on X</a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank">Share on LinkedIn</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank">Share on Facebook</a>
        <button onClick={async () => {
          if (navigator.share) {
            await navigator.share({ title: post.title, text: post.excerpt, url });
          } else {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard');
          }
        }}>Share</button>
      </div>
    </article>
  );
}
