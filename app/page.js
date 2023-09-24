"use client";

import Nav from "@/components/Nav"
import Link from 'next/link';
import styles from "./Styles/Homepage.module.css";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { removeerrors } from '@/store/Reducers/MovieReducer';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch} from "react-redux";
import { asyncGetPopularMovies, asyncGetTrendingMovies, asyncGetMoviesDetails } from '@/store/Actions/movieActions';
import {getAsyncTrendingTvShows} from '@/store/Actions/tvShowsAction';
import { Progress } from "@/components/ui/progress";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const page = () => {
  const [search, setsearch] = useState("")
  const {Movies, TrendingMovies, errors} = useSelector((state) => state.MovieReducer)
  const {TrendingTVshow} = useSelector((state) => state.TvShowsReducer)
  const dispatch = useDispatch();
  const router = useRouter()
  const [Flag, setFlag] = useState(0);
    // console.log(Movies);
    console.log(TrendingMovies);
    console.log(TrendingTVshow);
    // console.log(errors);
  
   if (errors.length > 0) {
    errors.map((e, i) => {
      toast.error(e);
    });
    dispatch(removeerrors());
   }

   useEffect(() => {
    dispatch(asyncGetTrendingMovies());
    dispatch(getAsyncTrendingTvShows());

   }, [TrendingMovies]);

   // convert numeric date into alphanumeric function starts

   function covertNumericToDate(numericDate) {
    // Parse the numeric date into a Date object
    const dateObj = new Date(numericDate);

    // Define arrays for month names and suffixes
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const suffixes = ["st", "nd", "rd", "th"];

    // Get the day, month, and year components
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    // Determine the day suffix (st, nd, rd, th)
    let suffix;
    if(day >= 11 && day <=13) {
      suffix = "th";
    } else {
      const index = Math.min(day % 10, 3);
      suffix = suffixes[index];
    }

    // Construct the alphanumeric date string
    const alphanumericDate = `${month} ${day}${suffix}, ${year}`;
    return alphanumericDate;
   }

   // function ends here
   const flagRef = useRef(0);
   const togglerDiv = useRef(null)
   const togglerText = useRef(null)

   let flag = 0
   const toggleHandler = () =>{
    setFlag(flag === 0 ? 1 : 0); 
    
    if(flagRef.current === 0) {
      flagRef.current = 1
      togglerDiv.current.style.width = "9vmax"
      togglerDiv.current.style.left = "48%"
      togglerText.current.textContent = "This Week"
    } else{
      flagRef.current = 0
      togglerDiv.current.style.width = "8vmax"
      togglerDiv.current.style.left = "0%"
      togglerText.current.textContent = "Today"
    }
   }

   const togglerWidth = flag === 0 ? '8vmax' : '9vmax';

  

     // search function
     const submitHandler = (e) => {
      e.preventDefault()
      setsearch("")
      router.push(`/search/${search}`)
     }

  return (
    <>
    <div className={styles.main}>
      <Nav />
        <div className="page1">
          <div className={styles.poster}>
            <div className={styles.overlay}>
            <h1 className={styles.welcome}>Welcome.</h1>
            <h4 className={styles.millions}>Millions of movies, TV shows and people to discover. Explore now.</h4>
             <div className={styles.search}>
              <form onSubmit={submitHandler}>
                <input 
                      onChange={(e) => setsearch(e.target.value) }
                      value={search}
                      type="text"
                      placeholder='Search for a movie,tv show' />
                    <button>Search</button>
              </form>
             </div>
            </div>
            <img className={styles.posterImg} src="https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/dKqa850uvbNSCaQCV4Im1XlzEtQ.jpg" alt="" />
          </div>
          <div className={styles.trendingBox}>
            <div className={styles.trending}>
              <h2>Trending Movies</h2>
              <div onClick={toggleHandler} className={styles.toggle}>
                <div ref={togglerDiv} className={styles.toggler} style={{ width: togglerWidth }}>
                  <h3 ref={togglerText}>{flag === 0 ? 'Today' : 'This Week'}</h3>
                </div>
                <p className={styles.today}>Today</p>
                <p className={styles.this}>This Week</p>
              </div>
            </div>
            <div className={styles.movies}>
              {TrendingMovies.map((movie, index)=>{
                return(
                  <div key={movie.id} className={styles.movieBox}>
                    <Link href={`/movie/${movie.id}`}>
                      <div className={styles.moviePoster}>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=cb5b8941851804e0ea85baa6348e29b3`} alt="" />
                        <div className={styles.vote} style={{width:50 , height: 50}}>
                          <CircularProgressbar 
                            value={Math.floor(movie.vote_average*10)}
                            text={`${Math.floor(movie.vote_average*10)}%`}
                            styles={buildStyles({
                              pathColor: `#fff, ${
                                Math.floor(movie.vote_average*10)/ 100
                              })`,
                              textColor:'#fff',
                              trailColor: '#d6d6d6',
                              backgroundColor: '#3e98c7'
                            })}
                          />
                            {/* {Math.floor(tvShows.vote_average*10)} <sup>%</sup> */}

                        </div>
                      </div>
                      <h1>{movie.title}</h1>
                    </Link>
                    <small>{covertNumericToDate(movie.release_date)}</small>
                    {/* <p>Video Available: ${movie.video ? "Yes" : "No"}</p> */}
                   
                  </div>
                )
              })}
            </div>

              <h2 className={styles.trendingTv}>Trending TvShows</h2>
            <div className={styles.movies}>
              {TrendingTVshow.map((tvShows, index)=>{
                return(
                  <div key={tvShows.id} className={styles.movieBox}>
                    <Link href={`/tvShow/${tvShows.id}`}>
                      <div className={styles.moviePoster}>
                        <img src={`https://image.tmdb.org/t/p/w500/${tvShows.poster_path}?api_key=cb5b8941851804e0ea85baa6348e29b3`} alt="" />
                        <div className={styles.vote} style={{width:50 , height: 50}}>
                          <CircularProgressbar 
                            value={Math.floor(tvShows.vote_average*10)}
                            text={`${Math.floor(tvShows.vote_average*10)}%`}
                            styles={buildStyles({
                              pathColor: `#fff, ${
                                Math.floor(tvShows.vote_average*10)/ 100
                              })`,
                              textColor:'#fff',
                              trailColor: '#d6d6d6',
                              backgroundColor: '#3e98c7'
                            })}
                          />
                            {/* {Math.floor(tvShows.vote_average*10)} <sup>%</sup> */}

                        </div>
                      </div>
                      <h1>{tvShows.name}</h1>
                    </Link>
                    <small>{covertNumericToDate(tvShows.first_air_date)}</small>
                    {/* <p>Video Available: ${movie.video ? "Yes" : "No"}</p> */}
                   
                  </div>
                )
              })}
            </div>
          </div>
        </div>

       
  
        <div className={styles.footer}>
        <div className={styles.left}>
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="The Movie Database" width={130} height={94} />
            <a href="/signup" className={styles.rounded}><h2>JOIN THE COMMUNITY</h2></a>
        </div>
        <div className={styles.right}>
            <div className={styles.columns}>
                <h3>THE BASICS</h3>
                <ul>
                <li>
                    <a href="#">About TMDB</a>
                </li>
                <li>
                    <a href="#">Contact Us</a>
                </li>
                <li>
                    <a href="#">Support Forums</a>
                </li>
                <li>
                    <a href="#">API</a>
                </li>
                <li>
                    <a href="#">System Status</a>
                </li>
                </ul>
            </div>

            <div className={styles.columns}>
                <h3>GET INVOLVED</h3>
                <ul>
                <li><a href="#">Contribution Bible</a></li>
                <li><a href="#">Add New Movie</a></li>
                <li><a href="#">Add New TV Show</a></li>
                </ul>
            </div>

            <div className={styles.columns}>
                <h3>COMMUNITY</h3>
                <ul>
                <li><a href="#">Guidelines</a></li>
                <li><a href="#">Discussions</a></li>
                <li><a href="#">Leaderboard</a></li>
                <li><a href="#">Twitter</a></li>
                </ul>
            </div>

            <div className={styles.columns}>
                <h3>LEGAL</h3>
                <ul>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">API Terms of Use</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">DMCA Takedown Request</a></li>
                </ul>
            </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default page;


// for pagination
{/* <div className='my-5 text-center paginate '>
      <button onClick={() => dispatch(changepage(-1))}>Previous</button>
      <span className='h1'>{page}</span>
      <button onClick={() => dispatch(changepage(1))}>Next</button>
    </div> */}