// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // we saved role after login

  if (!token) {
    alert("You need to login first!");
    return <Navigate to="/login" replace />;
  }

  // If route is restricted to specific roles
  if (allowedRoles && !allowedRoles.includes(role)) {
    alert("Unauthorized access!");
    // redirect user depending on role
    return role === "admin" ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return children;
};

export default ProtectedRoute;
