import { User } from "./user.types";

export interface Post {
  _id: string;
  posterId: string;
  message: string;
  picture: string;
  pictureKey: string;
  video: string;
  likers: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  commenterId: string;
  commenterPseudo: string;
  text: string;
  timestamp: number;
}

export interface PostCreate {
  posterId: string;
  message: string;
  file?: File;
  video?: string;
}

export interface UpdatePost {
  postId: string;
  message: string;
}

export interface LikePost {
  likerId: string;
  postId: string;
}

export interface AddComment {
  postId: string;
  commenterId: string;
  pseudo: string;
  message: string;
}

export interface EditComment {
  postId: string;
  commentId: string;
  message: string;
}

export interface DeleteComment {
  postId: string;
  commentId: string;
}

export interface RatePostResponse {
  postResponse: Post;
  userResponse: User;
}