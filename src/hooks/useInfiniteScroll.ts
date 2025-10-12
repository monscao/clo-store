import { useEffect, useRef, useCallback } from 'react';

export const useInfiniteScroll = (onLoadMore: () => void, enabled: boolean = true) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (enabled && target.isIntersecting && !isFetching.current) {
      isFetching.current = true;
      onLoadMore();
      // Set a cooldown period to prevent frequent triggering
      setTimeout(() => {
        isFetching.current = false;
      }, 1000);
    }
  }, [onLoadMore, enabled]);

  useEffect(() => {
    const element = observerRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver]);

  return { observerRef };
};