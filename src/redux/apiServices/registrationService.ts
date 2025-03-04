import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { /*ASYNC_PREFIX, AUTH,*/ ASYNC_PREFIX, BASEURL } from "../../constants";
// import { Credentials } from "../../__types__";
// import {
//   clearToken,
//   incrementLoginFailures,
//   setToken,
// } from "../slices/authSlice";
// import { loadUserData } from "../thunks";
import { prepareHeaders } from "./utils/prepareHeaders";
import { setToken } from "../slices/authSlice";
import { loadUserData } from "../thunks";
import { storeToken } from "./utils/storeToken";

export type UserRegistrationDetails = {
  username: string;
  email: string;
  password: string;
  heard: string;
};

// type VerifyEmailRequestBody = {
//   type: 'email',
//   code: code
// }

const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    checkUsernameAvailability: builder.mutation<boolean, string>({
      query: (username) => ({
        url: "/checkUser",
        method: "GET",
        params: { username },
      }),
      transformResponse: (response: { available: boolean }): boolean => {
        return response.available;
      },
    }),
    checkEmailAvailability: builder.mutation<boolean, string>({
      query: (email) => ({
        url: "/checkEmail",
        method: "GET",
        params: { email },
      }),
      transformResponse: (response: { available: boolean }): boolean => {
        return response.available;
      },
    }),
    createNewUserAccount: builder.mutation<boolean, UserRegistrationDetails>({
      query: (details) => ({
        url: "/user",
        method: "PUT",
        body: details,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          storeToken(meta, dispatch);
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
      transformResponse: () => {
        return true;
      },
      transformErrorResponse: () => {
        return false;
      },
    }),
    verifyUserEmail: builder.mutation<boolean, string>({
      query: (code) => ({
        url: "/verify",
        method: "PUT",
        body: {
          type: "email",
          code: code,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          storeToken(meta, dispatch);
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
      transformResponse: () => {
        return true;
      },
      transformErrorResponse: (_response, meta): string => {
        const code = meta?.response?.headers.get("Error") ?? "";
        let message = "";
        switch (code) {
          case "400302":
            message =
              "Oops! Your verification link is invalid. Please check your registration email and try again. If you continue to have problems, please contact us.";
            break;
          case "400303":
            message =
              "Your verification link has expired. You will need to re-register.";
            break;
          case "400304":
          case "-1":
            message =
              "Your your email address has already been verified. Sign in to view your account.";
            break;
          default:
            message = `Unknown Error: ${code || ""}`;
        }
        return message;
      },
    }),
  }),
});

export const {
  useCheckUsernameAvailabilityMutation,
  useCheckEmailAvailabilityMutation,
  useCreateNewUserAccountMutation,
  useVerifyUserEmailMutation,
} = registrationApi;
export default registrationApi;
