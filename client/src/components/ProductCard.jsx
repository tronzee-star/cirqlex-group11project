import React from 'react';

const ProductCard = ({ image, name, price }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden p-4">
      <div className="aspect-w-1 aspect-h-1 w-full mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">{name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-900">ksh {price}</p>
        <button className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;