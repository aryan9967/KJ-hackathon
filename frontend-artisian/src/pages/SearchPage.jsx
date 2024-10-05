import React from 'react';
import ProductCard from '@/components/ProductCard.jsx'; // Make sure to import the ProductCard component
import { Search } from 'lucide-react'; // Updated import for search icon
import Navbar from '@/components/Navbar';
import painting1 from '@/assets/painting1.jpg';
import painting2 from '@/assets/painting2.jpg';
import painting3 from '@/assets/painting3.jpg';
import painting4 from '@/assets/painting4.jpg';
import painting5 from '@/assets/painting5.jpg';

const SearchPage = () => {
    const products = [
        {
            id: 1,
            image: painting1,
            title: 'Abstract Painting',
            price: 3999,
            previous_price: 1499,
            discount: 15,
            rating: 4,
        },
        {
            id: 2,
            image: painting2,
            title: 'Nature Landscape',
            price: 2499,
            previous_price: 1499,
            discount: 15,
            rating: 5,
        },
        {
            id: 3,
            image: painting3,
            title: 'Modern Art Piece',
            price: 5999,
            previous_price: 1499,
            discount: 15,
            rating: 4,
        },
    ];

    return (
        <div className="main_container">
            <div className="navbar_container">
                <Navbar />
            </div>
            <div className="main_screen">
                <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-200">
                    <div className="flex items-center">
                        <Search className="text-orange-800 mr-3" size={24} /> {/* Search icon */}
                        <h2 className="text-2xl font-semibold text-gray-800">Search Results</h2> {/* Updated title */}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                        {products?.length} {products?.length === 1 ? ` item` : ` items`}
                    </div>
                </div>
                <div className="wishlist_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Adjusted gap */}
                    {products?.map((single_item) => (
                        <ProductCard product={single_item} key={single_item.id} /> // Pass product data
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
