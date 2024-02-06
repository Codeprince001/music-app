import { Link } from "react-router-dom";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";



const DetailsHeader = ({ artistId, artistData, songData }) => {


  return (

    < div className="relative w-full flex flex-col" >
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img alt="art" src={songData} />
      </div>
    </div >
  );
};

export default DetailsHeader;
