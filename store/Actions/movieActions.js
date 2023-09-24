import axios from "axios";
import { saveMovies,saveTrendingMovies,saveMovieDetails,adderrors,changepage} from "../Reducers/MovieReducer";


export const asyncGetMovies = (accordingToClick) => async (dispatch, getState) => {
   
    try {
        const { page } = getState().MovieReducer;
        const { data } = await axios.get( 
             `https://api.themoviedb.org/3/movie/${accordingToClick}?api_key=cb5b8941851804e0ea85baa6348e29b3&page=${page}`
        )
        dispatch(saveMovies(data.results));
        console.log(data);
    } catch(error) {
        dispatch(adderrors(error.response.data.status_message));
        console.log(error);
    }
};

export const asyncGetTrendingMovies = () => async (dispatch, getState) =>{
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=cb5b8941851804e0ea85baa6348e29b3`)

        dispatch(saveTrendingMovies(data.results))
        // console.log(data)
    } catch (error) {
        dispatch(adderrors(error.response.data.status_message));
    }
}


export const asyncGetMoviesDetails = (movie_id) => async (dispatch,getState) => {
    try {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie_id}?api_key=cb5b8941851804e0ea85baa6348e29b3&append_to_response=videos`
            )
        console.log("API Response Data:", data); // Add this line
        dispatch(saveMovieDetails(data))
    } catch (error) {
        dispatch(adderrors(error.response.data.status_message));
    }
}