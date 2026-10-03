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
  | 'complete_cleaning'
  | 'car_pet_hair_heavy'
  | 'car_odor_neutralization'
  | 'car_cigarette_odor'
  | 'car_pet_odor'
  | 'car_ozonation'
  | 'car_upholstery_impregnation'
  | 'car_seat_impregnation'
  | 'car_heavy_soiling'
  | 'car_stain_treatment'
  | 'leather_upholstery'
  | 'furniture_pet_hair'
  | 'furniture_odor_neutralization'
  | 'furniture_impregnation'
  | 'furniture_heavy_soiling'
  | 'urine_vomit_stains'
  | 'furniture_pet_odor'
  | 'furniture_disinfection';
