import React from 'react';
import { Link } from 'react-router-dom';
import { noImg } from '../assets';

import PlayPause from './PlayPause';

const SongBar = ({ song, i, artistData, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {

  console.log(song.id);

  return (
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === song?.title ? 'bg-[#271c49]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        {song?.attributes && <img
          className="w-20 h-20 rounded-lg"
          src={song?.attributes?.artwork ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : noImg}
          alt={song?.title}
        />}
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistData ? (
            <Link to={`/songs/${song.id}`}>
              <p className="text-xl font-bold text-white">
                {song?.title}
              </p>
            </Link>
          ) : (
            <p className="text-md font-medium text-white">
              <Link to={`/songs/${song.id}`}>

                {song?.attributes?.title}
              </Link>
            </p>
          )}
          <p className="text-base text-gray-300 mt-1">
            {song ? song?.attributes?.artist : song?.subtitle}
          </p>
        </div>
      </div>
      {song
        ? (
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(song, i)}
          />
        )
        : null}
    </div>
  );
};

export default SongBar;