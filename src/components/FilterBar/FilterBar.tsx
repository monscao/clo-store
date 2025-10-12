import React from 'react';
import { useFilterParams } from '../../hooks/useFilterParams';
import { PricingOption, PricingOptionLabels } from '../../types';
import styles from './FilterBar.module.scss';

const FilterSection: React.FC = () => {
  const { pricingOptions, setPricingOptions, resetFilters } = useFilterParams();

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
      <button 
        className={styles.resetButton}
        onClick={resetFilters}>
        Reset
      </button>
    </div>
  );
};

export default FilterSection;