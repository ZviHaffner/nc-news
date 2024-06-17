import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { ArticleCard } from "./ArticleCard";

export const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then((result) => {
      setArticles(result.data.articles);
    });
  }, []);

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
