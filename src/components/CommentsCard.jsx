export const CommentCard = ({ comment }) => {
  const date = new Date(comment.created_at);
  const formattedDate = date.toLocaleDateString();

  return (
    <section className="comment-card">
      <p id="author">{comment.author}</p>
      <p>{comment.body}</p>
      <p id="date">Date Created: {formattedDate}</p>
    </section>
  );
};
