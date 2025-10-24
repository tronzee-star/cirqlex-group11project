import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(" Signed in successfully:", data);
        navigate("/buyer-dashboard"); // Redirect to dashboard
      } else if (response.status === 404) {
        alert("No account found. Redirecting to Sign Up...");
        navigate("/signup");
      } else {
        alert(data.message || "Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error(" Error signing in:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-teal-900 flex flex-col">
      {/* Navbar */}
     {/*<nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">*/}
        <div className="flex items-center space-x-2">
        
           
        </div>

        <div className="flex items-center space-x-6 text-gray-700 font-medium">
        
        
        </div>
      

      {/* Sign In Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-gray-100 rounded-lg shadow-lg w-full max-w-md p-8 text-center">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Welcome back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-200 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-200 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Log in button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition"
            >
              Log in
            </button>
          </form>

          {/* Forgot Password */}
          <p className="text-sm text-green-800 mt-3 hover:underline cursor-pointer">
            Forgot Password?
          </p>

          {/* Continue with */}
          <p className="text-sm text-gray-600 mt-4">Or continue with</p>

          <div className="flex justify-center space-x-4 mt-3">
            <button className="bg-gray-200 hover:bg-gray-300 font-semibold text-sm py-2 px-4 rounded-md transition">
              Continue with Google
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 font-semibold text-sm py-2 px-4 rounded-md transition">
              Continue with Apple
            </button>
          </div>

          {/* Sign Up Redirect */}
          <p className="text-sm text-green-900 mt-5">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-green-700 hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
