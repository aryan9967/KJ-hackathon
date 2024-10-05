import { useEffect, useState } from "react";
import Chatbot from "../components/chatbot";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import WishlistProduct from "../components/WishlistProduct";
import axios from "axios";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const [wishlist, setWhishlist] = useState(null);

  useEffect(() => {
    get_whishlist();
  }, []);

  async function get_whishlist() {
    try {
      const { data } = await axios.get("http://localhost:3000/wishlist");
      console.log(data);
      setWhishlist(data.wishlist_products);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen">

        <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <Heart className="text-red-500 mr-3" size={24} />
            <h2 className="text-2xl font-semibold text-gray-800">Your Wishlist</h2>
          </div>
          <div className="text-sm font-medium text-gray-500">
            {wishlist?.length} {wishlist?.length === 1 ? ` item` : ` items`}
          </div>
        </div>
        <div className="wishlist_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist?.map((single_item, index) => (
            <WishlistProduct product={single_item} key={index} />
          ))}
        </div>
        <Chatbot />
      </div>
    </div>
  );
}
