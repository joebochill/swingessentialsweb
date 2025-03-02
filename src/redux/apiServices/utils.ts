import { ASYNC_PREFIX, AUTH } from "../../constants";

export const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem(`${ASYNC_PREFIX}token`);
  if (token) {
    headers.set(AUTH, `Bearer ${token}`);
  }
  return headers;
};
