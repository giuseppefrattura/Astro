import type { APIRoute } from 'astro';
import { getPosts } from '../../lib/posts';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const payload = posts.map((post) => ({
    title: post.data.title,
    slug: post.data.slug,
    description: post.data.description,
    publishDate: post.data.publishDate.toISOString().slice(0, 10),
    url: new URL(`/blog/${post.data.slug}/`, site).pathname,
  }));

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

