import axios from "axios";
import {
  AddComment,
  DeleteComment,
  EditComment,
  LikePost,
  Post,
  RatePostResponse,
  UpdatePost,
} from "../interfaces/post.types";

const API = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` });

export const getPosts = () => API.get<Post[]>(`/post`);
export const createPost = (data: FormData) => API.post<Post>(`/post/`, data);
export const updatePost = (data: UpdatePost) =>
  API.put<Post>(`/post/${data.postId}`, { message: data.message });
export const deletePost = (postId: string) => API.delete(`/post/${postId}`);
export const likePost = (data: LikePost) =>
  API.patch<RatePostResponse>(`/post/like-post/${data.postId}`, { likerId: data.likerId });
export const unlikePost = (data: LikePost) =>
  API.patch<RatePostResponse>(`/post/unlike-post/${data.postId}`, { unlikerId: data.likerId });

export const addComment = (data: AddComment) =>
  API.patch<Post>(`/post/add-comment/${data.postId}`, {
    text: data.message,
    commenterPseudo: data.pseudo,
    commenterId: data.commenterId,
  });
export const editComment = (data: EditComment) =>
  API.patch<Post>(`/post/edit-comment/${data.postId}`, {
    commentId: data.commentId,
    text: data.message,
  });
export const deleteComment = (data: DeleteComment) =>
  API.patch<Post>(`/post/delete-comment/${data.postId}`, {
    commentId: data.commentId,
  });
