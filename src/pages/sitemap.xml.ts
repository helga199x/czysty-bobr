import { siteConfig } from '../config/site';
import { withBase } from '../config/paths';

const pageGroups = [
  siteConfig.locales.map((locale) => ({
    locale,
    path: locale === siteConfig.defaultLocale ? '/' : `/${locale}/`,
  })),
  siteConfig.locales.map((locale) => ({
    locale,
    path: locale === siteConfig.defaultLocale ? '/cennik/' : `/${locale}/pricing/`,
  })),
];

export function GET({ site }: { site?: URL }) {
  const entries = site
    ? pageGroups.flatMap((group) => group.map(({ path }) => {
        const alternates = group
          .map(({ locale, path: alternatePath }) =>
            `<xhtml:link rel="alternate" hreflang="${locale}" href="${new URL(withBase(alternatePath), site)}" />`,
          )
          .join('');

        return `<url><loc>${new URL(withBase(path), site)}</loc>${alternates}</url>`;
      })).join('')
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
