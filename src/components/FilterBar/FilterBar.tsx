import React from 'react';
import { useFilterParams } from '../../hooks/useFilterParams';
import { PricingOption, PricingOptionLabels } from '../../types';
import PriceSlider from '../PriceSlider/PriceSlider';
import styles from './FilterBar.module.scss';

const FilterSection: React.FC = () => {
  const { 
    pricingOptions, 
    setPricingOptions, 
    resetFilters,
    priceRange,
    setPriceRange
  } = useFilterParams();

  const handlePricingOptionChange = (option: PricingOption) => {
    const newOptions = pricingOptions.includes(option)
      ? pricingOptions.filter((item: any) => item !== option)
      : [...pricingOptions, option];
    
    setPricingOptions(newOptions);
  };

  return (
    <div className={styles.filterSection}>  
      <div className={styles.filterGroup}>
        <span className={styles.filterTitle}>Pricing Option</span>
        {
          (Object.values(PricingOption)
            .filter(value => typeof value === 'number') as PricingOption[])
            .map(option => (
              <label key={option} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={pricingOptions.includes(option)}
                  onChange={() => handlePricingOptionChange(option)}
                  className={styles.checkbox}
                />
                {PricingOptionLabels[option]}
              </label>
          ))
        }
      </div>
      {pricingOptions.includes(PricingOption.PAID) && (
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Price Range</h3>
          <PriceSlider 
            value={priceRange} 
            onChange={setPriceRange}
            min={0}
            max={999}
          />
        </div>
      )}
      <button 
        className={styles.resetButton}
        onClick={resetFilters}>
        Reset
      </button>
    </div>
  );
};

export default FilterSection;