import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Skeleton, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store';
import { fetchContentItems } from '../../store/contentSlice';
import { useFilterParams } from '../../hooks/useFilterParams';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import ContentCard from '../ContentCard/ContentCard';
import { PricingOption } from '../../types';
import styles from './ContentList.module.scss';

const ContentList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, hasMore, page } = useAppSelector((state: RootState) => state.content);
  const { pricingOptions, searchKeyword, sortBy, priceRange } = useFilterParams();
  // Use ref to track whether the initial request has been made
  const hasInitialized = useRef(false);
  // State to control skeleton display with delay
  // const [showSkeleton, setShowSkeleton] = useState(true);

  // Configuration of Skeleton
  const skeletonCount = 8;
  const skeletonArray = Array.from({ length: skeletonCount }, (_, i) => i);

  // Control skeleton display time
  // useEffect(() => {
  //   let timer: number;
  //   if (loading) {
  //     setShowSkeleton(true);
  //   } else {
  //     // Keep skeleton visible for 1 second after loading completes
  //     timer = window.setTimeout(() => {
  //       setShowSkeleton(false);
  //     }, 1000);
  //   }
    
  //   return () => {
  //     if (timer) clearTimeout(timer);
  //   };
  // }, [loading]);

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

    if (pricingOptions.includes(PricingOption.PAID)) {
      filtered = filtered.filter(item => 
        item.price >= priceRange[0] && item.price <= priceRange[1]
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

  const loadMore = () => {
    if (!loading && hasMore && filteredAndSortedItems.length > 0) {
      dispatch(fetchContentItems(page + 1));
    }
  };

  const { observerRef } = useInfiniteScroll(loadMore, loading, hasMore);

  useEffect(() => {
    if (!hasInitialized.current && items.length === 0) {
      hasInitialized.current = true;
      dispatch(fetchContentItems(1));
    }
  }, [dispatch, items.length]);
  
  return (
    <div className={styles.contentList}>
      {/* Show empty state when no results found */}
      {!loading && filteredAndSortedItems.length === 0 && items.length > 0 && (
        <div className={styles.emptyContainer}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className={styles.customEmpty}
            description="Oops, no items found matching your criteria."
          />
        </div>
      )}

      <div className={styles.grid}>
        {/* Show skeleton screen on initial load with delay control */}
        {(loading && items.length === 0) ? (
          skeletonArray.map(index => (
            <div key={`skeleton-${index}`} className={styles.skeletonCard}>
              <Skeleton.Node active className={styles.skeletonCard} />
              <Skeleton active paragraph={{ rows: 2 }} title={false} />
            </div>
          ))
        ) : (
          // Show actual content
          filteredAndSortedItems.map(item => (
            <ContentCard key={item.id} item={item} />
          ))
        )}
      </div>
      
      {/* Skeleton screen when loading more with delay control */}
      {(loading && items.length > 0) && (
        <div className={styles.grid} style={{ marginTop: '2rem' }}>
          {skeletonArray.map(index => (
            <div key={`skeleton-more-${index}`} className={styles.skeletonCard}>
              <Skeleton.Node active className={styles.skeletonCard} />
              <Skeleton active paragraph={{ rows: 2 }} title={false} />
            </div>
          ))}
        </div>
      )}
      
      {/* Ensure trigger is always visible and not blocked by skeleton */}
      {hasMore && !loading && (
        <div ref={observerRef} className={styles.trigger} />
      )}
    </div>
  );
};

export default ContentList;