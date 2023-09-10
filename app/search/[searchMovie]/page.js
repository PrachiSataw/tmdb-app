"use client"
import styles from "@/app/Styles/SearchMovie.module.css"
import Nav from "@/components/Nav";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchMovie = ({params}) => {
    const router = useRouter()
    const [search, setsearch] = useState(params.searchMovie)
    const [searchData, setsearchData] = useState([])

    const searchMovieData = async () =>{
        try {
            const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=cb5b8941851804e0ea85baa6348e29b3`)
            setsearchData(data.results)
        } catch (error) {
            return error
        }
    }

    console.log(searchData);

    useEffect(() =>{
        searchMovieData()
    })

    const submitHandler = (e) => {
        e.preventDefault()
        router.push(`/search/${search}`)
    }

    function convertNumericToDate(numericDate) {
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


  return (
   <>
   <div className={styles.main}>
    <Nav />
    <form onSubmit={submitHandler} className={styles.searchForm} >
        <BiSearch className={styles.icon} />
        <input onChange={(e) => setsearch(e.target.value) } value={search} type="text"  placeholder="Search for a movie, tv show, person..." />
    </form>
    <div className={styles.results}>
        {searchData?.map((movie, index) => {
            return <div key={movie.id} className={styles.movieBox}>
                <div className={styles.left}>
                    <Link href={`/movie/${movie.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=cb5b8941851804e0ea85baa6348e29b3`} alt="" />
                    </Link>
                </div>
                <div className={styles.right}>
                    <h2>{movie.title}</h2>
                    <p>{convertNumericToDate(movie.release_date)}</p>
                    <small>{movie.overview}</small>
                </div>
            </div>
        })}
    </div>
   </div>
   </>
  )
}

export default SearchMovie