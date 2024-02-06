import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetSongDetailsQuery, useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const genreTitle = "pop";
  const { data, isFetching, error, isLoading } = useGetTopChartsQuery();


  if (isFetching) return <Loader isLoading={isLoading} title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col place-content-center">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10 ">
        <h2 className="font-bold text-3xl text-white">Discover</h2>
        <select
          key={{}}
          onChange={() => { }}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {
            genres.map((genre) => <option>{genre.title}</option>)
          }
        </select>
      </div>

      <div className="flex flex-wrap items-center  sm:justify-start">
        {
          data?.tracks?.map((song, i) =>
            < SongCard key={song.key} song={song} i={{ i }} isPlaying={isPlaying} activeSong={activeSong} data={data} />
          )
        }
      </div>
    </div>
  );
};

export default Discover;
