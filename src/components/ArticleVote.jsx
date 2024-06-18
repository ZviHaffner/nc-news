import { useEffect, useState } from "react";
import { changeArticleVotes, getArticleById } from "../api";

export const ArticleVote = ({ articleId }) => {
  const [votes, setVotes] = useState(0);
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
    setError(null)
    setVotes((currentVotes) => currentVotes + 1);
    changeArticleVotes(articleId, 1).catch((err) => {
      setVotes((currentVotes) => currentVotes - 1);
      setError(err);
    });
  }

  function decrementVote() {
    setError(null)
    setVotes((currentVotes) => currentVotes - 1);
    changeArticleVotes(articleId, -1).catch((err) => {
      setVotes((currentVotes) => currentVotes + 1);
      setError(err);
    });
  }
  return (
    <div className="article-votes">
      <p>Votes: {votes}</p>
      <button onClick={incrementVote}>+</button>
      <button onClick={decrementVote}>-</button>
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
