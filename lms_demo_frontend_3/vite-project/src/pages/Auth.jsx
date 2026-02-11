import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const user = res.data; // expecting: { email, role, ... }

      // Save login state
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loggedIn", "true");

      // Dispatch event to notify App.jsx to update state
      window.dispatchEvent(new CustomEvent("authChange"));

      // Navigate based on role
      if (user.role === "ADMIN") {
        navigate("/", { replace: true });
      } else if (user.role === "STUDENT") {
        navigate("/student-dashboard", { replace: true });
      } else {
        setError("Unknown role received from server.");
      }

    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-800 mb-2">Login</h1>
            <p className="text-sm text-gray-500">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
