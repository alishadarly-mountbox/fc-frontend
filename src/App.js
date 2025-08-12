import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

function App() {
  // Check if user is authenticated
  const isAuth = Boolean(localStorage.getItem('token'));

  // Protect routes that require authentication
  const PrivateRoute = ({ children }) => {
    return isAuth ? children : <Navigate to="/login" />;
  };

  // Redirect authenticated users from auth pages
  const AuthRoute = ({ children }) => {
    return !isAuth ? children : <Navigate to="/dashboard" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to={isAuth ? "/dashboard" : "/login"} />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;