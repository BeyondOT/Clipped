import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const login = (data) => API.post(`/user/login`, data);

export const fetchToken = () => API.get(`/jwtid`, { withCredentials: true });
export const getUser = (userId) => API.get(`/user/${userId}`);
export const uploadProfilePicture = (data) => API.post("/user/upload/", data);
export const updateBio = (userId, bio) => API.put(`/user/${userId}`, { bio });
export const followUser = (userId, idToFollow) => {
  API.patch(`/user/follow/${userId}`, { idToFollow });
};

export const unfollowUser = (userId, idToUnfollow) => {
  API.patch(`/user/unfollow/${userId}`, { idToUnfollow });
};
