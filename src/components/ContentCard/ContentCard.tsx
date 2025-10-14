import React from 'react';
import { ContentItem, PricingOption } from '../../types';
import styles from './ContentCard.module.scss';

interface ContentCardProps {
  item: ContentItem;
  placeholderImage?: string;
}
export const PLACEHOLDER_IMAGE = '/src/assets/svgs/placeholder-image.svg';

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  placeholderImage = PLACEHOLDER_IMAGE
}) => {
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

  // Process the image path
  const getImageSrc = () => {
    return item.path && item.path.trim() !== '' ? item.path : placeholderImage;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={getImageSrc()}  // Use the processed image path
          alt={item.title} 
          className={styles.image}
          onError={(e) => {
            // Use default image when image loading fails
            e.currentTarget.src = placeholderImage;
          }}
        />
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardLeft}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.creator}>By {item.creator}</p>
        </div>
        <div className={styles.cardRight}>
          <div className={`${styles.priceBadge} ${getPriceBadgeClass()}`}>
            {getPriceDisplay()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;