"use client";

import React from 'react'
import styles from "@/app/Styles/Movies.module.css"
import Nav from '@/components/Nav';
import { changepage } from '@/store/Reducers/TvShowsReducer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from 'react-redux';
// import InfiniteScroll from "react-infinite-scroll-component";
import { getAsyncTvShows } from "@/store/Actions/tvShowsAction";
import { data } from 'autoprefixer';

const TvPage = ({params}) => {
    const [click, setclick] = useState(params.popular)
    console.log(params.popular);
    const {TvShows, page} = useSelector((state) => state.TvShowsReducer) || { TvShows: [] };
    console.log(TvShows);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getAsyncTvShows(params.popular, 1));
        // setclick(params.popular)
    }, [TvShows,page])
    console.log(TvShows)


    function convertNumericToDate(numericDate) {
        // Parse the numeric date into a Date object
        const dateObj = new Date(numericDate);
      
        // Define arrays for month names and suffixes
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
      
        const suffixes = ["st", "nd", "rd", "th"];
      
        // Get the day, month, and year components
        const day = dateObj.getDate();
        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();
      
        // Determine the day suffix (st, nd, rd, th)
        let suffix;
        if (day >= 11 && day <= 13) {
          suffix = "th";
        } else {
          const index = Math.min(day % 10, 3);
          suffix = suffixes[index];
        }
      
        // Construct the alphanumeric date string
        const alphanumericDate = `${month} ${day}${suffix}, ${year}`;
        return alphanumericDate;
      }

      const handlePageClick = (e) => {
        dispatch(changepage((e.selected + 1)))
      }

  return (
    <>
    <div className={styles.main}>
        <Nav /> 
        <div className={styles.container}>
        {TvShows ? (
               TvShows.map((tvShows, index) => (
              <div key={tvShows.id} className={styles.card}>
              <Link href={`/tvShow/${tvShows.id}`}>
             <div className={styles.movieImage}>
             <img
              src={`https://image.tmdb.org/t/p/w500//${tvShows.poster_path}?api_key=cb5b8941851804e0ea85baa6348e29b3`}
              alt=""
            />
             </div>
            </Link>
        <div className={styles.movieDetails}>
          <Link href={`/tvShow/${tvShows.id}`}>
            <h3>{tvShows.name}</h3>
          </Link>
          <p>{convertNumericToDate(tvShows.first_air_date)}</p>
        </div>
      </div>
      ))
    ) : (
    <p>Loading TV shows...</p>
    )}
    </div> 
        <ReactPaginate
        className={styles.pagination}
        activeClassName={styles.selected}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={10}
        previousLabel="< previous"
      />  
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
    </>
  )
}

export default TvPage



// {TvShows.map((tvShows,index) => {
//     return <div key={tvShows.id} className={styles.card}>
//         <Link href={`/tvShow/${tvShows.id}`}>
//             <div className={styles.movieImage}>
//                 <img src={`https://image.tmdb.org/t/p/w500//${tvShows.poster_path}?api_key=cb5b8941851804e0ea85baa6348e29b3`} alt="" />
//             </div>
//         </Link>
//         <div className={styles.movieDetails}>
//             <Link href={`/tvShow/${tvShows.id}`}><h3>{tvShows.name}</h3></Link>
//             <p>{convertNumericToDate(tvShows.first_air_date)}</p>
//         </div>
//     </div>
//   })}