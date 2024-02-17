import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";

const songAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = songAdapter.getInitialState(
  {
    ids: JSON.parse(localStorage.getItem("songs")) || [],
    entities: {},
  }
);

export const ShazamCoreApi = createApi({
  reducerPath: "shazamCorePath",
  baseQuery: fetchBaseQuery({
    baseUrl: "shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', "865ca02b23mshb0fdf1369d78fe0p13125cjsnf6fc938bc736");
      return headers;
    },
  }),
  tagTypes: ["Songs"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => `https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0`,
      transformedPosts: responseData => {
        const loadedSongs = responseData?.track?.map((song, index) => ({ ...song, id: index.toString() }));
        const lcs = localStorage.setItem("songs", JSON.stringify({ ids: songAdapter.getSelectors().selectIds(loadedSongs) }));
        return songAdapter.setAll(initialState, loadedSongs);
      },
      providesTags: ["Songs"]
    }),
    getSongDetails: builder.query({
      query: (songid) => `https://shazam.p.rapidapi.com/shazam-songs/get-details?id=${songid}`
    }),
    getSongRelated: builder.query({
      query: (songid) => `https://shazam.p.rapidapi.com/shazam-songs/list-similarities?id=${songid}`
    })
  })
});


export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery } = ShazamCoreApi;