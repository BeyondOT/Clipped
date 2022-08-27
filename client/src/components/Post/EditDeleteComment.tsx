import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/authSlice";
import { deleteComment, editComment } from "../../features/postsSlice";
import {
  Comment,
  DeleteComment,
  EditComment,
} from "../../interfaces/post.types";

interface Props {
  postId: string;
  comment: Comment;
}
const EditDeleteComment: React.FC<Props> = ({ postId, comment }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const { uid } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text) {
      const data: EditComment = {
        postId: postId,
        commentId: comment._id,
        message: text,
      };
      dispatch(editComment(data));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    const data: DeleteComment = {
      postId: postId,
      commentId: comment._id,
    };
    dispatch(deleteComment(data));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};
export default EditDeleteComment;
