import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import * as PostsApi from "../api/post.requests";
import { RootState } from "../app/store";
import {
  AddComment,
  DeleteComment,
  EditComment,
  LikePost,
  Post,
  UpdatePost,
} from "../interfaces/post.types";

export interface PostState {
  postsList: Post[];
  loading: boolean;
  error: boolean;
}

const initialState: PostState = {
  postsList: [] as Post[],
  loading: false,
  error: false,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await PostsApi.getPosts(); // The value we return becomes the `fulfilled` action payload
  return res.data;
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data: FormData) => {
    const res = await PostsApi.createPost(data);
    return res.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (data: UpdatePost) => {
    const res = await PostsApi.updatePost(data);
    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string) => {
    const res = await PostsApi.deletePost(postId);
    return res.data;
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (data: LikePost) => {
    const res = await PostsApi.likePost(data);
    return res.data;
  }
);

export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async (data: LikePost) => {
    const res = await PostsApi.unlikePost(data);
    return res.data;
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (data: AddComment) => {
    const res = await PostsApi.addComment(data);
    return res.data;
  }
);

export const editComment = createAsyncThunk(
  "posts/editComment",
  async (data: EditComment) => {
    const res = await PostsApi.editComment(data);
    return res.data;
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (data: DeleteComment) => {
    const res = await PostsApi.deleteComment(data);
    return res.data;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  // TODO: Complete the reducers
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.postsList.push(action.payload);
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.postsList = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.postsList.findIndex(
          (post) => post._id === action.payload._id
        );
        state.postsList[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.postsList.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) state.postsList.splice(index, 1);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.postsList.findIndex(
          (post) => post._id === action.payload.postResponse._id
        );
        if (index !== -1)
          state.postsList[index].likers = action.payload.postResponse.likers;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.postsList.findIndex(
          (post) => post._id === action.payload.postResponse._id
        );
        if (index !== -1)
          state.postsList[index].likers = action.payload.postResponse.likers;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.postsList.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1)
          state.postsList[index].comments = action.payload.comments;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.postsList.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1)
          state.postsList[index].comments = action.payload.comments;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.postsList.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1)
          state.postsList[index].comments = action.payload.comments;
      })
      .addMatcher(isAnyOf(getPosts.pending), (state) => {
        state.loading = true;
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
