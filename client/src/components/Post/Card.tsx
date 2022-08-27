import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authSlice";
import { updatePost } from "../../features/postsSlice";
import { selectUser } from "../../features/userSlice";
import { selectUsers } from "../../features/usersSlice";
import { Post, UpdatePost } from "../../interfaces/post.types";
import { dateParser, isEmpty } from "../../utils/Utils";
import FollowHandler from "../Profile/FollowHandler";
import CommentCard from "./CommentCard";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

export interface CardProps {
  post: Post;
}

const Card: React.FC<CardProps> = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [updating, setUpdating] = useState(false)
  const [textUpdate, setTextUpdate] = useState("");

  const { uid } = useAppSelector(selectAuth);
  const { userData } = useAppSelector(selectUser);
  const { usersData, loading } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  const updateItem = async () => {
    if (textUpdate) {
      setUpdating(true)
      const data: UpdatePost = {
        postId: post._id,
        message: textUpdate
      }
      await dispatch(updatePost(data));
    }
    setUpdating(false);
    setIsUpdated(false);
  };

  return (
    <li className="card-container">
      {updating || loading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={usersData
                .map((user) => {
                  if (user._id === post.posterId) return user.picture;
                  else return null;
                })
                .join("")}
              alt="poster-avatar"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
                {post.posterId !== userData._id && uid && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated === true && uid === post.posterId && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider les modifications
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic"></img>
            )}
            {post.video && (
              <iframe
                className="video-iframe"
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {uid === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit-buttpn" />
                </div>
                <DeleteCard postId={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div
                className="comment-icon"
                onClick={() => setShowComment(!showComment)}
              >
                <img src="./img/icons/message1.svg" alt="comment/" />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./img/icons/share.svg" alt="share" />
            </div>
            {showComment && <CommentCard post={post} />}
          </div>
        </>
      )}
    </li>
  );
};
export default Card;
