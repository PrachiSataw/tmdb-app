"use client";
import { Tooltip, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { CircularProgress } from "@nextui-org/react";
import { AiOutlineMenuFold, AiOutlineStar } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BsBookmark } from "react-icons/bs";

import { BsPlayFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const page = ({ params }) => {
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  const getDetailsOfMovie = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=03f1548b65a603b16ff790d32bce2275&append_to_response=videos&append_to_response=credits`
      );
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (movie === null) getDetailsOfMovie();
  }, []);

  useEffect(() => {
    const trailerIndex = movie?.videos?.results?.findIndex(
      (element) => element.type === "Trailer"
    );

    const trailerURL = `https://www.youtube.com/watch?v=${
      movie?.videos?.results[trailerIndex || 0]?.key
    }`;
    setTrailer(trailerURL);
  }, [movie]);

  // let h = String((movie?.runtime / 60).toFixed(1)).split(".")[0];
  // let m = String((movie?.runtime / 60).toFixed(1)).split(".")[1];

  // // let m = lol.

  // console.log("thissss", `${h}h,${m}m`);

  return (
    <>
      

      <div
        className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
          showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
        }`}
      >
        <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
          <span className="font-semibold">
            ..
          </span>
          <div
            className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
            onClick={() => setShowPlayer(false)}
          >
            <IoMdClose className="h-10 w-10 text-white font-bold" />
          </div>
        </div>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={trailer}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            controls={false}
            playsinline={true}
            playing={showPlayer}
          />
        </div>

        
      </div>
    </>
  );
};

export default page;
