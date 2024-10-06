import Chatbot from "@/components/Chatbot";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Joyride from "react-joyride";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: '.first-step',
      content: 'Navigate to different parts of website through here.',
    },
    {
      target: '.second-step',
      content: 'I am your personal assistant.',
    },
    {
      target: '.third-step',
      content: 'This is the final step!',
    },
  ];

  // Categories data
  const categories = [
    {
      name: "Ceramic",
      image:
        "https://www.soosi.co.in/cdn/shop/products/WhatsAppImage2021-03-25at7.39.50PM_580x.jpg?v=1616695308",
    },
    {
      name: "Handmade Jewellery",
      image:
        "https://d1bk2y5ix4k199.cloudfront.net/pics/Black-Onyx-Ganesha-gemstone-artisan-handmade-necklace-set-41355_1_full.jpg",
    },
    {
      name: "Woodworking",
      image:
        "https://img.freepik.com/premium-photo/traditional-woodworking-tools-displayed-table-artisan-craftsmanship-image_706399-29128.jpg",
    },
    {
      name: "Vintage Denim",
      image:
        "https://assets.ajio.com/medias/sys_master/root/20240502/gFYn/66336b1216fd2c6e6ae2057c/-473Wx593H-466453554-black-MODEL.jpg",
    },
    {
      name: "Marble Furnishings",
      image:
        "https://www.nismaayadecor.in/cdn/shop/files/makaio-arabescato-corchia-marble-coffee-table_4.jpg?v=1717503628&width=1080",
    },
  ];

  // Recommended products data
  const recommendedProducts = [
    {
      name: "Product 1",
      image:
        "https://img.freepik.com/premium-photo/exquisite-handcrafted-jewelry-display_1022456-105791.jpg",
      price: "$19.99",
    },
    {
      name: "Product 2",
      image:
        "https://img.freepik.com/premium-photo/gold-jewellery-displayed-store_902846-25984.jpg",
      price: "$24.99",
    },
    {
      name: "Product 3",
      image:
        "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/654cddd666591f6c267f838e/1_0048_dsc00481.jpg",
      price: "$29.99",
    },
    // Add more products as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % recommendedProducts.length);
    }, 1000); // Change slide every 1 second

    return () => clearInterval(interval);
  }, [recommendedProducts.length]);

  const renderCategories = () => (
    <div className="flex justify-center items-center space-x-8 py-8">
      {categories.map((category, index) => (
        <div key={index} className="flex flex-col items-center group">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-2 transition-transform duration-300 group-hover:scale-110">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-center text-sm">{category.name}</span>
        </div>
      ))}
    </div>
  );

  const renderRecommendedProducts = () => (
    <AliceCarousel
      activeIndex={activeIndex}
      autoPlay
      autoPlayInterval={1000}
      infinite
      items={recommendedProducts.map((product, index) => (
        <div key={index} className="text-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="mt-2 font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price}</p>
        </div>
      ))}
      responsive={{
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 },
      }}
    />
  );

  return (
    <div className="main_container">
      <Joyride
        steps={steps}
        continuous={true}
        scrollToFirstStep={true}
        showSkipButton={true}
        run={run}
      />
      <div className="navbar_container first-step">
        <Navbar  />
      </div>

      <div className="main_screen">
        <Hero />
        <div className="container mx-auto bg-beige-100 pt-12">
          <section className="mb-12">
            <h2 className="text-3xl font-samarkan mb-4">Categories</h2>
            {renderCategories()}
          </section>
          <section>
            <h2 className="text-3xl font-samarkan mb-4 ">
              Recommended Products
            </h2>
            {renderRecommendedProducts()}
          </section>

        <FAQ />

        </div>
      
        <Chatbot />
       
      </div>
    </div>
  );
};

export default Home;