import { arrayRemove } from "../utils/Utils";
import {
  FETCHING_TOKEN_FAIL,
  FETCHING_TOKEN_START,
  FETCHING_TOKEN_SUCCESS,
  FOLLOW_USER,
  RETRIEVING_FAIL,
  RETRIEVING_START,
  RETRIEVING_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPLOADING_FAIL,
  UPLOADING_START,
  UPLOADING_SUCCESS,
} from "../_actions/user.actions";

// The user reducer contains all the user data model
export default function userReducer(
  state = {
    userData: {},
    loading: false,
    error: false,
    uploading: false,
    uid: null,
  },
  action
) {
  switch (action.type) {
    // Fetching the token :
    case FETCHING_TOKEN_START:
      return { ...state, error: false, loading: true };
    case FETCHING_TOKEN_SUCCESS:
      return {
        ...state,
        uid: action.payload,
        loading: false,
        error: false,
      };
    case FETCHING_TOKEN_FAIL:
      return { ...state, loading: false, error: true };

    // Signing in
    case SIGN_IN_START:
      return { ...state, error: false, loading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, error: false, loading: false, uid: action.payload };
    case SIGN_IN_FAIL:
      return { ...state, error: true, loading: false };

    // Getting the user :
    case RETRIEVING_START:
      return { ...state, error: false, loading: true };
    case RETRIEVING_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: false,
      };
    case RETRIEVING_FAIL:
      return { ...state, loading: false, error: true };

    //Uploading the avatar picture :
    case UPLOADING_START:
      return { ...state, error: false, uploading: true };
    case UPLOADING_SUCCESS:
      return {
        ...state,
        error: false,
        uploading: false,
        userData: { ...state.userData, picture: action.payload },
      };
    case UPLOADING_FAIL:
      return { ...state, picture: action.payload };

    // The rest :
    case UPDATE_BIO:
      return { ...state, bio: action.payload };
    case FOLLOW_USER:
      
      return {
        ...state,
        userData: {
          ...state.userData,
          following: [...state.userData.following, action.payload],
        },
      };
    case UNFOLLOW_USER:

      return {
        ...state,
        userData: {
          ...state.userData,
          following: arrayRemove(state.userData.following, action.payload),
        },
      };
    default:
      return state;
  }
}
