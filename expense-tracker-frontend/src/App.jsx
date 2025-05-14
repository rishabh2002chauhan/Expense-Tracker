import { useState } from "react";
import "./App.css";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
