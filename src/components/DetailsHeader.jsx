import { Link } from "react-router-dom";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";



const DetailsHeader = ({ shazamSongId, artistArtwork, songData, title }) => {

  const { data } = useGetArtistDetailsQuery(shazamSongId);
  console.log(songData);
  console.log(data);


  return (

    < div className="relative w-full flex flex-col" >
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-32 h-28 mb-4" />
      <div className="absolute inset-0 flex items-center">
        <img alt="art" src={artistArtwork} width="54px" className="rounded-full -ml-2" />

        <div className="text-cyan-600 font-bold xl:text-3xl text-2xl ml-3">
          {title}
        </div>
      </div>
    </div >
  );
};

export default DetailsHeader;
