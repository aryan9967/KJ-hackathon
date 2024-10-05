import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Chatbot from '@/components/chatbot';
import ProductCard from '@/components/ProductCard';
import painting1 from '@/assets/painting1.jpg';
import painting2 from '@/assets/painting2.jpg';
import painting3 from '@/assets/painting3.jpg';
import SearchFilter from '@/components/SearchFilter';
import { CategoryFilter } from '@/components/CategoryFilter';
import axios from 'axios';

// Dummy products array
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

const ProductPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [allProducts, setAllProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            // Fetch study data from the API
            const { data } = await axios
                .get(`http://localhost:3000/all_products`);

            console.log(data);
            setAllProducts(data?.products)
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    };

    useEffect(() => {
        getAllProducts()
        // Cleanup function
        return () => {
            console.log('Cleanup: loading for you');
        };
    }, []); // Empty dependency array ensures this effect runs once on mount

    return (
        <div className="main_container">
            <Navbar />

            <div className="main_screen">
                <div className="py-4 px-6 bg-white border-b border-gray-200">
                    <CategoryFilter onCategoryChange={setSelectedCategory} />
                </div>

                <div className="product_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {allProducts.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>

                <Chatbot />
            </div>
        </div>
    );
};

export default ProductPage;
