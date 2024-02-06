import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const LyricsApi = createApi({
  reducerPath: "lyricsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://genius-song-lyrics1.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', "9500246ee7msh8fb9b978b70c221p11feaejsnd77d981c4620");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSongLyrics: builder.query({
      query: (songid) => `"https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songid}`
    })
  })

});

export const { useGetSongLyricsQuery } = LyricsApi;