import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import ArtistTopSongs from "../components/ArtistTopSongs";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  console.log(artistId);
  const { data: artistDetailData, isFetching: fetchingArtistDetails } = useGetArtistDetailsQuery(artistId);
  const { activeSong, isPlaying } = useSelector((state) => state.player);


  if (fetchingArtistDetails) {
    <Loader title="Fetching" />;
  }

  return (
    <div className="flex flex-col relative">

      <DetailsHeader artistData={artistDetailData.data} />

      {artistDetailData.data.map((artistData => {
        return (
          <ArtistTopSongs artistData={artistData} />
        );
      }))}

    </div>
  );
};

export default SongDetails;