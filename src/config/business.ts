import { parse } from 'yaml';
import businessSource from '../data/business.yml?raw';
import type { PriceCategory } from '../data/catalog';

interface BusinessConfig {
  brand: string;
  copyright_year: number;
  currency: string;
  prices: Record<PriceCategory, string>;
}

export const businessConfig = parse(businessSource) as BusinessConfig;
