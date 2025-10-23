// src/components/shared/Navbar.jsx
export default function Navbar() {
  return (
    <header className="bg-green-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side: Logo + Nav */}
        <div className="flex items-center space-x-8">
          <div className="text-xl font-bold">CIRQLE X</div>
          <nav className="space-x-6 hidden md:block">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Buy</a>
            <a href="#" className="hover:underline">Sell</a>
            <a href="#" className="hover:underline">Sustainability</a>
          </nav>
        </div>

        {/* Right side: Search + Sign In */}
        <div className="flex items-centre space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded text-black placeholder-gray-500 focus:outline-none"
          />
          <button className="bg-white text-green-900 px-4 py-1 rounded font-semibold">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
