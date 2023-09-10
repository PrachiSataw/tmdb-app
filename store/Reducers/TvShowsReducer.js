import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TvShows: [],
    TrendingTVshow: [],
    TvShowsDetails: {}
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
        }
    }
})

export const {saveTvShows,saveTvShowsDetails} = TvShowsReducer.actions
export default TvShowsReducer.reducer