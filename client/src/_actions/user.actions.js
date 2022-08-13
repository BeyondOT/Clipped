import * as UserApi from "../api/user.requests";

//Getting the token
export const FETCHING_TOKEN_START = "FETCHING_TOKEN_START";
export const FETCHING_TOKEN_SUCCESS = "FETCHING_TOKEN_SUCCESS";
export const FETCHING_TOKEN_FAIL = "FETCHING_TOKEN_FAIL";

// Sign in
export const SIGN_IN_START = "SIGN_IN_START";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAIL = "SIGN_INFAILT";

//Getting the user
export const RETRIEVING_START = "RETRIEVING_START";
export const RETRIEVING_SUCCESS = "RETRIEVING_SUCCESS";
export const RETRIEVING_FAIL = "RETRIEVING_FAIL";

// Uploading the picture
export const UPLOADING_START = "UPLOADING_START";
export const UPLOADING_SUCCESS = "UPLOADING_SUCCESS";
export const UPLOADING_FAIL = "UPLOADING_FAIL";

export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getToken = () => async (dispatch) => {
  dispatch({ type: FETCHING_TOKEN_START });
  try {
    const res = await UserApi.fetchToken();
    dispatch({ type: FETCHING_TOKEN_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCHING_TOKEN_FAIL });
  }
};

export const signIn = (data) => async (dispatch) => {
  dispatch({ type: SIGN_IN_START });
  try {
    const res = await UserApi.login(data);
    dispatch({ type: SIGN_IN_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: SIGN_IN_FAIL });
  }
};

export const getUser = (uid) => async (dispatch) => {
  dispatch({ type: RETRIEVING_START });
  try {
    const { data } = await UserApi.getUser(uid);
    dispatch({ type: RETRIEVING_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: RETRIEVING_FAIL });
  }
};

export const uploadPicture = (data) => async (dispatch) => {
  dispatch({ type: UPLOADING_START });
  try {
    const res = await UserApi.uploadProfilePicture(data);
    dispatch({ type: UPLOADING_SUCCESS, payload: res.data.picture });
  } catch (err) {
    console.log(err);
    dispatch({ type: UPLOADING_FAIL });
  }
};

export const updateBio = (userId, bio) => async (dispatch) => {
  try {
    await UserApi.updateBio(userId, bio);
    dispatch({ type: UPDATE_BIO, payload: bio });
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (followerId, idToFollow) => async (dispatch) => {
  try {
    await UserApi.followUser(followerId, idToFollow);
    dispatch({ type: FOLLOW_USER, payload: idToFollow });
  } catch (error) {
    console.log(error);
  }
};

export const unFollowUser = (followerId, idToUnfollow) => async (dispatch) => {
  try {
    await UserApi.unfollowUser(followerId, idToUnfollow);
    dispatch({ type: UNFOLLOW_USER, payload: idToUnfollow });
  } catch (error) {
    console.log(error);
  }
};
