/* eslint-disable import/prefer-default-export */

export function host(url) {
  const h = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const p = h.split('.').slice(-3);
  if (p[0] === 'www') {
    p.shift();
  }
  return p.join('.');
}
