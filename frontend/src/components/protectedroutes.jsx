import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children, roles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(role)) {
    if (role === "GUEST") {
      return <Navigate to="/profile" />;
    } else if (role === "TUTOR") {
      return <Navigate to="/dashboard" />;
    } else if (role === "ADMIN") {
      return <Navigate to="/admin/dashboard" />;
    } else if (role === "EDUCATION_MANAGER") {
      return <Navigate to="/education-manager/dashboard" />;
    }

    return <Navigate to="/login" />;
  }

  return children;
}
