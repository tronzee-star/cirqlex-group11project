import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error || data.message || "Login failed");
        return;
      }
      // store tokens and user
      if (data.access_token) localStorage.setItem("access_token", data.access_token);
      if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("current_user", JSON.stringify(data.user || {}));
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Network/server error. Please try again.");
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
            className="w-full py-2 mt-4 text-white font-semibold rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:opacity-90 transition"
          >
            Login
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
