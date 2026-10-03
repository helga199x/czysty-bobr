export const services = [
  { id: 'furniture', icon: '🛋️' },
  { id: 'car', icon: '🚗' },
  { id: 'textiles', icon: '🛏️' },
] as const;

export const priceCategories = ['chair', 'sofa', 'car'] as const;

export type PriceCategory = (typeof priceCategories)[number];
