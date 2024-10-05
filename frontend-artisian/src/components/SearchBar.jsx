import React, { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // Fetch study data from the API
            const { data } = await axios.get(`http://localhost:3000/all_products`);

            console.log(data);
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="relative flex items-center justify-end"
        >
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full sm:w-[25vw] px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-300"
            >
                <Search size={20} />
            </button>
        </form>
    );
};

export default SearchBar;
