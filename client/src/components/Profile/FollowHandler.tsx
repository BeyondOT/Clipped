import { useEffect, useState, FC } from "react";
import { isEmpty } from "../../utils/Utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { followUser, unfollowUser, selectUser } from "../../features/userSlice";
import { UserFollowingTypes } from "../../interfaces/user.types";

export interface FollowHandlerProps {
  idToFollow: string,
  type: string
}

//TODO: Make users not dissapear immediatly after unfollowing

const FollowHandler:FC<FollowHandlerProps> = ({ idToFollow, type }) => {
  const {userData}  = useAppSelector(selectUser);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useAppDispatch();
  const handleFollow = () => {
    const data:UserFollowingTypes = {followerId: userData._id, idToFollow}
    dispatch(followUser(data));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    const data:UserFollowingTypes = {followerId: userData._id, idToFollow}
    dispatch(unfollowUser(data));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <div className="follow-handler">
      {isFollowed && !isEmpty(userData) ? (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && <button>Abonné</button>}
          {type === "card" && (
            <img src="./img/icons/checked.svg" alt="checked"></img>
          )}
        </span>
      ) : (
        <span onClick={handleFollow}>
          {type === "suggestion" && <button>S'abonner</button>}

          {type === "card" && (
            <img src="./img/icons/check.svg" alt="checked"></img>
          )}
        </span>
      )}
    </div>
  );
};

export default FollowHandler;
