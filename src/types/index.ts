export enum PricingOption {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2
}

export const PricingOptionLabels = {
  [PricingOption.PAID]: 'Paid',
  [PricingOption.FREE]: 'Free',
  [PricingOption.VIEW_ONLY]: 'View Only'
} as const;

export interface ContentItem {
  id: string;
  path: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  price: number;
}

export interface FilterState {
  pricingOptions: PricingOption[];
  searchKeyword: string;
  sortBy: 'title' | 'price-high' | 'price-low';
  priceRange: [number, number];
}

export interface ContentState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}