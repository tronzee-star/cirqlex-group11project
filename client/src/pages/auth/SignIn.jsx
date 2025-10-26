import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      email: email.trim().toLowerCase(),
      password,
    };

    if (!payload.email || !payload.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate("/buyer-dashboard");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      
    >
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 w-[350px] text-white">
        <h2 className="text-3xl font-bold mb-2">Login</h2>
        <p className="text-sm mb-6 opacity-80">
          Welcome back! Please login to your account
        </p>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Field */}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2">
            <FaUser className="text-white/80 mr-3" />
            <input
              type="text"
              placeholder="User Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2">
            <FaLock className="text-white/80 mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-white placeholder-white/70 w-full"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-green-500"
              />
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 mt-4 text-white font-semibold rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm mt-4 text-center text-white/80">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
