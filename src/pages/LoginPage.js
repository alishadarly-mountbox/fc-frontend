import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("token", "admin-token");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <input
          className="w-full p-2 border rounded mb-4"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        
        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        
        {error && (
          <div className="text-red-500 mb-4 text-sm text-center">
            {error}
          </div>
        )}
        
        <button 
          className="w-full py-2 rounded text-white font-medium bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Username: admin</p>
          <p>Password: admin123</p>
        </div>
      </form>
    </div>
  );
}