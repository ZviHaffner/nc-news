import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteComment } from "../api";

export const CommentCard = ({ comment, comments, setComments, setDeleteFeedback }) => {
  const { currentUser } = useContext(UserContext);
  const [buttonTxt, setButtonTxt] = useState("DELETE");

  const date = new Date(comment.created_at);
  const formattedDate = date.toLocaleDateString();

  const userIsAuthor = currentUser.username === comment.author;

  function handleDelete(e) {
    const commentId = e.target.value;
    setButtonTxt("DELETING...");
    deleteComment(commentId)
      .then(() => {
        setButtonTxt('Comment deleted successfully!');
      })
      .catch((error) => {
        setButtonTxt('Error deleting comment');
      });
  }

  return (
    <section className="comment-card">
      <p id="author">{comment.author}</p>
      <p>{comment.body}</p>
      <p id="date">Date Created: {formattedDate}</p>
      {userIsAuthor ? (
        <button
          id="delete-button"
          onClick={handleDelete}
          value={comment.comment_id}
        >
          {buttonTxt}
        </button>
      ) : null}
    </section>
  );
};
