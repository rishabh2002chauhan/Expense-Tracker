import React from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  return (
    <>
      <div>AuthPage</div>
      <Link to={"/home"}>HomePage</Link>
    </>
  );
};

export default AuthPage;
