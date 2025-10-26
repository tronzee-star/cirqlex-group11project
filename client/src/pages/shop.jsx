import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';

const FALLBACK_IMAGE = 'https://via.placeholder.com/600x480?text=Image+Coming+Soon';

const productSeed = [
  {
    id: 1,
    name: 'Organic cotton T shirt',
    price: '2,000',
    priceValue: 2000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
    category: 'Clothing',
    condition: 'New',
    location: 'Nairobi',
  },
  {
    id: 2,
    name: 'Bamboo toothbrush set',
    price: '200',
    priceValue: 200,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80',
    category: 'Beauty',
    condition: 'New',
    location: 'Mombasa',
  },
  {
    id: 3,
    name: 'Reusable coffee cup',
    price: '1,000',
    priceValue: 1000,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80',
    category: 'Home & Living',
    condition: 'New',
    location: 'Nakuru',
  },
  {
    id: 4,
    name: 'Recycled polyester jacket',
    price: '2,500',
    priceValue: 2500,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    category: 'Clothing',
    condition: 'Pre-loved',
    location: 'Kisumu',
  },
  {
    id: 5,
    name: 'Eco-friendly candles',
    price: '700',
    priceValue: 700,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80',
    category: 'Home & Living',
    condition: 'New',
    location: 'Nairobi',
  },
  {
    id: 6,
    name: 'Upcycled furniture',
    price: '5,000',
    priceValue: 5000,
    image: 'https://images.unsplash.com/photo-1555041469-a586bacd6d9d?auto=format&fit=crop&w=1000&q=80',
    category: 'Home & Living',
    condition: 'Pre-loved',
    location: 'Mombasa',
  },
  {
    id: 7,
    name: 'Handmade tote bag',
    price: '1,200',
    priceValue: 1200,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80',
    category: 'Accessories',
    condition: 'New',
    location: 'Kisumu',
  },
  {
    id: 8,
    name: 'Zero waste starter kit',
    price: '1,800',
    priceValue: 1800,
    image: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1000&q=80',
    category: 'Accessories',
    condition: 'New',
    location: 'Nairobi',
  },
];

const filterGroups = [
  {
    label: 'Category',
    options: ['All', 'Clothing', 'Accessories', 'Home & Living', 'Beauty'],
    defaultOption: 'All',
  },
  {
    label: 'Condition',
    options: ['All', 'New', 'Refurbished', 'Pre-loved'],
    defaultOption: 'All',
  },
  {
    label: 'Price',
    options: ['Any', 'Under ksh 1,000', 'ksh 1,000 - 5,000', 'Over ksh 5,000'],
    defaultOption: 'Any',
  },
  {
    label: 'Location',
    options: ['All', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
    defaultOption: 'All',
  },
];

const defaultFilterValues = filterGroups.reduce((acc, group) => {
  acc[group.label] = group.defaultOption;
  return acc;
}, {});

const heroCategories = [
  { icon: '👜', label: 'Accessories' },
  { icon: '👕', label: 'Clothing' },
  { icon: '🏠', label: 'Home' },
  { icon: '🌿', label: 'Eco living' },
];

const FilterDropdown = ({ label, options, value, onSelect }) => (
  <div className="relative group inline-block">
    <button
      type="button"
      className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-[#0C7A60]"
    >
      {value}
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
              onClick={() => onSelect(label, option)}
              className={`flex w-full px-4 py-2 text-left text-sm transition-colors ${
                option === value
                  ? 'bg-[#E9F7F1] text-[#0C7A60]'
                  : 'text-gray-600 hover:bg-[#E9F7F1] hover:text-[#0C7A60]'
              }`}
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
  const [filters, setFilters] = useState(defaultFilterValues);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

      try {
        const response = await fetch(`${API_BASE}/products/`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        const items = Array.isArray(data?.items) ? data.items : [];

        const transformed = items.map((item) => ({
          id: item.id,
          name: item.title ?? 'Untitled product',
          price: item.price ? item.price.toLocaleString() : '0',
          priceValue: typeof item.price === 'number' ? item.price : Number(item.price) || 0,
          category: item.category || 'Misc',
          condition: item.condition || 'New',
          location: item.location || 'N/A',
          image: item.image_url || FALLBACK_IMAGE,
        }));

        if (isMounted) {
          setProducts(transformed.length ? transformed : productSeed);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        if (isMounted) {
          setError('Failed to load products. Showing sample items.');
          setProducts(productSeed);
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());

        const matchesCategory =
          filters.Category === 'All' || product.category === filters.Category;

        const matchesCondition =
          filters.Condition === 'All' || product.condition === filters.Condition;

        const matchesLocation =
          filters.Location === 'All' || product.location === filters.Location;

        const priceValue = product.priceValue ?? 0;
        let matchesPrice = true;

        if (filters.Price === 'Under ksh 1,000') {
          matchesPrice = priceValue < 1000;
        } else if (filters.Price === 'ksh 1,000 - 5,000') {
          matchesPrice = priceValue >= 1000 && priceValue <= 5000;
        } else if (filters.Price === 'Over ksh 5,000') {
          matchesPrice = priceValue > 5000;
        }

        return matchesSearch && matchesCategory && matchesCondition && matchesLocation && matchesPrice;
      }),
    [products, searchTerm, filters]
  );

  const handleFilterSelect = (label, value) => {
    setFilters((prev) => ({ ...prev, [label]: value }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C7A60] text-white">
        Loading products...
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
                <FilterDropdown
                  key={group.label}
                  label={group.label}
                  options={group.options}
                  value={filters[group.label]}
                  onSelect={handleFilterSelect}
                />
              ))}
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

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
