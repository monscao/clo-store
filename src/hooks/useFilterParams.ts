import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PricingOption } from '../types';

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pricingOptions = useMemo(() => {
    const options = searchParams.get('pricing');
    return options ? options.split(',').map(opt => parseInt(opt) as PricingOption) : [];
  }, [searchParams]);

  const searchKeyword = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const sortBy = useMemo(() => {
    return searchParams.get('sort') as 'title' | 'price-high' | 'price-low' || 'title';
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

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    pricingOptions,
    searchKeyword,
    sortBy,
    setPricingOptions,
    setSearchKeyword,
    setSortBy,
    resetFilters
  };
};