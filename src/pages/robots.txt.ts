export function GET({ site }: { site?: URL }) {
  const sitemap = site ? `Sitemap: ${new URL('/sitemap.xml', site)}` : undefined;
  const body = ['User-agent: *', 'Allow: /', sitemap].filter(Boolean).join('\n');

  return new Response(`${body}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
