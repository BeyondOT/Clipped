import axios from "axios";
import { User, UserBioUpdate, UserFollowingTypes, UserLogin } from "../interfaces/user.types";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const login = (data: UserLogin) => API.post<string>(`/user/login`, data);

export const fetchToken = () => API.get<string>(`/jwtid`, { withCredentials: true });
export const getUser = (userId: string) => API.get<User>(`/user/${userId}`);
export const uploadProfilePicture = (data:FormData) => API.post<User>("/user/upload/", data);
export const updateBio = (data: UserBioUpdate) => API.put<User>(`/user/${data.userId}`, {bio: data.bio});
export const followUser = (data: UserFollowingTypes) => {
  return API.patch<string>(`/user/follow/${data.followerId}`, { idToFollow: data.idToFollow });
};
export const unfollowUser = (data: UserFollowingTypes) => {
  return API.patch<string>(`/user/unfollow/${data.followerId}`, { idToUnfollow: data.idToFollow });
};

export const getUsers = () => API.get<User[]>(`/user/`);



