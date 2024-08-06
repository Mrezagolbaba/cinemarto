// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './services/movies';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
