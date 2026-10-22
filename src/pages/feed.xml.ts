import type { APIRoute } from 'astro';
import { getPosts } from '../lib/posts';

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[character]!);

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const items = posts.map((post) => {
    const url = escapeXml(new URL(`/blog/${post.data.slug}/`, site).href);
    return `<item><title>${escapeXml(post.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.data.description)}</description><pubDate>${post.data.publishDate.toUTCString()}</pubDate></item>`;
  }).join('');
  const feedUrl = escapeXml(new URL('/feed.xml', site).href);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Giuseppe Frattura</title><link>${escapeXml(site!.href)}</link><description>Software, tecnologia e fotografia: gli articoli di Giuseppe Frattura.</description><language>it</language><atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
