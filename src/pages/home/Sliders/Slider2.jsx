// src/components/Slider/SimpleSlider2.jsx
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../../components/ProductCard";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174";

function SimpleSlider2() {
  const [sliders, setSliders] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/slider`);
        setSliders(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching sliders:", err);
      }
    };
    fetchSliders();
  }, []);

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
      <ul className="flex justify-center gap-4 mt-6">
        {sliders.map((_, index) => (
          <li
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={`cursor-pointer transition-colors duration-300 rounded-sm ${
              index === currentSlide ? "bg-[#0A174E]" : "bg-gray-400"
            }`}
            style={{ width: "16px", height: "4px" }}
          />
        ))}
      </ul>
    ),
  };

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.png";
    return `${BACKEND_URL}/${path.replace(/\\/g, "/")}`;
  };

  if (!sliders.length) return null;

  return (
    <div className="px-4 mx-auto slider-container max-w-7xl md:px-0 ">
      <Slider ref={sliderRef} {...settings}>
        {sliders.map((slide) => (
          <div key={slide._id}>
            {/* Slider Title */}
            {/* {slide.title && (
              <h2 className="mb-4 text-xl font-bold text-center md:text-2xl">
                {slide.title}
              </h2>
            )} */}

            {/* Grid of Products */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {slide.chairs.map((chair, idx) => {
                // ✅ Normalize linked product data
                const productId =
                  chair.product?._id || chair.product || idx; // real Product ID
                const productSlug =
                  chair.productSlug || chair.product?.slug || "unknown";

                const formattedChair = {
                  id: productId,
                  title: chair.title || chair.product?.title || "Untitled",
                  price: chair.price || chair.product?.price || 0,
                  image: getImageUrl(
                    chair.chairimage ||
                      chair.product?.images?.[0] ||
                      chair.product?.image
                  ),
                  slug: productSlug,
                };

                return <ProductCard key={idx} product={formattedChair} />;
              })}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider2;
