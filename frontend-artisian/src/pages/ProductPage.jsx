import React, { useState } from 'react';
import { Star, ShoppingCart, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import painting1 from '@/assets/painting1.jpg';
import painting2 from '@/assets/painting2.jpg';
import painting3 from '@/assets/painting3.jpg';
import painting4 from '@/assets/painting4.jpg';
import painting5 from '@/assets/painting5.jpg';

const ProductPage = () => {
    const [showMore, setShowMore] = useState(false);
    const [mainImage, setMainImage] = useState(painting1);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('Blue');
    const [selectedSize, setSelectedSize] = useState('M');
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const productDetails = {
        product_name: "Beautiful Painting By Anrtikas",
        price: 1299,
        previous_price: 1499,
        discount: 15,
        description: `This Blue Indigo Polo T-shirt is crafted from high-quality fabric that ensures maximum comfort and durability. 
        The polo features a classic fit with a ribbed collar and sleeve cuffs, providing a timeless look. The breathable material keeps you 
        cool and dry throughout the day, making it perfect for any casual or semi-formal occasion. Whether you're heading to a meeting, 
        a casual outing, or a social event, this polo T-shirt will elevate your style effortlessly. 
    
        The versatile color and design make it easy to pair with jeans, chinos, or shorts for a complete look. Moreover, its durable stitching 
        ensures long-lasting wear, and the premium fabric is soft on your skin, giving you comfort all day. It's an ideal choice for any weather, 
        thanks to its breathable nature, ensuring you stay fresh and cool in the summer and comfortable with layers in the winter. 
    
        This polo T-shirt is not just about style but also function; the material wicks away moisture, helping you stay dry. The polo features 
        side vents for added mobility and flexibility, so whether you're on the go or relaxing at home, you'll enjoy unrestricted movement. 
        The indigo color is achieved through eco-friendly dyeing processes, making this a sustainable and environmentally-conscious choice 
        for the modern man who cares about the planet.
    
        The ribbed collar adds a touch of sophistication while maintaining the casual essence of the polo. Whether dressed up or down, 
        this polo makes a statement wherever you go. Easy to care for, this polo T-shirt is machine washable and retains its shape and color, 
        even after multiple washes. This piece is a must-have addition to any wardrobe, offering versatility, durability, and style.`,
        category: "Men's Clothing",
        inStock: true
    };

    const images = [painting1, painting2, painting3, painting4, painting5];

    const handleImageChange = (image) => {
        setMainImage(image);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);  // Animation duration (1 second)
    };

    const colors = [
        { color_name: 'Blue', color_code: '#1e40af' },
        { color_name: 'Red', color_code: '#dc2626' },
        { color_name: 'Green', color_code: '#15803d' }
    ];

    const sizes = ['S', 'M', 'L', 'XL'];

    const handleColorChange = (colorName) => setSelectedColor(colorName);
    const handleSizeChange = (size) => setSelectedSize(size);

    return (
        <div className="min-h-screen bg-gray-100 p-4 w-full">
            <div className="w-full h-full bg-white rounded-lg shadow-xl p-6 flex flex-col gap-4">
                <Link to="/" className="flex items-center text-blue-600 mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to results
                </Link>
                <div className="flex flex-col md:flex-row gap-8 h-full">
                    <div className="w-2/3 flex flex-row gap-4">
                        <div className="flex flex-col gap-2 w-[100px]">
                            {images.map((image, index) => (
                                <div key={index} className="bg-gray-200 rounded-lg h-20">
                                    <img
                                        src={image}
                                        alt="Thumbnail"
                                        onClick={() => handleImageChange(image)}
                                        className="w-full h-full object-cover cursor-pointer rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={`bg-gray-200 rounded-lg flex-1 flex items-center justify-center ${isAnimating ? 'swashIn' : ''}`}>
                            <img
                                src={mainImage}
                                alt="Product"
                                className={`w-full h-full object-cover rounded-lg`}
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-between">
                        <div>
                            <div className="border-b border-gray-200 pb-2">
                                <h1 className="text-3xl font-semibold mb-6 text-gray-900 text-left">{productDetails.product_name}</h1>
                            </div>

                            <div className="border-b border-gray-200 py-4">
                                {/* <p className="text-xl font-semibold mb-2 text-left">₹{productDetails.price}.00</p> */}

                                <div className="flex items-center text-left">
                                    <p className="text-xl font-semibold mb-1 text-gray-900">₹{productDetails.price}.00</p>
                                    <p className="text-lg font-normal text-gray-500 line-through ml-4">₹{productDetails.previous_price}.00</p>
                                    <p className="text-lg font-semibold text-green-500 ml-4">({productDetails.discount}% Off)</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="flex mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 text-xm">(4.8)</span>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 text-left">(Inclusive of all taxes)</p>
                                <p className="text-green-600 text-sm text-left">
                                    {productDetails.inStock ? 'In stock' : 'Out of stock'}
                                </p>
                            </div>

                            <div className="border-b border-gray-200 py-4">
                                <h3 className="font-semibold mb-2 text-left">About the product</h3>
                                <p className="text-gray-700 text-left">
                                    {showMore ? productDetails.description : `${productDetails.description.substring(0, 600)}...`}
                                    <button
                                        className="text-blue-600 ml-1"
                                        onClick={() => setShowMore(!showMore)}
                                    >
                                        {showMore ? 'See Less' : 'See More'}
                                    </button>
                                </p>
                            </div>

                            <div className="py-4">
                                <p className="text-gray-700 mb-4 text-left">
                                    <div className="flex items-center text-left">
                                        <p className="text-lg font-semibold mb-1 text-gray-900">₹{productDetails.price}.00</p>
                                        <p className="text-ms font-normal text-gray-500 line-through ml-4">₹{productDetails.previous_price}.00</p>
                                        <p className="text-ms font-semibold text-green-500 ml-4">({productDetails.discount}% Off)</p>
                                    </div>
                                    Seller: <span className="font-semibold">{'Anrtikas'}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button className="flex-1 bg-yellow-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 flex items-center justify-center">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Add to Cart
                            </button>
                            <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 flex items-center justify-center">
                                <CreditCard className="w-5 h-5 mr-2" />
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;