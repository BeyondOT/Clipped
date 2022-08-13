// posts
import * as PostApi from "../api/post.requests";
export const POST_RETRIEVING_START = "POST_RETRIEVING_START";
export const POST_RETRIEVING_SUCCESS = "POST_RETRIEVING_SUCCESS";
export const POST_RETRIEVING_FAIL = "POST_RETRIEVING_FAIL";

export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";


export const getPosts = () => async (dispatch) => {
  dispatch({ type: POST_RETRIEVING_START });
  try {
    const res = await PostApi.getPosts();
    dispatch({ type: POST_RETRIEVING_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: POST_RETRIEVING_FAIL });
  }
};

export const likePost = (likerId, postId) => async (dispatch) => {
  try {
    await PostApi.likePost(likerId, postId);
    dispatch({ type: LIKE_POST, payload: {postId, likerId} });
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = (unlikerId, postId) => async (dispatch) => {
  try {
    await PostApi.unlikePost(unlikerId, postId);
    dispatch({ type: UNLIKE_POST, payload: {postId, unlikerId} });
  } catch (error) {
    console.log(error);
  }
};
