import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Account created successfully:", data);
        // Store token and user info
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert("Account created successfully! Welcome to CircularShop.");
        navigate("/buyer-dashboard"); // redirect to dashboard
      } else {
        alert(data.error || "Sign-up failed. Try again.");
      }
    } catch (error) {
      console.error("❌ Error signing up:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-800 mb-6">
          Create an Account
        </h2>

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
            className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded-lg transition"
          >
            Sign Up
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
