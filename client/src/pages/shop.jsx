import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000/api';  // Directly set the backend URL

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/products/`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        if (!ignore) setItems(data.items || []);
      } catch (e) {
        if (!ignore) setError(String(e));
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true };
  }, []);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-teal-700">
      <div className="flex min-h-screen">
        {/* Left Column - Title and Hero Image */}
        <div className="w-[35%] p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-white mb-3">Shop with purpose</h1>
            <p className="text-gray-200 text-lg">Shop curated eco-friendly and sustainable products</p>
          </div>

          <div className="sticky top-6">
            <div className="aspect-[4/5] bg-teal-800 rounded-xl overflow-hidden">
              <img
                src="" // You'll add the image path
                alt="Sustainable products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="w-[65%] p-6 overflow-y-auto">
          <div className="max-w-4xl">

            {/* Search Bar */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full px-5 py-3 pr-12 rounded-xl bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none shadow-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="relative group">
                <button className="px-5 py-2 bg-white/95 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-2 shadow-sm">
                  Category
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Clothing</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home & Living</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Accessories</a>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="px-4 py-1.5 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
                  Condition
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">New</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Used - Like New</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Used - Good</a>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="px-4 py-1.5 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
                  Price
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Under ksh 1,000</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ksh 1,000 - 5,000</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Over ksh 5,000</a>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="px-4 py-1.5 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
                  Location
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Nairobi</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mombasa</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kisumu</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
