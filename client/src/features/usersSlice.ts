import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as UserApi from "../api/user.requests";
import { RootState } from "../app/store";
import { User } from "../interfaces/user.types";

export interface UsersState {
  usersData: User[];
  loading: boolean;
  error: boolean;
}

const initialState: UsersState = {
  usersData: [] as User[],
  loading: false,
  error: false,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const res = await UserApi.getUsers(); // The value we return becomes the `fulfilled` action payload
  return res.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersData = action.payload;
        state.loading = false;
      });
  },
});

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
