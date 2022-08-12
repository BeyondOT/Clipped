import {
  FETCHING_TOKEN_FAIL,
  FETCHING_TOKEN_START,
  FETCHING_TOKEN_SUCCESS,
  FOLLOW_USER,
  RETRIEVING_FAIL,
  RETRIEVING_START,
  RETRIEVING_SUCCESS,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPLOADING_FAIL,
  UPLOADING_START,
  UPLOADING_SUCCESS,
} from "../_actions/user.actions";

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
        following: [...state.following, action.payload.idToFollow],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (_id) => _id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}
