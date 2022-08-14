import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { likePost, unlikePost } from "../../_actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const { uid } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const like = () => {
    setLiked(true);
    dispatch(likePost(uid, post._id));
  };

  const unlike = () => {
    setLiked(false);
    dispatch(unlikePost(uid, post._id));
  };

  useEffect(() => {
    if (post.likers.includes(uid)) {
      setLiked(true);
    }
  }, [uid, post.likers]);

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
      {uid && !liked && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};
export default LikeButton;
