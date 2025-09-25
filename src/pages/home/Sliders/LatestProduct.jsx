// src/components/Slider/LatestProductSlider.jsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../../components/ProductCard";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174";

function LatestProductSlider() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("New Arrivals");

  const navItems = ["New Arrivals", "Best Seller", "Featured", "Special Offer"];

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/latestproduct`);
        setLatestProducts(data);
      } catch (err) {
        console.error("Error fetching latest products:", err);
      }
    };
    fetchLatest();
  }, []);

  const getImageUrl = (filename) => {
    if (!filename) return "/placeholder.png"; // fallback
    return `${BACKEND_URL}/uploads/latestproducts/${filename}`;
  };

  // ✅ Group all entries by category (fixes bug #1 and #2)
  const grouped = navItems.reduce((acc, cat) => {
    acc[cat] = latestProducts
      .filter((lp) => lp.category === cat)
      .flatMap((lp) => lp.products);
    return acc;
  }, {});

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="px-4 mx-auto slider-container max-w-7xl md:px-0">
      {/* Heading */}
      <div className="flex justify-center mb-4">
        <h2 className="text-[28px] md:text-[32px] font-semibold text-[#0A174E]">
          Latest Products
        </h2>
      </div>

      {/* Navigation tabs */}
      <ul className="flex justify-center gap-4 md:gap-10 mb-6 text-[12px]">
        {navItems.map((item) => (
          <li
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`cursor-pointer font-medium transition-colors duration-300 ${
              activeCategory === item ? "text-[#0A174E]" : "text-gray-400"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Slider */}
      {grouped[activeCategory]?.length > 0 ? (
        <Slider {...settings}>
          {grouped[activeCategory].map((p, i) => {
            const formatted = {
              id: p._id || i,
              title: p.title,
              price: p.price,
              image: getImageUrl(p.productImage),
            };
            return <ProductCard key={i} product={formatted} />;
          })}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
}

export default LatestProductSlider;
