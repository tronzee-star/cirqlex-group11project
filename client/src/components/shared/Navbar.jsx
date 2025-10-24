import { Link } from "react-router-dom";
import Logo from "../../assets/phase5-logo1.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-sm border-b border-gray-200 shadow-sm z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        
        {/* Logo (clickable) */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="Cirqle X Logo"
            className="w-10 h-10 object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-8 text-sm font-bold text-black-600">
          <li><a href="#home" className="hover:text-black-400 transition">Home</a></li>
          <li><Link to="/about">About Us</Link></li>
          <li><a href="#buy" className="hover:text-green-600 transition">Buy</a></li>
          <li><a href="#sell" className="hover:text-green-600 transition">Sell</a></li>
          <li><a href="#sustainability" className="hover:text-green-600 transition">Sustainability</a></li>
        </ul>

        {/* Search + Sign In */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <Link
            to="/signin"
            className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-1.5 rounded-lg shadow-sm transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
