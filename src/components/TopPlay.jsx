import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";

import { playPause, setActiveSong } from "../redux/features/playerSlice";

import "swiper/css";
import "swiper/css/free-mode";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { noImg } from "../assets";


const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {



  return (
    <div className="w-full flex flex-row item-centre hover:bg-[#473e66] py-2 p-1 rounded-lg cursor-pointer mb-2 sm:pt-12:">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>

      <div className="flex-1 flex flex-row justify-between items-center">
        {song?.images?.background ?
          <img src={song?.images?.background} alt="artist image" className="w-20 h-20 rounded-lg mr-4" /> : <img src={noImg} alt={song?.title} className="w-20 h-20 rounded-lg mr-4" />
        }
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-lg from-neutral-600 text-white">
              {song.title}
            </p>
          </Link>
          <Link to={`/songs/${song?.artists[0].adamid}`}>
            <p className="text-base font-bold text-gray-300 mt-1">
              {song?.subtitle}
            </p>
          </Link>
        </div>
        <div className="mr-2">
          <PlayPause song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick} activeSong={activeSong} isPlaying={isPlaying} />
        </div>
      </div>

    </div>
  );
};

const TopPlay = () => {
  let artistInfo = [];
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const topPlays = data?.tracks?.slice(0, 5);

  return (
    <div className="mt-4 xl:mr-4">
      <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold txt-2xl">Top Charts</h2>
            <Link to="/top-charts"><p className="text-gray-200">see more...</p></Link>
          </div>
        </div>
      </div>

      <div className="mt-4 flex-col gap-1">
        {
          topPlays?.map((song, i) => {
            return (
              <TopChartCard song={song} i={i} key={song.key} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={() => handlePlayClick(song, i)} />
            );
          })

        }
      </div>

      <div className="w-full flex flex-col mt-8">


        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold txt-2xl">Top Artists</h2>
          <Link to="/top-charts"><p className="text-gray-200">see more...</p></Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={1}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="m-4 "
        >
          {
            topPlays?.map((song, i) => {
              return (
                <SwiperSlide key={song.key} style={{ width: "25%", height: "auto" }} className="shadow-sm rounded-full animate-slideright">
                  <Link to={""}>
                    {song?.images?.background ?
                      <img src={song?.images?.background} alt="artist image" className="w-[80px] rounded-full mr-2" /> : <img src={noImg} alt="artist image" className="w-[80px] rounded-full mr-4" />
                    }
                  </Link>
                </SwiperSlide>
              );
            })

          }
        </Swiper>
      </div>
    </div>
  );
};
export default TopPlay;
