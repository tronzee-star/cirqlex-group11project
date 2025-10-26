import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';

const productSeed = [
  {
    id: 1,
    name: 'Organic cotton T shirt',
    price: '2,000',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    name: 'Bamboo toothbrush set',
    price: '200',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Reusable coffee cup',
    price: '1,000',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    name: 'Recycled polyester jacket',
    price: '2,500',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    name: 'Eco-friendly candles',
    price: '700',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    name: 'Upcycled furniture',
    price: '5,000',
    image: 'https://images.unsplash.com/photo-1555041469-a586bacd6d9d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 7,
    name: 'Handmade tote bag',
    price: '1,200',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 8,
    name: 'Zero waste starter kit',
    price: '1,800',
    image: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1000&q=80',
  },
];

const filterGroups = [
  {
    label: 'Category',
    options: ['All', 'Clothing', 'Accessories', 'Home & Living', 'Beauty'],
  },
  {
    label: 'Condition',
    options: ['New', 'Refurbished', 'Pre-loved'],
  },
  {
    label: 'Price',
    options: ['Under ksh 1,000', 'ksh 1,000 - 5,000', 'Over ksh 5,000'],
  },
  {
    label: 'Location',
    options: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
  },
];

const heroCategories = [
  { icon: '👜', label: 'Accessories' },
  { icon: '👕', label: 'Clothing' },
  { icon: '🏠', label: 'Home' },
  { icon: '🌿', label: 'Eco living' },
];

const FilterDropdown = ({ label, options }) => (
  <div className="relative group inline-block">
    <button
      type="button"
      className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-[#0C7A60]"
    >
      {label}
      <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
    <div className="invisible absolute left-0 mt-2 w-48 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
      <ul className="py-2">
        {options.map((option) => (
          <li key={`${label}-${option}`}>
            <button
              type="button"
              className="flex w-full px-4 py-2 text-left text-sm text-gray-600 transition-colors hover:bg-[#E9F7F1] hover:text-[#0C7A60]"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setProducts(productSeed);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      ),
    [products, searchTerm]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C7A60] text-white">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C7A60] px-4">
        <div className="rounded-2xl bg-white px-6 py-4 text-center text-red-600 shadow-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C7A60] px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[36px] bg-white/10 shadow-2xl lg:flex-row">
        <aside className="w-full bg-[#0C7A60] px-8 py-10 text-white lg:w-1/3">
          <header className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">Shop with purpose</h1>
            <p className="text-lg text-emerald-100">
              Shop curated eco-friendly and sustainable products
            </p>
          </header>

          <div className="relative mt-10 overflow-hidden rounded-3xl border-4 border-[#B872D2]/70 bg-white">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1100&q=80"
              alt="Eco tote bag"
              className="h-80 w-full object-cover"
            />
            <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B872D2] text-lg font-semibold text-white shadow-lg">
              B
            </span>
          </div>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-semibold">Shop by category</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {heroCategories.map(({ icon, label }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/10 px-4 py-3 text-center font-medium text-white shadow-sm backdrop-blur transition hover:bg-white/20"
                >
                  <div className="text-xl">{icon}</div>
                  <p className="mt-1 capitalize">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <main className="flex-1 bg-white px-6 py-10 md:px-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">All Products</h2>
              <div className="relative w-full max-w-md">
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0C7A60]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search for products"
                  className="w-full rounded-full bg-[#D6F0E7] py-3 pl-12 pr-4 text-sm text-[#0C7A60] placeholder:text-[#0C7A60]/60 focus:outline-none focus:ring-2 focus:ring-[#0C7A60]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {filterGroups.map((group) => (
                <FilterDropdown key={group.label} {...group} />
              ))}
            </div>

            {filteredProducts.length ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl bg-[#F5F5F5] px-6 py-10 text-center text-gray-500">
                No products found matching your search.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
