import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";

// Fixed left image from frontend assets
import leftImage from "../../../assets/images/Home/lightimage.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function SimpleSlider() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/banner`);
      setBanners(res.data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
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
      <ul className="flex justify-center gap-2 mt-10">
        {banners.map((_, index) => {
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

  const getImageUrl = (path) => {
    // fallback if no image
    if (!path) return `${BACKEND_URL}/uploads/Default/lightimage.png`;
    return `${BACKEND_URL}${path}`;
  };

  return (
    <div className="container mx-auto slider-container bg-backgroundlite pt-20  ">
      
      <Slider ref={sliderRef} {...settings}>
        {banners.map((el, i) => (
          <div key={i}>
            <div className="flex flex-col md:flex-row justify-start items-center md:items-start gap-7 md:gap-0 py-8 md:py-[0px]">
              
              {/* Fixed Left image */}
              <div className="flex justify-start items-start px-4 md:px-0 md:ml-[-40px] lg:ml-[-2px] flex-shrink-0 md:mt-0">
                <img
                  src={leftImage}
                  alt="left visual"
                  className="w-full max-w-[300px] h-auto mt-0"
                />
              </div>

              {/* Text Content */}
              <div className="subheader w-full md:w-[550px] flex flex-col items-center md:items-start text-center md:text-left md:gap-0 py-8 md:py-[120px] px-[20px]">
                <p className="mb-2 text-xs font-medium text-pink-500 sm:text-sm text-justify ">
                  {el.subtitle}
                </p>
                <div className="text-[24px] md:text-[40px] font-bold">
                  <h1>{el.title}</h1>
                </div>
                <p className="text-[12px] sm:text-sm py-[15px] leading-relaxed text-justify">
                  {el.description}
                </p>
                <Link to={`/product`} className="primary-btn">
                  Shop Now
                </Link>
              </div>

              {/* Right image */}
              <div className="sofaimage flex-shrink-0 md:gap-0 py-8 md:py-[100px] relative md:px-[80px] px-10 transform transition-transform ease-in-out duration-300 hover:scale-105">
                <img
                  src={getImageUrl(el.image)}
                  alt="banner visual"
                  className="md:w-[350px]  md:h-[350px] "
                />
                {el.discountPercentage > 0 && (
                  <div className="absolute top-20 -right-0 bg-[#ee1641] text-white text-xs sm:text-sm font-bold px-10 py-3 rounded-full shadow-md md:top-35 md:right-0 transform transition-transform ease-in-out duration-300 hover:scale-105">
                    {el.discountPercentage}%
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
