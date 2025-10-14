import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 300));
    expect(result.current).toBe('test');
  });

  it('should update value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 300 } }
    );

    expect(result.current).toBe('first');

    rerender({ value: 'second', delay: 300 });
    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('second');
  });

  it('should clear timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 300));
    
    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });

  it('should reset timer when value changes quickly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 300 } }
    );

    rerender({ value: 'second', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('first');

    rerender({ value: 'third', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('third');
  });
});