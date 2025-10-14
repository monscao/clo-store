import React from 'react';
import { Select } from 'antd';
import { useFilterParams } from '../../hooks/useFilterParams';
import styles from './SortingDropdown.module.scss';

const SortingDropdown: React.FC = () => {
  const { sortBy, setSortBy } = useFilterParams();

  const options = [
    { value: 'title', label: 'Item Name' },
    { value: 'price-high', label: 'Higher Price' },
    { value: 'price-low', label: 'Lower Price' }
  ];

  return (
    <div className={styles.selectContainer}>
      <Select
        value={sortBy}
        onChange={setSortBy}
        options={options}
        className={styles.dropdown}
        style={{ width: 120 }} />
    </div>
  );
};

export default SortingDropdown;