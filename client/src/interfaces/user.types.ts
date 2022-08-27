export interface User {
  _id: string;
  pseudo: string;
  email: string;
  bio: string;
  picture: string;
  followers: string[];
  following: string[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserFollowingTypes {
  followerId: string;
  idToFollow: string;
}

export interface UserBioUpdate {
  userId: string;
  bio: string;
}
