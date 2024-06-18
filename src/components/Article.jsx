import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticleById } from "../api";
import { Comments } from "./Comments";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then(({ data }) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  function handleClick() {
    setButtonClicked(!buttonClicked);
  }

  if (error) {
    return (
      <>
        <h1>{error.response.status}</h1>
        <p>{error.response.data.msg}</p>
      </>
    );
  }

  if (!isLoading) {
    const topic =
      article.topic.charAt(0).toUpperCase() + article.topic.slice(1);
      const date = new Date(article.created_at);
      const formattedDate = date.toLocaleDateString();

    return (
      <>
        <article className="article">
          <h2>{article.title}</h2>
          <p>By: {article.author}</p>
          <p>Topic: {topic}</p>
          <p>Created On: {formattedDate}</p>
          <img src={article.article_img_url} />
          <section>{article.body}</section>
        </article>
        <div className="comments-container">
          <button onClick={handleClick}>
            {!buttonClicked ? "SHOW" : "HIDE"} COMMENTS
          </button>
          {buttonClicked ? <Comments articleId={article_id} /> : null}
        </div>
      </>
    );
  }

  return <p>Loading...</p>;
};
