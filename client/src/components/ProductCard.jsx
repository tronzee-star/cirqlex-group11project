import React, { useState } from 'react';

const ProductCard = ({ image, name, price }) => {
  const [imgSrc, setImgSrc] = useState(image);
  const fallbackImage = 'https://via.placeholder.com/400x320?text=Image+Unavailable';

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

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
        <p className="text-sm text-gray-600">ksh {price}</p>
        <button className="inline-flex items-center justify-center w-full rounded-full bg-[#00A651] px-4 py-2 text-sm font-semibold text-white hover:bg-[#009245] transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;