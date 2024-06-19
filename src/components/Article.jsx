import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticleById } from "../api";
import { Comments } from "./Comments";
import { ArticleVote } from "./ArticleVote";

export const Article = () => {
  const { article_id } = useParams();

  const [articleById, setArticle] = useState({});
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
        <h2>{error.response.status}</h2>
        <p>{error.response.data.msg}</p>
      </>
    );
  }

  if (!isLoading) {
    const topic =
      articleById.topic.charAt(0).toUpperCase() + articleById.topic.slice(1);
    const date = new Date(articleById.created_at);
    const formattedDate = date.toLocaleDateString();

    return (
      <>
        <article className="article">
          <h2>{articleById.title}</h2>
          <p>By: {articleById.author}</p>
          <p>Topic: {topic}</p>
          <p>Created On: {formattedDate}</p>
          <img src={articleById.article_img_url} />
          <section>{articleById.body}</section>
        </article>
        <ArticleVote articleId={article_id} />
        <div className="comments-container">
          <p>Comments: {articleById.comment_count}</p>
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
