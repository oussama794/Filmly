import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signup(username, password);
      navigate("/home");
    } else {
      const success = login(username, password);
      if (success) navigate("/home");
      else setError("Invalid credentials!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#1a202c]"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-[#1a202c] rounded-2xl shadow-lg p-6 w-[90%] max-w-md md:max-w-lg text-center mx-auto">
        <h1 className="text-3xl font-bold text-white">Filmly</h1>
        <p className="text-white mb-5">Your movie journey awaits</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-[#f6ad55] text-white py-2 rounded-lg font-bold shadow hover:opacity-90 transition w-full"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-[#f6ad55] font-semibold"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
