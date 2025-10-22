// src/components/shared/Navbar.jsx
export default function Navbar() {
  return (
    <header className="bg-green-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">CIRQLE X</div>
      <nav className="space-x-6 hidden md:block">
        <a href="#" className="hover:underline">Shop</a>
        <a href="#" className="hover:underline">Sell</a>
        <a href="#" className="hover:underline">Sustainability</a>
      </nav>
      <button className="bg-white text-green-900 px-4 py-1 rounded font-semibold">Sign In</button>
    </header>
  );
}
