import axios from "axios";

const API = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` });

export const getPosts = () => API.get(`/post`);
export const createPost = (data) => API.post(`/post`, data);
export const updatePost = (postId, message) =>
  API.put(`/post/${postId}`, { message });
export const deletePost = (postId) => API.delete(`/post/${postId}`);
export const likePost = (likerId, postId) =>
  API.patch(`/post/like-post/${postId}`, { likerId });
export const unlikePost = (unlikerId, postId) =>
  API.patch(`/post/unlike-post/${postId}`, { unlikerId });

export const addComment = (postId, commenterPseudo, commenterId, text) =>
  API.patch(`/post/add-comment/${postId}`, { text, commenterPseudo, commenterId });
export const editComment = (postId, commentId, text) =>
  API.patch(`/post/edit-comment/${postId}`, { commentId, text });
export const deleteComment = (postId, commentId) =>
  API.patch(`/post/delete-comment/${postId}`, {commentId});
