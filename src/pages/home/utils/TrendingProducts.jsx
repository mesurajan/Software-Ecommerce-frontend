import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import axios from "axios";
import ProductCard from "../../../components/ProductCard";
import showcase01 from "../../../assets/images/Home/showcase01.png";
import showcase02 from "../../../assets/images/Home/showcase02.png";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function TrendingProducts() {
  const [trendingData, setTrendingData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // ✅ Fetch trending products from backend
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/trendingproducts`);
        setTrendingData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching trending products:", err);
      }
    };
    fetchTrending();
  }, []);

  // ✅ Helper for image path
  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/default/lightimage.png`;
    if (path.startsWith("http")) return path;
    return `${BACKEND_URL.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
  };

  // ✅ react-slick settings
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    beforeChange: (_, next) => setCurrentSlide(next),
    appendDots: () => (
      <ul className="flex justify-center gap-3 mt-6">
        {trendingData.map((_, index) => (
          <li
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={`cursor-pointer transition-colors duration-300 rounded-sm ${
              index === currentSlide ? "bg-[#03045E]" : "bg-gray-400"
            }`}
            style={{ width: "16px", height: "4px" }}
          />
        ))}
      </ul>
    ),
  };

  if (!trendingData.length) return null;

  return (
    <div className="container mx-auto px-4 md:px-10">
      {/* Title */}
      <header className="text-mainbackground text-[35px] font-semibold flex justify-center mt-10 mb-10">
        <h1>Trending Products</h1>
      </header>

      {/* ✅ Slider (each category = one slide) */}
      <div className="px-2 mx-auto max-w-7xl md:px-0">
        <Slider ref={sliderRef} {...settings}>
          {trendingData.map((category, index) => (
            <div key={index}>
              {/* Category Title */}
              <h2 className="text-[20px] font-semibold text-[#03045E] mb-6 text-center">
                {category.category}
              </h2>

              {/* Products Grid inside each slide */}
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4">
                {category.products.map((product, i) => (
                  <ProductCard
                    key={product._id || i}
                    product={{
                      id: product.productId || product._id,
                      title: product.title,
                      price: product.price,
                      image: getImageUrl(product.chairimage),
                      slug: product.slug,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* ✅ Promo Sections */}
      <div className="flex md:flex-row flex-col justify-center gap-6 md:gap-4 mb-12 mt-14">
        <div className="bg-[#EBECFD] p-6 rounded-lg w-full lg:w-1/3 flex flex-col justify-between items-start">
          <h2 className="text-[24px] font-bold text-[#03045E]">
            23% off on all products
          </h2>
          <Link to="/product" className="text-pink-600 mt-2 font-semibold">
            Shop Now
          </Link>
          <img
            src={showcase01}
            alt="promo"
            className="mt-6 w-[213px] h-[207px] object-contain"
          />
        </div>

        <div className="bg-[#EBECFD] p-6 rounded-lg w-full lg:w-1/3 flex flex-col justify-between items-start">
          <h2 className="text-[24px] font-bold text-[#03045E]">
            23% off on all products
          </h2>
          <Link to="/product" className="text-pink-600 font-semibold">
            View Collection
          </Link>
          <img src={showcase02} alt="promo" className="mt-6 object-contain" />
        </div>


         <div className="bg-[#EBECFD] p-6 rounded-lg w-full lg:w-1/3 flex flex-col justify-between items-start">
          <h2 className="text-[24px] font-bold text-[#03045E]">
            23% off on all products
          </h2>
          <Link to="/product" className="text-pink-600 font-semibold">
            View Collection
          </Link>
          <img src={showcase02} alt="promo" className="mt-6 object-contain" />
        </div>
      </div>
    </div>
  );
}

export default TrendingProducts;
