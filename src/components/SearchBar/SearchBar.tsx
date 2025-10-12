import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchKeyword } from '../../store/filterSlice';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './SearchBar.module.scss';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch(setSearchKeyword(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  return (
    <div className={styles.searchBar}>
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