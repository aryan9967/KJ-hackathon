import { Heart } from "lucide-react"; // Import the Heart icon
import React, { useState } from "react";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the item is favorited

  // Function to toggle the favorite state
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md" style={{ backgroundColor: "#fdf6ed" }}>
      {/* Product Image */}
      <a className="relative flex h-60 overflow-hidden " href="#">
        <img
          className="object-cover w-full h-full" // Ensure image covers the container and maintains aspect ratio
          src={product.image}
          alt={product.title}
        />
      </a>

      <div className="mt-4 px-3 pb-3">
        {/* Product Name */}
        <a href="#">
          <h5 className="text-xl font-semibold mb-3 text-gray-900 text-left">{product.title}</h5>
        </a>

        {/* Rating */}
        <div className="flex items-center">
          {[...Array(product.rating)].map((_, index) => (
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
          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-sm font-base">{product.rating}.0</span>
        </div>

        {/* Price and Discount */}
        <div className="mt-2 mb-5 flex items-center justify-between">
          <div className="flex items-center text-left">
            <p className="text-lg font-semibold mb-1 text-gray-900">₹{product.price}</p>
            {product.previous_price && (
              <>
                <p className="text-sm font-normal text-gray-500 line-through ml-4">₹{product.previous_price}</p>
                <p className="text-sm font-semibold text-green-500 ml-4">({product.discount}% Off)</p>
              </>
            )}
          </div>
        </div>

        {/* Buy Now Button */}
        <a
          href="#"
          className="flex items-center justify-center rounded-md bg-orange-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default CartCard;
