import SongBar from "./SongBar";
import { useGetSongRelatedQuery } from "../redux/services/shazamCore";
import Loader from "./Loader";


const RelatedSongs = ({ activeSong,
  handlePauseClick,
  handlePlayClick, isPlaying, artistData }) => {


  console.log(artistData.relatedSongId);
  const { data, isLoading } = useGetSongRelatedQuery("track-similarities-id-668834911");


  if (isLoading) return (<Loader title="Loading related song" />);
  const relatedSongs = Object.values(data?.resources?.["shazam-songs"]);

  return (

    <div className="flex flex-col mt-6">
      <h1 className="font-bold text-2xl text-white sticky top-0">Related Songs</h1>

      <div className="mt-6 w-full flex flex-col">
        {relatedSongs.map((song, i) => {
          return <SongBar song={song} isPlaying={isPlaying} i={i} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} artistData={artistData} />;
        })}
      </div>

    </div>
  );
};

export default RelatedSongs;
