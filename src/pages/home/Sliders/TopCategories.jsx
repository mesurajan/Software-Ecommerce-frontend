import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../../components/ProductCard";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174";

function TopCategories() {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/topcategories`);
        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching top categories:", err);
      }
    };
    fetchData();
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
        {categories.map((_, idx) => (
          <li
            key={idx}
            onClick={() => sliderRef.current?.slickGoTo(idx)}
            className={`cursor-pointer rounded-sm ${
              idx === currentSlide ? "bg-[#0A174E]" : "bg-gray-400"
            }`}
            style={{ width: "16px", height: "4px" }}
          />
        ))}
      </ul>
    ),
  };

  const getImageUrl = (path) =>
    path ? `${BACKEND_URL}/${path.replace(/\\/g, "/")}` : "/placeholder.png";

  if (!categories.length) return null;

  return (
    <div className="px-4 mx-auto max-w-7xl">
      <h1 className="text-center text-[35px] font-semibold py-8 text-[#0A174E]">
        Top Categories
      </h1>

      <Slider ref={sliderRef} {...settings}>
        {categories.map((slide) => (
          <div key={slide._id}>
            {/* ✅ Category Header */}
            <h2 className="text-xl font-bold text-center mb-6 text-[#0A174E]">
              {slide.title}
            </h2>

            {/* ✅ Responsive Product Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {slide.chairs.map((chair, idx) => (
                <ProductCard
                  key={idx}
                  product={{
                    id: chair._id || idx,
                    title: chair.title,
                    price: chair.price,
                    image: getImageUrl(chair.chairimage),
                    link: chair.productLink
                      ? `/productDetails/${chair.productLink}`
                      : null,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TopCategories;
