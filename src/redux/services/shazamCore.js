import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";

const songAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = songAdapter.getInitialState();


export const ShazamCoreApi = createApi({
  reducerPath: "shazamCorePath",
  baseQuery: fetchBaseQuery({
    baseUrl: "shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', "9500246ee7msh8fb9b978b70c221p11feaejsnd77d981c4620");
      return headers;
    },
  }),
  tagTypes: ["Songs"],
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (params) => `https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0`,
      transformedPosts: responseData => {
        const loadedSongs = responseData?.track?.map((song, index) => ({ ...song, id: index.toString() }));
        return songAdapter.setAll(initialState, loadedSongs);
      },
      providesTags: ["Songs"]
    }),
  })
});


export const { useGetTopChartsQuery } = ShazamCoreApi;