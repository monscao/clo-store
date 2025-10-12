import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, PricingOption } from '../types';

const initialState: FilterState = {
  pricingOptions: [],
  searchKeyword: '',
  sortBy: 'title',
  priceRange: [0, 999]
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPricingOptions: (state, action: PayloadAction<PricingOption[]>) => {
      state.pricingOptions = action.payload;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.pricingOptions = [];
      state.searchKeyword = '';
      state.sortBy = 'title';
      state.priceRange = [0, 999];
    }
  }
});

export const { 
  setPricingOptions, 
  setSearchKeyword, 
  setSortBy, 
  setPriceRange, 
  resetFilters 
} = filterSlice.actions;
export default filterSlice.reducer;