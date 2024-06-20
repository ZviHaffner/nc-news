import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-project-nc-news.onrender.com/api",
});

export const getArticles = (filter_by, sort_by, order) => {
  return newsApi.get("/articles", { params: { filter_by, sort_by, order } });
};

export const getAllTopics = () => {
  return newsApi.get("/topics");
};

export const getAllUsers = () => {
  return newsApi.get("/users");
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

export const addComment = (articleId, username, comment) => {
  const reqBody = {
    username: username,
    body: comment,
  };
  return newsApi.post(`/articles/${articleId}/comments`, reqBody);
};

export const deleteComment = (commentId) => {
  return newsApi.delete(`/comments/${commentId}`);
};
