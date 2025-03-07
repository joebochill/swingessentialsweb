// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../constants";
import { prepareHeaders } from "./utils/prepareHeaders";

export type TipDetails = {
  id: number;
  date: string;
  title: string;
  video: string;
  comments: string;
};
export type TipDetailsWithYear = TipDetails & {
  year: number;
};
// type ProBio = {
//   id: string;
//   name: string;
//   title: string;
//   bio: string;
//   image: string;
//   imagePosition?: string;
//   imageSize?: string;
// };
// type ProBiosAPIResponse = ProBio[];

// Define a service using a base URL and expected endpoints
export const tipsApi = createApi({
  reducerPath: "tipsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders,
  }),
  tagTypes: ["tips"],
  endpoints: (builder) => ({
    getTips: builder.query<TipDetailsWithYear[], void>({
      query: () => `tips`,
      providesTags: ["tips"],
      transformResponse: (response: TipDetails[]) => {
        return response.map((tip) => {
          return {
            ...tip,
            year: new Date(tip.date).getFullYear(),
          };
        });
      },
    }),
    getTipsByYear: builder.query<TipDetailsWithYear[], string | number>({
      query: (year) => `tips/year/${year}`,
      providesTags: ["tips"],
      transformResponse: (response: TipDetails[]) => {
        return response.map((tip) => {
          return {
            ...tip,
            year: new Date(tip.date).getFullYear(),
          };
        });
      },
    }),
    getTipById: builder.query<TipDetails, string | number>({
      query: (id) => `tips/${id}`,
      // providesTags: ["tips"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTipsQuery, useGetTipsByYearQuery, useGetTipByIdQuery } =
  tipsApi;
