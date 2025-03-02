// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../constants";
import { prepareHeaders } from "./utils";

type UserDetailsApiResponse = {
  personal: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    location: string;
    phone: string;
    goals: string;
    birthday: string;
    average: string;
    joined: number;
  }
}

// Define a service using a base URL and expected endpoints
export const userSettingsApi = createApi({
  reducerPath: "userSettingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getUserSettings: builder.query<any, void>({
      query: () => `settings`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserSettingsQuery } = userSettingsApi;
