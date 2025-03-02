import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserDataState } from "../../__types__";
import { authSlice } from "./authSlice";

const initialState: UserDataState = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  location: "",
  phone: "",
  goals: "",
  birthday: "",
  average: "",
  joined: 0,
};

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (
      state,
      action: PayloadAction<Partial<UserDataState> | null>
    ) => {
      if (action.payload) {
        Object.assign(state, action.payload);
      }
    },
    clearUserDetails: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authSlice.actions.clearToken, (state) => {
      Object.assign(state, initialState);
    });
    // .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
    //   const userData = action.payload;
    // })
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
