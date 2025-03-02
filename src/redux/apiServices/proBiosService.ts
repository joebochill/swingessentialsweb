// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../constants";
import { prepareHeaders } from "./utils";

type ProBio = {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  imagePosition?: string;
  imageSize?: string;
};
type ProBiosAPIResponse = ProBio[];

// Define a service using a base URL and expected endpoints
export const proBiosApi = createApi({
  reducerPath: "proBiosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders,
  }),
  tagTypes: ["bios"],
  endpoints: (builder) => ({
    getProBios: builder.query<ProBiosAPIResponse, void>({
      query: () => `bios`,
      providesTags: ["bios"],
    }),
    addProBio: builder.mutation<void, Omit<ProBio, "id">>({
      query: (newProBio) => ({
        url: `bio`,
        method: "POST",
        body: newProBio,
      }),
      invalidatesTags: ["bios"],
    }),
    updateProBio: builder.mutation<void, ProBio>({
      query: (updatedProBio) => ({
        url: `bio`,
        method: "PUT",
        body: updatedProBio,
      }),
      invalidatesTags: ["bios"],
    }),
    removeProBio: builder.mutation<void, { id: string }>({
      query: (deletedBio) => ({
        url: `removebio`,
        method: "PUT",
        body: deletedBio,
      }),
      invalidatesTags: ["bios"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProBiosQuery,
  useAddProBioMutation,
  useUpdateProBioMutation,
  useRemoveProBioMutation,
} = proBiosApi;
