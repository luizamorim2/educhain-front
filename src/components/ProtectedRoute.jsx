import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

const ProtectedRoute = ({ element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
