import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);
  const [accountNotFound, setAccountNotFound] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setAccountNotFound(false);

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
    const nextRole = (data.user?.role || "").toLowerCase();
    if (nextRole === "admin") {
      navigate("/admin");
    } else if (nextRole === "vendor") {
      navigate("/seller-dashboard");
    } else {
      navigate("/buyer-dashboard");
    }
  } else {
    const errorMessage = data.error || "Login failed. Please try again.";
    
    // Check if the error indicates account not found
    if (errorMessage.toLowerCase().includes("not found") || 
        errorMessage.toLowerCase().includes("no user") ||
        errorMessage.toLowerCase().includes("doesn't exist") ||
        errorMessage.toLowerCase().includes("does not exist")) {
      setAccountNotFound(true);
      setError("Account not found. Would you like to create a new account?");
    } else {
      setError(errorMessage);
    }
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
      <div className={`rounded-lg border px-4 py-3 text-sm ${
        accountNotFound 
          ? 'border-blue-200 bg-blue-50 text-blue-700' 
          : 'border-red-200 bg-red-50 text-red-600'
      }`}>
        <p className="mb-2">{error}</p>
        {accountNotFound && (
          <button
            type="button"
            onClick={() => navigate("/signup", { state: { email } })}
            className="mt-2 w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition"
          >
            Create Account
          </button>
        )}
      </div>
    ) : null}

    <form onSubmit={handleLogin} className="space-y-4">
      {/* Email Field */}
      <label className="block text-sm text-white/80">
        <span className="mb-2 block font-medium">Email</span>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/70 outline-none focus:border-emerald-300 [appearance:textfield]"
          required
        />
      </label>

      {/* Password Field */}
      <label className="block text-sm text-white/80">
        <span className="mb-2 block font-medium">Password</span>
        <div className="flex items-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
          <FaLock className="mr-3 text-lg text-white/70" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-white/70 w-full [appearance:textfield]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-3 text-white/60 transition hover:text-white/90"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </label>

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
      <span
        role="link"
        tabIndex={0}
        onClick={() => navigate("/signup")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate("/signup");
          }
        }}
        className="cursor-pointer font-medium text-emerald-200 hover:underline"
      >
        Create one
      </span>
    </p>

    <p className="mt-2 text-center text-sm text-white/60">
      <span
        role="link"
        tabIndex={0}
        onClick={() => navigate("/")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate("/");
          }
        }}
        className="cursor-pointer font-medium text-emerald-100 hover:underline"
      >
        ← Back to Home
      </span>
    </p>
  </div>
</section>
  );
};

export default LoginPage;