import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import * as UserApi from "../api/user.requests";
import { RootState } from "../app/store";
import {
  User,
  UserBioUpdate,
  UserFollowingTypes,
} from "../interfaces/user.types";
import { arrayRemove } from "../utils/Utils";

export interface UserState {
  userData: User;
  loading: boolean;
  uploading: boolean;
  error: boolean;
}

const initialState: UserState = {
  userData: {} as User,
  loading: false,
  uploading: false,
  error: false,
};

export const getUser = createAsyncThunk("user/getUser", async (uid: string) => {
  const res = await UserApi.getUser(uid);
  return res.data;
});

export const uploadPicture = createAsyncThunk(
  "user/uploadPicture",
  async (data: FormData) => {
    const res = await UserApi.uploadProfilePicture(data);
    return res.data;
  }
);

export const updateBio = createAsyncThunk(
  "user/updateBio",
  async (data: UserBioUpdate) => {
    const res = await UserApi.updateBio(data);
    return res.data;
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (data: UserFollowingTypes) => {
    await UserApi.followUser(data);
    return data.idToFollow;
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (data: UserFollowingTypes) => {
    await UserApi.unfollowUser(data);
    return data.idToFollow;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get User
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      })
      // Upload Picture
      .addCase(updateBio.fulfilled, (state, action) => {
        state.userData.bio = action.payload.bio;
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        state.userData.picture = action.payload.picture;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.userData.following.push(action.payload);
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.userData.following = arrayRemove(
          state.userData.following,
          action.payload
        );
      })
      .addMatcher(isAnyOf(getUser.pending, updateBio.pending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(getUser.rejected, updateBio.rejected), (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
