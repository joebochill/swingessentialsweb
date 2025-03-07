import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../constants";
import { prepareHeaders } from "./utils/prepareHeaders";
import { ScoreRange, UserDataState } from "../../__types__";

export type UserDataChange = Omit<
  Partial<UserDataState>,
  "username" | "email" | "joined"
>;
type BasicUserDetailsApiResponse = {
  username: string;
  first: string;
  last: string;
  email: string;
  avatar: string;
};
export type Level2UserDetailsApiResponse = BasicUserDetailsApiResponse & {
  location: string;
  phone: string;
  goals: string;
  birthday: string;
  average: ScoreRange;
  joined: number;
  notify_new_lesson: 0 | 1;
  notify_marketing: 0 | 1;
  notify_newsletter: 0 | 1;
  notify_reminders: 0 | 1;
};

export const BLANK_USER: Level2UserDetailsApiResponse = {
  username: "",
  first: "",
  last: "",
  email: "",
  avatar: "",
  location: "",
  phone: "",
  goals: "",
  birthday: "",
  average: "150",
  joined: 0,
  notify_new_lesson: 0,
  notify_marketing: 0,
  notify_newsletter: 0,
  notify_reminders: 0,
};

// Define a service using a base URL and expected endpoints
export const userDetailsApi = createApi({
  reducerPath: "userDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders,
  }),
  tagTypes: ["userDetails"],
  endpoints: (builder) => ({
    getUserDetails: builder.query<Level2UserDetailsApiResponse, void>({
      providesTags: ["userDetails"],
      query: () => ({
        url: `user`,
        method: "GET",
        params: { detailLevel: 2 },
      }),
    }),
    updateUserDetails: builder.mutation<
      boolean,
      Partial<Level2UserDetailsApiResponse>
    >({
      query: (body) => ({
        url: `user`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["userDetails"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery, useUpdateUserDetailsMutation } =
  userDetailsApi;
