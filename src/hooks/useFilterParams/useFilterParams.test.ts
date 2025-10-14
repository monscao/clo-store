import { renderHook, act } from '@testing-library/react';
import { useFilterParams } from './useFilterParams';

// Mock react-router-dom
const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(() => [new URLSearchParams(), mockSetSearchParams]),
}));

import { useSearchParams } from 'react-router-dom';

const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

describe('useFilterParams', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchParams.mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
  });

  it('should return default values when no URL params', () => {
    const { result } = renderHook(() => useFilterParams());
    
    expect(result.current.pricingOptions).toEqual([]);
    expect(result.current.searchKeyword).toBe('');
    expect(result.current.sortBy).toBe('title');
    expect(result.current.priceRange).toEqual([0, 999]);
  });

  it('should parse pricing options from URL', () => {
    const searchParams = new URLSearchParams('pricing=0,1');
    mockUseSearchParams.mockReturnValue([searchParams, mockSetSearchParams]);

    const { result } = renderHook(() => useFilterParams());
    
    expect(result.current.pricingOptions).toEqual([0, 1]);
  });

  it('should set pricing options in URL', () => {
    const { result } = renderHook(() => useFilterParams());
    
    act(() => {
      result.current.setPricingOptions([0, 1]);
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('should set search keyword in URL', () => {
    const { result } = renderHook(() => useFilterParams());
    
    act(() => {
      result.current.setSearchKeyword('test');
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('should set sortBy in URL', () => {
    const { result } = renderHook(() => useFilterParams());
    
    act(() => {
      result.current.setSortBy('price-low');
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('should set priceRange in URL', () => {
    const { result } = renderHook(() => useFilterParams());
    
    act(() => {
      result.current.setPriceRange([10, 100]);
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('should reset all filters', () => {
    const { result } = renderHook(() => useFilterParams());
    
    act(() => {
      result.current.resetFilters();
    });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});