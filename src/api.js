import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-project-nc-news.onrender.com/api",
});

export const getAllArticles = () => {
  return newsApi.get("/articles");
};
