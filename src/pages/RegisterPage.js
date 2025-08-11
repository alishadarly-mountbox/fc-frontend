import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await API.post("/auth/register", { username, password });
      
      if (response.data.success) {
        setSuccess("Registration successful! You can now login.");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-80" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
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
        
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        {error && (
          <div className="text-red-500 mb-4 text-sm text-center">
            {error}
          </div>
        )}
        
        {success && (
          <div className="text-green-500 mb-4 text-sm text-center">
            {success}
          </div>
        )}
        
        <button 
          className={`w-full py-2 rounded text-white font-medium transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'
          }`} 
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
        
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500 hover:text-blue-600 text-sm">
            Already have an account? Login here
          </Link>
        </div>
      </form>
    </div>
  );
}
