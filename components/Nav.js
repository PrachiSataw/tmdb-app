"use client"
import {BiPlusMedical} from "react-icons/bi";
import { TbBellFilled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiSearch } from "react-icons/hi";
import styles from "@/app/Styles/Nav.module.css";
import { useState } from "react";
import Link from "next/link";
import React from 'react';
import { useDispatch } from "react-redux";
import { changepage } from "@/store/Reducers/MovieReducer";

const Nav = () => {
  const [showMovieDropdown, setshowMovieDropdown] = useState(false);
  const [showTVDropdown, setShowTVDropdown] = useState(false);
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [selectedMovieOption, setselectedMovieOption] = useState('Popular');
  const [selectedTVOption, setSelectedTVOption] = useState("Popular");
  const [selectedPeopleOption, setSelectedPeopleOption] = useState("Option1");
  const [selectedMoreOption, setSelectedMoreOption] = useState("Option1");
  const dispatch = useDispatch()

  const handleMovieDropdownToggle = () => {
    setshowMovieDropdown((prevState) => !prevState);
    setShowTVDropdown(false); // Close TV dropdown when opening Movie dropdown
    setShowPeopleDropdown(false); // close People dropdown when opening Movie dropdown
    setShowMoreDropdown(false); // close More dropdown when opening Movie dropdown

  }

  const handleTVshowDropdownToggle = () => {
    setShowTVDropdown((prevState) => !prevState);
    setshowMovieDropdown(false); // Close Movie dropdown when opening TV dropdown
    setShowPeopleDropdown(false); // close People dropdown when opening TV dropdown
    setShowMoreDropdown(false); // close More dropdown when opening TV dropdown
  }

  const handlePeopleDropdownToggle = () => {
    setShowPeopleDropdown((prevState) => !prevState);
    setshowMovieDropdown(false); // Close Movie dropdown when opening people dropdown
    setShowTVDropdown(false); // close TV dropdown when opening people dropdown
    setShowMoreDropdown(false); // close More dropdown when opening people dropdown
  };

  const handleMoreDropdownToggle = () => {
    setShowMoreDropdown((prevState) => !prevState);
    setshowMovieDropdown(false); // Close Movie dropdown when opening More dropdown
    setShowTVDropdown(false); // close TV dropdown when opening More dropdown
    setShowPeopleDropdown(false); // close People dropdown when opening More dropdown
  };

  const handleMovieOptionChange = (event) => {
    setselectedMovieOption(event.target.value);
    setshowMovieDropdown(false); //close dropdown when clicked on a selected option
  }

  const handleTVOptionChange = (event) => {
    // setSelectedTVOption(event.target.value);
    setShowTVDropdown(false); //close TV dropdown when clicked on a selected option
  }

  const handlePeopleOptionChange = (event) => {
    setSelectedPeopleOption(event.target.value);
    setShowPeopleDropdown(false); // Close People dropdown when a People option is selected
  };

  const handleMoreOptionChange = (event) => {
    setSelectedMoreOption(event.target.value);
    setShowMoreDropdown(false); // Close More dropdown when a More option is selected
  };

  const pageHandler = () => {
    dispatch(changepage(1))
  }

  return (
    <>
    <div className={styles.nav}>
      <div className={styles.leftNav}>
        <Link href="/"><img className={styles.img}  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="" /></Link>
        <div className={styles.movie}>
          <p 
          onClick={handleMovieDropdownToggle}
           >Movies</p> 
          {showMovieDropdown && (
            <div className={styles.dropdown} value={selectedMovieOption} onChange={handleMovieOptionChange}>
              <Link onClick={pageHandler} href="/popular" value="Popular">Popular</Link>
              <Link onClick={pageHandler} href="/now_Playing" value="Now Playing">Now Playing</Link>
              <Link onClick={pageHandler} href="/upcoming" value="Upcoming">Upcoming</Link>
              <Link onClick={pageHandler} href="/top_rated" value="Top Rated">Top Rated</Link>
            </div>
          )}
        </div>
        <div className={styles.tv}>
             <p className={styles.p} 
             onClick={handleTVshowDropdownToggle}>TV Shows</p>
             {showTVDropdown && (
            <div className={styles.dropdown} value={selectedTVOption} onChange={handleTVOptionChange}>
              <Link onClick={pageHandler} href="/tv/popular" value="Popular">Popular</Link>
              <Link onClick={pageHandler} href="/tv/ariving_today" value="Now Playing">Arriving Today</Link>
              <Link onClick={pageHandler} href="/tv/on_the_air" value="Upcoming">On TV</Link>
              <Link onClick={pageHandler} href="/tv/top_rated" value="Top Rated">Top Rated</Link>
            </div>
          )}
        </div>
        <div className={styles.people}>
           <p className={styles.p} 
           onClick={handlePeopleDropdownToggle}>People</p>
           {showPeopleDropdown && (
            <div className={styles.dropdown} value={selectedPeopleOption} onChange={handlePeopleOptionChange}>
              <Link href="/people1" value="Option1">
                Popular People 
              </Link>
            </div>
          )}
        </div>
       <div className={styles.more}>
       <p className={styles.p} 
       onClick={handleMoreDropdownToggle}>More</p>
        {showMoreDropdown && (
            <div className={styles.dropdown} value={selectedMoreOption} onChange={handleMoreOptionChange}>
              <Link href="/more1" value="Option1">
                Discussions
              </Link>
              <Link href="/more2" value="Option2">
                Leaderboard
              </Link>
              <Link href="/more3" value="Option3">
                Support
              </Link>
              <Link href="/more4" value="Option4">
                API
              </Link>
            </div>
          )}
       </div>
      </div>
      <div className={styles.rightNav}>
        <BiPlusMedical className={styles.plus} />
        <div className={styles.en}>EN</div>
        <TbBellFilled className={styles.bell}/>
        <CgProfile className={styles.bell} />
        <HiSearch className={styles.search} />
      </div>
    </div>
    </>
  )
}

export default Nav