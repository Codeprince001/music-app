import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const Discover = () => {
  const genreTitle = "pop";
  const { data, isFetching, error, isSuccess } = useGetTopChartsQuery();
  console.log(data);

  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover</h2>
        <select
          key={genreTitle}
          onChange={() => { }}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {
            genres.map((genre) => <option>{genre.title}</option>)
          }
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start">
        {
          data?.tracks?.map((song, i) =>
            < SongCard key={song.key} songDetail={song} i={{ i }} />
          )
        }
      </div>
    </div>
  );
};

export default Discover;
