import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import userReducer from "../features/userSlice"
import usersReducer from "../features/usersSlice"
import authReducer from "../features/authSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
    auth: authReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
