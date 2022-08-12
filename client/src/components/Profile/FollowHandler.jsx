import { React, useState, useEffect } from "react";
import { isEmpty } from "../../utils/Utils";
import { followUser, unFollowUser } from "../../_actions/user.actions";

import { useDispatch, useSelector } from "react-redux";

//TODO: Make users not dissapear immediatly after unfollowing
const FollowHandler = ({ idToFollow }) => {
  const {userData} = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unFollowUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(true);
    }
  }, [userData, idToFollow]);

  return (
    <div className="follow-handler">
      {isFollowed && !isEmpty(userData) ? (
        <span onClick={handleUnfollow}>
          <button>Abonné</button>
        </span>
      ) : (
        <span onClick={handleFollow}>
          <button>S'abonner</button>
        </span>
      )}
    </div>
  );
};

export default FollowHandler;
