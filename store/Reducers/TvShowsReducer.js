import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TvShows: [],
    TrendingTVshow: [],
    TvShowsDetails: {},
    page: 1,
}

export const TvShowsReducer = createSlice({ 
    name: 'TvShows',
    initialState,
    reducers: {
        saveTvShows: (state,action) => {
            state.TvShows = action.payload
        },
        saveTrendingTvShows: (state,action) => {
            state.TrendingTVshow = action.payload
        },
        saveTvShowsDetails: (state,action) => {
            state.TvShowsDetails = action.payload
        },
        changepage: (state, action) => {
            state.page += action.payload;
          },
    }
})

export const {saveTvShows,saveTrendingTvShows,changepage, saveTvShowsDetails} = TvShowsReducer.actions
export default TvShowsReducer.reducer