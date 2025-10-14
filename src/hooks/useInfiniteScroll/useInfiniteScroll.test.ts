import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';

describe('useInfiniteScroll', () => {
  it('should be defined', () => {
    expect(useInfiniteScroll).toBeDefined();
  });

  it('returns observerRef', () => {
    const mockOnLoadMore = jest.fn();
    const { result } = renderHook(() => useInfiniteScroll(mockOnLoadMore, false, true));
    expect(result.current.observerRef).toBeDefined();
  });
});