// src/components/Slider/LatestProductSlider.jsx
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../../components/ProductCard";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

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
        console.error("❌ Error fetching latest products:", err);
      }
    };
    fetchLatest();
  }, []);

  // ✅ Universal image resolver
  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/default/lightimage.png`;
    if (path.startsWith("http")) return path;
    return `${BACKEND_URL.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
  };

  // ✅ Group docs by category
  const grouped = navItems.reduce((acc, cat) => {
    acc[cat] = latestProducts.filter((lp) => lp.category === cat);
    return acc;
  }, {});

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

      {/* Products grid */}
      {grouped[activeCategory]?.length > 0 ? (
        <div className="flex flex-col gap-6">
          {grouped[activeCategory].map((entry) => (
            <div
              key={entry._id}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {entry.products.map((p) => {
                const formatted = {
                  id: p.productId || p._id, // ✅ ensure we pass product ref id if available
                  title: p.title,
                  price: p.price,
                  image: getImageUrl(p.chairimage),
                  slug: p.slug, // optional for navigation
                };
                return <ProductCard key={formatted.id} product={formatted} />;
              })}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
}

export default LatestProductSlider;
