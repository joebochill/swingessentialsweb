// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../constants";
import { prepareHeaders } from "./utils/prepareHeaders";
import { use } from "react";
import { useAsyncValue } from "react-router-dom";

export type UserNotificationSettings = {
  notify_new_lessons: boolean;
  notify_marketing: boolean;
  notify_newsletter: boolean;
  notify_reminders: boolean;
};
type UserSettingsResponse = {
  avatar: string;
  handed: "left" | "right";
  subbed: boolean;
  notifications: {
    lessons: boolean;
    marketing: boolean;
    newsletter: boolean;
    reminders: boolean;
  };
  camera: {
    delay: number;
    duration: number;
    overlay: boolean;
  };
};

// Define a service using a base URL and expected endpoints
export const userSettingsApi = createApi({
  reducerPath: "userSettingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders,
  }),
  tagTypes: ["settings"],
  endpoints: (builder) => ({
    getUserSettings: builder.query<UserSettingsResponse, void>({
      query: () => `/settings`,
      providesTags: ["settings"],
    }),
    changeUserAvatar: builder.mutation<
      UserSettingsResponse,
      { avatar: string; useAvatar: boolean }
    >({
      query: ({ avatar, useAvatar }) => ({
        url: `/avatar`,
        method: "POST",
        body: { avatar, useAvatar: useAvatar ? 1 : 0 },
      }),
      invalidatesTags: ["settings"],
    }),
    updateUserNotifications: builder.mutation<
      boolean,
      UserNotificationSettings
    >({
      query: (body) => ({
        url: `settings`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserSettingsQuery, useChangeUserAvatarMutation, useUpdateUserNotificationsMutation } =
  userSettingsApi;
