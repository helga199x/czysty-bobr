import { siteConfig } from '../config/site';

const localePaths = siteConfig.locales.map((locale) => ({
  locale,
  path: locale === siteConfig.defaultLocale ? '/' : `/${locale}/`,
}));

export function GET({ site }: { site?: URL }) {
  const entries = site
    ? localePaths.map(({ path }) => {
        const alternates = localePaths
          .map(({ locale, path: alternatePath }) =>
            `<xhtml:link rel="alternate" hreflang="${locale}" href="${new URL(alternatePath, site)}" />`,
          )
          .join('');

        return `<url><loc>${new URL(path, site)}</loc>${alternates}</url>`;
      }).join('')
    : '';
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries,
    '</urlset>',
  ].join('');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
