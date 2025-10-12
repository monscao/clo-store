import { useEffect, useRef, useCallback } from 'react';

export const useInfiniteScroll = (onLoadMore: () => void, isLoading: boolean, hasMore: boolean) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && !isLoading && hasMore) {
      onLoadMore();
    }
  }, [onLoadMore, isLoading, hasMore]);

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
      rootMargin: '100px'
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);


  return { observerRef };
};