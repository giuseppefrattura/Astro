import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/data/blog-posts" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		publishDate: z.coerce.date(),
		description: z.string(),
	}),
});

export const collections = { posts };