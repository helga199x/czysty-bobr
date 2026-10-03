import { parse } from 'yaml';
import businessSource from '../data/business.yml?raw';

export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface BusinessConfig {
  brand: string;
  copyright_year: number;
  currency: string;
  features: {
    beforeAfterGallery: boolean;
    effects: boolean;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
    working_days: Weekday[];
    working_hours: { start: string; end: string };
  };
}

export const businessConfig = parse(businessSource) as BusinessConfig;
