export const CommentCard = ({ comment }) => {
  const date = comment.created_at.split("T")[0];

  return (
    <section className="comment-card">
      <p>{comment.author}</p>
      <p>{comment.body}</p>
      <p>Date Created: {date}</p>
    </section>
  );
};
