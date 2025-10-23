export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow fixed w-full top-0 z-50">
     <div className="flex items-center space-x-2">
  <img
    src="./src/assets/phase5-logo1.png"
    
    className="w-12 h-12 object-contain"
  />
  {/*<span className="text-2xl font-bold text-green-700">CIRQLE X</span>*/}
</div>

      <ul className="hidden md:flex space-x-8 text-gray-800 font-medium">
        <li><a href="#home" className="hover:text-green-600">Home</a></li>
        <li><a href="#buy" className="hover:text-green-600">Buy</a></li>
        <li><a href="#sell" className="hover:text-green-600">Sell</a></li>
        <li><a href="#sustainability" className="hover:text-green-600">Sustainability</a></li>
        <li><a href="#about" className="hover:text-green-600">About us</a></li>
      </ul>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-green-200"
        />
        <button className="bg-green-700 text-white px-4 py-1 rounded-lg hover:bg-green-800">
          Sign in
        </button>
      </div>
    </nav>
  );
}
