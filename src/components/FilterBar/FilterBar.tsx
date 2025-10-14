import React from 'react';
import { Checkbox } from 'antd';
import { useFilterParams } from '../../hooks/useFilterParams/useFilterParams';
import { PricingOption, PricingOptionLabels } from '../../types';
import PriceSlider from '../PriceSlider/PriceSlider';
import styles from './FilterBar.module.scss';

const Filterbar: React.FC = () => {
  const { 
    pricingOptions, 
    setPricingOptions, 
    resetFilters,
    priceRange,
    setPriceRange
  } = useFilterParams();

  const handlePricingOptionChange = (option: PricingOption, checked: boolean) => {
    const newOptions = checked
      ? [...pricingOptions, option]
      : pricingOptions.filter(item => item !== option);
    
    setPricingOptions(newOptions);
  };

  return (
    <div className={styles.filterBar}>  
      <div className={styles.filterGroup}>
        <span className={styles.filterTitle}>Pricing Option</span>
        <div className={styles.checkboxGroup}>
          {Object.values(PricingOption).filter(value => typeof value === 'number').map(option => (
            <Checkbox
              key={option}
              checked={pricingOptions.includes(option as PricingOption)}
              onChange={(e) => handlePricingOptionChange(option as PricingOption, e.target.checked)}
              className={styles.checkbox}>
              {PricingOptionLabels[option as PricingOption]}
            </Checkbox>
          ))}
        </div>
        {pricingOptions.includes(PricingOption.PAID) && (
          <div className={[styles.filterGroup, styles.priceRange].join(' ')}>
            <h3 className={styles.filterTitle}>Price Range</h3>
            <PriceSlider 
              value={priceRange} 
              onChange={setPriceRange}
              min={0}
              max={999}
            />
          </div>
        )}
      </div>
      <button 
        className={styles.resetButton}
        onClick={resetFilters}>
        Reset
      </button>
    </div>
  );
};

export default Filterbar;