import { parse } from 'yaml';
import businessSource from '../data/business.yml?raw';

interface BusinessConfig {
  brand: string;
  copyright_year: number;
  currency: string;
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
    working_hours: {
      monday_friday: string;
      saturday: string;
      sunday: string;
    };
  };
}

export const businessConfig = parse(businessSource) as BusinessConfig;
