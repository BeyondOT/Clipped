import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authSlice";
import { addComment, getPosts } from "../../features/postsSlice";
import { selectUser } from "../../features/userSlice";
import { selectUsers } from "../../features/usersSlice";
import { AddComment, Comment, Post } from "../../interfaces/post.types";
import { timestampParser } from "../../utils/Utils";
import FollowHandler from "../Profile/FollowHandler";
import EditDeleteComment from "./EditDeleteComment";

interface CardProps {
  post: Post;
}

const CommentCard: React.FC<CardProps> = ({ post }) => {
  const [text, setText] = useState("");
  const { uid } = useAppSelector(selectAuth);
  const { userData } = useAppSelector(selectUser);
  const { usersData } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userData);
    if (text !== "") {
      const data: AddComment = {
        postId: post._id,
        commenterId: uid,
        pseudo: userData.pseudo,
        message: text
      }
      dispatch(addComment(data));
      dispatch(getPosts());
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment: Comment) => {
        return (
          <div
            className={
              comment.commenterId === uid
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={usersData
                  .map((user) => {
                    if (user._id === comment.commenterId) return user.picture;
                    else return null;
                  })
                  .join("")}
                alt="comment-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterId !== uid && (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type="card"
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {uid && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};
export default CommentCard;
