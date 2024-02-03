import React from "react";
import Login from "../Users/Forms/Login";

const AuthRoute = ({ children }) => {
  // Get user form localStorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedin = user?.data?.token ? true : false;

  if (!isLoggedin) return <Login />;

  return children;
};

export default AuthRoute;
