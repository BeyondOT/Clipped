// posts
import * as PostApi from "../api/post.requests";
export const POST_RETRIEVING_START = "POST_RETRIEVING_START";
export const POST_RETRIEVING_SUCCESS = "POST_RETRIEVING_SUCCESS";
export const POST_RETRIEVING_FAIL = "POST_RETRIEVING_FAIL";

export const ADD_POST_START = "ADD_POST_START";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAIL = "ADD_POST_FAIL";

export const POST_UPDATE_START = "POST_UPDATE_START";
export const POST_UPDATE_SUCCESS = "POST_UPDATE_SUCCESS";
export const POST_UPDATE_FAIL = "POST_UPDATE_FAIL";

export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const DELETE_POST = "DELETE_POST";

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getPosts = (number) => async (dispatch) => {
  dispatch({ type: POST_RETRIEVING_START });
  try {
    const res = await PostApi.getPosts();
    const array = res.data.slice(0, number);
    dispatch({ type: POST_RETRIEVING_SUCCESS, payload: array });
  } catch (error) {
    console.log(error);
    dispatch({ type: POST_RETRIEVING_FAIL });
  }
};

export const addPost = (data) => async (dispatch) => {
  dispatch({ type: ADD_POST_START });
  try {
    await PostApi.createPost(data);
    dispatch({ type: ADD_POST_SUCCESS, payload: { data } });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_POST_FAIL });
  }
};

export const updatePost = (postId, message) => async (dispatch) => {
  dispatch({ type: POST_UPDATE_START });
  try {
    await PostApi.updatePost(postId, message);
    dispatch({ type: POST_UPDATE_SUCCESS, payload: { postId, message } });
  } catch (error) {
    console.log(error);
    dispatch({ type: POST_UPDATE_FAIL });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await PostApi.deletePost(postId);
    dispatch({ type: DELETE_POST, payload: postId });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (likerId, postId) => async (dispatch) => {
  try {
    await PostApi.likePost(likerId, postId);
    dispatch({ type: LIKE_POST, payload: { postId, likerId } });
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = (unlikerId, postId) => async (dispatch) => {
  try {
    await PostApi.unlikePost(unlikerId, postId);
    dispatch({ type: UNLIKE_POST, payload: { postId, unlikerId } });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (postId, pseudo, commenterId, text) => async (dispatch) => {
  try {
    await PostApi.addComment(postId, pseudo, commenterId, text);
    dispatch({ type: ADD_COMMENT, payload: { comment:{postId, pseudo, commenterId, text} } });
  } catch (error) {
    console.log(error);
  }
};

export const editComment = (postId, commentId, text) => async (dispatch) => {
  try {
    await PostApi.editComment(postId, commentId, text);
    dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await PostApi.deleteComment(postId, commentId);
    dispatch({ type: DELETE_COMMENT, payload: {postId, commentId} });
  } catch (error) {
    console.log(error);
  }
};
