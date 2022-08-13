import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postsReducer from "./post.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  postsReducer
});
