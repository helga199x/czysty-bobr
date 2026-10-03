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

The generated static files are written to `dist/`. They can be deployed to any static hosting provider; Node.js is not required on the server after deployment.

## Translations and Adding a Language

- Polish: `src/locales/pl.yml`, URL `/`.
- English: `src/locales/en.yml`, URL `/en/`.
- Ukrainian: `src/locales/uk.yml`, URL `/uk/`.
- Russian: `src/locales/ru.yml`, URL `/ru/`.
- Full price list: `/cennik/`, `/en/pricing/`, `/uk/pricing/`, `/ru/pricing/`.

To add a language, create a YAML file with the same key structure as `pl.yml`, add the locale code to `src/config/site.ts`, import the file, and add it to the map in `src/config/locales.ts`. Add the corresponding price-list path in `src/components/SiteHeader.astro` and `src/pages/sitemap.xml.ts`. Translate all sections, then run `npm run check` and `npm run build`.

## Editing Content and Prices

Localized copy is stored in `src/locales/*.yml`. Full price-list and summary prices are in `src/data/catalog.yml`; the brand name, year, currency, phone, email, WhatsApp number, and business hours are in `src/data/business.yml`. The order and icons of the services on the home page are defined in `src/data/catalog.ts`. Contact details and working hours are configured; verify them before publishing.

The Before/After section is currently disabled by the `effects` and `beforeAfterGallery` flags in `src/data/business.yml`. The carousel uses `src/data/photo-pairs.ts` and `src/scripts/gallery.js`. Verify the photos in `public/` before enabling the gallery.

## Environment Variables

The project does not use secrets or API keys. `SITE_URL` is optional for local development, but must be set for a production build to generate absolute canonical, `og:url`, and `hreflang` URLs and populate the sitemap. Set the public HTTPS URL of the site in `.env`, using `.env.example` as a reference.

## Security Audit

`npm audit --omit=dev` checks the dependencies shipped with the application and currently reports no vulnerabilities. A full `npm audit` reports a high-severity advisory for `http-cache-semantics@4.2.0`, a dependency of the Astro tooling; upstream has not yet released a patched version. These packages are used only for building and are not included in `dist/` or deployed to static hosting. Do not expose the local development server publicly, and rerun the full audit when a fix becomes available.

## Before Publishing

- Verify the phone number, email, WhatsApp number, and business hours in `src/data/business.yml`.
- Verify real photos of completed work before enabling the Before/After gallery.
- Set `SITE_URL` to enable absolute SEO URLs.

Astro generates `dist/robots.txt` and `dist/sitemap.xml`. To deploy, publish the contents of `dist/` to a static hosting provider; no application server is required.
