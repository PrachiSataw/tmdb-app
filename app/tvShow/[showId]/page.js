"use client"

import styles from "@/app/Styles/MovieDetails.module.css"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { TfiMenuAlt } from "react-icons/tfi";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidBookmark,BiSolidStar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux"
import Nav from "@/components/Nav"
import { asyncGetTvShowsDetails } from "@/store/Actions/tvShowsAction"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const page = (props) => {

  const [crew, setcrew] = useState([])
  const [cast, setcast] = useState([])

  const video = useRef(null)
  const iframeVideo = useRef(null)

  const {showId} = props.params
  const {TvShowsDetails} = useSelector((state) => state.TvShowsReducer)
  const trailer = TvShowsDetails.videos?.results.find((video) => video.type === "Trailer")
  console.log(TvShowsDetails);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(asyncGetTvShowsDetails(showId))
    castNcrew()
  },[])


  const imgErrorHandler = (e) => {
    e.target.style.display = "none"
  }

  // crew and cast data

  const castNcrew = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/tv/${showId}/credits?api_key=cb5b8941851804e0ea85baa6348e29b3`)
    setcrew(data.crew.filter((crew) => crew.known_for_department === "Creator"));
    setcast(data.cast)
    
  }

//   console.log(crew);


  
  
    
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <img src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${TvShowsDetails.backdrop_path}?api_key=cb5b8941851804e0ea85baa6348e29b3`} alt="" />
        <div className={styles.overlay}>
          <div className={styles.poster}>
            <img src={`https://image.tmdb.org/t/p/w500//${TvShowsDetails.poster_path}?api_key=cb5b8941851804e0ea85baa6348e29b3`} alt="" />
          </div>
          <div className={styles.movieDetails}>
            <h1>{TvShowsDetails.name || <Skeleton baseColor="#202020" highlightColor="#444"/>}</h1>
            <div className={styles.dates}>
              <p> {TvShowsDetails.genres?.map(elem=>elem.name).join(', ')}</p>
            </div>
            <div className={styles.userScore}>
              <div className={styles.vote}>
                {Math.floor(TvShowsDetails.vote_average*10)} <sup>%</sup>
              </div>
              <h3>User<br />Score</h3>
              <div className={styles.icons}>
                <TfiMenuAlt />
              </div>
              <div className={styles.icons}>
                <AiFillHeart />
              </div>
              <div className={styles.icons}>
                <BiSolidBookmark />
              </div>
              <div className={styles.icons}>
                <BiSolidStar />
              </div>

            </div>
            <div className={styles.tagline}>
              {TvShowsDetails.tagline}
            </div>
            <div className={styles.overview}>
              <h3>Overview</h3>
              <p>{TvShowsDetails.overview}</p>
            </div>
            <div className={styles.crew}>
              {
                crew.map((crew,index) =>{
                  return <div key={crew.id} className={styles.director}>
                    <h4>{crew.name}</h4>
                    <p>{crew.known_for_department}</p>
                  </div>
                })
              }
            </div>
          </div>
        </div>
        
      </div>
      <div className={styles.castNrevenue}>
        <div className={styles.cast}>
          <h2>Top Billed Cast</h2>
          <div className={styles.castBox}>

            {
              cast.map((casts, i) => {
                return <div key={cast.id} className={styles.castProfile}>
                  <div className={styles.top}>
                    <img onError={imgErrorHandler} src={`https://image.tmdb.org/t/p/w500/${casts.profile_path}?api_key=2a325f825de42d66968dbc58f1703c53`} alt="" />
                  </div>
                  <div className={styles.bottom}>
                    <h4>{casts.name}</h4>
                    <h5>{casts.character}</h5>
                  </div>
                </div>
              })
            }
            
          </div>
        </div>
        <div className={styles.revenue}>
          <div className={styles.original}>
            <h4>Original Name</h4>
            <p>{TvShowsDetails.original_name}</p>
          </div>
          <div className={styles.original}>
            <h4>Status</h4>
            <p>{TvShowsDetails.status}</p>
          </div>
          <div className={styles.original}>
            <h4>Network</h4>
            <div style={{display: "flex", alignItems: "center", gap: "10px", marginTop: "10px"}} className="logos">
                {TvShowsDetails.networks?.map((logos,idx) => {
                    return <img key={idx} height={30} src={`https://image.tmdb.org/t/p/w500//${logos.logo_path}?api_key=2a325f825de42d66968dbc58f1703c53`} alt="" />
                })}
            </div>
          </div>
          <div className={styles.original}>
            <h4>Type</h4>
            <p>{TvShowsDetails.type}</p>
          </div>
        </div>
      </div>

      
    </>
  )
}

export default page