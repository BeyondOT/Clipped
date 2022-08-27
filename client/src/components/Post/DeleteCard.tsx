import { useAppDispatch } from "../../app/hooks";
import { deletePost } from "../../features/postsSlice";

interface Props {
  postId: string;
}

const DeleteCard: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();

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
