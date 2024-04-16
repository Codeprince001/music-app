import React from 'react';

const ArtistTopSongs = ({ artistData }) => {
  return (
    <div>
      <div className='mb-2 flex gap-5 items-center'>
        <img src={artistData?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')} className="w-20 h-20 rounded-xl" />
        <div>
          <p className='text-white text-lg font-medium'>{artistData?.attributes?.name}</p>
          <p className=' text-gray-300 font-bold text-sm mt-1'>{artistData?.attributes?.albumName}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistTopSongs;