import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        username: username.trim(),
        password: password.trim()
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        {error && (
          <div className="text-red-500 mb-4 text-sm text-center">
            {error}
          </div>
        )}
        
        <button 
          className={`w-full py-2 rounded text-white font-medium transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`} 
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Demo Credentials:</p>
          <p>Username: admin</p>
          <p>Password: admin123</p>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-500 hover:text-blue-600 text-sm">
            Don't have an account? Register here
          </Link>
        </div>
      </form>
    </div>
  );
}