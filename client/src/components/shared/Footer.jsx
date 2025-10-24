export default function Footer() {
  return (
    <footer className="bg-green-950 text-white py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold mb-2">CirqleX</h2>
          <p className="text-gray-300">
            The power of a circular economy — driving sustainability and waste reduction for a better planet.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="text-white hover:text-green-400 transition">Contact Us</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-green-400 transition">FAQ</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-green-400 transition">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-green-400 transition">Fb</a>
            <a href="#" className="text-white hover:text-green-400 transition">X</a>
            <a href="#" className="text-white hover:text-green-400 transition">Ig</a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400 text-sm">
        © 2025 CirqleX. All rights reserved.
      </div>
    </footer>
  );
}
