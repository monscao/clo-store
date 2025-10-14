import React, { useEffect, useMemo, useRef } from 'react';
import { Skeleton } from 'antd';
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

  // COnfiguration of Skeleton
  const skeletonCount = 8;
  const skeletonArray = Array.from({ length: skeletonCount }, (_, i) => i);

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
      <div className={styles.grid}>
        {/* Show skeleton screen on initial load */}
        {loading && items.length === 0 ? (
          skeletonArray.map(index => (
            <div key={`skeleton-${index}`} className={styles.skeletonCard}>
              <Skeleton.Node active style={{ width: '100%', height: 200 }} />
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
      
      {/* Skeleton screen when loading more */}
      {loading && items.length > 0 && (
        <div className={styles.grid}>
          {skeletonArray.map(index => (
            <div key={`skeleton-more-${index}`} className={styles.skeletonCard}>
              <Skeleton.Node active style={{ width: '100%', height: 200 }} />
              <Skeleton active paragraph={{ rows: 2 }} title={false} />
            </div>
          ))}
        </div>
      )}
      
      {hasMore && (
        <div ref={observerRef} className={styles.trigger} />
      )}

      {loading && (
        <div className={styles.loader}>
          {loading && <div className={styles.loadingSpinner}>Loading...</div>}
        </div>
      )}
    </div>
  );
};

export default ContentList;