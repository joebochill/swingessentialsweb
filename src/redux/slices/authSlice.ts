import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../__types__";
import { getUserRole } from "../../utilities/user";

const initialState: AuthState = {
  token: null,
  admin: false,
  role: "anonymous",
  loginFailures: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      const role = getUserRole(action.payload || "");
      state.role = role;
      state.admin = role === "administrator";
      state.loginFailures = 0;
    },
    clearToken: (state) => {
      state.token = null;
      state.admin = false;
      state.role = "anonymous";
      state.loginFailures = 0;
    },
    incrementLoginFailures: (state) => {
      state.loginFailures += 1;
    },
    resetLoginFailures: (state) => {
      state.loginFailures = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setToken,
  clearToken,
  incrementLoginFailures,
  resetLoginFailures,
} = authSlice.actions;

export default authSlice.reducer;
