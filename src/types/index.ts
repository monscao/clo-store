export enum PricingOption {
    PAID = 'paid',
    FREE = 'free',
    VIEW_ONLY = 'view-only',
}

export interface ContentItem {
  id: string;
  photo: string;
  userName: string;
  title: string;
  pricingOption: PricingOption;
  price?: number;
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