import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

// Placeholder image for the left side
const PRODUCT_DISPLAY_IMAGE = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80';

export default function Sell() {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: '',
    category: '',
    location: '',
  });
  
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !token) {
      setError('Please sign in to list a product.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
      
      // Create product data
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        condition: formData.condition,
        category: formData.category || 'Misc',
        location: formData.location || 'Nairobi',
        image_url: imageUrl || 'https://via.placeholder.com/600x480?text=No+Image',
      };

      const response = await fetch(`${API_BASE}/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          condition: '',
          category: '',
          location: '',
        });
        setImageUrl('');

        // Reset success message after 3 seconds
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        setError(data.error || 'Failed to create product listing');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] bg-white/95 shadow-2xl ring-1 ring-black/5">
          <div className="bg-[#0C7A60] px-8 py-10 text-white sm:px-10">
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h1 className="text-3xl font-semibold sm:text-4xl">Sell with purpose</h1>
                <p className="mt-2 text-sm sm:text-base text-emerald-100">
                  sell sustainable and ecofriendly products
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/seller-dashboard')}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/40 px-6 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto sm:justify-start"
                >
                  ← Back to Seller Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/40 px-6 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto sm:justify-end"
                >
                  Go to Shop →
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-10 px-6 pb-10 pt-8 sm:px-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            {/* Left Side - Story & Image */}
            <div className="mx-auto w-full max-w-md rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-100 to-amber-50 p-8 shadow-inner">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-2xl font-semibold text-gray-800 leading-snug">
                  Tell your sustainability story
                </h2>
                <p className="text-sm text-amber-800/80">
                  Highlight the eco-friendly journey behind your product and inspire conscious buyers.
                </p>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={PRODUCT_DISPLAY_IMAGE}
                    alt="Eco-friendly products"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-lg sm:p-8">
              {submitSuccess && (
                <div className="mb-6 flex items-center rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  <CheckCircle className="mr-2" size={20} />
                  Product listed successfully!
                </div>
              )}

              {error && (
                <div className="mb-6 flex items-center rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  <AlertCircle className="mr-2" size={20} />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Product name</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="enter product name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="enter product description"
                    rows="4"
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="enter price"
                    step="0.01"
                    min="0"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    required
                  />
                </div>

                {/* Condition */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    required
                  >
                    <option value="">choose condition</option>
                    <option value="New">New</option>
                    <option value="Used - Like New">Used - Like New</option>
                    <option value="Used - Good">Used - Good</option>
                    <option value="Pre-loved">Pre-loved</option>
                    <option value="Used">Used</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    required
                  >
                    <option value="">choose category</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Education">Education</option>
                    <option value="Misc">Miscellaneous</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="enter location (e.g., Nairobi)"
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">upload images</label>
                  <div className="rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/60 p-6 text-center">
                    <Upload className="mx-auto mb-3 text-teal-400" size={40} />
                    <p className="mb-4 text-xs font-medium uppercase tracking-wide text-teal-600">
                      drag and drop images here or select file
                    </p>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Paste image URL here"
                      className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-[#109071] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#0c755c]"
                    >
                      Upload images...
                    </button>
                  </div>

                  {/* Image Preview */}
                  {imageUrl && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="h-48 w-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/600x480?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-full bg-[#0C7A60] py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#095c48] disabled:bg-teal-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'List Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
