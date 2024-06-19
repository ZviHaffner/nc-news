import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { Article } from "./components/Article";
import { Users } from "./components/Users";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
