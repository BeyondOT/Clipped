import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authSlice";
import { likePost, unlikePost } from "../../features/postsSlice";
import { LikePost, Post } from "../../interfaces/post.types";

interface Props {
  post: Post;
}

const LikeButton: React.FC<Props> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const { uid } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const like = () => {
    setLiked(true);
    const data: LikePost = {
      postId: post._id,
      likerId: uid,
    };
    dispatch(likePost(data));
  };

  const unlike = () => {
    const data: LikePost = {
      postId: post._id,
      likerId: uid,
    };
    setLiked(false);
    dispatch(unlikePost(data));
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
