import { configureStore } from '@reduxjs/toolkit';

import { ShazamCoreApi } from "./services/shazamCore";
import playerReducer from './features/playerSlice';
import { LyricsApi } from './services/lyricsApi';

export const store = configureStore({
  reducer: {
    [ShazamCoreApi.reducerPath]: ShazamCoreApi.reducer,
    [LyricsApi.reducerPath]: LyricsApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ShazamCoreApi.middleware, LyricsApi.middleware),
});