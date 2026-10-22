"""Check the built website's metadata, routes and local media before deployment."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1] / 'dist'
ORIGIN = 'https://giuseppefrattura.com'
REDIRECTS = {'/blog/1/': '/blog/', '/1index/': '/'}

class Document(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.tags = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

    def select(self, tag):
        return [attrs for name, attrs in self.tags if name == tag]


def check(condition, message):
    if not condition:
        raise AssertionError(message)


files = sorted(ROOT.rglob('*.html'))
check(bool(files), 'No build found. Run npm run build first.')
canonicals = set()
for file in files:
    route = '/' + file.parent.relative_to(ROOT).as_posix().strip('.')
    route = route.rstrip('/') + '/'
    text = file.read_text()
    doc = Document(text)
    if route in REDIRECTS:
        check(any(meta.get('http-equiv', '').lower() == 'refresh'
                  and REDIRECTS[route] in meta.get('content', '') for meta in doc.select('meta')),
              f'{route}: missing redirect')
        continue
    check(doc.select('html')[0].get('lang') == 'it', f'{route}: wrong language')
    canonical = [a['href'] for a in doc.select('link') if a.get('rel') == 'canonical']
    check(len(canonical) == 1 and canonical[0].startswith(ORIGIN + '/')
          and unquote(urlparse(canonical[0]).path) == route, f'{route}: invalid canonical {canonical}')
    canonicals.update(canonical)
    check('astro-blog-template.netlify.app' not in text, f'{route}: template domain')
    check(bool(doc.select('h1')), f'{route}: missing h1')
    for meta in doc.select('meta'):
        if meta.get('property') in ('og:url', 'twitter:url'):
            check(meta.get('content') == canonical[0], f'{route}: inconsistent social URL')
    check(not doc.select('iframe'), f'{route}: eager embedded video')
    for tag, attrs in doc.tags:
        candidates = []
        if tag in ('img', 'script', 'source', 'audio'):
            candidates.append(attrs.get('src', ''))
        if tag == 'link' and attrs.get('rel') in ('stylesheet', 'preload', 'icon'):
            candidates.append(attrs.get('href', ''))
        if tag in ('img', 'source'):
            candidates += [entry.strip().split()[0] for entry in attrs.get('srcset', '').split(',') if entry.strip()]
        for value in candidates:
            if value.startswith('/') and not value.startswith('//'):
                target = ROOT / unquote(urlparse(value).path).lstrip('/')
                check(target.is_file(), f'{route}: missing asset {value}')
    for attrs in doc.select('div'):
        if 'video-embed' in attrs.get('class', '').split():
            check(urlparse(attrs.get('data-embed-url', '')).hostname in
                  ('www.youtube-nocookie.com', 'player.vimeo.com', 'www.facebook.com'),
                  f'{route}: invalid video provider')

home = Document((ROOT / 'index.html').read_text())
avatar = next(a for a in home.select('img') if a.get('alt') == 'Ritratto di Giuseppe Frattura')
check(bool(avatar.get('srcset')), 'Avatar has no responsive variants')
check(avatar.get('width') == avatar.get('height') == '300', 'Avatar dimensions changed')
for route in ('blog', 'blog/2'):
    doc = Document((ROOT / route / 'index.html').read_text())
    check(any(a.get('aria-current') == 'page' for _, a in doc.tags), f'{route}: missing current page')
    check(any(a.get('rel') == 'next' for a in doc.select('a')), f'{route}: missing next page')

sitemap = ET.parse(ROOT / 'sitemap.xml')
locations = [node.text for node in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
check(len(locations) == len(set(locations)), 'Duplicate sitemap URLs')
check(set(locations) == canonicals, 'Sitemap differs from canonical public pages')
print(f'OK: {len(canonicals)} public pages; metadata, sitemap, local media, videos and pagination checked.')
