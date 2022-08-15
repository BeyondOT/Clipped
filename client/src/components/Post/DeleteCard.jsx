import { useDispatch } from "react-redux";
import { deletePost } from "../../_actions/post.actions";

const DeleteCard = ({ postId }) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(postId));
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteCard;
