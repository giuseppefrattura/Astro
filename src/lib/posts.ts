import { getCollection } from 'astro:content';

export const postsPerPage = 10;

export async function getPosts() {
  return (await getCollection('posts')).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}

export function blogPagePath(page: number) {
  return page === 1 ? '/blog/' : `/blog/${page}/`;
}
