import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

    if (!payload.name || !payload.email || !payload.password) {
      setError("Please fill in all fields.");
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
    <section className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-800 mb-6">
          Create an Account
        </h2>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="new-email"
              inputMode="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Sign In Redirect */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-green-700 hover:underline">
            Sign In
          </Link>
        </p>

        {/* Back to Home */}
        <p className="text-sm text-gray-600 text-center mt-2">
          <Link to="/" className="text-green-600 hover:underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </section>
  );
}
