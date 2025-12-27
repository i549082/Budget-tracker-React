import { Navigate } from "react-router-dom";
import { decodeToken } from "./authUtility.tsx";
import React from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = decodeToken();

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
