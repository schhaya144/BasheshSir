import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { role, token } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/" />; // Redirect if not logged in
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />; // Restrict access

  return children;
};

export default ProtectedRoute;
