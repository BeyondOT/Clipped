import axios from "axios";

const API = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` });

export const getPosts = () => API.get(`/post`);
export const createPost = () => API.post(`/post`);
export const updatePost = () => API.put(`/post`);
export const deletePost = () => API.delete(`/post`);
export const likePost = (likerId, postId) => API.patch(`/post/like-post/${postId}`, {likerId});
export const unlikePost = (unlikerId, postId) => API.patch(`/post/unlike-post/${postId}`, {unlikerId});
