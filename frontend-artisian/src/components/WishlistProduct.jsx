import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react'; // Import Heart icon

const WishlistProduct = ({ product, onAddToCart, onBuyNow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true); // Favorite state

  // Function to toggle favorite state
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
      style={{
        backgroundColor: "#fdf6ed",
        boxShadow: isHovered
          ? '0 12px 15px -5px rgba(0, 0, 0, 0.1), 0 5px 8px -3px rgba(0, 0, 0, 0.04)'
          : '0 8px 10px -3px rgba(0, 0, 0, 0.1), 0 3px 6px -2px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <a className="relative flex h-60 overflow-hidden" href="#">
        <img className="object-cover w-full h-full" src={product?.image} alt={product?.title} />
      </a>

      {/* Product Info */}
      <div className="mt-4 px-3 pb-3">
        <a href="#">
          <h5 className="text-xl font-semibold mb-3 text-gray-900 text-left">{product?.title}</h5>
        </a>

        {/* Rating Section */}
        <div className="flex items-center mb-3">
          {[...Array(Math.round(product?.rating))].map((_, index) => (
            <svg
              key={index}
              aria-hidden="true"
              className="h-6 w-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-sm font-base">{product?.rating}.0</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">₹{product?.price}.00</p>
          {product?.previousPrice && (
            <>
              <p className="text-sm text-gray-500 line-through">₹{product?.previousPrice}</p>
              <p className="text-sm text-green-500">({product?.discount}% Off)</p>
            </>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full border ${isFavorite ? 'bg-red-100 border-red-400' : 'bg-red-100 border-red-300'
            }`}
        >
          <Heart fill={isFavorite ? 'red' : 'none'} color={isFavorite ? 'red' : 'red'} />
        </button>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onAddToCart(product)}
            className="w-1/2 bg-white border border-orange-800 text-orange-800 hover:bg-orange-50 font-bold py-2 rounded-md flex justify-center items-center"
            style={{ transform: isHovered ? 'scale(1.01)' : 'scale(1)' }}
          >
            <ShoppingCart size={16} />
            <span className="ml-1">Add to Cart</span>
          </button>
          <button
            onClick={() => onBuyNow(product)}
            className="w-1/2 bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 rounded-md flex justify-center items-center"
            style={{ transform: isHovered ? 'scale(1.01)' : 'scale(1)' }}
          >
            <ShoppingCart size={16} />
            <span className="ml-1">Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistProduct;
