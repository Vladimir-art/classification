import { configureStore } from "@reduxjs/toolkit";
import * as reducers from "./reducers";

export const store = configureStore({
  reducer: {
    isLoginFormOpened: reducers.loginFormOpenedReducer,
    isRegisterFormOpened: reducers.registerFormOpenedReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
