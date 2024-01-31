import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { music } from "../assets";


const SongCard = ({ song, i, isPlaying, activeSong, data }) => {

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    < div className="flex flex-col w-[250px] p-4 bg-white/5 rounded-lg cursor-pointer m-4 backdrop-blur-sm animate-slideup">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center  group-hover:flex ${activeSong?.title === song?.title ? "flex hover:bg-black/50" : "hidden"}`}>
          <PlayPause song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick} activeSong={activeSong} isPlaying={isPlaying} />
        </div>
        <img alt="song_img" src={song.images?.coverart ? song.images?.coverart : music} className="h-full w-full" />
      </div>

      <div className="text-white mt-4 flex flex-col">
        <p className="truncate text-md"><Link to={`/song/${song?.key}`}>{song?.title}</Link></p>
        <p className="truncate text-gray-300 text-sm"><Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : "/top-artists"}>{song?.subtitle}</Link></p>

      </div>
    </div >
  );
};
export default SongCard;
