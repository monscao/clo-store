import React, { useState, useEffect } from 'react';
import { useFilterParams } from '../../hooks/useFilterParams/useFilterParams';
import { useDebounce } from '../../hooks/useDebounce/useDebounce';
import styles from './SearchBar.module.scss';

const PLACEHOLDER_IMAGE = '/src/assets/svgs/search.svg';

const SearchBar: React.FC = () => {
  const { searchKeyword, setSearchKeyword } = useFilterParams();
  const [searchTerm, setSearchTerm] = useState(searchKeyword);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    setSearchKeyword(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setSearchTerm(searchKeyword);
  }, [searchKeyword]);

  return (
    <div className={styles.searchBar}>
      <img 
        src={PLACEHOLDER_IMAGE}
        alt='search'
      />
      <input
        type="text"
        placeholder="Find the Items you are looking for"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;