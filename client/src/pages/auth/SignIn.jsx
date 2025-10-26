import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
        login(data.user, data.access_token);
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
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#062b22] via-[#0c4f3f] to-[#0c7a60] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-10 text-white shadow-2xl backdrop-blur-xl">
        <h2 className="mb-3 text-center text-3xl font-semibold">Welcome Back</h2>
        <p className="mb-6 text-center text-sm text-white/80">
          Sign in to manage your circular marketplace experience.
        </p>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Field */}
          <div className="flex items-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
            <FaUser className="mr-3 text-lg text-white/80" />
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
          <div className="flex items-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
            <FaLock className="mr-3 text-lg text-white/80" />
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
          <div className="mt-2 flex items-center justify-between text-sm">
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
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 py-3 text-sm font-semibold tracking-wide text-white transition hover:from-emerald-500 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-white/80">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="font-medium text-emerald-200 hover:underline"
          >
            Create one
          </button>
        </p>

        <p className="mt-2 text-center text-sm text-white/60">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-medium text-emerald-100 hover:underline"
          >
            ← Back to Home
          </button>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
