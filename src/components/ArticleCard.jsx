import { Link } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  const topic = article.topic.charAt(0).toUpperCase() + article.topic.slice(1);
  const date = new Date(article.created_at);
  const formattedDate = date.toLocaleDateString();

  return (
    <section className="article-card">
      <Link to={`/articles/${article.article_id}`}>
        <h2>{article.title}</h2>
        <div className="img-container">
          <img src={article.article_img_url} id="article-img" />
        </div>
        <p>{topic}</p>
        <p>{formattedDate}</p>
      </Link>
    </section>
  );
};
