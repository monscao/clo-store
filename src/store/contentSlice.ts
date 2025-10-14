import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem, ContentState } from '../types';
import { fetchContents } from '../services/api';

export const fetchContentItems = createAsyncThunk('content/fetchItems',
  async (page: number) => {
    const response = await fetchContents(page);
    return response;
  }
);

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 0
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearItems: (state) => {
      state.items = [];
      state.page = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContentItems.fulfilled, (state, action: PayloadAction<ContentItem[]>) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
        state.page += 1;
        // here should be a check to see if more items are available
        // state.hasMore = action.payload.hasMore;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchContentItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch content';
      });
  }
});

export const { clearItems } = contentSlice.actions;
export default contentSlice.reducer;