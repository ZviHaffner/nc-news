export const CommentCard = ({ comment }) => {
  const date = new Date(comment.created_at);
  const formattedDate = date.toLocaleDateString();

  return (
    <section className="comment-card">
      <p>{comment.author}</p>
      <p>{comment.body}</p>
      <p>Date Created: {formattedDate}</p>
    </section>
  );
};
