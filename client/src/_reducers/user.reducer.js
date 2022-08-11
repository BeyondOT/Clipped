import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../_actions/user.actions";

const initialState = {};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return { ...state, picture: action.payload };
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
