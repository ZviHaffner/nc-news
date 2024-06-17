export const ArticleCard = ({ article }) => {
  const author =
    article.author.charAt(0).toUpperCase() + article.author.slice(1);
  const topic = article.topic.charAt(0).toUpperCase() + article.topic.slice(1);
  const date = article.created_at.split("T")[0];

  return (
    <section className="article-card">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} id="article-img" />
      <p>By: {author}</p>
      <p>Topic: {topic}</p>
      <p>Date Created: {date}</p>
    </section>
  );
};
