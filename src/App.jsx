import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
