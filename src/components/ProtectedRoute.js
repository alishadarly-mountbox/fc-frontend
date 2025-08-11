import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = localStorage.getItem('user');
  
  if (!isLoggedIn || !user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}