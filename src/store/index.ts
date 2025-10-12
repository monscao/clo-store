import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './contentSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;