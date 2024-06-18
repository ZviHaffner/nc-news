import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { ArticleCard } from "./ArticleCard";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllArticles().then((result) => {
      setArticles(result.data.articles);
      setIsLoading(false)
    });
  }, []);

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
