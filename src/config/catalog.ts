import { parse } from 'yaml';
import catalogSource from '../data/catalog.yml?raw';
import type { DetailedPriceId, PriceCategory } from '../data/catalog';

type PriceQualifier = 'from' | 'surcharge';
type PriceEntry = { id: DetailedPriceId; price: string; qualifier?: PriceQualifier };

interface CatalogConfig {
  overview: Record<PriceCategory, string>;
  section_icons: Record<'furniture' | 'cars' | 'car_additional_services' | 'furniture_additional_services', string>;
  furniture: PriceEntry[];
  cars: PriceEntry[];
  car_additional_services: PriceEntry[];
  furniture_additional_services: PriceEntry[];
  travel: {
    icon: string;
    city: string;
    city_pl_genitive: string;
    free_from_order: number;
    minimum_order: number;
  };
}

export const catalogConfig = parse(catalogSource) as CatalogConfig;