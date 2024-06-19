import { useState } from "react";
import { addComment } from "../api";

export const CommentForm = ({ articleId, comments, setComments }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState(null);
  const [commentErrorMsg, setCommentErrorMsg] = useState(null);
  const [postFeedback, setPostFeedback] = useState('Posting...')

  const handleUsernameBlur = () => {
    if (usernameInput.length < 2) {
      setUsernameErrorMsg("Username must be longer than 1 character.");
    } else {
      setUsernameErrorMsg("");
    }
  };

  const handleCommentBlur = () => {
    if (commentInput.length === 0) {
      setCommentErrorMsg("Insert Comment");
    } else {
      setCommentErrorMsg("");
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    setPostFeedback('Posting...')
    setError(null);
    setIsSubmitted(true);
    addComment(articleId, usernameInput, commentInput)
      .then((response) => {
        setPostFeedback('Comment Submitted!')
        setComments([response.data.comment, ...comments]);
      })
      .catch((err) => {
        setIsSubmitted(false);
        setError(err);
        setComments(comments);
      });
    setUsernameInput("");
    setCommentInput("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Comment</h3>
      <label>
        Username
        <input
          id="username-input"
          value={usernameInput}
          onChange={(event) => setUsernameInput(event.target.value)}
          onBlur={handleUsernameBlur}
        />
      </label>
      <p id="error-msg">{usernameErrorMsg}</p>
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
      <button
        type="submit"
        disabled={commentInput.length < 1 || usernameInput.length < 1}
      >
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
          <p>Username may not be valid.</p>
          <p>
            {error.response.status} {error.response.data.msg}
          </p>
        </div>
      ) : null}
    </form>
  );
};
