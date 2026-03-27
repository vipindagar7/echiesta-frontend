import React from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children, role }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.log(err)
    user = null;
  }

  const token = localStorage.getItem("token");

  // 🔥 fallback logic
  if (!user && token) {
    user = { token }; // minimal fallback
  }
  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // ❌ Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/admin-login" replace />;
  }

  // ✅ Allowed
  return children;
}