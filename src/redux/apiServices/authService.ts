import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ASYNC_PREFIX, AUTH, BASEURL } from "../../constants";
import { Credentials, UserRole } from "../../__types__";
import { clearToken, incrementLoginFailures } from "../slices/authSlice";
// import { loadUserData } from "../thunks";
import { storeToken } from "./utils/storeToken";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<void, Credentials>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          [AUTH]: `Basic ${btoa(credentials.username)}.${btoa(
            credentials.password
          )}`,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          storeToken(meta, dispatch);
        } catch (error) {
          console.error("Login failed:", error);
          dispatch(incrementLoginFailures());
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
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
    getRole: builder.mutation<UserRole, void>({
      query: () => ({
        url: "auth/role",
        method: "GET",
        headers: {
          [AUTH]: `Bearer ${localStorage.getItem(`${ASYNC_PREFIX}token`)}`,
        },
      }),
      transformResponse: (response: { role: UserRole }) => {
        return response.role;
      },
    }),
    refreshToken: builder.mutation<void, void>({
      query: () => ({
        url: "auth/refresh-token",
        method: "post",
        headers: {
          [AUTH]: `Bearer ${localStorage.getItem(`${ASYNC_PREFIX}token`)}`,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          storeToken(meta, dispatch, false);
        } catch (error) {
          console.error("Refresh token failed:", error);
        }
      },
    }),
    // TODO Fix the below
    sendResetPasswordEmail: builder.mutation<void, string>({
      query: (email) => ({
        url: "/reset",
        method: "PUT",
        body: { email },
      }),
    }),
    verifyResetPasswordCode: builder.mutation<
      { username: string; auth: string },
      string
    >({
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
          storeToken(meta, dispatch);
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
    verifyPassword: builder.mutation<boolean, string>({
      query: (password) => ({
        url: "/validate",
        method: "PUT",
        headers: {
          [AUTH]: `Bearer ${localStorage.getItem(`${ASYNC_PREFIX}token`)}`,
        },
        body: {
          password,
        },
      }),
      transformResponse: () => {
        return true;
      },
    }),
    changePassword: builder.mutation<boolean, string>({
      query: (password) => ({
        url: "/credentials",
        method: "PUT",
        headers: {
          [AUTH]: `Bearer ${localStorage.getItem(`${ASYNC_PREFIX}token`)}`,
        },
        body: {
          password,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          storeToken(meta, dispatch);
        } catch (error) {
          console.error("Change Password failed:", error);
        }
      },
      transformResponse: () => {
        return true;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetRoleMutation,

  useSendResetPasswordEmailMutation,
  // useCheckRegistrationTokenMutation,
  useVerifyResetPasswordCodeMutation,
  useResetPasswordMutation,
  useVerifyPasswordMutation,
  useChangePasswordMutation,
} = authApi;
export default authApi;
