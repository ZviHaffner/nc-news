import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCommentsByArticleId } from "../api";
import { CommentCard } from "./CommentsCard";
import { CommentForm } from "./CommentForm";

export const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteFeedback, setDeleteFeedback] = useState('');

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
        <CommentForm articleId={articleId} comments={comments} setComments={setComments} />
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              comments={comments} 
              setComments={setComments}
              setDeleteFeedback={setDeleteFeedback}
            ></CommentCard>
          );
        })}
      </section>
    );
  }
  return <p>Loading...</p>;
};
