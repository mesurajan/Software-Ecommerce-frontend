import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../../components/ProductCard"; // ✅ Added import

function TopCategories({ BannerData = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setCurrentSlide(next),
    appendDots: () => (
      <ul className="flex justify-center gap-4 mt-6 ">
        {BannerData.map((_, index) => {
          const isActive = index === currentSlide;
          return (
            <li
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              className={`cursor-pointer transition-colors duration-300 rounded-sm ${
                isActive ? "bg-[#0A174E]" : "bg-gray-400"
              }`}
              style={{ width: "16px", height: "4px" }}
            />
          );
        })}
      </ul>
    ),
  };

  if (!BannerData.length) return null;

  return (
    <div className="px-4 mx-auto slider-container max-w-7xl md:px-0">
      <div>
        <h1 className="text-center text-[35px] font-semibold sm:py-8 md:py-10 text-[#0A174E]">
          Top Categories
        </h1>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {BannerData.map((slide) => (
          <div key={slide.id}>
            <div className="grid grid-cols-1 gap-6 mt-5 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">
              {slide.chairs.map((chair) => (
                <ProductCard key={chair.id} product={chair} />
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TopCategories;
