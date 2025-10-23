import React from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const products = [
    {
      id: 1,
      name: 'Organic cotton T-shirt',
      price: '2,000',
      image: '' // You'll add the image path
    },
    {
      id: 2,
      name: 'Bamboo toothbrush set',
      price: '200',
      image: '' // You'll add the image path
    },
    {
      id: 3,
      name: 'reusable coffee cup',
      price: '1,000',
      image: '' // You'll add the image path
    },
    {
      id: 4,
      name: 'Recycled polyester jacket',
      price: '2,500',
      image: '' // You'll add the image path
    },
    {
      id: 5,
      name: 'eco-friendly candles',
      price: '700',
      image: '' // You'll add the image path
    },
    {
      id: 6,
      name: 'upcycled furniture',
      price: '5,000',
      image: '' // You'll add the image path
    }
  ];

  return (
    <div className="min-h-screen bg-teal-700">
      {/* Header Section with Search */}
      <div className="bg-teal-700 py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif text-white mb-2">Shop with purpose</h1>
          <p className="text-gray-200 mb-4">Shop curated eco-friendly and sustainable products</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full px-4 py-2.5 pr-10 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8">
          <button className="px-4 py-1.5 bg-white rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
            Category
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <button className="px-4 py-1.5 bg-white rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
            Condition
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <button className="px-4 py-1.5 bg-white rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
            Price
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <button className="px-4 py-1.5 bg-white rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-1">
            Location
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,2fr] gap-8">
          {/* Left Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-teal-800 rounded-xl overflow-hidden">
              <img
                src="" // You'll add the image path
                alt="Sustainable products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="w-full px-4 py-2.5 pr-10 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
              </div>

              {/* Filter Buttons with Dropdowns */}
              <div className="flex flex-wrap gap-3">
                <div className="relative group">
                  <button className="px-4 py-1.5 bg-white rounded-lg text-sm text-teal-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    Category
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Clothing</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home & Living</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Accessories</a>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <button className="px-4 py-1.5 bg-white rounded-lg text-sm text-teal-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    Condition
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">New</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Used - Like New</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Used - Good</a>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <button className="px-4 py-1.5 bg-white rounded-lg text-sm text-teal-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    Price
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Under ksh 1,000</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ksh 1,000 - 5,000</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Over ksh 5,000</a>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <button className="px-4 py-1.5 bg-white rounded-lg text-sm text-teal-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    Location
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Nairobi</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mombasa</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kisumu</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Right Products Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
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
