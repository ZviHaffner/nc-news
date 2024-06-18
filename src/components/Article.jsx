import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticleById } from "../api";

export const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(id).then(({ data }) => {
      setArticle(data.article);
      setIsLoading(false);
    });
  }, [id]);
  
  if (!isLoading) {

    const topic = article.topic.charAt(0).toUpperCase() + article.topic.slice(1);
    const date = article.created_at.split("T")[0];

    return (
      <article className="article">
        <h2>{article.title}</h2>
        <p>By: {article.author}</p>
        <p>Topic: {topic}</p>
        <p>Created On: {date}</p>
        <img src={article.article_img_url} />
        <section>{article.body}</section>
      </article>
    );
  }

  return <p>Loading...</p>;
};
