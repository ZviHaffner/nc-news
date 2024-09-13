import { useEffect, useState } from "react";
import { changeArticleVotes, getArticleById } from "../api";

export const ArticleVote = ({ articleId }) => {
  const [votes, setVotes] = useState(0);
  const [voteSubmitting, setVoteSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(articleId)
      .then(({ data }) => {
        setVotes(data.article.votes);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  function incrementVote() {
    setVoteSubmitting(true);
    setError(null);
    setVotes((currentVotes) => currentVotes + 1);
    changeArticleVotes(articleId, 1)
      .then(() => {
        setVoteSubmitting(false);
        if (hasVoted === "") {
          setHasVoted("plus");
        } else if (hasVoted === "minus") {
          setHasVoted("");
        }
      })
      .catch((err) => {
        setVoteSubmitting(false);
        setVotes((currentVotes) => currentVotes - 1);
        setError(err);
      });
  }

  function decrementVote() {
    setVoteSubmitting(true);
    setError(null);
    setVotes((currentVotes) => currentVotes - 1);
    changeArticleVotes(articleId, -1)
      .then(() => {
        setVoteSubmitting(false);
        if (hasVoted === "") {
          setHasVoted("minus");
        } else if (hasVoted === "plus") {
          setHasVoted("");
        }
      })
      .catch((err) => {
        setVoteSubmitting(false);
        setVotes((currentVotes) => currentVotes + 1);
        setError(err);
      });
  }
  return (
    <div className="article-votes">
      <p>Votes: {votes}</p>
      <button
        onClick={incrementVote}
        disabled={hasVoted === "plus" || voteSubmitting}
      >
        +
      </button>
      <button
        onClick={decrementVote}
        disabled={hasVoted === "minus" || voteSubmitting}
      >
        -
      </button>
      {error ? (
        <div id="error-msg">
          <p>Something went wrong, please try again.</p>
          <p>
            {error.response.status} {error.response.data.msg}
          </p>
        </div>
      ) : null}
    </div>
  );
};
