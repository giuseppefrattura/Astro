import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';

const context = vm.createContext({});
vm.runInContext(readFileSync(new URL('../infrastructure/cloudfront/redirects.js', import.meta.url), 'utf8'), context);
const request = (uri, querystring = {}, method = 'GET') => ({ uri, querystring, method, headers: {} });

test('legacy URLs redirect to canonical public pages without loops', () => {
  for (const uri of ['/blog/1', '/blog/1/', '/blog/1/index.html', '/1index', '/1index/', '/1index/index.html']) {
    const response = context.handler({ request: request(uri) });
    assert.equal(response.statusCode, 301);
    const expected = uri.startsWith('/blog/') ? 'https://giuseppefrattura.com/blog/' : 'https://giuseppefrattura.com/';
    assert.equal(response.headers.location.value, expected);
    const canonical = request(new URL(expected).pathname);
    assert.equal(context.handler({ request: canonical }), canonical);
  }
});

test('encoded and repeated query parameters survive the redirect', () => {
  const input = request('/blog/1/', {
    utm_source: { value: 'newsletter' },
    tag: { value: 'a%2Fb', multiValue: [{ value: 'a%2Fb' }, { value: 'c+d' }] },
    empty: { value: '' },
  });
  assert.equal(context.handler({ request: input }).headers.location.value,
    'https://giuseppefrattura.com/blog/?utm_source=newsletter&tag=a%2Fb&tag=c+d&empty=');
});

test('other routes and non-read requests retain the original request object', () => {
  for (const input of [request('/'), request('/blog/2/'), request('/assets/brand/gf-icon.webp'), request('/1index/', {}, 'POST')]) {
    assert.equal(context.handler({ request: input }), input);
  }
  assert.equal(context.handler({ request: request('/1index/', {}, 'HEAD') }).statusCode, 301);
});
