import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default async function HomePage() {
  const posts = await getAllPosts();
  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ padding: '16px 0', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ margin: '4px 0' }}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p style={{ color: '#374151', margin: '4px 0' }}>{post.excerpt}</p>
            <small style={{ color: '#6b7280' }}>{new Date(post.publishedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
