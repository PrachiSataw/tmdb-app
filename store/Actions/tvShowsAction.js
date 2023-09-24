import axios from "axios";
import { saveTvShows,  saveTvShowsDetails } from "../Reducers/TvShowsReducer";
import { adderrors, changepage } from "../Reducers/MovieReducer";
import { saveTrendingTvShows } from "../Reducers/TvShowsReducer";


export const getAsyncTrendingTvShows = () => async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=cb5b8941851804e0ea85baa6348e29b3`
      );
  
      const data = response.data; // Ensure 'data' is properly destructured
  
      dispatch(saveTrendingTvShows(data.results));
      console.log(data);
    } catch (error) {
      dispatch(adderrors(error.response?.data?.status_message || 'An error occurred'));
      console.error(error);
    }
  };

export const getAsyncTvShows = (click, page) => async(dispatch,getState) => {
    try {
        const {page} = getState().MovieReducer
        const {data} = await axios.get(
          `https://api.themoviedb.org/3/tv/${click}?api_key=cb5b8941851804e0ea85baa6348e29b3&page=${page}`
          )
        dispatch(saveTvShows(data.results))
        console.log(data)
    } catch (error) {
        dispatch(adderrors(error.response.data.status_message));
        console.log(error)
    }
}



export const asyncGetTvShowsDetails = (tvShowId) => async(dispatch,getState) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=cb5b8941851804e0ea85baa6348e29b3`)
        dispatch(saveTvShowsDetails(data))
    } catch (error) {
        dispatch(adderrors(error.response.data.status_message));
    }
}