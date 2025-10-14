import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PricingOption } from '../../types';

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // pricingOptions is stored as a comma-separated string of numbers in the URL
  const pricingOptions = useMemo(() => {
    const options = searchParams.get('pricing');
    return options ? options.split(',').map(opt => parseInt(opt) as PricingOption) : [];
  }, [searchParams]);

  // searchKeyword is stored as 'search' in the URL
  const searchKeyword = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  // sortBy is stored as 'sort' in the URL
  const sortBy = useMemo(() => {
    return searchParams.get('sort') as 'title' | 'price-high' | 'price-low' || 'title';
  }, [searchParams]);

  // priceRange is stored as 'priceRange' in the URL as "min,max"
  const priceRange = useMemo(() => {
    const range = searchParams.get('priceRange');
    if (range) {
      const [min, max] = range.split(',').map(Number);
      return [min, max] as [number, number];
    }
    return [0, 999] as [number, number];
  }, [searchParams]);

  const setPricingOptions = useCallback((options: PricingOption[]) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (options.length === 0) {
        newParams.delete('pricing');
      } else {
        newParams.set('pricing', options.join(','));
      }
      return newParams;
    });
  }, [setSearchParams]);

  const setSearchKeyword = useCallback((keyword: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (keyword) {
        newParams.set('search', keyword);
      } else {
        newParams.delete('search');
      }
      return newParams;
    });
  }, [setSearchParams]);

  const setSortBy = useCallback((sort: 'title' | 'price-high' | 'price-low') => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (sort === 'title') {
        newParams.delete('sort');
      } else {
        newParams.set('sort', sort);
      }
      return newParams;
    });
  }, [setSearchParams]);

  const setPriceRange = useCallback((range: [number, number]) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('priceRange', range.join(','));
      return newParams;
    });
  }, [setSearchParams]);

  const resetFilters = useCallback(() => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('pricing');
      newParams.delete('search');
      newParams.delete('priceRange');
      return newParams;
    });
  }, [setSearchParams]);

  return {
    pricingOptions,
    searchKeyword,
    sortBy,
    setPricingOptions,
    setSearchKeyword,
    setSortBy,
    priceRange,
    setPriceRange,
    resetFilters
  };
};