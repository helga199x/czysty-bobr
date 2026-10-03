import { parse } from 'yaml';
import enSource from '../locales/en.yml?raw';
import plSource from '../locales/pl.yml?raw';
import ruSource from '../locales/ru.yml?raw';
import ukSource from '../locales/uk.yml?raw';
import type { LocaleCode } from './site';
import type { PriceCategory } from '../data/catalog';

type ServiceCategory = 'furniture' | 'car' | 'textiles';

export interface LocaleMessages {
  seo: { title_suffix: string; description: string; og_locale: string };
  site: { home_label: string };
  navigation: {
    label: string;
    services: string;
    pricing: string;
    results: string;
    contact: string;
    quote: string;
    languages: string;
    open_menu: string;
  };
  languages: Record<LocaleCode, string>;
  hero: {
    eyebrow: string;
    title: string;
    title_accent: string;
    description: string;
    primary_action: string;
    secondary_action: string;
    brand_art_label: string;
    brand_caption: string;
  };
  services: {
    title: string;
    description: string;
    items: Record<ServiceCategory, { title: string; description: string }>;
  };
  pricing: {
    title: string;
    description: string;
    from: string;
    items: Record<PriceCategory, { name: string; note: string }>;
  };
  results: { title: string; description: string; before: string; after: string };
  callout: { title: string; description: string; action: string };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    submit: string;
    demo_note: string;
  };
  footer: { description: string };
}

const translations: Record<LocaleCode, LocaleMessages> = {
  pl: parse(plSource) as LocaleMessages,
  en: parse(enSource) as LocaleMessages,
  uk: parse(ukSource) as LocaleMessages,
  ru: parse(ruSource) as LocaleMessages,
};

export function getTranslations(locale: LocaleCode) {
  return translations[locale];
}
