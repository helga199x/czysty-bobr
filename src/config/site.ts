export const siteConfig = {
  defaultLocale: 'pl',
  locales: ['pl', 'en', 'uk', 'ru'],
} as const;

export type LocaleCode = (typeof siteConfig.locales)[number];
