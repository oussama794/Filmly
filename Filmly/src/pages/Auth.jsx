import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      if (isSignup) {
        signup(username, password);
        navigate("/home");
      } else {
        const success = login(username, password);
        if (success) {
          navigate("/home");
        } else {
          setError("Invalid credentials!");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2c3e50] px-4">
      {/* Background with movie collage effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 h-full">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="bg-gray-600 rounded animate-pulse" style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }} />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 bg-[#1a202c]/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#f6ad55] mb-2">Filmly</h1>
          <p className="text-white text-sm opacity-90">Your movie journey awaits</p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f6ad55] focus:border-transparent transition"
              disabled={loading}
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f6ad55] focus:border-transparent transition"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f6ad55] text-black py-4 rounded-lg font-bold text-lg shadow-lg hover:opacity-90 transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                {isSignup ? "Creating Account..." : "Signing In..."}
              </div>
            ) : (
              isSignup ? "Sign Up" : "Login"
            )}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
              className="text-[#f6ad55] font-semibold hover:opacity-80 transition"
              disabled={loading}
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Demo Info */}
        {!isSignup && (
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-xs text-center">
              Demo: Use any username/password combination to sign in
            </p>
          </div>
        )}
      </div>
    </div>
  );
}