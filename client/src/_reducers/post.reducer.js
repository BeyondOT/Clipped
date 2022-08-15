import { arrayRemove } from "../utils/Utils";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  LIKE_POST,
  POST_RETRIEVING_FAIL,
  POST_RETRIEVING_START,
  POST_RETRIEVING_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_START,
  POST_UPDATE_SUCCESS,
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

    case POST_UPDATE_START:
      return { ...state, loading: true };
    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post, index) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              message: action.payload.message,
            };
          } else {
            return post;
          }
        }),
      };
    case POST_UPDATE_FAIL:
      return { ...state, loading: false, error: true };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

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

    case ADD_COMMENT:
      return {
        ...state
      };

    case EDIT_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post, index) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.map((comment) => {
                if (comment._id === action.payload.commentId) {
                  return {
                    ...comment,
                    text: action.payload.text,
                  };
                } else {
                  return comment;
                }
              }),
            };
          } else {
            return post;
          }
        }),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post, index) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment._id !== action.payload.commentId
              ),
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
