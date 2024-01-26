import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { music } from "../assets";


const SongCard = ({ songDetail, i }) => {

  const activeSong = "Test";

  const handlePlayClick = () => {

  };

  const handlePauseClick = () => {

  };

  return (
    < div className="flex flex-col w-[250px] p-4 bg-white/5 rounded-lg cursor-pointer m-4 backdrop-blur-sm animate-slideup">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center  group-hover:flex ${activeSong?.title === songDetail?.title ? "flex hover:bg-black/50" : "hidden"}`}>
          <PlayPause song={songDetail} handlePause={handlePauseClick} handlePlay={handlePlayClick} />
        </div>
        <img alt="song_img" src={songDetail.images?.coverart ? songDetail.images?.coverart : music} className="h-full w-full" />
      </div>

      <div className="text-white mt-4 flex flex-col">
        <p className="text-md"><Link>{songDetail?.title}</Link></p>
        <p className="text-gray-300 text-sm"><Link>{songDetail?.subtitle}</Link></p>

      </div>
    </div >
  );
};
export default SongCard;
