import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function SimpleSlider({ BannerData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  // const totalSlides = BannerData.length;

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
      {BannerData.map((_, index) => {
        const isActive = index === currentSlide;
        return (
          <li
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={`cursor-pointer transition-colors duration-300 rounded-sm ${
              isActive ? "bg-[#0A174E]" : "bg-gray-400"
            }`}
            style={{
              width: "16px",
              height: "4px",
            }}
          />
        );
      })}
    </ul>
  ),
};

  return (
    <div className="container mx-auto slider-container bg-backgroundlite">
      <Slider ref={sliderRef} {...settings}>
        {BannerData.map((el, i) => (
          <div key={i}>
            <div className="flex flex-col md:flex-row justify-start items-center md:items-start gap-7 md:gap-0 py-8 md:py-[0px]">
              
              {/* Left image (like lightimage) */}
            <div className="flex justify-start items-start px-4 md:px-0 md:ml-[-40px] lg:ml-[-2px] flex-shrink-0 md:mt-0">

                <img
                  src={el.leftImage}
                  alt="left visual"
                  className="w-full max-w-[300px] h-auto mt-0"
                />
              </div>

              {/* Text Content */}
              <div className="subheader w-full md:w-[550px] flex flex-col items-center md:items-start text-center md:text-left  md:gap-0 py-8 md:py-[120px]">
                <p className="mb-2 text-xs font-medium text-pink-500 sm:text-sm">
                  {el.subtitle}
                </p>
                <div className="text-[24px] md:text-[40px] font-bold">
                  <h1>{el.title1}</h1>
                  <h1>{el.title2}</h1>
                </div>
                <p className="text-[12px] sm:text-sm py-[15px] leading-relaxed">
                  {el.description}
                </p>
                <Link to="product" className="primary-btn">
                Shop Now
              </Link>
                

              </div>

              {/* Right image (like banner sofaimage) */}
              <div className="sofaimage flex-shrink-0  md:gap-0 py-8 md:py-[100px] relative ">
                <img
                  src={el.rightImage}
                  alt="sofa visual"
                  className="w-full max-w-[350px] max-h-[300] "
                />
                {
                  el.discount && 
                     <div className="absolute top-20 -right-3 bg-[#00BFFF] text-white text-xs sm:text-sm font-bold px-8 py-3 rounded-full shadow-md">
                    {el.discount}
                  </div>
                }
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>



  );
}

export default SimpleSlider;
