import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { ShazamCoreApi, useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const [songDetailData, setSongDetailData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [lyricsId, setLyricsId] = useState();
  const [shazamSongId, setShazamSongId] = useState();
  const { setActiveSong, isPlaying } = useSelector((state) => state.player);


  useEffect(() => {
    let Mounted = false;
    dispatch(ShazamCoreApi.endpoints.getSongDetails.initiate(songid), { forceRefetch: true }).unwrap()
      .then(result => {
        setIsLoading(true);
        setSongDetailData(result);
        setLyricsId(result?.resources?.[`shazam-songs`]?.[songid].relationships?.lyrics?.data[0].id);
        setSongDetailData(result?.resources?.[`shazam-songs`]?.[songid].relationships?.songs?.data[0].id);
      }).catch(error => {
        console.log(error);
        setIsLoading(false);
      });

    return () => {
      Mounted = false;
    };
  }, [dispatch, songid]);

  console.log(shazamSongId);


  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId={""} songData={songDetailData} songid={songid} songDetailId={shazamSongId} /> */}

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      </div>

      <div className="mt-5 w-[500px] m-auto">
        {
          songDetailData && <p className="text-white text-1xl font-bold text-center">{songDetailData?.resources?.lyrics?.[lyricsId]?.attributes?.text.join(" \n ")}</p>
        }
      </div>
    </div>
  );
};

export default SongDetails;