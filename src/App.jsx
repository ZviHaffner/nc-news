import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { Article } from "./components/Article";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
