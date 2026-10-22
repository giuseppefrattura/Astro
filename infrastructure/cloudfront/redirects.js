// CloudFront Functions JavaScript runtime 2.0, viewer-request.
// Merge redirectResponse() into an existing handler BEFORE any /index.html rewrite.
function redirectResponse(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  var targets = {
    '/blog/1': '/blog/',
    '/blog/1/': '/blog/',
    '/blog/1/index.html': '/blog/',
    '/1index': '/',
    '/1index/': '/',
    '/1index/index.html': '/',
  };
  var target = targets[request.uri];
  if (!target) return null;

  // CloudFront supplies URL-encoded query keys/values. Keep them encoded and
  // retain duplicate values, rather than encoding percent escapes a second time.
  var query = request.querystring || {};
  var parts = [];
  Object.keys(query).forEach(function (key) {
    var values = query[key].multiValue || [query[key]];
    values.forEach(function (entry) { parts.push(key + '=' + entry.value); });
  });
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: 'https://giuseppefrattura.com' + target + (parts.length ? '?' + parts.join('&') : '') },
      'cache-control': { value: 'public,max-age=3600' },
    },
  };
}

function handler(event) {
  return redirectResponse(event.request) || event.request;
}
