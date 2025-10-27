import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext.jsx';

const FALLBACK_IMAGE = 'https://via.placeholder.com/600x480?text=Image+Coming+Soon';

const productSeed = [
  {
    id: 1,
    name: 'Handcrafted Clay Mug',
    price: '1,800',
    priceValue: 1800,
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80',
    category: 'Home & Living',
    condition: 'New',
    location: 'Nairobi',
    ownerId: null,
  },
  {
    id: 2,
    name: 'Reclaimed Teak Coffee Table',
    price: '12,500',
    priceValue: 12500,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=900&q=80',
    category: 'Furniture',
    condition: 'Used - Like New',
    location: 'Nairobi',
    ownerId: null,
  },
  {
    id: 3,
    name: 'Zero-Waste Starter Kit',
    price: '2,800',
    priceValue: 2800,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
    category: 'Lifestyle',
    condition: 'New',
    location: 'Nakuru',
    ownerId: null,
  },
  {
    id: 4,
    name: 'Organic Cotton Tee',
    price: '2,200',
    priceValue: 2200,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    category: 'Clothing',
    condition: 'Pre-loved',
    location: 'Nairobi',
    ownerId: null,
  },
  {
    id: 5,
    name: 'Solar-Powered Lantern',
    price: '3,200',
    priceValue: 3200,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    category: 'Electronics',
    condition: 'New',
    location: 'Naivasha',
    ownerId: null,
  },
  {
    id: 6,
    name: 'Vintage Rattan Chair',
    price: '5,400',
    priceValue: 5400,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
    category: 'Furniture',
    condition: 'Used - Good',
    location: 'Mombasa',
    ownerId: null,
  },
  {
    id: 7,
    name: 'Recycled Glass Planter Set',
    price: '1,900',
    priceValue: 1900,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
    category: 'Home & Living',
    condition: 'New',
    location: 'Kisumu',
    ownerId: null,
  },
  {
    id: 8,
    name: 'Handwoven Sisal Basket',
    price: '2,100',
    priceValue: 2100,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80',
    category: 'Home & Living',
    condition: 'New',
    location: 'Nairobi',
  },
  {
    id: 9,
    name: 'Upcycled Denim Sneakers',
    price: '2,600',
    priceValue: 2600,
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=80',
    category: 'Footwear',
    condition: 'Pre-loved',
    location: 'Eldoret',
    ownerId: null,
  },
  {
    id: 10,
    name: 'Community Library Starter Pack',
    price: '0',
    priceValue: 0,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    category: 'Education',
    condition: 'Used',
    location: 'Kisii',
    ownerId: null,
  },
];


const PRICE_FILTER_OPTIONS = ['Any', 'Under ksh 1,000', 'ksh 1,000 - 5,000', 'Over ksh 5,000'];

const DEFAULT_FILTERS = {
  Category: 'All',
  Condition: 'All',
  Location: 'All',
  Price: 'Any',
};

const FilterDropdown = ({ label, options, value, onSelect }) => {
  const selectedValue = value ?? options[0];

  return (
    <div className="relative group inline-block">
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-white/30 bg-[#0C7A60] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:border-white/60 hover:bg-[#095c48]"
      >
        <span className="font-semibold text-white/90">{label}:</span>
        <span className="text-white">{selectedValue}</span>
        <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="invisible absolute left-0 mt-2 w-52 rounded-2xl bg-[#0C7A60] shadow-xl ring-1 ring-white/20 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <ul className="py-2">
          {options.map((option) => (
            <li key={`${label}-${option}`}>
              <button
                type="button"
                onClick={() => onSelect(label, option)}
                className={`flex w-full px-4 py-2 text-left text-sm transition-colors ${
                  option === selectedValue
                    ? 'bg-white/15 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
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
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(() => ({ ...DEFAULT_FILTERS }));
  const navigate = useNavigate();
  const { token, user } = useAuth();

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
          ownerId: item.owner_id,
        }));

        if (isMounted) {
          setProducts(transformed.length ? transformed : productSeed);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        if (isMounted) {
          setError('Failed to load products. Showing sample items.');
          setProducts(
            productSeed.map((item) => ({
              ...item,
              ownerId: null,
            }))
          );
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const { categories, conditions, locations } = useMemo(() => {
    const source = products.length ? products : productSeed;
    const unique = (values) => [...new Set(values.filter(Boolean))];

    return {
      categories: ['All', ...unique(source.map((item) => item.category))],
      conditions: ['All', ...unique(source.map((item) => item.condition))],
      locations: ['All', ...unique(source.map((item) => item.location))],
    };
  }, [products]);

  const filterConfig = useMemo(
    () => [
      { label: 'Category', options: categories },
      { label: 'Condition', options: conditions },
      { label: 'Location', options: locations },
      { label: 'Price', options: PRICE_FILTER_OPTIONS },
    ],
    [categories, conditions, locations]
  );

  useEffect(() => {
    setFilters((prev) => {
      const next = { ...prev };
      let changed = false;

      if (!categories.includes(prev.Category)) {
        next.Category = 'All';
        changed = true;
      }

      if (!conditions.includes(prev.Condition)) {
        next.Condition = 'All';
        changed = true;
      }

      if (!locations.includes(prev.Location)) {
        next.Location = 'All';
        changed = true;
      }

      return changed ? next : prev;
    });
  }, [categories, conditions, locations]);

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

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = async (productId) => {
    if (!token) {
      alert('Please sign in to delete your listing.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if (!confirmDelete) return;

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Could not delete the listing. Please try again.');
    }
  };

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
    <div className="min-h-screen bg-[#0C7A60] px-4 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[36px] bg-white/10 shadow-2xl lg:flex-row">
        <aside className="w-full bg-[#0C7A60] px-8 py-10 text-white lg:w-1/3 lg:sticky lg:top-10 lg:overflow-auto lg:pr-4">
          <header className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">Shop with purpose</h1>
            <p className="text-lg text-emerald-100">
              Shop curated eco-friendly and sustainable products
            </p>
          </header>

          <div className="mt-10 space-y-6">
            <div className="relative aspect-[2/3] overflow-hidden rounded-3xl border-4 border-[#B872D2]/70 bg-white">
              <img
                src="https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=700&q=80"
                alt="Curated eco-friendly lifestyle display"
                className="h-full w-full object-cover"
              />
              <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B872D2] text-lg font-semibold text-white shadow-lg">
                B
              </span>
            </div>

            <div className="relative aspect-[2/3] overflow-hidden rounded-3xl border-4 border-[#0C7A60]/30 bg-white">
              <img
                src="https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=700&q=80"
                alt="Assortment of sustainable household goods"
                className="h-full w-full object-cover"
              />
              <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-lg font-semibold text-[#0C7A60] shadow-lg">
                Eco
              </span>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-white px-6 py-10 md:px-10">
          <div className="flex flex-col gap-6">
            <button
              type="button"
              onClick={handleBack}
              className="flex w-fit items-center gap-2 rounded-full border border-[#0C7A60]/20 bg-[#E9F7F1] px-4 py-2 text-sm font-medium text-[#0C7A60] transition hover:border-[#0C7A60] hover:bg-[#D6F0E7]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>

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
              {filterConfig.map((group) => (
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    isOwn={Boolean(user && product.ownerId && user.id === product.ownerId)}
                    onDelete={() => handleDelete(product.id)}
                  />
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
