import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { ShazamCoreApi } from "../redux/services/shazamCore";
import { useEffect, useState } from "react";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const [songDetailData, setSongDetailData] = useState();
  const [data, setData] = useState();
  const [lyricsId, setLyricsId] = useState();
  const [artistData, setArtistData] = useState({});
  const { activeSong, isPlaying } = useSelector((state) => state.player);



  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };


  useEffect(() => {
    let Mounted = false;
    dispatch(ShazamCoreApi.endpoints.getSongDetails.initiate(songid), { forceRefetch: true }).unwrap()
      .then(result => {
        setData(result);
        setSongDetailData(result);
        // get song lyrics id from fetched data to access song lyrics by id
        setLyricsId(result?.resources?.[`shazam-songs`]?.[songid].relationships?.lyrics?.data[0].id);

        setArtistData({ ...artistData, relatedSongId: result?.resources?.[`shazam-songs`]?.[songid].relationships?.["related-tracks"]?.data[0].id, artist: result?.resources?.[`shazam-songs`]?.[songid].attributes?.artist, title: result?.resources?.[`shazam-songs`]?.[songid].attributes?.title, artistArtwork: result?.resources?.[`shazam-songs`]?.[songid].attributes?.images, });
      }).catch(error => {
        console.log(error);
      });

    return () => {
      Mounted = false;
    };
  }, [dispatch, songid]);

  console.log(artistData);



  return (
    <div className="flex flex-col relative">
      <div className="sticky top-0 z-10">
        <DetailsHeader songData={songDetailData} songid={songid} artistData={artistData} />
      </div>

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      </div>

      <div className="w-[500px] m-auto">
        {
          songDetailData ? <p className="text-white text-1xl font-bold text-center">{songDetailData?.resources?.lyrics?.[lyricsId]?.attributes?.text.map((line, index) => {
            return <p key={index}>{line}</p>;
          })}</p>
            : <p className="text-white text-3xl font-bold text-center">No Lyrics</p>
        }
      </div>

      {
        Object.keys(artistData).length > 0 ?
          <RelatedSongs artistData={artistData} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} />
          : "No Related Songs"
      }
    </div>
  );
};

export default SongDetails;