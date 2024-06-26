import { Link } from "react-router-dom";



const DetailsHeader = ({ artistData, }) => {


  return (

    < div className="relative w-full flex flex-col" >
      <div className="w-full bg-gradient-to-l  to-black sm:h-32 h-28 mb-4 rounded-2xl shadow-lg shadow-indigo-500/50" />
      <div className="absolute inset-0 flex items-center">
        {artistData.artistArtwork && <img alt="art" src={!artistData.artistArtwork?.artistAvatar ? artistData?.artistArtwork?.coverArt : artistData?.artistArtwork?.artistAvatar} width="64px" className="cursor-pointer rounded-full ml-2 shadow-lg shadow-indigo-500/50" />}
        {artistData?.[0]?.attributes && <img alt="art" src={artistData?.[0].attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')} width="64px" className="cursor-pointer rounded-full ml-2 shadow-lg shadow-indigo-500/50" />}
        <div className="text-xl ml-3 cursor-pointer">
          <p className="text-cyan-500 font-bold md:text-3xl ">{artistData.title}</p>
          <p className="text-gray-300 font-bold text-sm">{artistData.artist}</p>
          {artistData?.[0]?.attributes?.artistName && <p className="text-2xl font-bold text-[#c6c6f6]">{artistData?.[0]?.attributes?.artistName}</p>}
        </div>
      </div>
    </div >
  );
};

export default DetailsHeader;
