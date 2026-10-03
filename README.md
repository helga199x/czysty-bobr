# Czysty Bóbr

Statyczna, wielojęzyczna strona firmy oferującej mobilne czyszczenie tapicerki meblowej i samochodowej. Wersja polska jest stroną główną, a pozostałe języki mają osobne adresy.

## Stos technologiczny

- Astro 7 generuje semantyczny HTML dla każdej wersji językowej.
- Pliki YAML zawierają wszystkie tłumaczenia; pakiet `yaml` odczytuje je podczas kompilacji.
- CSS odpowiada za wygląd, a strona nie wymaga kodu JavaScript do nawigacji ani wyświetlania treści.
- Kontakty są prezentowane jako klikalne linki; formularz ani backend nie są używane.

## Struktura projektu

```text
src/
  components/   Sekcje strony i nawigacja
  config/       Konfiguracja witryny, biznesu i obsługa lokalizacji
  data/         Dane usług i konfiguracja biznesowa, w tym ceny
  layouts/      Wspólny dokument HTML i metadane SEO
  locales/      Tłumaczenia pl, en, uk i ru
  pages/        Statyczne strony językowe
  styles/       Główny arkusz stylów
public/         Favicon i zasoby statyczne
```

## Wymagania i instalacja

Wymagany jest Node.js 20.19.0 lub nowszy oraz npm.

Na macOS z Homebrew można zainstalować Node.js poleceniem `brew install node@22`. Jeśli Homebrew nie doda wersji `node@22` do `PATH`, użyj `export PATH="$(brew --prefix node@22)/bin:$PATH"`. Plik `.nvmrc` wskazuje wersję 22 dla nvm/fnm.

```sh
npm install
npm run dev
```

Astro wyświetli lokalny adres serwera w terminalu.

## Kompilacja produkcyjna

```sh
npm ci
npm run check
npm run build
npm run preview
```

Gotowe pliki statyczne znajdą się w `dist/`. Można je wdrożyć na dowolnym hostingu statycznym; po wdrożeniu serwer nie wymaga Node.js.

## Tłumaczenia i dodawanie języka

- Polski: `src/locales/pl.yml`, adres `/`.
- Angielski: `src/locales/en.yml`, adres `/en/`.
- Ukraiński: `src/locales/uk.yml`, adres `/uk/`.
- Rosyjski: `src/locales/ru.yml`, adres `/ru/`.
- Pełny cennik: `/cennik/`, `/en/pricing/`, `/uk/pricing/`, `/ru/pricing/`.

Aby dodać język, utwórz plik YAML z taką samą strukturą kluczy jak w `pl.yml`, dodaj kod języka w `src/config/site.ts`, zaimportuj plik i dopisz go do mapy w `src/config/locales.ts`. Dodaj odpowiednią ścieżkę cennika w `src/components/SiteHeader.astro` i `src/pages/sitemap.xml.ts`. Przetłumacz wszystkie sekcje, a następnie uruchom `npm run check` i `npm run build`.

## Edycja treści i cen

Teksty poszczególnych wersji językowych znajdują się w `src/locales/*.yml`. Ceny pełnego cennika i skróconego przeglądu są w `src/data/catalog.yml`; nazwa marki, rok, waluta oraz telefon, e-mail, WhatsApp i godziny pracy znajdują się w `src/data/business.yml`. Kolejność i ikony usług na stronie głównej znajdują się w `src/data/catalog.ts`. Dane kontaktowe są celowo puste do czasu uzupełnienia prawdziwych wartości.

## Zmienne środowiskowe

Projekt nie używa sekretów ani kluczy API. `SITE_URL` jest opcjonalny lokalnie, ale wymagany przy kompilacji produkcyjnej, aby wygenerować poprawne bezwzględne adresy canonical, `og:url`, `hreflang` i sitemapę. Ustaw publiczny adres HTTPS witryny w `.env`, korzystając z `.env.example`.

## Audyt bezpieczeństwa

`npm audit --omit=dev` sprawdza zależności wdrażane razem z aplikacją i obecnie nie zgłasza podatności. Pełny `npm audit` wykrywa high advisory dla `http-cache-semantics@4.2.0`, zależności narzędzi Astro; upstream nie opublikował jeszcze poprawionej wersji. Pakiety te służą wyłącznie do budowania, nie trafiają do `dist/` ani na hosting statyczny. Nie wystawiaj publicznie lokalnego serwera deweloperskiego i ponów pełny audyt po udostępnieniu poprawki.

## Przed publikacją

- Uzupełnij telefon, e-mail, WhatsApp i godziny pracy w `src/data/business.yml`, jeśli mają być widoczne.
- Dodaj prawdziwe zdjęcia z realizacji.
- Ustaw `SITE_URL`, aby włączyć bezwzględne adresy SEO.

Astro generuje `dist/robots.txt` i `dist/sitemap.xml`. Wdrożenie polega na opublikowaniu zawartości katalogu `dist/` na hostingu statycznym; serwer aplikacji nie jest potrzebny.
