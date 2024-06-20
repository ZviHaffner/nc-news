import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { ArticleCard } from "./ArticleCard";
import { useParams } from "react-router-dom";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic)
      .then((result) => {
        setArticles(result.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [topic]);

  if (error) {
    return (
      <>
        <h1>{error.response.status}</h1>
        <p>{error.response.data.msg}</p>
      </>
    );
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="articles">
      {articles.map((article) => {
        return (
          <ArticleCard key={article.article_id} article={article}></ArticleCard>
        );
      })}
    </section>
  );
};
