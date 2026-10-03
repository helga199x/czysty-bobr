import { parse } from 'yaml';
import catalogSource from '../data/catalog.yml?raw';
import type { DetailedPriceId, PriceCategory } from '../data/catalog';

interface CatalogConfig {
  overview: Record<PriceCategory, string>;
  furniture: Array<{ id: DetailedPriceId; price: string }>;
  cars: Array<{ id: DetailedPriceId; price: string }>;
}

export const catalogConfig = parse(catalogSource) as CatalogConfig;