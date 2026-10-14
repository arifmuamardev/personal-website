/** Root-relative site link safe for GitHub Pages project staging and the production apex domain. */
export const basePath = import.meta.env.BASE_URL;

export function localPath(path = '/') {
  if (!path.startsWith('/') || path.startsWith('//')) {
    throw new Error(`localPath expects a site-root path: ${path}`);
  }
  // BASE_URL has a trailing slash with trailingSlash: 'always'.
  return `${basePath}${path.slice(1)}`;
}
