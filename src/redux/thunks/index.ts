import { createAsyncThunk } from "@reduxjs/toolkit";
import { userDetailsApi } from "../apiServices/userDetailsService";
import { ASYNC_PREFIX } from "../../constants";
import { initialize, setToken } from "../slices/authSlice";
import { tipsApi } from "../apiServices/tipsService";

export const loadUserData = createAsyncThunk(
  "auth/loadUserData",
  async (_, { dispatch, getState }) => {
    try {
      dispatch(userDetailsApi.endpoints.getUserDetails.initiate());
      // dispatch(loadLessons());
      // dispatch(loadCredits());
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
      dispatch(initialize());
      dispatch(tipsApi.endpoints.getTips.initiate());
      // dispatch(loadBlogs());
      // dispatch(loadDiscounts()); // TODO should we be loading these or only for admin on the admin portal
    } catch (error) {
      // TODO
      console.log("Error loading user data:", error);
    }
  }
);
