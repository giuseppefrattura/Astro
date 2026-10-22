import type { APIRoute } from 'astro';
import { getPosts, postsPerPage, blogPagePath } from '../lib/posts';

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[character]!);

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const paths = ['/', '/blog/', '/links/', '/uauaua/',
    ...Array.from({ length: Math.max(0, Math.ceil(posts.length / postsPerPage) - 1) }, (_, i) => blogPagePath(i + 2)),
    ...posts.map((post) => `/blog/${post.data.slug}/`),
  ];
  const urls = paths.map((path) => `<url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
