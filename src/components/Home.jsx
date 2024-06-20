import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { ArticleCard } from "./ArticleCard";
import { useParams, useSearchParams } from "react-router-dom";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

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

  function handleReset() {
    setSortBy("");
    setOrder("");
  }

  function createSortDropdown() {
    return (
      <form className="sort-form">
        <select
          name="sort_by"
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
        >
          <option value="" disabled>
            Sort By...
          </option>
          {Object.keys(articles[0]).map((key) => {
            if (key === "article_img_url" || key === "comment_count") {
              return null;
            }
            const sortQuery = key.split("_");
            const capitalisedSortQuery = [];
            for (let word of sortQuery) {
              if (word === "id") {
                capitalisedSortQuery.push("ID");
              } else {
                capitalisedSortQuery.push(
                  word.charAt(0).toUpperCase() + word.slice(1)
                );
              }
            }
            const sortQueryStr = capitalisedSortQuery.join(" ");
            return (
              <option value={key} key={key}>
                {sortQueryStr}
              </option>
            );
          })}
        </select>
        <select
          name="order"
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option value="" disabled>
            Order...
          </option>
          <option value={"asc"}>Ascending</option>
          <option value={"desc"}>Descending</option>
        </select>
        <button type="submit">SORT</button>
        <button onClick={handleReset}>RESET</button>
      </form>
    );
  }

  return (
    <>
      {createSortDropdown()}
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
