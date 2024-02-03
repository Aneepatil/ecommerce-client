import React from "react";

const AdminRoute = ({ children }) => {
  // Get user form localStorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.data?.isAdmin ? true : false;

  if (!isAdmin) return <h1>Access Denied, Admin Only</h1>;

  return children;
};

export default AdminRoute;
