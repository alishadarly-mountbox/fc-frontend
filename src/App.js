import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const isAuth = Boolean(localStorage.getItem("token"));

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuth ? "/dashboard" : "/login"} />} />
      <Route 
        path="/login" 
        element={isAuth ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route 
        path="/dashboard" 
        element={isAuth ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;