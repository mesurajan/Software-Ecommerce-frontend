import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { DiscountItem } from "../../../assets/mockdata";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Check } from "lucide-react"; // for check icon ✔

function DisItem() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const navItems = ["Wood Chair", "Plastic Chair", "Sofa Collection"];

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

  if (!DiscountItem.length) return null;

  return (
    <div className="px-4 mx-auto max-w-7xl md:px-0">
      {/* Heading */}
      <div className="flex justify-center mb-4">
        <h1 className="text-[28px] md:text-[32px] font-semibold text-[#0A174E]">
          Discount Item
        </h1>
      </div>

      {/* Nav */}
      <ul className="flex justify-center gap-4 md:gap-10 mb-6 text-[14px]">
        {navItems.map((item, index) => (
          <li
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={`cursor-pointer transition-colors duration-300 ${
              currentSlide === index ? "text-[#0A174E] font-semibold" : "text-gray-600"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {DiscountItem.map((slide) => (
          <div
            key={slide.id}
            
          >
            {/* Content */}
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-20">

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
                  <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
                    {slide.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-600" />
                        <span>{feature}</span>
                      </div>
                          ))}
                  </div>  

                  {/* Button */}
                  <Link
                    to="product"
                    className="inline-block px-6 py-3 mt-6 text-white transition rounded primary-btn hover:bg-background"
                  >
                    {slide.buttonText}
                  </Link>
                  </div>
                  


                <div className="rightside">
                  <div className="flex justify-center">
                  <img
                    src={slide.chairimage}
                    alt={slide.subtitle}
                    className="max-w-[500px] w-full"
                  />
                </div>
                </div>
            </div>           
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DisItem;
