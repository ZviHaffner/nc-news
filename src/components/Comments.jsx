import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCommentsByArticleId } from "../api";
import { CommentCard } from "./CommentsCard";

export const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCommentsByArticleId(articleId)
      .then(({ data }) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [articleId]);

  if (error) {
    return (
      <>
        <h1>{error.response.status}</h1>
        <p>{error.response.data.msg}</p>
      </>
    );
  }

  if (!isLoading) {
    return (
      <section className="comments">
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
            ></CommentCard>
          );
        })}
      </section>
    );
  }
  return <p>Loading...</p>;
};
