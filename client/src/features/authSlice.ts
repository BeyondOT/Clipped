import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UserApi from "../api/user.requests";
import { RootState } from "../app/store";
import { UserLogin } from "../interfaces/user.types";

export interface AuthState {
  uid: string;
  loading: boolean;
  errors: boolean;
}

const initialState: AuthState = {
  uid: "",
  loading: false,
  errors: false,
};

export const getToken = createAsyncThunk("user/fetchToken", async () => {
  const res = await UserApi.fetchToken(); // The value we return becomes the `fulfilled` action payload
  return res.data;
});


export const signIn = createAsyncThunk(
  "user/login",
  async (data: UserLogin) => {
    const res = await UserApi.login(data);
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Token reducers
      .addCase(getToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.uid = action.payload;
        state.loading = false;
      })
      .addCase(getToken.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
