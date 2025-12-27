import { Navigate } from "react-router-dom";
import { decodeToken } from "./authUtility.tsx";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const user = decodeToken();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/dashboard" replace />;

  return children;
}
