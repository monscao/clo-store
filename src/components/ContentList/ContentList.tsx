import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { fetchContentItems } from '../../store/contentSlice';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import ContentCard from '../ContentCard/ContentCard';
import styles from './ContentList.module.scss';

const ContentList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, hasMore, page } = useAppSelector((state: RootState) => state.content);
  const { pricingOptions, searchKeyword, sortBy } = useAppSelector((state: RootState) => state.filters);
  // Use ref to track whether the initial request has been made
  const hasInitialized = useRef(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = items;

    // Filter by pricing options
    if (pricingOptions.length > 0) {
      filtered = filtered.filter(item => pricingOptions.includes(item.pricingOption));
    }

    // Filter by search keyword
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.creator.toLowerCase().includes(keyword) || 
        item.title.toLowerCase().includes(keyword)
      );
    }

    // Sort items
    switch (sortBy) {
      case 'price-high':
        filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'price-low':
        filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'title':
      default:
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [items, pricingOptions, searchKeyword, sortBy]);

  // Detecting changes in filter conditions
  useEffect(() => {
    // Temporarily disable infinite scrolling while filter conditions change
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 1000); // Reactivate after 1 second
    return () => clearTimeout(timer);
  }, [pricingOptions, searchKeyword, sortBy]);


  const loadMore = () => {
    if (!loading && hasMore && !isFiltering) {
      dispatch(fetchContentItems(page + 1));
    }
  };

  const { observerRef } = useInfiniteScroll(loadMore, !isFiltering);

  useEffect(() => {
    if (!hasInitialized.current && items.length === 0) {
      hasInitialized.current = true;
      dispatch(fetchContentItems(1));
    }
  }, [dispatch, items.length]);
  
  return (
    <div className={styles.contentList}>
      <div className={styles.grid}>
        {filteredAndSortedItems.map(item => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
      
      {(loading || hasMore) && (
        <div ref={observerRef} className={styles.loader}>
          {loading && <div className={styles.loadingSpinner}>Loading...</div>}
        </div>
      )}
    </div>
  );
};

export default ContentList;