import { configureStore } from "@reduxjs/toolkit";
import * as reducers from "./reducers";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    isLoginFormOpened: reducers.loginFormOpenedReducer,
    isRegisterFormOpened: reducers.registerFormOpenedReducer,
    isUserLoggedIn: reducers.registerUserLoggedIn,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
