import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: location.state?.email || "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

const payload = {
  name: formData.name.trim(),
  email: formData.email.trim().toLowerCase(),
  password: formData.password,
};

if (!payload.name || !payload.email || !payload.password || !formData.confirmPassword) {
  setError("Please fill in all fields.");
  return;
}

if (formData.password !== formData.confirmPassword) {
  setError("Passwords do not match.");
  return;
}

try {
  setIsSubmitting(true);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (response.ok) {
    login(data.user, data.access_token);
    navigate("/buyer-dashboard");
  } else {
    setError(data.error || "Sign-up failed. Try again.");
  }
} catch (err) {
  console.error("Error signing up:", err);
  setError("Server error. Please try again later.");
} finally {
  setIsSubmitting(false);
}
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#062b22] via-[#0c4f3f] to-[#0c7a60] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-10 text-white shadow-2xl backdrop-blur-xl">
        <h2 className="mb-3 text-center text-3xl font-semibold">Create an Account</h2>

    {error ? (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </div>
    ) : null}

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <label className="block text-sm text-white/80">
        <span className="mb-2 block font-medium">Full name</span>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/70 outline-none focus:border-emerald-300 [appearance:textfield]"
        />
      </label>

      {/* Email */}
      <label className="block text-sm text-white/80">
        <span className="mb-2 block font-medium">Email</span>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="new-email"
          inputMode="email"
          value={formData.email}
          onChange={handleChange}
          required
          
        />
      </label>

      {/* Password */}
      <label className="block text-sm text-white/80">
        <span className="mb-2 block font-medium">Password</span>
        <div className="flex items-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
          <FaLock className="mr-3 text-lg text-white/70" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-transparent outline-none text-white placeholder-white/70 w-full [appearance:textfield]"
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

      {/* Confirm Password */}
      <label className="block text-sm text-white/80">
        <span className="mb-2 block font-medium">Confirm password</span>
        <div className="flex items-center rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
          <FaLock className="mr-3 text-lg text-white/70" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Repeat password"
            autoComplete="off"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="bg-transparent outline-none text-white placeholder-white/70 w-full [appearance:textfield]"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="ml-3 text-white/60 transition hover:text-white/90"
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </label>

      {/* Sign Up Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 py-3 text-sm font-semibold tracking-wide text-white transition hover:from-emerald-500 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Sign Up"}
      </button>
    </form>

    {/* Sign In Redirect */}
    <p className="mt-6 text-center text-sm text-white/80">
      Already have an account?{" "}
      <Link to="/signin" className="font-medium text-emerald-200 hover:underline">
        Sign In
      </Link>
    </p>
  </div>
</section>
  );
}