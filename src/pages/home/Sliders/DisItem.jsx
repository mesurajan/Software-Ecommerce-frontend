import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function DisItem() {
  const [groupedItems, setGroupedItems] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/discountitem`);
      const items = Array.isArray(res.data) ? res.data : [];

      // ✅ Group items by category
      const grouped = items.reduce((acc, item) => {
        const cat = item.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {});

      setGroupedItems(grouped);
    } catch (err) {
      console.error("Error fetching discount items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  const categories = Object.keys(groupedItems);
  if (!categories.length) return null;

  return (
    <div className="px-4 mx-auto max-w-7xl md:px-0">
      {/* Heading */}
      <div className="flex justify-center mb-4">
        <h1 className="text-[28px] md:text-[32px] font-semibold text-[#0A174E]">
          Discount Item
        </h1>
      </div>

      {/* Category Nav */}
      <ul className="flex justify-center gap-4 md:gap-10 mb-6 text-[14px]">
        {categories.map((cat, index) => (
          <li
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={`cursor-pointer transition-colors duration-300 ${
              currentSlide === index
                ? "text-[#0A174E] font-semibold"
                : "text-gray-600"
            }`}
          >
            {cat}
          </li>
        ))}
      </ul>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {categories.map((cat) => (
          <div key={cat}>
            {groupedItems[cat].map((slide) => {
              // ✅ Ensure features is always array
              const featuresArray = Array.isArray(slide.features)
                ? slide.features
                : typeof slide.features === "string"
                ? slide.features.split(",").map((f) => f.trim())
                : [];

              return (
                <div
                  key={slide._id}
                  className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-20 mb-10"
                >
                  {/* Left side */}
                  <div className="leftside">
                    <h2 className="text-[22px] md:text-[26px] font-bold text-[#0A174E]">
                      {slide.title}
                    </h2>
                    <h3 className="mt-2 text-[#0A174E] text-[18px] font-medium">
                      {slide.subtitle}
                    </h3>
                    <p className="mt-3 text-[#0A174E] text-[14px] leading-relaxed max-w-[450px]">
                      {slide.description}
                    </p>

                    {/* Features */}
                    {featuresArray.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
                        {featuresArray.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-blue-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Button */}
                    <Link
                      to={`/productDetails/${slide.productId}`}   // ✅ dynamic link
                      className="inline-block px-6 py-3 mt-6 text-white transition rounded primary-btn hover:primary-btn"
                    >
                      {slide.buttonText || "Shop Now"}
                    </Link>
                  </div>

                  {/* Right side */}
                  <div className="rightside">
                    <div className="flex justify-center">
                      <img
                        src={`${BACKEND_URL}/${slide.chairImage}`}
                        alt={slide.subtitle}
                        className="max-w-[500px] w-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DisItem;
