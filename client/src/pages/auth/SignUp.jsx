// src/pages/auth/SignUp.jsx
import logo from '../../assets/phase5-logo1.png'; // adjust path and filename

export default function SignUp() {
  return (
    <div className="min-h-screen bg-teal-600 text-white flex flex-col">
      {/* Top Navigation */}
      <header className="flex justify-between items-center px-6 py-4">
        <img src={logo} alt="CirqleX Logo" className="h-8 w-auto" />
        <nav className="space-x-6 hidden md:flex items-center">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/signin" className="bg-white text-teal-600 px-4 py-1 rounded font-semibold">Sign In</a>
        </nav>
      </header>

      {/* Sign Up Form */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white text-black p-8 rounded shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="gloria@gmail.com"
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded font-semibold hover:bg-teal-700"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">Or continue with</div>
          <div className="mt-4 flex flex-col gap-3">
            <button className="w-full border py-2 rounded hover:bg-gray-100">Continue with Google</button>
            <button className="w-full border py-2 rounded hover:bg-gray-100">Continue with Apple</button>
          </div>
        </div>
      </main>
    </div>
  );
}
