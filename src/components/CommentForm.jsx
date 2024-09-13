import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { addComment } from "../api";

export const CommentForm = ({ articleId, comments, setComments }) => {
  const [commentInput, setCommentInput] = useState("");
  const [commentErrorMsg, setCommentErrorMsg] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [postFeedback, setPostFeedback] = useState("Posting...");
  const [error, setError] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (postFeedback === "Comment Submitted!") {
      setTimeout(() => {
        setIsSubmitted(false);
        setPostFeedback("Posting...");
      }, 3000);
    }
  }, [postFeedback]);

  const handleCommentBlur = () => {
    if (commentInput.length === 0) {
      setCommentErrorMsg("Insert Comment");
    } else {
      setCommentErrorMsg("");
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    setPostFeedback("Posting...");
    setError(null);
    setIsSubmitted(true);
    addComment(articleId, currentUser.username, commentInput)
      .then((response) => {
        setPostFeedback("Comment Submitted!");
        setComments([response.data.comment, ...comments]);
        setCommentInput("");
      })
      .catch((err) => {
        setIsSubmitted(false);
        setError(err);
        setComments(comments);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Comment</h3>
      <p>Commenting as {currentUser.username}</p>
      <label>
        Comment
        <input
          id="comment-input"
          value={commentInput}
          onChange={(event) => setCommentInput(event.target.value)}
          onBlur={handleCommentBlur}
        />
      </label>
      <p id="error-msg">{commentErrorMsg}</p>
      <button type="submit" disabled={commentInput.length < 1 || isSubmitted}>
        SUBMIT
      </button>
      {isSubmitted ? (
        <div id="success-msg">
          <p>{postFeedback}</p>
        </div>
      ) : null}
      {error ? (
        <div id="error-msg">
          <p>Something went wrong, please try again.</p>
          <p>
            {error.response.status} {error.response.data.msg}
          </p>
        </div>
      ) : null}
    </form>
  );
};
