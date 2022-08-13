import { useEffect, useState } from "react";
import { isEmpty } from "../../utils/Utils";
import { followUser, unFollowUser } from "../../_actions/user.actions";

import { useDispatch, useSelector } from "react-redux";

//TODO: Make users not dissapear immediatly after unfollowing
const FollowHandler = ({ idToFollow, type }) => {
  
  const { userData } = useSelector((state) => state.userReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unFollowUser(userData._id, idToFollow));
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
