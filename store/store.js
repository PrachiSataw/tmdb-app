import { configureStore } from '@reduxjs/toolkit';
import MovieReducer from './Reducers/MovieReducer';
import TvShowsReducer from './Reducers/TvShowsReducer';
// import tmdbReducer from './Reducers/tmdbReducer';

export const store = configureStore({
  reducer: {
    MovieReducer,
    TvShowsReducer
  },
})