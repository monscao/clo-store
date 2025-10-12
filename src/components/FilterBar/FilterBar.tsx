import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setPricingOptions, resetFilters } from '../../store/filterSlice';
import { PricingOption, PricingOptionLabels } from '../../types';
import styles from './FilterBar.module.scss';

const FilterSection: React.FC = () => {
  const dispatch = useDispatch();
  const { pricingOptions } = useSelector((state: RootState) => state.filters);

  const handlePricingOptionChange = (option: PricingOption) => {
    const newOptions = pricingOptions.includes(option)
      ? pricingOptions.filter((item: any) => item !== option)
      : [...pricingOptions, option];
    
    dispatch(setPricingOptions(newOptions));
  };

  const handleReset = () => {
    dispatch(resetFilters());
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
        onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default FilterSection;