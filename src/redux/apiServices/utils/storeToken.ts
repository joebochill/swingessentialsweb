import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { ASYNC_PREFIX } from "../../../constants";
import { setToken } from "../../slices/authSlice";
import { loadUserData } from "../../thunks";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export const storeToken = (
  meta: FetchBaseQueryMeta | undefined,
  dispatch: ThunkDispatch<any, any, UnknownAction>,
  shouldLoadUserData: boolean = true
) => {
  const token = meta?.response?.headers.get("Token") ?? "";
  if (token) {
    localStorage.setItem(`${ASYNC_PREFIX}token`, token);
    dispatch(setToken(token));
    if (shouldLoadUserData) dispatch(loadUserData());
  }
};
