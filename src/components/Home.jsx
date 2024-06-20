import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { ArticleCard } from "./ArticleCard";
import { useParams, useSearchParams } from "react-router-dom";
import { SortDropdown } from "./SortDropdown";

export const Home = () => {
  const [articles, setArticles] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { topic } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort_by");
  const byOrder = searchParams.get("order");

  useEffect(() => {
    getArticles(topic, sort, byOrder)
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
    <>
      <SortDropdown articles={articles} />
      <section className="articles">
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
            ></ArticleCard>
          );
        })}
      </section>
    </>
  );
};
