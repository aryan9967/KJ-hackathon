import React, { useState } from 'react';
import { Star, ShoppingCart, CreditCard } from 'lucide-react';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import painting1 from '@/assets/painting1.jpg';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const inStock = true;

    return (
        <TooltipProvider>
            <div className="min-h-screen backdrop-blur-lg bg-white/30 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/5">
                        <div
                            className="relative overflow-hidden rounded-lg shadow-md bg-purple-100 h-64 md:h-full"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <img
                                src={painting1}
                                alt="Product"
                                className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                            />
                        </div>
                    </div>
                    <div className="md:w-3/5 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-left">Elegant Purple Gadget</h1>
                            <p className="text-gray-600 mb-2 text-sm text-left">Experience the perfect blend of style and functionality with our cutting-edge purple gadget.</p>
                            <p className="text-xs text-gray-500 mb-2 cursor-help text-left">Inclusive of all taxes</p>
                            <div className="flex items-center mb-2">
                                <div className="flex mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <span className="text-gray-600 text-xs">(4.8)</span>
                            </div>
                            <p className="text-base font-medium text-gray-900 mb-2 text-left">$299.99</p>
                            <div className="mb-4">
                                <h2 className="text-sm font-medium text-gray-800 mb-1 text-left">Quantity</h2>
                                <div className="flex items-center mb-2">
                                    <select
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="border border-gray-300 rounded-md p-1 mr-2 text-sm"
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                    <span className={`text-xs font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                                        {inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button className="bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold text-sm transition duration-300 hover:bg-purple-600 flex items-center justify-center flex-1">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Add to Cart
                            </button>
                            <button className="bg-purple-800 text-white py-2 px-4 rounded-lg font-semibold text-sm transition duration-300 hover:bg-purple-700 flex items-center justify-center flex-1">
                                <CreditCard className="w-4 h-4 mr-1" />
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default ProductDetail;