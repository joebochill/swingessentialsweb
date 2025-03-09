import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./apiServices/blogsService";
import authApi from "./apiServices/authService";
import authReducer from "./slices/authSlice";
import navigationReducer from "./slices/navigationSlice";
import { userDetailsApi } from "./apiServices/userDetailsService";
import { testimonialsApi } from "./apiServices/testimonialsService";
import { prosApi } from "./apiServices/prosService";
import registrationApi from "./apiServices/registrationService";
import { tipsApi } from "./apiServices/tipsService";

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userDetailsApi.reducerPath]: userDetailsApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [prosApi.reducerPath]: prosApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [tipsApi.reducerPath]: tipsApi.reducer,

    auth: authReducer,
    navigation: navigationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      authApi.middleware,
      userDetailsApi.middleware,
      testimonialsApi.middleware,
      prosApi.middleware,
      registrationApi.middleware,
      tipsApi.middleware
    ),
});

// setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
