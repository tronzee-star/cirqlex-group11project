import Logo from "../../assets/phase5-logo1.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50 text-black mix-blend-normal">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="Cirqle X Logo"
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-8 text-sm font-medium text-black">
          <li><a href="#home" className="hover:text-green-700 transition">Home</a></li>
          <li><a href="#buy" className="hover:text-green-700 transition">Buy</a></li>
          <li><a href="#sell" className="hover:text-green-700 transition">Sell</a></li>
          <li><a href="#sustainability" className="hover:text-green-700 transition">Sustainability</a></li>
          <li><a href="#about" className="hover:text-green-700 transition">About us</a></li>
        </ul>

        {/* Search + Sign in */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 text-green placeholder-green-500"
          />
          <button className="bg-green-500 hover:bg-green-300 text-white text-sm font-medium px-4 py-1.5 rounded-lg shadow-sm transition">
            Sign in
          </button>
        </div>
      </div>
    </nav>
  );
}
