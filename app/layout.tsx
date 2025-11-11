import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Agentic Blog',
  description: 'Auto-share blog to social media',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://agentic-1e6a75f7.vercel.app'),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <a href="/" style={{ fontWeight: 700 }}>Agentic Blog</a>
          <nav style={{ float: 'right' }}>
            <a href="/admin">Admin</a>
          </nav>
        </header>
        <main style={{ maxWidth: 800, margin: '24px auto', padding: '0 16px' }}>{children}</main>
        <footer style={{ maxWidth: 800, margin: '24px auto', padding: '0 16px', color: '#6b7280' }}>
          ? {new Date().getFullYear()} Agentic Blog
        </footer>
      </body>
    </html>
  );
}
