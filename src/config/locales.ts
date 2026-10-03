import { parse } from 'yaml';
import enSource from '../locales/en.yml?raw';
import plSource from '../locales/pl.yml?raw';
import ruSource from '../locales/ru.yml?raw';
import ukSource from '../locales/uk.yml?raw';
import type { LocaleCode } from './site';
import type { Weekday } from './business';
import type { DetailedPriceId, PriceCategory } from '../data/catalog';

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
    page_title: string;
    page_description: string;
    seo_title_suffix: string;
    seo_description: string;
    full_list_link: string;
    furniture_category: string;
    cars_category: string;
    car_additional_category: string;
    furniture_additional_category: string;
    service_column: string;
    price_column: string;
    booking_cta: string;
    travel_title: string;
    travel_free_copy: string;
    minimum_order_label: string;
    service_area_note: string;
    price_disclaimer: string;
    services: Record<DetailedPriceId, string>;
    items: Record<PriceCategory, { name: string; note: string }>;
  };
  results: {
    title: string;
    description: string;
    before: string;
    after: string;
    previous_pair: string;
    next_pair: string;
  };
  callout: { title: string; description: string; action: string };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    phone: string;
    email: string;
    whatsapp: string;
    working_hours: string;
    working_days: string;
    weekdays: Record<Weekday, string>;
    not_provided: string;
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
