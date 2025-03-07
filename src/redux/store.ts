import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./apiServices/blogsService";
import authApi from "./apiServices/authService";
// import newAuthApi from "./apiServices/authService";
import authReducer from "./slices/authSlice";
import navigationReducer from "./slices/navigationSlice";
// import userDetailsReducer from "./slices/userDetailsSlice";
import { userDetailsApi } from "./apiServices/userDetailsService";
// import { userSettingsApi } from "./apiServices/userSettingsService";
import { testimonialsApi } from "./apiServices/testimonialsService";
import { proBiosApi } from "./apiServices/proBiosService";
import registrationApi from "./apiServices/registrationService";
import { tipsApi } from "./apiServices/tipsService";

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    // [newAuthApi.reducerPath]: newAuthApi.reducer,
    [userDetailsApi.reducerPath]: userDetailsApi.reducer,
    // [userSettingsApi.reducerPath]: userSettingsApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [proBiosApi.reducerPath]: proBiosApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [tipsApi.reducerPath]: tipsApi.reducer,

    auth: authReducer,
    // userDetails: userDetailsReducer,
    navigation: navigationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      authApi.middleware,
      // newAuthApi.middleware,
      userDetailsApi.middleware,
      // userSettingsApi.middleware,
      testimonialsApi.middleware,
      proBiosApi.middleware,
      registrationApi.middleware,
      tipsApi.middleware
    ),
});

// setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
