import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { Article } from "./components/Article";
import { Users } from "./components/Users";
import { ErrorPage } from "./components/ErrorPage";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/topics/:topic" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
