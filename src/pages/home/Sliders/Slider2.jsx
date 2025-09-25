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
    <div className="px-4 mx-auto slider-container max-w-7xl md:px-0">
      <Slider ref={sliderRef} {...settings}>
        {sliders.map((slide) => (
          <div key={slide._id}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {slide.chairs.map((chair, idx) => {
                const formattedChair = {
                  id: chair._id || idx,
                  title: chair.title,
                  price: chair.price,
                  image: getImageUrl(chair.chairimage),
                  link: chair.productLink
                    ? `/productDetails/${chair.productLink}`
                    : null,
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
