import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-project-nc-news.onrender.com/api",
});

export const getAllArticles = () => {
  return newsApi.get("/articles");
};

export const getArticleById = (articleId) => {
  return newsApi.get(`/articles/${articleId}`);
};

export const getCommentsByArticleId = (articleId) => {
  return newsApi.get(`/articles/${articleId}/comments`);
};

export const changeArticleVotes = (articleId, votes) => {
  const reqBody = { inc_votes: votes };
  return newsApi.patch(`/articles/${articleId}`, reqBody);
};
