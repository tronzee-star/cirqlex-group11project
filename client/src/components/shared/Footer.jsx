export default function Footer() {
  return (
    <footer className="bg-green-950 text-white py-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-8">
        <div>
          <h3 className="text-white text-2xl font-bold mb-2">CirqleX</h3>
          <p>
            The power of a circular economy — driving sustainability and waste
            reduction for a better planet.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-green-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-green-400">FAQ</a></li>
            <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-400">Fb</a>
            <a href="#" className="hover:text-green-400">X</a>
            <a href="#" className="hover:text-green-400">Ig</a>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-8 text-sm">
        © 2025 CirqleX. All rights reserved.
      </p>
    </footer>
  );
}