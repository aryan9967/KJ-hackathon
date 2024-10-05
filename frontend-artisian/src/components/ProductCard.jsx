import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ singleprod }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          src={singleprod?.imgUrl || "/api/placeholder/300/300"}
          alt={singleprod?.name}
          className="w-full h-64 object-cover hover:scale-105 transition duration-200"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-300">
          <Heart className="w-5 h-5 text-red-500" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h5 className="text-lg font-semibold text-white mb-1">{singleprod?.name}</h5>
          <p className="text-sm text-gray-200 line-clamp-2">{singleprod?.description}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-indigo-600">₹{singleprod?.price}</span>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-600">
              {singleprod.ratingAverage} ({singleprod?.ratingCount})
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center  py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-300">

            Add to cart
          </button>
          <button className=" bg-purple-500 text-white rounded-full hover:bg-purple-700 transition-colors duration-300 text-sm">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;