import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const { songid } = useParams();
  console.log(Number(songid));
  const { data: songDetailData, isFetching } = useGetSongDetailsQuery(Number(songid));
  const dispatch = useDispatch();
  const { setActiveSong, isPlaying } = useSelector((state) => state.player);
  console.log(songDetailData);
  const lyricsId = songDetailData?.resources?.[`shazam-songs`]?.[songid].relationships.lyrics?.data?.[0].id;
  const { resources } = songDetailData;

  if (isFetching || isLoading) return (<Loader />);
  if (isSuccess) return (console.log("fetchedsuccessful"));
  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId={""} songData={songDetailData} /> */}

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      </div>

      <div className="mt-5 w-[500px] m-auto">
        {
          songDetailData ? <p className="text-white text-1xl font-bold text-center">{resources.lyrics?.[lyricsId]?.attributes?.text}</p> : <p className="text-white text-3xl font-bold text-center">Sorry, No Lyrics</p>
        }
      </div>
    </div>
  );
};

export default SongDetails;
