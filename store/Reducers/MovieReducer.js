import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Movies: [],
  TrendingMovies: [],
  MovieDetails: {},
  errors: [],
  page: 1,

};

export const MovieReducer = createSlice({
  name: 'Movies',
  initialState,
  reducers: {
      saveMovies: (state, action) => {
        state.Movies = action.payload;
      },
      saveTrendingMovies: (state, action) =>{
        state.TrendingMovies = action.payload;
      },
      saveMovieDetails: (state, action) => {
        state.MovieDetails = action.payload;
      },
      adderrors: (state, action) => {
        state.errors.push(action.payload);
      },
      removeerrors: (state, action) => {
        state.errors = [];
      },
      changepage: (state, action) => {
        state.page += action.payload;
      },
  },
})

// Action creators are generated for each case reducer function
export const { 
  saveMovies,
  saveTrendingMovies,
  saveMovieDetails,
  adderrors,
  removeerrors,
  changepage,
  RemoveMovies,
} = MovieReducer.actions

export default MovieReducer.reducer;