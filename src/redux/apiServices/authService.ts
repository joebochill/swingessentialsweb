import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ASYNC_PREFIX, AUTH, BASEURL } from "../../constants";
import { Credentials } from "../../__types__";
import {
  clearToken,
  incrementLoginFailures,
  setToken,
} from "../slices/authSlice";
import { loadUserData } from "../thunks";
import { changePassword } from "../actions/auth-actions";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<boolean, Credentials>({
      query: (credentials) => ({
        url: "/login",
        method: "GET",
        headers: {
          [AUTH]: `Basic ${btoa(credentials.username)}.${btoa(
            credentials.password
          )}`,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          const token = meta?.response?.headers.get("Token") ?? "";
          if (token) {
            localStorage.setItem(`${ASYNC_PREFIX}token`, token);
            dispatch(setToken(token));
            dispatch(loadUserData());
          }
        } catch (error) {
          console.error("Login failed:", error);
          dispatch(incrementLoginFailures());
        }
      },
      transformResponse: () => {
        return true;
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => {
        // TODO
        console.error("Login failed:", response.status);
        return false;
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
        headers: {
          [AUTH]: `Bearer ${localStorage.getItem(`${ASYNC_PREFIX}token`)}`,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          dispatch(clearToken());
          localStorage.removeItem(`${ASYNC_PREFIX}token`);
        }
      },
    }),
    checkRegistrationToken: builder.mutation<void, void>({
      query: () => ({
        url: "/checkToken",
        method: "GET",
        headers: {
          [AUTH]: `Bearer ${localStorage.getItem(`${ASYNC_PREFIX}token`)}`,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          const token = meta?.response?.headers.get("Token") ?? "";
          if (token) {
            localStorage.setItem(`${ASYNC_PREFIX}token`, token);
            dispatch(setToken(token));
          }
        } catch (error) {
          console.error("Check token failed:", error);
        }
      },
    }),
    refreshToken: builder.mutation<void, void>({
      query: () => ({
        url: "/refresh",
        method: "GET",
        headers: {
          [AUTH]: `Bearer ${localStorage.getItem(`${ASYNC_PREFIX}token`)}`,
        },
      }),
      // TODO Make this general and reusable logic
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          const token = meta?.response?.headers.get("Token") ?? "";
          if (token) {
            localStorage.setItem(`${ASYNC_PREFIX}token`, token);
            dispatch(setToken(token));
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    sendResetPasswordEmail: builder.mutation<void, string>({
      query: (email) => ({
        url: "/reset",
        method: "PUT",
        body: { email },
      }),
    }),
    verifyResetPasswordCode: builder.mutation<{username: string, auth: string}, string>({
      query: (code) => ({
        url: "/verify",
        method: "PUT",
        body: {
          type: "reset",
          code,
        },
      }),
      // transformResponse: () => {
      //   return {};
      // },
      transformErrorResponse: (_response, meta) => {
        const code = meta?.response?.headers.get("Error") ?? "";
        let message = "";

        switch (code) {
          case "400300":
            message =
              "Oops! Your reset password link is invalid or may have already been used. Please check the link in your email and try again. If you continue to have problems, please contact us.";
            break;
          case "400301":
            message =
              "Your reset password link has expired. You will need to re-request a password reset.";
            break;
          case "-1":
          default:
            message = `Unknown Error: ${code || ""}`;
        }
        return message;
      },
    }),
    resetPassword: builder.mutation<
      boolean,
      { token: string; password: string }
    >({
      query: ({ password, token }) => ({
        url: "/credentials",
        method: "PUT",
        headers: {
          [AUTH]: `Bearer ${token}`,
        },
        body: {
          password,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          const token = meta?.response?.headers.get("Token") ?? "";
          if (token) {
            localStorage.setItem(`${ASYNC_PREFIX}token`, token);
            dispatch(setToken(token));
            dispatch(loadUserData());
          }
        } catch (error) {
          console.error("Reset Password failed:", error);
        }
      },
      transformResponse: () => {
        return true;
      },
      transformErrorResponse: (_response, meta) => {
        const code = meta?.response?.headers.get("Error") ?? "";
        let message = "";

        switch (code) {
          default:
            message = `Failed to change your password. Please try again later. If the problem persists, please contact us.`;
        }
        return message;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useSendResetPasswordEmailMutation,
  useCheckRegistrationTokenMutation,
  useVerifyResetPasswordCodeMutation,
  useResetPasswordMutation,
} = authApi;
export default authApi;
