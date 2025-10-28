import React, { useMemo, useState } from 'react';
import { useCart } from '../context/CardContext.jsx';

const ProductCard = ({ id, image, name, price, priceValue, isOwn = false, onDelete, onAddToCart, onEdit }) => {
  const [imgSrc, setImgSrc] = useState(image);
  const { addItem } = useCart();
  const fallbackImage = 'https://via.placeholder.com/400x320?text=Image+Unavailable';

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  const handleAddToCart = () => {
    const numericPrice = (() => {
      if (typeof priceValue === 'number' && Number.isFinite(priceValue)) {
        return priceValue;
      }
      const parsed = Number(String(price ?? formattedPrice).replace(/[^0-9.]/g, ''));
      return Number.isFinite(parsed) ? parsed : 0;
    })();

    addItem({ id, name, image, priceValue: numericPrice, quantity: 1 });
    if (typeof onAddToCart === 'function') {
      onAddToCart();
    }
  };

  const formattedPrice = useMemo(() => {
    if (price) return price;
    const numeric = typeof priceValue === 'number' ? priceValue : Number(priceValue) || 0;
    return numeric.toLocaleString();
  }, [price, priceValue]);

  return (
    <div className="bg-[#F5F5F5] border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-white">
        <img
          src={imgSrc}
          alt={name}
          onError={handleImageError}
          className="w-full h-44 object-cover"
        />
      </div>
      <div className="p-4 text-center space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 capitalize">{name}</h3>
        <p className="text-sm text-gray-600">ksh {formattedPrice}</p>
        {!isOwn ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center w-full rounded-full bg-[#00A651] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#009245]"
          >
            Add to Cart
          </button>
        ) : null}
        {isOwn && typeof onEdit === 'function' ? (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center justify-center w-full rounded-full border border-[#0C7A60]/40 bg-white px-4 py-2 text-sm font-semibold text-[#0C7A60] transition-colors hover:border-[#0C7A60] hover:bg-[#E9F7F1]"
          >
            Edit Listing
          </button>
        ) : null}
        {isOwn && onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center justify-center w-full rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-100"
          >
            Delete Listing
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ProductCard;