// src/components/Slider/LatestProductSlider.jsx
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { latestProducts } from "../../../assets/latestProducts ";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../../components/ProductCard"; // ✅ 

function LatestProductSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const navItems = ["New Arrivals", "Best Seller", "Featured", "Special Offer"];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  if (!latestProducts.length) return null;

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
        {navItems.map((item, index) => (
          <li
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={`cursor-pointer font-medium transition-colors duration-300 ${
              currentSlide === index ? "text-[#0A174E]" : "text-gray-400"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {latestProducts.map((slide) => (
          <div key={slide.id} className="grid grid-cols-1 gap-4">
            {/* Chunk chairs into rows of 3 */}
            {Array.from(
              { length: Math.ceil(slide.chairs.length / 3) },
              (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {slide.chairs
                    .slice(rowIndex * 3, rowIndex * 3 + 3)
                    .map((chair) => (
                      <ProductCard key={chair.id} product={chair} /> // ✅ reuse card
                    ))}
                </div>
              )
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default LatestProductSlider;
