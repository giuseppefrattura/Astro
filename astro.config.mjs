import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeExternalLinks from 'rehype-external-links'
import remarkImages from './src/lib/remark-images.mjs'

import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://giuseppefrattura.com',
  trailingSlash: 'always',
  redirects: { '/blog/1/': '/blog/', '/1index/': '/' },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
    breakpoints: [320, 640, 960, 1344],
  },
  integrations: [mdx(), sentry({
    project: "javascript-astro",
    org: "fracture",
    authToken: process.env.SENTRY_AUTH_TOKEN
  })],
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
    processor: unified({
      remarkPlugins: [remarkGfm, remarkSmartypants, remarkImages],
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]],
    }),
  },
})