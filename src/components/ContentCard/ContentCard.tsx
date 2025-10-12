import React from 'react';
import { ContentItem, PricingOption } from '../../types';
import styles from './ContentCard.module.scss';

interface ContentCardProps {
  item: ContentItem;
}
const PLACEHOLDER_IMAGE = '/src/assets/svgs/placeholder-image.svg';

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const getPriceDisplay = () => {
    switch (item.pricingOption) {
      case PricingOption.PAID:
        return `$${item.price?.toFixed(2) || '0.00'}`;
      case PricingOption.FREE:
        return 'Free';
      case PricingOption.VIEW_ONLY:
        return 'View Only';
      default:
        return '';
    }
  };

  const getPriceBadgeClass = () => {
    switch (item.pricingOption) {
      case PricingOption.PAID:
        return styles.priceBadgePaid;
      case PricingOption.FREE:
        return styles.priceBadgeFree;
      case PricingOption.VIEW_ONLY:
        return styles.priceBadgeViewOnly;
      default:
        return styles.priceBadge;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={item.path} 
          alt={item.title} 
          className={styles.image}
          onError={(e) => {
            // Use default image when image loading fails
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
        <div className={`${styles.priceBadge} ${getPriceBadgeClass()}`}>
          {getPriceDisplay()}
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.creator}>By {item.creator}</p>
      </div>
    </div>
  );
};

export default ContentCard;