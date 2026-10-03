export const services = [
  { id: 'furniture', icon: '🛋️' },
  { id: 'car', icon: '🚗' },
  { id: 'textiles', icon: '🛏️' },
] as const;

export const priceCategories = ['chair', 'sofa', 'car'] as const;

export type PriceCategory = (typeof priceCategories)[number];

export type DetailedPriceId =
  | 'armchair'
  | 'chair'
  | 'sofa_two_seat'
  | 'sofa_three_seat'
  | 'small_corner_sofa'
  | 'large_corner_sofa'
  | 'single_mattress'
  | 'single_seat'
  | 'rear_bench'
  | 'headliner'
  | 'trunk'
  | 'complete_cleaning';
