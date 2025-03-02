import { createAsyncThunk } from "@reduxjs/toolkit";
import { userDetailsApi } from "../apiServices/userDetailsService";
import { setUserDetails } from "../slices/userDetailsSlice";
import { UserDataState } from "../../__types__";
import { ASYNC_PREFIX } from "../../constants";
import { setToken } from "../slices/authSlice";

export const loadUserData = createAsyncThunk(
  "auth/loadUserData",
  async (_, { dispatch, getState }) => {
    try {
      // dispatch(loadLessons());
      // dispatch(loadCredits());
      // dispatch(loadUserSettings());
      const { data } = await dispatch(
        userDetailsApi.endpoints.getUserDetails.initiate()
      );
      if (data) {
        const { first_name, last_name, ...other } = data.personal;
        const newData = {
          ...other,
          firstName: first_name,
          lastName: last_name,
        } as UserDataState;

        dispatch(setUserDetails(newData));
      }
    } catch (error) {
      // TODO
      console.log("Error loading data after login:", error);
    }
  }
);

export const initializeData = createAsyncThunk(
  "app/initializeData",
  async (_, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem(`${ASYNC_PREFIX}token`);

      // If the user is still logged in when the application loads
      if (token) {
        dispatch(setToken(token));
        dispatch(loadUserData());
      }
      // dispatch(loadTips());
      // dispatch(loadBlogs());
      // dispatch(loadDiscounts()); // TODO should we be loading these or only for admin on the admin portal
    } catch (error) {
      // TODO
      console.log("Error loading user data:", error);
    }
  }
);
