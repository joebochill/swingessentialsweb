// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../constants";
import { prepareHeaders } from "./utils/prepareHeaders";
import { UserDataState } from "../../__types__";
import { setUserDetails } from "../slices/userDetailsSlice";

export type UserDataChange = Omit<
  Partial<UserDataState>,
  "username" | "email" | "joined"
>;
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
  };
};

// Define a service using a base URL and expected endpoints
export const userDetailsApi = createApi({
  reducerPath: "userDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.mutation<UserDetailsApiResponse, void>({
      query: () => `user`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { first_name, last_name, ...other } = data.personal;
          const newData = {
            ...other,
            firstName: first_name,
            lastName: last_name,
          } as UserDataState;

          dispatch(setUserDetails(newData));
        } catch (error) {
          console.error("Load User Details Failed:", error);
        }
      },
    }),
    updateUserDetails: builder.mutation<boolean, UserDataChange>({
      query: (body) => ({
        url: `details`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUserDetails(arg));
        } catch (error) {
          console.error("Update User Details Failed:", error);
        }
      },
      transformResponse: () => {
        return true;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsMutation, useUpdateUserDetailsMutation } =
  userDetailsApi;
