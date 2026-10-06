# Czysty Bóbr

Static, multilingual website for a mobile upholstery and car interior cleaning service. The Polish version is the home page; each other language has its own URL.

## Tech Stack

- Astro 7 generates semantic HTML for each language version.
- YAML files contain all translations; the `yaml` package parses them during the build.
- CSS handles the presentation. Navigation and page content do not require JavaScript.
- Contact details are displayed as clickable links; the site does not use a form or backend.

## Project Structure

```text
src/
  components/   Page sections and navigation
  config/       Site and business configuration, plus locale handling
  data/         Service data and business settings, including prices
  layouts/      Shared HTML document and SEO metadata
  locales/      pl, en, uk, and ru translations
  pages/        Static pages for each language
  styles/       Main stylesheet
public/         Favicon and static assets
```

## Requirements and Installation

Node.js 20.19.0 or later and npm are required.

On macOS, install Node.js with Homebrew using `brew install node@22`. If Homebrew does not add `node@22` to your `PATH`, run `export PATH="$(brew --prefix node@22)/bin:$PATH"`. The `.nvmrc` file selects version 22 for nvm/fnm.

```sh
npm install
npm run dev
```

Astro prints the local server URL in the terminal.

## Production Build

```sh
npm ci
npm run check
npm run build
npm run preview
```

The generated static files are written to `dist/`. Node.js is not required on the server after deployment. The site is configured to run from the domain root.

## GitHub Pages Deployment

The public URL is `https://www.czystybobr.pl/`. Configure `www.czystybobr.pl` as the custom domain in GitHub Pages and point its DNS records to GitHub Pages. No backend, API keys, or repository secrets are required.

In the repository, open **Settings > Pages**, select **GitHub Actions** as the source under **Build and deployment**, and set **Custom domain** to `www.czystybobr.pl`. The `public/CNAME` file preserves this domain in the deployed artifact. Enable the required GitHub actions under **Settings > Actions > General** if needed. If the `github-pages` environment has deployment branch restrictions, allow `master`.

The workflow in `.github/workflows/deploy.yml` runs on pushes to `master` or manually from **Actions > Deploy to GitHub Pages > Run workflow**. It uses Node.js 22, runs `npm ci`, `npm run check`, and `npm run build`, uploads `dist/`, and deploys it to Pages. Deployment requires a successful build. The workflow grants Pages write and OIDC permissions only to the deployment job.

After pushing, wait for both workflow jobs to succeed before opening the public URL. For a free GitHub account, the repository must be public to use Pages.

## Translations and Adding a Language

- Polish: `src/locales/pl.yml`, URL `/`.
- English: `src/locales/en.yml`, URL `/en/`.
- Ukrainian: `src/locales/uk.yml`, URL `/uk/`.
- Russian: `src/locales/ru.yml`, URL `/ru/`.
- Full price list: `/cennik/`, `/en/pricing/`, `/uk/pricing/`, `/ru/pricing/`.

These routes are served directly from the domain root. Use `withBase` from `src/config/paths.ts` for internal links and public asset paths.

To add a language, create a YAML file with the same key structure as `pl.yml`, add the locale code to `src/config/site.ts`, import the file, and add it to the map in `src/config/locales.ts`. Add the corresponding price-list path in `src/components/SiteHeader.astro` and `src/pages/sitemap.xml.ts`. Translate all sections, then run `npm run check` and `npm run build`.

## Editing Content and Prices

Localized copy is stored in `src/locales/*.yml`. Full price-list and summary prices are in `src/data/catalog.yml`; the brand name, year, currency, phone, email, WhatsApp number, and business hours are in `src/data/business.yml`. The order and icons of the services on the home page are defined in `src/data/catalog.ts`. Contact details and working hours are configured; verify them before publishing.

The Before/After section is currently disabled by the `effects` and `beforeAfterGallery` flags in `src/data/business.yml`. The carousel uses `src/data/photo-pairs.ts` and `src/scripts/gallery.js`. Verify the photos in `public/` before enabling the gallery.

## Environment Variables

The project does not use secrets or API keys. The default `site` is `https://www.czystybobr.pl` and the `base` is `/`, so SEO URLs and the sitemap work without a `.env` file. The Pages workflow explicitly sets `SITE_URL` to that origin. An optional `SITE_URL` override in `.env` must contain the origin only, without a path; `.env.example` shows the Pages value.

## Search Engine Setup

Each of the eight pages has localized title/description, a self-referencing canonical, PL/EN/UK/RU alternates and an `x-default` pointing to the Polish equivalent. Open Graph and Twitter cards use the existing 1200 x 630 brand image. The shared layout publishes factual LocalBusiness JSON-LD from the business and catalog configuration, without invented addresses, coordinates, ratings or reviews. Without a postal address, Google LocalBusiness rich-result eligibility is not guaranteed.

After deployment, add a **URL-prefix** property for `https://www.czystybobr.pl/` in Google Search Console. DNS-based Domain verification is also available if you control the domain.

1. Select HTML file verification and download Google's exact verification file.
2. Place that unmodified file in `public/`, deploy, and check that the URL specified by Google serves it successfully from the domain root.
3. Complete verification and retain the file for future ownership checks.
4. Submit `https://www.czystybobr.pl/sitemap.xml` in Sitemaps.
5. Use URL Inspection and the live test for the home pages and pricing pages, then request indexing where appropriate. Monitor Page indexing for crawl errors and canonical selection.

No verification file or token is fabricated in this repository. Verification does not require a tracking script. Indexing and rich results are not guaranteed by metadata alone.

## Security Audit

`npm audit --omit=dev` checks the dependencies shipped with the application and currently reports no vulnerabilities. A full `npm audit` reports a high-severity advisory for `http-cache-semantics@4.2.0`, a dependency of the Astro tooling; upstream has not yet released a patched version. These packages are used only for building and are not included in `dist/` or deployed to static hosting. Do not expose the local development server publicly, and rerun the full audit when a fix becomes available.

## Before Publishing

- Verify the phone number, email, WhatsApp number, and business hours in `src/data/business.yml`.
- Verify real photos of completed work before enabling the Before/After gallery.
- Verify that generated SEO URLs use `https://www.czystybobr.pl/`.

Astro generates `dist/robots.txt` and `dist/sitemap.xml` at the domain root. Publish `dist/` through the Pages workflow; no application server is required.
