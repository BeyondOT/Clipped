import { arrayRemove } from "../utils/Utils";
import {
  LIKE_POST,
  POST_RETRIEVING_FAIL,
  POST_RETRIEVING_START,
  POST_RETRIEVING_SUCCESS,
  UNLIKE_POST,
} from "../_actions/post.actions";

const INITIAL_STATE = { posts: {}, loading: false, error: false };

export default function postsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_RETRIEVING_START:
      return { ...state, loading: true };
    case POST_RETRIEVING_SUCCESS:
      return { ...state, posts: action.payload, loading: false };
    case POST_RETRIEVING_FAIL:
      return { ...state, loading: false, error: true };

    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post, index) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              likers: [action.payload.likerId, ...post.likers],
            };
          } else {
            return post;
          }
        }),
      };

    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post, index) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              likers: arrayRemove(post.likers, action.payload.unlikerId),
            };
          } else {
            return post;
          }
        }),
      };

    default:
      return state;
  }
}
